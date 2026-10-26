import "server-only";
import { site } from "@/content/site";
import { serverEnv } from "@/lib/env/server";
import { reportError } from "@/lib/observability/report";
import { csvSafeCell } from "@/lib/security/csv-safe";
import { PRACTICE_AREAS, type Lead } from "./schema";

const TIMEOUT_MS = 6000;

type Context = { source: string | null; page: string | null };

function practiceLabel(id: Lead["practiceArea"]): string {
  return PRACTICE_AREAS.find((area) => area.id === id)?.label ?? id;
}

async function post(url: string, init: RequestInit, label: string): Promise<void> {
  const response = await fetch(url, {
    ...init,
    method: "POST",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`${label} responded ${response.status}`);
}

function slackEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Keep values out of email header injection (CRLF). */
function oneLine(value: string): string {
  return value.replace(/[\r\n\u0000]+/g, " ").trim();
}

/** The CRM UI may render fields as HTML; angle brackets become harmless lookalikes. */
function neutralizeMarkup(value: string): string {
  return value.replace(/</g, "‹").replace(/>/g, "›");
}

/** CRM / Lawyer Office Manager adapter — POST JSON webhook. */
async function notifyCrm(lead: Lead, context: Context): Promise<void> {
  const url = serverEnv.CRM_WEBHOOK_URL;
  if (!url) throw new Error("CRM webhook missing");
  await post(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        ...(serverEnv.CRM_WEBHOOK_TOKEN ? { Authorization: `Bearer ${serverEnv.CRM_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        event: "consultation_request",
        occurredAt: new Date().toISOString(),
        lead: {
          fullName: neutralizeMarkup(lead.fullName),
          phone: lead.phone,
          email: lead.email ? neutralizeMarkup(lead.email) : null,
          practiceArea: lead.practiceArea,
          practiceAreaLabel: practiceLabel(lead.practiceArea),
          message: lead.message ? neutralizeMarkup(lead.message) : null,
        },
        context,
      }),
    },
    "CRM",
  );
}

async function notifySlack(lead: Lead, context: Context): Promise<void> {
  const url = serverEnv.SLACK_WEBHOOK_URL;
  if (!url) throw new Error("Slack webhook missing");
  const lines = [
    `*פנייה חדשה מהאתר* · ${slackEscape(practiceLabel(lead.practiceArea))}`,
    [lead.fullName, lead.phone, lead.email]
      .filter((part): part is string => Boolean(part))
      .map(slackEscape)
      .join(" · "),
    // The case description may be privileged; it goes only to the office mailbox and CRM.
    lead.message ? "תיאור המצב: במייל המשרד" : null,
    context.source ? `מקור: ${slackEscape(context.source)}` : null,
  ].filter(Boolean);
  await post(
    url,
    { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: lines.join("\n") }) },
    "Slack",
  );
}

async function notifyEmail(lead: Lead, context: Context): Promise<void> {
  const key = serverEnv.RESEND_API_KEY;
  const to = serverEnv.LEAD_NOTIFY_EMAIL;
  if (!key || !to) throw new Error("Email notify missing");
  await post(
    "https://api.resend.com/emails",
    {
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: serverEnv.LEAD_FROM_EMAIL ?? "onboarding@resend.dev",
        to: [to],
        subject: oneLine(`פנייה חדשה — ${practiceLabel(lead.practiceArea)}`),
        text: [
          `שם: ${csvSafeCell(oneLine(lead.fullName))}`,
          `טלפון: ${csvSafeCell(oneLine(lead.phone))}`,
          lead.email ? `מייל: ${csvSafeCell(oneLine(lead.email))}` : "",
          `תחום: ${practiceLabel(lead.practiceArea)}`,
          lead.message ? `הודעה: ${csvSafeCell(oneLine(lead.message))}` : "",
          context.page ? `עמוד: ${oneLine(context.page)}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    },
    "Resend",
  );
}

/**
 * Soft-launch mailbox — FormSubmit posts to the office inbox when Resend/CRM are not wired yet.
 * First production hit may require confirming the address once (email from FormSubmit).
 */
async function notifyMailbox(lead: Lead, context: Context): Promise<void> {
  const to = serverEnv.LEAD_NOTIFY_EMAIL ?? site.contact.email;
  await post(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: oneLine(`פנייה חדשה מהאתר — ${practiceLabel(lead.practiceArea)}`),
        _template: "table",
        _captcha: "false",
        name: oneLine(lead.fullName),
        phone: oneLine(lead.phone),
        email: lead.email ? oneLine(lead.email) : "",
        practiceArea: practiceLabel(lead.practiceArea),
        message: lead.message ? oneLine(lead.message) : "",
        page: context.page ? oneLine(context.page) : "",
        source: context.source ? oneLine(context.source) : "",
      }),
    },
    "Mailbox",
  );
}

function logFailures(results: PromiseSettledResult<void>[], labels: string[]): void {
  results.forEach((result, index) => {
    if (result.status === "rejected") reportError("lead", result.reason, { channel: labels[index] ?? "unknown" });
  });
}

/**
 * Returns true only when a primary channel (CRM or office email) stored the lead.
 * Slack is a notification without the case description — it never counts as delivery.
 */
export async function deliverLead(lead: Lead, context: Context): Promise<boolean> {
  if (serverEnv.LEAD_DELIVERY_MODE === "console") {
    // No PII in logs — practice area + context only.
    console.info("[lead]", { practiceArea: lead.practiceArea, ...context });
    return true;
  }

  const primary: { label: string; run: () => Promise<void> }[] = [];
  if (serverEnv.CRM_WEBHOOK_URL) primary.push({ label: "CRM", run: () => notifyCrm(lead, context) });
  if (serverEnv.RESEND_API_KEY && serverEnv.LEAD_NOTIFY_EMAIL) {
    primary.push({ label: "Email", run: () => notifyEmail(lead, context) });
  }
  // Soft-launch: office inbox via FormSubmit when no CRM/Resend yet.
  if (primary.length === 0) {
    primary.push({ label: "Mailbox", run: () => notifyMailbox(lead, context) });
  }
  const notifications: { label: string; run: () => Promise<void> }[] = [];
  if (serverEnv.SLACK_WEBHOOK_URL) notifications.push({ label: "Slack", run: () => notifySlack(lead, context) });

  const jobs = [...primary, ...notifications];
  const results = await Promise.allSettled(jobs.map((job) => job.run()));
  logFailures(
    results,
    jobs.map((job) => job.label),
  );

  return results.slice(0, primary.length).some((result) => result.status === "fulfilled");
}

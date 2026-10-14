"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { leadsLocked } from "@/lib/env/server";
import { reportBlocked, reportError } from "@/lib/observability/report";
import { LEAD_ACK_COOKIE, leadAckCookieOptions } from "@/lib/security/lead-ack-cookie";
import { isSameOrigin } from "@/lib/security/origin";
import { safeInternalPath } from "@/lib/security/safe-path";
import { hashKey, rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { deliverLead } from "./deliver";
import { leadSchema, quickLeadSchema, toFieldErrors, type FieldErrors } from "./schema";

export type FormState = {
  status: "idle" | "error";
  errors: FieldErrors;
  message: string | null;
};

const MIN_FILL_MS = 2500;
const TEN_MINUTES = 10 * 60_000;
const ONE_HOUR = 60 * 60_000;
const GENERIC_ERROR = "לא הצלחנו לשלוח כרגע. נסו שוב או התקשרו.";
const RATE_ERROR = "נשלחו הרבה בקשות מהחיבור הזה. אפשר לנסות שוב בעוד כמה דקות.";
const BOT_ERROR = "לא הצלחנו לוודא שהשליחה הגיעה מדפדפן. אפשר לרענן את העמוד ולנסות שוב.";
const LOCKED_ERROR = "שליחת פניות דרך האתר עוד לא פתוחה. אפשר להתקשר אלינו ישירות.";
const LOCKED: FormState = { status: "error", errors: {}, message: LOCKED_ERROR };

const metaSchema = z.object({
  website: z.string().max(0).optional(),
  startedAt: z.coerce.number().int().positive().optional(),
  source: z
    .string()
    .max(120)
    .regex(/^[\w\-.:/ |]*$/)
    .optional()
    .catch(undefined),
  page: z
    .string()
    .max(80)
    .regex(/^\/[\w\-/]*$/)
    .optional()
    .catch(undefined),
  variant: z.enum(["full", "quick"]).catch("full"),
});

const FIELDS = ["fullName", "email", "phone", "practiceArea", "message"] as const;

function readFields(formData: FormData, keys: readonly string[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

type RequestInfo = { ip: string; sameOrigin: boolean };

async function requestInfo(): Promise<RequestInfo> {
  const headerList = await headers();
  const ip = headerList.get("x-real-ip") || headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  return { ip, sameOrigin: isSameOrigin(headerList.get("origin"), host) };
}

function looksAutomated(meta: z.infer<typeof metaSchema>): boolean {
  if (meta.website) return true;
  return meta.startedAt !== undefined && Date.now() - meta.startedAt < MIN_FILL_MS;
}

export async function submitLead(_previous: FormState, formData: FormData): Promise<FormState> {
  if (leadsLocked) return LOCKED;
  const request = await requestInfo();
  if (!request.sameOrigin) {
    reportBlocked("origin", "lead");
    return { status: "error", errors: {}, message: GENERIC_ERROR };
  }

  const meta = metaSchema.safeParse(readFields(formData, ["website", "startedAt", "source", "page", "variant"]));
  if (!meta.success) return { status: "error", errors: {}, message: GENERIC_ERROR };
  if (looksAutomated(meta.data)) redirect("/thank-you");

  if (!(await rateLimit(`lead:ip:${await hashKey(request.ip)}`, 5, TEN_MINUTES))) {
    reportBlocked("rate_limit", "lead");
    return { status: "error", errors: {}, message: RATE_ERROR };
  }

  const schema = meta.data.variant === "quick" ? quickLeadSchema : leadSchema;
  const parsed = schema.safeParse(readFields(formData, FIELDS));
  if (!parsed.success) return { status: "error", errors: toFieldErrors(parsed.error), message: null };

  if (!(await verifyTurnstile(formData, "lead", request.ip))) {
    reportBlocked("turnstile", "lead");
    return { status: "error", errors: {}, message: BOT_ERROR };
  }

  const contactKey = parsed.data.email ?? parsed.data.phone;
  if (!(await rateLimit(`lead:contact:${await hashKey(contactKey)}`, 3, ONE_HOUR))) {
    reportBlocked("rate_limit", "lead_email");
    return { status: "error", errors: {}, message: RATE_ERROR };
  }

  const page = meta.data.page ? safeInternalPath(meta.data.page, "/") : null;

  let delivered = false;
  try {
    delivered = await deliverLead(parsed.data, { source: meta.data.source ?? null, page });
  } catch (error) {
    reportError("lead", error);
  }
  if (!delivered) return { status: "error", errors: {}, message: GENERIC_ERROR };

  const cookieStore = await cookies();
  cookieStore.set(
    LEAD_ACK_COOKIE,
    JSON.stringify({
      id: crypto.randomUUID(),
      firstName: parsed.data.fullName.split(/\s+/)[0] ?? parsed.data.fullName,
      practiceArea: parsed.data.practiceArea,
    }),
    leadAckCookieOptions(),
  );
  redirect("/thank-you");
}

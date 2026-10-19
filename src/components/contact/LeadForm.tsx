"use client";

import { useActionState, useEffect, useState } from "react";
import { TurnstileField } from "@/components/home/TurnstileField";
import { submitLead, type FormState } from "@/lib/leads/actions";
import { PRACTICE_AREAS, type PracticeAreaId } from "@/lib/leads/options";
import { site } from "@/content/site";
import { LeadPrivacyNotice } from "./LeadPrivacyNotice";

const FIELD_CLASS =
  "mt-2 w-full rounded-md border border-field bg-white px-3 py-3 text-body text-ink aria-invalid:border-error";

function describedBy(...ids: Array<string | undefined>): string | undefined {
  return ids.filter(Boolean).join(" ") || undefined;
}

const initial: FormState = { status: "idle", errors: {}, message: null };

type Props = {
  locked?: boolean;
  defaultPractice?: PracticeAreaId;
  /** "quick" = name + phone + area only (home). "full" adds email + message (contact page). */
  variant?: "full" | "quick";
  page?: string;
  /** Passed from a server component so the env schema (and zod) stay out of the client bundle. */
  turnstileSiteKey?: string;
};

function readStoredPractice(): PracticeAreaId {
  if (typeof window === "undefined") return "family";
  try {
    const stored = sessionStorage.getItem("practiceArea");
    if (stored && PRACTICE_AREAS.some((area) => area.id === stored)) {
      return stored as PracticeAreaId;
    }
  } catch {
    /* ignore */
  }
  return "family";
}

export function LeadForm({
  locked = false,
  defaultPractice,
  variant = "full",
  page = "/contact",
  turnstileSiteKey,
}: Props) {
  const quick = variant === "quick";
  const [state, action, pending] = useActionState(submitLead, initial);
  const [startedAt] = useState(() => Date.now());
  const [practiceArea, setPracticeArea] = useState<PracticeAreaId>(
    () => defaultPractice ?? readStoredPractice(),
  );
  const [practiceProp, setPracticeProp] = useState(defaultPractice);

  if (defaultPractice !== practiceProp) {
    setPracticeProp(defaultPractice);
    if (defaultPractice) setPracticeArea(defaultPractice);
  }

  const firstErrorKey = (Object.keys(state.errors) as (keyof typeof state.errors)[])[0];
  const focusToken = `${state.status}:${firstErrorKey ?? ""}`;

  useEffect(() => {
    if (!firstErrorKey) return;
    const el = document.getElementById(`field-${firstErrorKey}`);
    el?.focus();
    el?.classList.add("animate-shake");
    const timer = window.setTimeout(() => el?.classList.remove("animate-shake"), 400);
    return () => window.clearTimeout(timer);
  }, [firstErrorKey, focusToken]);

  if (locked) {
    return (
      <div className="flex h-full w-full flex-col justify-center border border-border bg-cream p-6 text-small text-muted md:p-8">
        שליחת פניות דרך האתר בהכנה. בינתיים אפשר להתקשר ל-
        <a href={`tel:${site.contact.phoneTel}`} className="text-navy" dir="ltr">
          <bdi>{site.contact.phone}</bdi>
        </a>{" "}
        או לכתוב ל-
        <a href={`mailto:${site.contact.email}`} className="text-navy" dir="ltr">
          <bdi>{site.contact.email}</bdi>
        </a>
        .
      </div>
    );
  }

  const turnstileKey = turnstileSiteKey;

  return (
    <form id="lead" action={action} className="scroll-mt-24 space-y-4 border border-border bg-white p-6 md:p-8" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="startedAt" value={String(startedAt)} />
      <input type="hidden" name="page" value={page} />
      <input type="hidden" name="source" value={quick ? "site:quick" : "site"} />
      <input type="hidden" name="variant" value={variant} />

      <Field
        id="fullName"
        label="שם מלא"
        error={state.errors.fullName}
        autoComplete="name"
        required
      />
      <Field
        id="phone"
        label="טלפון"
        error={state.errors.phone}
        autoComplete="tel"
        inputMode="tel"
        dir="ltr"
        hint="לתיאום בלבד, לא לדיוור פרסומי"
        required
      />
      {quick ? null : (
        <Field
          id="email"
          label="דוא״ל"
          error={state.errors.email}
          autoComplete="email"
          type="email"
          dir="ltr"
          required
        />
      )}

      <div>
        <label htmlFor="field-practiceArea" className="text-small font-medium text-navy">
          תחום הפנייה
        </label>
        <select
          id="field-practiceArea"
          name="practiceArea"
          value={practiceArea}
          onChange={(event) => {
            const value = event.target.value as PracticeAreaId;
            setPracticeArea(value);
            try {
              sessionStorage.setItem("practiceArea", value);
            } catch {
              /* ignore */
            }
          }}
          className={FIELD_CLASS}
          aria-invalid={state.errors.practiceArea ? true : undefined}
          aria-describedby={state.errors.practiceArea ? "field-practiceArea-error" : undefined}
          required
        >
          {PRACTICE_AREAS.map((area) => (
            <option key={area.id} value={area.id}>
              {area.label}
            </option>
          ))}
        </select>
        {state.errors.practiceArea ? (
          <ErrorText id="field-practiceArea-error" text={state.errors.practiceArea} />
        ) : null}
      </div>

      {quick ? null : (
        <div>
          <label htmlFor="field-message" className="text-small font-medium text-navy">
            תיאור קצר של המצב
          </label>
          <textarea
            id="field-message"
            name="message"
            rows={4}
            className={FIELD_CLASS}
            aria-invalid={state.errors.message ? true : undefined}
            aria-describedby={describedBy(
              "field-message-hint",
              state.errors.message ? "field-message-error" : undefined,
            )}
            required
          />
          <p id="field-message-hint" className="mt-1 text-small text-muted">
            בכמה מילים — בלי מסמכים או פרטים רגישים. את השאר נשמע בשיחה.
          </p>
          {state.errors.message ? <ErrorText id="field-message-error" text={state.errors.message} /> : null}
        </div>
      )}

      {turnstileKey ? (
        <TurnstileField siteKey={turnstileKey} action="lead" theme="light" resetSignal={state} />
      ) : null}

      <p role="alert" className="text-small text-error empty:hidden">
        {state.message}
      </p>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-navy px-6 text-button font-medium text-cream transition duration-[var(--motion-fast)] hover:bg-navy-deep disabled:opacity-70"
      >
        {pending ? "שולחים…" : quick ? "חזרו אליי" : "לקביעת השיחה"}
      </button>
      <p className="text-center text-[0.78rem] text-muted">
        מענה תוך יום עסקים אחד · בלי התחייבות לייצוג בשלב הזה
      </p>
      <LeadPrivacyNotice />
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const hintId = hint ? `field-${id}-hint` : undefined;
  const errorId = error ? `field-${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={`field-${id}`} className="text-small font-medium text-navy">
        {label}
      </label>
      <input
        id={`field-${id}`}
        name={id}
        className={FIELD_CLASS}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hintId, errorId)}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="mt-1 text-small text-muted">
          {hint}
        </p>
      ) : null}
      {error ? <ErrorText id={errorId} text={error} /> : null}
    </div>
  );
}

function ErrorText({ id, text }: { id?: string; text: string }) {
  return (
    <p id={id} role="status" aria-live="polite" className="mt-1 text-small text-error">
      {text}
    </p>
  );
}

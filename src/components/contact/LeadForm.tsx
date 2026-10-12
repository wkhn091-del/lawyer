"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { TurnstileField } from "@/components/home/TurnstileField";
import { submitLead, type FormState } from "@/lib/leads/actions";
import { PRACTICE_AREAS, type PracticeAreaId } from "@/lib/leads/options";
import { publicEnv } from "@/lib/env/public";
import { site } from "@/content/site";

const initial: FormState = { status: "idle", errors: {}, message: null };

type Props = {
  locked?: boolean;
  defaultPractice?: PracticeAreaId;
};

export function LeadForm({ locked = false, defaultPractice }: Props) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [startedAt] = useState(() => Date.now());
  const [practiceArea, setPracticeArea] = useState<PracticeAreaId>(defaultPractice ?? "family");

  useEffect(() => {
    if (defaultPractice) {
      setPracticeArea(defaultPractice);
      return;
    }
    try {
      const stored = sessionStorage.getItem("practiceArea");
      if (stored && PRACTICE_AREAS.some((area) => area.id === stored)) {
        setPracticeArea(stored as PracticeAreaId);
      }
    } catch {
      /* ignore */
    }
  }, [defaultPractice]);

  const firstErrorKey = useMemo(() => {
    const keys = Object.keys(state.errors) as (keyof typeof state.errors)[];
    return keys[0];
  }, [state.errors]);

  useEffect(() => {
    if (!firstErrorKey) return;
    const el = document.getElementById(`field-${firstErrorKey}`);
    el?.focus();
    el?.classList.add("animate-shake");
    const timer = window.setTimeout(() => el?.classList.remove("animate-shake"), 400);
    return () => window.clearTimeout(timer);
  }, [firstErrorKey, state]);

  if (locked) {
    return (
      <div className="border border-border bg-cream p-6 text-small text-muted">
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

  const turnstileKey = publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <form id="lead" action={action} className="space-y-4 border border-border bg-white p-6 md:p-8" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="startedAt" value={String(startedAt)} />
      <input type="hidden" name="page" value="/contact" />
      <input type="hidden" name="source" value="site" />

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
        hint="לתיאום בלבד — לא דיוור פרסומי"
        required
      />
      <Field
        id="email"
        label="דוא״ל"
        error={state.errors.email}
        autoComplete="email"
        type="email"
        dir="ltr"
        required
      />

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
          className="mt-2 w-full rounded-md border border-border bg-white px-3 py-3 text-body text-ink"
          required
        >
          {PRACTICE_AREAS.map((area) => (
            <option key={area.id} value={area.id}>
              {area.label}
            </option>
          ))}
        </select>
        {state.errors.practiceArea ? <ErrorText text={state.errors.practiceArea} /> : null}
      </div>

      <div>
        <label htmlFor="field-message" className="text-small font-medium text-navy">
          תיאור קצר של המצב
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={4}
          className="mt-2 w-full rounded-md border border-border bg-white px-3 py-3 text-body text-ink"
          required
        />
        <p className="mt-1 text-small text-muted">המידע חסוי ואינו מתפרסם</p>
        {state.errors.message ? <ErrorText text={state.errors.message} /> : null}
      </div>

      {turnstileKey ? (
        <TurnstileField siteKey={turnstileKey} action="lead" theme="light" resetSignal={state} />
      ) : null}

      {state.message ? <p className="text-small text-error">{state.message}</p> : null}

      <p className="text-small text-muted">
        שליחת הפרטים אינה יוצרת יחסי עו״ד-לקוח. המידע באתר אינו ייעוץ משפטי.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-navy px-6 text-button font-medium text-cream transition duration-[var(--motion-fast)] hover:bg-navy-deep disabled:opacity-70"
      >
        {pending ? "שולחים…" : "לשליחת הפנייה"}
      </button>
      <p className="text-center text-small text-muted">נחזור תוך יום עסקים אחד</p>
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
  return (
    <div>
      <label htmlFor={`field-${id}`} className="text-small font-medium text-navy">
        {label}
      </label>
      <input
        id={`field-${id}`}
        name={id}
        className="mt-2 w-full rounded-md border border-border bg-white px-3 py-3 text-body text-ink"
        {...props}
      />
      {hint ? <p className="mt-1 text-small text-muted">{hint}</p> : null}
      {error ? <ErrorText text={error} /> : null}
    </div>
  );
}

function ErrorText({ text }: { text: string }) {
  return <p className="mt-1 text-small text-error">{text}</p>;
}

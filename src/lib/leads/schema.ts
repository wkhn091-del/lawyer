import { z } from "zod";
import { PRACTICE_AREAS, type PracticeAreaId } from "./options";

export { PRACTICE_AREAS, type PracticeAreaId };

const PRACTICE_IDS = PRACTICE_AREAS.map((area) => area.id) as [PracticeAreaId, ...PracticeAreaId[]];

/** Normalizes +972 / spaces / dashes to a local Israeli number, or returns null if invalid. */
export function normalizeIsraeliPhone(raw: string): string | null {
  let digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+972")) digits = `0${digits.slice(4)}`;
  else if (digits.startsWith("972")) digits = `0${digits.slice(3)}`;
  digits = digits.replace(/\D/g, "");
  if (/^05\d{8}$/.test(digits) || /^07\d{8}$/.test(digits) || /^0[23489]\d{7}$/.test(digits)) return digits;
  return null;
}

/** Keep free-text out of email/Slack header injection (CRLF / NUL). */
function oneLine(value: string): string {
  return value.replace(/[\r\n\u0000]+/g, " ").trim();
}

const fullName = z
  .string({ error: "כתבו את השם המלא" })
  .trim()
  .transform(oneLine)
  .pipe(
    z
      .string()
      .min(2, "כתבו את השם המלא")
      .max(80, "השם ארוך מדי. אפשר לקצר?")
      .regex(/^[\p{L}\p{M}' .\-״׳"]+$/u, "השם יכול לכלול רק אותיות"),
  );

const email = z
  .string()
  .trim()
  .toLowerCase()
  .transform(oneLine)
  .pipe(z.string().max(120, "כתובת המייל ארוכה מדי").pipe(z.email("בדקו את כתובת הדוא״ל")));

const message = z
  .string()
  .trim()
  .transform(oneLine)
  .pipe(
    z
      .string()
      .min(10, "ספרו בקצרה מה קרה — לפחות משפט אחד")
      .max(2000, "התיאור ארוך מדי. אפשר לקצר?"),
  );

const blankToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const leadSchema = z.object({
  fullName,
  email,
  phone: z
    .string()
    .max(20, "המספר ארוך מדי")
    .transform((value, ctx) => {
      const normalized = normalizeIsraeliPhone(value);
      if (!normalized) {
        ctx.addIssue({ code: "custom", message: "בדקו את מספר הטלפון (מספר ישראלי מלא)" });
        return z.NEVER;
      }
      return normalized;
    }),
  practiceArea: z.enum(PRACTICE_IDS, { error: "בחרו תחום פנייה" }),
  message,
});

/** Home quick form: name + phone + area. Email and message stay validated when provided. */
export const quickLeadSchema = leadSchema.extend({
  email: z.preprocess(blankToUndefined, email.optional()),
  message: z.preprocess(blankToUndefined, message.optional()),
});

export type Lead = z.infer<typeof quickLeadSchema>;

export type FieldErrors = Partial<Record<keyof Lead, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof Lead | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

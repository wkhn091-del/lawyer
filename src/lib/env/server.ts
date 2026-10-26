import "server-only";
import { z } from "zod";

const optionalSecret = (max: number) => z.string().trim().min(1).max(max).optional();

const serverEnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),

    LEAD_DELIVERY_MODE: z.enum(["live", "console"]).default("console"),

    CRM_WEBHOOK_URL: z.url().max(300).optional(),
    CRM_WEBHOOK_TOKEN: optionalSecret(512),
    SLACK_WEBHOOK_URL: z
      .url()
      .max(300)
      .refine((value) => value.startsWith("https://hooks.slack.com/"), "Must be a Slack incoming webhook")
      .optional(),
    RESEND_API_KEY: optionalSecret(256),
    LEAD_NOTIFY_EMAIL: z.email().max(120).optional(),
    LEAD_FROM_EMAIL: z.string().trim().max(120).optional(),

    UPSTASH_REDIS_REST_URL: z
      .url()
      .max(300)
      .refine((value) => value.startsWith("https://"), "Must be the https REST URL from the Upstash console")
      .optional(),
    UPSTASH_REDIS_REST_TOKEN: optionalSecret(512),
    RATE_LIMIT_HMAC_SECRET: optionalSecret(512),
    TURNSTILE_SECRET_KEY: optionalSecret(256),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalSecret(128),
    SENTRY_DSN: z
      .url()
      .max(300)
      .refine((value) => value.startsWith("https://"), "Must be an https Sentry DSN")
      .optional(),
    NEXT_SERVER_ACTIONS_ENCRYPTION_KEY: z
      .string()
      .trim()
      .refine((value) => {
        if (!/^[A-Za-z0-9+/]+={0,2}$/.test(value)) return false;
        return [16, 24, 32].includes(atob(value).length);
      }, "Must be a base64 AES key of 16, 24 or 32 bytes (openssl rand -base64 32)")
      .optional(),
  })
  .superRefine((env, ctx) => {
    if (Boolean(env.UPSTASH_REDIS_REST_URL) !== Boolean(env.UPSTASH_REDIS_REST_TOKEN)) {
      ctx.addIssue({
        code: "custom",
        path: ["UPSTASH_REDIS_REST_URL"],
        message: "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set together.",
      });
    }
    if (Boolean(env.TURNSTILE_SECRET_KEY) !== Boolean(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)) {
      ctx.addIssue({
        code: "custom",
        path: ["TURNSTILE_SECRET_KEY"],
        message: "TURNSTILE_SECRET_KEY and NEXT_PUBLIC_TURNSTILE_SITE_KEY must be set together.",
      });
    }
    if (Boolean(env.CRM_WEBHOOK_URL) !== Boolean(env.CRM_WEBHOOK_TOKEN) && env.CRM_WEBHOOK_TOKEN) {
      ctx.addIssue({
        code: "custom",
        path: ["CRM_WEBHOOK_URL"],
        message: "CRM_WEBHOOK_TOKEN requires CRM_WEBHOOK_URL.",
      });
    }
    // Soft-launch: FormSubmit → office inbox covers live delivery when CRM/Resend are absent.
    if (env.VERCEL_ENV === "production" && !env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY) {
      ctx.addIssue({
        code: "custom",
        path: ["NEXT_SERVER_ACTIONS_ENCRYPTION_KEY"],
        message: "Required in production (openssl rand -base64 32) so Server Actions stay stable across instances.",
      });
    }
  });

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function readEnv(): Record<string, string | undefined> {
  const raw: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(process.env)) raw[key] = value === "" ? undefined : value;
  return raw;
}

function parseServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(readEnv());
  if (!result.success) {
    const details = result.error.issues.map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`).join("\n");
    throw new Error(`Invalid server environment variables:\n${details}`);
  }
  return result.data;
}

export const serverEnv: ServerEnv = parseServerEnv();

/**
 * Hard blockers only — without these the form stays locked.
 * Turnstile / Upstash / Sentry are recommended (warn in deploy logs) but must not
 * blank the contact form on a soft-launch deploy that only has an encryption key.
 * Mailbox delivery falls back to FormSubmit → office email when Resend/CRM are absent.
 */
const REQUIRED_FOR_LEADS_IN_PRODUCTION = ["NEXT_SERVER_ACTIONS_ENCRYPTION_KEY"] as const;

/** True on Vercel production, and on any non-Vercel host running a production build. */
export function isDeployedProduction(env: ServerEnv): boolean {
  return env.VERCEL_ENV ? env.VERCEL_ENV === "production" : env.NODE_ENV === "production";
}

export function missingForLeads(env: ServerEnv): string[] {
  // A live Preview delivers real leads, so it needs the same bot and rate-limit protection.
  const enforce =
    isDeployedProduction(env) || (env.VERCEL_ENV === "preview" && env.LEAD_DELIVERY_MODE === "live");
  if (!enforce) return [];
  const missing: string[] = REQUIRED_FOR_LEADS_IN_PRODUCTION.filter((key) => !env[key]);
  if (env.LEAD_DELIVERY_MODE !== "live") missing.push("LEAD_DELIVERY_MODE=live");
  return missing;
}

const missingInProduction = missingForLeads(serverEnv);

export const leadsLocked = missingInProduction.length > 0;

if (leadsLocked) console.warn(`[env] Lead form locked. Missing: ${missingInProduction.join(", ")}`);

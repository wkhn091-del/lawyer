import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { isDeployedProduction, serverEnv } from "@/lib/env/server";
import { reportError } from "@/lib/observability/report";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

/** Per-instance fallback, used in local development and if Upstash is unreachable. */
function memoryLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [storedKey, stored] of buckets) if (stored.resetAt <= now) buckets.delete(storedKey);
      if (buckets.size >= MAX_BUCKETS) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}

const redis =
  serverEnv.UPSTASH_REDIS_REST_URL && serverEnv.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: serverEnv.UPSTASH_REDIS_REST_URL, token: serverEnv.UPSTASH_REDIS_REST_TOKEN })
    : null;

const limiters = new Map<string, Ratelimit>();

function sharedLimiter(limit: number, windowMs: number): Ratelimit | null {
  if (!redis) return null;
  const id = `${limit}:${windowMs}`;
  let limiter = limiters.get(id);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      prefix: "cohen:rl",
      analytics: false,
    });
    limiters.set(id, limiter);
  }
  return limiter;
}

/**
 * Sliding window shared by every instance through Upstash. Keys must not contain raw PII:
 * pass a hash (see `hashKey`) when limiting by email or phone.
 */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const limiter = sharedLimiter(limit, windowMs);
  // Soft-launch: without Upstash use per-instance memory so the form still accepts leads.
  // Add UPSTASH_* in production ASAP — memory limits do not share across Vercel instances.
  if (!limiter) {
    if (isDeployedProduction(serverEnv)) {
      reportError("rate-limit", new Error("Upstash missing — using per-instance memory limit"));
    }
    return memoryLimit(key, limit, windowMs);
  }
  try {
    const { success } = await limiter.limit(key);
    return success;
  } catch (error) {
    reportError("rate-limit", error);
    // Prefer accepting the lead over a hard outage when Redis blips.
    return memoryLimit(key, limit, windowMs);
  }
}

/**
 * HMAC-SHA256 (truncated) — phone/email are low-entropy, so a plain hash is dictionary-reversible
 * by anyone who reads the Redis keys. Prefers RATE_LIMIT_HMAC_SECRET, else the Server Actions key.
 */
export async function hashKey(value: string): Promise<string> {
  const secret =
    serverEnv.RATE_LIMIT_HMAC_SECRET ??
    serverEnv.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY ??
    "local-development-only";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value.trim().toLowerCase()));
  return Array.from(new Uint8Array(signature).slice(0, 16), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

import "server-only";
import { timingSafeEqual } from "node:crypto";

/** Constant-time string compare for secrets (Webhook / revalidate tokens). */
export function timingSafeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

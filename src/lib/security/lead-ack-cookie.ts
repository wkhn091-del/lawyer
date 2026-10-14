/** Thank-you ack cookie. Production uses `__Host-` (Secure + Path=/ + no Domain). */
export const LEAD_ACK_COOKIE =
  process.env.NODE_ENV === "production" ? "__Host-cb_lead_ack" : "cb_lead_ack";

/** Legacy names still read once after deploy (then expire). */
export const LEAD_ACK_COOKIE_LEGACY = ["cb_lead_ack", "cb_demo"] as const;

export function leadAckCookieOptions(maxAgeSeconds = 60 * 30) {
  const production = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: production,
    sameSite: "lax" as const,
    // __Host- requires Path=/; keep the same in all envs for one code path.
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

import { publicEnv } from "@/lib/env/public";

/** RFC 9116 — contact for security researchers. */
export function GET() {
  const site = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const body = [
    "Contact: mailto:avi@cohen-law.co.il",
    `Canonical: ${site}/.well-known/security.txt`,
    "Preferred-Languages: he, en",
    `Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}`,
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

import { NextResponse } from "next/server";

const NO_STORE = { "Cache-Control": "private, no-store, max-age=0" } as const;

/** Uptime probe. Reveals nothing about versions, env or dependencies. */
export function GET() {
  return new Response("ok", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...NO_STORE,
      Allow: "GET, HEAD",
    },
  });
}

export function HEAD() {
  return new Response(null, { status: 200, headers: { ...NO_STORE, Allow: "GET, HEAD" } });
}

export function POST() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405, headers: { Allow: "GET, HEAD", ...NO_STORE } });
}

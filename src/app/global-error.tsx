"use client";

import { useEffect } from "react";

/** Root fallback — no shared layout; keep markup and styles self-contained. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[fatal]", error.digest ?? error.name);
  }, [error]);

  return (
    <html lang="he" dir="rtl">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#F7F4EF", color: "#1a1a1a" }}>
        <main style={{ maxWidth: 36 * 16, margin: "0 auto", padding: "5rem 1.25rem" }}>
          <p style={{ letterSpacing: "0.06em", color: "#C9A961", fontSize: 14 }}>כהן ושות׳</p>
          <h1 style={{ marginTop: 12, fontSize: "2rem", color: "#2A2927" }}>משהו השתבש</h1>
          <p style={{ marginTop: 16, color: "#5c5c5c" }}>נסו לרענן. אם זה נמשך, התקשרו ל־03-6125890.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 32,
              minHeight: 48,
              padding: "0 1.5rem",
              border: 0,
              borderRadius: 6,
              background: "#2A2927",
              color: "#F7F4EF",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            נסו שוב
          </button>
        </main>
      </body>
    </html>
  );
}
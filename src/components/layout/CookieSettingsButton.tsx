"use client";

import { CONSENT_STORAGE_KEY } from "@/lib/analytics/consent";

/** Withdrawal must be as easy as consent: clears the stored choice and reloads so the banner returns. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer-link inline-flex min-h-11 items-center underline-offset-4 hover:underline"
      onClick={() => {
        try {
          window.localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch {
          /* Private mode — reload still re-shows the banner for this view. */
        }
        window.location.reload();
      }}
    >
      הגדרות עוגיות
    </button>
  );
}

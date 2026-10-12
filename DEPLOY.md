# פריסה — כהן ושות׳ (cohen-law.co.il)

Stack: Next.js (App Router) על Vercel · תוכן ב-`src/content` (Sanity schemas ב-`sanity/schemas` לחיבור עתידי)

## משתני סביבה

| משתנה | חובה בפרודקשן | הערה |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | כן | `https://cohen-law.co.il` |
| `LEAD_DELIVERY_MODE` | כן | `live` בפרודקשן, `console` בפיתוח |
| `CRM_WEBHOOK_URL` | מומלץ | Lawyer Office Manager / webhook לידים |
| `CRM_WEBHOOK_TOKEN` | אם ה-CRM דורש | Bearer |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` | חלופה למייל | `info@` / `avi@` |
| `SLACK_WEBHOOK_URL` | אופציונלי | התראות צוות |
| `UPSTASH_REDIS_REST_URL` + `TOKEN` | כן בפרוד | Rate limit |
| `TURNSTILE_*` | כן בפרוד | Cloudflare Turnstile |
| `SENTRY_DSN` | כן בפרוד | |
| `NEXT_PUBLIC_GTM_ID` | מומלץ | GA4 דרך GTM |

בפיתוח מקומי: בלי המשתנים למעלה הטופס עובד ב-`console` mode.

## דומיין ומעבר מ-Wix

1. להצביע `cohen-law.co.il` ל-Vercel.
2. לשמור מיילים (Domain The Net / ספק מייל קיים) — לא להעביר MX בטעות.
3. לייצא URL ישנים מ-Wix ולהוסיף redirects ב-`next.config.ts` (`async redirects`).
4. SSL אוטומטי ב-Vercel.

## Sanity (שלב הבא)

1. `npm create sanity@latest`
2. לייבא schemas מ-`sanity/schemas`
3. CORS: הוספת דומיין הפרודקשן + Studio
4. טוקן קריאה נפרד מכתיבה

## בדיקות לפני עלייה

- [ ] טופס ליד (console / webhook)
- [ ] עמודי שירות ×3 + Schema LegalService
- [ ] נגישות מקלדת + reduced-motion
- [ ] באנר עוגיות אחרי גלילה/10 שנ׳
- [ ] redirects מ-Wix
- [ ] ח.פ + כתובת ב-CMS/`site.ts`

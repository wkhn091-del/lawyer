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
| `SLACK_WEBHOOK_URL` | אופציונלי | התראות צוות בלבד — לא נחשב מסירת ליד (חייב גם CRM או מייל) |
| `UPSTASH_REDIS_REST_URL` + `TOKEN` | כן בפרוד | Rate limit |
| `RATE_LIMIT_HMAC_SECRET` | כן בפרוד | `openssl rand -hex 32` — חתימת HMAC למפתחות rate-limit (טלפון/מייל) |
| `TURNSTILE_*` | כן בפרוד | Cloudflare Turnstile |
| `SENTRY_DSN` | כן בפרוד | |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | כן בפרוד | `openssl rand -base64 32` — יציבות Server Actions בין instances |
| `NEXT_PUBLIC_GTM_ID` | מומלץ | GA4 דרך GTM |

בפיתוח מקומי: בלי המשתנים למעלה הטופס עובד ב-`console` mode.

## דומיין ומעבר מ-Wix

1. להצביע `cohen-law.co.il` ל-Vercel.
2. לשמור מיילים (Domain The Net / ספק מייל קיים) — לא להעביר MX בטעות.
3. לייצא URL ישנים מ-Wix ולהוסיף redirects ב-`next.config.ts` (`async redirects`).
4. SSL אוטומטי ב-Vercel.

## Sanity (שלב הבא — לא חוסם השקה)

סטטוס: **לא מחובר לחי.** התוכן ב-`src/content`. אין GROQ בפרודקשן עד חיבור Studio.

1. `npm create sanity@latest` + ייבוא מ-`sanity/schemas`
2. Studio על `studio.cohen-law.co.il` (MFA + Role Editor)
3. CORS: רק `cohen-law.co.il` + `www` + Preview
4. טוקן קריאה (CDN) נפרד מטוקן כתיבה
5. כל GROQ: פרמטרים בלבד + projection מפורש — בלי שרשור מחרוזות

## בדיקות לפני עלייה

### מוצר / תוכן
- [ ] טופס ליד (console → live + webhook/מייל)
- [ ] עמודי שירות ×3 + Schema LegalService
- [ ] נגישות מקלדת + reduced-motion
- [ ] באנר עוגיות אחרי גלילה/10 שנ׳
- [ ] redirects מ-Wix (רשימת URL מלאה)
- [ ] ח.פ + כתובת ב-CMS/`site.ts` (חוסם השקה משפטית)

### אבטחה — Level A (Defense in Depth)
- [ ] `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` מוגדר ב-Vercel Production
- [ ] Turnstile + Upstash + Sentry בפרוד; `LEAD_DELIVERY_MODE=live`
- [ ] Headers: HSTS / nosniff / DENY frame / COOP / CORP / Permissions-Policy
- [ ] CSP עם nonce (proxy) — בלי `unsafe-inline` לסקריפטים
- [ ] `/.well-known/security.txt` נגיש
- [ ] Cookie תודה `cb_lead_ack` — בלי מייל; HttpOnly + Secure
- [ ] `/thank-you` ו-`/api/health` עם `Cache-Control: no-store`
- [ ] `allowedOrigins` ל-Server Actions כולל הדומיין האמיתי
- [ ] אין PII בלוגים בפרוד; לידים רק למייל/CRM/Slack

### אבטחה — Level B (ops תוך 30 יום / הוקדם בקוד)
- [ ] Dependabot פעיל ב-GitHub; CI נכשל על High/Critical ב-`npm audit`
- [ ] 2FA על GitHub / Vercel / Cloudflare / GTM / רשם / תיבות מייל
- [ ] Branch protection על `main` + Secret scanning
- [ ] Vercel Deployment Protection על Preview
- [ ] SPF + DKIM + DMARC (`p=quarantine` לפחות) לדומיין השולח
- [ ] התראת Sentry על קפיצה ב-`blocked:*`
- [ ] דף אירועים: `docs/handoff/05-security-incident-sheet.md` בידי המשרד
- [ ] GTM: גישת עריכה רק לבעלים (לא «פתוח לכולם»)

### אבטחה — Level C + שער עלייה
- [ ] `docs/go-live-security-gate.md` — כל הסעיפים האוטומטיים והידניים
- [ ] CSP reports מגיעים ל-Runtime Logs כ-`[csp]` (בלי PII)
- [ ] Cookie תודה בפרוד: `__Host-cb_lead_ack`
- [ ] Vercel Firewall / Cloudflare bot rules (לפחות rate כללית)
- [ ] OWASP ZAP baseline על Preview לפני cutover

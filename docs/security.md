# אבטחה — כהן ושות׳ (סקריפט 3, מודול א׳)

עודכן: 13.10.2026. כל שינוי שמחליש שכבה כאן מחייב אישור לפני המיזוג.

## משטח התקיפה
אתר תדמית לידים: בלי DB לקוחות, בלי חשבונות, בלי סליקה. נקודת קלט עיקרית: `submitLead` ב-`src/lib/leads/actions.ts`. הנתונים יוצאים רק ל-CRM / Slack / Resend בצד השרת.

## רמה א׳ — לפני השקה (הושלם)

| שכבה | איפה | מגנה מפני | לא מגנה מפני |
|---|---|---|---|
| CSP + nonce | `proxy.ts`, `csp.ts` | XSS בסיסי, iframe זדוני | סקריפט שנטען מתוך GTM אחרי הסכמה |
| כותרות | `headers.ts` → proxy + `next.config` | Clickjacking, MIME sniff, Referrer, CORP/COOP | כלום ברמת השרת |
| Origin מדויק | `origin.ts` | CSRF / בקשה בלי Origin | זיוף Origin נכון (Turnstile + rate limit) |
| Honeypot + זמן מילוי | `actions.ts` | בוטים פשוטים | בוט עם דפדפן אמיתי |
| Upstash rate limit | `rate-limit.ts` | הצפת לידים לפי IP/מייל | בוטנט ענק |
| Turnstile | `turnstile.ts` | בוטים מבוססי דפדפן | ספאם ידני |
| Zod + CRLF strip | `schema.ts`, `deliver.ts` | קלט חריג + הזרקת כותרות מייל | — |
| Cookie תודה | `__Host-cb_lead_ack` (פרוד) | בלי מייל; HttpOnly/Secure; Path=/ | — |
| Cache | thank-you / health / security.txt | דליפת דף אישי מ-CDN | — |
| Env Zod + encryption key | `env/server.ts` | עלייה בלי סודות / מפתח Actions | מפתח תקין אבל שגוי |
| `security.txt` | `/.well-known/security.txt` | ערוץ דיווח לחוקרים | — |
| Cart / OTP / IDOR הזמנות | — | **לא רלוונטי** (מתועד) | — |

## רמה ב׳ — בתוך 30 יום מההשקה (הושלם בקוד + נהלים)

| סעיף | אצלנו |
|---|---|
| העלאת קבצים / ביקורות | **לא רלוונטי** |
| CORS & API hygiene | `/api/health` — GET/HEAD בלבד, 405 ל-POST, בלי מידע פנימי |
| Dependency Security | Dependabot + `npm audit --omit=dev --audit-level=high` ב-CI |
| Monitoring | Sentry (בלי PII); התראות על `blocked:*` — להגדיר בקונסול Sentry |
| CSV / Formula injection | `csvSafeCell` לפני שדות שעלולים להיפתח ב-Sheets |
| Image allowlist | `remotePatterns: []` — רק `/public` |
| Third-party scripts | GTM רק אחרי הסכמה + nonce; גישת עריכה ל-GTM מוגבלת |
| Email / Domain | צ׳קליסט SPF/DKIM/DMARC ב-`DEPLOY.md` (ביצוע אצל הרשם/ספק מייל) |
| Clerk webhooks | **לא רלוונטי** |
| Error pages | `not-found` / `error` / `global-error` בלי stack ללקוח |
| Backup & incident | `docs/handoff/05-security-incident-sheet.md` + Rollback ב-Vercel |

## רמה ג׳ — הקשחה מתקדמת (הושלם בקוד + שער השקה)

| סעיף | אצלנו |
|---|---|
| Account takeover / Card fraud | **לא רלוונטי** (אין חשבונות / סליקה) |
| CSP Reporting | `report-uri` + `report-to` → `POST /api/csp-report` (rate-limited, בלי PII) |
| Trusted Types | **נדחה** — שובר React/Next כיום; ייבחן מחדש בהמשך |
| Cookie `__Host-` | `__Host-cb_lead_ack` בפרוד (Secure, Path=/, בלי Domain) |
| Tokens ב-localStorage | אסור; רק העדפת הסכמה `cb_consent_v1` |
| Data protection | אין DB לידים באתר; PII רק ל-CRM/מייל/Slack; לוג console בלי PII |
| Privacy | `/privacy` + באנר לפני GTM/Clarity |
| ReDoS / timeouts | Zod פשוט; `AbortSignal.timeout` ל-Turnstile/CRM/Slack/Resend |
| WAF / Geo | נהלי Vercel Firewall — `DEPLOY.md` / Go-Live Gate |
| Pentest | OWASP ZAP baseline על Preview — `docs/go-live-security-gate.md` |
| Go-Live Gate | `docs/go-live-security-gate.md` + `security.txt` |

## מפתחות
- אין `NEXT_PUBLIC_` על סודות.
- Preview ≠ Production: Upstash / Turnstile / Sentry env נפרדים.
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`: `openssl rand -base64 32`.
- רוטציה: אחרי חשד לדליפה / עזיבת עובד / פעם בשנה — ראו `DEPLOY.md`.

## לפני השקה — נהלים (חוסם אנושי)
- [ ] 2FA: GitHub, Vercel, Cloudflare, Upstash, Sentry, Google (GTM), רשם דומיין, תיבות מייל
- [ ] Branch protection על `main` (PR + CI ירוק)
- [ ] Secret scanning + Push protection ב-GitHub
- [ ] Vercel Deployment Protection על Preview
- [ ] משתני פרוד מול `DEPLOY.md`
- [ ] SPF + DKIM + DMARC לפני מייל לידים ראשון מ-`cohen-law.co.il`

## בדיקות
- Vitest: origin, safe-path, csv-safe, lead schema
- Playwright · «אבטחה»: headers/CSP, no-store, health 405, security.txt, Action בלי Origin

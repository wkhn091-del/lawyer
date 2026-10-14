# צ׳קליסט השקה — כהן ושות׳ (מודול ב׳)

מקור החלטות: `PROJECT_BRIEF.md` · אבטחה: `docs/go-live-security-gate.md` · פריסה: `DEPLOY.md`

## א. מה הלקוח / הסוכנות מספקים לפני cutover

### חשבונות + 2FA
| חשבון | 2FA | הערה |
|---|---|---|
| GitHub (`lawyer`) | חובה | Branch protection על `main` |
| Vercel | חובה | Production + Preview Protection |
| Domain The Net | חובה | DNS בלבד — לא MX |
| Cloudflare Turnstile | חובה | Widget נפרד ל-Preview/Prod |
| Upstash Redis | חובה | DB נפרד ל-Preview/Prod |
| Sentry | חובה | Environment tags |
| Google (GTM + GA4 + GSC) | חובה | |
| Clarity | מומלץ | אחרי באנר |
| Resend (או SMTP) | חובה למייל לידים | דומיין מאומת |
| CRM Lawyer Office Manager | כשיש webhook | URL + Bearer |
| Slack Incoming Webhook | אופציונלי | |

### משתני סביבה (Vercel Production)
ראו טבלה ב-`DEPLOY.md`. מינימום חי:  
`NEXT_PUBLIC_SITE_URL` · `LEAD_DELIVERY_MODE=live` · Turnstile · Upstash · Sentry · `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` · Resend+מייל ו/או CRM.

יצירת מפתח Actions: `openssl rand -base64 32`

### DNS (Domain The Net → Vercel)
| סוג | שם | ערך | הערה |
|---|---|---|---|
| A / ALIAS | `@` | לפי Vercel | אחרי הוספת דומיין בפרויקט |
| CNAME | `www` | לפי Vercel | הפניה לקנוני |
| — | — | — | **לא** לשנות MX / SPF קיים של מיילים בלי תיאום |

### מייל יוצא (לפני ליד ראשון מ-Resend על הדומיין)
| רשומה | מטרה |
|---|---|
| SPF | לכלול Resend / הספק |
| DKIM | מפתחות מ-Resend |
| DMARC | לפחות `p=quarantine` |
| CAA | אופציונלי |

### תוכן שחוסם / לא ממציאים
- [ ] ח.פ / כתובת רחוב — כשיאושרו בלבד
- [ ] ייצוא URLs מ-Wix → השלמת `wix-redirects.ts`
- [ ] צילום צוות אמיתי (אופציונלי לעלייה טכנית)

## ב. ביצוע טכני (אחרי אישור)
1. וידוא env ב-Vercel Preview → בדיקת ליד console/live
2. השלמת redirects מול ייצוא Wix
3. Schema / sitemap / OG לפי קבוצות 5–6
4. GTM ID + אירועי KPI (בלי PII)
5. Go-Live Gate (`docs/go-live-security-gate.md`)
6. DNS cutover · SSL · בדיקת tel + טופס מפרוד
7. GSC: sitemap · מעקב 404 שבועיים

## ג. לא בונים בהשקה זו
PWA · Calendly · Pixel מטא/לינקדאין · מייל אוטומטי לפונה · SMS/WhatsApp צוות מהאתר · סליקה

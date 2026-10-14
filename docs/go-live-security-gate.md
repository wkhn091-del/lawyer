# Go-Live Security Gate — כהן ושות׳

אין עלייה לאוויר לפני שכל סעיפי **רמה א׳** עברו. רמה ב׳/ג׳ בקוד כבר הוטמעו; הסעיפים האנושיים למטה חוסמים.

## אוטומטי (CI / מקומי)
- [ ] `npm ci` + `npm audit --omit=dev --audit-level=high` = 0 High/Critical
- [ ] `npm run typecheck` · `npm test` · `npm run build` · `npm run test:e2e`
- [ ] Playwright «אבטחה»: headers, CSP nonce, thank-you/health `no-store`, health 405, security.txt, Action בלי Origin

## ידני לפני DNS cutover
- [ ] HSTS `includeSubDomains`: כל תת־דומיין ב־DNS (כולל webmail של ספק המייל) עונה ב־HTTPS. **לא** להגיש ל־hstspreload.org בחודשים הראשונים
- [ ] [securityheaders.com](https://securityheaders.com) / Mozilla Observatory על הדומיין (או Preview) — יעד A או יותר
- [ ] קונסול דפדפן: אין הפרות CSP אדומות בגלילה מלאה + שליחת ליד
- [ ] Rate limit: 6 שליחות מהירות מאותו IP → הודעת חסימה (לא 500)
- [ ] Cache: אחרי שליחת ליד, `/thank-you` לא מציג שם של מבקר אחר בחלון פרטי/מכשיר שני
- [ ] IDOR: **לא רלוונטי** (אין חשבונות / הזמנות ב-URL)
- [ ] `/.well-known/security.txt` מחזיר Contact ל-`avi@cohen-law.co.il`
- [ ] `GET /api/health` → `ok` בלבד; `POST` → 405

## תשתית ונהלים
- [ ] 2FA על GitHub, Vercel, Cloudflare, GTM, Upstash, Sentry, רשם, תיבות מייל
- [ ] Branch protection + Secret scanning על `main`
- [ ] Vercel Deployment Protection על Preview
- [ ] מפתחות Preview ≠ Production
- [ ] SPF + DKIM + DMARC לפני מייל לידים ראשון
- [ ] Vercel Firewall / Cloudflare: Rate כללית + בוטים ידועים (אופציונלי Geo)
- [ ] Sentry alert על קפיצה ב-`blocked:*`
- [ ] OWASP ZAP baseline על Staging/Preview (ספאם XSS/headers) — לפני cutover

## אחרי עלייה (24–48 שע׳)
- [ ] Search Console: sitemap + מעקב 404
- [ ] ליד בדיקה אמיתי ל-CRM/מייל
- [ ] בדיקת לוג `[csp]` — רעש צפוי מתוספי דפדפן; חריגות אמיתיות לתיקון

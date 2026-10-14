# ארכיטקטורה — כהן ושות׳ (סקריפט 1 · מודול א׳)

עודכן: 13.10.2026

## סוג האתר
אתר תדמית + לידים למשרד עורכי דין. **אין** מכירה אונליין, עגלה, סליקה, Variants או Faceted Search (חוק 9 — מתועד ב-`PROJECT_BRIEF.md`).

## Tier
**Tier 1** — בלי 3D; תנועה עדינה (GSAP Motion Kit, preset `law`).

## טכנולוגיות
| שכבה | בחירה | הערה |
|---|---|---|
| Framework | Next.js 16 App Router | `src/proxy.ts` (אין `middleware.ts` נפרד) |
| עיצוב | Tailwind 4 · טוקנים ב-`@theme` (`globals.css`) | נייבי / זהב / קרם |
| תוכן חי | `src/content/*` | מקור אמת עד חיבור CMS |
| CMS עתידי | Sanity schemas ב-`sanity/schemas/` | Studio מתוכנן: `studio.cohen-law.co.il` |
| GROQ | **לא בשימוש בחי** | עד חיבור Studio — אין שאילתות; כשיופעל: פרמטרים + projection בלבד |
| ולידציה | Zod 4 | לידים + env |
| תנועה | GSAP + Motion Kit | preset `law`; reduced-motion נתמך |
| טפסים | Server Action `submitLead` | Turnstile · rate limit · Origin |
| בדיקות | Vitest + Playwright + CI | |
| אחסון | Vercel | DNS: Domain The Net |

## מבנה
```
src/
  app/           עמודים: בית, שירותים, אודות, צוות, קשר, תודה, משפטיים, en
  components/    home/, contact/, layout/, seo/, analytics/, brand/, ui/, motion/
  content/       site, home, services, thank-you
  lib/
    leads/       schema, actions, deliver
    env/         public + server-only
    security/    csp, headers, origin, rate-limit, turnstile, safe-path, …
    seo/         schema, wix-redirects
    analytics/   track, consent
  proxy.ts       CSP nonce + כותרות אבטחה
sanity/schemas/  טיוטות service / siteSettings / testimonial (לא מחוברות)
```

## מפת אבטחה (תמצית)
| נתון | ציבורי / פרטי | איפה |
|---|---|---|
| תוכן שיווקי | ציבורי | `src/content` / עתיד: Sanity CDN |
| ליד (PII) | פרטי | שרת → CRM / מייל / Slack בלבד |
| סודות | פרטי | env + `server-only` + Zod |
| אזור אישי | — | אין |

פירוט שכבות: `docs/security.md`.

## ביצועים
- Hero LCP: תמונה מקומית `next/image` + `priority`
- בלי עגלה / בלי DB — צוואר הבקבוק הוא טופס הליד (מוגן rate limit)

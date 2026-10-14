# כיסוי מטריצת לוגיקה עסקית (לידים)

מקור המטריצה: `PROJECT_BRIEF.md` § מטריצת לוגיקה עסקית.

| שורת מטריצה | Unit (Vitest) | E2E (Playwright) | הערה |
|---|---|---|---|
| טופס מלא → תודה | `leadSchema` accept | `טופס ליד › שליחה תקינה` | |
| בלי טלפון / שדות ריקים | schema fail | `שליחה ריקה מציגה שגיאות` | |
| טלפון +972 | `normalizeIsraeliPhone` | — | מכוסה יחידה |
| תחום family | schema enum | שליחה מלאה (ברירת משפחה) | |
| honeypot / מילוי מהיר | — | — | לוגיקה ב-`actions.ts` (`looksAutomated` → redirect בלי deliver); לא e2e (התנהגות בוט) |
| rate limit | — | — | דורש Upstash בפרוד; מוגן ב-CI ע״י absence | מתועד — אין הצפה ב-e2e |
| Origin חסר | — | `Server Action בלי Origin נדחה` | |
| CRLF בהודעה | `strips CRLF from message` | — | |

עדכון אחרון: 13.10.2026 (ביקורת סקריפט 5).

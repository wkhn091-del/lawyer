# מעבר מ-Wix — redirects 301

המיפוי החי בקוד: `src/lib/seo/wix-redirects.ts` (נטען ב-`next.config.ts`).

## מה הלקוח צריך לספק
1. ייצוא כל ה-URLs מהאתר הישן (Google Search Console → Pages, או סריקת Screaming Frog ל-`cohen-law.co.il`).
2. לכל URL ישן — היעד החדש (או «למחוק / אין מקביל»).

## תהליך
1. מוסיפים שורות ל-`wixRedirects`.
2. `npm run build` + בדיקה שאין לולאות.
3. אחרי עלייה: Search Console → בדיקת כתובת ישנה → לוודא 301.
4. לשמור את קובץ הייצוא ב-`docs/wix-url-export.csv` (כשיגיע).

## כללים
- תמיד `permanent: true` (301) לשימור SEO.
- לא למחוק נתיב מדורג בלי redirect.
- עברית בנתיב: לקודד בדיוק כמו ב-Wix (כולל מקפים).

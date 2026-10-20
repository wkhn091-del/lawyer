import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "הצהרת נגישות", alternates: { canonical: "/accessibility" } };

export default function AccessibilityPage() {
  return (
    <LegalPage title="הצהרת נגישות" updated={site.accessibility.lastReviewed}>
      <p>
        {site.company} פועל להנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
        התשע״ג-2013, ולת״י 5568, ברמת תאימות AA של הנחיות WCAG 2.1.
      </p>
      <h2>מה נעשה באתר</h2>
      <ul>
        <li>מבנה סמנטי בעברית מימין לשמאל, כותרות מסודרות ודילוג לתוכן</li>
        <li>ניווט מלא במקלדת, כולל תפריט המובייל, עם סימון פוקוס בולט</li>
        <li>ניגודיות של 4.5:1 לפחות לטקסט, ו-3:1 לגבולות שדות</li>
        <li>טפסים עם תוויות, הודעות שגיאה שמוקראות לקוראי מסך, וקישור בין שדה לשגיאה</li>
        <li>טקסט חלופי לתמונות, וכיבוי אנימציות למי שהגדיר הפחתת תנועה</li>
      </ul>
      <h2>מגבלות ידועות</h2>
      <ul>
        <li>בדיקת האבטחה בטופס (Cloudflare Turnstile) היא רכיב של צד שלישי. אם היא חוסמת אתכם, התקשרו אלינו.</li>      </ul>
      <h2>רכז נגישות</h2>
      <p>
        {site.accessibility.coordinatorName}
        <br />
        טלפון:{" "}
        <a href={`tel:${site.contact.phoneTel}`} dir="ltr">
          <bdi>{site.accessibility.coordinatorPhone}</bdi>
        </a>
        <br />
        מייל:{" "}
        <a href={`mailto:${site.accessibility.coordinatorEmail}`} dir="ltr">
          <bdi>{site.accessibility.coordinatorEmail}</bdi>
        </a>
      </p>
      <p>אם נתקלתם בבעיית נגישות, נשמח שתפנו אלינו ונפעל לתקן.</p>
    </LegalPage>
  );
}

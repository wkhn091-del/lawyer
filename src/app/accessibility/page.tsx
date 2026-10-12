import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "הצהרת נגישות" };

export default function AccessibilityPage() {
  return (
    <LegalPage title="הצהרת נגישות" updated={site.accessibility.lastReviewed}>
      <p>
        {site.company} פועל להנגשת האתר בהתאם לתקנות הנגישות ולת״י 5568, כדי לאפשר שימוש נוח גם לאנשים עם מוגבלות.
      </p>
      <h2>מה נעשה באתר</h2>
      <ul>
        <li>מבנה סמנטי, ניווט מקלדת ודילוג לתוכן</li>
        <li>ניגודיות גבוהה בטקסטים העיקריים</li>
        <li>תמיכה ב-prefers-reduced-motion</li>
        <li>טפסים עם תוויות והודעות שגיאה ברורות</li>
      </ul>
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
      <p>אם נתקלתם בבעיית נגישות — נשמח שתפנו אלינו ונפעל לתקן.</p>
    </LegalPage>
  );
}

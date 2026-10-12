import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "מדיניות פרטיות" };

export default function PrivacyPage() {
  return (
    <LegalPage title="מדיניות פרטיות" updated="12.10.2026">
      <p>
        {site.company} («המשרד») מכבד את פרטיותכם. עמוד זה מסביר איזה מידע נאסף באתר{" "}
        <bdi dir="ltr">{site.domain}</bdi> ולמה.
      </p>
      <h2>מידע שנאסף</h2>
      <ul>
        <li>פרטים שאתם משאירים בטופס: שם, טלפון, דוא״ל, תחום פנייה ותיאור קצר.</li>
        <li>נתוני שימוש טכניים בסיסיים (למשל דפדפן ועמוד) אם אישרתם עוגיות מדידה.</li>
      </ul>
      <h2>למה משתמשים במידע</h2>
      <p>כדי לחזור אליכם לתיאום שיחת ייעוץ ולשפר את האתר. אין מכירת מידע לצדדים שלישיים לצורכי שיווק.</p>
      <h2>שמירה ואבטחה</h2>
      <p>
        הלידים מועברים למייל המשרד ו/או למערכת CRM ייעודית. סודות שרת אינם נחשפים לדפדפן. לבירורים:{" "}
        <a href={`mailto:${site.contact.email}`} dir="ltr">
          <bdi>{site.contact.email}</bdi>
        </a>
        .
      </p>
      <h2>זכויות</h2>
      <p>ניתן לבקש עיון, תיקון או מחיקה של פרטים שנגעו בכם, בכפוף לדין החל ולחובות המשרד.</p>
    </LegalPage>
  );
}

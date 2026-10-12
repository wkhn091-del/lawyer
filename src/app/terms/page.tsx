import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "תנאי שימוש" };

export default function TermsPage() {
  return (
    <LegalPage title="תנאי שימוש" updated="12.10.2026">
      <p>השימוש באתר {site.company} כפוף לתנאים אלה.</p>
      <h2>מידע כללי בלבד</h2>
      <p>
        התכנים באתר הם מידע כללי ואינם ייעוץ משפטי. אין להסתמך עליהם כתחליף לייעוץ אישי. שליחת טופס או יצירת קשר
        אינם יוצרים יחסי עו״ד-לקוח.
      </p>
      <h2>קניין רוחני</h2>
      <p>התכנים, העיצוב והסימנים באתר שייכים למשרד או לבעלי רישיון, ואין להעתיקם ללא אישור.</p>
      <h2>יצירת קשר</h2>
      <p>
        לשאלות:{" "}
        <a href={`mailto:${site.contact.infoEmail}`} dir="ltr">
          <bdi>{site.contact.infoEmail}</bdi>
        </a>
      </p>
    </LegalPage>
  );
}

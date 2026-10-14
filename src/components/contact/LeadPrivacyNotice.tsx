import Link from "next/link";
import { site } from "@/content/site";

/** Duty-to-inform notice at the point of collection (Privacy Protection Law s.11, GDPR art. 13). */
export function LeadPrivacyNotice() {
  return (
    <div className="space-y-2 text-small text-muted">
      <p>
        הפרטים נמסרים מרצונכם ואין חובה חוקית למסור אותם. {site.company} ישתמש בהם רק כדי לחזור אליכם בעניין
        הפנייה. הם נשמרים אצל ספקי שירות שעובדים עבורנו, חלקם מחוץ לישראל. ניתן לבקש עיון, תיקון או מחיקה.{" "}
        <Link href="/privacy" className="text-navy underline underline-offset-4">
          מדיניות הפרטיות
        </Link>
      </p>
      <p>
        שליחת הפנייה אינה יוצרת יחסי עו״ד-לקוח, והמידע באתר אינו ייעוץ משפטי. אל תפרטו כאן מידע רגיש ולא
        תצרפו מסמכים — נחזור אליכם ונשמע את הפרטים בשיחה.
      </p>
    </div>
  );
}

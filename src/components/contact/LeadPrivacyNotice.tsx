import Link from "next/link";

/**
 * Point-of-collection notice — duty-to-inform in compact form.
 * Full copy lives on /privacy. No marketing consent: we do not send promotional mail.
 */
export function LeadPrivacyNotice() {
  return (
    <div className="space-y-1.5 text-[0.72rem] leading-relaxed text-muted">
      <p>
        בשליחה אתם מאשרים שמסרתם את הפרטים מרצונכם כדי שנחזור אליכם לתיאום שיחה בלבד. לא נשלח דיוור
        שיווקי. הפרטים יועברו לספקי תשתית (אחסון, סינון בוטים, התראות משרד) כמפורט ב
        <Link href="/privacy" className="underline underline-offset-2 hover:text-navy">
          מדיניות הפרטיות
        </Link>
        . יש לכם זכות עיון, תיקון ומחיקה בפנייה למייל המשרד.
      </p>
      <p>הפנייה אינה יוצרת יחסי עו״ד-לקוח · אל תשלחו מסמכים או פרטים רגישים בטופס.</p>
    </div>
  );
}

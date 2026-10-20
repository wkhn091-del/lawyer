import Link from "next/link";

/**
 * Point-of-collection notice — duty-to-inform in compact form.
 * Full copy lives on /privacy. No marketing consent: we do not send promotional mail.
 */
export function LeadPrivacyNotice() {
  return (
    <div className="space-y-1 text-[0.68rem] leading-snug text-muted md:space-y-1.5 md:text-[0.72rem] md:leading-relaxed">
      <p>
        בשליחה מאשרים חזרה לתיאום שיחה בלבד — בלי דיוור שיווקי. פרטים עוברים לספקי תשתית כמפורט ב
        <Link href="/privacy" className="underline underline-offset-2 hover:text-navy">
          מדיניות הפרטיות
        </Link>
        .
      </p>
      <p>אינה יוצרת יחסי עו״ד-לקוח · בלי מסמכים או פרטים רגישים בטופס.</p>
    </div>
  );
}

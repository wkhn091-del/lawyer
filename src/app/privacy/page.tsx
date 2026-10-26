import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "מדיניות פרטיות", alternates: { canonical: "/privacy" } };

const PROCESSORS = [
  { name: "Vercel", role: "אחסון האתר ועיבוד הטופס", where: "ארה״ב / אירופה" },
  { name: "Resend", role: "העברת הפנייה לתיבת המשרד, כשהמייל הוא ערוץ המסירה הפעיל", where: "ארה״ב" },
  { name: "FormSubmit", role: "העברת פנייה לתיבת המשרד בשלב ההשקה (כשאין Resend/CRM)", where: "גלובלי" },
  { name: "מערכת ניהול הלקוחות (CRM) של המשרד", role: "תיעוד הפנייה וחזרה אליכם", where: "לפי הספק" },
  { name: "Slack", role: "התראה פנימית על פנייה חדשה (שם, טלפון ותחום בלבד)", where: "ארה״ב" },
  { name: "Cloudflare Turnstile", role: "סינון בוטים בטופס", where: "גלובלי" },
  { name: "Upstash", role: "הגבלת קצב שליחה (מזהים מגובבים ב־HMAC, בלי לשמור טלפון או דוא״ל)", where: "אירופה" },
  { name: "Sentry", role: "ניטור תקלות טכניות, ללא פרטי הטופס", where: "ארה״ב" },
  { name: "Google (Analytics, Ads)", role: "מדידה, רק אם אישרתם עוגיות", where: "ארה״ב" },
  { name: "Microsoft Clarity", role: "מפות חום וניתוח שימוש, רק אם אישרתם עוגיות", where: "ארה״ב / אירופה" },
] as const;

export default function PrivacyPage() {
  const { legalName, companyId, address } = site.legal;
  return (
    <LegalPage title="מדיניות פרטיות" updated="13.10.2026">
      <p>
        עמוד זה מסביר איזה מידע נאסף באתר <bdi dir="ltr">{site.domain}</bdi>, למה, למי הוא מועבר ואיך ממשים את
        זכויותיכם לפי חוק הגנת הפרטיות, התשמ״א-1981, ולפי ה-GDPR כשהוא חל.
      </p>

      <h2>מי אחראי למידע</h2>
      <p>
        {legalName ?? site.company}
        {companyId ? `, ח.פ ${companyId}` : null}
        {address ? `, ${address}` : null}. לפניות בנושא פרטיות:{" "}
        <a href={`mailto:${site.contact.email}`} dir="ltr">
          <bdi>{site.contact.email}</bdi>
        </a>
        .
      </p>

      <h2>מידע שנאסף</h2>
      <ul>
        <li>פרטים שאתם משאירים בטופס: שם, טלפון, ולפעמים דוא״ל, תחום פנייה ותיאור קצר.</li>
        <li>נתוני שימוש טכניים (דפדפן, עמוד, מקור הגעה), רק אם אישרתם עוגיות מדידה.</li>
      </ul>

      <h2>מטרה ובסיס</h2>
      <p>
        המידע משמש רק כדי לחזור אליכם בעניין הפנייה ולקביעת שיחה, ובנתוני שימוש לשיפור האתר. מסירת הפרטים
        היא מרצונכם ואין חובה חוקית למסור אותם, אבל בלעדיהם לא נוכל לחזור אליכם. איננו שולחים דיוור שיווקי
        ואיננו מוכרים מידע.
      </p>
      <p>
        שליחת פנייה אינה יוצרת יחסי עו״ד-לקוח. בשלב הפנייה אנא אל תצרפו מסמכים או פרטים רגישים.
      </p>

      <h2>למי המידע מועבר</h2>
      <p>המידע נשמר אצל ספקי שירות שפועלים עבורנו ורק לצורך המטרות שלמעלה. חלקם מאחסנים מידע מחוץ לישראל:</p>
      <ul>
        {PROCESSORS.map((processor) => (
          <li key={processor.name}>
            <strong>{processor.name}</strong>: {processor.role} ({processor.where})
          </li>
        ))}
      </ul>

      <h2>כמה זמן נשמר המידע</h2>
      <p>
        פנייה שלא הבשילה לטיפול נמחקת עד 24 חודשים ממועד הפנייה. פנייה שהפכה לתיק נשמרת לפי חובות השמירה של
        המשרד כעורכי דין. נתוני מדידה נשמרים לפי הגדרות Google Analytics (עד 14 חודשים).
      </p>

      <h2>אבטחה</h2>
      <p>
        התקשורת מוצפנת (HTTPS), הגישה למערכות מוגבלת לצוות המשרד, וסודות השרת אינם נחשפים לדפדפן.
      </p>

      <h2>הזכויות שלכם</h2>
      <p>
        אתם רשאים לבקש לעיין במידע עליכם, לתקן אותו או למחוק אותו, ולבטל הסכמה לעוגיות בכל עת ב
        <Link href="/cookies">מדיניות העוגיות</Link>. שלחו בקשה ל-
        <a href={`mailto:${site.contact.email}`} dir="ltr">
          <bdi>{site.contact.email}</bdi>
        </a>{" "}
        ונשיב תוך 30 יום. אם לא נעננו, אפשר לפנות לרשות להגנת הפרטיות.
      </p>
    </LegalPage>
  );
}

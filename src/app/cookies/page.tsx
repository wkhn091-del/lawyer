import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "מדיניות עוגיות" };

export default function CookiesPage() {
  return (
    <LegalPage title="מדיניות עוגיות" updated="12.10.2026">
      <p>האתר משתמש בעוגיות חיוניות לתפעול, ובעוגיות מדידה רק אם אישרתם זאת בבאנר.</p>
      <h2>חיוניות</h2>
      <p>נדרשות לאבטחה בסיסית ולשמירת בחירת ההסכמה. לא ניתן לכבות אותן בלי לפגוע בתפקוד.</p>
      <h2>מדידה</h2>
      <p>Google Analytics / GTM ו-Microsoft Clarity — רק אחרי הסכמה. אפשר לדחות בכל עת דרך באנר העוגיות (או ניקוי האחסון המקומי).</p>
    </LegalPage>
  );
}

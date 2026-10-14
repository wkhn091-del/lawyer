export const site = {
  brand: "כהן ושות׳",
  tagline: "משרד עורכי דין",
  company: "משרד עורכי דין כהן ושות׳",
  domain: "cohen-law.co.il",
  description:
    "משרד עורכי דין כהן ושות׳: משפחה וגירושין, דיני עבודה ונדל״ן. 12 שנה במרכז — שעה אחת של שיחה, ותדעו איפה אתם עומדים ומי מטפל בתיק.",
  nav: [
    { href: "/services/family", label: "דיני משפחה" },
    { href: "/services/labor", label: "דיני עבודה" },
    { href: "/services/real-estate", label: "נדל״ן" },
    { href: "/about", label: "אודות" },
    { href: "/team", label: "הצוות" },
    { href: "/faq", label: "שאלות" },
    { href: "/contact", label: "צור קשר" },
  ],
  legal: {
    legalName: "משרד עורכי דין כהן ושות׳" as string | null,
    companyId: null as string | null,
    address: null as string | null,
  },
  contact: {
    phone: "03-6125890",
    phoneTel: "+97236125890",
    email: "avi@cohen-law.co.il",
    infoEmail: "info@cohen-law.co.il",
    hours: "א׳–ה׳ 09:00 עד 18:00",
    whatsapp: null as string | null,
  },
  accessibility: {
    coordinatorName: "עו״ד אבי כהן",
    coordinatorEmail: "avi@cohen-law.co.il",
    coordinatorPhone: "03-6125890",
    lastReviewed: "12.10.2026",
  },
  social: [] as ReadonlyArray<{ label: string; href: string; network: "linkedin" | "facebook" | "instagram" }>,
  footer: {
    miniHero: {
      title: "רוצים לדעת איפה אתם עומדים?",
      lead: "שיחה אחת. תוכנית והערכת עלות. בלי התחייבות לייצוג.",
      cta: "לקביעת פגישת ייעוץ",
      href: "/contact#lead",
    },
    office: [
      { href: "/about", label: "אודות" },
      { href: "/team", label: "הצוות" },
      { href: "/faq", label: "שאלות נפוצות" },
      { href: "/blog", label: "מאמרים" },
      { href: "/contact", label: "צור קשר" },
      { href: "/en", label: "English", hrefLang: "en" as const },
    ],
    legal: [
      { href: "/privacy", label: "פרטיות" },
      { href: "/terms", label: "תנאי שימוש" },
      { href: "/accessibility", label: "הצהרת נגישות" },
      { href: "/cookies", label: "מדיניות עוגיות" },
    ],
    disclaimer: "המידע באתר אינו ייעוץ משפטי ואינו יוצר יחסי עו״ד-לקוח.",
  },
} as const;

export const practiceAreas = [
  {
    id: "family" as const,
    href: "/services/family",
    title: "דיני משפחה וגירושין",
    door: "מצב משפחתי או גירושין",
    summary: "גירושין, מזונות, משמורת והסכמי ממון. מה חובה עכשיו, ומה יכול לחכות.",
    icon: "/icons/family.svg",
    image: "/media/practice-family.jpg",
    imageAlt: "פינת אוכל שקטה באור בוקר (הדמיה אווירה לתחום משפחה)",
  },
  {
    id: "labor" as const,
    href: "/services/labor",
    title: "דיני עבודה",
    door: "פיטורין או זכויות בעבודה",
    summary: "פיטורין, זכויות עובדים והסכמי עבודה. בודקים מה מגיע לכם לפני שחותמים.",
    icon: "/icons/labor.svg",
    image: "/media/practice-labor.jpg",
    imageAlt: "שולחן עבודה אחרי שעות (הדמיה אווירה לתחום עבודה)",
  },
  {
    id: "real-estate" as const,
    href: "/services/real-estate",
    title: "נדל״ן",
    door: "עסקת נדל״ן או חוזה",
    summary: "חוזי מכר, ליווי עסקאות וירושות. גם באנגלית, לרוכשים מחו״ל.",
    icon: "/icons/real-estate.svg",
    image: "/media/practice-real-estate.jpg",
    imageAlt: "מסדרון דירה עם אור טבעי (הדמיה אווירה לתחום נדל״ן)",
  },
] as const;

export type PracticeAreaId = (typeof practiceAreas)[number]["id"] | "other";

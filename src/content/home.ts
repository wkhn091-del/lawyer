import { practiceAreas } from "./site";

/**
 * Home copy — aligned to «מילים של מיליונים» N27 (משרד עורכי דין):
 * quiet/clear voice, no outcome promises, client questions first,
 * concrete CTAs, fact before adjective.
 */
export const home = {
  hero: {
    /** Full sentence for SEO / a11y; lines drive the stacked visual. */
    h1: "לפני שחותמים — תדעו מה כתוב.",
    h1Lines: ["לפני שחותמים", "תדעו מה כתוב."] as const,
    lead: "שעה אחת. תוכנית והערכת עלות. בלי התחייבות לייצוג.",
    offer: "שיחה ראשונה · שקיפות בעלויות מההתחלה",
    primaryCta: "לקביעת השיחה",
    primaryHref: "#lead",
    phoneCta: "או התקשרו עכשיו",
    trust: "12 שנה במרכז · מענה תוך יום עסקים",
    reassurance: "מענה תוך יום עסקים · בלי התחייבות לייצוג בשלב הזה",
    archLabel: "תחומי הליבה",
    frameAlt: "תצוגת תחומי ההתמחות במסגרת קשת (הדמיה)",
    backgroundSrc: "/media/hero-office-dusk.jpg",
    backgroundAlt: "חזית משרד בשעת בין-ערביים (הדמיה אווירה)",
    /** 3-col tilted mosaic — extra cards so the upward drift reveals more options. */
    cards: [
      { href: "/services/family", image: "/media/practice-family.jpg", title: "דיני משפחה" },
      { href: "/services/labor", image: "/media/practice-labor.jpg", title: "דיני עבודה" },
      { href: "/team", image: "/media/corridor-dusk.jpg", title: "הצוות" },
      { href: "/contact", image: "/media/meeting-room.jpg", title: "ייעוץ ראשוני" },
      { href: "/services/real-estate", image: "/media/practice-real-estate.jpg", title: "נדל״ן" },
      { href: "/services/family", image: "/media/practice-family.jpg", title: "גירושין" },
      { href: "/services/labor", image: "/media/practice-labor.jpg", title: "פיטורין" },
      { href: "/about", image: "/media/about-texture.jpg", title: "אודות" },
      { href: "/services/real-estate", image: "/media/practice-real-estate.jpg", title: "חוזי מכר" },
      { href: "/services/family", image: "/media/practice-family.jpg", title: "הסכמי ממון" },
      { href: "/faq", image: "/media/meeting-room.jpg", title: "שאלות" },
      { href: "/blog", image: "/media/surface-cream-brass.jpg", title: "מאמרים" },
      { href: "/contact", image: "/media/corridor-dusk.jpg", title: "צור קשר" },
      { href: "/services/real-estate", image: "/media/hero-office-dusk.jpg", title: "ירושות" },
      { href: "/team", image: "/media/practice-labor.jpg", title: "המשרד" },
    ] as const,
  },
  practice: {
    title: "מה המצב שלכם?",
    lead: "בחרו דלת אחת. תגיעו להסבר קצר ולפנייה, בלי להתברבר בכל האתר.",
    areas: practiceAreas,
  },
  whyNow: {
    title: "למה לא לחכות עם זה",
    lead: "בשלושת התחומים יש רגע שאחריו קשה מאוד לתקן. כדאי לדבר לפניו.",
    items: [
      {
        area: "משפחה וגירושין",
        moment: "לפני שבן או בת הזוג מגישים ראשונים",
        body: "מי שפותח ראשון את ההליך משפיע על הערכאה שתדון בתיק: בית הדין הרבני או בית המשפט לענייני משפחה. זו החלטה שקשה לשנות אחר כך.",
      },
      {
        area: "דיני עבודה",
        moment: "לפני שחותמים על מכתב סיום או כתב ויתור",
        body: "חתימה על מסמך סיום העסקה יכולה לוותר על זכויות שמגיעות לכם. בדיקה קצרה לפני החתימה זולה בהרבה מניסיון לבטל אותה אחר כך.",
      },
      {
        area: "נדל״ן",
        moment: "לפני שחותמים על זיכרון דברים",
        body: "גם מסמך קצר שנראה ראשוני עלול להיחשב חוזה מחייב. את התנאים החשובים קובעים לפני החתימה הראשונה, לא אחריה.",
      },
    ],
  },
  /** Scroll-pinned roadmap — each stage has a cinematic photo that slides sideways. */
  roadmap: {
    eyebrow: "ארבעה שלבים",
    stages: [
      {
        n: "01",
        title: "קוראים את המשפטים",
        description:
          "לפני שמגיבים למכתב, לתביעה או להסכם — מבינים מה כתוב ומה זה אומר בשבילכם. מילה אחת יכולה לעלות לכם בזכויות ובכסף.",
        href: "/contact#lead",
        cta: "לקביעת השיחה",
        /** Portrait — phone only. */
        image: "/media/roadmap-01-read.jpg",
        /** Landscape — desktop locked look. */
        imageDesktop: "/media/meeting-room.jpg",
        imageAlt: "חדר ישיבות — קריאת מסמכים לפני תגובה",
        imagePosition: "center center",
        imagePositionDesktop: "center center",
      },
      {
        n: "02",
        title: "מזהים את הרגע",
        description:
          "במשפחה, בעבודה ובנדל״ן יש נקודה שאחריה קשה לתקן. אנחנו מסמנים אותה יחד — לפני שמגישים, חותמים או מתחייבים.",
        href: "/services",
        cta: "לתחומי העיסוק",
        image: "/media/roadmap-02-decision.jpg",
        imageDesktop: "/media/practice-family.jpg",
        imageAlt: "שולחן ישיבות עם מחברת ועט מול נוף העיר — הרגע לפני החלטה",
        imagePosition: "center 45%",
        imagePositionDesktop: "40% 50%",
      },
      {
        n: "03",
        title: "תוכנית והערכת עלות",
        description:
          "שעה אחת. יוצאים עם: אפשרויות, סיכונים, והערכה ראשונית לעלות.",
        href: "/contact#lead",
        cta: "לקביעת השיחה",
        image: "/media/roadmap-03-plan.jpg",
        imageDesktop: "/media/hero-office-dusk.jpg",
        imageAlt: "נוף העיר ממשרד בשעת בין־ערביים — תכנון והערכת עלות",
        imagePosition: "center 38%",
        imagePositionDesktop: "65% 45%",
      },
      {
        n: "04",
        title: "מחליטים על ייצוג",
        description:
          "רק כשידוע מה כתוב, מה העלות ומה הסיכון. בלי לחץ, בלי התחייבות בשלב הראשון — ורק אם זה מתאים לשני הצדדים.",
        href: "/contact#lead",
        cta: "השאירו פרטים",
        image: "/media/roadmap-04-decide.jpg",
        imageDesktop: "/media/practice-real-estate.jpg",
        imageAlt: "ליווי עסקה — החלטה על ייצוג אחרי שהתמונה ברורה",
        imagePosition: "center 55%",
        imagePositionDesktop: "70% 45%",
      },
    ],
  },
  /** Kept for reuse; not shown on home (empty outline band felt flat). */
  wordFill: {
    label: "המילים שקובעות",
    words: ["חוזה", "זכות", "ערכאה", "ייצוג", "הסכם", "מועד"],
  },
  quickLead: {
    title: "רוצים שנחזור אליכם?",
    lead: "שם, טלפון ותחום. אל תפרטו כאן מידע רגיש — את הפרטים נשמע בשיחה.",
  },
  trustBand: [
    "12 שנות פעילות במרכז",
    "משפחה · עבודה · נדל״ן",
    "מענה תוך יום עסקים",
  ],
  why: {
    title: "מי שמכיר את התיק עונה לטלפון.",
    body: "לא מוקד. אדם שמכיר את הפרטים.",
    pillars: [
      { title: "אותו צוות עד הדיון", body: "בלי העברות בין נציגים." },
      { title: "מענה ביום עסקים", body: "מייל וטלפון — לא שבועות." },
      { title: "מבינים לפני חתימה", body: "מה כתוב, ומה זה אומר לכם." },
    ],
    points: [
      { value: 12, suffix: "שנים", note: "במרכז" },
      { value: 4, suffix: "עורכי דין", note: "צוות קבוע" },
      { value: 3, suffix: "תחומים", note: "משפחה · עבודה · נדל״ן" },
    ],
  },
  team: {
    title: "מי מלווה אתכם",
    lead: "שני שותפים, שני עו״ד, שתי מתמחות ומזכירה.",
    members: [
      {
        name: "עו״ד אבי כהן",
        role: "שותף מנהל",
        bio: "שותף מנהל. משפחה, עבודה ונדל״ן — מהשיחה הראשונה עד הדיון.",
      },
      {
        name: "עו״ד דניאל בן-עמי",
        role: "שותף",
        bio: "שותף במשרד. משפחה, עבודה ונדל״ן.",
      },
    ],
  },
  process: {
    title: "מה קורה אחרי שמשאירים פרטים",
    lead: "שלושה שלבים. בלי התחייבות בשלב הראשון.",
    steps: [
      { title: "חוזרים אליכם", body: "תוך יום עסקים אחד." },
      { title: "שיחה ראשונה", body: "מצב, אפשרויות, הערכת עלות." },
      { title: "מחליטים על ייצוג", body: "רק אחרי תוכנית והערכת עלות." },
    ],
  },
  compare: {
    title: "איך בוחרים ליווי",
    lead: "שלוש דרכים. אחת שבה מי שפגשתם נשאר עם התיק.",
    rows: [
      {
        label: "לבד",
        body: "זול בהתחלה. קל לפספס מועד.",
        image: "/media/surface-cream-brass.jpg",
        featured: false,
      },
      {
        label: "משרד גדול",
        body: "משאבים רבים. תיק שעובר בין נציגים.",
        image: "/media/corridor-dusk.jpg",
        featured: false,
      },
      {
        label: "כהן ושות׳",
        body: "צוות קטן. מסבירים לפני שחותמים.",
        image: "/media/meeting-room.jpg",
        featured: true,
      },
    ],
  },
  testimonials: {
    title: "מה אומרים לקוחות",
    items: [] as ReadonlyArray<{ quote: string; name: string; area: string }>,
  },
  articles: {
    title: "הסברים קצרים",
    lead: "שלושה נושאים שחוזרים כמעט בכל פנייה. לא ייעוץ משפטי.",
    items: [
      {
        title: "הסכם ממון: מתי כדאי",
        href: "/blog",
        tag: "משפחה",
      },
      {
        title: "פוטרתם? לפני שחותמים",
        href: "/blog",
        tag: "עבודה",
      },
      {
        title: "דירה ראשונה: שלבי הליווי",
        href: "/blog",
        tag: "נדל״ן",
      },
    ],
  },
  finalCta: {
    title: "רוצים לדעת איפה אתם עומדים?",
    lead: "שיחה אחת. תוכנית והערכת עלות. בלי התחייבות לייצוג בשלב הזה.",
    cta: "לקביעת השיחה",
  },
} as const;

export const faq = [
  {
    q: "האם שליחת טופס באתר מחייבת אותי?",
    a: "לא. זו פנייה ראשונית בלבד. יחסי עו״ד-לקוח נוצרים רק בהסכמה מפורשת, אחרי שסיכמנו יחד.",
  },
  {
    q: "תוך כמה זמן חוזרים אליי?",
    a: "בדרך כלל תוך יום עסקים אחד, לקביעת שיחה קצרה.",
  },
  {
    q: "האם בשיחה הראשונה כבר מתחילים ייצוג?",
    a: "לא. קודם מבינים את המצב, מה האפשרויות ומה הערכת העלות. רק אחר כך מחליטים אם להתקדם לייצוג.",
  },
  {
    q: "מי יטפל בתיק בפועל?",
    a: "השותף או עורך הדין שפגשתם בשיחה הראשונה. לא מעבירים אתכם בין נציגים שלא מכירים את הפרטים.",
  },
  {
    q: "למה לא משרד גדול יותר?",
    a: "במשרד גדול התיק לעיתים עובר בין מתמחים. אצלנו מי שפגשתם בשיחה הוא זה שמגיע לדיון.",
  },
  {
    q: "האם אפשר לדבר באנגלית?",
    a: "כן, בעיקר בתיקי נדל״ן. יש דף כניסה באנגלית; תרגום מלא לשאר העמודים ייצא אחרי אישור הקופי בעברית.",
  },
  {
    q: "כמה עולה ייעוץ, ולמה אין מחירון?",
    a: "כל תיק שונה, ומחיר אחיד באתר היה מטעה. בשיחה הראשונה נבין את המצב ונגיד מה כולל הטיפול ומה שכר הטרחה, לפני כל התחייבות. אם התיק לא מתאים לנו, נגיד את זה כבר בשיחה.",
  },
  {
    q: "איפה אתם ממוקמים?",
    a: "המשרד במרכז הארץ. הכתובת המדויקת נמסרת כשקובעים שיחה.",
  },
] as const;

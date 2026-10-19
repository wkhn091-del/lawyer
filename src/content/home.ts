import { practiceAreas } from "./site";

/**
 * Home copy — aligned to «מילים של מיליונים» N27 (משרד עורכי דין):
 * quiet/clear voice, no outcome promises, client questions first,
 * concrete CTAs, fact before adjective.
 */
export const home = {
  hero: {
    /** Full sentence for SEO / a11y; lines drive the stacked visual. */
    h1: "שעה אחת של שיחה, ותצאו עם תוכנית והערכת עלות.",
    h1Lines: ["שעה אחת של שיחה", "ותצאו עם תוכנית והערכת עלות"] as const,
    badge: "מענה תוך יום עסקים",
    meta: "כהן ושות׳ · תל אביב · ייעוץ ראשוני",
    lead: "12 שנה במרכז · משפחה, עבודה ונדל״ן.",
    offer: "פגישת ייעוץ · שקיפות בעלויות מההתחלה",
    primaryCta: "לקביעת פגישת ייעוץ",
    primaryHref: "#lead",
    phoneCta: "או התקשרו עכשיו",
    trust: "בלי התחייבות לייצוג בשלב הזה",
    reassurance: "מענה תוך יום עסקים אחד · בלי התחייבות לייצוג בשלב הזה",
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
    eyebrow: "מסלול ההחלטה",
    stages: [
      {
        n: "01",
        title: "קוראים את המשפטים",
        description:
          "לפני שמגיבים למכתב, לתביעה או להסכם — מבינים מה כתוב ומה זה אומר בשבילכם. מילה אחת יכולה לשנות את כל המסלול.",
        href: "/contact#lead",
        cta: "לקביעת פגישת ייעוץ",
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
          "שעה אחת של שיחה. יוצאים עם מפה ברורה: מה האפשרויות, מה הסיכון, ומה ההערכה הראשונית לעלות — בלי ערפל.",
        href: "/contact#lead",
        cta: "לקביעת פגישת ייעוץ",
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
          "רק אחרי שהמשפטים ברורים. בלי לחץ, בלי התחייבות בשלב הראשון — ורק אם זה מתאים לשני הצדדים.",
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
    body: "ארבעה עורכי דין, שתי מתמחות ומזכירה. מתקשרים ומגיעים לאדם שמכיר את התיק — לא למוקד.",
    pillars: [
      {
        title: "אותו צוות מהשיחה הראשונה עד הדיון",
        body: "לא מעבירים אתכם בין נציגים שלא מכירים את הפרטים.",
      },
      {
        title: "חוזרים תוך יום עסקים",
        body: "עדכונים במייל ובטלפון. לא מחכים שבועות לתשובה בסיסית.",
      },
      {
        title: "תבינו כל מסמך לפני שחותמים",
        body: "מסבירים מה כתוב ומה זה אומר בשבילכם. רק אחר כך מחליטים יחד אם להתקדם לייצוג.",
      },
    ],
    points: [
      { value: 12, suffix: " שנות פעילות", note: "ותק מתועד מהלקוח" },
      { value: 4, suffix: " עורכי דין", note: "בצוות הקבוע" },
      { value: 3, suffix: " תחומי ליבה", note: "משפחה · עבודה · נדל״ן" },
    ],
  },
  team: {
    title: "מי מלווה אתכם",
    lead: "שני השותפים שמובילים את התיקים, ועוד שני עורכי דין, שתי מתמחות ומזכירה. פרופילים מלאים יתווספו עם צילום מאושר.",
    members: [
      {
        name: "עו״ד אבי כהן",
        role: "שותף מנהל",
        bio: "מוביל את המשרד ומלווה תיקים בדיני משפחה, עבודה ונדל״ן.",
      },
      {
        name: "עו״ד דניאל בן-עמי",
        role: "שותף",
        bio: "שותף במשרד. פרופיל מורחב יעודכן עם צילום וביוגרפיה מאושרים.",
      },
    ],
  },
  process: {
    title: "מה קורה אחרי שמשאירים פרטים",
    lead: "שלושה שלבים. בלי הפתעות, ובלי התחייבות לייצוג בשלב הראשון.",
    steps: [
      { title: "חוזרים אליכם", body: "תוך יום עסקים אחד, לקביעת פגישת ייעוץ." },
      { title: "פגישת ייעוץ", body: "מבינים את המצב, מה האפשרויות, ומה ההערכה הראשונית לעלות." },
      { title: "תוכנית ומסלול", body: "תדעו איפה אתם עומדים ומי מטפל בתיק. רק אז מחליטים אם להתקדם לייצוג." },
    ],
  },
  compare: {
    title: "למה לא ללכת לבד או למשרד ענק?",
    lead: "שלוש דרכים נפוצות, ומה כל אחת עולה לכם בפועל.",
    rows: [
      {
        label: "לבד / טפסים מהאינטרנט",
        body: "חוסך בהתחלה, אבל קל לפספס מועדים, ניסוחים ומשמעויות שלא כתובות בגוגל.",
      },
      {
        label: "משרד גדול ומרוחק",
        body: "משאבים רבים, ולעיתים גם תיק שעובר בין נציגים. מתאים למי שמעדיף מותג על פני קשר ישיר.",
      },
      {
        label: "כהן ושות׳",
        body: "צוות קטן שמכיר את התיק, מסביר מה כתוב לפני שחותמים, וזמין במייל ובטלפון.",
      },
    ],
  },
  testimonials: {
    title: "מה אומרים לקוחות",
    items: [] as ReadonlyArray<{ quote: string; name: string; area: string }>,
  },
  articles: {
    title: "הסברים קצרים בשפה ברורה",
    lead: "מאמרים שמפרקים תהליכים נפוצים. המידע כללי ואינו ייעוץ משפטי.",
    items: [
      {
        title: "הסכם ממון: מתי כדאי ומה חשוב לבדוק",
        href: "/blog",
        tag: "משפחה",
      },
      {
        title: "פוטרתם? חמישה דברים לבדוק לפני שחותמים",
        href: "/blog",
        tag: "עבודה",
      },
      {
        title: "רכישת דירה ראשונה: שלבי הליווי המשפטי",
        href: "/blog",
        tag: "נדל״ן",
      },
    ],
  },
  finalCta: {
    title: "רוצים לדעת איפה אתם עומדים?",
    lead: "שיחה אחת. תוכנית והערכת עלות. בלי התחייבות לייצוג בשלב הזה.",
    cta: "לקביעת פגישת ייעוץ",
  },
} as const;

export const faq = [
  {
    q: "האם שליחת טופס באתר מחייבת אותי?",
    a: "לא. זו פנייה ראשונית בלבד. יחסי עו״ד-לקוח נוצרים רק בהסכמה מפורשת, אחרי שסיכמנו יחד.",
  },
  {
    q: "תוך כמה זמן חוזרים אליי?",
    a: "בדרך כלל תוך יום עסקים אחד, לקביעת פגישת ייעוץ קצרה.",
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
    a: "המשרד פועל במרכז הארץ. הכתובת המדויקת תפורסם כאן לאחר עדכון במערכת.",
  },
] as const;

import type { PracticeAreaId } from "@/content/site";

export type ThankYouNext = {
  serviceHref: string;
  serviceLabel: string;
  articleHref: string;
  articleTitle: string;
  articleTag: string;
};

const byArea: Record<Exclude<PracticeAreaId, "other">, ThankYouNext> = {
  family: {
    serviceHref: "/services/family",
    serviceLabel: "דיני משפחה וגירושין",
    articleHref: "/blog",
    articleTitle: "הסכם ממון — מתי כדאי ומה חשוב לבדוק",
    articleTag: "משפחה",
  },
  labor: {
    serviceHref: "/services/labor",
    serviceLabel: "דיני עבודה",
    articleHref: "/blog",
    articleTitle: "פוטרתם? חמישה דברים לבדוק לפני שחותמים",
    articleTag: "עבודה",
  },
  "real-estate": {
    serviceHref: "/services/real-estate",
    serviceLabel: "נדל״ן",
    articleHref: "/blog",
    articleTitle: "רכישת דירה ראשונה — שלבי הליווי המשפטי",
    articleTag: "נדל״ן",
  },
};

const fallback: ThankYouNext = {
  serviceHref: "/services",
  serviceLabel: "תחומי העיסוק",
  articleHref: "/blog",
  articleTitle: "הסברים קצרים בשפה ברורה",
  articleTag: "מאמרים",
};

export function nextStepsFor(practiceArea: string | undefined): ThankYouNext {
  if (practiceArea === "family" || practiceArea === "labor" || practiceArea === "real-estate") {
    return byArea[practiceArea];
  }
  return fallback;
}

export const thankYouCopy = {
  title: "הפנייה התקבלה",
  lead: "תודה. נחזור אליכם תוך יום עסקים אחד לתיאום שיחת היכרות — בלי התחייבות לייצוג בשלב הזה.",
  trust: [
    "12 שנות פעילות במרכז",
    "מענה תוך יום עסקים",
    "בלי התחייבות לייצוג בשלב הזה",
  ],
  nextHeading: "בינתיים — אפשר להעמיק",
  callCta: "להתקשר עכשיו",
  serviceCta: "לעמוד התחום",
  homeCta: "חזרה לדף הבית",
} as const;

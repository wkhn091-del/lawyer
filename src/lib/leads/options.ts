export const PRACTICE_AREAS = [
  { id: "family", label: "דיני משפחה וגירושין" },
  { id: "labor", label: "דיני עבודה" },
  { id: "real-estate", label: "נדל״ן" },
  { id: "other", label: "אחר" },
] as const;

export type PracticeAreaId = (typeof PRACTICE_AREAS)[number]["id"];

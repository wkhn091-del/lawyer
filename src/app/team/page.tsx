import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "הצוות",
  description: "עורכי הדין במשרד כהן ושות׳.",
};

const members = [
  {
    name: "עו״ד אבי כהן",
    role: "שותף מנהל",
    bio: "מוביל את המשרד ומלווה תיקים בדיני משפחה, עבודה ונדל״ן.",
  },
  {
    name: "עו״ד דניאל בן-עמי",
    role: "שותף",
    bio: "שותף במשרד — פרופיל מורחב יעודכן עם צילום וביוגרפיה מאושרים.",
  },
  {
    name: "חבר/ת צוות",
    role: "עורך/ת דין — בקרוב",
    bio: "ממתין לצילום אמיתי ולפרטים מהמשרד.",
  },
  {
    name: "חבר/ת צוות",
    role: "עורך/ת דין — בקרוב",
    bio: "ממתין לצילום אמיתי ולפרטים מהמשרד.",
  },
];

export default function TeamPage() {
  return (
    <div className="bg-cream">
      <div className="relative h-48 overflow-hidden md:h-64">
        <Image
          src="/media/meeting-room.jpg"
          alt="חדר ישיבות שקט — הדמיה אווירה"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-8 md:px-8">
          <h1 className="font-display text-hero text-cream">הצוות</h1>
          <p className="mt-2 text-small text-cream/70">הדמיה לאווירה — צילומי פנים יתווספו בהמשך</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="max-w-2xl text-muted">
          עורכי הדין שמלווים את התיקים ביום-יום. אין כאן תמונות פנים עד שיגיע צילום אמיתי של כל עו״ד.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {members.map((member, index) => (
            <li key={`${member.name}-${index}`} className="border border-border bg-white p-6">
              <h2 className="font-display text-h3 text-navy">{member.name}</h2>
              <p className="mt-1 text-small text-gold">{member.role}</p>
              <p className="mt-3 text-small text-muted">{member.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

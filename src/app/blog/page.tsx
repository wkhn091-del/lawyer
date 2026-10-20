import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/CtaLink";
import { home } from "@/content/home";

export const metadata: Metadata = {
  title: "מאמרים",
  description: "הסברים קצרים בשפה ברורה. המידע כללי ואינו ייעוץ משפטי.",
  alternates: { canonical: "/blog" },
  // Draft index until the articles are written and approved.
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <h1 className="font-display text-hero text-navy">מאמרים והסברים</h1>
      <p className="mt-4 text-muted">
        מידע מעשי, לא תחליף לייעוץ אישי. גוף המאמרים ייכתב על ידי קופירייטר משפטי אחרי אישור ה־Copy Deck.
      </p>
      <p className="mt-2 text-small text-muted">המידע כללי ואינו ייעוץ משפטי.</p>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {home.articles.items.map((item) => (
          <li key={item.title} className="py-5">
            <p className="text-small text-gold-ink">{item.tag}</p>
            <h2 className="mt-1 font-display text-h3 text-navy">{item.title}</h2>
            <p className="mt-2 text-small text-muted">טיוטה. הפרסום המלא יופיע כאן לאחר כתיבה ואישור.</p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <CtaLink href="/contact#lead">יש לכם שאלה אישית? לקביעת השיחה</CtaLink>
      </div>
    </div>
  );
}

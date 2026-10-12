import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/CtaLink";
import { home } from "@/content/home";

export const metadata: Metadata = {
  title: "מאמרים",
  description: "הסברים קצרים בשפה ברורה — המידע כללי ואינו ייעוץ משפטי.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <h1 className="font-display text-hero text-navy">מאמרים והסברים</h1>
      <p className="mt-4 text-muted">
        מידע מעשי — לא תחליף לייעוץ אישי. גוף המאמרים ייכתב על ידי קופירייטר משפטי.
      </p>
      <p className="mt-2 text-small text-muted">המידע כללי ואינו ייעוץ משפטי.</p>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {home.articles.items.map((item) => (
          <li key={item.title} className="py-5">
            <h2 className="font-display text-h3 text-navy">{item.title}</h2>
            <p className="mt-2 text-small text-muted">בקרוב — תוכן מלא לאחר אישור קופי.</p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <CtaLink href="/contact#lead">לשאלה אישית — לתיאום שיחה</CtaLink>
      </div>
    </div>
  );
}

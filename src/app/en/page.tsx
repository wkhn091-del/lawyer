import type { Metadata } from "next";
import Link from "next/link";
import { CtaLink } from "@/components/ui/CtaLink";
import { practiceAreas, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cohen & Co. Law Office",
  description: "Family, employment, and real estate legal representation in central Israel.",
  alternates: { canonical: "/en", languages: { he: "/", en: "/en" } },
  // Stub until the full English translation ships.
  robots: { index: false, follow: true },
};

export default function EnglishHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24" lang="en" dir="ltr">
      <p className="text-small tracking-[0.08em] text-gold-ink">{site.brand}</p>
      <h1 className="mt-4 font-display text-hero text-navy">
        Family, employment, and real estate representation
      </h1>
      <p className="mt-5 text-lead text-muted">
        Clear guidance for clients in central Israel, especially property matters that need English.
        A full English site will publish after human translation of the approved Hebrew copy.
      </p>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {practiceAreas.map((area) => (
          <li key={area.id} className="py-4">
            <Link href={area.href} className="font-display text-h3 text-navy underline-offset-4 hover:underline">
              {area.title}
            </Link>
            <p className="mt-2 text-small text-muted">{area.summary}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <CtaLink href="/contact#lead">Request a consultation</CtaLink>
        <CtaLink href={`tel:${site.contact.phoneTel}`} variant="ghost">
          Call {site.contact.phone}
        </CtaLink>
        <CtaLink href="/" variant="ghost">
          עברית
        </CtaLink>
      </div>

      <p className="mt-8 text-small text-muted">
        Phone <bdi dir="ltr">{site.contact.phone}</bdi> · Email{" "}
        <a href={`mailto:${site.contact.email}`} className="text-navy underline-offset-2 hover:underline">
          <bdi dir="ltr">{site.contact.email}</bdi>
        </a>
        · Hours: Sun–Thu 09:00–18:00
      </p>
    </div>
  );
}

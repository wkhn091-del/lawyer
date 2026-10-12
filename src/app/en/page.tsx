import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/CtaLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cohen & Co. Law Office",
  description: "Family, employment, and real estate legal representation in central Israel.",
  alternates: { canonical: "/en", languages: { he: "/", en: "/en" } },
};

export default function EnglishHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24" lang="en" dir="ltr">
      <p className="text-small tracking-[0.08em] text-gold">{site.brand}</p>
      <h1 className="mt-4 font-display text-hero text-navy">Family, employment, and real estate representation</h1>
      <p className="mt-5 text-lead text-muted">
        Clear guidance in Hebrew and English — especially for property transactions. Full English site copy will follow
        human translation after the Hebrew deck is approved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CtaLink href="/contact#lead">Request a consultation</CtaLink>
        <CtaLink href="/" variant="ghost">
          עברית
        </CtaLink>
      </div>
      <p className="mt-8 text-small text-muted">
        Phone <bdi dir="ltr">{site.contact.phone}</bdi> · Email <bdi dir="ltr">{site.contact.email}</bdi>
      </p>
    </div>
  );
}

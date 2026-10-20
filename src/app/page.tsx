import type { Metadata } from "next";
import { ArticlesTeaser } from "@/components/home/ArticlesTeaser";
import { CompareAlternatives } from "@/components/home/CompareAlternatives";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PracticeDoors } from "@/components/home/PracticeDoors";
import { Process } from "@/components/home/Process";
import { QuickLead } from "@/components/home/QuickLead";
import { StickyCta } from "@/components/home/StickyCta";
import { TeamTeaser } from "@/components/home/TeamTeaser";
import { TestimonialsBand } from "@/components/home/TestimonialsBand";
import { LegalRoadmap } from "@/components/home/LegalRoadmap";
import { TrustBand } from "@/components/home/TrustBand";
import { WhyUs } from "@/components/home/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationGraph } from "@/lib/seo/schema";

/** hreflang lives only here and on /en — the only two equivalent pages. */
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { he: "/", en: "/en" },
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [...organizationGraph()],
        }}
      />
      <Hero />
      <TrustBand />
      <PracticeDoors />
      <LegalRoadmap />
      <WhyUs />
      <CompareAlternatives />
      <Process />
      <QuickLead />
      <TeamTeaser />
      <TestimonialsBand />
      <ArticlesTeaser />
      <HomeFaq />
      <StickyCta />
    </>
  );
}

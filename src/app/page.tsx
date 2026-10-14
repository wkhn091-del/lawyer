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
import { TrustBand } from "@/components/home/TrustBand";
import { WhyNow } from "@/components/home/WhyNow";
import { WhyUs } from "@/components/home/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/content/home";
import { faqPageSchema, organizationGraph } from "@/lib/seo/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [...organizationGraph(), faqPageSchema(faq)],
        }}
      />
      <Hero />
      <TrustBand />
      <PracticeDoors />
      <WhyNow />
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

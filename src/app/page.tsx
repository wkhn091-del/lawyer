import { ArticlesTeaser } from "@/components/home/ArticlesTeaser";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PracticeDoors } from "@/components/home/PracticeDoors";
import { Process } from "@/components/home/Process";
import { StickyCta } from "@/components/home/StickyCta";
import { TeamTeaser } from "@/components/home/TeamTeaser";
import { TrustBand } from "@/components/home/TrustBand";
import { WhyUs } from "@/components/home/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/content/home";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env/public";

export default function HomePage() {
  const url = publicEnv.NEXT_PUBLIC_SITE_URL;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LegalService",
              "@id": `${url}/#org`,
              name: site.company,
              url,
              image: `${url}/brand/cohen-mark.svg`,
              telephone: site.contact.phoneTel,
              email: site.contact.email,
              areaServed: "IL",
              availableLanguage: ["he", "en"],
              description: site.description,
              openingHours: "Mo-Th 09:00-18:00, Fr 09:00-13:00",
            },
            {
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }}
      />
      <Hero />
      <TrustBand />
      <PracticeDoors />
      <WhyUs />
      <Process />
      <TeamTeaser />
      <ArticlesTeaser />
      <HomeFaq />
      <StickyCta />
    </>
  );
}

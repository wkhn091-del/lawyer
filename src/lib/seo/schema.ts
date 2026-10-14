import { site } from "@/content/site";
import { publicEnv } from "@/lib/env/public";

export function siteUrl(path = "/"): string {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Organization + LegalService — no fabricated PostalAddress. */
export function organizationGraph() {
  const url = siteUrl();
  const orgId = `${url}#organization`;

  const org: Record<string, unknown> = {
    "@type": "Organization",
    "@id": orgId,
    name: site.company,
    url,
    logo: siteUrl("/brand/cohen-mark.png"),
    email: site.contact.email,
    telephone: site.contact.phoneTel,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "מרכז ישראל / תל אביב",
    },
  };

  if (site.legal.address) {
    org.address = {
      "@type": "PostalAddress",
      streetAddress: site.legal.address,
      addressCountry: "IL",
    };
  }

  const legal: Record<string, unknown> = {
    "@type": "LegalService",
    "@id": `${url}#legalservice`,
    name: site.company,
    url,
    image: siteUrl("/media/og-cohen.jpg"),
    telephone: site.contact.phoneTel,
    email: site.contact.email,
    description: site.description,
    availableLanguage: ["he", "en"],
    // Matches site.contact.hours: א׳–ה׳ 09:00–18:00 (Sun–Thu in Israel).
    openingHours: "Su-Th 09:00-18:00",
    provider: { "@id": orgId },
    areaServed: "IL",
  };

  return [org, legal];
}

export function faqPageSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceSchema(input: {
  slug: string;
  title: string;
  description: string;
}) {
  const url = siteUrl(`/services/${input.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.title,
    description: input.description,
    url,
    provider: { "@id": `${siteUrl()}#legalservice` },
    areaServed: "IL",
    serviceType: input.title,
  };
}

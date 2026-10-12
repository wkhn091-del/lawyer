/**
 * 301 map from the legacy Wix site (cohen-law.co.il) to the new App Router paths.
 * When the client exports the full Wix URL list — append rows here. Never drop indexed paths silently.
 */
export type RedirectRule = {
  source: string;
  destination: string;
  permanent: true;
};

/** Best-effort defaults for a typical Israeli law-firm Wix IA. Replace/extend after Wix export. */
export const wixRedirects: RedirectRule[] = [
  { source: "/home", destination: "/", permanent: true },
  { source: "/Home", destination: "/", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/אודות", destination: "/about", permanent: true },
  { source: "/our-team", destination: "/team", permanent: true },
  { source: "/הצוות", destination: "/team", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/צור-קשר", destination: "/contact", permanent: true },
  { source: "/practice-areas", destination: "/services", permanent: true },
  { source: "/family-law", destination: "/services/family", permanent: true },
  { source: "/family", destination: "/services/family", permanent: true },
  { source: "/דיני-משפחה", destination: "/services/family", permanent: true },
  { source: "/divorce", destination: "/services/family", permanent: true },
  { source: "/labor-law", destination: "/services/labor", permanent: true },
  { source: "/employment", destination: "/services/labor", permanent: true },
  { source: "/דיני-עבודה", destination: "/services/labor", permanent: true },
  { source: "/real-estate", destination: "/services/real-estate", permanent: true },
  { source: "/נדלן", destination: "/services/real-estate", permanent: true },
  { source: "/נדל-ן", destination: "/services/real-estate", permanent: true },
  { source: "/articles", destination: "/blog", permanent: true },
  { source: "/מאמרים", destination: "/blog", permanent: true },
  { source: "/שאלות-נפוצות", destination: "/faq", permanent: true },
  { source: "/הצהרת-נגישות", destination: "/accessibility", permanent: true },
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
];

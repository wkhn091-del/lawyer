import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Rubik } from "next/font/google";
import { headers } from "next/headers";
import { AnalyticsEvents } from "@/components/layout/AnalyticsEvents";
import { ConsentAndAnalytics } from "@/components/layout/ConsentAndAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env/public";
import { MotionProvider } from "@/motion";
import "./globals.css";

const frank = Frank_Ruhl_Libre({
  weight: ["400", "500", "700"],
  subsets: ["hebrew", "latin"],
  display: "swap",
  variable: "--font-frank",
});

const rubik = Rubik({
  weight: ["400", "500", "700"],
  subsets: ["hebrew", "latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${site.brand} | ${site.tagline}`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: site.company,
    title: `${site.brand} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/media/og-cohen.jpg", width: 1200, height: 675, alt: site.company }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} | ${site.tagline}`,
    description: site.description,
    images: ["/media/og-cohen.jpg"],
  },
  formatDetection: { telephone: false },
  alternates: {
    languages: {
      he: "/",
      en: "/en",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1B2A4E",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html lang="he" dir="rtl" className={`${frank.variable} ${rubik.variable}`}>
      <body className="bg-cream font-sans text-body text-ink">
        <MotionProvider preset="law">
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <RevealObserver />
        <AnalyticsEvents />
        <ConsentAndAnalytics gtmId={publicEnv.NEXT_PUBLIC_GTM_ID ?? null} nonce={nonce} />
      </body>
    </html>
  );
}

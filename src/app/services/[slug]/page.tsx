import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaLink } from "@/components/ui/CtaLink";
import { services, type ServiceSlug } from "@/content/services";
import { practiceAreas } from "@/content/site";
import { organizationGraph, serviceSchema } from "@/lib/seo/schema";

const slugs = Object.keys(services) as ServiceSlug[];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.lead,
    keywords: [...service.keywords],
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.title,
      description: service.lead,
      images: [{ url: "/media/og-cohen.jpg", width: 1280, height: 720, alt: service.title }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) notFound();

  const area = practiceAreas.find((item) => item.href.endsWith(`/${slug}`));
  const areaId = slug === "real-estate" ? "real-estate" : slug;

  return (
    <article className="bg-cream">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            ...organizationGraph(),
            serviceSchema({ slug, title: service.title, description: service.lead }),
          ],
        }}
      />
      <div className="relative h-56 overflow-hidden md:h-80">
        <Image
          src={area?.image ?? "/media/corridor-dusk.jpg"}
          alt={area?.imageAlt ?? "אווירת משרד (הדמיה)"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="scrim absolute inset-0" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-5 pb-8 md:px-8">
          <p className="text-small text-gold-ink">תחום התמחות</p>
          <h1 className="mt-2 font-display text-hero text-cream">{service.title}</h1>
          <p className="mt-2 text-small text-cream/85">הדמיה</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-lead text-muted">{service.lead}</p>
        <p className="mt-6 text-body text-ink">{service.body}</p>
        <h2 className="mt-12 font-display text-h2 text-navy">במה אנחנו מטפלים</h2>
        <ul className="mt-6 space-y-3">
          {service.topics.map((topic) => (
            <li key={topic} className="border-s-2 border-gold bg-white/60 ps-4 py-2 text-muted">
              {topic}
            </li>
          ))}
        </ul>
        <div className="relative mt-12 overflow-hidden border border-border bg-navy p-6 text-cream md:p-8">
          <Image
            src="/media/surface-cream-brass.jpg"
            alt=""
            fill
            sizes="720px"
            className="object-cover opacity-15"
            aria-hidden
          />
          <div className="relative">
            <p className="font-display text-h3">{service.cta}</p>
            <p className="mt-2 text-small text-cream/70">בלי התחייבות לייצוג בשלב הזה</p>
            <CtaLink href={`/contact?area=${areaId}#lead`} variant="onDark" className="mt-5">
              לקביעת השיחה
            </CtaLink>
          </div>
        </div>
      </div>
    </article>
  );
}

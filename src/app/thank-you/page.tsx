import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { CtaLink } from "@/components/ui/CtaLink";
import { thankYouCopy, nextStepsFor } from "@/content/thank-you";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "הפנייה התקבלה",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const raw = (await cookies()).get("cb_demo")?.value;
  let firstName = "";
  let practiceArea = "";
  try {
    if (raw) {
      const parsed = JSON.parse(raw) as { firstName?: string; practiceArea?: string };
      firstName = parsed.firstName ?? "";
      practiceArea = parsed.practiceArea ?? "";
    }
  } catch {
    /* ignore */
  }

  const next = nextStepsFor(practiceArea);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-small tracking-[0.06em] text-gold">{site.brand}</p>
        <h1 className="mt-3 font-display text-hero text-navy">
          {thankYouCopy.title}
          {firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-5 text-muted">{thankYouCopy.lead}</p>

        <ul className="mt-8 grid gap-3 border border-border bg-white p-5 sm:grid-cols-3">
          {thankYouCopy.trust.map((item) => (
            <li key={item} className="text-center text-small text-navy sm:border-s sm:border-border sm:ps-3 first:sm:border-s-0 first:sm:ps-0">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${site.contact.phoneTel}`}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-6 text-button font-medium text-cream transition hover:bg-navy-deep"
          >
            {thankYouCopy.callCta}
          </a>
          <CtaLink href={next.serviceHref} variant="ghost">
            {thankYouCopy.serviceCta}
          </CtaLink>
        </div>

        <section className="mt-14 border-t border-border pt-10" aria-labelledby="thank-you-next">
          <h2 id="thank-you-next" className="font-display text-h2 text-navy">
            {thankYouCopy.nextHeading}
          </h2>
          <p className="mt-2 text-small text-muted">
            הצעות לפי התחום שציינתם בפנייה — בלי התחייבות ובלי שדות נוספים.
          </p>

          <ul className="mt-6 space-y-4">
            <li>
              <Link
                href={next.serviceHref}
                className="group flex flex-col border border-border bg-white p-5 transition hover:border-navy"
              >
                <span className="text-[0.75rem] tracking-[0.06em] text-gold">התחום שלכם</span>
                <span className="mt-2 font-display text-h3 text-navy group-hover:text-navy-deep">
                  {next.serviceLabel}
                </span>
                <span className="mt-3 text-small font-medium text-navy">לפרטים ←</span>
              </Link>
            </li>
            <li>
              <Link
                href={next.articleHref}
                className="group flex flex-col border border-border bg-white p-5 transition hover:border-navy"
              >
                <span className="text-[0.75rem] tracking-[0.06em] text-gold">{next.articleTag}</span>
                <span className="mt-2 font-display text-h3 text-navy group-hover:text-navy-deep">
                  {next.articleTitle}
                </span>
                <span className="mt-3 text-small font-medium text-navy">לקריאה ←</span>
              </Link>
            </li>
          </ul>

          <p className="mt-8">
            <Link href="/" className="text-small font-medium text-navy underline-offset-4 hover:underline">
              {thankYouCopy.homeCta}
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { faq, home } from "@/content/home";
import { site } from "@/content/site";

/**
 * Desktop: light inviting CTA on the right (RTL), compact FAQ on the left.
 * Soft cream/gold — never a heavy charcoal block that pushes people away.
 */
export function HomeFaq() {
  const { finalCta, hero } = home;

  return (
    <section id="faq" className="overflow-x-clip bg-cream py-9 pb-[6.25rem] md:py-20 md:pb-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:items-start md:gap-14 md:px-8">
        {/* Right in RTL — warm invite panel; after FAQ on phone */}
        <Reveal className="relative order-2 border border-gold/35 bg-white p-5 md:sticky md:top-24 md:order-none md:p-9">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 100% 0%, rgb(196 163 90 / 0.12), transparent 55%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <GoldLineDraw />
            <h2 className="mt-4 font-display text-[1.3rem] leading-snug text-navy md:mt-5 md:text-[1.65rem]">
              {finalCta.title}
            </h2>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-muted md:mt-3 md:text-small">
              {finalCta.lead}
            </p>
            <Link
              href="/contact#lead"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold px-6 text-small font-medium text-navy-deep transition hover:bg-gold-hover md:mt-7 md:w-auto"
            >
              {finalCta.cta}
            </Link>
            <p className="mt-4 text-[0.78rem] text-muted">{hero.trust}</p>
            <div className="mt-6 border-t border-border/70 pt-5">
              <p className="text-[0.7rem] tracking-[0.12em] text-muted">או התקשרו</p>
              <a
                href={`tel:${site.contact.phoneTel}`}
                className="mt-1 inline-block font-display text-[1.15rem] text-navy transition hover:text-gold-ink"
                dir="ltr"
              >
                <bdi>{site.contact.phone}</bdi>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Left in RTL — questions; first on phone */}
        <div className="order-1 md:order-none">
          <Reveal>
            <h2 className="font-display text-h2 text-navy">שאלות נפוצות</h2>
          </Reveal>
          <Reveal stagger className="mt-5 divide-y divide-border border-y border-border md:mt-7">
            {faq.map((item) => (
              <details key={item.q} className="group py-3 md:py-4">
                <summary className="cursor-pointer list-none font-medium text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex min-h-10 items-center justify-between gap-3 text-[0.9rem] md:min-h-11 md:gap-4 md:text-[1rem]">
                    {item.q}
                    <span
                      className="shrink-0 text-gold-ink transition duration-[var(--motion-base)] group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-2 pb-1 text-small leading-relaxed text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

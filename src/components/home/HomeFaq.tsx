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
    <section id="faq" className="bg-cream py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:items-start md:gap-14 md:px-8">
        {/* Right in RTL — warm invite panel */}
        <Reveal className="relative border border-gold/35 bg-white p-7 md:sticky md:top-24 md:p-9">
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
            <h2 className="mt-5 font-display text-[1.45rem] leading-snug text-navy md:text-[1.65rem]">
              {finalCta.title}
            </h2>
            <p className="mt-3 text-small leading-relaxed text-muted">
              {finalCta.lead}
            </p>
            <Link
              href="/contact#lead"
              className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold px-6 text-small font-medium text-navy-deep transition hover:bg-gold-hover md:w-auto"
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

        {/* Left in RTL — questions */}
        <div>
          <Reveal>
            <h2 className="font-display text-h2 text-navy">שאלות נפוצות</h2>
          </Reveal>
          <Reveal stagger className="mt-6 divide-y divide-border border-y border-border md:mt-7">
            {faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex min-h-11 items-center justify-between gap-4 text-[0.95rem] md:text-[1rem]">
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

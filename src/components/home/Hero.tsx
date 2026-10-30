import Image from "next/image";
import Link from "next/link";
import { HeroBg } from "@/components/home/HeroBg";
import { HeroLead } from "@/components/home/HeroMotion";
import { home } from "@/content/home";

export function Hero() {
  const { hero } = home;
  const [line1, line2] = hero.h1Lines;

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-stage relative isolate flex min-h-[100svh] flex-col overflow-x-clip text-[var(--hero-bone)] md:block md:min-h-0 max-md:h-[100svh] max-md:max-h-[100svh] max-md:overflow-hidden"
    >
      <HeroBg src={hero.backgroundSrc} alt={hero.backgroundAlt} />

      {/* Desktop: scrim toward the copy column (RTL = from the right) */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(to left, color-mix(in srgb, var(--color-navy-deep) 55%, transparent) 0%, color-mix(in srgb, var(--color-navy-deep) 22%, transparent) 45%, transparent 70%)",
        }}
      />
      {/* Mobile: stronger top wash for copy; keep photo open around the arch */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-navy-deep) 62%, transparent) 0%, color-mix(in srgb, var(--color-navy-deep) 28%, transparent) 38%, transparent 62%)",
        }}
      />

      {/* Mobile-only visible caption (desktop hero is locked). */}
      <span className="absolute bottom-2 start-3 z-10 text-[0.62rem] text-[var(--hero-bone)]/50 md:hidden">
        הדמיה
      </span>

      {/*
        Mobile (normal landing pattern): one full screen —
        brand bar → headline → CTA → complete media, then scroll.
        Desktop: two-column copy | arch (locked — exact Script-6).
      */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-1 flex-col px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[5.75rem] md:min-h-[88svh] md:grid md:grid-cols-2 md:items-center md:gap-8 md:px-8 md:pb-12 md:pt-24">
        <div className="relative z-10 mt-[min(12vh,5.5rem)] flex w-full shrink-0 flex-col items-center text-center md:mt-0 md:max-w-xl md:items-start md:pe-2 md:text-start max-md:mt-[min(8vh,3.5rem)]">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.15rem,8vw,2.65rem)] leading-[1.14] tracking-[-0.02em] md:text-hero md:leading-[1.12]"
          >
            <span className="sr-only">{hero.h1}</span>
            <span aria-hidden="true" className="block" style={{ color: "var(--hero-bone)" }}>
              {line1}
            </span>
            <span aria-hidden="true" className="mt-0.5 block" style={{ color: "var(--hero-brass)" }}>
              {line2}
            </span>
          </h1>

          <HeroLead>
            <p
              className="mt-3 max-w-[26ch] text-[1.02rem] leading-snug md:mt-5 md:max-w-[34ch] md:text-lead md:leading-snug"
              style={{ color: "var(--hero-bone-dim)" }}
            >
              {hero.lead}
            </p>
          </HeroLead>

          <div className="mt-5 w-full max-w-[18rem] md:mt-8 md:max-w-none">
            <a
              id="hero-cta"
              href={hero.primaryHref}
              className="hero-cta inline-flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-full px-8 text-[1rem] font-medium hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 md:min-h-14 md:w-auto md:px-10 md:text-button"
            >
              {hero.primaryCta}
            </a>
            <p
              className="mt-3 mb-1 flex items-center justify-center gap-2 text-[0.8rem] md:mb-0 md:mt-4 md:justify-start md:text-small"
              style={{ color: "var(--hero-bone-faint)" }}
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--hero-brass)" }}
                aria-hidden
              />
              {hero.trust}
            </p>
          </div>
        </div>

        {/* Arch sits on the bottom of the phone hero — full frame, like a normal landing */}
        <div
          className="relative mt-auto flex min-h-0 shrink-0 items-end justify-center overflow-hidden px-2 pb-1 pt-5 md:mt-0 md:h-full md:items-center md:overflow-visible md:self-stretch md:px-6 md:pb-8 md:pt-2 max-md:flex-1 max-md:pb-[4.25rem] max-md:pt-9"
          aria-label={hero.archLabel}
        >
          <p className="sr-only">{hero.frameAlt}</p>

          <div className="hero-arch-float">
            <div className="hero-arch hero-arch-mask">
              <div className="hero-arch-grid">
                {[0, 1, 2].map((col) => {
                  const columnCards = hero.cards
                    .map((card, index) => ({ card, index }))
                    .filter(({ index }) => index % 3 === col);
                  /* Same stack twice → when translated -50% the seam is invisible (true loop). */
                  const loopCards = [...columnCards, ...columnCards];

                  return (
                    <div key={`col-${col}`} className={`hero-arch-col hero-arch-col-${col}`}>
                      {loopCards.map(({ card, index }, loopIndex) => (
                        <Link
                          key={`${card.title}-${index}-${loopIndex}`}
                          href={card.href}
                          aria-label={card.title}
                          tabIndex={loopIndex >= columnCards.length ? -1 : undefined}
                          aria-hidden={loopIndex >= columnCards.length ? true : undefined}
                          className="hero-card-tile group transition duration-[var(--motion-base)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                        >
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            priority={loopIndex < columnCards.length}
                            quality={88}
                            sizes="(max-width: 768px) 40vw, 220px"
                            className="object-cover transition duration-[var(--motion-base)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-2 pb-2 pt-10 text-center"
                          >
                            <span className="text-center text-[0.65rem] font-bold leading-tight text-cream">
                              {card.title}
                            </span>
                            <span className="inline-flex rounded-full bg-cream px-2.5 py-0.5 text-[0.52rem] font-semibold text-navy">
                              לפרטים
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

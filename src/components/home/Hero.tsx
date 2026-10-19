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
      className="hero-stage relative isolate overflow-x-clip text-[var(--hero-bone)]"
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
      {/* Mobile: light wash for copy only — leave the photo open around the floating arch */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-navy-deep) 55%, transparent) 0%, color-mix(in srgb, var(--color-navy-deep) 18%, transparent) 42%, transparent 68%)",
        }}
      />

      {/*
        Mobile composition matches Ride With Yoav:
        centered copy stack → fixed-height floating arch (soft fade).
        Desktop stays two-column: copy | arch.
      */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-6 pt-[4.75rem] md:min-h-[88svh] md:grid md:grid-cols-2 md:items-center md:gap-8 md:px-8 md:pb-12 md:pt-24">
        <div className="relative z-10 flex w-full flex-col items-center text-center md:max-w-xl md:items-start md:pe-2 md:text-start">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-medium tracking-wide"
            style={{
              background: "rgb(0 0 0 / 0.32)",
              color: "var(--hero-bone)",
              border: "1px solid var(--hero-line)",
            }}
          >
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ background: "var(--hero-brass)" }}
              aria-hidden
            />
            {hero.badge}
          </span>

          <p className="mt-2.5 text-[0.75rem] font-medium tracking-wide md:mt-4 md:text-small" style={{ color: "var(--hero-bone-faint)" }}>
            {hero.meta}
          </p>

          <h1
            id="hero-heading"
            className="mt-1.5 font-display text-[clamp(1.85rem,7vw,2.35rem)] leading-[1.15] tracking-[-0.02em] md:mt-3 md:text-hero md:leading-[1.12]"
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
              className="mt-2.5 max-w-[34ch] text-[0.9rem] leading-snug md:mt-5 md:max-w-md md:text-lead md:leading-relaxed"
              style={{ color: "var(--hero-bone-dim)" }}
            >
              {hero.lead}
            </p>
          </HeroLead>

          <div className="mt-4 w-full max-w-xs md:mt-8 md:max-w-none">
            <a
              id="hero-cta"
              href={hero.primaryHref}
              className="hero-cta inline-flex min-h-11 w-full items-center justify-center rounded-full px-8 text-[0.95rem] font-medium transition duration-[var(--motion-fast)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 md:min-h-14 md:w-auto md:px-10 md:text-button"
            >
              {hero.primaryCta}
            </a>
            <p
              className="mt-2.5 flex items-center justify-center gap-2 text-[0.72rem] md:mt-4 md:justify-start md:text-small"
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

        {/* Arch collage — Ride layout: tilted 3-col mosaic + slow opposing drift */}
        <div
          className="relative flex justify-center px-4 pb-4 md:h-full md:items-center md:justify-center md:self-stretch md:px-6 md:pb-8 md:pt-2"
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

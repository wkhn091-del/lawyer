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
      className="hero-stage relative isolate flex h-[100svh] max-h-[100svh] min-h-[100svh] flex-col overflow-hidden text-[var(--hero-bone)]"
    >
      <HeroBg src={hero.backgroundSrc} alt={hero.backgroundAlt} />

      {/* Desktop: light scrim on the copy side — keep the photo crisp */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(to left, color-mix(in srgb, var(--color-navy-deep) 42%, transparent) 0%, color-mix(in srgb, var(--color-navy-deep) 14%, transparent) 42%, transparent 68%)",
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

      <span className="absolute bottom-2 start-3 z-10 text-[0.62rem] text-[var(--hero-bone)]/50 md:hidden">
        הדמיה
      </span>

      {/*
        One locked viewport (like RideWithYoav): copy + full arch frame in view —
        nothing cut at the bottom edge.
      */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-1 flex-col px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[5.75rem] md:grid md:grid-cols-2 md:items-stretch md:gap-8 md:px-8 md:pb-5 md:pt-[5.5rem] lg:gap-12">
        <div className="relative z-10 mt-[min(8vh,3.5rem)] flex w-full shrink-0 flex-col items-center text-center md:mt-0 md:max-w-xl md:items-start md:justify-center md:pe-2 md:text-start">
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
              className="mt-3 max-w-[30ch] text-[1.02rem] leading-snug md:mt-5 md:max-w-md md:text-lead md:leading-relaxed"
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
              className="mt-3 flex items-center justify-center gap-2 text-[0.8rem] md:mt-4 md:justify-start md:text-small"
              style={{ color: "var(--hero-bone-faint)" }}
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--hero-brass)" }}
                aria-hidden
              />
              <bdi>12</bdi> שנה במרכז · מענה תוך יום עסקים
            </p>
          </div>
        </div>

        <div
          className="relative mt-auto flex min-h-0 flex-1 items-end justify-center px-2 pb-1 pt-4 md:mt-0 md:items-end md:justify-center md:self-stretch md:px-1 md:pb-0 md:pt-2"
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
                            unoptimized
                            sizes="(max-width: 768px) 32vw, 18vw"
                            className="object-cover transition duration-[var(--motion-base)] group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
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

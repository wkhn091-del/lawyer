import Image from "next/image";
import Link from "next/link";
import { HeroBg } from "@/components/home/HeroBg";
import { HeroLead } from "@/components/home/HeroMotion";
import { home } from "@/content/home";

/** Middle column sits higher — honeycomb stagger from the ref. */
const COL_SHIFT = [
  "var(--hero-col-shift-0)",
  "var(--hero-col-shift-1)",
  "var(--hero-col-shift-2)",
] as const;

export function Hero() {
  const { hero } = home;
  const [line1, line2, lineAccent] = hero.h1Lines;

  const columns = [0, 1, 2].map((col) =>
    hero.cards
      .map((card, index) => ({ card, index }))
      .filter(({ index }) => index % 3 === col),
  );

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
      {/* Mobile: darken top for copy; keep bottom open so the arch blends into the photo */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-navy-deep) 78%, transparent) 0%, color-mix(in srgb, var(--color-navy-deep) 42%, transparent) 42%, color-mix(in srgb, var(--color-navy-deep) 12%, transparent) 72%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-0 max-w-6xl px-5 pt-20 pb-10 md:min-h-[88svh] md:items-center md:px-8 md:pt-24 md:pb-12">
        <div className="grid w-full items-center gap-6 md:grid-cols-2 md:gap-6 lg:gap-10">
          {/* Copy first on mobile; collage sits below */}
          <div className="relative z-10 max-w-xl md:pe-2">
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

            <p className="mt-4 text-small md:mt-5" style={{ color: "var(--hero-bone-faint)" }}>
              {hero.meta}
            </p>

            <h1 id="hero-heading" className="mt-3 font-display text-hero leading-[1.12] tracking-[-0.02em] md:mt-4">
              <span className="sr-only">{hero.h1}</span>
              <span aria-hidden="true" className="block" style={{ color: "var(--hero-bone)" }}>
                {line1}
              </span>
              <span aria-hidden="true" className="block" style={{ color: "var(--hero-bone)" }}>
                {line2}
              </span>
              <span aria-hidden="true" className="block" style={{ color: "var(--hero-brass)" }}>
                {lineAccent}
              </span>
            </h1>

            <HeroLead>
              <p className="mt-4 max-w-md text-lead md:mt-5" style={{ color: "var(--hero-bone-dim)" }}>
                {hero.lead} {hero.offer}
              </p>
            </HeroLead>

            <div className="mt-6 md:mt-8">
              <a
                id="hero-cta"
                href={hero.primaryHref}
                className="hero-cta inline-flex min-h-14 w-full items-center justify-center rounded-full px-10 text-button font-medium transition duration-[var(--motion-fast)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                {hero.primaryCta}
              </a>
            </div>

            <p className="mt-3 flex items-center gap-2 text-small md:mt-4" style={{ color: "var(--hero-bone-faint)" }}>
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--hero-brass)" }}
                aria-hidden
              />
              {hero.trust}
            </p>
          </div>

          {/* Arch under the copy on mobile — soft bottom fade, no hard crop */}
          <div
            className="relative -mb-4 flex h-[16.5rem] w-full items-end justify-center sm:h-[18.5rem] md:mb-0 md:h-[min(78svh,44rem)] md:items-center"
            aria-label={hero.archLabel}
          >
            <p className="sr-only">{hero.frameAlt}</p>

            <div
              className="hero-arch-shell relative h-full w-full max-w-[15.5rem] sm:max-w-[18rem] md:max-w-[min(100%,26rem)]"
              style={{
                filter: "drop-shadow(0 22px 36px rgb(0 0 0 / 0.5)) drop-shadow(0 6px 14px rgb(0 0 0 / 0.3))",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-t-[999px] rounded-b-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgb(255 255 255 / 0.4) 0%, rgb(255 255 255 / 0.1) 40%, transparent 100%)",
                }}
              />

              <div
                className="hero-arch-mask relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-none"
                style={{
                  background: "rgb(8 8 7 / 0.28)",
                  border: "1.5px solid rgb(255 255 255 / 0.5)",
                  borderBottom: "none",
                  boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.3)",
                }}
              >
                <div className="hero-arch absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-[47%] rotate-[-14deg] justify-center gap-1.5 sm:gap-2">
                  {columns.map((colCards, col) => (
                    <ul
                      key={`col-${col}`}
                      role="list"
                      className="flex flex-col gap-1.5 sm:gap-2"
                      style={{ transform: COL_SHIFT[col] }}
                    >
                      {colCards.map(({ card, index }) => (
                        <li key={`${card.title}-${index}`}>
                          <Link
                            href={card.href}
                            className="group relative block overflow-hidden transition duration-[var(--motion-base)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                            style={{
                              width: "var(--hero-card-w)",
                              height: "var(--hero-card-h)",
                              borderRadius: 16,
                              boxShadow: "0 10px 22px -6px rgb(0 0 0 / 0.55)",
                              border: "1px solid rgb(255 255 255 / 0.2)",
                            }}
                          >
                            <Image
                              src={card.image}
                              alt=""
                              fill
                              priority
                              sizes="(max-width: 640px) 84px, (max-width: 768px) 112px, 140px"
                              className="object-cover transition duration-[var(--motion-base)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                            />
                            <span
                              className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-1.5 pb-2 pt-8 text-center sm:pb-2.5 sm:pt-10"
                              style={{
                                background:
                                  "linear-gradient(to top, rgb(0 0 0 / 0.78) 0%, rgb(0 0 0 / 0.35) 50%, transparent 100%)",
                              }}
                            >
                              <span className="text-[0.58rem] font-semibold leading-tight text-white drop-shadow-sm sm:text-[0.65rem]">
                                {card.title}
                              </span>
                              <span className="inline-flex rounded-full bg-white px-2 py-px text-[0.45rem] font-medium tracking-wide text-[#1a1918] sm:px-2.5 sm:py-[2px] sm:text-[0.5rem]">
                                לפרטים
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { HeroBg } from "@/components/home/HeroBg";
import { HeroLead } from "@/components/home/HeroMotion";
import { home } from "@/content/home";

/**
 * Inside matches the reference photo:
 * smaller phone cards (~2.5 across the arch), rotate(-14°), thin gaps.
 */
const CARD_W = 132;
const CARD_H = 248;

/** Middle column sits higher — honeycomb stagger from the ref. */
const COL_SHIFT = ["translateY(1.5rem)", "translateY(-2.75rem)", "translateY(2.25rem)"] as const;

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

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to left, color-mix(in srgb, var(--color-navy-deep) 55%, transparent) 0%, color-mix(in srgb, var(--color-navy-deep) 22%, transparent) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl items-center px-5 pt-24 pb-10 md:px-8 md:pb-12">
        <div className="grid w-full items-center gap-8 md:grid-cols-2 md:gap-6 lg:gap-10">
          <div className="relative z-10 max-w-xl md:pe-2">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-medium tracking-wide"
              style={{
                background: "rgb(0 0 0 / 0.32)",
                color: "var(--hero-bone)",
                border: "1px solid rgb(242 235 227 / 0.2)",
              }}
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--hero-brass)" }}
                aria-hidden
              />
              {hero.badge}
            </span>

            <p className="mt-5 text-small" style={{ color: "var(--hero-bone-faint)" }}>
              {hero.meta}
            </p>

            <h1 id="hero-heading" className="mt-4 font-display text-hero leading-[1.12] tracking-[-0.02em]">
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
              <p className="mt-5 max-w-md text-lead" style={{ color: "var(--hero-bone-dim)" }}>
                {hero.lead} {hero.offer}
              </p>
            </HeroLead>

            <div className="mt-8">
              <a
                id="hero-cta"
                href={hero.primaryHref}
                className="hero-cta inline-flex min-h-14 w-full items-center justify-center rounded-full px-10 text-button font-medium transition duration-[var(--motion-fast)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                {hero.primaryCta}
              </a>
            </div>

            <p className="mt-4 flex items-center gap-2 text-small" style={{ color: "var(--hero-bone-faint)" }}>
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--hero-brass)" }}
                aria-hidden
              />
              {hero.trust}
            </p>
          </div>

          <div
            className="relative flex h-[min(72svh,40rem)] w-full items-center justify-center md:h-[min(78svh,44rem)]"
            aria-label={hero.archLabel}
          >
            <p className="sr-only">{hero.frameAlt}</p>

            {/* Shell — lifts the arch so it reads as emerging from the hero photo */}
            <div
              className="relative h-full w-full max-w-[min(100%,26rem)]"
              style={{
                filter: "drop-shadow(0 28px 40px rgb(0 0 0 / 0.55)) drop-shadow(0 8px 16px rgb(0 0 0 / 0.35))",
              }}
            >
              {/* Soft rim glow behind the stroke */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-[1px] rounded-t-[999px] rounded-b-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgb(255 255 255 / 0.45) 0%, rgb(255 255 255 / 0.12) 35%, rgb(255 255 255 / 0.05) 100%)",
                  opacity: 0.9,
                }}
              />

              <div
                className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-none"
                style={{
                  background: "rgb(8 8 7 / 0.35)",
                  border: "1.5px solid rgb(255 255 255 / 0.55)",
                  borderBottom: "none",
                  boxShadow:
                    "inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -20px 40px rgb(0 0 0 / 0.25)",
                }}
              >
                {/* 3-col tilted collage — fills like the reference */}
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-[47%] rotate-[-14deg] justify-center gap-2">
                  {columns.map((colCards, col) => (
                    <ul
                      key={`col-${col}`}
                      role="list"
                      className="flex flex-col gap-2"
                      style={{ transform: COL_SHIFT[col] }}
                    >
                      {colCards.map(({ card, index }) => (
                        <li key={`${card.title}-${index}`}>
                          <Link
                            href={card.href}
                            className="group relative block overflow-hidden transition duration-[var(--motion-base)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                            style={{
                              width: CARD_W,
                              height: CARD_H,
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
                              sizes="140px"
                              className="object-cover transition duration-[var(--motion-base)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                            />
                            <span
                              className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-1.5 pb-2.5 pt-10 text-center"
                              style={{
                                background:
                                  "linear-gradient(to top, rgb(0 0 0 / 0.78) 0%, rgb(0 0 0 / 0.35) 50%, transparent 100%)",
                              }}
                            >
                              <span className="text-[0.65rem] font-semibold leading-tight text-white drop-shadow-sm">
                                {card.title}
                              </span>
                              <span className="inline-flex rounded-full bg-white px-2.5 py-[2px] text-[0.5rem] font-medium tracking-wide text-[#1a1918]">
                                לפרטים
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-t-[999px] rounded-b-none"
                  style={{ boxShadow: "inset 0 0 28px rgb(0 0 0 / 0.18)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

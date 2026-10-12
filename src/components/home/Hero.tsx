import Image from "next/image";
import { HeroBg } from "@/components/home/HeroBg";
import { HeroFrame, HeroGhost, HeroGoldLine, HeroLead } from "@/components/home/HeroMotion";
import { home } from "@/content/home";
import { site } from "@/content/site";

/**
 * Production Hero — LCP-safe: H1, CTA, micro and images render in HTML immediately.
 * Secondary choreography lives in HeroMotion / Parallax (client).
 */
export function Hero() {
  const { hero } = home;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-navy text-cream">
      <HeroBg src="/media/hero-office-dusk.jpg" alt={hero.backgroundAlt} />
      <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgb(18 28 53 / 0.94) 0%, rgb(18 28 53 / 0.72) 42%, rgb(18 28 53 / 0.45) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[min(92vh,880px)] max-w-6xl flex-col justify-end px-5 pb-10 pt-16 md:justify-center md:px-8 md:pb-24 md:pt-28">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-8 lg:gap-12">
          <div className="relative z-10 max-w-xl">
            <p className="text-small tracking-[0.08em] text-gold">{site.brand}</p>

            <HeroGhost word={hero.ghostWord} />

            <h1
              id="hero-heading"
              className="relative mt-4 font-display font-bold text-cream"
              style={{
                fontSize: "clamp(2.5rem, 1.6rem + 3.2vw, 4.25rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {hero.h1}
            </h1>

            <HeroLead>
              <p
                className="mt-5 max-w-lg text-cream/85"
                style={{
                  fontSize: "clamp(1.05rem, 1rem + 0.35vw, 1.25rem)",
                  lineHeight: 1.65,
                }}
              >
                {hero.lead}
              </p>
            </HeroLead>

            <div className="mt-8">
              <HeroGoldLine />
              <a
                id="hero-cta"
                href={hero.primaryHref}
                className="mt-3 flex min-h-12 w-full items-center justify-center rounded-md bg-gold px-6 text-button font-medium text-navy transition duration-[var(--motion-instant)] hover:-translate-y-px hover:bg-gold-hover hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-reduce:hover:translate-y-0 md:inline-flex md:w-auto"
              >
                {hero.primaryCta}
              </a>
              <p className="mt-3 text-small text-cream/65">{hero.reassurance}</p>
            </div>
          </div>

          <HeroFrame>
            <div className="relative z-10 ms-0 aspect-[4/3] w-full overflow-hidden border border-white/15 md:-ms-6 md:aspect-[4/5] md:max-h-[min(520px,70vh)] md:w-[calc(100%+1.5rem)] lg:-ms-10 lg:w-[calc(100%+2.5rem)]">
              <Image
                src="/media/meeting-room.jpg"
                alt={hero.frameAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover transition-[filter] duration-[var(--motion-fast)] group-hover/frame:brightness-[1.03] motion-reduce:transition-none"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent p-4 md:p-5">
                <p className="text-small text-cream/70">{hero.visualNote}</p>
              </div>
            </div>
          </HeroFrame>
        </div>
      </div>
    </section>
  );
}

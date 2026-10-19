import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

/**
 * Editorial index over a cinematic office photo — premium atmosphere, not flat charcoal.
 */
export function ArticlesTeaser() {
  const { articles } = home;

  return (
    <section
      className="relative overflow-hidden py-14 text-cream md:py-20"
      aria-labelledby="articles-heading"
    >
      <Image
        src="/media/corridor-dusk.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[70%_45%]"
        priority={false}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgb(34 33 32 / 0.88) 0%, rgb(34 33 32 / 0.72) 48%, rgb(34 33 32 / 0.8) 100%), linear-gradient(to top, rgb(34 33 32 / 0.55) 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 15% 20%, rgb(196 163 90 / 0.16), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-cream/15 pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
            <div>
              <p className="font-display text-[0.68rem] tracking-[0.1em] text-gold">
                מהבלוג
              </p>
              <h2 id="articles-heading" className="mt-2 font-display text-h2 drop-shadow-sm">
                {articles.title}
              </h2>
              <p className="mt-2 max-w-md text-small text-cream/65">{articles.lead}</p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 self-start text-small text-gold transition hover:text-gold-hover md:self-auto"
            >
              לכל המאמרים
              <span aria-hidden className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal stagger as="ul" className="mt-2">
          {articles.items.map((item, index) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-3 border-b border-cream/12 py-6 transition md:grid-cols-[5rem_7rem_1fr_auto] md:gap-8 md:py-7"
              >
                <span className="font-display text-[1.25rem] tabular-nums text-gold md:text-[1.5rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hidden text-[0.7rem] tracking-[0.1em] text-cream/50 md:block">
                  {item.tag}
                </span>
                <span className="min-w-0">
                  <span className="mb-1 block text-[0.65rem] tracking-[0.1em] text-cream/50 md:hidden">
                    {item.tag}
                  </span>
                  <span className="font-display text-[1.05rem] leading-snug text-cream transition group-hover:text-gold md:text-[1.25rem]">
                    {item.title}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-gold/60 transition-transform group-hover:-translate-x-1 group-hover:text-gold"
                >
                  ←
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

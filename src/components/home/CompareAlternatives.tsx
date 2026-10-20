import Image from "next/image";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function CompareAlternatives() {
  const { compare } = home;

  return (
    <section
      className="relative overflow-x-clip bg-cream py-9 md:py-24"
      aria-labelledby="compare-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-xl">
          <GoldLineDraw />
          <h2 id="compare-heading" className="mt-3 font-display text-h2 text-navy md:mt-4">
            {compare.title}
          </h2>
          <p className="mt-1.5 text-small text-muted md:mt-2">{compare.lead}</p>
        </Reveal>

        {/* Phone: full-width stacked cards (no sideways scroll). Desktop: 3-col. */}
        <Reveal stagger as="ul" className="mt-5 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {compare.rows.map((row) => {
            const featured = "featured" in row && row.featured;
            const image = "image" in row ? row.image : "/media/about-texture.jpg";

            return (
              <li
                key={row.label}
                className={[
                  "relative min-h-[11.5rem] w-full overflow-hidden md:min-h-[22rem]",
                  featured ? "ring-1 ring-gold/60" : "",
                ].join(" ")}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className={[
                    "object-cover transition duration-[var(--motion-slow)] ease-[var(--ease-out)]",
                    featured ? "scale-105" : "opacity-90",
                  ].join(" ")}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: featured
                      ? "linear-gradient(180deg, rgb(34 33 32 / 0.25) 0%, rgb(34 33 32 / 0.88) 55%, rgb(34 33 32 / 0.96) 100%)"
                      : "linear-gradient(180deg, rgb(34 33 32 / 0.35) 0%, rgb(34 33 32 / 0.78) 100%)",
                  }}
                  aria-hidden
                />

                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                  {featured ? (
                    <span
                      className="mb-auto inline-flex size-7 items-center justify-center border border-gold font-display text-[0.9rem] text-gold md:size-9 md:text-[1.05rem]"
                      style={{ borderRadius: 1 }}
                      aria-hidden
                    >
                      כ
                    </span>
                  ) : null}

                  <h3 className="font-display text-[1.25rem] text-cream md:text-[1.5rem]">
                    {row.label}
                  </h3>
                  <span className="mt-2 h-px w-8 bg-gold/80 md:mt-3 md:w-10" aria-hidden />
                  <p className="mt-2 text-[0.9rem] leading-snug text-cream/85 md:mt-3 md:max-w-[22ch] md:text-[0.9rem]">
                    {row.body}
                  </p>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

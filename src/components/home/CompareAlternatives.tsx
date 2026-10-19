import Image from "next/image";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function CompareAlternatives() {
  const { compare } = home;

  return (
    <section
      className="relative overflow-hidden bg-cream py-14 md:py-24"
      aria-labelledby="compare-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-xl">
          <GoldLineDraw />
          <h2 id="compare-heading" className="mt-4 font-display text-h2 text-navy">
            {compare.title}
          </h2>
          <p className="mt-2 text-small text-muted">{compare.lead}</p>
        </Reveal>

        <Reveal stagger as="ul" className="mt-10 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {compare.rows.map((row) => {
            const featured = "featured" in row && row.featured;
            const image = "image" in row ? row.image : "/media/about-texture.jpg";

            return (
              <li
                key={row.label}
                className={[
                  "relative min-h-[18rem] overflow-hidden md:min-h-[22rem]",
                  featured ? "ring-1 ring-gold/60" : "",
                ].join(" ")}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className={[
                    "object-cover transition duration-700",
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

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                  {featured ? (
                    <span
                      className="mb-auto inline-flex size-9 items-center justify-center border border-gold font-display text-[1.05rem] text-gold"
                      style={{ borderRadius: 1 }}
                      aria-hidden
                    >
                      כ
                    </span>
                  ) : null}

                  <h3 className="font-display text-[1.35rem] text-cream md:text-[1.5rem]">
                    {row.label}
                  </h3>
                  <span className="mt-3 h-px w-10 bg-gold/80" aria-hidden />
                  <p className="mt-3 max-w-[22ch] text-[0.9rem] leading-snug text-cream/80">
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

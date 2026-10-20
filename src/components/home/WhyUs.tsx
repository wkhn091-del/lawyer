import Image from "next/image";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Counter, Reveal } from "@/motion";
import { home } from "@/content/home";

export function WhyUs() {
  const { why } = home;

  return (
    <section
      className="relative overflow-x-clip bg-cream py-9 md:py-24"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-stretch md:gap-10">
          {/* Copy + pillars first on phone */}
          <div className="order-1 flex flex-col justify-center md:order-none">
            <Reveal>
              <GoldLineDraw />
              <h2 id="why-heading" className="mt-3 font-display text-h2 text-navy md:mt-4">
                {why.title}
              </h2>
              <p className="mt-2 text-small text-muted md:mt-3 md:text-body">{why.body}</p>
            </Reveal>

            <Reveal stagger as="ul" className="mt-5 space-y-0 md:mt-10">
              {why.pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className="flex items-start gap-3.5 border-t border-border/70 py-3.5 first:border-t-0 first:pt-0 md:gap-5 md:py-5"
                >
                  <span className="font-display text-[0.95rem] text-gold-ink tabular-nums md:text-[1.1rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.05rem] text-navy md:text-[1.15rem]">
                      {pillar.title}
                    </h3>
                    <p className="mt-0.5 text-[0.85rem] leading-snug text-muted md:mt-1 md:text-small">
                      {pillar.body}
                    </p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>

          {/*
            Stats panel: on phone the list is in-flow (no absolute clip).
            Desktop keeps the tall photo panel look (locked).
          */}
          <Reveal className="relative order-2 overflow-hidden md:order-none md:min-h-full">
            <div className="absolute inset-0">
              <Image
                src="/media/about-texture.jpg"
                alt=""
                fill
                sizes="(max-width:768px) 100vw, 45vw"
                className="object-cover"
                aria-hidden
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(165deg, rgb(34 33 32 / 0.45) 0%, rgb(34 33 32 / 0.92) 70%)",
                }}
                aria-hidden
              />
            </div>

            {/* Phone: 3-col strip (no clip). Desktop: stacked in the photo panel. */}
            <ul className="relative grid grid-cols-3 gap-2 px-4 py-5 md:flex md:min-h-[22rem] md:flex-col md:justify-end md:gap-6 md:px-9 md:py-9">
              {why.points.map((point) => (
                <li key={point.suffix} className="text-center text-cream md:text-start">
                  <p className="font-display text-[1.85rem] leading-none tracking-tight md:text-[clamp(3.25rem,2.5rem+3vw,5rem)]">
                    <bdi>
                      <Counter to={point.value} duration={1.3} locale="he-IL" />
                    </bdi>
                  </p>
                  <p className="mt-1 font-display text-[0.78rem] leading-tight text-cream/90 md:text-[1.05rem]">
                    {point.suffix}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] leading-tight text-cream/70 md:text-[0.75rem] md:text-cream/75">
                    {point.note}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Counter, Reveal } from "@/motion";
import { home } from "@/content/home";

export function WhyUs() {
  const { why } = home;

  return (
    <section
      className="relative overflow-hidden bg-cream py-14 md:py-24"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-stretch md:gap-10">
          <Reveal className="relative min-h-[22rem] overflow-hidden md:min-h-full">
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
                  "linear-gradient(165deg, rgb(34 33 32 / 0.4) 0%, rgb(34 33 32 / 0.92) 70%)",
              }}
              aria-hidden
            />
            <ul className="absolute inset-0 flex flex-col justify-end gap-6 p-7 md:p-9">
              {why.points.map((point) => (
                <li key={point.suffix} className="text-cream">
                  <p className="font-display text-[clamp(3.25rem,2.5rem+3vw,5rem)] leading-none tracking-tight">
                    <Counter to={point.value} duration={1.4} locale="he-IL" />
                  </p>
                  <p className="mt-1 font-display text-[1.05rem] text-cream/90">
                    {point.suffix}
                  </p>
                  <p className="mt-0.5 text-[0.75rem] text-cream/75">{point.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal>
              <GoldLineDraw />
              <h2 id="why-heading" className="mt-4 font-display text-h2 text-navy">
                {why.title}
              </h2>
              <p className="mt-3 text-muted">{why.body}</p>
            </Reveal>

            <Reveal stagger as="ul" className="mt-10 space-y-0">
              {why.pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className="flex items-start gap-5 border-t border-border/70 py-5 first:border-t-0 first:pt-0"
                >
                  <span className="font-display text-[1.1rem] text-gold-ink tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.15rem] text-navy">{pillar.title}</h3>
                    <p className="mt-1 text-small text-muted">{pillar.body}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

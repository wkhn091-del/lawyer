import Image from "next/image";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Counter, Reveal } from "@/motion";
import { home } from "@/content/home";

export function WhyUs() {
  const { why } = home;

  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:px-8">
        <div>
          <Reveal>
            <GoldLineDraw />
            <h2 className="mt-4 font-display text-h2 text-navy">{why.title}</h2>
            <p className="mt-4 max-w-lg text-muted">{why.body}</p>
          </Reveal>

          <Reveal stagger className="mt-10 space-y-6">
            {why.pillars.map((pillar) => (
              <div key={pillar.title} className="border-s-2 border-gold ps-4">
                <h3 className="font-display text-h3 text-navy">{pillar.title}</h3>
                <p className="mt-2 text-small text-muted">{pillar.body}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden md:min-h-full">
            <Image
              src="/media/about-texture.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              aria-hidden
            />
            <div className="scrim absolute inset-0" aria-hidden />
            <ul className="absolute inset-0 flex flex-col justify-end gap-6 p-6 md:p-8">
              {why.points.map((point) => (
                <li key={point.suffix} className="border-t border-cream/20 pt-4 text-cream">
                  <p className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none">
                    <Counter to={point.value} duration={1.4} locale="he-IL" />
                    <span className="ms-1 text-h3 font-normal text-cream/85">{point.suffix}</span>
                  </p>
                  <p className="mt-2 text-small text-cream/80">{point.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

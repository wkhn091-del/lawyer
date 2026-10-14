import Image from "next/image";
import { PracticeDoorLink } from "@/components/home/PracticeDoorLink";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function PracticeDoors() {
  const { practice } = home;

  return (
    <section id="practice" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <GoldLineDraw />
          <h2 className="mt-4 font-display text-h2 text-navy">{practice.title}</h2>
          <p className="mt-3 text-muted">{practice.lead}</p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {practice.areas.map((area, index) => (
            <PracticeDoorLink
              key={area.id}
              href={`${area.href}?from=door`}
              areaId={area.id}
              className="group relative flex h-full min-h-[340px] flex-col overflow-hidden bg-navy text-cream shadow-contact transition duration-[var(--motion-base)] hover:-translate-y-0.5 hover:shadow-lift motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-[var(--motion-slow)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
                <span className="absolute bottom-3 start-4 font-display text-small text-gold">0{index + 1}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.45rem] leading-snug">{area.door}</h3>
                <p className="mt-3 flex-1 text-small text-cream/70">{area.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-small font-medium text-gold">
                  {area.title}
                  <span
                    className="transition-transform duration-[var(--motion-fast)] group-hover:-translate-x-1 motion-reduce:transform-none"
                    aria-hidden
                  >
                    ←
                  </span>
                </span>
              </div>
            </PracticeDoorLink>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

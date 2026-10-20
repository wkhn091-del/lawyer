import Image from "next/image";
import { PracticeDoorLink } from "@/components/home/PracticeDoorLink";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function PracticeDoors() {
  const { practice } = home;

  return (
    <section id="practice" className="overflow-x-clip bg-cream py-9 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <GoldLineDraw />
          <h2 className="mt-3 font-display text-h2 text-navy md:mt-4">{practice.title}</h2>
          <p className="mt-2 text-small text-muted md:mt-3 md:text-body">{practice.lead}</p>
        </Reveal>

        <Reveal stagger className="mt-5 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-5">
          {practice.areas.map((area, index) => (
            <PracticeDoorLink
              key={area.id}
              href={`${area.href}?from=door`}
              areaId={area.id}
              className="group relative flex h-full flex-col overflow-hidden bg-navy text-cream shadow-contact transition duration-[var(--motion-base)] hover:-translate-y-0.5 hover:shadow-lift motion-reduce:hover:translate-y-0 md:min-h-[340px]"
            >
              <div className="relative aspect-[2/1] overflow-hidden md:aspect-[5/4]">
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-[var(--motion-slow)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
                <span className="absolute bottom-2 start-3 font-display text-[0.8rem] text-gold md:bottom-3 md:start-4 md:text-small">
                  0{index + 1}
                </span>
                <span className="absolute bottom-2 end-3 text-[0.65rem] text-cream/70 md:bottom-3 md:end-4 md:text-small">
                  הדמיה
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 md:p-6">
                <h3 className="font-display text-[1.15rem] leading-snug md:text-[1.45rem]">{area.door}</h3>
                <p className="mt-1.5 flex-1 text-[0.85rem] leading-snug text-cream/70 md:mt-3 md:text-small">
                  {area.summary}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.85rem] font-medium text-gold md:mt-6 md:text-small">
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

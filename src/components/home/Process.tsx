import { ProcessLine } from "@/components/home/ProcessLine";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function Process() {
  const { process } = home;

  return (
    <section
      id="how"
      className="relative overflow-hidden bg-white py-9 md:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-xl">
          <GoldLineDraw />
          <h2 id="process-heading" className="mt-3 font-display text-h2 text-navy md:mt-4">
            {process.title}
          </h2>
          <p className="mt-1.5 text-small text-muted md:mt-2">{process.lead}</p>
        </Reveal>

        {/* Phone: compact horizontal timeline rows. Desktop: 3-col editorial (locked look). */}
        <ol className="relative mt-6 divide-y divide-border/80 md:mt-16 md:grid md:grid-cols-3 md:gap-6 md:divide-y-0">
          <ProcessLine />
          {process.steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.06}
              as="li"
              className="relative py-3.5 md:py-0 md:text-start"
            >
              <div className="flex items-start gap-3.5 md:mx-auto md:flex-col md:items-start md:gap-0">
                <span className="relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-[0.9rem] text-cream shadow-[0_0_0_4px_#fff] md:size-16 md:text-[1.15rem] md:shadow-[0_0_0_8px_#fff]">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 pt-0.5 md:pt-0">
                  <p
                    className="mt-0 hidden font-display text-[5rem] leading-none tracking-tight text-gold/25 md:mt-6 md:block"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-[1.05rem] text-navy md:-mt-2 md:text-h3">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-[0.85rem] leading-snug text-muted md:mt-2 md:text-small">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

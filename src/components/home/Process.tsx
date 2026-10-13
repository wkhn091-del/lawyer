import { ProcessLine } from "@/components/home/ProcessLine";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function Process() {
  const { process } = home;

  return (
    <section id="how" className="bg-cream py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <GoldLineDraw />
          <h2 className="mt-4 font-display text-h2 text-navy">{process.title}</h2>
          <p className="mt-3 text-muted">{process.lead}</p>
        </Reveal>

        <ol className="relative mt-8 grid gap-5 md:grid-cols-3 md:gap-8">
          <ProcessLine />
          {process.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05} as="li" className="relative">
              <div className="border border-border/80 bg-white/70 p-6 md:border-0 md:bg-transparent md:p-0">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/40 bg-navy font-display text-small text-cream">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-display text-h3 text-navy">{step.title}</h3>
                <p className="mt-2 text-small text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

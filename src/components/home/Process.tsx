import { ProcessLine } from "@/components/home/ProcessLine";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function Process() {
  const { process } = home;

  return (
    <section
      id="how"
      className="relative overflow-hidden bg-white py-14 md:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-xl">
          <GoldLineDraw />
          <h2 id="process-heading" className="mt-4 font-display text-h2 text-navy">
            {process.title}
          </h2>
          <p className="mt-2 text-small text-muted">{process.lead}</p>
        </Reveal>

        <ol className="relative mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-6">
          <ProcessLine />
          {process.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} as="li" className="relative text-center md:text-start">
              <div className="mx-auto flex flex-col items-center md:items-start">
                <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-full bg-navy font-display text-cream shadow-[0_0_0_8px_#fff] md:size-16">
                  {index + 1}
                </span>
                <p
                  className="mt-6 font-display text-[4rem] leading-none tracking-tight text-gold/25 md:text-[5rem]"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="-mt-2 font-display text-h3 text-navy">{step.title}</h3>
                <p className="mt-2 text-small text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

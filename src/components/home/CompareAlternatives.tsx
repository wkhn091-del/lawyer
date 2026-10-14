import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function CompareAlternatives() {
  const { compare } = home;

  return (
    <section className="border-y border-border bg-white py-16 md:py-24" aria-labelledby="compare-heading">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <GoldLineDraw />
          <h2 id="compare-heading" className="mt-4 font-display text-h2 text-navy">
            {compare.title}
          </h2>
          <p className="mt-3 text-muted">{compare.lead}</p>
        </Reveal>

        <Reveal stagger as="ul" className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {compare.rows.map((row) => (
            <li key={row.label} className="border-t border-gold/40 pt-5">
              <h3 className="font-display text-h3 text-navy">{row.label}</h3>
              <p className="mt-3 text-small text-muted">{row.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

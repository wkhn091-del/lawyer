import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function WhyNow() {
  const { whyNow } = home;

  return (
    <section className="bg-navy py-16 text-cream md:py-24" aria-labelledby="why-now-heading">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <GoldLineDraw />
          <h2 id="why-now-heading" className="mt-4 font-display text-h2">
            {whyNow.title}
          </h2>
          <p className="mt-3 text-cream/75">{whyNow.lead}</p>
        </Reveal>

        <Reveal stagger as="ul" className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {whyNow.items.map((item) => (
            <li key={item.area} className="border-t border-gold/50 pt-5">
              <p className="text-small text-gold">{item.area}</p>
              <h3 className="mt-2 font-display text-h3">{item.moment}</h3>
              <p className="mt-3 text-small text-cream/75">{item.body}</p>
            </li>
          ))}
        </Reveal>

        <p className="mt-10 text-small text-cream/60">המידע כללי ואינו ייעוץ משפטי. כל מקרה נבדק לגופו.</p>
      </div>
    </section>
  );
}

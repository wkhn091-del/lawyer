import { Reveal } from "@/motion";
import { faq } from "@/content/home";

export function HomeFaq() {
  return (
    <section id="faq" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-h2 text-navy">שאלות נפוצות</h2>
        </Reveal>
        <Reveal stagger className="mt-8 divide-y divide-border border-y border-border">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none font-medium text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex min-h-12 items-center justify-between gap-4">
                  {item.q}
                  <span
                    className="text-gold transition duration-[var(--motion-base)] group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2 pb-1 text-small text-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
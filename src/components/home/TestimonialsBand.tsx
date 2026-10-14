import { Reveal } from "@/motion";
import { home } from "@/content/home";

/** Real quotes only. Renders nothing until the client supplies approved testimonials. */
export function TestimonialsBand() {
  const { testimonials } = home;
  if (testimonials.items.length === 0) return null;

  return (
    <section className="bg-cream py-14 md:py-16" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <h2 id="testimonials-heading" className="font-display text-h2 text-navy">
            {testimonials.title}
          </h2>
          <ul className="mt-8 space-y-8 text-start">
            {testimonials.items.map((item) => (
              <li key={`${item.name}-${item.area}`} className="border-s-2 border-gold ps-4">
                <blockquote className="text-lead text-ink">«{item.quote}»</blockquote>
                <p className="mt-3 text-small text-muted">
                  {item.name} · {item.area}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

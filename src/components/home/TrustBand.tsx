import { home } from "@/content/home";

export function TrustBand() {
  return (
    <section aria-label="עובדות על המשרד" className="border-b border-cream/10 bg-navy-deep text-cream">
      <ul className="mx-auto flex max-w-6xl flex-col px-5 md:flex-row md:px-8">
        {home.trustBand.map((item, index) => (
          <li
            key={item}
            className={`flex min-h-14 flex-1 items-center justify-center py-4 text-center text-[0.9375rem] tracking-wide text-cream/80 md:px-6 ${
              index > 0 ? "border-t border-cream/10 md:border-t-0 md:border-s" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

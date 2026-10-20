import { Marquee } from "@/motion";
import { home } from "@/content/home";

const PHRASES = [
  ...home.trustBand,
  "קוראים כל מילה לפני חתימה",
  "שקיפות בעלויות מההתחלה",
  "בלי התחייבות לייצוג בשלב הזה",
];

/** Slow legal-phrase marquee — cream strip, not a flat black bar. */
export function TrustBand() {
  return (
    <section
      aria-label="עובדות על המשרד"
      className="border-y border-border/70 bg-cream py-3.5 text-navy md:py-6"
    >
      <Marquee duration={48} gap="2.5rem" pauseOnHover repeat={2}>
        {PHRASES.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2.5 text-[0.82rem] tracking-wide text-navy/75 md:text-[0.95rem]"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { home } from "@/content/home";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/motion/gsap";

/**
 * Motion book E1-11 — words that fill on scroll.
 * Outline → solid gold as the section pins through progress.
 */
export function WordFillBand() {
  const rootRef = useRef<HTMLElement>(null);
  const { wordFill } = home;

  useGSAP(
    () => {
      const section = rootRef.current;
      if (!section) return;
      const words = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-word]"));

      if (prefersReducedMotion()) {
        words.forEach((el) => {
          el.style.backgroundPosition = "0% 0";
          el.style.color = "var(--color-gold)";
          el.style.webkitTextStroke = "0";
        });
        return;
      }

      words.forEach((el) => {
        gsap.set(el, { backgroundPosition: "100% 0" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
        },
      });

      words.forEach((el, i) => {
        tl.to(
          el,
          {
            backgroundPosition: "0% 0",
            duration: 1,
            ease: "none",
          },
          i * 0.35,
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-label={wordFill.label}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#050505]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 70% 40%, rgb(196 163 90 / 0.1), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-20 md:px-8">
        <p className="text-center text-[0.72rem] font-medium tracking-[0.22em] text-gold/70 md:text-start">
          {wordFill.label}
        </p>
        <ul className="mt-10 flex flex-col gap-4 md:mt-14 md:gap-6">
          {wordFill.words.map((word) => (
            <li key={word} className="overflow-hidden">
              <span
                data-word
                className="word-fill-glyph block font-display text-[clamp(2.75rem,12vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]"
              >
                {word}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/motion/gsap";

/** A19 — process line draws as the section scrolls into view. */
export function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.style.transform = "scaleX(1)";
        return;
      }
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top 75%",
            end: "top 35%",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute start-[16%] end-[16%] top-7 hidden h-px origin-right bg-gold md:block"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}

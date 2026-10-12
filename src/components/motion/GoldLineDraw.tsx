"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/motion/gsap";

/** Visible signature motion — a gold rule that draws when it enters view. */
export function GoldLineDraw({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { scaleX: 1 });
        return;
      }

      gsap.set(el, { scaleX: 0, transformOrigin: "right center" });
      const tween = gsap.to(el, {
        scaleX: 1,
        duration: 0.85,
        ease: "power2.out",
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => tween.play(),
      });

      if (trigger.isActive || ScrollTrigger.isInViewport(el)) {
        tween.play();
      }

      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`h-px w-20 bg-gold md:w-28 ${className ?? ""}`}
      style={{ transform: "scaleX(0)", transformOrigin: "right center" }}
    />
  );
}

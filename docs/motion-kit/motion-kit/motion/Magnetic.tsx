"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, hasFinePointer, prefersReducedMotion, useGSAP } from "./gsap";

export interface MagneticProps {
  children: ReactNode;
  /** How strongly it follows the cursor, 0 to 1. Default: 0.35. */
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wrap a button or link: it leans toward the cursor and springs back on leave.
 * Turns itself off on touch screens and for reduced-motion visitors.
 */
export function Magnetic({ children, strength = 0.35, className, style }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !hasFinePointer() || prefersReducedMotion()) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", ...style }}>
      {children}
    </span>
  );
}

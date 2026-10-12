"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "./gsap";

export interface CounterProps {
  /** Final number. This is also what search engines and no-JS visitors see. */
  to: number;
  from?: number;
  /** Seconds. Default: 2. */
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Number formatting locale, e.g. "he-IL" or "en-US". Default: the browser's. */
  locale?: string;
  className?: string;
  style?: CSSProperties;
}

/** Counts up to a number when it scrolls into view. Great for stats like "15+ departments". */
export function Counter({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale,
  className,
  style,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    prefix +
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n) +
    suffix;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.removeAttribute("data-motion-pending");
      // Keep the final number visible until the count starts (SEO / no flash of 0).
      el.textContent = format(to);
      if (prefersReducedMotion()) return;

      const state = { value: from };
      const tween = gsap.to(state, {
        value: to,
        duration,
        ease: "power2.out",
        paused: true,
        onStart: () => {
          el.textContent = format(from);
        },
        onUpdate: () => {
          el.textContent = format(state.value);
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => {
          tween.play();
        },
      });

      // Already in view on mount (common below a short hero on desktop).
      if (trigger.isActive || ScrollTrigger.isInViewport(el)) {
        tween.play();
      }

      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [to, from, duration, decimals, prefix, suffix, locale] },
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
      data-motion-pending=""
    >
      {format(to)}
    </span>
  );
}

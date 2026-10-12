"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

export interface ParallaxProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /**
   * How far it drifts while the page scrolls past, as a fraction of its own height.
   * 0.2 = drifts slower than the page (classic background feel), -0.2 = drifts faster. Default: 0.2.
   */
  speed?: number;
  /**
   * For images: zooms the content slightly so the drift never shows an empty edge.
   * Put <Parallax image> inside a wrapper that has overflow: hidden.
   */
  image?: boolean;
}

/** Moves content at a different speed from the page as you scroll. */
export function Parallax({
  children,
  as: Tag = "div",
  className,
  style,
  speed = 0.2,
  image = false,
}: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const shift = speed * 50;
      gsap.fromTo(
        el,
        { yPercent: -shift, scale: image ? 1 + Math.abs(speed) : 1 },
        {
          yPercent: shift,
          ease: "none",
          scrollTrigger: {
            trigger: image ? el.parentElement ?? el : el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [speed, image] },
  );

  return (
    <Tag ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </Tag>
  );
}

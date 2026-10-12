"use client";

import "./motion.css";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, isRTL, prefersReducedMotion, ScrollTrigger, useGSAP } from "./gsap";

export interface HorizontalScrollProps {
  /** The panels/cards, laid out in one row. */
  children: ReactNode;
  /** Space between panels, any CSS length. Default: "2rem". */
  gap?: string;
  /** Smoothing on the scroll link: true = exact, a number = seconds of catch-up. Default: 1. */
  scrub?: boolean | number;
  /** Below this screen width (px) the section becomes a normal swipeable row. Default: 0 (always pinned). */
  disableBelow?: number;
  className?: string;
  trackClassName?: string;
  style?: CSSProperties;
}

/**
 * The section sticks to the screen and its content slides sideways while the visitor scrolls down.
 * In RTL pages it slides the other way automatically.
 */
export function HorizontalScroll({
  children,
  gap = "2rem",
  scrub = 1,
  disableBelow = 0,
  className,
  trackClassName,
  style,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${disableBelow}px)`, () => {
        const direction = isRTL(section) ? 1 : -1;
        // How far the row must travel so its last item ends at the section's inner edge.
        const distance = () => {
          const cs = getComputedStyle(section);
          const inner =
            section.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          return Math.max(0, track.scrollWidth - inner);
        };

        gsap.to(track, {
          x: () => direction * distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      // Below the breakpoint the row scrolls natively.
      if (disableBelow > 0) {
        mm.add(`(max-width: ${disableBelow - 1}px)`, () => {
          section.style.overflowX = "auto";
          return () => {
            section.style.overflowX = "";
          };
        });
      }

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [scrub, disableBelow] },
  );

  return (
    <section
      ref={sectionRef}
      className={["mk-hscroll", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div
        ref={trackRef}
        className={["mk-hscroll__track", trackClassName].filter(Boolean).join(" ")}
        style={{ "--mk-gap": gap } as CSSProperties}
      >
        {children}
      </div>
    </section>
  );
}

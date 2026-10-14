"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";

export interface SplitRevealProps {
  /** Plain text (inline tags like <em> or <br/> are fine). */
  children: ReactNode;
  /** HTML tag to render. Default: "h2". */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /**
   * What rises into view one by one.
   * "lines" (default, best for Hebrew and long text), "words", or "chars" (short headlines in Latin script).
   */
  by?: "lines" | "words" | "chars";
  delay?: number;
  duration?: number;
  ease?: string;
  /** Seconds between pieces. Default: depends on `by`. */
  stagger?: number;
  /** Tie the animation to the scrollbar instead of playing it once. */
  scrub?: boolean;
  /** ScrollTrigger start. Default: from the preset. */
  start?: string;
  /** Play right away on page load instead of waiting for scroll. Use it for the hero headline. */
  immediate?: boolean;
}

const defaultStagger = { lines: 0.1, words: 0.04, chars: 0.02 } as const;

/** Headline reveal: each line, word or letter slides up from behind a mask. */
export function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  style,
  by = "lines",
  delay = 0,
  duration,
  ease,
  stagger,
  scrub = false,
  start,
  immediate = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { settings } = useMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.removeAttribute("data-motion-pending");
      if (prefersReducedMotion()) return;

      const type = by === "lines" ? "lines" : by === "words" ? "lines,words" : "lines,words,chars";
      let tween: gsap.core.Tween | undefined;
      let trigger: ScrollTrigger | undefined;

      const play = () => {
        tween?.play();
      };

      const split = SplitText.create(el, {
        type,
        mask: "lines",
        linesClass: "mk-split-line",
        aria: "auto",
        autoSplit: true,
        onSplit(self) {
          const pieces = self[by];
          tween = gsap.from(pieces, {
            yPercent: 110,
            delay,
            duration: duration ?? settings.duration,
            ease: scrub ? "none" : (ease ?? settings.ease),
            stagger: stagger ?? defaultStagger[by],
            paused: !immediate && !scrub,
            ...(scrub
              ? { scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 55%", scrub: true } }
              : {}),
          });

          if (!immediate && !scrub) {
            trigger?.kill();
            trigger = ScrollTrigger.create({
              trigger: el,
              start: start ?? settings.start,
              once: true,
              onEnter: play,
            });
            if (trigger.isActive || ScrollTrigger.isInViewport(el)) {
              play();
            }
          }

          return tween;
        },
      });

      return () => {
        trigger?.kill();
        tween?.kill();
        split?.revert();
        gsap.set(el, { clearProps: "opacity,visibility,transform" });
      };
    },
    { scope: ref, dependencies: [settings, by, immediate, scrub, delay, duration, ease, stagger, start] },
  );

  return (
    <Tag ref={ref} className={className} style={style} data-motion-pending="">
      {children}
    </Tag>
  );
}

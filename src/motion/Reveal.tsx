"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";

export interface RevealProps {
  children: ReactNode;
  /** HTML tag to render. Default: "div". */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Pixels to rise from. Default: from the preset. Use a negative number to drop down instead. */
  y?: number;
  /** Pixels to slide from sideways. Default: 0. */
  x?: number;
  /** Starting scale, e.g. 0.95 for a subtle zoom-in. */
  scale?: number;
  /** Starting blur in pixels, e.g. 8. */
  blur?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  /**
   * Animate each direct child one after another instead of the whole block.
   * true = preset spacing, or a number of seconds between children.
   */
  stagger?: boolean | number;
  /** Play once (default) or replay every time it scrolls back into view. */
  once?: boolean;
  /** ScrollTrigger start, e.g. "top 80%". Default: from the preset. */
  start?: string;
  /** Play right away on page load instead of waiting for scroll. Use it for the first screen (hero). */
  immediate?: boolean;
}

function showFinal(targets: gsap.TweenTarget) {
  gsap.set(targets, { clearProps: "opacity,visibility,transform,filter" });
}

/** Fades and slides content in when it scrolls into view. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  y,
  x = 0,
  scale,
  blur,
  delay = 0,
  duration,
  ease,
  stagger = false,
  once = true,
  start,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { settings } = useMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.removeAttribute("data-motion-pending");

      const targets = stagger ? Array.from(el.children) : el;

      if (prefersReducedMotion()) {
        showFinal(targets);
        return;
      }

      const from: gsap.TweenVars = {
        opacity: 0,
        y: y ?? settings.distance,
        x,
        visibility: "visible",
      };
      const to: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        x: 0,
        visibility: "visible",
        delay,
        duration: duration ?? settings.duration,
        ease: ease ?? settings.ease,
        stagger: stagger === true ? settings.stagger : stagger || 0,
        onComplete: () => showFinal(targets),
      };
      if (scale !== undefined) {
        from.scale = scale;
        to.scale = 1;
      }
      if (blur) {
        from.filter = `blur(${blur}px)`;
        to.filter = "blur(0px)";
      }

      const tween = gsap.fromTo(targets, from, { ...to, paused: true });

      if (immediate) {
        tween.play();
        return () => {
          tween.kill();
          showFinal(targets);
        };
      }

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: start ?? settings.start,
        once,
        onEnter: () => {
          tween.play();
        },
      });

      if (trigger.isActive || ScrollTrigger.isInViewport(el)) {
        tween.play();
      }

      return () => {
        trigger.kill();
        tween.kill();
        showFinal(targets);
      };
    },
    { scope: ref, dependencies: [settings, immediate, stagger, delay, duration, ease, once, start, x, y, scale, blur] },
  );

  return (
    <Tag ref={ref} className={className} style={style} data-motion-pending="">
      {children}
    </Tag>
  );
}

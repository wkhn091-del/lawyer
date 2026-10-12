"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";

// The very first page load is already handled by each component's own entrance,
// so the page itself only animates on client-side navigation.
let initialUrl: string | null = null;
let hasNavigated = false;

function isFirstLoad(): boolean {
  const url = window.location.pathname + window.location.search;
  if (initialUrl === null) initialUrl = url;
  if (!hasNavigated && url === initialUrl) return true;
  hasNavigated = true;
  return false;
}

/**
 * Soft fade-and-rise between pages.
 * Use it in app/template.tsx (not layout.tsx): Next.js remounts templates on every navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { settings } = useMotion();

  useGSAP(
    () => {
      if (isFirstLoad() || !ref.current || prefersReducedMotion()) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y: Math.min(settings.distance, 40),
        duration: Math.min(settings.duration, 0.8),
        ease: settings.ease,
        clearProps: "transform,opacity,visibility",
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

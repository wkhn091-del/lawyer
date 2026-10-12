"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Stops mobile address-bar show/hide from triggering a full ScrollTrigger refresh.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** True when the visitor asked the OS for reduced motion. Animations should be skipped. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True when the element (or the page) is laid out right-to-left, e.g. Hebrew or Arabic. */
export function isRTL(el?: Element | null): boolean {
  if (typeof window === "undefined") return false;
  const target = el ?? document.documentElement;
  return getComputedStyle(target).direction === "rtl";
}

/** True on devices with a real mouse (hover effects are pointless on touch screens). */
export function hasFinePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

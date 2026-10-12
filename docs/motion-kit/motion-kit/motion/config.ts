/**
 * Motion presets. One prop on <MotionProvider preset="..."> changes the feel of the whole site.
 * Every component reads its defaults from here, and any prop you pass to a component wins.
 */

export interface MotionSettings {
  /** GSAP ease for entrance animations. */
  ease: string;
  /** Seconds an entrance animation takes. */
  duration: number;
  /** Pixels an element travels while it fades in. */
  distance: number;
  /** Seconds between items when several animate in sequence. */
  stagger: number;
  /** Smooth-scroll intensity: lower = smoother and heavier, 1 = no smoothing. */
  lerp: number;
  /** When an element starts animating: "top 85%" = its top reaches 85% down the viewport. */
  start: string;
}

export type MotionPreset = "luxury" | "studio" | "snappy" | "minimal";

export const presets: Record<MotionPreset, MotionSettings> = {
  /** Slow and heavy. Real estate, hotels, fashion, jewellery, premium brands. */
  luxury: {
    ease: "expo.out",
    duration: 1.6,
    distance: 60,
    stagger: 0.12,
    lerp: 0.07,
    start: "top 85%",
  },
  /** Confident and editorial. Agencies, studios, portfolios, AI/tech landing pages. */
  studio: {
    ease: "power4.out",
    duration: 1.2,
    distance: 80,
    stagger: 0.08,
    lerp: 0.1,
    start: "top 85%",
  },
  /** Quick and crisp. SaaS, startups, product sites where people want to get to the point. */
  snappy: {
    ease: "power3.out",
    duration: 0.7,
    distance: 32,
    stagger: 0.05,
    lerp: 0.14,
    start: "top 90%",
  },
  /** Barely there. Corporate, public sector, content-heavy sites. Smooth scroll is off. */
  minimal: {
    ease: "power2.out",
    duration: 0.6,
    distance: 16,
    stagger: 0.04,
    lerp: 1,
    start: "top 90%",
  },
};

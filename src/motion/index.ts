export { MotionProvider, useMotion } from "./MotionProvider";
export type { MotionProviderProps } from "./MotionProvider";
export { presets } from "./config";
export type { MotionPreset, MotionSettings } from "./config";

export { Reveal } from "./Reveal";
export { SplitReveal } from "./SplitReveal";
export { Parallax } from "./Parallax";
export { Counter } from "./Counter";
export { Magnetic } from "./Magnetic";
export { Marquee } from "./Marquee";
export { HorizontalScroll } from "./HorizontalScroll";
export { PageTransition } from "./PageTransition";

// For writing your own animations with the same setup.
export { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion, isRTL } from "./gsap";

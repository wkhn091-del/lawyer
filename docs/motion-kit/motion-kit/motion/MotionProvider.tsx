"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./motion.css";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { presets, type MotionPreset, type MotionSettings } from "./config";
import { gsap, ScrollTrigger } from "./gsap";

type ScrollTarget = number | string | HTMLElement;

interface MotionContextValue {
  settings: MotionSettings;
  /** The smooth-scroll instance, or null when smooth scroll is off. */
  getLenis: () => Lenis | null;
  /** Scrolls to a pixel value, a selector ("#pricing") or an element. Works with or without smooth scroll. */
  scrollTo: (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => void;
}

const MotionContext = createContext<MotionContextValue>({
  settings: presets.studio,
  getLenis: () => null,
  scrollTo: () => {},
});

export interface MotionProviderProps {
  children: ReactNode;
  /** The overall feel of the site. Default: "studio". */
  preset?: MotionPreset;
  /** Fine-tune any preset value, e.g. { duration: 1 }. */
  overrides?: Partial<MotionSettings>;
  /** Smooth (inertia) scrolling. Default: on, except for the "minimal" preset. */
  smooth?: boolean;
}

export function MotionProvider({
  children,
  preset = "studio",
  overrides,
  smooth,
}: MotionProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Keep the settings object stable unless a value actually changes.
  const overridesKey = JSON.stringify(overrides ?? {});
  const settings = useMemo<MotionSettings>(
    () => ({ ...presets[preset], ...(JSON.parse(overridesKey) as Partial<MotionSettings>) }),
    [preset, overridesKey],
  );
  const smoothEnabled = smooth ?? settings.lerp < 1;

  // Smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis stay in sync.
  useEffect(() => {
    if (!smoothEnabled) return;

    const lenis = new Lenis({
      lerp: settings.lerp,
      autoRaf: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [smoothEnabled, settings.lerp]);

  // Images, fonts and client navigation change the page height after load.
  // Re-measure every scroll animation when that happens.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // After a client-side route change, measure the new page.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const value = useMemo<MotionContextValue>(
    () => ({
      settings,
      getLenis: () => lenisRef.current,
      scrollTo: (target, options = {}) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, options);
          return;
        }
        const el =
          typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
        const top =
          typeof el === "number"
            ? el
            : el
              ? el.getBoundingClientRect().top + window.scrollY
              : 0;
        window.scrollTo({
          top: top + (options.offset ?? 0),
          behavior: options.immediate ? "auto" : "smooth",
        });
      },
    }),
    [settings],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

/** Read the current motion settings, or scroll programmatically: const { scrollTo } = useMotion(); */
export function useMotion() {
  return useContext(MotionContext);
}

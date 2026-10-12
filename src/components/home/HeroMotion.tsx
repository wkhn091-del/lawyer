"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HeroGhost({ word }: { word: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -top-6 start-0 hidden select-none font-display font-bold text-cream md:block"
      style={{
        fontSize: "clamp(4.5rem, 12vw, 11rem)",
        letterSpacing: "-0.04em",
        lineHeight: 0.85,
        zIndex: 0,
      }}
      initial={reduce ? false : { opacity: 0 }}
      animate={reduce ? { opacity: 0.05 } : { opacity: [0.04, 0.06, 0.04] }}
      transition={
        reduce
          ? undefined
          : {
              opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.32 },
            }
      }
    >
      {word}
    </motion.span>
  );
}

export function HeroLead({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  // Keep copy readable without JS — never start at opacity 0 (LCP / no-JS safety).
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.28, delay: 0.18, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function HeroGoldLine() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="mb-3 h-px w-16 bg-gold md:w-20"
      style={{ transformOrigin: "inline-end" }}
      initial={reduce ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.22, delay: 0.28, ease: easeOut }}
    />
  );
}

export function HeroFrame({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="group/frame relative">{children}</div>;
  }

  return (
    <motion.div
      className="group/frame relative"
      style={{ boxShadow: "0 24px 48px rgb(18 28 53 / 0.35)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

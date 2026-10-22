"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";
import { useMotion } from "@/motion";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/motion/gsap";

type RoadmapStage = {
  n: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  /** Landscape asset for md+ — desktop layout is locked. */
  imageDesktop?: string;
  imageAlt: string;
  imagePosition: string;
  imagePositionDesktop?: string;
};
/** `home` is `as const`; widen stages for runtime fields we read. */
const STAGES = [...home.roadmap.stages] as unknown as RoadmapStage[];

function stagePhoto(stage: RoadmapStage, compact: boolean) {
  return compact ? stage.image : (stage.imageDesktop ?? stage.image);
}

function stageFocus(stage: RoadmapStage, compact: boolean) {
  return compact
    ? stage.imagePosition
    : (stage.imagePositionDesktop ?? stage.imagePosition);
}

/**
 * RTL path: stage 01 starts on the right (matches Hebrew thumb order).
 * viewBox width 1240 — mirrored from the LTR S-curve.
 */
const PATH =
  "M 1180 200 C 1060 40, 940 40, 820 200 S 580 360, 460 200 S 220 40, 60 200";

const NODE_POS = [
  { x: 1180, y: 200 },
  { x: 820, y: 200 },
  { x: 460, y: 200 },
  { x: 60, y: 200 },
] as const;

const VIEW_BOX = "0 0 1240 400";

/**
 * Cinematic scroll-pinned roadmap — photo slides per stage.
 * Solid navy underlay + dark pin-spacer so no white flash while pinned.
 */
export function LegalRoadmap() {
  const { scrollTo } = useMotion();
  const scrollToRef = useRef(scrollTo);
  useEffect(() => {
    scrollToRef.current = scrollTo;
  }, [scrollTo]);
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion() || prefersReducedMotion();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [compact, setCompact] = useState(false);
  const prevRef = useRef(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
    if (active === prevRef.current) return;
    setDir(active > prevRef.current ? 1 : -1);
    prevRef.current = active;
  }, [active]);

  /*
   * Phone: one finger swipe = exactly one stage. On touchend we animate the
   * scroll to that stage's anchor inside the pin — a swipe never lands between
   * numbers, never skips two, and at the first/last stage the page scrolls on.
   */
  useEffect(() => {
    if (!compact || reduce) return;
    const section = rootRef.current;
    if (!section) return;

    let startY = 0;
    let startIdx = 0;

    const onStart = (event: TouchEvent) => {
      startY = event.touches[0]?.clientY ?? 0;
      startIdx = activeRef.current;
    };

    const onEnd = (event: TouchEvent) => {
      /* Stage anchors from the pin-spacer geometry — no reliance on ST state. */
      const spacer = section.parentElement;
      if (!spacer) return;
      const pinStart = spacer.getBoundingClientRect().top + window.scrollY;
      const pinDistance = spacer.offsetHeight - section.offsetHeight;
      if (pinDistance <= 0) return;
      const yNow = window.scrollY;
      if (yNow < pinStart - 4 || yNow > pinStart + pinDistance + 4) return;

      const endY = event.changedTouches[0]?.clientY ?? startY;
      const dy = startY - endY;
      const step = Math.abs(dy) < 40 ? 0 : dy > 0 ? 1 : -1;
      const target = Math.min(STAGES.length - 1, Math.max(0, startIdx + step));
      const y = pinStart + (target / (STAGES.length - 1)) * pinDistance;
      if (Math.abs(yNow - y) > 2) {
        /* Scroll through the site's own scroller (Lenis) — a raw window tween fights it. */
        scrollToRef.current(y);
      }
    };

    section.addEventListener("touchstart", onStart, { passive: true });
    section.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", onStart);
      section.removeEventListener("touchend", onEnd);
    };
  }, [compact, reduce]);

  useGSAP(
    () => {
      const section = rootRef.current;
      const path = pathRef.current;
      const glow = glowRef.current;
      if (!section || !path) return;

      const paintSpacer = (st: ScrollTrigger | null | undefined) => {
        const pinEl = st?.pin;
        const spacer =
          pinEl instanceof HTMLElement ? pinEl.parentElement : null;
        if (spacer?.classList.contains("pin-spacer")) {
          spacer.style.backgroundColor = "#222120";
        }
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isMobile, reduceMotion } = ctx.conditions as {
            isMobile: boolean;
            reduceMotion: boolean;
          };
          setCompact(isMobile);

          const length = path.getTotalLength();
          gsap.set([path, glow].filter(Boolean), {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          if (reduce || reduceMotion) {
            gsap.set([path, glow].filter(Boolean), { strokeDashoffset: 0 });
            setActive(STAGES.length - 1);
            return;
          }

          const nodes = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-node]"));

          const tween = gsap.to([path, glow].filter(Boolean), {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: isMobile ? "+=150%" : "+=260%",
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: (self) => paintSpacer(self),
              onEnter: (self) => paintSpacer(self),
              onEnterBack: (self) => paintSpacer(self),
              onUpdate: (self) => {
                paintSpacer(self);
                const idx = isMobile
                  ? Math.min(
                      STAGES.length - 1,
                      Math.round(self.progress * (STAGES.length - 1)),
                    )
                  : Math.min(
                      STAGES.length - 1,
                      Math.floor(self.progress * STAGES.length),
                    );
                setActive(idx);
                nodes.forEach((node, i) => {
                  node.dataset.active = i <= idx ? "true" : "false";
                });
              },
            },
          });

          paintSpacer(tween.scrollTrigger ?? undefined);

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduce] },
  );

  const stage: RoadmapStage = STAGES[active] ?? STAGES[0]!;
  const slideIn = dir === 1 ? "10%" : "-10%";
  const slideOut = dir === 1 ? "-8%" : "8%";
  const strokeTrack = compact ? 12 : 16;
  const strokeGlow = compact ? 18 : 26;
  const strokeProgress = compact ? 8 : 12;
  const nodeSize = compact ? 40 : 52;
  const photoSrc = stagePhoto(stage, compact);
  const photoFocus = stageFocus(stage, compact);

  return (
    <section
      ref={rootRef}
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-deep text-cream"
    >
      {/* Full-bleed stage photos — cover the whole pin, never a centered strip */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-navy-deep" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={photoSrc}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, x: slideIn }}
            animate={{ opacity: 1, x: "0%" }}
            exit={reduce ? undefined : { opacity: 0, x: slideOut }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={photoSrc}
              alt=""
              fill
              priority={active === 0}
              sizes="100vw"
              className="select-none object-cover object-center"
              style={{ objectPosition: photoFocus }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgb(34 33 32 / 0.72) 0%, rgb(34 33 32 / 0.35) 38%, rgb(34 33 32 / 0.22) 55%, rgb(34 33 32 / 0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(105deg, rgb(34 33 32 / 0.82) 0%, rgb(34 33 32 / 0.55) 42%, rgb(34 33 32 / 0.75) 100%), linear-gradient(to top, rgb(34 33 32 / 0.85) 0%, transparent 48%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25 md:opacity-35"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 28%, rgb(196 163 90 / 0.18), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-[100svh] max-h-[100svh] max-w-6xl flex-col px-4 pb-[max(6.25rem,calc(env(safe-area-inset-bottom)+5.25rem))] pt-[max(1.25rem,env(safe-area-inset-top))] md:px-8 md:pb-10 md:pt-10">
        <div className="mx-auto mt-[min(6vh,2.75rem)] w-full max-w-2xl shrink-0 text-center md:me-0 md:ms-auto md:mt-0 md:text-start">
          <p className="text-[0.78rem] font-medium tracking-[0.1em] text-gold md:text-[0.72rem] md:tracking-[0.12em]">
            {home.roadmap.eyebrow}
          </p>

          <div className="relative mt-2.5 min-h-[12.5rem] md:mt-3 md:min-h-[8.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.n}
                initial={reduce ? false : { opacity: 0, x: dir === 1 ? -24 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir === 1 ? 18 : -18 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div aria-live="polite" aria-atomic="true">
                  <p className="font-display text-[1.1rem] text-gold md:text-[0.85rem]">{stage.n}</p>
                  <h2
                    id="roadmap-heading"
                    className="mt-1.5 font-display text-[clamp(2rem,7.5vw,2.45rem)] leading-[1.15] text-cream drop-shadow-sm md:mt-1 md:text-[clamp(1.35rem,5.5vw,2.1rem)] md:leading-tight"
                  >
                    {stage.title}
                  </h2>
                  <motion.p
                    className="mx-auto mt-3 max-w-[34ch] text-[1.12rem] leading-snug text-cream/92 md:mx-0 md:mt-2 md:max-w-none md:line-clamp-3 md:text-[1rem] md:leading-relaxed md:text-cream/85"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {stage.description}
                  </motion.p>
                </div>
                <motion.div
                  className="mt-5 md:mt-4"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.14 }}
                >
                  <Link
                    href={stage.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 text-[1rem] font-medium text-navy-deep shadow-on-dark transition hover:bg-gold-hover md:min-h-10 md:px-5 md:text-small"
                  >
                    {stage.cta}
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative mt-auto flex min-h-0 flex-col justify-end gap-2.5 pb-1 pt-4 md:mt-3 md:gap-4 md:pb-2 md:pt-0">
          <ul className="mx-auto grid w-full max-w-2xl shrink-0 grid-cols-4 gap-2 md:gap-2.5">
            {STAGES.map((s, i) => {
              const on = i === active;
              const passed = i < active;
              return (
                <li key={s.n} className="relative">
                  <div
                    className={[
                      "relative h-16 overflow-hidden rounded-md border transition duration-[var(--motion-slow)] ease-[var(--ease-out)] md:h-20",
                      on
                        ? "scale-[1.03] border-gold shadow-[0_0_0_1px_rgb(196_163_90/0.35),0_8px_20px_-6px_rgb(0_0_0/0.5)]"
                        : passed
                          ? "border-gold/40 opacity-80"
                          : "border-white/15 opacity-55",
                    ].join(" ")}
                  >
                    <Image
                      src={stagePhoto(s, compact)}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width:768px) 22vw, 140px"
                      className={[
                        "object-cover transition duration-[var(--motion-slow)] ease-[var(--ease-out)]",
                        on ? "scale-105" : "scale-100",
                      ].join(" ")}
                      style={{ objectPosition: stageFocus(s, compact) }}
                    />
                    <div
                      className={[
                        "absolute inset-0 transition duration-[var(--motion-slow)] ease-[var(--ease-out)]",
                        on ? "bg-navy/25" : "bg-navy/55",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "absolute inset-x-0 bottom-0 flex items-center justify-center py-0.5 font-display text-[0.65rem] font-bold tracking-wide md:py-1 md:text-[0.75rem]",
                        on ? "bg-gold text-navy-deep" : "bg-navy/70 text-cream/80",
                      ].join(" ")}
                    >
                      {s.n}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          <svg
            viewBox={VIEW_BOX}
            className="mx-auto h-auto w-full max-h-[min(18vh,130px)] max-w-5xl shrink-0 drop-shadow-[0_8px_24px_rgb(0_0_0/0.35)] md:max-h-[min(32vh,260px)]"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="ארבעה שלבים"
          >
            <defs>
              <filter id="roadmap-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={PATH}
              fill="none"
              stroke="rgb(255 255 255 / 0.22)"
              strokeWidth={strokeTrack}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={glowRef}
              d={PATH}
              fill="none"
              stroke="rgb(196 163 90 / 0.5)"
              strokeWidth={strokeGlow}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roadmap-glow)"
            />
            <path
              ref={pathRef}
              d={PATH}
              fill="none"
              stroke="#c4a35a"
              strokeWidth={strokeProgress}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {NODE_POS.map((pos, i) => {
              const stageMeta = STAGES[i];
              if (!stageMeta) return null;
              const on = i <= active;
              return (
                <g key={stageMeta.n} data-node transform={`translate(${pos.x}, ${pos.y})`}>
                  {on ? (
                    <circle
                      r={nodeSize * 0.72}
                      fill="rgb(196 163 90 / 0.25)"
                      className="roadmap-node-pulse"
                    />
                  ) : null}
                  <rect
                    x={-nodeSize / 2}
                    y={-nodeSize / 2}
                    width={nodeSize}
                    height={nodeSize}
                    rx={12}
                    fill={on ? "rgb(34 33 32 / 0.92)" : "rgb(34 33 32 / 0.75)"}
                    stroke={on ? "#c4a35a" : "rgb(255 255 255 / 0.28)"}
                    strokeWidth={1.5}
                    style={{
                      transition:
                        "stroke 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: on ? "scale(1.06)" : "scale(1)",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={on ? "#c4a35a" : "rgb(255 255 255 / 0.45)"}
                    style={{
                      fontFamily: "var(--font-frank), serif",
                      fontSize: compact ? 12 : 15,
                      fontWeight: 700,
                      transition: "fill 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {stageMeta.n}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="shrink-0 text-center text-[0.6rem] leading-snug text-cream/45 md:text-[0.65rem]">
            המידע כללי ואינו ייעוץ משפטי. כל מקרה נבדק לגופו.
          </p>
        </div>
      </div>
    </section>
  );
}

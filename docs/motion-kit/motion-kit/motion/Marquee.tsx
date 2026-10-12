import type { CSSProperties, ReactNode } from "react";
import "./motion.css";

export interface MarqueeProps {
  /** Logos, words, cards… anything. */
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. Default: 30. */
  duration?: number;
  /** Space between items, any CSS length. Default: "3rem". */
  gap?: string;
  /** Scroll the other way. */
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Repeat the content inside each loop, for short content on wide screens. Default: 1. */
  repeat?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Endless scrolling strip, pure CSS (no JavaScript, works as a Server Component).
 * Follows the page direction: in Hebrew/RTL pages it scrolls the other way automatically.
 */
export function Marquee({
  children,
  duration = 30,
  gap = "3rem",
  reverse = false,
  pauseOnHover = false,
  repeat = 1,
  className,
  style,
}: MarqueeProps) {
  const items = Array.from({ length: Math.max(1, repeat) }, (_, i) => (
    <div key={i} style={{ display: "contents" }}>
      {children}
    </div>
  ));

  return (
    <div
      className={["mk-marquee", className].filter(Boolean).join(" ")}
      style={{ "--mk-duration": `${duration}s`, "--mk-gap": gap, ...style } as CSSProperties}
      data-reverse={reverse ? "" : undefined}
      data-pause-on-hover={pauseOnHover ? "" : undefined}
    >
      <div className="mk-marquee__track">
        <div className="mk-marquee__group">{items}</div>
        {/* The copy exists only to make the loop seamless: hidden from screen readers and keyboard. */}
        <div className="mk-marquee__group" aria-hidden="true" inert>
          {items}
        </div>
      </div>
    </div>
  );
}

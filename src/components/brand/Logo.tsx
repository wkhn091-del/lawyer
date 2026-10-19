import { site } from "@/content/site";

type LogoProps = {
  variant?: "default" | "onDark";
  className?: string;
};

/**
 * Quiet-luxury wordmark: hairline double crest + serif name.
 * Mark sits on the outer edge (RTL start) so the brand anchors the side.
 */
export function Logo({ variant = "default", className }: LogoProps) {
  const onDark = variant === "onDark";
  const ink = onDark ? "text-cream" : "text-navy";
  const brass = onDark ? "text-gold" : "text-gold-ink";
  const frame = onDark ? "border-gold/90" : "border-gold-ink";
  const frameDim = onDark ? "border-gold/40" : "border-gold-ink/45";
  const mute = onDark ? "text-cream/55" : "text-muted";
  const rule = onDark ? "bg-gold/80" : "bg-gold-ink/80";

  return (
    <span className={`inline-flex items-center gap-3.5 md:gap-4 ${className ?? ""}`}>
      <span
        className={`relative inline-flex size-10 shrink-0 items-center justify-center md:size-11 ${brass}`}
        aria-hidden="true"
      >
        {/* Outer hairline */}
        <span
          className={`pointer-events-none absolute inset-0 border ${frame}`}
          style={{ borderRadius: 1 }}
        />
        {/* Inner hairline */}
        <span
          className={`pointer-events-none absolute inset-[3px] border md:inset-[3.5px] ${frameDim}`}
          style={{ borderRadius: 0.5 }}
        />
        {/* Corner ticks — subtle crest detail */}
        <span className={`pointer-events-none absolute start-[2px] top-[2px] h-1.5 w-px ${onDark ? "bg-gold" : "bg-gold-ink"}`} />
        <span className={`pointer-events-none absolute start-[2px] top-[2px] h-px w-1.5 ${onDark ? "bg-gold" : "bg-gold-ink"}`} />
        <span className={`pointer-events-none absolute end-[2px] bottom-[2px] h-1.5 w-px ${onDark ? "bg-gold" : "bg-gold-ink"}`} />
        <span className={`pointer-events-none absolute end-[2px] bottom-[2px] h-px w-1.5 ${onDark ? "bg-gold" : "bg-gold-ink"}`} />
        <span className="relative font-display text-[1.15rem] font-semibold leading-none tracking-tight md:text-[1.35rem]">
          כ
        </span>
      </span>

      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-display text-[1.15rem] font-medium tracking-[-0.015em] md:text-[1.45rem] ${ink}`}
        >
          {site.brand}
        </span>
        <span
          className={`mt-1.5 hidden items-center gap-2.5 text-[0.58rem] font-medium uppercase tracking-[0.28em] sm:flex ${mute}`}
        >
          <span className={`h-px w-4 shrink-0 ${rule}`} aria-hidden />
          {site.tagline}
        </span>
      </span>
    </span>
  );
}

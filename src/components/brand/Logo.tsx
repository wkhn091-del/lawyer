import { site } from "@/content/site";

type LogoProps = {
  variant?: "default" | "onDark";
  className?: string;
};

/** Vector mark — reliable Hebrew «כ», no AI raster quirks. */
export function Logo({ variant = "default", className }: LogoProps) {
  const onDark = variant === "onDark";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <span
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-[3px] bg-navy font-display text-[1.35rem] font-bold leading-none text-gold"
        aria-hidden="true"
      >
        כ
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.25rem] font-bold tracking-tight ${onDark ? "text-cream" : "text-navy"}`}>
          {site.brand}
        </span>
        <span className={`mt-1 text-[0.7rem] ${onDark ? "text-cream/70" : "text-muted"}`}>{site.tagline}</span>
      </span>
    </span>
  );
}

import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "onDark";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-button font-medium transition duration-[var(--motion-fast)] ease-out active:scale-[0.98] motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-cream shadow-contact hover:bg-navy-deep hover:shadow-soft",
  ghost: "border border-border bg-transparent text-navy hover:border-navy",
  onDark:
    "bg-gold text-navy shadow-on-dark hover:-translate-y-px hover:bg-gold-hover hover:shadow-on-dark-hover active:translate-y-0 motion-reduce:hover:translate-y-0",
};

type CtaLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function CtaLink({ variant = "primary", className, children, ...props }: CtaLinkProps) {
  return (
    <Link {...props} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

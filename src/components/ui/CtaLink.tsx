import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "onDark";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-button font-medium transition duration-[var(--motion-fast)] ease-out active:scale-[0.97] motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-cream hover:bg-navy-deep",
  ghost: "border border-border bg-transparent text-navy hover:border-navy",
  onDark: "bg-gold text-navy hover:bg-gold-hover",
};

type CtaLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function CtaLink({ variant = "primary", className, children, ...props }: CtaLinkProps) {
  return (
    <Link {...props} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

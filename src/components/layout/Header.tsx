"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { CtaLink } from "@/components/ui/CtaLink";
import { site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";

  return (
    <header
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-40 bg-transparent"
          : "glass sticky top-0 z-40"
      }
    >
      <a href="#main" className="skip-link">
        לדלג לתוכן
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
        <Link href="/" aria-label={`${site.brand}, לעמוד הבית`}>
          <Logo variant={overHero ? "onDark" : "default"} />
        </Link>
        <nav aria-label="ניווט ראשי" className="hidden lg:block">
          <ul
            className={`flex items-center gap-6 text-small ${
              overHero ? "text-cream/80" : "text-muted"
            }`}
          >
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors duration-[var(--motion-instant)] ${
                    overHero ? "hover:text-cream" : "hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={`tel:${site.contact.phoneTel}`}
            className={`hidden text-small md:inline ${overHero ? "text-cream/85" : "text-navy"}`}
            dir="ltr"
          >
            <bdi>{site.contact.phone}</bdi>
          </a>
          <CtaLink
            href="/contact#lead"
            variant={overHero ? "onDark" : "primary"}
            className={`min-h-10 px-4 text-small ${overHero ? "!rounded-full" : ""}`}
          >
            לקביעת פגישת ייעוץ
          </CtaLink>
          <MobileNav onDark={overHero} />
        </div>
      </div>
    </header>
  );
}

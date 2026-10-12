"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border text-navy"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
        <span aria-hidden="true" className="text-body font-medium">
          {open ? "✕" : "☰"}
        </span>
      </button>
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 z-40 border-b border-border bg-white px-5 py-4 shadow-soft"
        >
          <ul className="flex flex-col gap-3 text-body text-navy">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

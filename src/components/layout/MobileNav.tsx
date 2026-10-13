"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-navy"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="text-body font-medium">
          {open ? "✕" : "☰"}
        </span>
      </button>
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="תפריט ניווט"
          className="fixed inset-x-0 top-16 z-40 max-h-[min(70vh,28rem)] overflow-y-auto border-b border-border bg-white px-5 py-4 shadow-soft"
        >
          <ul className="flex flex-col gap-1 text-body text-navy">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center py-2"
                  onClick={() => setOpen(false)}
                >
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

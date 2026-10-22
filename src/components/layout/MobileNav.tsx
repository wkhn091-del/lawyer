"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";

export function MobileNav({ onDark = false }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  /* Close on any route change (back/forward, programmatic nav) — not only link clicks. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = [
        buttonRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;
      const outside = !focusables.includes(active as HTMLElement);
      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /*
   * The drawer is portaled to <body>: the sticky glass header (backdrop-filter)
   * and any transformed ancestor would otherwise become the containing block for
   * `position: fixed`, collapsing the panel into the header on non-hero pages.
   */
  const drawer = (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-navy-deep/45 transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden="true"
        onClick={() => {
          setOpen(false);
          buttonRef.current?.focus();
        }}
      />

      {/* Left drawer — premium side panel, not a top dropdown */}
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="תפריט ניווט"
        inert={open ? undefined : true}
        className={[
          "fixed inset-y-0 left-0 z-[70] flex w-[min(20rem,86vw)] flex-col bg-cream shadow-[1px_0_0_rgb(34_33_32/0.06),8px_0_24px_-8px_rgb(0_0_0/0.28),24px_0_48px_-16px_rgb(0_0_0/0.2)] transition-transform duration-[var(--motion-base)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "pointer-events-none -translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <p className="font-display text-[0.95rem] text-navy">{site.brand}</p>
          <button
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border text-navy"
            aria-label="סגירת תפריט"
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-3" aria-label="ניווט נייד">
          <ul className="flex flex-col gap-0.5 text-body text-navy">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center border-b border-border/40 py-2 transition-colors hover:text-gold-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-3 border-t border-border/60 px-5 py-5">
          <a
            href={`tel:${site.contact.phoneTel}`}
            className="block text-center text-small text-navy"
            dir="ltr"
            onClick={() => setOpen(false)}
          >
            <bdi>{site.contact.phone}</bdi>
          </a>
          <Link
            href="/contact#lead"
            className="flex min-h-11 items-center justify-center rounded-full bg-gold px-4 text-small font-medium text-navy-deep transition hover:bg-gold-hover"
            onClick={() => setOpen(false)}
          >
            לקביעת השיחה
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border ${
          onDark
            ? "border-cream/30 text-cream"
            : "border-border text-navy"
        }`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="text-body font-medium">
          {open ? "✕" : "☰"}
        </span>
      </button>

      {mounted ? createPortal(drawer, document.body) : null}
    </div>
  );
}

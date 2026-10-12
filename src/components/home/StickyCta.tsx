"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Mobile bar after the hero CTA leaves view; hides while the lead form is visible. */
export function StickyCta() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const form = document.getElementById("lead");
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.id === "hero-cta") setHeroVisible(entry.isIntersecting);
        if (entry.target.id === "lead") setFormVisible(entry.isIntersecting);
      }
    });
    observer.observe(hero);
    if (form) observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const show = !heroVisible && !formVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 pb-safe px-4 pt-3 backdrop-blur-md transition duration-[var(--motion-base)] md:hidden ${
        show ? "translate-y-0 opacity-100 ease-out" : "pointer-events-none translate-y-full opacity-0 ease-in"
      }`}
      aria-hidden={!show}
    >
      <Link
        href="/contact#lead"
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 items-center justify-center rounded-md bg-navy text-button font-medium text-cream active:scale-[0.97]"
      >
        לתיאום שיחת ייעוץ
      </Link>
    </div>
  );
}

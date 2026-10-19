"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

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
  const whatsapp = site.contact.whatsapp;

  return (
    <div
      data-sticky-cta
      className={`glass fixed inset-x-0 bottom-0 z-30 pb-safe px-4 pt-3 transition duration-[var(--motion-base)] motion-reduce:transition-none md:hidden ${
        show
          ? "translate-y-0 opacity-100 ease-[var(--ease-out)]"
          : "pointer-events-none translate-y-full opacity-0 ease-[var(--ease-in)]"
      }`}
      aria-hidden={!show}
      inert={show ? undefined : true}
    >
      <div className="flex gap-2">
        <a
          href={`tel:${site.contact.phoneTel}`}
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-md border border-navy px-3 text-small font-medium text-navy"
          aria-label={`התקשרו אל ${site.contact.phone}`}
        >
          התקשרו
        </a>
        {whatsapp ? (
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            tabIndex={show ? 0 : -1}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-md border border-success px-3 text-small font-medium text-success"
            aria-label="וואטסאפ"
          >
            וואטסאפ
          </a>
        ) : null}
        <a
          href="#lead"
          tabIndex={show ? 0 : -1}
          className="flex min-h-12 flex-1 items-center justify-center rounded-md bg-navy text-button font-medium text-cream active:scale-[0.97] motion-reduce:active:scale-100"
        >
          לקביעת השיחה
        </a>
      </div>
      <p className="mt-2 pb-1 text-center text-small text-muted">
        מענה תוך יום עסקים אחד · בלי התחייבות לייצוג
      </p>
    </div>
  );
}

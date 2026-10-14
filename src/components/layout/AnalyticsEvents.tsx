"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

const LEAD_FIELDS = new Set(["fullName", "email", "phone", "practiceArea", "message"]);

function locationOf(element: Element): string {
  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest("[data-sticky-cta]")) return "sticky_cta";
  const section = element.closest("section[id], section[aria-labelledby], [id]");
  return section?.id || section?.getAttribute("aria-labelledby") || "page";
}

function isConsultCta(href: string): boolean {
  return href.includes("/contact") || href.includes("#lead");
}

/** Delegated page-wide KPIs — no tracking props on individual sections. */
export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const startedFields = new Set<string>();
    let formStarted = false;

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const tel = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (tel) {
        track("tel_click", { location: locationOf(tel) });
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (link?.getAttribute("href") && isConsultCta(link.getAttribute("href")!)) {
        const href = link.getAttribute("href")!;
        const cta = link.id || (href.includes("#lead") ? "consult_lead" : "consult_contact");
        track("cta_click", { cta, location: locationOf(link) });
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
        return;
      }
      if (!target.closest("#lead")) return;
      if (!formStarted) {
        formStarted = true;
        track("form_start", { form: "lead" });
      }
      const field = target.name;
      if (!LEAD_FIELDS.has(field) || startedFields.has(field)) return;
      startedFields.add(field);
      track("form_field_start", { form: "lead", field });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);

    const lead = document.getElementById("lead");
    const observer = lead
      ? new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              observer?.disconnect();
              track("form_reached", { form: "lead" });
            }
          },
          { threshold: 0.25 },
        )
      : null;
    if (lead) observer?.observe(lead);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}

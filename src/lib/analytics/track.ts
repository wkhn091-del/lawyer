import { readConsent } from "./consent";

/**
 * KPI events for GTM/GA4. Params are ids only — never names, emails, phones, or message text.
 */
export type AnalyticsEvents = {
  cta_click: { cta: string; location: string };
  tel_click: { location: string };
  form_start: { form: "lead" };
  form_field_start: { form: "lead"; field: string };
  form_reached: { form: "lead" };
  generate_lead: { practice_area: string };
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes only after consent. GTM replays the dataLayer on load, so never push before grant.
 */
export function track<E extends keyof AnalyticsEvents>(event: E, params: AnalyticsEvents[E]): void {
  if (typeof window === "undefined" || readConsent() !== "granted") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

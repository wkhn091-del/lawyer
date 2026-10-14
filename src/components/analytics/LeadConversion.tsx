"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

/**
 * Fires once per real submission: practice area id only, never PII.
 * No lead id (direct visit, honeypot bot redirect, legacy cookie) means no conversion.
 */
export function LeadConversion({ leadId, practiceArea }: { leadId: string | null; practiceArea: string }) {
  useEffect(() => {
    if (!leadId) return;
    const key = `lead_tracked:${leadId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: still fire once per mount */
    }
    track("generate_lead", { practice_area: practiceArea || "unknown" });
  }, [leadId, practiceArea]);

  return null;
}

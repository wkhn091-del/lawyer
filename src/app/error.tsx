"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/content/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[ui]", error.digest ?? error.name);
  }, [error]);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-small tracking-[0.06em] text-gold-ink">{site.brand}</p>
        <h1 className="mt-3 font-display text-hero text-navy">משהו השתבש</h1>
        <p className="mt-4 text-muted">נסו לרענן את העמוד. אם זה נמשך, התקשרו אלינו ונחזור אליכם.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-6 text-button font-medium text-cream transition hover:bg-navy-deep"
          >
            נסו שוב
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-navy px-6 text-button font-medium text-navy transition hover:bg-white"
          >
            לדף הבית
          </Link>
          <a
            href={`tel:${site.contact.phoneTel}`}
            className="inline-flex min-h-12 items-center justify-center px-2 text-button font-medium text-navy underline-offset-4 hover:underline"
            dir="ltr"
          >
            <bdi>{site.contact.phone}</bdi>
          </a>
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-display text-h2 text-navy">{title}</h1>
      <p className="mt-3 text-small text-muted">
        עודכן לאחרונה: <bdi dir="ltr">{updated}</bdi>
      </p>
      <div className="mt-10 flex flex-col gap-6 text-body text-ink [&_h2]:mt-4 [&_h2]:font-display [&_h2]:text-h3 [&_h2]:text-navy [&_ul]:list-disc [&_ul]:ps-5">
        {children}
      </div>
    </article>
  );
}

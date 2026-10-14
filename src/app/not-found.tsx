import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-small tracking-[0.06em] text-gold-ink">{site.brand}</p>
        <h1 className="mt-3 font-display text-hero text-navy">העמוד לא נמצא</h1>
        <p className="mt-4 text-muted">ייתכן שהכתובת השתנתה או שהקישור ישן. אפשר לחזור לבית או ליצור קשר.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-6 text-button font-medium text-cream transition hover:bg-navy-deep"
          >
            לדף הבית
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-navy px-6 text-button font-medium text-navy transition hover:bg-white"
          >
            צור קשר
          </Link>
        </div>
      </div>
    </div>
  );
}

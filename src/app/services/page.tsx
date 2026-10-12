import type { Metadata } from "next";
import Image from "next/image";
import { PracticeDoorLink } from "@/components/home/PracticeDoorLink";
import { practiceAreas } from "@/content/site";

export const metadata: Metadata = {
  title: "תחומי עיסוק",
  description: "דיני משפחה וגירושין, דיני עבודה ונדל״ן — משרד עורכי דין כהן ושות׳.",
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-cream">
      <div className="relative h-48 overflow-hidden md:h-64">
        <Image
          src="/media/corridor-dusk.jpg"
          alt="חלון משרד בשעת בין-ערביים — הדמיה אווירה"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" aria-hidden />
        <p className="absolute bottom-4 start-5 text-small text-cream/80 md:start-8">הדמיה</p>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h1 className="font-display text-hero text-navy">תחומי עיסוק</h1>
        <p className="mt-4 max-w-2xl text-muted">שלושה תחומים. בחרו את המצב שלכם — ותגיעו להסבר ולפנייה.</p>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {practiceAreas.map((area) => (
            <li key={area.id}>
              <PracticeDoorLink
                href={area.href}
                areaId={area.id}
                className="group flex h-full flex-col overflow-hidden border border-border bg-white transition hover:border-navy hover:shadow-soft"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute bottom-2 end-3 text-small text-cream/80">הדמיה</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-h3 text-navy">{area.title}</h2>
                  <p className="mt-3 flex-1 text-small text-muted">{area.summary}</p>
                  <span className="mt-6 text-small font-medium text-navy underline-offset-4 group-hover:underline">
                    לפירוט
                  </span>
                </div>
              </PracticeDoorLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/ui/CtaLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "אודות",
  description: "על משרד עורכי דין כהן ושות׳: 12 שנה במרכז, בדיני משפחה, עבודה ונדל״ן.",
};

export default function AboutPage() {
  return (
    <article>
      <div className="relative h-64 overflow-hidden md:h-[22rem]">
        <Image
          src="/media/corridor-dusk.jpg"
          alt="חלון משרד בשעת בין-ערביים מעל העיר (הדמיה אווירה)"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="scrim absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-5 pb-8 md:px-8">
          <h1 className="font-display text-hero text-cream">על המשרד</h1>
          <p className="mt-2 text-small text-cream/85">הדמיה</p>
        </div>
      </div>
      <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-lead text-muted">
          {site.company} פועל 12 שנים במרכז: דיני משפחה וגירושין, דיני עבודה ונדל״ן.
        </p>
        <p className="mt-4 text-body text-ink">
          לקוח בלחץ צריך קודם הסבר פשוט — ואחר כך ייצוג. השותף המנהל, עו״ד אבי כהן, מוביל צוות של ארבעה
          עורכי דין, שתי מתמחות ומזכירה. אחרי הפגישה הראשונה תדעו איפה אתם עומדים ומי מטפל בתיק.
        </p>
        <p className="mt-4 text-small text-muted">
          לפי צורך המשרד נותן גם ייעוץ שוטף לעסקים קטנים — בלי הבטחות לתוצאה.
        </p>
        <div className="relative mt-12 aspect-[21/9] overflow-hidden">
          <Image
            src="/media/about-texture.jpg"
            alt="פרט ארכיטקטוני שקט (הדמיה טקסטורה)"
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
          <p className="absolute bottom-3 start-3 text-small text-cream/80">הדמיה</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <CtaLink href="/team">להכיר את הצוות</CtaLink>
          <CtaLink href="/contact#lead" variant="ghost">
            לקביעת השיחה
          </CtaLink>
        </div>
      </div>
      </div>
    </article>
  );
}

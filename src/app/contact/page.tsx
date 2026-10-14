import type { Metadata } from "next";
import Image from "next/image";
import { ContactProcess } from "@/components/contact/ContactProcess";
import { LeadForm } from "@/components/contact/LeadForm";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env/public";
import { leadsLocked } from "@/lib/env/server";
import type { PracticeAreaId } from "@/lib/leads/options";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "קביעת פגישת ייעוץ עם משרד עורכי דין כהן ושות׳ — תוכנית והערכת עלות, בלי התחייבות לייצוג בשלב הראשון.",
};

type Props = { searchParams: Promise<{ area?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const area = ["family", "labor", "real-estate", "other"].includes(params.area ?? "")
    ? (params.area as PracticeAreaId)
    : undefined;

  return (
    <div className="bg-cream">
      <div className="relative h-44 overflow-hidden md:h-56">
        <Image
          src="/media/corridor-dusk.jpg"
          alt="חלון משרד בשעת בין-ערביים (הדמיה אווירה)"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" aria-hidden />
        <p className="photo-caption absolute bottom-4 start-5 text-small md:start-8">הדמיה</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:py-20">
        <div>
          <h1 className="font-display text-hero text-navy">קביעת פגישת ייעוץ</h1>
          <p className="mt-4 text-muted">
            השאירו פרטים ונחזור תוך יום עסקים אחד. אל תפרטו כאן מידע רגיש — את השאר נשמע בשיחה.
          </p>
          <ul className="mt-8 space-y-3 text-small text-muted">
            <li>
              טלפון:{" "}
              <a href={`tel:${site.contact.phoneTel}`} className="text-navy" dir="ltr">
                <bdi>{site.contact.phone}</bdi>
              </a>
            </li>
            <li>
              מייל:{" "}
              <a href={`mailto:${site.contact.email}`} className="text-navy" dir="ltr">
                <bdi>{site.contact.email}</bdi>
              </a>
            </li>
            <li>שעות: {site.contact.hours}</li>
            <li>
              מיקום:{" "}
              {site.legal.address ?? "המשרד פועל במרכז הארץ. הכתובת המדויקת תפורסם כאן לאחר עדכון."}
            </li>
            {site.legal.companyId ? (
              <li>
                ח.פ/ע.מ: <bdi dir="ltr">{site.legal.companyId}</bdi>
              </li>
            ) : null}
          </ul>
          <ContactProcess />
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden md:block">
            <Image
              src="/media/meeting-room.jpg"
              alt="חדר ישיבות שקט (הדמיה לאווירה)"
              fill
              sizes="40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy/20" aria-hidden />
            <p className="photo-caption absolute bottom-3 start-3 text-small">הדמיה</p>
          </div>
        </div>
        <div className="border border-border bg-white p-5 md:p-8">
          <LeadForm
            locked={leadsLocked}
            defaultPractice={area}
            turnstileSiteKey={publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        </div>
      </div>
    </div>
  );
}

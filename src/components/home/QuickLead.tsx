import Image from "next/image";
import { LeadForm } from "@/components/contact/LeadForm";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env/public";
import { leadsLocked } from "@/lib/env/server";
import { Reveal } from "@/motion";

export function QuickLead() {
  const { quickLead, hero } = home;

  return (
    <section
      className="scroll-mt-20 overflow-x-clip bg-cream py-9 md:py-20"
      aria-labelledby="quick-lead-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-2 md:items-stretch md:gap-8 md:px-8">
        {/* Form first on phone; photo stays start-side on desktop (RTL). */}
        <div
          className={`order-1 md:order-2 ${leadsLocked ? "flex w-full md:min-h-[32rem]" : ""}`}
        >
          <LeadForm
            locked={leadsLocked}
            variant="quick"
            page="/"
            turnstileSiteKey={publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        </div>

        <Reveal className="relative order-2 min-h-[11.5rem] overflow-hidden md:order-1 md:min-h-[32rem]">
          <Image
            src="/media/meeting-room.jpg"
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover object-[50%_40%]"
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgb(34 33 32 / 0.25) 0%, rgb(34 33 32 / 0.78) 55%, rgb(34 33 32 / 0.92) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
            <GoldLineDraw />
            <h2
              id="quick-lead-heading"
              className="mt-3 font-display text-[1.4rem] leading-snug text-cream md:mt-4 md:text-[1.85rem]"
            >
              {quickLead.title}
            </h2>
            <p className="mt-2 max-w-[28ch] text-[0.85rem] leading-snug text-cream/75 md:text-small">
              {quickLead.lead}
            </p>
            <p className="mt-3 text-[0.75rem] text-cream/75 md:mt-5 md:text-[0.78rem]">{hero.trust}</p>
            <a
              href={`tel:${site.contact.phoneTel}`}
              className="mt-3 inline-flex items-baseline gap-2 text-gold transition hover:text-gold-hover md:mt-4"
            >
              <span className="text-[0.72rem] tracking-[0.1em] text-cream/50">
                שיחה עכשיו
              </span>
              <span className="font-display text-[1.1rem] md:text-[1.2rem]" dir="ltr">
                <bdi>{site.contact.phone}</bdi>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

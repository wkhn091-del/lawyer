import { LeadForm } from "@/components/contact/LeadForm";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env/public";
import { leadsLocked } from "@/lib/env/server";
import { Reveal } from "@/motion";

export function QuickLead() {
  const { quickLead, hero } = home;

  return (
    <section className="scroll-mt-20 bg-cream py-16 md:py-24" aria-labelledby="quick-lead-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:px-8">
        <Reveal>
          <h2 id="quick-lead-heading" className="font-display text-h2 text-navy">
            {quickLead.title}
          </h2>
          <p className="mt-3 text-muted">{quickLead.lead}</p>
          <p className="mt-6 text-small text-muted">{hero.reassurance}</p>
          <p className="mt-6 text-small text-muted">
            מעדיפים לדבר עכשיו?{" "}
            <a href={`tel:${site.contact.phoneTel}`} className="font-medium text-navy underline-offset-4 hover:underline">
              <bdi dir="ltr">{site.contact.phone}</bdi>
            </a>
          </p>
        </Reveal>

        <LeadForm
          locked={leadsLocked}
          variant="quick"
          page="/"
          turnstileSiteKey={publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />
      </div>
    </section>
  );
}

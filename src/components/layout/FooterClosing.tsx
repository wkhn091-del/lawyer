"use client";

import Image from "next/image";
import { GoldLineDraw } from "@/components/motion/GoldLineDraw";
import { CtaLink } from "@/components/ui/CtaLink";
import { Parallax, SplitReveal } from "@/motion";
import { site } from "@/content/site";

/** Single closing CTA for the whole site — replaces stacked FinalCta + footer mini-hero. */
export function FooterClosing() {
  const { miniHero } = site.footer;

  return (
    <div className="relative isolate overflow-hidden border-b border-cream/10">
      <div className="absolute inset-0 overflow-hidden">
        <Parallax image speed={0.12} className="absolute inset-[-8%] h-[116%] w-full">
          <Image
            src="/media/corridor-dusk.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
        </Parallax>
        <div className="absolute inset-0 bg-navy-deep/88" aria-hidden />
        <div
          className="absolute inset-0 opacity-50"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 85% 20%, rgb(201 169 97 / 0.22), transparent 55%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:gap-10 md:px-8 md:py-20">
        <div className="max-w-xl">
          <p className="text-small tracking-[0.08em] text-gold">{site.brand}</p>
          <GoldLineDraw className="mt-4" />
          <SplitReveal
            as="p"
            by="lines"
            className="mt-5 font-display text-[clamp(1.6rem,1.25rem+1.6vw,2.15rem)] leading-snug text-cream"
          >
            {miniHero.title}
          </SplitReveal>
          <p className="mt-3 text-[0.9375rem] text-cream/70">{miniHero.lead}</p>
          <p className="mt-4 text-small text-cream/55">
            טלפון <bdi dir="ltr">{site.contact.phone}</bdi>
            {" · "}
            מייל <bdi dir="ltr">{site.contact.email}</bdi>
          </p>
        </div>

        <CtaLink
          href={miniHero.href}
          variant="onDark"
          className="w-full md:w-auto"
        >
          {miniHero.cta}
        </CtaLink>
      </div>
    </div>
  );
}

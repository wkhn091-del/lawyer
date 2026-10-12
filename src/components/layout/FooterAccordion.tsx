"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export type FooterNavLink = {
  href: string;
  label: string;
  hrefLang?: string;
  legal?: boolean;
};

type Group = {
  id: string;
  title: string;
  links: readonly FooterNavLink[];
};

type Props = {
  groups: readonly Group[];
};

function FooterLink({ link }: { link: FooterNavLink }) {
  return (
    <Link
      href={link.href}
      hrefLang={link.hrefLang}
      className="footer-link inline-flex min-h-12 items-center text-[0.9375rem] text-cream/65"
      {...(link.legal ? { rel: "noopener noreferrer" } : {})}
    >
      {link.label}
    </Link>
  );
}

function AccordionGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-cream/10">
      <button
        type="button"
        id={buttonId}
        className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-start text-[0.8125rem] font-medium tracking-[0.06em] text-gold"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{group.title}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-cream/50 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={open ? undefined : true}
        className={`grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <ul className="overflow-hidden" aria-hidden={!open}>
          {group.links.map((link) => (
            <li key={link.href}>
              <FooterLink link={link} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mobile: accordion. Desktop: static columns. */
export function FooterNavGroups({ groups }: Props) {
  return (
    <>
      <div className="md:hidden">
        {groups.map((group) => (
          <AccordionGroup key={group.id} group={group} />
        ))}
      </div>

      <div className="hidden gap-10 md:col-span-3 md:grid md:grid-cols-3">
        {groups.map((group) => (
          <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
            <h2
              id={`footer-${group.id}`}
              className="text-[0.8125rem] font-medium tracking-[0.06em] text-gold"
            >
              {group.title}
            </h2>
            <ul className="mt-4 space-y-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </>
  );
}

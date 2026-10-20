import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import { FooterNavGroups } from "@/components/layout/FooterAccordion";
import { practiceAreas, site } from "@/content/site";

const navGroups = [
  {
    id: "practices",
    title: "תחומים",
    links: practiceAreas.map((area) => ({ href: area.href, label: area.title })),
  },
  {
    id: "office",
    title: "המשרד",
    links: site.footer.office.map((item) => ({
      href: item.href,
      label: item.label,
      hrefLang: "hrefLang" in item ? item.hrefLang : undefined,
    })),
  },
  {
    id: "legal",
    title: "משפטי",
    links: site.footer.legal.map((item) => ({
      href: item.href,
      label: item.label,
      legal: true,
    })),
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10 md:px-8 md:py-14">
        <div className="space-y-5">
          <Logo variant="onDark" />
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-cream/75">{site.company}</p>
          <ul className="space-y-3 text-[0.9375rem] text-cream/70">
            <li>
              <a
                href={`tel:${site.contact.phoneTel}`}
                className="footer-link inline-flex min-h-12 items-center gap-2.5"
              >
                <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                <bdi dir="ltr">{site.contact.phone}</bdi>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="footer-link inline-flex min-h-12 items-center gap-2.5"
              >
                <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                <bdi dir="ltr">{site.contact.email}</bdi>
              </a>
            </li>
            <li className="flex min-h-12 items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-gold" aria-hidden />
              <span>{site.contact.hours}</span>
            </li>
            {site.legal.address ? (
              <li className="flex min-h-12 items-start gap-2.5">
                <MapPin className="mt-3.5 size-4 shrink-0 text-gold" aria-hidden />
                <span className="py-3">{site.legal.address}</span>
              </li>
            ) : null}
          </ul>
        </div>

        <FooterNavGroups groups={navGroups} />
      </div>

      <div className="border-t border-cream/10 px-5 py-5 text-[0.8125rem] leading-relaxed text-cream/75 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>
            {site.footer.disclaimer}
            {site.legal.companyId ? (
              <>
                {" "}
                ח.פ/ע.מ <bdi dir="ltr">{site.legal.companyId}</bdi>
              </>
            ) : (
              <> · פרטי רישום העוסק יושלמו לפני עלייה לאוויר</>
            )}
            {site.legal.address ? (
              <>
                {" "}
                · {site.legal.address}
              </>
            ) : null}
          </p>
          <p>
            © {year} {site.company} · <CookieSettingsButton />
          </p>
        </div>
      </div>
    </footer>
  );
}

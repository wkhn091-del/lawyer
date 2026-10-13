import Link from "next/link";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

/** Compact team strip — no fake photo placeholders (reduces “הדמיה” suspicion noise). */
export function TeamTeaser() {
  const { team } = home;

  return (
    <section className="border-y border-border bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-h2 text-navy">{team.title}</h2>
              <p className="mt-2 text-small text-muted">
                שותפים שמלווים את התיקים — צילומי פנים יתווספו כשיגיעו מהמשרד.
              </p>
            </div>
            <Link
              href="/team"
              className="text-small font-medium text-navy underline-offset-4 hover:underline"
            >
              לכל הצוות
            </Link>
          </div>
        </Reveal>

        <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {team.members.map((member) => (
            <article key={member.name} className="border-s-2 border-gold ps-4 py-1">
              <h3 className="font-display text-h3 text-navy">{member.name}</h3>
              <p className="mt-1 text-small text-gold">{member.role}</p>
              <p className="mt-2 text-small text-muted">{member.bio}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

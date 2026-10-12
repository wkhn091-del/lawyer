import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function TeamTeaser() {
  const { team } = home;

  return (
    <section className="relative overflow-hidden bg-navy py-16 text-cream md:py-24">
      <Image
        src="/media/about-texture.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
        aria-hidden
      />
      <div className="absolute inset-0 bg-navy/75" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-h2">{team.title}</h2>
              <p className="mt-3 text-[0.9375rem] text-cream/70">{team.lead}</p>
            </div>
            <Link
              href="/team"
              className="text-small font-medium text-gold underline-offset-4 transition hover:underline"
            >
              לכל הצוות
            </Link>
          </div>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {team.members.map((member) => (
            <article
              key={member.name}
              className="border border-cream/15 bg-navy-deep/50 p-6 backdrop-blur-[2px]"
            >
              <div className="flex aspect-[16/9] items-end bg-gradient-to-br from-navy-deep to-[#2a3a5c] p-4">
                <span className="text-small text-cream/50">הדמיה — ממתין לצילום אמיתי</span>
              </div>
              <h3 className="mt-5 font-display text-h3">{member.name}</h3>
              <p className="mt-1 text-small text-gold">{member.role}</p>
              <p className="mt-3 text-small text-cream/65">{member.bio}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

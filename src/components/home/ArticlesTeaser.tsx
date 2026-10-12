import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/motion";
import { home } from "@/content/home";

export function ArticlesTeaser() {
  const { articles } = home;

  return (
    <section className="relative overflow-hidden bg-navy py-16 text-cream md:py-24">
      <Image
        src="/media/meeting-room.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
        aria-hidden
      />
      <div className="absolute inset-0 bg-navy/80" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 border-b border-cream/15 pb-8 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-h2">{articles.title}</h2>
              <p className="mt-3 max-w-xl text-cream/70">{articles.lead}</p>
            </div>
            <Link
              href="/blog"
              className="text-small font-medium text-gold underline-offset-4 hover:underline"
            >
              לכל המאמרים
            </Link>
          </div>
        </Reveal>

        <Reveal stagger as="ul" className="mt-2">
          {articles.items.map((item, index) => (
            <li key={item.title} className="border-b border-cream/15">
              <Link
                href={item.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-cream transition hover:text-cream md:gap-8"
              >
                <span className="font-display text-small text-gold">0{index + 1}</span>
                <span>
                  <span className="mb-1 block text-[0.75rem] tracking-[0.06em] text-cream/50">
                    {item.tag}
                  </span>
                  <span className="font-display text-h3 leading-snug">{item.title}</span>
                </span>
                <span
                  aria-hidden
                  className="text-gold transition-transform duration-[var(--motion-fast)] group-hover:-translate-x-1 motion-reduce:transform-none"
                >
                  ←
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  Counter,
  HorizontalScroll,
  Magnetic,
  Marquee,
  Parallax,
  Reveal,
  SplitReveal,
} from "../motion";
import s from "./page.module.css";

const services = ["Strategy", "Brand", "Product design", "Engineering", "Motion", "Launch"];

const cards = [
  { title: "Discovery", text: "Workshops, research, a clear brief." },
  { title: "Design", text: "Systems, screens and motion in one file." },
  { title: "Build", text: "Next.js, fast, accessible, easy to edit." },
  { title: "Launch", text: "Analytics, SEO and a calm go-live." },
  { title: "Grow", text: "Monthly tests and improvements." },
];

export default function Home() {
  return (
    <main>
      {/* HERO — `immediate` plays on page load instead of waiting for scroll */}
      <section className={`${s.wrap} ${s.hero}`}>
        <Reveal as="p" className={s.eyebrow} y={20} immediate>
          Motion kit — demo page
        </Reveal>
        <SplitReveal as="h1" className={s.display} by="lines" immediate delay={0.1}>
          Websites that <em>move</em> like they mean it
        </SplitReveal>
        <div className={s.heroFoot}>
          <Reveal as="p" className={s.lead} delay={0.5} immediate>
            Smooth scroll, scroll-triggered reveals, parallax and page transitions — one provider,
            a handful of components, any Next.js site.
          </Reveal>
          <Reveal delay={0.65} immediate>
            <Magnetic>
              <a href="#process" className={s.button}>
                See it scroll ↓
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE — pure CSS, works in Server Components */}
      <div className={s.marqueeBand}>
        <Marquee duration={28} pauseOnHover>
          {services.map((item) => (
            <span key={item}>
              {item} <span className={s.dot}>✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* STATEMENT — words rise one by one */}
      <section className={`${s.wrap} ${s.section}`}>
        <SplitReveal as="p" className={s.statement} by="words">
          Most sites look the same. The difference is in how they feel when you scroll.
        </SplitReveal>
      </section>

      {/* STATS — numbers count up, columns appear one after another */}
      <section className={`${s.wrap}`}>
        <Reveal className={s.stats} stagger>
          <div className={s.stat}>
            <Counter to={120} suffix="+" className={s.statNum} />
            <span className={s.statLabel}>Projects shipped</span>
          </div>
          <div className={s.stat}>
            <Counter to={98} suffix="%" className={s.statNum} />
            <span className={s.statLabel}>Lighthouse performance</span>
          </div>
          <div className={s.stat}>
            <Counter to={4.9} decimals={1} className={s.statNum} />
            <span className={s.statLabel}>Average client rating</span>
          </div>
        </Reveal>
      </section>

      {/* PARALLAX IMAGE — swap .mediaFill for next/image */}
      <section className={`${s.wrap} ${s.section}`}>
        <Reveal className={s.media} scale={0.94}>
          <Parallax image speed={0.25} className={s.mediaFill}>
            <span />
          </Parallax>
          <span className={s.mediaCaption}>Parallax image inside a revealed frame</span>
        </Reveal>
      </section>

      {/* HORIZONTAL SCROLL — the section pins and the cards slide sideways */}
      <div id="process">
        <HorizontalScroll className={s.wrap} trackClassName={s.cards} disableBelow={700}>
          {cards.map((card, i) => (
            <article key={card.title} className={s.card}>
              <span className={s.cardIndex}>0{i + 1}</span>
              <div>
                <h3 className={s.cardTitle}>{card.title}</h3>
                <p className={s.lead}>{card.text}</p>
              </div>
            </article>
          ))}
        </HorizontalScroll>
      </div>

      {/* RTL — the same components in Hebrew: marquee and horizontal scroll flip automatically */}
      <section dir="rtl" lang="he" className={`${s.wrap} ${s.section}`}>
        <Reveal as="p" className={s.eyebrow}>
          תמיכה מלאה בעברית
        </Reveal>
        <SplitReveal as="h2" className={s.statement} by="lines">
          אותן אנימציות, מימין לשמאל, בלי לשנות שורת קוד
        </SplitReveal>
        <div className={s.marqueeBand} style={{ marginTop: 64 }}>
          <Marquee duration={24}>
            {["אסטרטגיה", "עיצוב", "פיתוח", "השקה"].map((item) => (
              <span key={item}>
                {item} <span className={s.dot}>✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* LIST — rows appear one after another */}
      <section className={`${s.wrap} ${s.section}`}>
        <Reveal as="ul" className={s.list} stagger>
          <li>
            <span>Smooth scroll</span>
            <span>MotionProvider</span>
          </li>
          <li>
            <span>Scroll reveals</span>
            <span>Reveal</span>
          </li>
          <li>
            <span>Headline reveals</span>
            <span>SplitReveal</span>
          </li>
          <li>
            <span>Parallax</span>
            <span>Parallax</span>
          </li>
          <li>
            <span>Page transitions</span>
            <span>PageTransition</span>
          </li>
        </Reveal>
      </section>

      {/* CTA — navigate to see the page transition */}
      <section className={`${s.wrap} ${s.cta}`}>
        <SplitReveal as="h2" className={s.display} by="chars">
          Next page
        </SplitReveal>
        <Magnetic strength={0.5}>
          <Link href="/about" className={s.button}>
            Try the page transition →
          </Link>
        </Magnetic>
      </section>
    </main>
  );
}

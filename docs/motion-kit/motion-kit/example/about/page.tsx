import Link from "next/link";
import { Reveal, SplitReveal } from "../../motion";
import s from "../page.module.css";

export default function About() {
  return (
    <main className={`${s.wrap} ${s.cta}`}>
      <Reveal as="p" className={s.eyebrow} immediate>
        Second page
      </Reveal>
      <SplitReveal as="h1" className={s.display} immediate>
        You just saw a page transition
      </SplitReveal>
      <Reveal delay={0.3} immediate>
        <Link href="/" className={s.button}>
          ← Back home
        </Link>
      </Reveal>
    </main>
  );
}

# Motion Kit ל-Next.js

ערכה אחת שנותנת לכל אתר Next.js את התחושה של אתרי הפרימיום: גלילה חלקה, אלמנטים שנחשפים בגלילה, כותרות שעולות שורה אחרי שורה, פרלקסה, מספרים שסופרים, כפתורים "מגנטיים", רצועה רצה, סקשן שזז הצידה ומעברי עמודים.

- **עובד בכל אתר:** משנים prop אחד (`preset`) ומקבלים תחושה אחרת לגמרי.
- **עברית מובנית:** רצועה רצה וגלילה אופקית מתהפכות לבד בעמודי RTL.
- **נגישות:** מי שביקש במערכת ההפעלה פחות תנועה (`prefers-reduced-motion`) מקבל אתר סטטי ונקי, בלי שום אנימציה.
- **בטוח ל-SEO:** כל הטקסט נמצא ב-HTML. אם ה-JavaScript לא נטען, התוכן נחשף לבד אחרי 3 שניות.

**דרישות:** Next.js עם App Router ו-TypeScript (ברירת המחדל של `create-next-app`).
**תלויות:** `gsap`, `@gsap/react`, `lenis`. GSAP, כולל SplitText, חינמי גם לשימוש מסחרי.

---

## התקנה

### דרך הסקריפט (מומלץ)

```bash
node setup.mjs /path/to/your-next-project
```

הסקריפט:
1. מעתיק את התיקייה `motion/` לפרויקט (ל-`src/motion` אם יש `src`, אחרת ל-`motion`).
2. מתקין את התלויות עם מנהל החבילות של הפרויקט (npm, pnpm, yarn או bun).
3. יוצר `app/template.tsx` למעברי עמודים, אם עוד אין לך כזה.

דגלים: `--force` דורס תיקיית `motion` קיימת, `--no-install` מדלג על ההתקנה, `--no-template` לא יוצר template.

### ידנית

```bash
npm install gsap @gsap/react lenis
```

ואז מעתיקים את `motion/` לתוך `src/`.

### הצעד היחיד שעושים לבד: `app/layout.tsx`

```tsx
import { MotionProvider } from "../motion";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <MotionProvider preset="studio">{children}</MotionProvider>
      </body>
    </html>
  );
}
```

---

## Presets: התחושה של האתר

| preset | תחושה | מתאים ל |
|---|---|---|
| `luxury` | איטי, כבד, אלגנטי | נדל"ן, מלונות, אופנה, תכשיטים, מותגי יוקרה |
| `studio` (ברירת מחדל) | בטוח, עריכתי | סוכנויות, סטודיו, פורטפוליו, סטארטאפים של AI וטכנולוגיה |
| `snappy` | מהיר, חד | SaaS, מוצרים דיגיטליים, אתרי השקה |
| `minimal` | כמעט בלתי מורגש, בלי גלילה חלקה | אתרים תאגידיים, רשויות, אתרי תוכן |

כיוון עדין לפרויקט מסוים:

```tsx
<MotionProvider preset="luxury" overrides={{ duration: 1.2, distance: 40 }}>
```

---

## הקומפוננטות

כולן עובדות מתוך Server Components. אין צורך להוסיף `"use client"` לעמודים שלך.

### `<Reveal>`: אלמנט שנחשף בגלילה

```tsx
<Reveal>
  <p>עולה ונחשף כשמגיעים אליו</p>
</Reveal>

<Reveal as="ul" stagger>          {/* כל ילד נחשף אחרי הקודם */}
  <li>אחד</li><li>שניים</li><li>שלוש</li>
</Reveal>

<Reveal immediate delay={0.4}>    {/* במסך הראשון: מתנגן בטעינה, בלי לחכות לגלילה */}
  <a className="button">צור קשר</a>
</Reveal>
```

| prop | מה עושה |
|---|---|
| `as` | איזו תגית לרנדר (ברירת מחדל `div`) |
| `y` / `x` | מאיפה מתחילים, בפיקסלים |
| `scale` | זום עדין, למשל `0.95` |
| `blur` | טשטוש התחלתי בפיקסלים, למשל `8` |
| `stagger` | `true` או מספר שניות בין ילדים |
| `delay`, `duration`, `ease` | תזמון |
| `once` | `false` כדי שיתנגן שוב כל פעם שחוזרים |
| `immediate` | מתנגן בטעינת העמוד. להשתמש בזה בכל מה שבמסך הראשון |
| `start` | מתי מתחיל, למשל `"top 80%"` |

### `<SplitReveal>`: כותרת שעולה מאחורי מסכה

```tsx
<SplitReveal as="h1" immediate>כותרת ראשית לאתר</SplitReveal>
<SplitReveal by="words">כל מילה עולה בנפרד</SplitReveal>
<SplitReveal by="chars">Letters</SplitReveal>
<SplitReveal scrub>הכותרת זזה יחד עם פס הגלילה</SplitReveal>
```

- `by`: `"lines"` (ברירת מחדל), `"words"` או `"chars"`.
- **בעברית עדיף `lines` או `words`.** פיצול לאותיות מתאים לכותרות קצרות באנגלית.
- השורות מחושבות מחדש לבד כשהפונט נטען או כשגודל המסך משתנה.

### `<Parallax>`

```tsx
<div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
  <Parallax image speed={0.25} style={{ position: "absolute", inset: 0 }}>
    <Image src="/hero.jpg" alt="" fill style={{ objectFit: "cover" }} />
  </Parallax>
</div>

<Parallax speed={-0.15}>אלמנט שזז מהר יותר מהעמוד</Parallax>
```

`image` מגדיל קצת את התמונה, כדי שבזמן התזוזה לא יופיע קצה ריק.

### `<Counter>`: מספר שסופר

```tsx
<Counter to={15} suffix="+" />
<Counter to={98.6} decimals={1} suffix="%" />
<Counter to={2500000} prefix="₪" locale="he-IL" />
```

מנועי חיפוש ומי שאין לו JavaScript רואים את המספר הסופי.

### `<Magnetic>`: כפתור שנמשך לעכבר

```tsx
<Magnetic strength={0.4}>
  <Link href="/contact" className="button">בואו נדבר</Link>
</Magnetic>
```

כבוי אוטומטית במסכי מגע.

### `<Marquee>`: רצועה רצה

```tsx
<Marquee duration={25} pauseOnHover>
  <img src="/logo1.svg" alt="Client 1" />
  <img src="/logo2.svg" alt="Client 2" />
</Marquee>
```

CSS בלבד, בלי JavaScript. `reverse` הופך כיוון, ו-`repeat={2}` משכפל תוכן קצר למסכים רחבים.

### `<HorizontalScroll>`: סקשן שזז הצידה

```tsx
<HorizontalScroll gap="2rem" disableBelow={768}>
  <article className="card">…</article>
  <article className="card">…</article>
</HorizontalScroll>
```

הסקשן נדבק למסך והתוכן גולל הצידה. מתחת ל-`disableBelow` הוא הופך לשורה רגילה שמחליקים באצבע.

### `<PageTransition>`: מעבר בין עמודים

הסקריפט יוצר את זה לבד ב-`app/template.tsx`:

```tsx
import { PageTransition } from "../motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```

### `useMotion()`: גלילה מהקוד

```tsx
"use client";
import { useMotion } from "@/motion";

const { scrollTo } = useMotion();
<button onClick={() => scrollTo("#pricing", { offset: -80 })}>למחירים</button>
```

לינקים רגילים כמו `href="#pricing"` כבר נגללים חלק בלי קוד.

### אנימציות משלך

הערכה מייצאת את `gsap`, `ScrollTrigger`, `SplitText` ו-`useGSAP` כשהם כבר רשומים ומסונכרנים עם הגלילה החלקה:

```tsx
"use client";
import { gsap, useGSAP } from "@/motion";
```

---

## לאיזה אתרים זה מתאים

**מתאים מאוד:**
- דפי נחיתה ואתרי תדמית לסטארטאפים, בייחוד AI וטכנולוגיה (כמו VoiceMan)
- סוכנויות, סטודיו לעיצוב ופורטפוליו
- השקות מוצר, אפליקציות ו-SaaS
- פרויקטים של נדל"ן, אדריכלות ועיצוב פנים
- מלונות, מסעדות שף, אירועים ומותגי לייפסטייל
- אתרי אירועים וכנסים

**מתאים בזהירות** (עם `preset="minimal"` ומעט אנימציות):
- אתרים תאגידיים, משרדי עורכי דין ורואי חשבון
- רשויות ומוסדות ציבוריים
- בלוגים ואתרי תוכן

**לא מתאים:**
- חנויות אונליין עם הרבה מוצרים ופילטרים
- דשבורדים, מערכות ניהול ואפליקציות SaaS מבפנים
- אתרי חדשות ואתרים עם המון טקסט

באתרים כאלה מהירות ושימושיות חשובות יותר מאפקטים. אם בכל זאת רוצים, אפשר להשתמש רק ב-`Reveal` עדין, בלי גלילה חלקה.

---

## טיפים ומלכודות

- **אל תשים `overflow-x: hidden` על `html` או `body`.** זה שובר את הגלילה החלקה ואת הסקשנים הנדבקים. השתמש ב-`overflow-x: clip` במקום.
- **מודאלים, תפריטים וחלונות עם גלילה פנימית:** הוסף להם `data-lenis-prevent`, אחרת הגלילה החלקה "תבלע" את הגלילה שלהם.
- **כל מה שבמסך הראשון צריך `immediate`.** בלי זה, אלמנט שנמצא בתחתית המסך יחכה לגלילה.
- **פחות זה יותר:** כותרת אחת עם `SplitReveal` בכל סקשן ו-`Reveal` לשאר התוכן. אם הכול זז, שום דבר לא בולט.
- **ביצועים:** תמונות דרך `next/image`, ווידאו דחוס עם `preload="none"` מתחת למסך הראשון.

---

## מבנה הקבצים

```
motion/
  index.ts             ← מכאן מייבאים הכול
  MotionProvider.tsx   ← גלילה חלקה, הגדרות, useMotion
  config.ts            ← ה-presets: לכאן מוסיפים preset משלך
  gsap.ts              ← רישום הפלאגינים וכלי עזר
  Reveal.tsx  SplitReveal.tsx  Parallax.tsx  Counter.tsx
  Magnetic.tsx  Marquee.tsx  HorizontalScroll.tsx  PageTransition.tsx
  motion.css
example/               ← עמוד הדמו המלא (page.tsx, layout.tsx, template.tsx…)
setup.mjs              ← סקריפט ההתקנה
```

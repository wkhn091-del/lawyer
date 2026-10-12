# מפת תנועה — כהן ושות׳ (מודול א׳-3)

מקורות: כיוון 1 · N27 מהספר · `docs/motion-kit`  
סטטוס: **הוטמע** — `src/motion` + preset `law` · Counter / Reveal / Parallax / A19 ProcessLine

## תחקיר (ננעל — שאלון + המלצה + ספר)
| קבוצה | החלטה |
|---|---|
| 1 אופי | שקט ויוקרתי — מדויק ומעט (N27: תנועה ראוותנית מורידה אמון) |
| 2 רגע חתימה | שלוש «דלתות» תחום + sticky CTA לשיחת ייעוץ; משוב הצלחה בטופס |
| 3 נכסים | לוגו SVG קיים; אין וידאו; אין Lottie חיצוני |

## ספרייה ו-Preset
- ערכה: `docs/motion-kit/motion-kit` → תועתק ל-`src/motion` בזמן הביצוע
- תלויות: `gsap`, `@gsap/react`, `lenis`
- **Preset:** `minimal` כבסיס (ה-README ממליץ כך למשרדי עו״ד) + overrides לפרויקט:

```ts
// preset מותאם "law" (יתווסף ל-config.ts בביצוע)
{
  ease: "power2.out",
  duration: 0.55,
  distance: 16,      // תואם חוק א׳-3: עד 16px
  stagger: 0.05,     // עד 60ms בין פריטים
  lerp: 1,           // בלי Lenis / בלי scroll-jacking
  start: "top 90%",
}
```

חריגה מאושרת מסקריפט א׳ (Framer כברירת מחדל): הלקוח/אבישי סיפקו Motion Kit מבוסס GSAP — משתמשים בו במקום Framer, בעוצמת `law/minimal` בלבד.

## טוקנים (יישור ל-design-tokens)
| טוקן | ערך | שימוש |
|---|---|---|
| motion-instant | 100ms | hover צבע |
| motion-fast | 180ms | כפתורים |
| motion-base | 280ms | אקורדיון FAQ, מגירת מובייל |
| motion-slow | 500ms | Reveal בגלילה |
| ease-out | cubic-bezier(0.16, 1, 0.3, 1) | כניסות |
| ease-in | cubic-bezier(0.7, 0, 0.84, 0) | יציאות |

בלי spring.

## מה נכנס מה-Kit / מה לא
| קומפוננטה | שימוש | הערה |
|---|---|---|
| MotionProvider | כן, preset law | lerp 1 |
| Reveal | כן, מתחת לקיפול | y≤16, once |
| SplitReveal | **לא על H1/CTA** | אופציונלי על H2 מתחת לקיפול בלבד, `by="lines"` |
| Parallax | כן, Hero בלבד | speed ≤ 0.2; כבוי ב-reduced-motion |
| Counter | כן | רק `12` (ותק) — מספר אמיתי |
| Magnetic | לא | לא מתאים ל-N27 |
| Marquee | לא | אין לוגואים אמיתיים |
| HorizontalScroll | לא | מוריד בהירות במובייל |
| PageTransition | עדין / אופציונלי | opacity קצר בלבד |

## מפת תנועה לפי עמוד
| עמוד / אלמנט | טריגר | תפקיד | טוקן / קומפ׳ | reduced-motion |
|---|---|---|---|---|
| Hero H1 + CTA + לוגו | — | — | **סטטי מיידי (LCP)** | כפי שהוא |
| Hero רקע | גלילה | הנאה עדינה | Parallax 0.15 | תמונה סטטית |
| דלתות 3 תחומים | כניסה ל-viewport | הסבר + התמצאות | Reveal stagger 50ms | הופעה בלי תזוזה |
| מקטע «למה אנחנו» / Counter 12 | viewport | משוב+סמכות | Counter + Reveal | מספר סופי מיד |
| «איך זה עובד» 3 שלבים | viewport | הסבר | Reveal + קו CSS עדין (A19) | בלי קו מונפש |
| כפתורי hover | hover | משוב | motion-instant/fast | שינוי צבע בלבד |
| Sticky CTA מובייל | Hero יצא מהמסך | התמצאות | slide-up 280ms | מופיע מיד |
| שגיאת שדה | submit | משוב | רעידה ≤6px | outline אדום בלי רעידה |
| שליחת טופס | click | משוב | ספינר בכפתור | טקסט «שולחים…» |
| הצלחת טופס | success | משוב+הנאה | וי קצר + מעבר לתודה | הודעה סטטית |
| FAQ אקורדיון | click | התמצאות | height via grid/opacity | פתיחה מיידית |
| תפריט מובייל | click | התמצאות | drawer מ-inline-start (RTL) | בלי slide |
| מעבר עמוד | ניווט | התמצאות | PageTransition קצר / כבוי | כבוי |

## חוקי ברזל שנבדקים בסוף א׳-3
1. לכל תנועה יש תפקיד  
2. LCP לא מונפש  
3. בלי scroll-jacking (Lenis כבוי)  
4. רק transform/opacity  
5. prefers-reduced-motion מכבה Parallax/Reveal תזוזה  
6. RTL: מגירה מ-inline-start  
7. תקציב INP/CLS  

## בדיקות סיום (אחרי קוד)
- [ ] CPU 4× מובייל — בלי קפיצות  
- [ ] reduced-motion — אתר מלא  
- [ ] Lighthouse LCP פער ≤200ms עם/בלי תנועה  
- [ ] מקלדת בזמן אנימציה — פוקוס לא נאבד  
- [ ] אין אנימציה שלא במפה  

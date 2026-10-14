# Design Tokens — כהן ושות׳ (כיוון 1)

הכול כמשתני CSS / Tailwind theme ב-`src/app/globals.css` (`@theme`).

### מתי מותר `className` עם סוגריים מרובעים (חריגות מאושרות)
| סוג | דוגמה | למה |
|---|---|---|
| יחסי תמונה | `aspect-[4/3]`, `aspect-[21/9]` | אין טוקן יציב לכל יחס |
| מעקב אותיות למותג | `tracking-[0.06em]` | דגש זהב קבוע |
| הפניה לטוקן תנועה | `duration-[var(--motion-fast)]` | כן טוקן — רק תחביר Tailwind |
| סקייל לחיצה | `active:scale-[0.97]` | מיקרו-אינטראקציה |
| גריד/גובה נקודתי | `md:grid-cols-[…]`, `md:h-[22rem]` | פריסת מקטע חד-פעמית |

**אסור:** צבעים כ-`bg-[#…]` / `text-[#…]` מחוץ לטוקנים · גדלי טקסט חופשיים כשאפשר `text-hero` / `text-h2` / `text-small` וכו׳.

## צבעים
| טוקן | ערך | שימוש |
|---|---|---|
| `color-navy` | `#1B2A4E` | כותרות, Hero block, פוטר |
| `color-navy-deep` | `#121C35` | hover כהה / פוטר תחתון |
| `color-gold` | `#C9A961` | קו דגש, קישור hover, אייקון |
| `color-gold-hover` | `#B8924A` | hover על זהב |
| `color-cream` | `#F7F4EF` | רקע מקטעים משניים |
| `color-white` | `#FFFFFF` | רקע ראשי |
| `color-ink` | `#1A1A1A` | גוף טקסט |
| `color-muted` | `#5C6578` | משני, captions |
| `color-border` | `#E5E1D8` | קווים עדינים |
| `color-error` | `#8B2E2E` | שגיאות טופס (לא אדום זועק) |
| `color-success` | `#2F5D50` | הצלחת שליחה |

## טיפוגרפיה (עברית — גובה שורה מותאם)
| טוקן | גודל / משקל / גובה | שימוש |
|---|---|---|
| `font-display` | Frank Ruhl Libre | H1–H3 |
| `font-sans` | Rubik | גוף, ניווט, כפתורים, EN |
| `text-hero` | clamp 2.25rem–3.5rem / 700 / 1.2 | H1 |
| `text-h2` | clamp 1.75rem–2.25rem / 700 / 1.25 | H2 |
| `text-h3` | 1.375rem / 600 / 1.3 | H3 |
| `text-body` | 1.0625rem / 400 / 1.7 | פסקאות |
| `text-small` | 0.875rem / 400 / 1.5 | הרגעה, captions |
| `text-button` | 1rem / 500 / 1.2 | כפתורים |

## רווחים (סקאלה 4px)
`space-1` 4px · `space-2` 8px · `space-3` 12px · `space-4` 16px · `space-5` 24px · `space-6` 32px · `space-7` 48px · `space-8` 64px · `space-9` 96px · `space-10` 128px

Section padding מובייל: `space-7` אנכי · דסקטופ: `space-9`.

## רדיוסים וצללים
| טוקן | ערך |
|---|---|
| `radius-sm` | 2px |
| `radius-md` | 4px |
| `radius-lg` | 8px |
| `shadow-soft` | `0 1px 2px rgb(27 42 78 / 0.06), 0 8px 24px rgb(27 42 78 / 0.06)` |
| `shadow-none` default | כרטיסים בלי צל אלא אם אינטראקטיבי |

## תנועה (בסיס — מורחב בא׳-3)
| טוקן | ערך |
|---|---|
| `motion-instant` | 100ms |
| `motion-fast` | 180ms |
| `motion-base` | 280ms |
| `motion-slow` | 500ms |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` |

מותג שקט: בלי spring; בקצה האיטי של הטווח.

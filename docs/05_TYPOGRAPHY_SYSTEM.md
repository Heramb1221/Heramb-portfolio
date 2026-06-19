# 05 — Typography System

## Typeface Philosophy: Two Fonts, Two Purposes

The system uses exactly two typefaces. Using more would be a decoration choice, not a communication choice.

```
Primary:  Inter           — body text, headings, UI, labels
Code:     JetBrains Mono  — code blocks AND UI labels that should feel technical
```

**Inter** was chosen because it is:
- Engineered for screen readability at small sizes
- Neutral enough to not impose personality over content
- Wide enough in character to support bold headings without weight issues
- Used by products like Linear and Vercel — it carries association with engineering precision

**JetBrains Mono** was chosen because it is:
- Designed specifically for code reading
- More personality than typical monospace fonts (not Courier, not generic monospace)
- The choice of engineers who care about their tools
- Bleeds naturally into UI — section numbers, dates, coordinates, file paths all feel more intentional in JetBrains Mono

---

## How JetBrains Mono Bleeds Into the UI

This is the key typographic decision that distinguishes the portfolio from templates.

JetBrains Mono is not only used for code blocks. It appears in:

- The `<HC />` logo
- Section numbers (`01`, `02` style labels)
- Date/time stamps (timeline, notes, certifications)
- Location coordinates in the hero (`20.0116° N, 73.7569° E`)
- Category labels in JetBrains Mono, uppercase, tracked (`FRONTEND`, `BACKEND`)
- File-path-style breadcrumbs in case studies
- The `<HC />` in the loader
- Tech stack inline badges

The visual message: *this portfolio is a technical document, made beautiful.* The monospace elements signal engineering precision without making the portfolio feel like a terminal interface.

---

## Type Scale

```
Hero heading:     clamp(48px, 8vw, 96px)   Inter 800, tracking -0.04em
Page heading:     clamp(32px, 4vw, 48px)   Inter 700, tracking -0.03em
Section heading:  28-36px                  Inter 600, tracking -0.02em
Sub-heading:      20-24px                  Inter 600, tracking -0.01em
Body large:       16-18px                  Inter 400, line-height 1.75
Body:             14-15px                  Inter 400, line-height 1.7
Body small:       13px                     Inter 400, line-height 1.65
Label:            11-12px                  JetBrains Mono 500, uppercase, tracking 0.1em
Code:             13-14px                  JetBrains Mono 400, line-height 1.6
```

---

## Heading Hierarchy

Every page has exactly one `h1`. This is not convention — it is the correct semantic structure for accessibility and SEO.

```
h1: Page/section title (hero name, page name)
h2: Major section within a page (case study sections, resume sections)
h3: Sub-section or card title
h4: Supporting heading within cards or content
p:  All body text
```

No heading is used for visual effect. If a large display text isn't semantically a heading, it's a `p` or `span` styled to look large.

---

## Tracking (Letter Spacing) Philosophy

```
Hero display:    -0.04em   — tight, powerful, contemporary
Section titles:  -0.02em   — slightly tight, premium
Body:           +0.00em   — no modification
Labels (Mono):  +0.10em   — tracked out, architectural feel
Code:           -0.01em   — very slightly tighter for readability
```

Tight tracking on large text is the current convention for premium digital design. The larger the text, the tighter it should be (because default tracking at display sizes looks spacious and amateurish). Small labels are tracked out because they are identifiers, not reading material.

---

## Line Height (Leading)

```
Display headings:  1.1   — nearly no leading, feels bold and architectural
Body headings:     1.3   — comfortable without excessive space
Body text:         1.7   — generous for readability
Code:              1.6   — slightly generous for scanning
Labels:            1.4   — compact for chips, badges
```

---

## Responsive Typography

All display text uses `clamp()` to scale fluidly with viewport:

```css
/* Hero heading */
font-size: clamp(3rem, 8vw, 6rem);

/* Section headings */
font-size: clamp(1.75rem, 4vw, 2.5rem);

/* Body stays fixed — comfortable reading width controls line length instead */
font-size: 0.9375rem; /* 15px */
```

Body text does not scale with viewport because the container width controls the reading experience — not the font size. Lines that are too long get a `max-width: 65ch` constraint.

---

## Maximum Line Length

Reading lines have a maximum length:

```
Prose (case studies, notes):  65ch   — approximately 65 characters
Descriptions (cards):         no limit — constrained by card width
Hero description:             max-w-2xl — approximately 50-55ch
```

Lines longer than 75 characters cause reader fatigue. Lines shorter than 45 characters fragment reading flow. The 65ch sweet spot is the standard for professional editorial typography.

---

## Weight Philosophy

```
400 (Regular):   All body text, descriptions
500 (Medium):    Emphasized labels, badge text, navigation links
600 (SemiBold):  Card titles, sub-headings, section sub-heads
700 (Bold):      Section headings, page headings
800 (ExtraBold): Hero display text only
```

Weight should only increase when importance genuinely increases. Using 700 for body text because it "looks strong" undermines the hierarchy — it makes everything medium importance, which means nothing is important.

---

## Font Loading Strategy

Both fonts are loaded via `next/font/google` with `display: swap`. This prevents invisible text (FOIT) during font load while still benefiting from font optimization. The variable font files are subsetted to Latin characters to reduce file size.

Font variables are set on the `<html>` element and mapped in Tailwind's `@theme inline`:

```css
--font-sans: var(--font-inter);
--font-mono: var(--font-mono);  /* JetBrains Mono */
```
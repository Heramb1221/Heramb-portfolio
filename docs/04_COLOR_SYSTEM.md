# 04 — Color System

## Philosophy: Warm Dark + Amber Discovery

The color system was designed around a single insight: **most developer portfolios use cold dark backgrounds with electric blue accents**. This creates a "developer template" feeling — competent but anonymous.

This portfolio uses **warm dark** (violet undertone background) + **amber primary** (the explorer's lantern). The amber communicates discovery, craft, precision. Against warm near-black, it creates a premium contrast that is earned, not generic.

---

## Color Architecture

The system has three layers:

1. **Base colors** — fixed raw values (hex/oklch)
2. **Semantic tokens** — CSS variables with meaning (`--primary`, `--muted-foreground`)
3. **Tailwind utilities** — classes consuming tokens (`text-primary`, `bg-card`)

All components use semantic tokens, never raw values. This enables theme switching and future color updates without touching component code.

---

## Dark Theme (Default)

```css
--background:         oklch(0.082 0.010 280)   /* #0A0A0F — base background */
--foreground:         oklch(0.962 0.006 240)   /* #F1F5F9 — primary text */
--card:               oklch(0.115 0.013 275)   /* #111118 — card surfaces */
--card-foreground:    oklch(0.962 0.006 240)   /* #F1F5F9 */
--surface:            oklch(0.140 0.015 275)   /* slightly lighter than card */
--muted:              oklch(0.165 0.018 275)   /* muted section backgrounds */
--muted-foreground:   oklch(0.640 0.025 225)   /* #94A3B8 — secondary text */
--border:             oklch(1 0 0 / 8%)        /* white at 8% — subtle borders */
--input:              oklch(1 0 0 / 10%)       /* slightly more visible */
```

### Why these specific values:

**Background (#0A0A0F)**: Not pure black. Pure black (#000000) feels digital and harsh. Not navy (#0F172A) — that's too blue, too many portfolios. This near-black has a violet undertone (hue 280°) that makes it feel warm and considered without being obviously warm.

**Foreground (#F1F5F9)**: Not pure white. Pure white creates harsh contrast that causes eye strain in dark mode. This off-white (oklch lightness 0.962) is easy to read without visual fatigue.

**Card (#111118)**: 3% lighter than background. Provides just enough elevation to communicate "this is a distinct element" without dramatic contrast.

**Muted foreground (#94A3B8)**: Cool blue-gray at medium lightness. The contrast against the warm dark background creates a subtle tension — warm and cool coexisting — that gives the palette depth.

**Border (white/8%)**: Almost invisible. Borders should define space without competing with content.

---

## Amber System (Primary = Discovery)

```css
--primary:            oklch(0.735 0.165 65)    /* #F59E0B — amber */
--primary-foreground: oklch(0.082 0.010 280)   /* dark bg on amber buttons */
--amber:              oklch(0.735 0.165 65)    /* alias for amber */
--amber-soft:         oklch(0.845 0.145 70)    /* #FCD34D — lighter amber */
--amber-glow:         oklch(0.735 0.165 65 / 12%) /* ambient glow */
```

**Why amber?**

- Amber is the color of the explorer's lantern — discovery, warmth, precision
- Against near-black violet, amber creates maximum visual impact at a primary importance level
- Amber is distinctive — it is almost never used as a primary accent in developer portfolios (most use blue, teal, or purple)
- It communicates craft without communicating gaming or cyberpunk aesthetics
- The hue (65° — between yellow and orange) avoids both "warning sign yellow" and "Halloween orange"

**Where amber appears:**

| Usage | Token | Value |
|---|---|---|
| Primary buttons | `bg-primary` | Full amber fill |
| Active nav link | `text-primary` | Amber text |
| Nav indicator | `bg-primary` | Amber underline |
| Logo brackets | `text-primary` | Amber `<` and `/>` |
| Focus rings | `ring-ring` | Amber ring |
| Loader circuit | Hardcoded `#F59E0B` | Amber SVG lines |
| Route transition | Hardcoded `#F59E0B` | Amber progress line |
| Scroll thumb | CSS `var(--amber)/30%` | Amber scrollbar |
| Text selection | CSS custom | Amber/25% background |
| Hover card border | `border-primary/30` | Amber at 30% |
| Mobile nav active | `bg-amber-glow` | Ambient amber fill |
| Exploring badge border | `border-primary/50 dashed` | Amber dashed |

---

## Extended Brand Palette

```css
--indigo:   oklch(0.623 0.214 255)   /* #6366F1 — technical/code labels */
--emerald:  oklch(0.696 0.165 162)   /* #10B981 — success, live, active */
```

**Indigo** is used for: code badges, technical category labels, LeetCode badge, version indicators. It is the "code" color — precise, reliable, slightly cool.

**Emerald** is used for: availability status, "live demo" indicators, success states, "Completed" project status. It communicates: *this works, this is running.*

Both are used sparingly. Neither competes with amber for attention.

---

## Status Colors

```
Success:     emerald  — oklch(0.696 0.165 162)
Warning:     amber    — oklch(0.735 0.165 65)   (same as primary — intentional)
Error:       rose     — oklch(0.704 0.191 22)
Exploring:   amber/50 — oklch(0.735 0.165 65 / 50%)
```

The decision to make "warning" and "primary" the same amber color is intentional. It means amber can mean both "this is the most important thing" AND "this is in progress / learning / not yet complete." The context disambiguates — a "currently learning" badge feels correct in amber, as does a primary action button.

---

## Light Theme

```css
--background:  oklch(0.981 0.004 75)   /* #FAFAF8 — warm white, not cold */
--foreground:  oklch(0.152 0.016 50)   /* #1C1917 — warm near-black */
--card:        oklch(0.965 0.006 75)   /* slightly warm off-white */
--primary:     oklch(0.65 0.165 65)    /* deeper amber for light bg contrast */
--border:      oklch(0.900 0.012 75)   /* warm beige-gray */
```

The light theme is warm, not cold. A cold white (`#FFFFFF`) with amber would create an unpleasant holiday aesthetic. The warm white (`#FAFAF8`) with warm near-black text creates a refined editorial feel — closer to a high-end magazine than a website.

The amber in light mode is slightly deeper (`oklch 0.65` vs `0.735`) to maintain contrast ratios on light backgrounds.

---

## Project Identity Colors

Each project has an accent color used in its detail page and card:

```
ConverseCloud:   Blue-violet   #4F46E5 — communication, waves, connection
LoomCV:          Emerald       #059669 — growth, professional, SaaS
Reverie:         Deep purple   #7C3AED — introspective, emotional, night
Markowl:         Warm orange   #EA580C — desktop, native, craft
Coditor:         Cyan          #0891B2 — code, terminal, precision
ACM Website:     Red-orange    #DC2626 — community, energy, institution
HeartWave:       Rose          #E11D48 — music, sync, shared experience
Afterglow:       Gold          #D97706 — cinematic, premium, GSAP
```

These are used as: card thumbnail overlay, detail page accent, tag colors. They are never mixed with the amber system — each project's color is its own world.

---

## Accessibility Contrast Ratios

All text/background combinations meet WCAG AA:

```
Primary text on background:    #F1F5F9 / #0A0A0F  → 17.2:1 (AAA)
Muted text on background:      #94A3B8 / #0A0A0F  →  7.1:1 (AAA)
Amber on background:           #F59E0B / #0A0A0F  →  8.3:1 (AAA)
Dark text on amber button:     #0A0A0F / #F59E0B  →  8.3:1 (AAA)
Muted text on card:            #94A3B8 / #111118  →  6.8:1 (AA+)
```
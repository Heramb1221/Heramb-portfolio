# 11 — Skills Section

## Philosophy: Equipment, Not Credentials

The skills section communicates **tools carried through expeditions** — not a list of technologies to impress. The design must convey self-awareness: which tools are mastered (large cards), which are used regularly (medium), and which are currently being learned (special "exploring" treatment).

No percentage bars. No star ratings. No skill levels. These create false precision and invite comparison to other engineers. The Bento size communicates usage frequency without numeric claims.

---

## Layout: Interactive Bento Grid

The skills are displayed in a Bento grid where **size = frequency of use**.

```
Desktop (3-column grid with variable spanning):

┌─────────────────┬─────────┬──────────┐
│   React/Next.js │ Node.js │TypeScript│  ← Large: daily core tools
│   (2 cols wide) │ (1 col) │  (1 col) │
├────────┬─────────┴─────────┤          │
│MongoDB │   PostgreSQL      │──────────┤
│ (1×1)  │     (1×1)        │  Java    │  ← Medium: used frequently
├────────┴──────────────────┤  (1×1)   │
│   React Native / Expo     ├──────────┤
│        (2 cols wide)      │Python(1) │
├────────┬────────┬───────────┴─────────┤
│.NET 🔆 │Docker🔆│      Azure 🔆       │  ← Exploring: amber dashed border
│ (1×1)  │ (1×1)  │      (2 cols)       │
└────────┴────────┴─────────────────────┘
```

**Tablet**: 2 columns. Large cards become 1-wide.
**Mobile**: 1 column. All cards equal width.

---

## Card Design

**Standard card**:
- Icon in `bg-primary/10 text-primary` circle (amber tinted)
- Category title in Inter semibold
- Skill badges row (wrapping, `SkillBadge` component)
- CSS hover: `-translate-y-1`, amber border glow

**Exploring card** (`.NET`, `Docker`, `Azure`, `System Design`, `C#`):
- Icon in `bg-amber/10 text-amber` circle (amber, not primary/10)
- `border-exploring` class: animated dashed amber border
- Subtle amber glow in background
- No hover lift — these cards have enough visual distinction already

---

## Category Filter

Tab row above the Bento:
```
[All] [Frontend] [Backend] [Database] [Mobile] [Languages] [Exploring]
```

Click filters the Bento grid using Framer Motion `layoutId` on each card — cards animate to new positions smoothly (layout animation, not stagger).

"Exploring" filter shows only the amber-bordered cards — immediately communicates the growth trajectory.

---

## Hover: Project Connections

When hovering a skill card, a tooltip appears showing:
```
React
──────────────────
Used in 5 projects:
↳ ConverseCloud
↳ LoomCV
↳ Reverie
↳ Coditor
↳ ACM Website
```

This connects the skills section to the projects section — proving that the technologies are actually used, not just listed.

**Implementation**: Data sourced by cross-referencing `skillCategories` config against project YAML `technologies` arrays.

---

## Data Source

Skills never hardcoded in components. Source: `config/skills.ts`.

Each category has:
- `id`: filter key
- `title`: display name
- `icon`: Lucide icon component
- `iconLabel`: aria-label for the icon
- `skills`: string array of skill names

To add a skill: add a string to the relevant category array in `config/skills.ts`. No component changes.

---

## Section Context

The skills section appears after "About" in the homepage order. This is intentional — the human context (About) comes before the technical toolkit (Skills). The visitor understands who Heramb is before they learn what tools he carries.

---

## Animation

- Section entry: `whileInView` stagger, `staggerTight` variant (0.04s between cards)
- Cards stagger by row, left to right
- Filter change: Framer Motion layout animation (smooth repositioning)
- Hover tooltip: 200ms fade in, `easeOut`
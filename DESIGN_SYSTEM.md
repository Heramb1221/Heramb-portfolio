# DESIGN_SYSTEM.md

# Portfolio Design System: "The Explorer's Atlas"

## Design Philosophy

The portfolio is an atlas of explored territories. It is a living record of an engineer who crosses boundaries between systems, languages, platforms, and ideas—and documents what he finds.

- The loader is a map being drawn before the world appears.
- The hero is the central territory—where the explorer stands today.
- Each project is its own world with different terrain and visual language.
- The skills section is the equipment/tools carried through expeditions.
- The notes are the expedition diary, capturing raw engineering thinking.

The site should feel like a "soft impactful song" - atmospheric, cumulative, and memorable.

---

# Visual Style

Premium, intentional, and cinematic.
Focus on crafting an interconnected experience that shows deep care for details.

---

# Typography

The portfolio strictly uses a two-typeface system to bridge editorial elegance and engineering precision.

### Display & Body
**Inter**
Timeless, engineered readability.
Used for headings and paragraphs.

### Code & Technical Labels
**JetBrains Mono**
Personality bleeds into the UI.
Used for code blocks, section numbers, timestamps, coordinate labels, technology tags, dates, and file paths. 

---

# Color System: Warm Dark & Amber

We use a premium "Warm Dark" base with "Amber" as the color of discovery (the explorer's lantern). Avoid cold blacks or generic electric blues.

### Surfaces
- Base: `#0A0A0F` (Near-black, violet undertone)
- Surface: `#111118` (Card backgrounds, elevated surfaces)
- Border: `#1E1E2E` (Subtle separation)

### Typography
- Primary Text: `#F1F5F9` (Off-white, soft)
- Secondary: `#94A3B8` (Muted information)
- Tertiary: `#4A5568` (Ghost labels)

### Accents
- Accent: `#F59E0B` (Amber - the explorer's lantern)
- Accent Soft: `#FCD34D` (Amber highlights)
- Code: `#6366F1` (Indigo for technical labels)
- Success: `#10B981` (Emerald for active/live)

---

# Card Style (Bento / Editorial)

- Surfaces use `#111118` with subtle `#1E1E2E` borders.
- Hover effects trigger soft amber glows or slight elevation.
- NO hard shadows.
- Clean typography hierarchy.

---

# Animations

The "Soft Impactful Rule": Every animation must pass this test: *"If this animation were removed, would the content still communicate clearly?"*

Allowed:
- Cinematic Page Transitions (Max 800ms)
- Smooth Reveals (Elements drift up slightly as they enter the viewport)
- Staggered Entrances
- Subtle Hover glows

Easing system (Framer Motion):
- Reveal: `cubic-bezier(0.16, 1, 0.3, 1)`
- State change: `cubic-bezier(0.4, 0, 0.2, 1)`
- Exit: `cubic-bezier(0.4, 0, 1, 1)`

Animations play with scrolling, never forcing the visitor to wait or lose control.

---

# Homepage Layout

Hero -> Featured Projects -> Skills (Interactive Equipment) -> About -> Timeline -> Notes -> Achievements -> Footer

---

# Knowledge Graph integration

Projects and notes are intrinsically linked.
- Projects feature "Related Notes" (engineering decisions, architecture notes).
- Notes feature "Related Projects".

---

# Resume

Treat it as an interactive technical document. Monospace for dates and roles.

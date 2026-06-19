# 03 — Visual System

## Philosophy: Refined Dark, Not Generic Dark

Most developer portfolios use dark mode as a default because "engineers prefer dark mode." This is true but lazy. The visual system here uses dark as a *design choice* — one that enables specific aesthetic decisions about warmth, amber glow, depth, and contrast that would be impossible on a light background.

The result is not "dark mode." It is a warm, intentional dark that feels different from both corporate dark UI and gaming/cyberpunk aesthetics.

---

## Surface System

The portfolio uses a layered surface system — three levels of elevation expressed through background color:

```
Level 0 — Base:    #0A0A0F  (oklch(0.082 0.010 280))
                   The deepest layer. Page background.
                   Near-black with violet undertone — not pure black, not blue-black.
                   The violet undertone is intentional: it gives warmth without warmth.

Level 1 — Surface: #111118  (oklch(0.140 0.015 275))
                   Used for muted section backgrounds (bg-muted/20 sections).
                   Provides subtle visual rhythm between alternating sections.

Level 2 — Card:    #111118  (oklch(0.115 0.013 275))
                   Cards, modals, popovers, sheet backgrounds.
                   Slightly elevated from base — creates depth without heavy shadows.
```

Why this system: The three layers create a clear visual hierarchy where interactive elements (cards) float above content areas (sections), which float above the base (background). The elevation is implied through color, not shadow.

---

## Card Design

All cards share these base properties:

```
Background:   var(--card)       → Level 2 surface
Border:       1px solid         var(--border)  → white at 8% opacity
Border radius: rounded-xl       → 0.875rem
Shadow:       shadow-sm         → minimal, not dramatic
Hover:        -translate-y-1    → lift (CSS, no JS)
              border-primary/30 → amber border glow on hover
Transition:   200ms ease-out
```

### Card Variants

**Standard Card** (`ContentCard`): Used for Recommendations, Achievements, Certifications, Notes. Base properties only.

**Project Card**: Has a colored header with project accent color overlay on thumbnail. Border color shifts to project's identity color on hover.

**Skill Card**: Has category icon, title, badge grid. "Exploring" variant has amber dashed border animation.

**Note Card**: Has category chip, reading time, tags, date. Clean editorial feel.

### Anti-patterns

- No `box-shadow: 0 0 20px rgba(amber)` on hover — this is a glow effect, not a lift
- No transform `scale()` on hover for cards — scale disrupts reading flow
- No border-radius changes on hover
- No background color changes on hover (except for explicitly interactive buttons)

---

## Glassmorphism Usage

Glassmorphism is used **sparingly and purposefully** in:

1. **Navbar on scroll**: `bg-background/85 backdrop-blur-xl` — the content beneath is visible through the nav, confirming depth
2. **Sidebar**: `bg-background/50 backdrop-blur-sm` — slightly transparent to feel embedded
3. **Mobile bottom bar**: `bg-background/90 backdrop-blur-md` — heavier blur to prevent content visibility

**Glassmorphism is NOT used for**:
- Project cards (too decorative)
- Skill cards (would reduce readability)
- Achievement cards (inconsistent with editorial tone)
- Any section that contains dense text

The rule: glassmorphism communicates "this element is fixed/sticky and sits above the content." It is a positioning signal, not an aesthetic decoration.

---

## Bento Layout System

The Bento grid is used exclusively for the Skills section.

Bento properties:
- Cards of varying sizes (1×1, 1×2, 2×2) based on usage frequency
- Gap: 12-16px between cells
- Responsive: desktop 3-column, tablet 2-column, mobile 1-column (graceful degradation)
- Each cell has rounded-xl, border, card background
- The "Exploring" row has special amber dashed border treatment

Bento is NOT used for: Projects, Notes, Achievements, Certifications. Those use standard responsive grids.

---

## Border System

```
Primary border:    border-border          → rgba(255,255,255, 0.08)  — universal separator
Active/hover:      border-primary/30      → amber at 30% opacity     — interactivity signal
Card on hover:     border-primary/30      → amber at 30%             — same as above
Exploring state:   border-primary/50 dashed                          — animated learning indicator
Destructive:       border-destructive/50  → red at 50%               — error states
Success:           border-emerald/30      → green at 30%             — success states
```

Border philosophy: Borders define space without competing with content. They are supporting actors. The amber glow on hover is the only moment a border steps forward.

---

## Shadow System

Shadows are minimal and purposeful:

```
shadow-sm:    0 1px 2px 0 rgba(0,0,0,0.05)      — default card depth
shadow-md:    0 4px 6px -1px rgba(0,0,0,0.1)    — resume button hover
shadow-amber: 0 4px 20px oklch(0.735 0.165 65 / 20%)  — amber glow on primary button hover
```

Heavy shadows (`shadow-xl`, `shadow-2xl`) are never used. The dark background provides inherent depth — heavy shadows create a disconnected floating effect.

---

## Section Rhythm

Sections alternate between two background states:

```
State A (default):  bg-background   → pure base background
State B (elevated): bg-muted/20     → very slightly elevated
```

The alternation pattern:
```
Hero                   → transparent
Recruiter Snapshot     → muted/20
Featured Projects      → default
Skills                 → muted/20
About                  → default
Currently Learning     → muted/20
Timeline               → default
Recommendations        → muted/20
Achievements           → default
Certifications         → muted/20
GitHub Activity        → default
Contact                → muted/20
```

This creates a breathing rhythm — the eye can tell where one section ends and another begins without explicit dividers.

---

## Grid System

```
Container max-width:  1280px (max-w-[1280px])
Container padding:    px-6 lg:px-8
Section padding:      py-16 md:py-24
Card grids:
  Desktop:           3 columns (notes, achievements, certifications, projects)
  Tablet:            2 columns
  Mobile:            1 column
Project featured:    2 columns (wider cards deserve more width)
Timeline:            1 center column with alternating left/right (desktop)
                     1 column (mobile)
```

---

## Responsive Philosophy

**Desktop first, mobile always.** The design is conceived at desktop scale but every component is built with mobile as a hard constraint.

On mobile:
- The sidebar becomes a bottom action bar
- Bento grids collapse to 2-column then 1-column
- Timeline becomes single-column left-aligned
- Hero becomes single-column (visual hidden, text only)
- Project detail becomes single-column max-width prose
- No horizontal overflow under any circumstance

The mobile experience is not "the desktop experience squeezed." It is a thoughtfully reconsidered layout for a narrower context.
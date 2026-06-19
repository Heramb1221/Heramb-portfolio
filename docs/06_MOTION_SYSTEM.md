# 06 — Motion System

## Core Rule: Motion Must Pass The Removal Test

Before any animation is implemented, ask: *if this animation were removed, would the content still communicate clearly?*

If yes — the animation is additive. It enhances without being required. **Keep it.**

If no — the animation is a crutch. The content needs to communicate without motion, and the animation is hiding a design problem. **Remove it and fix the design.**

No animation exists for decoration. No animation exists to demonstrate technical capability. Every motion either communicates state change, signals hierarchy, or creates emotional resonance.

---

## Two Animation Systems

The portfolio uses two animation libraries with distinct responsibilities:

### Framer Motion (React-integrated animations)
- Page transitions (template.tsx)
- Component state changes (hover, active, selected)
- Scroll-triggered section reveals (whileInView)
- Stagger effects on lists and grids
- Layout animations (nav indicator sliding between links)
- All animation that is tied to React state

### GSAP (DOM-level, complex sequences)
- The loader circuit animation (SVG drawing sequence)
- The route transition overlay (amber line sweep)
- Future: hero background particle system
- Future: case study scroll-pinned reveals
- Future: skill Bento layout entry animation
- Any animation that requires precise timeline control or SVG manipulation

**Why both?** Framer Motion is simpler for React state-driven animation. GSAP is more powerful for timeline-controlled sequences and SVG. Using each where it is strongest prevents fighting against either library.

---

## Easing System

All easing uses four custom curves:

```
easeOutExpo:  cubic-bezier(0.16, 1, 0.3, 1)
              — Primary reveal easing. Fast start, smooth arrival.
              — Used for: all scroll reveals, page entry, card appearances
              — Communicates: confident, purposeful entry

easeInOut:    cubic-bezier(0.4, 0, 0.2, 1)
              — State transitions. Balanced acceleration.
              — Used for: hover color changes, tab switches, filter toggles
              — Communicates: smooth, natural state change

easeIn:       cubic-bezier(0.4, 0, 1, 1)
              — Exit animations. Accelerates toward removal.
              — Used for: any exit animation, close animations
              — Communicates: purposeful departure, not hesitant

Spring:       stiffness: 400, damping: 30
              — Physical, spring-based feel. Used only for the nav indicator.
              — Communicates: this element is physically grounded
```

GSAP equivalents:
```
easeOutExpo → "power4.out"
easeInOut   → "power2.inOut"
easeIn      → "power2.in"
Elastic     → "elastic.out(1, 0.5)"  — reserved for loader
```

---

## Duration Scale

All animation durations are from a fixed scale. No arbitrary values.

```
micro:   150ms — hover state changes, focus rings, micro interactions
fast:    250ms — state toggles, tab switches, button presses
base:    400ms — default component reveals
slow:    600ms — section reveals, larger element entrances
reveal:  700ms — scroll-triggered entrances with easeOutExpo
page:    850ms — page transition in/out combined
loader:  1400ms — total loader sequence
```

Using a fixed scale prevents the visual noise of arbitrarily different speeds. The visitor's brain learns the rhythm and stops consciously tracking animation speed.

---

## Scroll Reveal Philosophy

**The scroll reveals content, not triggers content.** The distinction matters:

- **Wrong**: visitor must scroll to a specific position before content appears (content is hidden until scrolled)
- **Right**: content animates in as visitor scrolls to it naturally (content enhances the scroll rhythm)

In practice: `whileInView` with `once: true` and `margin: "-80px 0px"`. The "-80px" means the animation fires 80px before the element is fully in view — content is already appearing as the user approaches it, not after they've been waiting.

**Standard reveal sequence for all sections:**
```
heading:    0ms delay
subtitle:   60ms delay
content:    120ms delay
CTA:        200ms delay
```

This 4-step stagger creates a reading rhythm — the visitor's eye is drawn to the heading, then subtitle, then content, then action. The stagger guides attention.

---

## Stagger System

Three stagger speeds for different content densities:

```
stagger:       0.06s between children, 0.03s initial delay
               — Default. Section content, form fields, single-column lists.

staggerTight:  0.04s between children, 0.02s initial delay
               — Dense grids. Project cards (3-col), skill badges.
               — Faster because more items, less time per item.

(Timeline-specific): 0.08s between entries
               — Slower because each timeline entry deserves attention.
```

---

## Hover Interaction Hierarchy

Every interactive element category has exactly one hover treatment:

```
Cards (project, skill, note, achievement):
  transform: translateY(-6px)
  border: amber/30%
  transition: 200ms easeOutExpo
  — Lift is primary signal. Amber border confirms interactivity.

Navigation links:
  color: var(--primary)  → amber
  transition: 200ms easeInOut
  — Color shift only. No movement (nav is fixed, movement would feel wrong).

Primary buttons (amber):
  opacity: 0.90
  box-shadow: 0 4px 20px amber/20%
  transition: 200ms ease
  — Slight dimming + shadow depth. Not movement (button is action, not destination).

Secondary buttons / link-style buttons:
  color: var(--foreground)  → text brightens
  border-color: amber/30%   → border warms
  transition: 200ms easeInOut
  — Warming. Moving toward the primary amber system.

Icon buttons:
  scale: 1.04
  color: var(--foreground)
  transition: 150ms easeOutExpo
  — Subtle scale + brightening.

Logo:
  Group hover: brackets dim, text warms toward amber
  transition: 200ms
  — Reveals the amber brackets as the key element.
```

---

## Micro Interactions

### Amber Scrollbar
The scrollbar thumb is amber at 30% opacity, becoming 55% on hover. Not announced, not dramatic — a detail discovered by scrolling.

### Text Selection
`::selection` uses amber at 25% background. When text is selected, the amber system extends to that moment.

### Focus Rings
All focus rings use `ring-2 ring-ring` (amber) with `ring-offset-2 ring-offset-background`. Keyboard navigation is always visible, always amber.

### Input Active State
Form inputs use `focus:border-primary focus:ring-1 focus:ring-primary/20` — amber border + ambient glow on focus.

---

## Performance Rules

1. All CSS hover effects use `transform` and `opacity` only — these run on the GPU compositor thread
2. Framer Motion `whileInView` uses `once: true` — animations never replay, saving computation
3. GSAP contexts are created with refs and reverted on component unmount — no memory leaks
4. Animations are disabled entirely for `prefers-reduced-motion` users via Framer Motion's `useReducedMotion` hook
5. The loader is SessionStorage-gated — runs once per browser session, never on route changes
6. No infinite animations except: the "exploring" dashed border (CSS, GPU-composited, loop), and the hero floating badges (CSS keyframes, GPU-composited)

---

## Reduced Motion Support

All Framer Motion components respect the system `prefers-reduced-motion` setting:

```tsx
const prefersReducedMotion = useReducedMotion();

// In animation variants:
const variants = prefersReducedMotion
  ? { initial: {}, animate: {}, exit: {} }  // no motion
  : fullAnimationVariants;
```

When reduced motion is active:
- All transforms are removed (no sliding, lifting, or scaling)
- All opacity animations are removed
- State changes remain (colors, borders) — they provide feedback without motion
- Content is never hidden — accessibility is not sacrificed for the reduced motion experience
# 16 — Transitions

## Philosophy: Every Transition Has a Reason

A transition is not a visual effect. It is communication. It communicates: "something changed," "you moved," "this is complete," "that is beginning."

If a transition does not communicate something meaningful, it should not exist.

---

## Transition System Overview

The portfolio uses three layers of transition:

```
Layer 1: Route transitions        — between pages (template.tsx + RouteTransitionOverlay)
Layer 2: Section reveals          — as sections scroll into view (Framer Motion whileInView)
Layer 3: Micro-interactions       — hover, focus, state changes (CSS + Framer Motion)
```

Two systems handle these layers:
- **Framer Motion**: Route page animation, section reveals, interactive state changes
- **GSAP**: The amber sweep overlay, loader, future complex scroll-pinned reveals

---

## Route Transitions

### Phase 1 (Current): Fade + Slide

**File**: `app/template.tsx`

Next.js `template.tsx` re-mounts on every route change. Wraps content in:
```
initial:  { opacity: 0, y: 6 }
animate:  { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOutExpo } }
exit:     { opacity: 0, y: -6, transition: { duration: 0.25, ease: easeIn } }
```

The slight Y movement (6px) gives direction — content enters from below, exits upward. Subtle. The visitor feels movement without being distracted by it.

### Phase 2 (Current): Amber Sweep Overlay

**File**: `components/layout/RouteTransitionOverlay.tsx`

A 2px amber line at the top of the viewport. On pathname change:
1. Line starts at `scaleX: 0, transformOrigin: left center`
2. Sweeps right: `scaleX: 1` in 320ms, `power4.out`
3. Holds briefly (60ms)
4. Sweeps off right: `transformOrigin: right center, scaleX: 0` in 250ms, `power2.in`

Line gradient: `linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B)` — amber with lighter center, creating a shimmer effect as it sweeps.

**Why a progress line?** It is the most readable signal that navigation happened. The visitor's eye is already at the top of the page (where the navbar is). The line validates the click without demanding attention.

### Phase 3 (Future): Project-to-Project Film Cut

When navigating from one project detail page to another:
- The page fades to dark (300ms)
- A full-width horizontal line in the **project's identity color** sweeps left-to-right (400ms)
- New page fades in (300ms)

This creates the sensation of a film reel advancing — appropriate for the "explorer entering a new world" metaphor.

---

## Section Reveals

All sections use `whileInView` with `once: true`. Animation fires once as the section enters the viewport. Never replays.

**Standard section reveal sequence**:
```
whileInView fires when section is 80px from entering viewport (margin: "-80px 0px")

0ms   Heading enters:   opacity 0→1, y 24→0, 700ms easeOutExpo
60ms  Subtitle enters:  same
120ms Content enters:   same (or stagger if grid)
200ms CTA enters:       same
```

**Grid stagger** (project cards, skill cards, note cards):
```
Each card: opacity 0→1, y 16→0, 700ms easeOutExpo
Delay between cards: 40-80ms depending on density
```

---

## Mask Reveals (Phase 3+)

For project screenshots and key images:

```
Initial: clipPath: "inset(100% 0% 0% 0%)"  — fully hidden, bottom edge covers
Animate: clipPath: "inset(0% 0% 0% 0%)"    — fully revealed, top-to-bottom
Duration: 600ms, easeOutExpo
```

This is a "curtain pulling up" reveal. Used on: project gallery thumbnails, hero visual on load.

---

## Text Reveals (Phase 3+)

For the hero statement and major section headings:

**Approach**: Text is split by word using GSAP's `SplitText` plugin (or a custom word-split utility). Each word animates in independently:
```
Initial: y: 40, opacity: 0
Animate: y: 0, opacity: 1
Stagger: 0.04s between words
Duration: 0.6s per word, easeOutExpo
```

The effect: words "fall into place" in sequence, left to right. Feels purposeful rather than theatrical when done at the right speed.

**Not applied to**: body text, descriptions, labels. Only to display-size headings where the animation duration is earned by the visual importance of the text.

---

## Hover Transitions

All hover states use CSS transitions (not JavaScript):

```css
transition-property: transform, opacity, border-color, box-shadow, color;
transition-duration: 150-200ms;
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);  /* easeOutExpo */
```

Using CSS (not Framer Motion `whileHover`) for hover keeps the interaction fast and prevents React re-renders on every hover event.

---

## Loading Transition

The loader fades out via `AnimatePresence` exit animation (350ms, ease-out). The page beneath is already fully rendered — the loader was an overlay, not a blocker. The transition from loader to page is seamless.

---

## Scroll Behavior

`html { scroll-behavior: smooth; }` is set globally. All `#anchor` links benefit from smooth scrolling.

Specific scroll cues:
- Hero scroll indicator → `#recruiter-snapshot`
- Hero "View My Work →" → `#featured-projects`
- About CTA "Let's Build Something Together" → `#contact`
- Footer section links → respective `#anchor` IDs

---

## Reduced Motion

All Framer Motion animations check `useReducedMotion()`. When `prefers-reduced-motion: reduce` is detected:
- All transforms removed (no y-slide, no scale)
- All opacity animations removed
- State changes (colors, borders) retained — they provide feedback without motion
- Content is never hidden — no content depends on animation to become visible
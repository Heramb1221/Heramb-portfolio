# 09 — Loader

## Concept: A Circuit Completing Before the World Appears

The loader is not branding. It is not "showing your logo." It is an **atmospheric moment** — a visual statement that sets the tone for every interaction that follows.

The concept: a circuit drawing itself on a dark screen. The amber lines extend from a center point, branch, fill the screen, pulse once, retract, and reveal `<HC />` in the empty center. Then the world appears beneath it.

What this communicates, without words: *precision, care, technical construction, intentionality.* The visitor understands this before a single component renders.

---

## Sequence

Total duration: **≤ 1.4 seconds**

```
0ms     Screen is dark (#0A0A0F). Nothing visible.

100ms   Center origin dot appears at exact center (400, 300 in 800×600 SVG).
        GSAP: scale 0→1, back.out(2) easing, 150ms.
        Additional junction dots appear with 20ms stagger.

200ms   Four main lines begin extending from center:
        — Up:    (400,300) → (400,0)
        — Down:  (400,300) → (400,600)
        — Left:  (400,300) → (0,300)
        — Right: (400,300) → (800,300)
        GSAP: strokeDashoffset 100%→0%, power4.out, 400ms, 30ms stagger.

200ms   Simultaneously, four diagonal branches extend:
        — NE, NW, SE, SW at 45° angles to screen edges
        GSAP: same timing, opacity 0.6 (secondary importance).

780ms   Pulse: all lines dim to 30% opacity (120ms sine.in).
800ms   Pulse: all lines return to 100% opacity (120ms sine.out).
        The pulse creates the impression of a circuit activating.

950ms   Lines retract: strokeDashoffset 0%→-100%, power3.in, 220ms, 15ms stagger.
        Direction reversal — they disappear back toward center.

980ms   Junction dots scale to 0, fade out, power2.in, 150ms.

1100ms  `<HC />` appears at center:
        GSAP: scale 0.85→1, opacity 0→1, back.out(1.4), 200ms.
        The logo was always there — the circuit was drawing toward it.

1300ms  Brief hold at full opacity.

1400ms  AnimatePresence exit: container fades to transparent, 350ms ease-out.
        The page beneath is already rendered — the loader was overlaying it.
```

---

## SVG Structure

The loader uses a full-viewport SVG (`viewBox="0 0 800 600"`, `preserveAspectRatio="xMidYMid slice"`):

**Elements**:
- 1 origin dot: `cx=400 cy=300 r=3` filled amber
- 4 main lines: horizontal and vertical, `strokeWidth=1`
- 4 diagonal branches: 45° angles, `strokeWidth=0.7`, `opacity=0.6`
- 8 junction dots: at midpoints of arms, `r=2`, circle stroke (not filled)

**Stroke dash animation**: All lines use `strokeDasharray` equal to line length, `strokeDashoffset` initially equal to `strokeDasharray` (invisible). GSAP animates `strokeDashoffset` to 0 (fully visible) and then to negative of the array value (retract through the other end).

---

## GSAP Timeline

```javascript
const tl = gsap.timeline({ onComplete: () => setVisible(false) });

// Dots in
tl.to(dots, { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(2)", stagger: 0.02 }, 0.10);

// Lines extend
tl.to(lines, { strokeDashoffset: "0%", opacity: 1, duration: 0.40, ease: "power4.out", stagger: 0.03 }, 0.20);

// Pulse
tl.to(lines, { opacity: 0.3, duration: 0.12, ease: "sine.in" }, 0.78);
tl.to(lines, { opacity: 1.0, duration: 0.12, ease: "sine.out" }, 0.90);

// Retract
tl.to(lines, { strokeDashoffset: "-100%", opacity: 0, duration: 0.22, ease: "power3.in", stagger: 0.015 }, 0.95);
tl.to(dots, { scale: 0, opacity: 0, duration: 0.15, ease: "power2.in" }, 0.98);

// Logo appears
tl.to(logo, { opacity: 1, scale: 1, duration: 0.20, ease: "back.out(1.4)" }, 1.10);
```

---

## Implementation Details

**Component**: `components/shared/Loader.tsx` — Client Component.

**Session behavior**: `sessionStorage.getItem("hc-loaded")` checked on mount. If found, loader is skipped entirely — `setVisible` never called. If not found, key is set and animation runs. One show per browser session.

**Why sessionStorage, not localStorage**: SessionStorage clears when the tab is closed, so a returning visitor who opens a new tab sees the loader again (appropriate — it re-establishes the experience). LocalStorage would suppress it forever.

**Refs**: `containerRef` (outer div), `svgRef` (SVG element), `logoRef` (HC text div). All refs are used by GSAP. No querySelector — refs only.

**Cleanup**: `return () => { tl.kill(); }` in useEffect. Prevents memory leaks if the component unmounts before the animation completes.

**Z-index**: `z-[200]` — above everything including the route transition overlay (`z-[150]`) and navbar (`z-50`).

---

## Accessibility

- The entire loader container has `aria-hidden="true"` — it is a decorative experience, not content
- No text content (except the `<HC />` logo) — no screen reader reads it
- If JavaScript fails to load, the loader never appears — the page renders normally
- The `AnimatePresence` exit is CSS-based (`opacity: 0`) — the loader disappears regardless of GSAP status

---

## Fallback Behavior

If GSAP fails to load or throws:
- The loader container still renders and fades out via AnimatePresence
- The `onComplete` callback still fires (from GSAP timeline)
- If even that fails, `sessionStorage` is set on component mount before the animation starts — so a broken loader will not repeat

---

## Performance

- SVG is inline, no HTTP request for the loader graphic
- GSAP is code-split — only loaded when the Loader component is needed
- Total animation: pure SVG + CSS transforms, GPU-composited throughout
- No canvas, no WebGL, no image loading
- The loader runs while the page is already rendering beneath it — no actual loading delay
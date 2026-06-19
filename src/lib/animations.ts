import type { Variants, Transition } from "framer-motion";

// ─── Easing ───────────────────────────────────────────────────────────────────
// Typed as a 4-element tuple so Framer Motion accepts it as a BezierDefinition.

type BezierTuple = [number, number, number, number];
const ease: BezierTuple = [0.25, 0.46, 0.45, 0.94];

const defaultTransition: Transition = { duration: 0.4, ease };
const fastTransition: Transition = { duration: 0.22, ease };
const slowTransition: Transition = { duration: 0.55, ease };

// ─── Fade ─────────────────────────────────────────────────────────────────────

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: defaultTransition },
  exit: { opacity: 0, transition: fastTransition },
};

// ─── Slide ────────────────────────────────────────────────────────────────────

export const slideUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: defaultTransition },
  exit: { opacity: 0, y: -12, transition: fastTransition },
};

export const slideDown: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0, transition: defaultTransition },
  exit: { opacity: 0, y: 12, transition: fastTransition },
};

export const slideLeft: Variants = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0, transition: defaultTransition },
  exit: { opacity: 0, x: -16, transition: fastTransition },
};

export const slideRight: Variants = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0, transition: defaultTransition },
  exit: { opacity: 0, x: 16, transition: fastTransition },
};

// ─── Stagger ──────────────────────────────────────────────────────────────────

/** Wrap a list in this; each child should use `staggerItem`. */
export const stagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Child variant paired with `stagger`. */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: defaultTransition },
};

// ─── Hover ────────────────────────────────────────────────────────────────────

/** Spread into a motion component for a subtle upward lift on hover. */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
} as const;

/** Subtle scale-up on hover (for icon buttons, chips). */
export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.18, ease: "easeOut" } },
} as const;

// ─── Page transition ──────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } },
};

// ─── Reveal (scroll-triggered) ────────────────────────────────────────────────

export const reveal: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: slowTransition },
};

// ─── Viewport defaults for whileInView ────────────────────────────────────────

export const defaultViewport = {
  once: true,
  margin: "-80px 0px",
} as const;

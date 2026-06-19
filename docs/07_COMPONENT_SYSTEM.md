# 07 — Component System

## Architecture Principle: One Responsibility Per Component

Every component does exactly one thing. If a component grows beyond ~250 lines, it is split. No component duplicates logic from another. Shared behavior lives in shared components.

---

## Component Hierarchy

```
Layout Components        → Providers, Navbar, Sidebar, Footer, PageTransition
Shared Primitives        → Container, Section, SectionHeading, ContentCard,
                           Badge, Tag, CTAButton, Heading, Loader, ThemeToggle
Feature Sections         → Hero, RecruiterSnapshot, FeaturedProject, SkillsSection,
                           AboutSection, CurrentlyLearning, Timeline,
                           RecommendationsSection, AchievementsSection,
                           CertificationsSection, GitHubActivity, ContactSection
Page Components          → ProjectsGrid, ProjectDetail, ProjectGallery,
                           NotesClient, NoteCard, ProjectCard
```

---

## Navbar

**File**: `components/layout/Navbar.tsx`
**Type**: Client Component (`"use client"` — needs scroll detection + pathname)

**Behavior**:
- Transparent at top of page
- `bg-background/85 backdrop-blur-xl border-b border-border/60` on scroll (threshold: 20px)
- Transition: `transition-all duration-500` — slightly slower than standard to feel deliberate

**Active link**: Animated amber underline using Framer Motion `layoutId="nav-indicator"`. The indicator slides between links with spring physics (`stiffness: 400, damping: 30`). This makes navigation feel physical.

**Logo**: `<HC />` with amber brackets. Group hover dims brackets slightly and warms the text toward primary.

**Resume button**: `bg-primary` (amber), `hover:opacity-90 hover:shadow-primary/20` — the only amber-filled element in the nav.

**Mobile**: Sheet from right, `w-72`. Active mobile links show amber dot prefix + `bg-amber-glow` background. Resume button at bottom of sheet.

**Props**: None — reads from config and pathname internally.

---

## Sidebar

**File**: `components/layout/Sidebar.tsx`
**Type**: Client Component (Tooltip requires client)

**Desktop**: Fixed left column, `top-16` (below navbar), `w-14`, `h-[calc(100vh-4rem)]`. Semi-transparent `bg-background/50 backdrop-blur-sm`. Border right.

**Mobile**: Fixed bottom action bar with icon + label text. `bg-background/90 backdrop-blur-md`. Border top.

**Icons**: GitFork (GitHub), Link (LinkedIn), Code2 (LeetCode), Mail (Email), FileText (Resume). Note: Lucide v1 removed brand icons; these are semantic equivalents.

**Hover**: `hover:bg-muted hover:text-foreground` — subtle muted background, foreground text.

**Tooltips**: Desktop only, `side="right"`, `sideOffset={8}`. No tooltips on mobile (labels are visible).

---

## Loader

**File**: `components/shared/Loader.tsx`
**Type**: Client Component (GSAP + DOM refs)

See `09_LOADER.md` for complete documentation.

**Key behavior**: SessionStorage gated. Shows once per browser session. `z-[200]` — above everything.

---

## ContentCard

**File**: `components/shared/ContentCard.tsx`
**Type**: Server-compatible

**Purpose**: Base card wrapper used by Recommendations, Achievements, Certifications, Notes. Provides consistent: border, rounded-xl, bg-card, shadow-sm, CSS hover lift.

**Props**:
- `children: ReactNode`
- `className?: string`
- `aria-label?: string`
- `noPadding?: boolean` — escape hatch for custom inner padding

**Renders as**: `<article>` — semantic landmark for screen readers.

**Hover**: `hover:-translate-y-1` CSS only, `transition-transform duration-200 ease-out`. No JS listener.

---

## Container / Section / SectionHeading

**File**: `components/shared/Container.tsx`
**Type**: Server-compatible

**Container**: `mx-auto w-full max-w-[1280px] px-6 lg:px-8`

**Section**: `py-16 md:py-24`. Accepts `id` for anchor links. Accepts `as` prop for semantic element override.

**SectionHeading**: `title` + optional `subtitle`. `align="center"` adds `mx-auto` to subtitle to properly center it within container. `className` for spacing overrides.

---

## CTAButton

**File**: `components/shared/CTAButton.tsx`
**Type**: Server-compatible (renders as Link)

**Variants**: `primary` (amber filled), `secondary` (outline), `ghost` (transparent hover)
**Sizes**: `sm` (h-8), `md` (h-10), `lg` (h-11)
**Always**: `rounded-xl` — the design system button border radius

**Key**: This is a Link-based component, not a button. It is used for navigation actions. For form submit, use `<button>` directly.

---

## Badge (Tech Stack)

**File**: `components/shared/Badge.tsx`
**Type**: Server-compatible

Blue-tinted pill. `bg-primary/10 border-primary/20 text-primary`. Used for tech stack on project cards. Distinct from `Tag` (which is muted).

---

## Tag (Category/Status)

**File**: `components/shared/Tag.tsx`
**Type**: Server-compatible

**Variants**: `default` (muted), `primary` (blue-tinted), `success` (emerald), `warning` (amber)
Used for: project status, timeline category, achievement category, availability status.

---

## ProjectCard

**File**: `components/projects/ProjectCard.tsx`
**Type**: Server-compatible

**Contains**: TechnologyBadge, ProjectMetric, ProjectActions (all in same file as named exports)

**Thumbnail**: 16:9 aspect-video, lazy loaded, `next/image` with fill + sizes. Placeholder: project initial letter on muted background.

**Tech badges**: Max 5 shown + "+N more" pill.
**Metrics**: Max 3 shown, extracted from free-form YAML metrics object.
**Status tag**: Mapped to Tag variant by status string.
**Hover**: CSS `-translate-y-1`. Image inside scales `1.02` — subtle kinetic feel.

---

## SkillCard / SkillBadge

**File**: `components/skills/SkillCard.tsx`
**Type**: Server-compatible

**Variants**: `default` (primary/10 icon background), `learning` (amber/10 icon background, dashed border)

The "learning" variant communicates active exploration — the border is not fully defined, like the skill itself.

**SkillBadge**: Muted pill (not primary-tinted like project Badge — intentional distinction: skills are known, project techs are used).

---

## TimelineCard / TimelineIcon

**Files**: `components/timeline/TimelineCard.tsx`, `components/timeline/TimelineIcon.tsx`
**Type**: Server-compatible

**TimelineIcon**: Resolves Lucide icon + color class by `TimelineCategory`. Keeps Lucide imports out of config files.

**Desktop layout**: 3-column alternating grid with vertical center connector line. Even-index entries go left, odd-index go right. Center column holds the icon on the line.

**Mobile layout**: Single column, icon inline-left of card. Two separate DOM renders (`hidden lg:flex` / `flex lg:hidden`), not CSS transforms. No layout shift.

**Highlight variant**: `highlight: true` in YAML adds `border-primary/30` — amber border accent for most important entries.

---

## RecommendationCard

**File**: `components/recommendations/RecommendationCard.tsx`
**Type**: Server-compatible

Uses `<blockquote>` for the message (semantically correct for quoted content) and `<footer>` for the author section. Both are correct HTML for assistive technology.

**Avatar**: Real image if `avatar` URL exists. Initials (2-char) in amber-tinted circle if not. Never a generic silhouette.

---

## NoteCard

**File**: `components/notes/NoteCard.tsx`
**Type**: Server-compatible

**Shows**: category (mono uppercase), reading time, title, description (line-clamp-2), tags (max 4), date, Read link.

---

## ContactForm

**File**: `components/contact/ContactForm.tsx`
**Type**: Client Component (react-hook-form + zod)

**Schema**: zod v4. `name` (min 2), `email` (z.email()), `subject` (min 5), `message` (min 20).
**Validation**: `noValidate` on form — disables browser default UI. Inline error messages via `role="alert"`.
**Submission**: Calls Server Action `sendContactMessage()`. Returns `{ success, message }`.
**States**: Default → Submitting (disabled button, "Sending…") → Success (green checkmark view) → Error (red alert in form).
# 18 — Implementation Roadmap

## Overview

The portfolio is built in phases. Each phase is independently deployable — the site functions at every phase, improving incrementally. No phase requires a complete rebuild of previous work.

---

## Phase 0: Original Build (Complete ✓)

The complete functional portfolio built across Prompts 1–10:

- Full homepage with all 12 sections
- `/projects` with search + filter
- `/projects/[slug]` with case study layout
- `/notes` + `/notes/[slug]` with MDX
- `/resume` with web view + PDF download
- `/achievements` section
- `/playground` placeholder
- Contact form with Server Action
- GitHub API integration
- Sitemap, robots.txt, OG image, JSON-LD
- Dark/light theme
- Responsive across all breakpoints

---

## Phase 1: Foundation (Complete ✓)

**Goal**: Establish the visual and motion foundation. No UI visible — all infrastructure.

**Completed**:
- [x] New color system: warm dark (#0A0A0F) + amber primary (#F59E0B)
- [x] Extended CSS tokens: `--surface`, `--amber`, `--amber-glow`, `--amber-soft`, `--indigo`, `--emerald`
- [x] Amber utilities: `.glow-amber`, `.glow-amber-sm`, `.bg-amber-glow`, `.border-exploring`
- [x] Custom amber scrollbar, amber `::selection`
- [x] GSAP 3.15 installed
- [x] `lib/gsap-config.ts`: plugin registration, easing/duration constants, color tokens
- [x] `lib/animations.ts` rewritten: easeOutExpo primary, tighter stagger, new variants (hoverCard, maskReveal, revealScale, staggerTight)
- [x] `app/template.tsx`: route transition (fade + y-slide)
- [x] `components/shared/Loader.tsx`: GSAP SVG circuit animation (8-arm circuit, amber pulse, HC logo reveal)

---

## Phase 2: Navigation Polish (In Progress)

**Goal**: Navbar and route transitions feel premium.

**In Progress**:
- [x] Navbar redesign: amber active link with `layoutId` spring underline
- [x] `RouteTransitionOverlay`: amber sweep line on route change
- [ ] Sidebar: amber hover states, active state for current page social links
- [ ] Footer: minor polish (already rebuilt in Phase 0, minor amber accent tweaks)
- [ ] Mobile sheet: ensure amber active states render correctly with new color system

---

## Phase 3: Hero Redesign

**Goal**: The hero is alive and kinetic.

**Tasks**:
- [ ] Mouse-responsive particle/grid background (subtle, 5px max parallax)
- [ ] Floating tech badges with independent CSS keyframe drift paths
- [ ] Coordinate label with typewriter-count animation (JetBrains Mono)
- [ ] Rewrite hero copy: "The Explorer." as primary statement
- [ ] Stagger animation on left column content
- [ ] Right column: HC monogram card (Phase 0 placeholder) OR new visual treatment
- [ ] Status badge with emerald dot
- [ ] CTA buttons: primary amber "View My Work →", secondary "Read My Notes"
- [ ] Scroll indicator: fade in at 1.2s

---

## Phase 4: Skills Bento Redesign

**Goal**: The skills section becomes one of the strongest sections.

**Tasks**:
- [ ] Design the full Bento grid layout (variable cell sizes)
- [ ] Implement size-based importance (2×2 for daily tools, 1×1 for secondary)
- [ ] "Exploring" row with amber dashed border animation
- [ ] Category filter tabs with Framer Motion layout animation
- [ ] Hover tooltip showing which projects used each skill
- [ ] Project connection data sourced from YAML cross-reference
- [ ] Mobile: graceful degradation to 2-col then 1-col

---

## Phase 5: Project Visual Identities

**Goal**: Each project detail page has its own world.

**Tasks**:
- [ ] Define identity color for all 21 projects (8 major + 13 others)
- [ ] Apply identity color as CSS custom property (`--project-accent`) on detail page
- [ ] Thumbnail overlay using identity color at 40% on project cards
- [ ] Hover border shifts to project identity color
- [ ] Detail page: accent color on links, headings, borders, tag tints
- [ ] Screenshot gallery with mask-wipe reveal animation
- [ ] Metrics cards stagger in with `staggerTight`
- [ ] Architecture section with scroll-triggered reveal

---

## Phase 6: Notes + Knowledge Graph

**Goal**: Notes become a connected knowledge system.

**Tasks**:
- [ ] Update MDX frontmatter schema: add `relatedProjects`, `relatedNotes` fields
- [ ] Update `lib/notes.ts` to parse and return relation fields
- [ ] `RelatedNotes` component: shown in project detail sidebar
- [ ] `RelatedProjects` component: shown in note detail sidebar
- [ ] Tag pages: `/notes/tag/[tag]` listing all notes with that tag
- [ ] Tag filter on notes listing page
- [ ] Write 8+ notes with meaningful backlinks (minimum for the system to feel rich)
- [ ] Add `relatedProjects` to existing 2 notes

---

## Phase 7: Achievements Page

**Goal**: `/achievements` standalone page is complete.

**Tasks**:
- [ ] Design all category sections (10 categories)
- [ ] Implement placeholder states for empty categories
- [ ] GitHub milestones from API (stars total, repos, streak)
- [ ] Competition cards with placement badges
- [ ] Leadership section (ACM Treasurer detailed view)
- [ ] Arts section (Tabla achievement)
- [ ] Category filter tabs
- [ ] Animation: stagger by category section

---

## Phase 8: Polish + Accessibility

**Goal**: Production-quality on every detail.

**Tasks**:
- [ ] Full keyboard navigation audit (Tab through entire site)
- [ ] Screen reader testing (VoiceOver on macOS)
- [ ] Color contrast audit (all text combinations)
- [ ] `prefers-reduced-motion` implementation across all animations
- [ ] Missing `alt` text audit
- [ ] Focus ring visibility audit on all interactive elements
- [ ] Heading hierarchy audit (single h1 per page)
- [ ] Mobile testing: iOS Safari, Android Chrome
- [ ] Tablet testing: iPad landscape + portrait
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge

---

## Phase 9: Performance + SEO

**Goal**: Lighthouse 95+ across all metrics.

**Tasks**:
- [ ] Bundle size analysis (`@next/bundle-analyzer`)
- [ ] Dynamic imports for heavy components (GSAP, Framer Motion)
- [ ] Image optimization audit (correct sizes, formats, lazy loading)
- [ ] Font loading optimization (preload, display: swap)
- [ ] Core Web Vitals: LCP, FID, CLS targets
- [ ] Structured data validation (Google Rich Results Test)
- [ ] Sitemap validation
- [ ] OG image validation (Open Graph Debugger)
- [ ] Meta description uniqueness audit

---

## Phase 10: Deployment

**Goal**: Live on Vercel with all environment variables configured.

**Tasks**:
- [ ] Vercel project setup
- [ ] Environment variables: `NEXT_PUBLIC_SITE_URL`, `GITHUB_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL`
- [ ] Custom domain setup
- [ ] Edge config for GitHub API (if needed)
- [ ] Analytics (Vercel Analytics or Plausible)
- [ ] Error monitoring (Sentry or Vercel observability)
- [ ] Production smoke test: every page, every form, every link

---

## Phase 11: Content Growth

**Goal**: The portfolio grows organically over time.

**Ongoing tasks**:
- [ ] Write 2 notes per month
- [ ] Update project YAMLs as projects receive updates
- [ ] Add new projects to `/Projects/` directory as built
- [ ] Update timeline config as milestones occur
- [ ] Update `config/learning.ts` as skills evolve
- [ ] Update resume config with new experience/education

---

## Dependency Map

```
Phase 1 must complete before Phase 2, 3, 4, 5, 6
Phase 3 must complete before Phase 5
Phase 6 must complete before Phase 7
Phase 7, 8, 9 can run in parallel
Phase 10 requires Phase 8 + 9 complete
Phase 11 is continuous and has no dependencies
```
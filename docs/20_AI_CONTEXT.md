# 20 — AI Context
## The Complete Portfolio Brief for a Fresh Claude Session

Read this file first. It allows you to understand the entire project in under 5 minutes and contribute immediately without needing the original conversation history.

---

## Who This Is For

**Owner**: Heramb Vinayak Chaudhari
**Context**: 3rd-year Computer Engineering student at R.C. Patel Institute of Technology (RCPIT), Shirpur, Maharashtra. 8.93 CGPA.
**Goal**: A portfolio that earns the reaction "this feels different" — not just technically correct but genuinely memorable.

**Audiences**:
- Recruiters (12 seconds): need name, role, proof of work, contact
- Engineers (8 minutes): want to understand how Heramb thinks
- Startup founders (3 minutes): want evidence of shipping + curiosity

---

## The Central Concept: The Explorer's Atlas

Heramb is not a specialist. He is **The Explorer** — an engineer who crosses territories (web, mobile, desktop, AI, backend) with intention and documents what he finds.

The portfolio is an **atlas of explored territories**. Every design decision — the color system, the loader, the section order, the note system — maps to this concept.

**The emotional goal**: When someone closes this portfolio tab, they carry an impression they can't quite articulate — like humming a song without remembering the lyrics. Felt, not just seen.

---

## Tech Stack

```
Framework:    Next.js 16 (App Router)
Language:     TypeScript (strict)
Styling:      Tailwind CSS v4
UI:           shadcn/ui (base-lyra variant, @base-ui/react primitives)
Animation:    Framer Motion 12 + GSAP 3.15
Theme:        next-themes (dark default)
Forms:        react-hook-form + zod v4 + @hookform/resolvers
MDX:          next-mdx-remote v6 (RSC version)
YAML:         js-yaml (NOT gray-matter — files have no --- delimiters)
Icons:        lucide-react v1 (no Github/Linkedin icons — removed in v1)
Images:       Cloudinary (res.cloudinary.com)
Deployment:   Vercel
```

---

## Color System (Critical — Read Before Touching Styles)

**Dark theme (default)**:
```
Background:  oklch(0.082 0.010 280)  — warm near-black, violet undertone
Card:        oklch(0.115 0.013 275)  — slightly elevated surface
Primary:     oklch(0.735 0.165 65)   — AMBER #F59E0B (the explorer's lantern)
Foreground:  oklch(0.962 0.006 240)  — off-white #F1F5F9
Muted:       oklch(0.640 0.025 225)  — blue-gray #94A3B8
Border:      oklch(1 0 0 / 8%)       — white at 8% opacity
```

**The most important fact**: Primary = AMBER. Not blue. Not purple. Amber. This affects everything that uses `text-primary`, `bg-primary`, `border-primary`.

**Extended tokens**: `--amber`, `--amber-glow`, `--amber-soft`, `--indigo`, `--emerald`, `--surface`

**Light theme**: Warm white (#FAFAF8) background, deeper amber (#D97706) primary. Also exists but dark is default.

---

## Typography System

```
Sans:  Inter (via next/font, variable: --font-inter, applied to html as font-sans)
Mono:  JetBrains Mono (variable: --font-mono)
```

**Key behavior**: JetBrains Mono is used in UI as well as code — dates, coordinates, category labels, the `<HC />` logo. This is intentional. It creates a "technical document made beautiful" aesthetic.

---

## Motion System

**Two animation libraries with distinct roles**:
- **Framer Motion**: React state animations, section reveals (whileInView), page transitions, interactive hover states
- **GSAP**: Loader SVG animation, route transition overlay, future complex scroll sequences

**Easing system** (use these, not arbitrary values):
```
easeOutExpo (primary reveal):  cubic-bezier(0.16, 1, 0.3, 1) / "power4.out"
easeInOut (state changes):     cubic-bezier(0.4, 0, 0.2, 1)  / "power2.inOut"
easeIn (exits):                cubic-bezier(0.4, 0, 1, 1)    / "power2.in"
```

**Duration scale** (from `lib/animations.ts`):
```
micro: 150ms, fast: 250ms, base: 400ms, slow: 600ms, reveal: 700ms, page: 850ms
```

**Stagger**: `stagger` (0.06s), `staggerTight` (0.04s for dense grids)

**Forbidden**: bounce, rotate, flip, glitch, flash, heavy parallax, infinite animations (except ambient elements)

---

## File Architecture

```
src/
├── app/
│   ├── layout.tsx           ← Server, persists across routes, JSON-LD
│   ├── template.tsx         ← Client, re-mounts on route change, page transition
│   ├── page.tsx             ← Server, homepage, reads all data
│   ├── actions/contact.ts   ← Server Action, Resend-ready
│   ├── api/og/route.tsx     ← Edge, OG image via next/og
│   ├── api/resume/route.ts  ← PDF download
│   ├── notes/               ← Server Component pages
│   ├── projects/            ← Server Component pages + [slug]
│   ├── resume/              ← Server Component
│   └── playground/          ← Static placeholder
│
├── components/
│   ├── layout/              ← Navbar, Sidebar, Footer, Providers, RouteTransitionOverlay
│   ├── shared/              ← Container, ContentCard, Badge, Tag, CTAButton, Loader, ThemeToggle
│   ├── hero/                ← Hero, HeroVisual
│   ├── projects/            ← ProjectCard, ProjectDetail, ProjectGallery, ProjectsGrid, FeaturedProject
│   ├── skills/              ← SkillCard, SkillsSection
│   ├── about/               ← HighlightCard, AboutSection
│   ├── learning/            ← LearningCard, CurrentlyLearning
│   ├── timeline/            ← TimelineIcon, TimelineCard, Timeline
│   ├── recommendations/     ← RecommendationCard, RecommendationsSection
│   ├── achievements/        ← AchievementCard, Achievements
│   ├── certifications/      ← CertificationCard, CertificationsSection
│   ├── github/              ← GithubStats, GitHubRepoCard, GitHubActivity
│   ├── contact/             ← ContactInfo, ContactForm, ContactSection
│   └── notes/               ← NoteCard, NotesClient
│
├── config/
│   ├── site.ts              ← siteConfig (name, links, author, keywords)
│   ├── navigation.ts        ← navItems array
│   ├── socials.ts           ← socialLinks array (uses semantic Lucide icons, no brand icons)
│   ├── skills.ts            ← skillCategories with Lucide icons
│   ├── about.ts             ← paragraphs + highlight cards
│   ├── learning.ts          ← learningItems (LearningStatus, LearningCategory)
│   ├── timeline.ts          ← timelineEntries (TimelineCategory, icon string names)
│   └── resume.ts            ← education, experience
│
├── lib/
│   ├── url.ts               ← siteUrl helper (NEXT_PUBLIC_SITE_URL fallback)
│   ├── utils.ts             ← cn() (clsx + tailwind-merge)
│   ├── animations.ts        ← All Framer Motion variants + duration/easing exports
│   ├── gsap-config.ts       ← GSAP registration, easing/duration/color constants
│   ├── projects.ts          ← getFeaturedProjects, getAllProjects, getProjectBySlug, getAllCategories
│   ├── content.ts           ← getRecommendations, getAchievements, getCertifications
│   ├── notes.ts             ← getNotes, getNoteBySlug (gray-matter + reading-time)
│   └── github.ts            ← getGitHubData (fetch + next.revalidate:3600)
│
└── types/
    ├── project.ts           ← Project interface + getThumbnailUrl, extractDisplayMetrics, getStatusVariant
    ├── recommendation.ts    ← Recommendation + getInitials
    ├── achievement.ts       ← Achievement + getCategoryColour
    ├── certificate.ts       ← Certification
    └── note.ts              ← Note
```

---

## Known Critical Decisions

### js-yaml vs gray-matter
Project YAML files (`src/content/projectsdetails/`) are **plain YAML** with NO `---` front-matter delimiters. `gray-matter` returns empty data for these. Use `js-yaml.load()` directly. Only note MDX files use gray-matter (they have proper front-matter).

### Lucide React v1
Brand icons (Github, Linkedin) were removed in v1. Use semantic equivalents: `GitFork` for GitHub, `Link` (aliased as `LinkIcon` to avoid collision with next/link) for LinkedIn, `Code2` for LeetCode.

### Sidebar offset
The sidebar is `fixed left-0 w-14`. All main content needs `md:pl-14` to prevent underlap. This offset is on the flex wrapper in `layout.tsx`.

### next-mdx-remote v6 API
Uses `import { MDXRemote } from "next-mdx-remote/rsc"` (the RSC version). No `serialize()` step. Pass `source={note.content}` directly. This is a Server Component.

### Zod v4 email
`z.email()` not `z.string().email()` — the `.email()` method moved to a standalone type in zod v4.

### Recommendations directory
`src/content/recommendations/` was created in this project (didn't exist before). 4 YAML files exist.

---

## Implementation Status

| Phase | Status | Description |
|---|---|---|
| Phase 0 | ✓ Complete | Full functional portfolio (all sections, all pages) |
| Phase 1 | ✓ Complete | Color system, GSAP, motion foundation, GSAP loader |
| Phase 2 | ⟳ In Progress | Navbar amber polish, RouteTransitionOverlay |
| Phase 3 | ○ Pending | Hero redesign (kinetic, explorer identity) |
| Phase 4 | ○ Pending | Skills Bento grid redesign |
| Phase 5 | ○ Pending | Project visual identities (per-project color) |
| Phase 6 | ○ Pending | Notes + Knowledge graph |
| Phase 7 | ○ Pending | Achievements standalone page |
| Phase 8 | ○ Pending | Accessibility + mobile audit |
| Phase 9 | ○ Pending | Performance + SEO optimization |
| Phase 10 | ○ Pending | Production deployment |

---

## Rules for Any Claude Session Working on This Project

1. **Read `docs/19_PROJECT_RULES.md`** before writing any code
2. **Never hardcode content** — all data from YAML/config files
3. **Never use inline styles** in JSX (except GSAP animation overrides with justification)
4. **Never animate for decoration** — every animation must pass the removal test
5. **Always check file size** — components should not exceed ~250 lines; split if needed
6. **Always use `js-yaml`** for project/content YAMLs, `gray-matter` for MDX front-matter only
7. **Always use the easing system** from `lib/animations.ts` and `lib/gsap-config.ts`
8. **Always run `npx tsc --noEmit`** before committing — zero TypeScript errors required
9. **Always commit atomically** — one logical change per commit with descriptive message
10. **Never break the section order** on the homepage — it is a deliberate UX strategy

---

## How to Start a New Phase

1. Read `docs/18_IMPLEMENTATION_ROADMAP.md` for the phase tasks
2. Read `docs/19_PROJECT_RULES.md` for the rules
3. Read the relevant section doc (e.g., `docs/10_HERO.md` for Phase 3)
4. Pull latest from `main` branch
5. Read the current state of all files that will be modified
6. Implement one task at a time, TypeScript check after each
7. Commit atomically with a descriptive message
8. Update this file (`20_AI_CONTEXT.md`) if implementation status changes

---

## Repository

GitHub: `https://github.com/Heramb1221/Heramb-portfolio`
Branch: `main`
Project directory: `portfolio-v2/`
Docs directory: `portfolio-v2/docs/`
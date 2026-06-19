# 08 — Page Architecture

## Layout Structure

```
app/layout.tsx (Server Component — persists across all routes)
├── <html> with font variables, suppressHydrationWarning
├── <body>
│   └── Providers (Client — ThemeProvider boundary)
│       ├── Loader (Client — GSAP circuit animation)
│       ├── Navbar (Client — scroll + pathname)
│       ├── Sidebar (Client — tooltips)
│       ├── RouteTransitionOverlay (Client — amber sweep)
│       └── <div.flex-col.md:pl-14>  ← offsets for sidebar
│           ├── <main.pt-16.pb-16.md:pb-0>
│           │   └── {children}  ← from template.tsx
│           └── Footer (Server)

app/template.tsx (Client — re-mounts on every route change)
└── motion.div (page fade transition)
    └── {children}  ← actual page content
```

**Why `md:pl-14`**: The sidebar is 56px (`w-14`) and `fixed`. Without this offset, content underlaps the sidebar on laptop screens where the container fills the viewport.

**Why template.tsx over layout.tsx for transitions**: `layout.tsx` persists — it does not re-mount between routes. `template.tsx` is re-instantiated on every navigation, which is required for entry animation on the new page.

---

## Homepage (`/`)

**Type**: Server Component

**Data fetched at render** (synchronous, file system):
- `getProjectCount()` → number
- `getFeaturedProjects()` → Project[] (6 files)
- `getRecommendations()` → Recommendation[] (4 files)
- `getAchievements()` → Achievement[] (6 files)
- `getCertifications()` → Certification[] (10 files)

**Data fetched async** (HTTP, cached):
- `getGitHubData()` → via `<Suspense>` around `<GitHubActivity>`

**Section order** (enforced, never change):
```
Hero
RecruiterSnapshot
FeaturedProject
SkillsSection
AboutSection
CurrentlyLearning
Timeline
RecommendationsSection
AchievementsSection
CertificationsSection
<Suspense><GitHubActivity /></Suspense>
ContactSection
```

---

## Projects Page (`/projects`)

**Type**: Server Component (data) + Client Component (search/filter UI)

**Data**: `getAllProjectsSorted()` → 21 projects (6 featured + 15 regular, featured first)

**`ProjectsGrid` (Client)**: Receives all projects as prop. `useState` for query and active category. `useMemo` for filtering. No URL params — local state is sufficient (filtered URLs are not a recruiter use case).

**Grid**: 3-col desktop, 2-col tablet, 1-col mobile. Reuses `ProjectCard` — no new card design.

---

## Project Detail Page (`/projects/[slug]`)

**Type**: Server Component

**Static**: `generateStaticParams()` pre-builds all 21 slugs at build time. Zero server computation per request.

**Data**: `getProjectBySlug(slug)` → searches both Featured and Projects directories. Returns `null` for invalid slugs → `notFound()`.

**`generateMetadata`**: Async, uses `params.slug` to generate page title + description from project YAML.

**Rendered by**: `ProjectDetail` component — full case study layout.

**Each project detail has its own visual identity** (Phase 3 implementation): accent color applied to page theme, card overlays, section accents.

---

## Notes Page (`/notes`)

**Type**: Server Component (data + metadata) + Client Component (search)

**Data**: `getNotes()` → reads MDX files from `content/notes/`, extracts frontmatter + reading time.

**`NotesClient`**: Receives notes as prop. `useState` search filtering across title, tags, category.

**Why Server Component for the page?** So `export const metadata` can be declared — Client Components cannot export Next.js metadata.

---

## Note Detail Page (`/notes/[slug]`)

**Type**: Server Component

**Static**: `generateStaticParams()` pre-builds all known note slugs.

**Rendering**: `MDXRemote` from `next-mdx-remote/rsc` — the RSC (React Server Component) version in v6. No serialization step needed.

**Custom MDX components**: h1-h3, p, ul, li, a (auto-external links), code (inline), pre (fenced blocks), blockquote — all styled to the design system.

**Sidebar** (Phase 4): Related projects + related notes pulled from frontmatter `relatedProjects` + `relatedNotes` fields.

---

## Resume Page (`/resume`)

**Type**: Server Component

**Data pulled from**:
- `siteConfig` — personal info, email, location
- `skillCategories` — from `config/skills.ts`
- `getCertifications()` — top 10
- `getFeaturedProjects()` — top 4

**PDF download**: Anchor tag `href="/api/resume"` with `download` attribute. Route at `app/api/resume/route.ts` serves the file with `Content-Disposition: attachment`.

**Print styles**: Future consideration — `@media print` styles to make the web resume printable.

---

## Achievements Page (`/achievements`)

**Type**: Server Component + animated Client grid

**Current**: Achievements section exists on homepage. Standalone `/achievements` page is Phase 7.

**Future page structure**:
- Competitions & Hackathons
- Certifications (linked to `/certifications`)
- Open Source (GitHub PR count, Hacktoberfest)
- GitHub Milestones (stars, followers — from GitHub API)
- Academic (CGPA, rank)
- Leadership (ACM Treasurer)
- Community

All sections designed even if currently empty — placeholder states are designed, not broken.

---

## Playground Page (`/playground`)

**Type**: Server Component (static placeholder)

**Current**: Professional "Coming Soon" page. FlaskConical icon, description, Back Home button.

**Future**: Interactive demos, creative experiments, side projects. Should feel visually distinct from the main portfolio while using the same design system tokens.

---

## 404 Page (`not-found.tsx`)

**Current**: Next.js default.

**Future** (Phase 8): Custom 404 with:
- Large amber-tinted "404" in display type
- "This territory hasn't been explored yet."
- Back Home + Browse Projects CTAs
- Subtle animation consistent with the site

---

## API Routes

```
GET /api/resume    — Serves resume.pdf with Content-Disposition: attachment
GET /api/og        — Generates 1200×630 OG image via next/og ImageResponse
                     Edge runtime for speed
```

---

## Data Layer Architecture

```
File system (synchronous, build-time):
  lib/projects.ts    → getFeaturedProjects, getAllProjects, getProjectBySlug, getAllCategories
  lib/content.ts     → getRecommendations, getAchievements, getCertifications
  lib/notes.ts       → getNotes, getNoteBySlug

Network (async, cached):
  lib/github.ts      → getGitHubData() — fetch with next.revalidate: 3600

Config (static module):
  config/site.ts     → siteConfig (name, links, author)
  config/skills.ts   → skillCategories
  config/about.ts    → aboutContent (paragraphs, highlights)
  config/learning.ts → learningItems
  config/timeline.ts → timelineEntries
  config/resume.ts   → education, experience
```

All file system reads use `js-yaml` (not `gray-matter`) because the content files are **plain YAML** without front-matter delimiters. `gray-matter` returns empty data for plain YAML. `js-yaml.load()` returns the full parsed object.

Note files use front-matter delimiters and are parsed with `gray-matter` in `lib/notes.ts`.
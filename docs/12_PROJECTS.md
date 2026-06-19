# 12 — Projects

## Philosophy: Each Project Is Its Own World

The most important design decision for the projects system: **each project has a visual identity**. Not just different screenshots — different color temperature, different accent treatment, different emotional tone.

This communicates the "explorer" concept through visual design: each project was a distinct territory, approached on its own terms, not a copy-paste of the previous one.

---

## Project Color Identities

```
ConverseCloud:  Blue-violet   #4F46E5  — communication, waves, real-time connection
LoomCV:         Emerald       #059669  — growth, professional, SaaS product
Reverie:        Deep purple   #7C3AED  — introspective, emotional, night mode
Markowl:        Warm orange   #EA580C  — desktop app, native feel, craft
Coditor:        Cyan          #0891B2  — code, terminal, precision
ACM Website:    Red-orange    #DC2626  — community, energy, institution
HeartWave:      Rose          #E11D48  — music, sync, shared listening
Afterglow:      Gold          #D97706  — cinematic, premium, GSAP showcase
```

These identity colors appear on:
- Project card: colored overlay on thumbnail at 40% opacity
- Project card: hover border shifts to project's identity color
- Project detail page: accent color used throughout (links, headings, tags, borders)
- Tech badges in detail: tinted with project color instead of global amber

---

## Project Card

**Thumbnail**: Full-width 16:9 image. Identity color overlay at 40% opacity creates visual distinction without hiding the screenshot. On hover, image scales 1.02 within the overflow-hidden container.

**Status badge**: Positioned at top-right of thumbnail overlay. "Completed" → emerald. "Active Development" → amber. Others → muted.

**Body**:
- Category label (JetBrains Mono, 11px, uppercase)
- Title (Inter semibold, 15px)
- Description (2-line clamp, muted)
- Tech badges (max 5 + "+N more")
- Metrics (max 3, extracted from YAML)
- Action buttons: GitHub | Live Demo | Case Study

**Hover**: `-translate-y-1` lift + border shifts to project identity color.

---

## Projects Page (`/projects`)

**Search**: Real-time filtering across title, technologies, and category. Search input with clear button. Result count displayed.

**Category filter**: Pills derived from actual project categories (not hardcoded). Click to filter. "All" resets.

**Grid**: 3-col desktop, 2-col tablet, 1-col mobile.

**Ordering**: Featured projects first (alphabetical), then regular projects (alphabetical). Featured = from the "Featured projects" YAML directory.

**Empty state**: Designed — not a broken missing-content state.

---

## Data Source

All project data from YAML files in `src/content/projectsdetails/`:
- `Featured projects/` — 6 projects (shown on homepage)
- `Projects/` — 15 projects (shown on /projects page)

YAML schema (critical fields for display):
```yaml
title:          string
description:    string (multiline >)
category:       string
featured:       boolean
status:         string
technologies:   string[]
github:         string | null
liveDemo:       string | null
screenshots:    Array<{caption: url}>
metrics:        Record<string, unknown>
overview:       string
problem:        string
solution:       string
architecture:   string
challenges:     string[]
lessonsLearned: string[]
futureImprovements: string[]
```

**Loader**: `lib/projects.ts` using `js-yaml`. NOT gray-matter — the YAML files have no front-matter delimiters.

---

## GitHub + Live Demo Buttons

Both buttons only render if the URL exists in the YAML. `null` or empty = button hidden. Never renders broken links.

GitHub opens in new tab. Live Demo opens in new tab. Case Study navigates to `/projects/[slug]`.

---

## Future: Horizontal Scroll View

The projects page could support a toggle between grid view (current) and horizontal scroll view (each project is a full-width panel, scroll right to advance). This is a Phase 6 consideration — only if the current grid underperforms.
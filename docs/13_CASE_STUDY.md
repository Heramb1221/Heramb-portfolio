# 13 — Case Study (Project Detail)

## Philosophy: Engineering Post-Mortem, Not Marketing

The case study is the most important page for technical evaluators — engineers, CTOs, senior developers. It must communicate: *how does this person think? What tradeoffs did they make? Do they understand what they built?*

A case study that reads like a landing page fails engineers. A case study that reads like an internal engineering post-mortem impresses them.

Tone: **clinical, honest, specific**. Not "I built an amazing app." But: "The WebSocket lifecycle in React requires explicit cleanup — I solved this with a dedicated `useStreamUser` hook that coordinates auth state with Stream initialization."

---

## Page Structure

```
[Back to Projects link]

[Project header]
  ├── Category label (JetBrains Mono)
  ├── Project title (h1, display size)
  ├── Description (sub-heading)
  ├── Full technology stack (badges)
  └── Action buttons: GitHub | Live Demo

[Screenshots gallery — full width, 2-col grid]

[Key Metrics — 2-col grid of metric cards]

[Overview — prose]

[Problem — prose]
  "The problem this project solved and why it was worth solving."

[Solution — prose]
  "The architectural approach and key decisions."

[Architecture — prose]
  "How the system is structured. Data flow, service boundaries, decisions."

[Challenges — bullet list with CheckCircle icons]

[Lessons Learned — bullet list with CheckCircle icons]

[Future Improvements — bullet list with CheckCircle icons]
```

---

## Project Visual Identity on Detail Pages

Each project detail page applies its identity color as an accent throughout:

- Section divider lines use the project color
- Tech badge borders use the project color
- The Back button's hover color is the project color
- Link hover states use the project color
- Screenshot gallery uses the project color as frame accent

This makes navigating between projects feel like entering different worlds — not reading different entries in a database.

---

## Screenshots Gallery

Component: `ProjectGallery`

2-column responsive grid. Each item is a `<figure>` with `<figcaption>`. `next/image` with `loading="lazy"` and correct `sizes` attribute.

YAML screenshot format:
```yaml
screenshots:
  - "Caption text": "https://res.cloudinary.com/..."
  - "Another caption": "https://..."
```

Each item is a single-key object. The key is the caption. The value is the Cloudinary URL.

If no screenshots exist: gallery is hidden entirely (not shown with empty state).

---

## Metrics Display

Metrics in YAML are a free-form object:
```yaml
metrics:
  themesAvailable: "30+"
  authentication: "JWT + httpOnly Cookies"
  architecture: "MERN Stack"
  realtimeServices: [Stream Chat, Stream Video]
```

**Extraction logic** (`extractDisplayMetrics()`):
- Skip boolean values — not descriptive
- String values: display as-is
- Array values: join first 2 elements with " · "
- Max 3 metrics shown on card, max 6 on detail page

---

## Scroll-Triggered Animations (Phase 3+)

On the project detail page:

- Screenshots reveal with mask wipe (`clipPath: "inset(100% 0% 0% 0%)" → "inset(0%)"`) as they enter viewport
- Architecture section: if an architecture diagram image is provided, it fades in with a slight scale from 0.95 → 1.0
- Challenges list: items stagger in with `staggerItem` as section enters viewport
- Metrics grid: cards stagger in with `staggerTight`

---

## Related Notes (Phase 4)

Below the main case study content, a "Engineering Notes from this build" section:

```
[Engineering Notes]
  ├── [Note card: Why I chose Cloudinary] (5 min read)
  ├── [Note card: Resume parsing research] (8 min read)
  └── [Note card: Server Actions deep dive] (6 min read)
```

Pulled from notes where `relatedProjects` in frontmatter includes this project's slug.

---

## SEO

Each project detail page has `generateMetadata()`:
- `title`: project title
- `description`: project description from YAML
- `openGraph`: title, description, type: "article"
- `alternates.canonical`: `${siteUrl}/projects/${slug}`

---

## Static Generation

`generateStaticParams()` returns all 21 project slugs. Every project detail page is pre-built at compile time — zero server computation per request, maximum performance.
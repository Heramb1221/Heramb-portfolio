# 14 — Notes System

## Philosophy: The Expedition Diary

Notes are the expedition diary — raw thinking made beautiful. They communicate something no project showcase can: **how this engineer processes what they build**.

A visitor who reads one note should feel they understand how Heramb thinks, not just what he has built. The notes are the connective tissue between projects — they show the research, the tradeoffs, the "why this instead of that."

---

## Content Philosophy

### What Goes in Notes

**Project Notes (70%)**: Engineering decisions from real builds.
- Why a specific architecture was chosen
- A bug that took hours to find and what it taught
- Performance optimizations with real numbers
- Security decisions and their tradeoffs
- Refactoring decisions and the reasoning
- Technical comparisons ("Why I chose X over Y")

**Learning Notes (30%)**: Journal of active exploration.
- Notes from learning .NET coming from Node.js background
- Docker mental model (containers vs VMs, explained for engineers who know neither)
- System design patterns encountered while studying
- "What I didn't understand at first" — honest learning logs

### What Does NOT Go in Notes
- Tutorial summaries (notes about things learned from other tutorials — not original thinking)
- Technology marketing copy ("React is great because...")
- Generic content with no specific decision or observation

---

## Visual Design: Substack-Inspired Blog

The notes listing and detail pages feel like a well-designed personal blog, not a portfolio component.

**Listing page**: Grid of cards (3-col desktop, 2-col tablet, 1-col mobile). Each card: category chip (JetBrains Mono), reading time, title, 2-line description, max 4 tags, date, "Read →" link.

**Detail page**: Single-column prose, maximum 720px width, centered. Editorial typographic treatment. Large title. Tags and reading time before content. Generous line height (1.75). No sidebar competing with reading.

**Reading experience**: The goal is that reading a note feels like reading a well-written engineering blog post. Not like reading a JIRA ticket. Not like reading documentation. Personal, specific, considered.

---

## File Format

Notes are MDX files with YAML front-matter:

```mdx
---
title: Building ConverseCloud — Real-Time Language Exchange Platform
description: Technical deep dive into building a full-stack language exchange platform with React, Node.js, Stream SDK, and WebRTC video calling.
date: 2024-11-15
category: Project Notes
tags: [React, Node.js, MongoDB, WebRTC, Socket.IO, Stream SDK, Full Stack]
relatedProjects: [conversecloud]
relatedNotes: [auth-patterns, jwt-vs-sessions]
---

## Overview

Content in Markdown...
```

---

## Knowledge Graph: Connecting Notes to Projects

This is the system's most important feature. It transforms the portfolio from a showcase into a **demonstration of engineering thinking**.

### Frontmatter Schema for Relations

```yaml
relatedProjects: [loomcv, conversecloud]     # project slugs
relatedNotes: [auth-patterns, cloudinary]    # note slugs
```

### What This Enables

**On project detail pages**: A "Engineering Notes from this build" section appears, showing related note cards with titles, reading times, and preview.

**On note detail pages**: A "Referenced in Projects" sidebar appears, showing thumbnails of projects that this note relates to.

**On the notes listing**: Filter by `relatedProjects` to see all notes for a specific project.

**Tag pages**: Click any tag to see all notes + projects sharing that tag.

### Bidirectional Navigation

```
[Note: Why I chose Cloudinary]
  └── Referenced in Projects
      └── [LoomCV thumbnail] LoomCV — AI Resume Builder

[Project: LoomCV]
  └── Engineering Notes
      ├── Why I chose Cloudinary (5 min read)
      ├── Resume parsing research (8 min read)
      └── Server Actions deep dive (6 min read)
```

The visitor can start at either end and discover the other. This creates genuine depth — the portfolio has layers.

---

## MDX Rendering

Uses `next-mdx-remote/rsc` v6 (the React Server Component version). No serialization step. The MDX is rendered on the server, no client-side parsing.

**Custom MDX components** (all styled to the design system):

| Element | Styling |
|---|---|
| `h1` | 2xl bold, tight tracking, text-foreground |
| `h2` | xl semibold, mt-8 before, text-foreground |
| `h3` | base semibold, mt-6, text-foreground |
| `p` | sm, leading-relaxed, text-muted-foreground, mb-4 |
| `ul` | flex-col gap-1.5, disc list markers in primary |
| `li` | sm, text-muted-foreground |
| `a` | text-primary, underline-offset-4, hover:underline, auto-external links |
| `code` | rounded bg-muted px-1.5 py-0.5 font-mono text-xs |
| `pre` | rounded-xl border bg-muted p-4, overflow-x-auto, font-mono |
| `blockquote` | border-l-2 border-primary pl-4 italic text-muted-foreground |

---

## Search

Real-time search across: title, tags, category. Powered by `useState` + `useMemo` filtering in `NotesClient`. No external search library needed at current content volume.

Future (when notes exceed 50+): Replace with `Fuse.js` (already installed) for fuzzy search. No UI changes required — only swap the filter function.

---

## Reading Time

Computed at load time using the `reading-time` library (already installed). Assumes average reading speed of 200 words per minute. Displayed as "X min read" in the NoteCard and at the top of detail pages.

---

## Static Generation

`generateStaticParams()` in `notes/[slug]/page.tsx` returns all note slugs. Every note is pre-built at compile time.

---

## Future: Graph View

A visual graph showing connections between notes and projects — nodes and edges. Notes are circular nodes, projects are square nodes. Tags create cluster groups. Clicking a node navigates to it.

This is an ambitious feature. Prerequisites:
- At least 20 notes with meaningful backlinks
- D3.js or Cytoscape.js integration
- Route: `/notes/graph`

Not in the current roadmap but architecturally supported by the `relatedProjects` + `relatedNotes` frontmatter schema.

---

## Content Directory

```
src/content/notes/
├── building-conversecloud.mdx
├── learning-dotnet.mdx
└── [future notes...]
```

To add a note: create a new `.mdx` file. It appears automatically. No code changes.
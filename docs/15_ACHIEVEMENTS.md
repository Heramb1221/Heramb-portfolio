# 15 — Achievements

## Philosophy: The Trophy Room

Achievements are not a list of credentials. They are milestones that demonstrate something beyond technical skill — participation, recognition, leadership, community contribution. Each achievement is evidence of a different kind of engineering quality.

The design goal: a "trophy room" where each achievement feels individually significant, not like a bulk export from a CV generator.

---

## Categories (Designed for Future Scalability)

Every category below is designed now, even if currently empty. Empty categories show placeholder states — designed outlines of what will be, not broken missing-content boxes.

### 1. Competitions & Hackathons
**Current entries**: Animeverse (Winner), Cyber Dhamaka (1st place, 44 teams)

**Card design**: Placement badge prominently displayed. Competition name. Organization. Date. Description of achievement. View credential link if available.

**Placement badge colors**:
- 1st place: Amber (gold equivalent in the design system)
- 2nd place: `oklch(0.78 0.015 220)` — silver tone
- 3rd place: `oklch(0.65 0.08 50)` — bronze tone
- Participation: muted

### 2. Open Source
**Current entries**: Hacktoberfest 2023, Hacktoberfest 2024

**Card design**: PR count if available. Repository names. Impact description. Badge/holopin link.

**Future**: GitHub contribution heatmap (API-sourced), total PRs merged across repos, starred repos count.

### 3. Certifications
**Current entries**: 10 certifications (displayed in Certifications section on homepage)

The standalone Achievements page links to the Certifications section or shows a summary grid of all certs with issuer, date, and credential link.

### 4. Cloud & Learning Programs
**Current entries**: Google Arcade Program Completion, Oracle OCI AI Foundations

**Card design**: Program name, platform, date, what was learned/earned.

### 5. Academic
**Current entries**: 8.93 CGPA at RCPIT

**Card design**: Institution, degree, CGPA prominently, relevant coursework or rank if available. Class position when known.

### 6. Leadership
**Current entries**: ACM Chapter Treasurer

**Card design**: Role, organization, period, key responsibilities and impact. Number of events organized, members led, budget managed.

### 7. Arts & Culture
**Current entries**: Sangeet Bhushan Part 2 (Tabla) — First Division with Distinction

**Card design**: Category labeled "Arts" with rose accent. Achievement name, organization, date, description. This entry humanizes the portfolio — it shows a complete person, not just a programmer.

### 8. Community & Innovation
**Current entries**: GDG Solution Challenge Participant

**Card design**: Event name, organizer, year, what was built or contributed.

### 9. GitHub Milestones (Dynamic)
**Future**: Sourced from GitHub API.

- Total public repositories milestone (currently: 44+)
- Total stars earned across all repos
- Longest contribution streak
- First open source contribution date

### 10. LeetCode Milestones
**Future**: Sourced from LeetCode API if available.

- Problems solved count
- Contest participation
- Ranking milestone

---

## Homepage vs Standalone Page

**Current**: Achievements appear as a 3-col grid section on the homepage (`/`), showing all 6 achievement YAMLs.

**Future standalone page (`/achievements`)**: Full trophy room with all categories, filtering by category, and empty placeholder sections for future entries.

---

## Achievement Card Design

```
┌──────────────────────────────────────┐
│ [Category badge]        [Date]       │
│                                      │
│ Title of Achievement                 │
│ Organization                         │
│                                      │
│ Description text (2-3 lines max)     │
│                                      │
│ [View Details ↗]  (if URL exists)   │
└──────────────────────────────────────┘
```

Uses `ContentCard` base. Category badge color follows the category system:
```
Competition:  bg-violet/10 text-violet
Open Source:  bg-emerald/10 text-emerald
Cloud:        bg-sky/10 text-sky
Innovation:   bg-amber/10 text-amber
Arts:         bg-rose/10 text-rose
Academic:     bg-primary/10 text-primary
Leadership:   bg-rose/10 text-rose
```

---

## Placeholder Philosophy

Empty categories do NOT show: nothing, broken layouts, or "Coming soon" text in a default font.

They show: a designed placeholder card with a faint outline of the card structure, the category title, and a subtle message like "Milestones from future competitions will appear here." The outline uses a dashed border at low opacity — the shape is there, waiting to be filled.

This communicates ambition, not incompleteness.

---

## Data Source

**Current**: YAML files in `src/content/achievements/`

**Future additions**: Add a YAML file. No code changes. The section renders automatically.

**YAML schema**:
```yaml
title: string
organization: string
date: string
description: string
category: string       # added retroactively to all existing files
link: string | ""      # credential URL or empty
```

---

## Animation

Section entry: `whileInView` stagger, same pattern as other grid sections. Cards stagger in pairs (two at a time). Hover: `-translate-y-1` lift + category-color border glow.
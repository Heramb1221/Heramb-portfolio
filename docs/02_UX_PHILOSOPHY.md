# 02 — UX Philosophy

## Core Principle: Content Is the Feature

Every interaction, animation, transition, and layout decision exists to serve the content — not to demonstrate technical capability.

The test for every UX decision: *does this make the content clearer, more memorable, or more emotionally impactful?* If the answer is no, remove it.

This is not minimalism for minimalism's sake. It is **purposeful restraint** — knowing what to add and knowing what to remove.

---

## Navigation Philosophy

### The Visitor Should Never Feel Lost

The navigation is fixed, always present, always readable. On scroll, it acquires a blur backdrop that signals depth — the content is beneath it, not gone.

The active page is indicated by an amber underline that slides between links using a spring animation. This is not decorative — it communicates: *this is where you are, this is how you moved here.* The spring physics make it feel physical.

### No Hamburger Maze

The mobile navigation uses a Sheet (side drawer) that opens from the right. It is not a full-screen takeover. It shows the nav links with clear amber active state indicators. The Resume button is always at the bottom, prominent.

### Navigation Links Are Decisions, Not Collections

The nav contains: Home, Projects, Notes, Achievements, Resume.

Not: About, Skills, Contact, Timeline, Certifications, GitHub Activity, Recommendations.

Those sections live on the homepage but are not primary navigation destinations. They are discovered through scrolling — through the explorer's journey. The nav links are waypoints for direct access, not a table of contents.

---

## Scroll Behavior

### Scroll Reveals, Never Controls

The portfolio respects the visitor's scroll speed. Nothing is pinned or trapped. Scroll-triggered animations play *with* the natural scroll, not against it.

The visitor is always in control. They can scroll fast and read the content. They can scroll slowly and experience the reveals. Both approaches are valid.

### Reading Rhythm

Sections are spaced to create breathing room between ideas. The spacing scale (8, 16, 24, 32, 48, 64, 120px) is not arbitrary — it creates a visual rhythm where related elements breathe together and unrelated elements breathe apart.

Section padding: `py-16 md:py-24` — generous on desktop, respectful on mobile.

### Section Flow

The homepage sections are ordered by a deliberate priority:

```
Hero              ← Who you are (immediate)
Recruiter Snapshot ← What you offer (10 seconds)
Featured Projects ← Proof of work (most important)
Skills            ← Tools you carry
About             ← Context and humanity
Currently Learning ← Growth trajectory
Timeline          ← The route taken
Recommendations   ← Social proof
Achievements      ← Milestones
Certifications    ← Formal credentials
GitHub Activity   ← Living proof of work
Contact           ← How to reach you
```

This order is not a convention — it is a *strategy*. Projects come before Skills because proof comes before claim. About comes after Skills because humanity is earned after competence is established.

---

## Interaction Philosophy

### Interactions Are Invitations, Not Performances

A hover state is an invitation to interact. It should reward the visitor without demanding their attention. The hover should be subtle enough that it doesn't distract from reading, but present enough that it communicates: *this element does something.*

### Hover Hierarchy

```
Cards (project, skill, note)  → lift -6px + amber border glow
Links                         → amber color shift
Buttons                       → opacity reduction + shadow
Icons                         → scale 1.04
Navigation links              → amber color shift
Logo                          → group hover effect on brackets
```

Hover effects are consistent within categories. Every card behaves the same way. Every link behaves the same way. The visitor learns the language of the site in the first few seconds and stops consciously noticing it.

### No Surprise Interactions

Nothing should require discovery. There are no hidden interactions (no Easter eggs — explicit decision made by the owner). Every interactive element is visually distinguishable as interactive before interaction.

---

## First Impression Strategy

The hero has one job: make someone want to stay.

It does this by:
1. Communicating identity in under 3 seconds (coordinate label, status badge, name, descriptor)
2. Creating enough visual interest to signal craft (kinetic background, floating tech badges)
3. Providing clear next actions (View My Work, Read My Notes)

The hero does NOT: tell a story, list credentials, explain career history, use large walls of text, autoplay video, show a photo, or use generic phrases like "Hi, I'm a developer."

---

## Simplicity vs. Delight

The portfolio operates at the intersection:

**Too simple** = forgettable. Recruiters move on. Engineers feel nothing. The visit was information transfer, not an experience.

**Too delightful** = distracting. Animations compete with content. Visitors notice the effects, not the engineer. Load time increases. The portfolio becomes a demo of JavaScript, not a representation of a person.

The target is **calm delight** — the experience of discovering that something was made with care, without being shown that care explicitly.

Examples of calm delight:
- The amber scrollbar thumb appears on scroll, unexpected but natural
- The project cards each have their own color temperature in the detail view
- The notes section feels like a personal blog, not a portfolio component
- The `::selection` color is amber — a tiny detail only discoverable by trying

---

## Information Hierarchy

Every section has a clear hierarchy:

```
Level 1: Section identity (what is this section?)
Level 2: Primary content (what is the most important thing here?)
Level 3: Supporting content (what provides context?)
Level 4: Actions (what can the visitor do next?)
```

Typography, spacing, and color all reinforce this hierarchy. Nothing at level 3 should visually compete with level 2.

---

## Accessibility as UX

Accessibility is not a checklist item. It is a UX quality signal.

A portfolio with broken keyboard navigation, missing focus rings, or unlabeled buttons communicates that the builder doesn't think about users. For an engineering portfolio, this is especially damaging.

Every interactive element must be keyboard accessible. Every image must have meaningful alt text. Every form must have proper labels. The amber focus ring must be visible on all backgrounds.

`prefers-reduced-motion` is respected — all animations are disabled for users who request it, without degrading the content experience.
# 10 — Hero Section

## Purpose

The hero has one job: make someone want to stay. It must communicate identity, signal craft, and provide clear next steps — in under 10 seconds, on first load, before any scrolling.

## Copywriting Philosophy

The hero does NOT open with "Hi, I'm [Name], a Full Stack Developer."

It opens with identity: **"The Explorer."**

Then immediately qualifies: *"Building across systems, languages, platforms, and ideas."*

This communicates the personal brand before the job title. The job title is secondary context, not the primary statement.

Full hero text hierarchy:
```
[Coordinate label — JetBrains Mono, small, muted]
20.0116° N, 73.7569° E — Jalgaon, Maharashtra

[Status badge — emerald dot + "Available for Opportunities"]

[Primary statement — display size, Inter 800]
The Explorer.

[Sub-statement — large body]
Building across systems, languages,
platforms, and ideas.

[Context — body, muted]
Computer Engineering student at RCPIT.
Full stack, mobile, desktop, and beyond.

[CTA row]
[View My Work →]   [Read My Notes]

[Floating tech badges — ambient, background]
React · Node.js · TypeScript · Electron · .NET...
```

## Layout

**Desktop**: Full viewport height. Two-column grid (text left, visual right). The visual column contains the profile card or kinetic background.

**Mobile**: Single column. Text only — the right column visual is hidden on mobile. Focus on the message.

## Background: Alive and Kinetic

The hero background has a subtle mouse-responsive particle/grid effect:
- A dark grid (subtle lines at 48px intervals)
- Maximum 5px parallax movement on mouse move
- Movement is in the opposite direction to the cursor (the grid "slides" away as you approach)
- This creates depth without overwhelming the text

The effect is imperceptible on casual viewing. It rewards the visitor who pauses to examine it.

## Floating Tech Badges

Technology names float in the background on independent CSS keyframe paths. They drift slowly, never collide, never leave the frame. At any given moment, 6-8 badges are visible at varying opacity (0.3–0.6).

They are ambient — not readable at a glance, just present. Like technologies you've used are always present in how you think.

## Animations

- **Coordinate label**: Typewriter effect, counting up to the actual coordinates. Runs once.
- **Left column content**: Stagger in — availability badge (0ms), heading (80ms), sub-statement (160ms), description (240ms), CTAs (320ms), social icons (400ms).
- **Right column visual**: Fade in after 400ms — after the text is established.
- **Floating badges**: CSS keyframes, infinite, no pause on hover.
- **Scroll indicator**: Fades in at 1200ms delay. Click scrolls to Recruiter Snapshot.

## CTA Strategy

**Primary CTA**: "View My Work →" — links to `#featured-projects` anchor. The arrow indicates movement down the page.

**Secondary CTA**: "Read My Notes" — links to `/notes`. This is unusual for a hero — most have "Download Resume." The choice of Notes as secondary CTA signals: *I am an engineer who documents their thinking.* It distinguishes the portfolio.

## Scroll Indicator

A simple ChevronDown arrow that fades in at 1.2 seconds. Click scrolls to `#recruiter-snapshot`. No bounce animation (bounce is forbidden). No text label. The visual is sufficient.

## Accessibility

- `<section aria-label="Introduction">` — section landmark
- `<h1>` for the hero name/statement — the only h1 on the page
- CTA buttons have explicit `aria-label` values
- Social icons have `aria-label` values
- Background motion respects `prefers-reduced-motion` — grid and badges are static if reduced motion is preferred
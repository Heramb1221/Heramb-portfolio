# CLAUDE.md

# Portfolio v2 Development Guidelines

## Project Goal

This portfolio is built primarily for:

1. Campus Placements
2. Internships
3. Personal Branding

The portfolio should present the author as a professional software engineer with strong project experience and continuous learning.

Never optimize for visual effects over readability.

---

# Tech Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Cloudinary
* MDX/YAML Content
* Vercel Deployment

---

# General Rules

Always:

* Use TypeScript
* Prefer Server Components
* Keep components reusable
* Keep components small
* Use Tailwind classes
* Maintain accessibility
* Maintain responsiveness
* Use semantic HTML
* Follow SEO best practices

Never:

* Use inline styles
* Hardcode content
* Create duplicate components
* Create duplicate layouts
* Use magic numbers
* Use unnecessary client components

---

# Theme

The website should look:

* Professional
* Modern
* Minimal
* SaaS-inspired
* Recruiter-friendly

Avoid:

* Cyberpunk
* Gaming aesthetics
* Neon effects
* Holographic effects
* Glitch animations

---

# Animations

Allowed:

* Fade
* Slide
* Smooth reveal
* Hover lift
* Page transition

Not Allowed:

* Bounce
* Flash
* Shake
* Heavy parallax
* Infinite floating objects

Animations should enhance UX, never distract.

---

# Typography

Primary:
Inter

Secondary:
Geist

Code:
JetBrains Mono

---

# Colors

Use CSS variables from globals.css.

Never hardcode colors inside components.

---

# Components

Prefer reusable components.

Avoid repeated layouts.

Shared components should live inside:

components/shared

Reusable UI should live inside:

components/ui

---

# Data Source

Never hardcode data.

Use:

content/

for:

* projects
* notes
* achievements
* certifications
* recommendations

Use config/data files for:

* navigation
* socials
* profile
* skills

---

# Homepage Order

Hero

Recruiter Snapshot

Featured Projects

Skills

About

Currently Learning

Timeline

Recommendations

Achievements

Certifications

Github Activity

Contact

Footer

Do not change this order.

---

# Projects

Homepage:
6 featured projects.

Projects page:
All projects.

Every project should have:

* Thumbnail
* Summary
* Tech stack
* Metrics
* GitHub
* Live Demo
* Case Study

---

# Resume

Render resume as webpage.

Do not embed PDF.

Provide Download PDF button.

---

# Notes

70% Project Notes

30% Learning Notes

---

# Performance

Aim for:

* Lighthouse 90+
* Lazy Loading
* Image Optimization
* Code Splitting

---

# Accessibility

Always include:

* aria-label
* keyboard accessibility
* semantic HTML
* proper heading hierarchy

---

# Responsive Design

Desktop First

Tablet

Mobile

Every component must support all three.

---

# Before Writing Code

Always check:

* Existing component
* Existing utility
* Existing type
* Existing content schema

Reuse before creating new files.

---

# Development Strategy

Build one section at a time.

Never regenerate the entire application.

Never modify unrelated code.

Preserve folder structure.

Preserve design system.

Treat Portfolio Specification v1.0 as the source of truth.

# AGENTS.md

# Portfolio v2 AI Development Guide

## Purpose

This repository is an AI-assisted software project.

Every AI agent working on this repository must follow the rules defined in this document.

The goal is to maintain a consistent architecture, design language, and code quality throughout the project lifecycle.

---

# Primary Goal

Build a professional software engineering portfolio optimized for:

1. Campus Placements
2. Internship Opportunities
3. Personal Branding

The portfolio should prioritize technical projects and software engineering skills over visual effects.

---

# Source of Truth

Always treat these files as authoritative:

1. Portfolio Specification v1.0
2. DESIGN_SYSTEM.md
3. CLAUDE.md
4. AGENTS.md

If any conflict exists, follow this order:

Portfolio Specification
↓

DESIGN_SYSTEM

↓

CLAUDE

↓

AGENTS

Never invent new architecture or design patterns without explicit instruction.

---

# Technology Stack

Framework:
Next.js App Router

Language:
TypeScript

Styling:
Tailwind CSS

UI:
shadcn/ui

Animation:
Framer Motion

Media:
Cloudinary

Deployment:
Vercel

Content:
YAML

---

# Coding Standards

Always:

* Use TypeScript
* Use strict typing
* Prefer Server Components
* Keep components reusable
* Keep components modular
* Use semantic HTML
* Follow accessibility standards
* Follow responsive design

Never:

* Use inline styles
* Use CSS modules
* Use hardcoded content
* Use duplicated code
* Create unnecessary client components

---

# Component Rules

Every component should have one responsibility.

Components should remain small.

Large components should be split.

Never exceed approximately 250 lines unless necessary.

---

# Reusability

Before creating:

* component
* utility
* type
* helper

always check if one already exists.

Avoid duplicate logic.

---

# Folder Structure

Never modify folder structure unless explicitly requested.

Never move files without reason.

Preserve architecture consistency.

---

# Content

Never hardcode content.

All content should come from:

content/

Examples:

* projects
* certifications
* achievements
* recommendations
* notes

Static configuration should come from:

config/

or

data/

if available.

---

# Homepage Priority

Projects are the most important content.

Homepage order:

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

GitHub Activity

Contact

Footer

Do not reorder sections.

---

# Design Philosophy

"The Explorer's Atlas" - An interconnected journey.
Cinematic.
Intentional.
Atmospheric.
Content First but beautifully presented.
The craft is the message.

---

# Animations

The "Soft Impactful Rule": Every animation must be additive, rhythmically consistent, and respectful.

Allowed:

Smooth reveals on scroll
Staggered lists
Subtle amber hovers
Cinematic page transitions (< 800ms)
Intentional state changes

Forbidden:

Bounce
Flash
Glitch
Heavy Parallax
Continuous Floating Elements

Animations should improve UX and atmosphere.
Never distract from content or force visitors to wait.

---

# Responsive Design

Desktop

Tablet

Mobile

Every component must support all three.

Never ignore smaller devices.

---

# Accessibility

Always include:

aria-label

keyboard support

semantic elements

correct heading hierarchy

proper button usage

---

# Performance

Prioritize:

Lazy Loading

Image Optimization

Code Splitting

Minimal JavaScript

Fast First Paint

Avoid unnecessary dependencies.

---

# SEO

Maintain:

Metadata

Open Graph

Structured Data

Sitemap

Robots

Proper headings

Descriptive alt text

---

# Project Pages

Every project should support:

Overview

Problem

Solution

Architecture

Features

Challenges

Lessons Learned

Future Improvements

GitHub

Live Demo

Media

Metrics

---

# Resume

Resume should be rendered as HTML.

PDF download should be optional.

Never embed the PDF directly.

---

# GitHub

Display:

Repositories

Contributions

Featured Repositories

Avoid excessive graphs.

---

# Code Style

Prefer:

Readable code

Meaningful names

Small functions

Pure functions

Reusable hooks

Avoid:

Deep nesting

Complex ternaries

Repeated logic

Anonymous utility functions

---

# Imports

Use aliases.

Prefer:

@/components

@/lib

@/content

Avoid long relative imports.

---

# Commit Philosophy

Every change should be:

Small

Focused

Atomic

Avoid unrelated modifications.

---

# AI Agent Behavior

Before making changes:

1. Understand the task.

2. Read existing implementation.

3. Reuse existing utilities.

4. Follow design system.

5. Follow project architecture.

6. Preserve consistency.

Never redesign the project unless requested.

Never change unrelated files.

Never remove features without instruction.

---

# Final Principle

When making implementation decisions, always prefer:

Maintainability

Readability

Performance

Scalability

Accessibility

Consistency

over cleverness or visual complexity.

The portfolio should communicate engineering maturity rather than animation or visual experimentation.

# 19 — Project Rules

These rules are non-negotiable. They exist because each one was broken somewhere in a previous project and the result was worse for it.

When in doubt, refer to this document. When two decisions conflict, the rule takes precedence over the preference.

---

## Motion Rules

**RULE M1**: Never animate for decoration. Every animation must pass the removal test: if this animation were removed, would the content still communicate clearly? If yes, the animation is additive — keep it. If no, fix the design instead.

**RULE M2**: Never use more than two animation systems for the same effect. GSAP for timeline/SVG. Framer Motion for React state. Not both for the same element.

**RULE M3**: Never loop an animation that is not ambient. Only the hero floating badges and the exploring card border may loop. All other animations fire once.

**RULE M4**: Never pin or trap scroll. The visitor is always in control of their scroll position. Scroll-triggered animations accompany the scroll, never control it.

**RULE M5**: Always implement `prefers-reduced-motion`. All transforms, opacity changes, and layout animations must be disabled when the system setting is active. Color state changes may remain.

**RULE M6**: Forbidden animations: bounce, rotate, flip, glitch, flash, heavy parallax, continuous floating elements (except designated ambient elements). If a proposed animation is on this list, it does not get added regardless of context.

---

## Design Rules

**RULE D1**: Never use more than two typefaces. Inter for everything. JetBrains Mono for code and technical UI labels. No exceptions.

**RULE D2**: Never hardcode colors inside components. All colors from CSS variables via Tailwind tokens. Exception: the GSAP loader SVG which uses raw hex for performance and because it runs before CSS is applied.

**RULE D3**: Never use inline styles in JSX unless absolutely required by an animation library. Use Tailwind classes. Use CSS variables. Not `style={{ color: "#F59E0B" }}` in component JSX.

**RULE D4**: Never create inconsistent border radii. Cards: `rounded-xl`. Buttons: `rounded-xl`. Inputs: `rounded-xl`. Badges/chips: `rounded-full`. Avatar: `rounded-full`. Do not mix.

**RULE D5**: Never use heavy shadows. Maximum `shadow-sm` on cards. `shadow-md` on hovering buttons only. No `shadow-xl` or `shadow-2xl`. The dark background provides inherent depth.

**RULE D6**: Never use gradients except: the amber-to-background directional gradient on the hero visual card (subtle), the `bg-gradient-to-br from-primary/8` on the hero card. No radial gradients for decoration.

---

## Layout Rules

**RULE L1**: Always support all three breakpoints. Mobile first means: build mobile, then expand to tablet, then desktop. Never desktop-only or mobile-afterthought.

**RULE L2**: Never allow horizontal overflow at any breakpoint. Test by setting viewport to 320px. If a horizontal scrollbar appears, fix it before committing.

**RULE L3**: Maintain section alternation rhythm. Odd sections: default background. Even sections: `bg-muted/20`. The rhythm must not break regardless of what sections are added or removed.

**RULE L4**: The sidebar offset (`md:pl-14`) must be applied to all content that appears alongside the fixed sidebar. If a new layout is added, verify that it does not underlap the sidebar on 1024px viewports.

---

## Component Rules

**RULE C1**: Every component has one responsibility. If a component is doing two things, split it. Files should not exceed ~250 lines. If they do, extract a sub-component.

**RULE C2**: Never duplicate card styling. Use `ContentCard` as the base for all Recommendations, Achievements, Certifications, and Notes cards. New card types should extend ContentCard, not recreate it.

**RULE C3**: Never use `any` type in TypeScript. If a type is unknown, use `unknown` and narrow it. If a YAML field has a free-form type, type it as `Record<string, unknown>` and extract values with type guards.

**RULE C4**: Never hardcode content inside components. Projects from YAML. Skills from `config/skills.ts`. Timeline from `config/timeline.ts`. About from `config/about.ts`. Notes from MDX files. If content is hardcoded in a component, it is wrong.

**RULE C5**: Client Components must be justified. Before adding `"use client"`, confirm that the component requires: browser APIs, React hooks that need DOM, or user interaction listeners. Otherwise it should be a Server Component.

---

## Data Rules

**RULE DA1**: Never use gray-matter for plain YAML files (no `---` delimiters). Use `js-yaml` directly. The project content files are plain YAML. gray-matter returns empty data for them.

**RULE DA2**: Never expose GitHub tokens, Resend API keys, or any secrets in source code or client-side code. Environment variables with `NEXT_PUBLIC_` prefix are available in the browser. Never put secrets there.

**RULE DA3**: Always handle missing data gracefully. `getProjectBySlug()` returns `null` for unknown slugs — the page calls `notFound()`. `getGitHubData()` returns null user on failure — the section renders a fallback. No content absence should crash the page.

---

## Accessibility Rules

**RULE A1**: Every interactive element must be keyboard accessible. Test by tabbing through the entire page. Every link, button, input, and interactive widget must be reachable and operable via keyboard.

**RULE A2**: Every image must have meaningful alt text. Not "image" or "screenshot". Descriptive: "ConverseCloud video calling interface showing two users in a call." Decorative images use `aria-hidden="true"`.

**RULE A3**: Every page has exactly one `h1`. Section headings are `h2`. Card titles are `h3`. Never use a heading for visual size — use `p` or `span` with `text-*` classes instead.

**RULE A4**: Every form input has a `label` with a matching `for`/`htmlFor`. Never rely on placeholder text as the label.

**RULE A5**: Focus rings must be visible on all backgrounds. The amber focus ring (`ring-2 ring-ring`) must be visible against both the dark background and light backgrounds. Never `outline-none` without providing a custom focus indicator.

---

## Performance Rules

**RULE P1**: Never lazy-load above-the-fold content. Images in the hero or first visible section use `priority` prop or `loading="eager"`. Everything below the fold uses `loading="lazy"`.

**RULE P2**: Always provide image `sizes` attribute for `next/image` with `fill`. The sizes must reflect actual rendered widths at each breakpoint. Default `(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 640px` for two-column grids.

**RULE P3**: Never import an entire library when only one function is needed. GSAP plugins are registered once in `lib/gsap-config.ts`. Import individual functions, not entire namespaces.

**RULE P4**: GitHub API calls use `next: { revalidate: 3600 }`. Never fetch GitHub data on every request. The 1-hour cache is the correct balance between freshness and performance.

---

## Git Rules

**RULE G1**: Every commit is atomic. One logical change per commit. Never "misc fixes" or "various updates" as a commit message.

**RULE G2**: Commit message format: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `perf:`, `chore:`. Followed by a description of what changed and why.

**RULE G3**: Never commit `.env.local`. Never commit `node_modules/`. The `.gitignore` at the project root handles this.
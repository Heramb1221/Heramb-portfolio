# 17 — Content Strategy

## Core Principle: Content Is Evidence, Not Claims

Every content decision should ask: *is this a claim or evidence?*

"I am a full stack developer" is a claim. A working ConverseCloud deployment with real-time WebRTC is evidence. "I think deeply about engineering" is a claim. A note explaining why JWT stored in httpOnly cookies is preferred over localStorage, with specific threat model reasoning, is evidence.

The portfolio strategy is to replace claims with evidence at every opportunity.

---

## Project Content Strategy

### What Goes in a Project YAML

**Must have**:
- `title`: Descriptive, not a code name
- `description`: One paragraph. What it is, who it's for, what makes it interesting technically.
- `technologies`: Every significant technology used. Future visitors filter by tech.
- `screenshots`: At least one Cloudinary-hosted screenshot per project
- `overview`: Expanded project description
- `problem`: What problem this solves and why it was worth solving
- `solution`: The architectural approach
- `challenges`: Specific technical challenges encountered (not "it was hard")
- `lessonsLearned`: What changed in how you think as a result of building this

**Should have**:
- `architecture`: How the system is structured
- `metrics`: Concrete numbers where available
- `github`: Always if public
- `liveDemo`: When deployed

**Not needed**:
- Invented metrics ("100+ users" when no users exist)
- Technology lists padded with tangentially related tools
- Future improvements that are obvious ("add authentication")

### Project Selection Philosophy

21 projects is a lot. The portfolio benefits from quality over quantity. Consider: featured projects (6) should each demonstrate a distinct engineering capability:

- ConverseCloud: Real-time systems, WebSocket, WebRTC
- LoomCV: SaaS architecture, AI integration, subscription billing
- Reverie: Cross-platform (web + mobile), monorepo, AI
- Markowl: Electron, desktop, local-first, IPC
- Coditor: Reactive backend (Convex), Monaco Editor, billing
- ACM Website: Production deployment, real client, organization

Each featured project should answer a different question a recruiter or engineer might ask.

---

## Notes Content Strategy

### Voice

The voice in notes should be:
- **First person**: "I chose..." "I discovered..." "I was wrong about..."
- **Specific**: Not "WebSockets are powerful" but "The specific challenge was managing WebSocket lifecycle across React re-renders without creating duplicate connections"
- **Honest about failures**: Notes that admit mistakes and explain what was learned are more credible than notes that only describe successes
- **Technical without being inaccessible**: Assume the reader is an engineer, not assume they know your specific stack

### Note Frequency Strategy

Aim for 1 note per 2-3 projects built. Notes should lag behind projects slightly — they benefit from retrospection. Writing a note about a project while still in the middle of it produces thinner thinking than writing after the project is deployed and you've had time to reflect.

### Note Length

Target: 600–1200 words. Long enough to communicate real thinking, short enough to be read in one sitting. Reading time: 3–6 minutes.

---

## Case Study Strategy

Case studies are the premium version of project descriptions. They exist on the project detail page.

**Engineering post-mortem format**:
1. What problem was worth solving
2. What approach was taken and why
3. What was difficult and how it was solved
4. What would be done differently
5. What was learned that changed how future projects are approached

**Avoid**: Marketing language ("powerful platform", "seamless experience"). These phrases communicate nothing to engineers.

**Use**: Specific technical language. Named functions, libraries, patterns. Exact error messages that caused hours of debugging. Precise performance numbers.

---

## Personal Branding Strategy

### The Explorer Brand

All content should reinforce the "Explorer" identity:
- Breadth is a feature, not a liability — projects in web, mobile, desktop, AI, cloud
- Curiosity is demonstrated through notes, not claimed
- Growth trajectory is shown through timeline + currently learning section

### What to Avoid

- Claiming expertise in technologies without project evidence
- Using buzzwords without context ("leveraged microservices")
- Generic descriptions that could apply to any developer's portfolio
- Underselling: "small project" or "just a learning exercise" — everything shipped deserves to be presented with dignity

---

## SEO Strategy

### Target Keywords

Primary: "Heramb Chaudhari", "Heramb Chaudhari portfolio", "Heramb Chaudhari developer"

Secondary: "Computer Engineering student developer portfolio", "Full Stack Developer RCPIT", "React Node.js developer portfolio India"

### Implementation

- `layout.tsx` contains global metadata with all keywords
- Each page has unique `title` (via `titleTemplate: "%s | Heramb Chaudhari"`)
- Each page has unique `description` (not a template)
- Project detail pages use project title and description as metadata
- Note detail pages use note title and description as metadata
- `sitemap.ts` includes all 28 routes dynamically
- `robots.ts` allows all crawlers
- JSON-LD Person schema in layout head
- OG image generated dynamically at `/api/og`
- All images have `alt` text

### Canonical URLs

All pages declare canonical URL using `NEXT_PUBLIC_SITE_URL` environment variable:
```typescript
alternates: { canonical: `${siteUrl}/projects/conversecloud` }
```

---

## Resume Content Strategy

The web resume at `/resume` is the source of truth for structured career information. It pulls from:
- `config/resume.ts` (education, experience)
- `config/skills.ts` (technical skills)
- `lib/projects.ts` (top 4 featured projects)
- `lib/content.ts` (all certifications)

The PDF at `/api/resume` is for download only — it should match the web resume in content, even if different in visual format.

**Resume update workflow**: Update `config/resume.ts` for education/experience. Update project YAMLs for project details. The web resume renders dynamically — no separate resume file to maintain.

---

## Metadata Tags Across Content

### Notes Frontmatter Tags

Tags serve two purposes:
1. **Navigation**: Filter notes by tag on the listing page
2. **Connection**: Connect notes to projects that share the same technical area

Tags should be: specific (`JWT-auth`, not `authentication`), reusable (multiple notes can share a tag), and consistent (decide on a tag vocabulary and stick to it).

Recommended tag vocabulary:
```
Tech: react, nodejs, typescript, nextjs, mongodb, electron, react-native
Topics: auth, websockets, performance, security, architecture, debugging
Phases: learning, exploring, mastered
Types: case-study, tutorial-notes, research, post-mortem
```

### Achievement Categories

Consistent category vocabulary for achievements:
```
Competition, Open Source, Cloud, Innovation, Arts, Academic, Leadership, Community
```
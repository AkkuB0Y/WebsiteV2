---
name: Personal Website Build
overview: Build a sleek monochrome (black/grayscale) personal website with Next.js (static export), Tailwind, and shadcn/ui, featuring a Roboto header bar and five pages (Home, Projects, Experience, Resume, Fun), deployed statically to Vercel behind a Porkbun domain.
todos:
  - id: setup
    content: "Scaffold Next.js (App Router, TS) in current workspace; add Tailwind, shadcn/ui, framer-motion, lucide-react; configure next.config.mjs for static export (output: 'export', images.unoptimized)."
    status: pending
  - id: theme
    content: Define monochrome theme tokens in globals.css + tailwind.config.ts; wire Roboto + Roboto Mono via next/font; add shimmer keyframes.
    status: pending
  - id: layout-header
    content: "Build app/layout.tsx and components/header.tsx: left ✵ home icon + GitHub/LinkedIn/Email socials, right nav tabs (Projects, Experience, Resume, Fun) with active state and mobile menu."
    status: pending
  - id: content
    content: "Create typed content files: content/site.ts, content/projects.ts, content/experience.ts, content/fun.ts with placeholder data."
    status: pending
  - id: home
    content: Build Home page with centered intro and components/shimmer-text.tsx (hover shimmer on highlighted keywords).
    status: pending
  - id: projects
    content: Build Projects page + ProjectCard grid with title, description, and Roboto Mono tech-stack row.
    status: pending
  - id: experience
    content: "Build Experience page: top resume+LinkedIn links, then ExperienceCard list."
    status: pending
  - id: resume
    content: Build Resume page that opens the Google Drive resumeUrl from content/site.ts in a new tab.
    status: pending
  - id: fun
    content: "Build Fun page LAST: YouTube tiles grid, 2-layer brick parallax gallery with repeating photos, and react-leaflet dark map with clickable pins (thumbnail + description)."
    status: pending
  - id: deploy
    content: Verify static export build (out/), document Vercel import + Porkbun DNS steps; leave git push to the user.
    status: pending
isProject: false
---

# Personal Website Build

A single-author, static, frontend-only personal site. Monochrome/grayscale aesthetic inspired by Framer's "Agencly" template but simpler. Built so a less-capable agent can implement each piece in order.

## Phased Rollout (build in THIS EXACT ORDER)
Rules for the implementing agent:
- Do the phases strictly in order. Do NOT start a phase until the previous phase's "Done when" criteria are all met.
- At the end of every phase, the project MUST build and lint clean (`npm run build` and `npm run lint` succeed) before moving on.
- Use placeholder content where the user has not provided real data; never block on missing content.
- Per SKILL.md: never auto-commit or push. Stop after Phase 4's verification and let the user handle git/deploy.

### Phase 0 - Foundation (todos: `setup`, `theme`)
Scaffold Next.js + static export, install deps, wire fonts and the monochrome theme tokens + shimmer keyframes.
- Depends on: nothing.
- Done when: `npm run dev` serves a blank dark page on `/`, Roboto/Roboto Mono load, theme CSS vars exist, and `npm run build` produces `out/`.

### Phase 1 - App shell & content scaffolding (todos: `layout-header`, `content`)
Build `app/layout.tsx` + `components/header.tsx` and create all typed `content/*.ts` files with placeholder data. Create empty placeholder page files for every route so the header links all resolve.
- Depends on: Phase 0.
- Done when: header (left icon+socials, right tabs) renders identically on `/`, `/projects`, `/experience`, `/resume`, `/fun`; active-tab state works; mobile menu opens; all `content/*.ts` files exist and type-check.

### Phase 2 - Core pages (todos: `home`, `projects`, `experience`, `resume`)
Implement Home (with `ShimmerText`), Projects grid, Experience (resume+LinkedIn links first, then cards), and Resume redirect. All read from `content/*.ts`.
- Depends on: Phase 1.
- Done when: all four pages render real (or placeholder) content from the content files, hover shimmer works on Home, and tech-stack rows render in Roboto Mono.

### Phase 3 - Fun page (todo: `fun`) - IMPLEMENT LAST
Build the three Fun sections in order: (1) YouTube tiles, (2) 2-layer brick parallax gallery with repeating photos, (3) react-leaflet dark map with clickable pins. Map component must be `dynamic(..., { ssr: false })`.
- Depends on: Phase 2.
- Done when: all three sections render, parallax moves on scroll, map loads client-side without SSR errors, and pins open a popup with thumbnail + description. Confirm `npm run build` still succeeds with the static export + Leaflet.

### Phase 4 - Build & deploy docs (todo: `deploy`)
Verify the production static export and document (do not execute) the Vercel import + Porkbun DNS steps.
- Depends on: Phase 3.
- Done when: `npm run build` emits a clean `out/`, and a short deploy section/README documents Vercel + Porkbun. Hand off to the user for git push and DNS.

## Stack & Architecture
- **Framework:** Next.js (App Router) with `output: 'export'` (fully static, zero backend cost, portable).
- **Language/Styling:** TypeScript, Tailwind CSS, `shadcn/ui` (Radix-based) for accessible primitives.
- **Animation:** `framer-motion` (now `motion`) for shimmer-on-hover and parallax.
- **Map:** `react-leaflet` + Leaflet, free CartoDB **dark_all** tiles (no API key).
- **Fonts:** `next/font/google` -> **Roboto** (UI/headers/body) + **Roboto Mono** (tech-stack/technical labels).
- **Hosting:** Vercel (Git-connected). Domain via Porkbun DNS.
- **Directory:** build in the current workspace `website-v2` (do not create `website-v2-dev`).
- **Content model:** all editable content lives in typed data files under `content/` so updates need no component edits.

## Theme tokens (define once, reuse everywhere)
Set as CSS variables in `app/globals.css` and mapped in `tailwind.config.ts`:
- `--bg: #0A0A0A`, `--surface: #141414`, `--surface-2: #1A1A1A`
- `--border: #262626`, `--text: #FAFAFA`, `--muted: #A1A1AA`
- Accent is monochrome only; shimmer uses a white->silver->white moving gradient.
- Global: dark background, generous spacing, subtle 1px borders, rounded-xl cards, soft hover lift.

## Proposed file structure
```text
app/
  layout.tsx            # fonts, <Header/>, base bg, metadata
  globals.css           # theme vars + shimmer keyframes
  page.tsx              # Home
  projects/page.tsx
  experience/page.tsx
  resume/page.tsx       # redirect to Drive link
  fun/page.tsx
components/
  header.tsx
  shimmer-text.tsx
  project-card.tsx
  experience-card.tsx
  section.tsx
  fun/youtube-grid.tsx
  fun/parallax-gallery.tsx
  fun/places-map.tsx    # dynamic import, ssr:false
content/
  site.ts               # name, socials, resume link, blurb
  projects.ts
  experience.ts
  fun.ts                # videos[], galleryPhotos[], places[]
public/
  images/ ...           # gallery + place thumbnails
next.config.mjs         # output: 'export', images.unoptimized
```

## Header (all pages)
Roboto, sticky, translucent dark with bottom border.
- **Left:** home icon `✵` (links to `/`) + social icons GitHub, LinkedIn, Email (`lucide-react` icons, open in new tab / `mailto:`).
- **Right:** nav tabs Projects, Experience, Resume, Fun with active-route underline.
- Mobile: collapse right tabs into a Radix sheet/menu.

## Pages

### Home (`app/page.tsx`)
Centered, vertically centered hero. One-line intro pulled from `content/site.ts`, e.g. "Hello, I'm Akshay, a Computer Engineering student and engineer @ ...". Certain words wrapped in `<ShimmerText>` so they shimmer on hover.

`components/shimmer-text.tsx` core idea (gradient text animated on hover):
```tsx
// span with bg-clip-text text-transparent; on hover animate background-position
// keyframe "shimmer" moves a white->#888->white linear-gradient across the text
```

### Projects (`app/projects/page.tsx`)
Responsive grid of `ProjectCard` from `content/projects.ts`. Each card: title, description, and a footer **stack** row rendered in Roboto Mono as chips, e.g. `stack: aws · docker · linux`. Subtle hover lift/border glow.

### Experience (`app/experience/page.tsx`)
First element: a prominent link row to the real **Resume** and **LinkedIn**. Below: `ExperienceCard` list (role, company, dates, bullets, stack) from `content/experience.ts`, same visual language as projects.

### Resume (`app/resume/page.tsx`)
Reads `resumeUrl` from `content/site.ts` (Google Drive link, user provides later). Opens the external link in a new tab (button + auto-redirect). Placeholder URL until provided.

### Fun (`app/fun/page.tsx`) — IMPLEMENT LAST
Three stacked sections:
1. **Guitar YouTube tiles** (`youtube-grid.tsx`): grid of cards from `content/fun.ts` `videos[]`; thumbnail (`https://img.youtube.com/vi/<id>/hqdefault.jpg`), title, play overlay, links to the video.
2. **Parallax gallery** (`parallax-gallery.tsx`): 2 layers in brick/offset layout, photos repeat as you scroll. Use `framer-motion` `useScroll` + `useTransform` to move the two layers at different speeds; duplicate the photo arrays to create the seamless repeat.
3. **Places map** (`places-map.tsx`): `react-leaflet` with CartoDB dark tiles; one marker per `places[]` entry; clicking a pin opens a Leaflet popup with a thumbnail photo + short description. Must be `dynamic(() => import(...), { ssr: false })` because Leaflet needs `window`.

## Deployment (Vercel + Porkbun)
- `next.config.mjs`: `output: 'export'`, `images: { unoptimized: true }` (required for static export).
- Push repo to GitHub, import into Vercel (framework auto-detected; build `next build` -> `out/`).
- In Porkbun DNS: add the `A`/`CNAME` records Vercel provides for the apex + `www`, then add the domain in Vercel.
- Per SKILL.md: no auto-commit/push — all git actions are manual by the user.

## Open items the user must supply later (placeholders meanwhile)
- Real intro text + which words shimmer; social URLs + email.
- Project + experience content; resume Google Drive link; LinkedIn URL.
- YouTube video IDs; gallery photos (into `public/images/`); places list (name, lat/lng, thumbnail, description).
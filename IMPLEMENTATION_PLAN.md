# PowerGen Website — Analysis & Implementation Plan

_Last updated: 2026-06-13_

## 1. What exists today

**Stack:** React 19 + Vite 8 + TypeScript 6, React Router 7, Zustand, GSAP, Three.js, lucide-react. ~25k LOC of TS/TSX, ~8k LOC of CSS. Typecheck (`tsc -b`) currently passes.

### Public site (`src/pages`, `src/components`)
- Marketing pages: Home, About, C&I Services, Mini/Metro-Grid Services, Projects (+ detail), News (+ article), Jobs, Contact.
- Rich interactive components: `InteractiveMap`, `AnimatedCounter`, 3D `EnergyFlythrough` hero, `EnergyParticles`, `Mini3DModel` (Three.js), `ProjectCycle`, `ProjectModal`.
- Scroll system: `.reveal` CSS + `useScrollReveal` / `useScrollAnimations` (GSAP).
- A solid design-token system in `index.css` (`:root` vars for color, type, shadow, radius, transitions).

### Custom CMS + visual site-builder (`src/cms`)
- A genuinely ambitious **block-based page builder** (`sitebuilder/`): drag canvas, left block palette, right prop inspector, device preview (desktop/tablet/mobile), zoom, undo/redo, theme toggle, keyboard shortcuts, ~35 registered block types (`registry.ts`).
- `AdminDashboard`: tabs for Overview, Pages, Projects, Menus, News, Jobs, Media, Submissions, raw JSON backup.
- Dual persistence: **offline mode** (localStorage, default) and **live mode** (`server/index.mjs`, a hand-rolled Node `http` API with token auth, file-backed JSON, image upload to `public/images`). Toggled by `VITE_ENABLE_CMS_API`.

### Premium design explorations (`src/pages/premium`)
- Five fully-built alternate design directions (Editorial Grid, Dashboard Telemetry, Clean-Tech Glass, Rugged Industrial, Community/ESG) + a hub with a Three.js globe. These are parallel concept demos, not wired into the main site.

## 2. Assessment — strengths

- Strong visual/brand identity and a coherent token system.
- The block builder is the standout asset; it's well past prototype.
- Content model (`cms/types.ts`, `defaultContent.ts`) is comprehensive and realistic.
- Graceful offline fallback means the site runs with zero backend.

## 3. Gaps & risks (what blocks "full & complete")

### A. Architecture / correctness
1. **Two rendering paths for every page.** `Home.tsx` (and siblings) contain a full hand-coded layout *and* a `SiteRenderer` block path, gated by `if (page.blocks?.length)`. Default content ships blocks, so the hand-coded JSX is largely dead/divergent. Pick one source of truth.
2. **No auth security.** Server compares a plaintext password; offline mode hardcodes `admin@powergen.local / powergen-admin` in client source. Tokens never expire. Fine for a demo, unacceptable for production.
3. **Image upload writes into the repo's `public/images`** at runtime — won't survive most deploys (read-only FS / ephemeral containers). No size/type validation, no CDN.
4. **No tests, no CI, no error boundaries.** A single failing block crashes the whole render tree.
5. **SEO/meta is absent.** SPA with no per-route `<title>`/meta/OG tags, no sitemap, no SSR/prerender — bad for a marketing site that lives on search.
6. **Premium pages + deleted `design/` module** are dead weight in the bundle and ship Three.js scenes on routes users won't hit. Decide: promote one direction or remove.

### B. Performance
7. Multiple always-on Three.js canvases (hero flythrough, particles, mini-models, premium globe) — heavy GPU/CPU, no `prefers-reduced-motion` guard, no lazy-loading or pause-when-offscreen.
8. Partner logos loaded twice (marquee duplication) from a third-party WordPress origin — 56 external requests, no local copies.
9. No route-level code splitting (`React.lazy`); Three.js and GSAP are in the main chunk.

### C. UX / design
10. **Heavy inline styles** throughout `AdminDashboard`/`Home` make theming and consistency hard; mix of CSS classes and inline `style={{}}`.
11. Forms (Contact, Jobs apply, Newsletter) have no validation, no success/error UI states beyond `alert()`, no spam protection.
12. Accessibility: decorative 3D lacks `aria-hidden` in places, color-contrast of `--accent-green` on white is borderline, no skip-link, no focus-visible audit.
13. No 404 page (catch-all silently redirects home — confusing).
14. Mobile nav dropdown logic is `window.innerWidth`-based rather than CSS-driven; fragile.

## 4. Implementation plan

Phased so each phase ships something usable.

> **Progress (2026-06-13): Phase 0 + Phase 1 implemented.**
> - Error boundaries: app-level (`App.tsx`) + per-block (`renderer.tsx`) via new `ErrorBoundary`.
> - Reduced-motion: `usePrefersReducedMotion` hook; gated magnetic effect, particle canvas, 3D hero idle-drift, premium globe.
> - Real 404 page (`NotFound.tsx`) replaces silent redirect.
> - Route-level `React.lazy` + `Suspense`; `typecheck` npm script added.
> - **Render paths (corrected):** Only news/jobs/contact use blocks in client `defaultContent.ts`; those are collapsed to `<SiteRenderer>` only. home/about/projects/ciServices/gridServices ship `blocks: []` and render via inline JSX — their dual-path was KEPT (an earlier collapse wrongly treated the inline as dead code and was reverted). See memory `pg-website-render-paths`.
> - **Premium directions removed** entirely (pages, routes, nav link, magnetic selectors).
> - `ProjectModal` removed (genuinely orphaned). `EnergyFlythrough`/`EnergyParticles`/`PinnedScrollSection` were untracked, lost in the collapse, and **rebuilt fresh** (see below).
> - Result: `tsc -b` clean.
>
> **Phase 2 (partial) implemented:**
> - SEO: new `Seo` component using React 19 native metadata hoisting (title, description, canonical, OG, Twitter, JSON-LD, `noindex`). Wired into all 8 pages + `NewsArticle` (NewsArticle JSON-LD) + `ProjectDetail` + 404 (noindex). Site URL via `VITE_SITE_URL`.
> - Organization JSON-LD on Home.
> - `public/robots.txt` + `public/sitemap.xml`.
> - Form hardening: confirmed block forms already had validation/loading/status parity; added honeypot anti-spam to contact + job-application forms, and email-format validation to job applications.
> - _Still open in Phase 2: SSG/prerender for crawlability (decision-dependent), email/notification on submit._
>
> **3D components rebuilt fresh (after accidental loss of untracked originals):**
> - `EnergyParticles` — recreated exactly + reduced-motion guard.
> - `EnergyFlythrough` — new scroll/parallax Three.js solar-field hero (InstancedMesh panels + glowing nodes, fog depth, mouse parallax, reduced-motion static frame). Verified rendering in-browser.
> - `PinnedScrollSection` — new reusable GSAP pinned horizontal-scroll wrapper (mobile/reduced-motion native-scroll fallback); wired into GridServices O&M cards.
> - Enhanced 3D Home restored. Bundle back to ~1.59 MB (3D hero is eager) — lazy-mounting it is a Phase 4 item.
> - _Remaining for later phases below._

### Phase 0 — Foundation & hygiene (1–2 days)
- Add ESLint/Prettier enforcement + a `typecheck` script; wire a minimal CI (GitHub Actions: install, lint, typecheck, build).
- Add a top-level `ErrorBoundary` and a per-block error boundary in `SiteRenderer`.
- Add `prefers-reduced-motion` global guard; gate all Three.js/GSAP behind it.
- Decide premium pages' fate (recommend: extract the single chosen direction's ideas into the main theme, move the rest behind a `?demo` flag or delete). Remove dead `design/` references.

### Phase 1 — Single rendering source of truth (2–3 days)
- Commit to the **block renderer** as the canonical path. Convert the hand-coded `Home`/`About`/services JSX into registered blocks (most already exist). Delete the divergent inline layouts.
- Ensure every public route is just `<SiteRenderer blocks={page.blocks} />` + the few truly bespoke interactive components mounted as blocks.
- Result: editing in the builder fully controls the live site — the CMS's actual promise.

### Phase 2 — Content, SEO & forms (2–3 days)
- Add `react-helmet-async` (or React 19 native `<title>`/`<meta>`): per-page title/description/OG, JSON-LD for Organization + Articles.
- Generate `sitemap.xml` + `robots.txt` at build.
- Real form handling: client validation, loading/success/error states, honeypot/Turnstile spam guard. Wire to the CMS API (and a real email/notification on submit).
- Consider Vite SSG/prerender (e.g. `vite-plugin-ssr`/`vite-react-ssg`) so marketing pages are crawlable and fast.

### Phase 3 — Backend hardening (2–4 days)
- Replace plaintext auth: hashed passwords (bcrypt/argon2), signed JWT or session cookie with expiry, rate-limited login.
- Move media uploads off the repo: object storage (S3/R2) with signed URLs, type/size validation, image optimization (resize/`webp`).
- Move content store from a flat JSON file to SQLite (or Postgres) with a thin migration; keep the offline localStorage adapter for demo mode.
- Add input validation (zod) on all API routes; structured error responses.

### Phase 4 — Performance (1–2 days)
- Route-level `React.lazy` + `Suspense`; split Three.js/GSAP into async chunks loaded only where used.
- Lazy-mount 3D canvases via `IntersectionObserver`; pause RAF loops when offscreen/tab hidden.
- Self-host partner logos (optimized webp), drop the marquee duplication in favor of CSS `animation` on a single track.
- Add image `width/height`, `loading="lazy"`, responsive `srcset`; run a Lighthouse budget in CI.

### Phase 5 — UX & a11y polish (2–3 days)
- Migrate `AdminDashboard`/`Home` inline styles to CSS modules or a small utility layer; consolidate the admin theme.
- Accessibility pass: skip-link, focus-visible, contrast fixes, `aria` on decorative media, keyboard-navigable builder, real 404 page.
- CSS-driven responsive nav; tidy mobile breakpoints.
- Loading skeletons and empty states across CMS lists.

### Phase 6 — CMS depth (optional, 3–5 days)
- Block drag-reorder + nested/section blocks; per-block visibility + responsive overrides.
- Draft vs published states with preview links; content versioning/rollback (the JSON backup tab hints at this).
- Multi-user roles, audit log.
- i18n scaffolding (the audience is multi-country).

## 5. Recommended sequence & priorities

1. **Phase 0 + 1 first** — they remove the biggest source of bugs (dual render paths) and make the product coherent.
2. **Phase 2** — highest external ROI for a marketing site (SEO + working forms).
3. **Phase 3** — required before any real deployment with an editor.
4. **Phases 4–5** — quality bar for launch.
5. **Phase 6** — differentiators, post-launch.

## 6. Open questions for the owner
- Is this deploying with the live Node CMS, or staying offline/localStorage for a demo?
- Should the five premium directions be consolidated into one chosen theme, or kept as a showcase?
- Target hosting (static host vs Node server vs serverless)? This decides SSG vs SSR and the storage choices in Phase 3.
- Is multi-language needed at launch?

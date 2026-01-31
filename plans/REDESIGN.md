# PCP Website Complete Redesign: "COCKPIT CONTROL"

**Branch:** `website-redesign`
**Status:** In Progress
**Goal:** Working local site that maintainers can browse and review

## The Verdict

The current PCP website is a perfectly preserved fossil from 2013. Ruby 3.1.6 (EOL), Compass (deprecated 2016), float-based grids, IE8 conditional comments, jQuery loading just to sit there doing nothing, and SCSS variables named after B-list celebrities (`$ron-burgundy`, `$macy-grey`).

It works. But it's one macOS update away from becoming unmaintainable.

The good news? That fighter jet logo with the red contrail is genuinely iconic. We're not throwing it away—we're leaning into it hard.

---

## 1. Aesthetic Direction: "Cockpit Control"

**Concept:** Aviation instrument panel meets modern data visualization. The precision and clarity of a fighter jet's HUD, combined with the sleek authority of a mission control dashboard.

**Why this works:**
- PCP is about performance MONITORING—cockpit instruments ARE performance monitors
- The jet logo has decades of brand equity
- Aviation aesthetics communicate precision, reliability, high performance
- Distinctive enough that nobody confuses this with generic Bootstrap templates
- Enterprise customers (Red Hat, Netflix) expect professional gravitas

**Visual language:**
- Dark mode primary (deep navy `#0a1628`) with high-contrast data accents
- "Instrument panel" cards with subtle bezels and inset shadows
- Thin accent lines reminiscent of HUD overlays
- Red contrail accent (`#ff4444`), cyan data accent (`#00d4ff`), amber warnings (`#ffaa00`)
- Subtle scanline/grid texture overlays for depth

---

## 2. Build System: Astro + Tailwind CSS

**Why Astro:**
- Zero JS by default, component islands for interactivity
- Content collections perfect for GSoC/GSoD/news archives
- Framework agnostic (add React/Vue components if needed later)
- Outputs pure HTML/CSS/JS to `docs/` folder—GitHub Pages deployment unchanged
- Excellent image optimization built-in
- Actually maintained (unlike Compass)

**Why Tailwind:**
- Design tokens via CSS custom properties
- JIT compilation (only ships CSS you use)
- Built-in dark/light mode support
- No dead CSS accumulating over years
- One config file, not 47 nested SCSS mixins

**What we're deleting (good riddance):**
- Ruby 3.1.6 dependency
- Compass (dead since 2016)
- sass-globbing (dead since 2016)
- jQuery (loads and does nothing)
- Modernizr (50KB of unnecessary feature detection)
- IE8/9 conditional comments
- Float-based grid system
- That entire `script.js` file (it's literally a template)

---

## 3. Color Palette

```css
/* Core - Dark Mode */
--color-void: #030712;        /* Deepest background */
--color-space: #0a1628;       /* Primary background */
--color-panel: #111827;       /* Card/panel background */
--color-instrument: #1f2937;  /* Elevated surfaces */

/* HUD Accents */
--color-contrail: #ff4444;    /* Primary action (from logo) */
--color-data: #00d4ff;        /* Cyan - links, data viz */
--color-status-ok: #22c55e;   /* Green */
--color-status-warn: #f59e0b; /* Amber */
```

**Dark mode only.** We're committing fully to the cockpit aesthetic. No light mode toggle—this breathes "hard-core terminal performance monitoring."

---

## 4. Typography

- **Primary:** Inter (variable font, excellent number rendering for metrics)
- **Monospace:** JetBrains Mono (superior code readability, ligatures)
- **Fluid scale:** Using `clamp()` for responsive sizing without breakpoints

---

## 5. Information Architecture

**Current:** 23 pages, 4 nav items, news buried in homepage

**Proposed Navigation:**
```
[Logo] [Features ▼] [Docs ▼] [Download ▼] [Community ▼] [Search]
```

**New pages to add:**
- `/news/` — Dedicated releases archive (currently buried in homepage)
- `/integrations/` — Grafana, Ansible, OpenTelemetry ecosystem

**Pages to consolidate:**
- `glider.haml` + `screenshots.haml` → `/gallery/`
- `presentations.haml` → content collection under docs
- GSoC/GSoD years → content collections with dynamic routing

---

## Implementation Status

### Phase 0: Setup ✅
- [x] Create new branch `website-redesign`
- [x] Create `plans/` directory in project root for tracking
- [x] Copy this plan to `plans/REDESIGN.md`

### Phase 1: Foundation ✅ COMPLETE
**Goal:** New build system working, browsable locally

- [x] Initialize Astro project with Tailwind CSS
- [x] Create base layout (Header, Footer, Navigation)
- [x] Define CSS custom properties (colors, typography)
- [x] Migrate homepage content to Astro
- [ ] Set up content collections for news/releases (deferred to Phase 3)
- [x] Configure build to output to `docs/` (for eventual GitHub Pages)
- [x] Create noob-friendly `README.md` and `CONTRIBUTING.md`
- [x] Verify `npm run dev` works and site is browsable at localhost
- [x] Preserve CNAME and GPG-KEY-PCP for deployment

**Deliverable:** ✅ Working local dev server at http://localhost:4321/

**Commit:** fbbcec0 "Phase 1: Astro + Tailwind foundation with Cockpit Control aesthetic"

**Results:**
- Build works: `npm run build` outputs to `docs/`
- Dev server works: `npm run dev` serves at localhost:4321
- CSS reduced from ~200KB to 20KB (10x improvement)
- Zero JavaScript on homepage (was loading jQuery + Modernizr)
- Dark mode "Cockpit Control" aesthetic implemented
- Homepage fully migrated with feature cards, CTA, news section

### Phase 2: Visual Redesign ✅ COMPLETE
**Goal:** Apply the "Cockpit Control" dark-mode aesthetic

- [x] Implement dark color scheme (completed in Phase 1)
- [x] New Header with navigation (basic version done)
- [x] New hero component with grid overlay (done)
- [x] Create Card, Button, CodeBlock components (all done)
- [x] Redesign homepage layout (done)
- [x] Migrate Features page (done)
- [x] Migrate Download page (done)
- [x] Add dropdown navigation menus
- [x] Mobile-responsive navigation with hamburger menu
- [x] Logo redesign (optimized SVG from 655 lines → 48 lines)

**Deliverable:** 3 pages fully migrated with cohesive aesthetic

**Commits:**
- d584146 "Phase 2: Features and Download pages with Cockpit aesthetic"
- [pending] "Phase 2 complete: Navigation dropdowns and optimized logo"

**Results:**
- Features page: 4 sections with alternating backgrounds, screenshot integration
- Download page: 6 platform cards with CodeBlock components
- URL format: Maintains `.html` extension for backward compatibility
- Design system scales well across multiple page types
- Navigation: CSS-only dropdowns with cyan glow on hover
- Mobile: Full-screen slide-in menu with backdrop blur
- Logo: Optimized from 174KB bloat down to <5KB SVG

### Phase 3: Content Migration (IN PROGRESS)
**Goal:** All pages migrated with new styling

#### 3.1: Content Collections Setup
Set up Astro content collections for structured content that repeats across years:

- [ ] Create `src/content/config.ts` with schema definitions
- [ ] Set up `news/` collection for release announcements
- [ ] Set up `gsoc/` collection for GSoC project years (2015-2022)
- [ ] Set up `gsod/` collection for GSoD years (2019-2021)
- [ ] Set up `conference/` collection for conference pages (2018-2019)
- [ ] Create dynamic routes for collection pages (`[...slug].astro`)

**Strategy:** Use Markdown frontmatter for metadata (year, title, status) and keep existing content structure. This gives us:
- Type-safe content validation
- Auto-generated routes
- Easy filtering/sorting by year
- Future-proof for adding new years

#### 3.2: Core Pages Migration (Priority 1)
These are the main navigation pages that need immediate migration:

- [ ] **Documentation** (`documentation.haml` → `documentation.astro`)
  - Hero with Installation + Quick Reference CTAs
  - Grid of documentation resources (man pages, guides, slides, papers)
  - Links to external ReadTheDocs and man7.org

- [ ] **Community** (`community.haml` → `community.astro`)
  - Welcome text + contribution guidelines
  - Links to GitHub issues, mailing list, Slack, IRC
  - GSoC/GSoD participation info
  - Team/contributors section

- [ ] **FAQ** (`faq.haml` → `faq.astro`)
  - Two-column question index (General + Philosophical)
  - Anchor-linked Q&A sections
  - Consider accordion component for better UX

#### 3.3: Supporting Pages (Priority 2)

- [ ] **Team** (`team.haml` → `team.astro`)
  - Grid of team members with photos/bios
  - May need new `TeamCard.astro` component

- [ ] **Testimonials** (`testimonials.haml` → `testimonials.astro`)
  - User quotes from enterprise deployments
  - Could use Card component with quote styling

- [ ] **Gallery** (consolidate `glider.haml` + `screenshots.haml`)
  - Screenshot showcase with lightbox/modal
  - Organize by feature area (pmchart, grafana, bpftrace, etc.)
  - May need new `LightboxGallery.astro` component

- [ ] **Presentations** (`presentations.haml` → `presentations.astro`)
  - List of papers/slides with download links
  - Link to `/papers/` static files

#### 3.4: Content Collection Pages (Priority 3)
Migrate structured multi-year content using collections:

- [ ] **GSoC Archive**
  - Create `/gsoc/[year].astro` dynamic route
  - Migrate 8 years of ideas pages (2015-2022)
  - Add `/gsoc/index.astro` landing page with year listing
  - Migrate `contributors.haml` → `/gsoc/contributors.astro`

- [ ] **GSoD Archive**
  - Create `/gsod/[year].astro` dynamic route
  - Migrate 2019-2021 content
  - Handle case study and proposal pages

- [ ] **Conference Archive**
  - Create `/conference/[year].astro` dynamic route
  - Migrate 2018-2019 conference sites
  - Each has home, schedule, contact pages

- [ ] **News/Releases**
  - Create `/news/[slug].astro` for individual releases
  - Create `/news/index.astro` archive page
  - Extract news items from homepage into markdown files

#### 3.5: Miscellaneous

- [ ] Check what `website.haml` is (may be meta/about page)
- [ ] Ensure all static assets migrated (images, papers, GPG keys)
- [ ] Update internal links to use `.html` extensions for backward compat
- [ ] Create 404 page

#### 3.6: Components to Build

- [ ] `Accordion.astro` or `Collapsible.astro` (for FAQ)
- [ ] `TeamCard.astro` (for team members)
- [ ] `Quote.astro` or `Testimonial.astro` (for testimonials)
- [ ] `LightboxGallery.astro` or just use external library
- [ ] `Breadcrumb.astro` (for deep content like /gsoc/2022/ideas)

**Deliverable:** All 20+ pages migrated to Astro with consistent styling

**Commits Strategy:**
- One commit per major page migration (e.g., "Migrate documentation page")
- One commit for content collections setup
- Incremental, reviewable changes

---

### Phase 4: Polish & Review (PENDING)
**Goal:** Working local site for maintainer review

- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsiveness testing (iOS Safari, Chrome Mobile)
- [ ] Link validation (all internal/external links work)
- [ ] Image optimization (verify all images load correctly)
- [ ] Performance audit (Lighthouse scores)
- [ ] Accessibility audit (a11y compliance)
- [ ] Maintainer review and feedback
- [ ] Final fixes based on feedback
- [ ] Update deployment documentation

---

## Notes

- Original plan created during planning session
- Implementation started: 2026-01-31
- See full design rationale in original plan document

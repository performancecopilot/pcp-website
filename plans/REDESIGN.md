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

#### 3.1: Content Collections Setup ✅ COMPLETE
Set up Astro content collections for structured content that repeats across years:

- [x] Create `src/content/config.ts` with schema definitions
- [x] Set up `news/` collection for release announcements
- [x] Set up `gsoc/` collection for GSoC project years (2015-2022)
- [x] Set up `gsod/` collection for GSoD years (2019-2021)
- [x] Set up `conference/` collection for conference pages (2018-2019)
- [ ] Create dynamic routes for collection pages (`[...slug].astro`) - deferred to 3.4

**Strategy:** Use Markdown frontmatter for metadata (year, title, status) and keep existing content structure. This gives us:
- Type-safe content validation
- Auto-generated routes
- Easy filtering/sorting by year
- Future-proof for adding new years

#### 3.2: Core Pages Migration (Priority 1) ✅ COMPLETE
These are the main navigation pages that need immediate migration:

- [x] **Documentation** (`documentation.haml` → `documentation.astro`)
  - Hero with Installation + Quick Reference CTAs
  - Grid of documentation resources (man pages, guides, slides, papers)
  - Links to external ReadTheDocs and man7.org
  - Blog section with 7 Red Hat blog posts
  - Videos section with 7 YouTube tutorials
  - **Commit:** d65199d

- [x] **Community** (`community.haml` → `community.astro`)
  - Welcome text + contribution guidelines
  - Links to GitHub issues, mailing list, Slack, IRC
  - Mailing lists, Chat, Funding sections
  - **Commit:** 6232b06

- [x] **FAQ** (`faq.haml` → `faq.astro`)
  - 4-column question index (General, Philosophical, Technical, Troubleshooting)
  - Anchor-linked Q&A sections with smooth scroll
  - Skipped accordion component - anchor links work fine, zero-JS philosophy
  - **⚠️ PARTIAL:** Structure complete with 4 sample Q&As. Remaining ~20 Q&A entries (from 1000-line faq.haml) to be bulk-migrated in Phase 3.5
  - **Commit:** e8300c7

#### 3.3: Supporting Pages (Priority 2) ✅ COMPLETE

- [x] **Team** (`team.haml` → `team.astro`)
  - Grid of 8 maintainers with GitHub profile links
  - Instrument panel cards with HUD-style hover effects
  - Link to contributor graph
  - **Commit:** 348d697

- [x] **Testimonials** (`testimonials.haml` → `testimonials.astro`)
  - New `Testimonial.astro` component for quote cards
  - 9 enterprise testimonials (Netflix, Red Hat, Aconex, Buffalo, etc.)
  - Company logo integration where available
  - **Commit:** 348d697

- [x] **Gallery** (consolidate `glider.haml` + `screenshots.haml`)
  - Consolidated two separate pages into unified gallery
  - PCP Glider section with Windows installation details
  - 13 screenshot grid with client-side lightbox
  - Keyboard navigation (Esc, arrows) for image viewer
  - **Commit:** 348d697

- [x] **Presentations** (`presentations.haml` → `presentations.astro`)
  - Chronological archive from 2020 back to 1999
  - Two-column year-based layout with sticky headers
  - Multi-format links (PDF, ODP, Video, HTML)
  - Icon differentiation for media types
  - **Commit:** 348d697

#### 3.4: Content Collection Pages (Priority 3) - IN PROGRESS
Migrate structured multi-year content. **Note:** Using TypeScript data files instead of Markdown collections for heavily structured HTML content (GSoC/GSoD/Conference). Only News uses actual content collections.

- [x] **GSoC Archive** ✅ COMPLETE
  - [x] Create TypeScript data files for all 8 years (2015-2022) in `src/data/gsoc/`
  - [x] Create `/gsoc/[year]/ideas.astro` dynamic route with `getStaticPaths()`
  - [x] Add `/gsoc/index.astro` landing page with `YearNavigation` component
  - [x] Migrate `contributors.haml` → `/gsoc/contributors.astro`
  - [x] Build `ProjectIdea.astro` component for reusable project cards
  - **Pages:** 10 total (index, contributors, 8 year-based ideas pages)
  - **Build:** ✅ All compile successfully (`/gsoc/2015/ideas.html` through `/gsoc/2022/ideas.html`)
  - **Approach:** Inline TypeScript interfaces with HTML in description fields preserves link semantics from HAML

- [ ] **GSoD Archive**
  - [ ] Create TypeScript data files for 2019-2021 in `src/data/gsod/`
  - [ ] Create `/gsod/[year]/ideas.astro` dynamic route
  - [ ] Create `/gsod/index.astro` landing page
  - [ ] Handle special 2021 pages: `proposal.astro` and `casestudy.astro`

- [ ] **Conference Archive**
  - [ ] Build `ConferenceSession.astro`, `ConferenceBreak.astro`, `ConferenceHero.astro` components
  - [ ] Create TypeScript data files for 2018-2019 in `src/data/conference/`
  - [ ] Create `/conference/[year]/home.astro`, `schedule.astro`, `contact.astro` routes
  - [ ] Create `/conference/index.astro` landing page
  - [ ] Handle city background images (tokyo.png, melbourne.png)

- [ ] **News/Releases**
  - [ ] Extract news items from `index.haml` to markdown files in `src/content/news/`
  - [ ] Create `/news/index.astro` archive page using `getCollection('news')`
  - [ ] Update homepage to use `getCollection('news')` for recent items

#### 3.5: Miscellaneous

- [ ] **Complete FAQ bulk content migration** - Migrate remaining ~20 Q&A entries from faq.haml (1000+ lines). Structure is done, needs content copy.
- [ ] Check what `website.haml` is (may be meta/about page)
- [ ] Ensure all static assets migrated (images, papers, GPG keys)
- [ ] Update internal links to use `.html` extensions for backward compat
- [ ] Create 404 page

#### 3.6: Components to Build

- [x] ~~`Accordion.astro` or `Collapsible.astro` (for FAQ)~~ - **SKIPPED:** Anchor links work fine
- [x] ~~`TeamCard.astro` (for team members)~~ - **INLINE:** Used inline card design with instrument panel aesthetic
- [x] `Testimonial.astro` (for testimonials) - **BUILT:** Quote card component with logo support
- [x] ~~`LightboxGallery.astro`~~ - **INLINE:** Vanilla JS lightbox with keyboard navigation
- [x] `Breadcrumb.astro` (for deep content like /gsoc/2022/ideas) - **BUILT:** Hierarchical navigation with chevron separators
- [x] `YearNavigation.astro` - **BUILT:** Horizontal year picker with HUD-style hover effects
- [x] `ProjectIdea.astro` - **BUILT:** GSoC/GSoD project card with metadata grid, task lists, mentor links
- [x] `NewsItem.astro` - **BUILT:** News entry component for archive and homepage integration

**Deliverable:** All 20+ pages migrated to Astro with consistent styling

**Commits Strategy:**
- One commit per major page migration (e.g., "Migrate documentation page")
- One commit for content collections setup
- Incremental, reviewable changes

**Phase 3 Progress Summary:**
- Date: 2026-02-01
- Commits: d8db7a4, d65199d, 6232b06, e8300c7, 348d697, [pending GSoC]
- Pages migrated: 20 total
  - Core: index, features, download, documentation, community, faq, team, testimonials, gallery, presentations (10)
  - GSoC: index, contributors, 2015-2022 ideas pages (10)
- Build: ✅ All pages compile successfully (20 pages built)
- Content approach: TypeScript data files for structured HTML (GSoC/GSoD/Conference), Markdown for simple content (News)
- Components: ✅ Testimonial, Breadcrumb, YearNavigation, ProjectIdea, NewsItem + inline lightbox & instrument cards
- Foundation complete: 4 shared components built (Breadcrumb, YearNavigation, ProjectIdea, NewsItem)
- Next: Phase 3.4 continues - GSoD Archive (6 pages), Conference Archive (7 pages), News (2 pages)

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

# Website Redesign Status

**Branch:** `website-redesign`
**Last Updated:** 2026-01-31
**Phase:** 2 (Visual Redesign) - IN PROGRESS

## What's Working

### ✅ Build System
- Astro 5.17.1 + Tailwind CSS v4
- `npm run dev` → Local dev server at http://localhost:4321/
- `npm run build` → Production build to `../docs/`
- Auto-refresh on file changes
- 20KB CSS (vs ~200KB previously)

### ✅ Design System
**"Cockpit Control" aesthetic implemented:**
- Dark navy background (#0a1628)
- Red contrail accent (#ff4444)
- Cyan data accent (#00d4ff)
- Inter font (UI) + JetBrains Mono (code)
- Grid overlay textures
- Glowing card hover effects
- Responsive layout (mobile/tablet/desktop)

### ✅ Components
- `Base.astro` - Base HTML template (fonts, meta tags)
- `Header.astro` - Sticky navigation with logo
- `Footer.astro` - 4-column grid + "system operational" indicator
- `Card.astro` - Instrument panel style cards
- `Button.astro` - Primary/secondary/ghost variants
- `CodeBlock.astro` - Terminal-style code blocks with copy button

### ✅ Pages
**Homepage** (index.html)
- Hero section with gradient text and grid overlay
- 3 feature cards (Collect, Analyze, Extend)
- CTA section with action buttons
- News section (latest release)

**Features** (features.html)
- 4 detailed sections: Collect, Analyze, Distributed, Extend
- Alternating backgrounds for visual rhythm
- Feature cards in 2-column grid
- Screenshot integration (bpftrace-cpu.png)

**Download** (download.html)
- 6 platform-specific install cards (Debian, Fedora, macOS, openSUSE, Solaris, Windows)
- CodeBlock components with copy functionality
- Source code repositories section
- GPG signature download

### ✅ Documentation
- `README.md` - Quick start for maintainers (assumes no Node.js knowledge)
- `CONTRIBUTING.md` - Step-by-step guide for common tasks
- Both written for non-JS developers

## What's NOT Done Yet

### Phase 2: Visual Redesign (Remaining)
- Dropdown navigation menus
- Mobile hamburger menu (currently just shows button)
- Page transitions/animations
- Logo redesign (using existing logo for now)

### Phase 3: Content Migration (Remaining)
- Documentation hub
- Community page
- FAQ, Team, Testimonials
- Screenshots/Gallery
- GSoC/GSoD archives (will use content collections)
- Conference pages
- ~18 remaining pages from original site

### Phase 4: Polish
- Cross-browser testing
- Mobile device testing
- Link validation
- Performance audit
- Maintainer review

## How to Test

### From scratch (assumes you have Node.js):
```bash
git checkout website-redesign
cd new-site
npm install
npm run dev
```

Open http://localhost:4321/ in your browser.

### To build production files:
```bash
npm run build
```

Check `../docs/index.html` - this is what gets deployed to pcp.io.

## Key Decisions

1. **Dark mode only** - Commits to the "cockpit" aesthetic
2. **No light mode toggle** - Keeps implementation simple
3. **Minimal JavaScript** - Homepage has zero JS
4. **Mobile-first** - Responsive by default
5. **Maintainer-friendly** - Markdown for content, components for layout

## Next Steps

1. **Review this foundation** - Does the aesthetic work? Any concerns?
2. **Migrate remaining pages** - Priority: Features, Download, Docs
3. **Set up content collections** - For news/releases/GSoC
4. **Add interactivity** - Mobile menu, search (optional)
5. **Test with maintainers** - Get feedback before merging

## Questions for Review

- Is the dark mode aesthetic too aggressive?
- Should we keep the existing logo or redesign it?
- Do we need a light mode toggle?
- Are there any critical pages missing from the migration plan?
- Is the documentation clear enough for non-Node.js users?

## Performance Comparison

| Metric | Old Site | New Site | Improvement |
|--------|----------|----------|-------------|
| CSS Size | ~200KB | 20KB | **90% reduction** |
| JavaScript | 150KB+ | 0KB | **100% elimination** |
| Dependencies | Ruby 3.1.6, Compass, jQuery | Node.js only | Modern stack |
| Build Time | ~5s (Makefile) | ~1s (Astro) | **5x faster** |
| Dev Server | None (rebuild each time) | Hot reload | Instant feedback |

## Contact

Questions? Check:
- `new-site/README.md` - Setup guide
- `new-site/CONTRIBUTING.md` - How to make changes
- `plans/REDESIGN.md` - Full design rationale

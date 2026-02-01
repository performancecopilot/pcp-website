# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Performance Co-Pilot (PCP) website at https://pcp.io. This is a static site generator built with Ruby, HAML templates, SASS/Compass for styling, and published to GitHub Pages.

## Build System

The site uses a custom Makefile-based build system with the following commands:

- `make` - Clean and build the entire site (equivalent to `make clean default`)
- `make default` - Build the site without cleaning (compiles HAML → HTML, SCSS → CSS)
- `make check` - Run linkchecker to validate all links on the live site
- `make clean` - Remove generated files

The build process:
1. Compiles Compass SCSS files to compressed CSS
2. Converts HAML templates to HTML in the `docs/` directory
3. Syncs images and documentation from the PCP git repository (../pcp)
4. Syncs static assets (images, papers, GPG keys) to docs/
5. Stages changes in git (does NOT commit)

## Architecture

### HAML Template Structure

Each page is a standalone HAML file (e.g., `index.haml`, `features.haml`, `documentation.haml`) that includes shared components:
- `assets/haml-includes/head.haml` - Common head metadata and CSS links
- `assets/haml-includes/navigation.haml` - Global navigation header
- `assets/haml-includes/footer.haml` - Site footer

HAML files use Ruby's `Haml::Engine.new(File.read(...)).render` pattern to include shared components.

### Directory Layout

- Root `.haml` files → compiled to `docs/*.html`
- `gsoc/`, `gsod/`, `conference/` subdirectories contain year-specific HAML files
- `assets/` - CSS, JavaScript, and HAML includes
- `compass/config.rb` - Compass configuration for SCSS compilation
- `docs/` - Output directory (published to GitHub Pages)
- `images/`, `snaps/`, `papers/` - Static assets synced to docs/

### External Dependencies

The build expects a sibling PCP git repository at `../pcp` containing:
- `images/` - Synced to the website's images directory
- `html/*` - Documentation files synced to `docs/docs`

This dependency is checked with `test -d` in the Makefile and skipped if not present.

## Release Process

See `NEWRELEASE` for the full process. Website updates for new releases:

1. Edit `index.haml` - Replace the last news item with the new release announcement
2. Run `make` to build the site
3. The Makefile runs `git add docs && git status` but does NOT commit
4. Manually commit and push changes

## Styling

- Built with Sassaparilla CSS framework
- Uses Compass with sass-globbing
- SCSS precision set to 7 for Chrome compatibility
- CSS compiled to `assets/css/` with compressed output style
- Main stylesheets: `assets/css/screen.scss` and `assets/css/main.scss`

## Development Setup

Prerequisites (from README):
- Ruby with development headers
- rubygem-haml
- sass-globbing and compass gems (`gem install sass-globbing compass`)
- lynx, rsync, linkchecker (for validation)

After changes to HAML or SCSS files, run `make` to rebuild the site. The output in `docs/` is what gets published to GitHub Pages.

## Ruby Version Management

**CRITICAL:** This project requires Ruby 3.1.6 due to legacy gem compatibility. Modern Ruby versions (3.2+) will fail.

### Setup with rbenv (macOS)

```bash
brew install rbenv ruby-build
eval "$(rbenv init - zsh)"  # Add to ~/.zshrc
rbenv install 3.1.6
rbenv global 3.1.6
gem install haml -v 5.2.2
gem install compass sass-globbing
rbenv rehash
```

### Version Requirements

- Ruby: 3.1.6 (last version compatible with Compass 1.0.3)
- haml: 5.2.2 (haml 6.x has breaking changes)
- compass: 1.0.3 (requires Ruby < 3.2, uses deprecated File.exists?)
- sass-globbing: 1.1.5+

### Troubleshooting

- `File.exists?` error → Using Ruby 3.2+, downgrade to 3.1.6
- `to_hash` error → Using haml 6.x, downgrade to 5.2.2
- `compass: command not found` → Run `rbenv rehash` after gem install
- Compass deprecation warnings about interpolation → Safe to ignore

## Astro Redesign (website-redesign branch)

**NEW:** A modern Astro-based redesign is being built in `new-site/` directory alongside the legacy HAML site.

### Build Commands

- `cd new-site && npm run dev` - Start dev server at http://localhost:4321
- `cd new-site && npm run build` - Build to `../docs/` for GitHub Pages
- Output location: `docs/*.html` (same as legacy build for deployment compatibility)

### Astro Page Structure (CRITICAL)

**Every page in `new-site/src/pages/*.astro` MUST include:**

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
---

<Base title="Page Title - Performance Co-Pilot">
  <Header />

  <!-- page content -->

  <Footer />
</Base>
```

**Validation before commit:**
```bash
grep -L "import Header" new-site/src/pages/*.astro
# Should return nothing. If files are listed, they're missing Header/Footer.
```

### Styling Notes

- Uses CSS custom properties (e.g., `var(--color-data)`, `var(--color-contrail)`)
- **Cannot use Tailwind utilities in scoped `<style>` blocks** - use CSS properties directly
- Color palette defined in `new-site/src/styles/global.css`
- "Cockpit Control" design system: dark navy backgrounds, HUD-inspired UI, aviation instrument panels

### Component Locations

- Layout: `new-site/src/components/layout/` (Header, Footer, MobileMenu, NavDropdown)
- UI: `new-site/src/components/ui/` (Button, Card, CodeBlock, Testimonial)
- Pages: `new-site/src/pages/*.astro` (outputs to `docs/*.html`)

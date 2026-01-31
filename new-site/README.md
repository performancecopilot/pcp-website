# PCP Website (Redesigned)

Modern rebuild of the Performance Co-Pilot website using Astro + Tailwind CSS.

## Quick Start

If you've never used Node.js or npm before, don't panic. Here's everything you need:

### 1. Install Node.js

**macOS (with Homebrew):**
```bash
brew install node
```

**Or download directly:**
Visit https://nodejs.org/ and download the LTS version (20.x or later).

### 2. Install Dependencies

From this directory (`new-site/`):
```bash
npm install
```

This downloads all the packages needed to build the site. Takes about 30 seconds.

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser to **http://localhost:4321/** to see the site.

The dev server auto-refreshes when you edit files. Press `Ctrl+C` to stop it.

### 4. Build for Production

```bash
npm run build
```

This creates the final HTML/CSS/JS files in the `../docs/` directory (the parent folder), which is what GitHub Pages publishes.

## Project Structure

```
new-site/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── layout/       # Header, Footer, Navigation
│   │   └── ui/           # Button, Card, etc.
│   ├── layouts/          # Page templates (Base.astro)
│   ├── pages/            # Website pages (index.astro → index.html)
│   └── styles/           # Global CSS (design tokens)
├── public/               # Static assets (images, papers, PDFs)
└── astro.config.mjs      # Build configuration
```

## Making Changes

### Editing Pages

Pages live in `src/pages/`. For example:
- `src/pages/index.astro` → homepage (/)
- `src/pages/features.astro` → /features.html

Each `.astro` file is like HTML with superpowers:
```astro
---
// JavaScript/imports go here (runs at build time)
import Base from '../layouts/Base.astro';
---

<Base title="Page Title">
  <h1>Regular HTML here</h1>
</Base>
```

### Editing Components

Components in `src/components/` are reusable chunks of UI. For example, the header navigation is in `src/components/layout/Header.astro`.

Edit components to change how they look everywhere they're used.

### Adding News Items

(Future: will use content collections)

For now, edit the News section directly in `src/pages/index.astro`.

### Styling

The design system lives in `src/styles/global.css`. Colors, fonts, and spacing are defined as CSS variables:

```css
var(--color-contrail)  /* Red accent color */
var(--color-data)      /* Cyan accent color */
var(--color-space)     /* Dark navy background */
```

Tailwind utility classes use these variables: `bg-[var(--color-space)]`

## Common Tasks

### Adding a New Page

1. Create `src/pages/mypage.astro`
2. Import and use the Base layout
3. Run `npm run dev` to preview
4. It will be built to `docs/mypage.html`

### Updating Navigation

Edit `src/components/layout/Header.astro` and modify the `navItems` array.

### Updating Footer Links

Edit `src/components/layout/Footer.astro` and modify the `footerLinks` object.

## Troubleshooting

**"npm: command not found"**
→ Install Node.js first (see step 1 above)

**"Port 4321 already in use"**
→ Another dev server is running. Stop it or use `npm run dev -- --port 4322`

**Changes not showing up**
→ Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

**Build errors**
→ Read the error message carefully. Most errors tell you exactly which file and line has the problem.

## Design System: "Cockpit Control"

This redesign uses an aviation/instrument panel aesthetic:
- Dark mode only (deep navy `#0a1628`)
- Red contrail accent (from the PCP logo)
- Cyan data highlights
- Clean, technical typography (Inter + JetBrains Mono)
- Subtle grid overlays and glowing borders

Think fighter jet HUD meets performance monitoring dashboard.

## Getting Help

- **Astro docs:** https://docs.astro.build/
- **Tailwind docs:** https://tailwindcss.com/docs
- **Questions?** Ask on the PCP mailing list or open a GitHub issue

## Deployment

The build outputs to `../docs/` which is already configured for GitHub Pages. The existing deployment workflow should work unchanged - just run `npm run build` before committing.

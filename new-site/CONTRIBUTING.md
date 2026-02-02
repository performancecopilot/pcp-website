# Contributing to the PCP Website

This guide assumes you're comfortable with git but might be new to Node.js, npm, and modern web development. We'll walk through everything step-by-step.

## First-Time Setup

### 1. Clone the Repository (if you haven't already)

```bash
git clone https://github.com/performancecopilot/pcp-website.git
cd pcp-website
```

### 2. Install Node.js

The website build system requires Node.js (JavaScript runtime) and npm (package manager).

**Check if you already have it:**
```bash
node --version
npm --version
```

If you see version numbers (e.g., `v20.11.0`), you're good to go.

**If not, install Node.js:**

**macOS (recommended - using Homebrew):**
```bash
brew install node
```

**macOS/Linux (alternative - using nvm):**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

**Windows:**
Download from https://nodejs.org/ (get the LTS version).

### 3. Switch to the Redesign Branch

```bash
git checkout website-redesign
```

### 4. Navigate to the New Site Directory

```bash
cd new-site
```

### 5. Install Dependencies

This downloads all the packages needed to build the site (Astro, Tailwind, etc.):

```bash
npm install
```

**First time?** This takes 30-60 seconds and creates a `node_modules/` directory with ~250MB of packages. This is normal.

### 6. Start the Development Server

```bash
npm run dev
```

You should see output like:
```
astro  v5.17.1 ready in 524 ms

┃ Local    http://localhost:4321/
```

Open **http://localhost:4321/** in your browser. You should see the redesigned PCP homepage with a dark navy background and red/cyan accents.

**The dev server auto-refreshes** when you edit files. Leave it running while you work.

Press `Ctrl+C` to stop the server when you're done.

---

## Making Changes

### Editing Existing Pages

All pages are in `src/pages/`. Open any `.astro` file in your text editor:

```bash
# Examples
vim src/pages/index.astro          # Homepage
vim src/pages/features.astro       # Features page (you'll create this)
```

Save the file. The browser auto-refreshes. That's it.

### Adding a News Item

**Current method (Phase 1):**

Edit `src/pages/index.astro` directly. Find the News section (around line 119) and add a new `<Card>` block:

```astro
<Card>
  <div class="flex flex-col md:flex-row gap-6">
    <div class="md:w-32 flex-shrink-0">
      <div class="text-[var(--color-data)] font-mono">
        <div class="text-sm">Feb 2026</div>
        <div class="text-xl font-bold">PCP 7.2.0</div>
      </div>
    </div>
    <div class="flex-1 text-[var(--color-text-secondary)]">
      <p>
        Your release announcement text here...
      </p>
    </div>
  </div>
</Card>
```

**Future method (Phase 3):**

We'll migrate news to content collections so you can just create a markdown file:

```bash
echo "---
title: 'PCP 7.2.0'
date: 2026-02-15
---
Release notes here..." > src/content/news/2026-02-pcp-7.2.0.md
```

### Updating Navigation Links

Edit `src/components/layout/Header.astro`:

```javascript
const navItems = [
  { label: 'Features', href: '/features.html' },
  { label: 'Documentation', href: '/documentation.html' },
  { label: 'Download', href: '/download.html' },
  { label: 'Community', href: '/community.html' },
  // Add new items here
];
```

### Changing Colors

Edit `src/styles/global.css`:

```css
:root {
  --color-contrail: #ff4444;    /* Red accent - change this */
  --color-data: #00d4ff;        /* Cyan accent - change this */
  /* etc. */
}
```

All components reference these variables, so changing them here updates the entire site.

---

## Building for Production

When you're ready to publish changes:

### 1. Build the Site

```bash
npm run build
```

This compiles everything and outputs HTML/CSS/JS to `../docs/` (the parent directory).

**Why `../docs/`?** GitHub Pages is already configured to publish from the `docs/` directory. This keeps the deployment workflow unchanged.

### 2. Preview the Build (Optional)

```bash
npm run preview
```

Opens a local server showing exactly what the production build looks like.

### 3. Commit and Push

```bash
cd ..  # Back to pcp-website root
git add docs/ new-site/
git commit -m "Update homepage with PCP 7.2.0 release"
git push origin website-redesign
```

---

## Common Tasks (Copy-Paste Commands)

### Adding a New Page

```bash
# Create the file
cat > src/pages/newpage.astro << 'EOF'
---
import Base from '../layouts/Base.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
---

<Base title="New Page - PCP">
  <Header />
  <main class="container mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-6">
      New Page
    </h1>
    <p class="text-[var(--color-text-secondary)]">
      Content goes here.
    </p>
  </main>
  <Footer />
</Base>
EOF

# View it at http://localhost:4321/newpage.html
```

### Updating a Release Date

```bash
# Find and replace in the homepage
sed -i '' 's/Jan 2026/Feb 2026/g' src/pages/index.astro
```

### Copying Images from Old Site

If you need an image that's not in `public/images/`:

```bash
# From new-site/ directory
cp ../images/somefile.png public/images/
```

Then reference it in Astro files as `/images/somefile.png`.

---

## Troubleshooting

### "npm: command not found"

Node.js isn't installed. See "Install Node.js" above.

### "Cannot find module 'astro'"

Dependencies aren't installed. Run:
```bash
npm install
```

### "Port 4321 already in use"

Another dev server is running. Find it:
```bash
lsof -i :4321
```

Kill it:
```bash
kill <PID>
```

Or use a different port:
```bash
npm run dev -- --port 4322
```

### Changes Aren't Showing Up

1. **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
2. **Check the terminal:** The dev server might show a build error
3. **Restart the server:** `Ctrl+C`, then `npm run dev` again

### Build Fails

Read the error message. Astro errors are usually very clear:

```
Error: Could not find image at /images/missing.png
```

Fix: Add the missing file or remove the reference.

---

## File Structure Quick Reference

```
new-site/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro       ← Edit navigation
│   │   │   └── Footer.astro       ← Edit footer links
│   │   └── ui/
│   │       ├── Button.astro       ← Reusable button component
│   │       └── Card.astro         ← Reusable card component
│   ├── layouts/
│   │   └── Base.astro             ← Base HTML template (head, fonts, etc.)
│   ├── pages/
│   │   └── index.astro            ← Homepage (add pages here)
│   └── styles/
│       └── global.css             ← Design tokens (colors, fonts)
├── public/
│   ├── images/                    ← Static images (copied from ../images/)
│   └── papers/                    ← PDFs, research papers
├── astro.config.mjs               ← Build configuration
├── package.json                   ← Dependencies list
└── README.md                      ← Overview & quick start
```

---

## Getting Help

**Astro-specific questions:**
- https://docs.astro.build/
- https://astro.build/chat (Discord)

**Tailwind CSS questions:**
- https://tailwindcss.com/docs

**PCP website questions:**
- PCP mailing list
- Open an issue: https://github.com/performancecopilot/pcp-website/issues

---

## Design Philosophy

This redesign uses the "Cockpit Control" aesthetic:
- **Dark mode only** (deep navy backgrounds)
- **Aviation-inspired** (instrument panel cards, HUD-style overlays)
- **High contrast** (red contrail + cyan data accents)
- **Technical typography** (Inter for UI, JetBrains Mono for code)

When adding new components, keep this aesthetic in mind. Think "fighter jet cockpit" meets "performance monitoring dashboard."

---

## Next Steps for the Redesign

**Phase 1 (Current):**
- [x] Setup Astro + Tailwind
- [x] Create base layout (Header, Footer)
- [x] Migrate homepage
- [ ] Create CONTRIBUTING.md (this file)
- [ ] Test build output

**Phase 2 (Next):**
- [ ] Migrate all 23+ pages
- [ ] Set up content collections for news/GSoC/GSoD
- [ ] Add responsive mobile navigation
- [ ] Cross-browser testing

**Phase 3 (Polish):**
- [ ] Link checker validation
- [ ] Performance audit
- [ ] Review with maintainers
- [ ] Merge to main

See `plans/REDESIGN.md` for the full roadmap.

// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  outDir: '../docs',
  publicDir: './public',
  build: {
    format: 'file' // Generate features.html instead of features/index.html
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
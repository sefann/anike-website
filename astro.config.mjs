import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://anikebrands.com', // Update with your actual domain
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll use global.css instead
    }),
  ],
  output: 'static',
  build: {
    outDir: './dist',
  },
});

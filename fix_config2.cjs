const fs = require('fs');

let content = fs.readFileSync('astro.config.mjs', 'utf8');

// The file has two 'vite: {' blocks. The second one lacks the plugins array.
// Let's just find the last one and remove it.

const lines = content.split('\n');
const newLines = [];
let skip = false;
let braceCount = 0;

// simple hack: find the first "vite: {" that DOES NOT have tailwindcss and remove it or something?
// Actually, let's just write a clean astro.config.mjs.

const cleanConfig = `import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import remarkEmbeds from './src/utils/remark-embeds.mjs';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  
  // SEO OPTIMIZATIONS
  site: 'https://stokpratik.com.tr',
  compressHTML: true,
  
  // MARKDOWN CONFIGURATION
  markdown: {
    remarkPlugins: [remarkEmbeds],
  },
  
  // BUILD OPTIMIZATIONS
  build: {
    format: 'directory'
  },
  
  // IMAGE OPTIMIZATION
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {}
    }
  },

  // Inject Environment Variables for Keystatic on Cloudflare
  vite: {
    define: {
      'process.env.KEYSTATIC_GITHUB_CLIENT_ID': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_ID || ''),
      'process.env.KEYSTATIC_GITHUB_CLIENT_SECRET': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || ''),
      'process.env.KEYSTATIC_SECRET': JSON.stringify(process.env.KEYSTATIC_SECRET || '')
    },
    plugins: [tailwindcss()]
  },
  
  // INTEGRATIONS FOR SEO & CMS
  integrations: [react(), keystatic(), sitemap()]
});
`;

fs.writeFileSync('astro.config.mjs', cleanConfig, 'utf8');
console.log('Fixed config!');

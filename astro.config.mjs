import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  
  // SEO OPTIMIZATIONS
  site: 'https://stokpratik.com',
  compressHTML: true,
  
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
  
  // INTEGRATIONS FOR SEO & CMS
  integrations: [react(), keystatic()]
});
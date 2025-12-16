import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

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
    // Use the sharp service entrypoint (Astro expects an object here)
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {}
    }
  },
  
  // INTEGRATIONS FOR SEO
  integrations: []
});
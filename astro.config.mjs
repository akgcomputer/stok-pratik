import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  
  // SEO OPTIMIZATIONS
  site: 'https://stokpratik.com.tr',
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

  // Inject Environment Variables for Keystatic on Cloudflare
  vite: {
    define: {
      'process.env.KEYSTATIC_GITHUB_CLIENT_ID': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_ID || ''),
      'process.env.KEYSTATIC_GITHUB_CLIENT_SECRET': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || ''),
      'process.env.KEYSTATIC_SECRET': JSON.stringify(process.env.KEYSTATIC_SECRET || '')
    }
  },
  
  // Inject Environment Variables for Keystatic on Cloudflare
  vite: {
    define: {
      'process.env.KEYSTATIC_GITHUB_CLIENT_ID': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_ID || ''),
      'process.env.KEYSTATIC_GITHUB_CLIENT_SECRET': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || ''),
      'process.env.KEYSTATIC_SECRET': JSON.stringify(process.env.KEYSTATIC_SECRET || '')
    }
  },
  
  // INTEGRATIONS FOR SEO & CMS
  integrations: [react(), keystatic()]
});
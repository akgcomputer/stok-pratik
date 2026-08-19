import fs from 'fs';

let content = fs.readFileSync('astro.config.mjs', 'utf8');

// There are two vite {} blocks. Let's fix this manually with string replacement.
// The second block looks exactly like:
const toRemove = `  // Inject Environment Variables for Keystatic on Cloudflare
  vite: {
    define: {
      'process.env.KEYSTATIC_GITHUB_CLIENT_ID': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_ID || ''),
      'process.env.KEYSTATIC_GITHUB_CLIENT_SECRET': JSON.stringify(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || ''),
      'process.env.KEYSTATIC_SECRET': JSON.stringify(process.env.KEYSTATIC_SECRET || '')
    }
  },`;

content = content.replace(toRemove, '');

fs.writeFileSync('astro.config.mjs', content, 'utf8');
console.log('Fixed astro.config.mjs');

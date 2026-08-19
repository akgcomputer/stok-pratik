const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'oto-servis-ve-yedek-parca-yazilimi.astro');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace className with class
content = content.replace(/className=/g, 'class=');

// 2. Remove DOCTYPE, html, head, body tags
// We'll replace the top part until <body ...> with the Astro frontmatter + BaseLayout
const bodyRegex = /<!DOCTYPE html>[\s\S]*?<body[^>]*>/i;

const frontmatter = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">

<style is:global>
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #FFFBF5;
    color: #1e293b;
  }
  .font-display {
    font-family: 'Outfit', sans-serif;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
</style>

<BaseLayout title="Oto Servis & Yedek Parça İçin Stok Pratik" description="Oto servislerine ve yedek parça satıcılarına özel plaka takibi, iş emri, bakım periyotları, OEM/muadil parça stoku ve e-Fatura tek platformda.">
  <div class="antialiased selection:bg-orange-500 selection:text-white">
`;

content = content.replace(bodyRegex, frontmatter);

// 3. Replace </body></html> with </BaseLayout>
content = content.replace(/<\/body>[\s\S]*?<\/html>/i, '  </div>\n</BaseLayout>');

// 4. Convert all remaining <script> to <script is:inline>
content = content.replace(/<script>/g, '<script is:inline>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully fixed Astro file.');

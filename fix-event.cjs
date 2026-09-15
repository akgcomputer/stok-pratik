const fs = require('fs');
let text = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

const oldInit = /document\.addEventListener\('DOMContentLoaded', \(\) => \{[\s\S]*?\}\);/;
const newInit = `
      function initAll() {
        initMobileMenu();
        initSmoothScroll();
        initLightbox();
      }

      document.addEventListener('DOMContentLoaded', initAll);
      document.addEventListener('astro:page-load', initAll);
`;

text = text.replace(oldInit, newInit);

// Ayrıca script etiketindeki client:load ibaresini is:inline olarak değiştirelim (daha güvenli)
text = text.replace('<script client:load>', '<script is:inline>');

fs.writeFileSync('src/layouts/BaseLayout.astro', text, 'utf8');

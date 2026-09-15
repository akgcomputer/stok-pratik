const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-formu.astro', 'utf8');

text = text.replace(
  /<h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">[\s\S]*?<\/h1>/,
  `<h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Formu Doldur, <span class="text-red-600">1 Ay Ücretsiz</span> Kullanımını Kap
        </h1>`
);

fs.writeFileSync('src/pages/arkadasini-getir-formu.astro', text, 'utf8');

const fs = require('fs');
let text = fs.readFileSync('src/components/Header.astro', 'utf8');

const oldDesktop = '<a href="/blog" class="block px-3 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Blog ve Destek Sayfaları</a>';
const newDesktop = '<a href="/destek-icerikleri" class="block px-3 py-2.5 rounded-lg text-green-700 font-bold bg-green-50 hover:bg-green-100 transition-colors">Destek</a>';

text = text.replace(oldDesktop, newDesktop);

const oldMobile = '<a href="/blog" class="block py-2.5 text-sm text-slate-600 font-medium">Blog ve Destek Sayfaları</a>';
const newMobile = '<a href="/destek-icerikleri" class="block py-2.5 px-3 rounded-lg text-sm text-green-700 font-bold bg-green-50 mt-1 mb-1">Destek</a>';

text = text.replace(oldMobile, newMobile);

fs.writeFileSync('src/components/Header.astro', text, 'utf8');

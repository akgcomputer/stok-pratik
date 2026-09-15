const fs = require('fs');
let text = fs.readFileSync('src/components/Header.astro', 'utf8');

// 1. Replace 1 Ay Ucretsiz SVG
text = text.replace(
  /<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" [^>]+><\/path><\/svg>/g,
  `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>`
);
// In case they want emoji:
text = text.replace(
  `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>`,
  `<span class="text-base">🎁</span>`
);

// Wait, let's just replace the exact line for desktop
const oldBtn = `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path></svg>`;
text = text.replace(oldBtn, `🎁`);


// 2. Replace Fiyatlar ve Ozellikler button
const oldFiyatlarBtnRegex = /<button class="flex items-center gap-1\.5 text-slate-700 font-semibold hover:text-red-600 transition-colors h-full">([\s\S]*?)<\/button>/;
const newFiyatlarBtn = `<button class="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-[13px] hover:text-red-400 transition-colors bg-slate-900 px-4 py-2 rounded-lg">
            Fiyatlar ve Özellikler
            <svg class="w-4 h-4 text-red-500 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>`;
text = text.replace(oldFiyatlarBtnRegex, newFiyatlarBtn);

// 3. Remove 'Kurumsal & Destek' heading
text = text.replace(/<h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-3">Kurumsal & Destek<\/h4>/, '');

fs.writeFileSync('src/components/Header.astro', text, 'utf8');

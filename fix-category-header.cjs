const fs = require('fs');
let text = fs.readFileSync('src/pages/destek-icerikleri.astro', 'utf8');

const oldHeaderRegex = /<div class="bg-slate-800 px-8 py-5 border-b border-slate-200 flex items-center gap-4">[\s\S]*?<\/h2>\s*<\/div>/;

const newHeader = `<div class="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                <div class="flex-shrink-0 w-8 h-8 rounded border border-slate-200 bg-white text-red-500 flex items-center justify-center shadow-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-slate-800 m-0 leading-none flex items-center mt-1">
                  {category}
                </h2>
              </div>`;

text = text.replace(oldHeaderRegex, newHeader);

fs.writeFileSync('src/pages/destek-icerikleri.astro', text, 'utf8');

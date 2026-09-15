const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-kampanyasi.astro', 'utf8');

// Fix button in top banner (yellow background)
text = text.replace('bg-[#EAB308]', 'bg-yellow-500 hover:bg-yellow-600');

// Inject the top-right sticky button back
const floatingBtn = `
  {/* FLOATING STICKY CTA (Top Right) */}
  <div class="fixed top-28 right-6 z-50 animate-in fade-in duration-700 delay-500 hidden lg:block">
    <a href="/arkadasini-getir-formu" class="btn-glow flex flex-col items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-black shadow-2xl shadow-yellow-600/50 px-6 py-4 transition-transform hover:scale-105 active:scale-95 text-center group border border-yellow-600">
      <span class="text-[10px] uppercase tracking-widest font-bold opacity-90 group-hover:opacity-100 mb-0.5">arkadaşını getir</span>
      <span class="text-xl font-extrabold tracking-tight leading-none">ÜCRETSİZ KULLAN</span>
    </a>
  </div>
`;

if (!text.includes('FLOATING STICKY CTA')) {
    text = text.replace('<main>', floatingBtn + '\n  <main>');
}

fs.writeFileSync('src/pages/arkadasini-getir-kampanyasi.astro', text, 'utf8');

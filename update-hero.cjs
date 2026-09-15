const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-kampanyasi.astro', 'utf8');

const newGraphic = `{/* HERO GRAPHIC WITH CAMPAIGN SLOGAN */}
          <div class="w-full relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 max-w-6xl mx-auto">
            <img src="/images/site-foto/arkadasini-getir.webp" alt="Arkadaşını Getir" class="w-full h-auto object-cover" />
            <div class="absolute inset-0 flex items-center justify-start p-6 sm:p-12 md:p-16 lg:p-24 w-full md:w-2/3 lg:w-1/2">
              <div>
                <h2 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight drop-shadow-sm">
                  İşletmeni Büyüt,<br />
                  <span class="text-red-600">Masrafsız Yönet!</span>
                </h2>
              </div>
            </div>
          </div>`;

text = text.replace(/\{\/\* HERO GRAPHIC PLACEHOLDER \*\/\}[\s\S]*?<\!-- GÖRSEL BURAYA GELECEK: [^>]* -->\n\s*<\/div>/, newGraphic);

fs.writeFileSync('src/pages/arkadasini-getir-kampanyasi.astro', text, 'utf8');
console.log('Hero graphic updated');

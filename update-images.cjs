const fs = require('fs');
let text = fs.readFileSync('src/pages/arkadasini-getir-kampanyasi.astro', 'utf8');

const newGraphic2 = `{/* Right: Graphic 2 */}
          <div class="order-1 lg:order-2">
            <div class="w-full relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
              <img src="/images/site-foto/arkadasini-getir-2.webp" alt="Avantajlar" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
          </div>`;

text = text.replace(/\{\/\* Right: Graphic Placeholder 2 \*\/\}[\s\S]*?<\!-- GÖRSEL BURAYA GELECEK: [^>]* -->\n\s*<\/div>\n\s*<\/div>/, newGraphic2);


const faqSectionStart = `        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Sıkça Sorulan Sorular</h2>
          <p class="text-lg text-slate-500">Kampanya hakkında merak ettiğiniz tüm detaylar.</p>
        </div>`;

const faqWithImage = `        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Sıkça Sorulan Sorular</h2>
          <p class="text-lg text-slate-500">Kampanya hakkında merak ettiğiniz tüm detaylar.</p>
        </div>

        <div class="mb-12 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 max-w-4xl mx-auto">
          <img src="/images/site-foto/arkadasini-getir-3.webp" alt="Sıkça Sorulan Sorular" class="w-full h-auto object-cover" />
        </div>`;

text = text.replace(faqSectionStart, faqWithImage);

fs.writeFileSync('src/pages/arkadasini-getir-kampanyasi.astro', text, 'utf8');
console.log('Images 2 and 3 placed');

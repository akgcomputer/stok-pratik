const fs = require('fs');
let text = fs.readFileSync('src/pages/firma-kaydi.astro', 'utf8');

// 1. Change website type to text
text = text.replace(/<input type="url" id="website"/g, '<input type="text" id="website"');

// 2. Change success text
text = text.replace(
  /<p class="text-red-800 font-medium mb-4">Aşağıdaki butona tıklayarak az önce doldurduğunuz formu WhatsApp üzerinden <strong>0532 500 09 99<\/strong> numaralı destek hattımıza gönderin.<\/p>/g,
  '<p class="text-red-800 font-medium mb-4">Aşağıdaki butona tıklayarak az önce doldurduğunuz formu WhatsApp üzerinden destek hattımıza gönderin.</p>'
);

// 3. Add upsell button
const whatsappBtnEnd = /WhatsApp'a İlet\s*<\/a>\s*<\/div>/;
const upsellBlock = `WhatsApp'a İlet
            </a>
          </div>

          <div class="mt-8 pt-8 border-t border-slate-200">
            <h3 class="text-xl font-extrabold text-slate-800 mb-4">1 ay ücretsiz kullanmak ister misin?</h3>
            <a href="/arkadasini-getir-formu" target="_blank" class="inline-flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30">
              Evet İsterim
            </a>
          </div>`;
text = text.replace(whatsappBtnEnd, upsellBlock);

// 4. Add Title Case logic
const jsStart = /\/\/ 1\. Gather all data/;
const titleCaseFunc = `
      function toTitleCase(str) {
        return str.toLocaleLowerCase('tr-TR').split(' ').map(word => {
          if(!word) return '';
          return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
        }).join(' ');
      }

      // 1. Gather all data`;
text = text.replace(jsStart, titleCaseFunc);

// Apply toTitleCase to string fields
text = text.replace(/const adSoyad = document.getElementById\('adSoyad'\).value.trim\(\);/, "const adSoyad = toTitleCase(document.getElementById('adSoyad').value.trim());");
text = text.replace(/const isletmeAdi = document.getElementById\('isletmeAdi'\).value.trim\(\);/, "const isletmeAdi = toTitleCase(document.getElementById('isletmeAdi').value.trim());");
text = text.replace(/const yetkiliAdi = document.getElementById\('yetkiliAdi'\).value.trim\(\);/, "const yetkiliAdi = toTitleCase(document.getElementById('yetkiliAdi').value.trim());");
text = text.replace(/const vergiDairesi = document.getElementById\('vergiDairesi'\).value.trim\(\);/, "const vergiDairesi = toTitleCase(document.getElementById('vergiDairesi').value.trim());");
text = text.replace(/const sektor = document.getElementById\('sektor'\).value.trim\(\) \|\| '-';/, "const sektor = toTitleCase(document.getElementById('sektor').value.trim()) || '-';");
text = text.replace(/const sehir = document.getElementById\('sehir'\).value.trim\(\);/, "const sehir = toTitleCase(document.getElementById('sehir').value.trim());");
text = text.replace(/const ilce = document.getElementById\('ilce'\).value.trim\(\);/, "const ilce = toTitleCase(document.getElementById('ilce').value.trim());");
text = text.replace(/const faturaAdresi = document.getElementById\('faturaAdresi'\).value.trim\(\);/, "const faturaAdresi = toTitleCase(document.getElementById('faturaAdresi').value.trim());");
text = text.replace(/const notlar = document.getElementById\('notlar'\).value.trim\(\) \|\| '-';/, "const notlar = toTitleCase(document.getElementById('notlar').value.trim()) || '-';");

// Promo -> UpperCase
text = text.replace(/const promo = document.getElementById\('promo'\).value.trim\(\) \|\| '-';/, "const promo = document.getElementById('promo').value.trim().toUpperCase() || '-';");

fs.writeFileSync('src/pages/firma-kaydi.astro', text, 'utf8');

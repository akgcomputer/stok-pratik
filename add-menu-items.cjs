const fs = require('fs');
let text = fs.readFileSync('src/components/Header.astro', 'utf8');

const deskFiyatlar = '<a href="/paketlerimiz" class="block px-3 py-2.5 rounded-lg text-red-600 font-bold bg-red-50 hover:bg-red-100 transition-colors">Fiyatlar Paketler</a>';
const deskNew = deskFiyatlar + `
              <a href="/arkadasini-getir-formu" class="block px-3 py-2.5 rounded-lg text-blue-700 font-bold bg-blue-50 hover:bg-blue-100 transition-colors">Arkadaşını Davet Et</a>
              <a href="/firma-kaydi" class="block px-3 py-2.5 rounded-lg text-blue-700 font-bold bg-blue-50 hover:bg-blue-100 transition-colors">Firma Kayıt</a>`;
text = text.replace(deskFiyatlar, deskNew);

const mobFiyatlar = '<a href="/paketlerimiz" class="block py-2.5 text-sm text-red-600 font-bold">Fiyatlar Paketler</a>';
const mobNew = mobFiyatlar + `
              <a href="/arkadasini-getir-formu" class="block py-2.5 px-3 rounded-lg text-sm text-blue-700 font-bold bg-blue-50 mt-1">Arkadaşını Davet Et</a>
              <a href="/firma-kaydi" class="block py-2.5 px-3 rounded-lg text-sm text-blue-700 font-bold bg-blue-50 mb-1">Firma Kayıt</a>`;
text = text.replace(mobFiyatlar, mobNew);

fs.writeFileSync('src/components/Header.astro', text, 'utf8');

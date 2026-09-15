const fs = require('fs');
let text = fs.readFileSync('src/pages/sitemap.astro', 'utf8');

const newSection = `      <!-- Yeni Eklenen Sayfalar ve Kampanyalar -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
          Kampanyalar ve Yeni Çözümler
        </h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <li>
            <a href="/arkadasini-getir-kampanyasi" class="sitemap-link">
              <span class="mr-2">🎁</span>
              1 Ay Ücretsiz Kullan Kampanyası
            </a>
          </li>
          <li>
            <a href="/arkadasini-getir-formu" class="sitemap-link">
              <span class="mr-2">📝</span>
              Arkadaşını Davet Et Formu
            </a>
          </li>
          <li>
            <a href="/firma-kaydi" class="sitemap-link">
              <span class="mr-2">🏢</span>
              Firma Kayıt Sistemi
            </a>
          </li>
          <li>
            <a href="/masraf-gir" class="sitemap-link">
              <span class="mr-2">💰</span>
              Masraf Gir Sistemi
            </a>
          </li>
          <li>
            <a href="/oto-tamir-yazilimi" class="sitemap-link">
              <span class="mr-2">🚗</span>
              Oto Servis Yazılımı
            </a>
          </li>
          <li>
            <a href="/kuyumculuk-yazilimi" class="sitemap-link">
              <span class="mr-2">💎</span>
              Kuyumculuk Yazılımı
            </a>
          </li>
          <li>
            <a href="/bayilik" class="sitemap-link">
              <span class="mr-2">🤝</span>
              Bayimiz Olun
            </a>
          </li>
          <li>
            <a href="/blog" class="sitemap-link">
              <span class="mr-2">📰</span>
              Blog ve Destek
            </a>
          </li>
          <li>
            <a href="/yararli-bilgiler" class="sitemap-link">
              <span class="mr-2">💡</span>
              Yararlı Bilgiler
            </a>
          </li>
        </ul>
      </div>

`;

// Insert it right after <!-- Ana Sayfalar --> block
text = text.replace(/<!-- ERP ve Çekirdek Sistemler -->/, newSection + '<!-- ERP ve Çekirdek Sistemler -->');

fs.writeFileSync('src/pages/sitemap.astro', text, 'utf8');

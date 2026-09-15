const fs = require('fs');
const newHeader = `---
// src/components/Header.astro
import SocialMedia from './SocialMedia.astro';
---

<header class="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
  <nav class="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 text-red-600 font-extrabold text-2xl tracking-tight hover:opacity-90 transition-opacity">
      <span>Stok Pratik</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hidden lg:flex items-center flex-1 ml-10 justify-between">
      <ul class="flex items-center gap-8">
        <li>
          <a href="/arkadasini-getir-kampanyasi" class="text-red-600 font-bold uppercase tracking-wider text-[13px] hover:text-red-700 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            1 Ay Ücretsiz Kullan
          </a>
        </li>
        
        <li class="relative group">
          <button class="flex items-center gap-1.5 text-slate-700 font-semibold hover:text-red-600 transition-colors py-8">
            Fiyatlar ve Özellikler
            <svg class="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          <!-- Mega Menu Dropdown -->
          <div class="absolute top-[75px] left-1/2 -translate-x-1/2 w-[700px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-8 grid grid-cols-2 gap-x-12 gap-y-1">
            
            <!-- Sütun 1 -->
            <div class="flex flex-col space-y-1">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-3">Yazılım Çözümleri</h4>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Özellikler</a>
              <a href="/paketlerimiz" class="block px-3 py-2 rounded-lg text-red-600 font-bold bg-red-50 hover:bg-red-100 transition-colors">Fiyatlar Paketler</a>
              <a href="/masraf-gir" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Masraf Gir Sistemi</a>
              <a href="/oto-tamir-yazilimi" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Oto Servis Yazılımı</a>
              <a href="/kuyumculuk-yazilimi" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Kuyumculuk Yazılımı</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Butik Giyim Yazılımı</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Tekstil Yazılımı</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Mağazacılık (Çok Şube/Depo)</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Gıda (Market) Yazılımı</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Toptancılık Yazılımı</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Çok Katlı Mağazacılık (AVM)</a>
            </div>

            <!-- Sütun 2 -->
            <div class="flex flex-col space-y-1">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-3">Kurumsal & Destek</h4>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">ERP - Üretim Yazılımı</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">CRM - Müşteri Takip</a>
              <a href="/ozelliklerimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Hatırlatma Sistemi</a>
              <a href="/referanslarimiz" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Referanslar</a>
              <a href="/neden-stok-pratik" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Sıkça Sorulan Sorular</a>
              <a href="/ekran-goruntuleri" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Program Görüntüleri</a>
              <a href="/blog" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Blog ve Destek Sayfaları</a>
              <a href="/yararli-bilgiler" class="block px-3 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-50 hover:text-red-600 transition-colors">Yararlı Bilgiler</a>
              <div class="my-1 border-t border-slate-100"></div>
              <a href="/bayilik" class="block px-3 py-2 rounded-lg text-red-600 font-bold hover:bg-red-50 transition-colors">Bayimiz Olun</a>
              <a href="/sitemap" class="block px-3 py-2 rounded-lg text-slate-500 text-sm hover:bg-slate-50 hover:text-slate-800 transition-colors">Site Haritası</a>
            </div>
          </div>
        </li>
        
        <li>
          <a href="/blog" class="text-slate-700 font-semibold hover:text-red-600 transition-colors">Blog</a>
        </li>
      </ul>
      
      <!-- Sağ Taraf (Sosyal + Demo) -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-3">
          <SocialMedia />
          <div class="w-px h-6 bg-slate-200"></div>
          <a href="/iletisim" title="İletişim" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-600 hover:text-white transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </a>
        </div>
        
        <a href="https://wa.me/+905325000999" class="inline-flex items-center justify-center px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20">
          Demo Talep Et
        </a>
      </div>
    </div>

    <!-- Mobile Header Actions (Hidden on Desktop) -->
    <div class="flex lg:hidden items-center gap-4">
      <a href="https://wa.me/+905325000999" class="px-4 py-2 bg-red-600 text-white font-bold rounded-lg text-sm shadow-md shadow-red-600/20">Demo</a>
      
      <button id="mobileMenuBtn" class="text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-colors">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Backdrop & Container -->
  <div id="mobileMenu" class="fixed inset-0 z-[9999] hidden">
    <!-- Backdrop -->
    <div id="mobileMenuBackdrop" class="absolute inset-0 bg-slate-900/50 opacity-0 transition-opacity duration-300"></div>
    
    <!-- Menu Content -->
    <div id="mobileMenuContent" class="absolute top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl translate-x-full transition-transform duration-300 overflow-y-auto flex flex-col">
      
      <div class="flex items-center justify-between p-6 border-b border-slate-100">
        <span class="text-xl font-extrabold text-red-600">Menü</span>
        <button id="mobileMenuClose" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="p-4 flex-1">
        <ul class="flex flex-col gap-1">
          <li>
            <a href="/arkadasini-getir-kampanyasi" class="block px-4 py-3 rounded-lg text-red-600 font-bold bg-red-50 mb-2">1 Ay Ücretsiz Kullan Kampanyası</a>
          </li>
          
          <li>
            <button id="mobileDropdownBtn" class="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
              Fiyatlar ve Özellikler
              <svg class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            <div id="mobileDropdownMenu" class="hidden flex-col gap-1 px-4 py-2 mt-1 bg-slate-50 rounded-xl">
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Özellikler</a>
              <a href="/paketlerimiz" class="block py-2 text-sm text-red-600 font-bold">Fiyatlar Paketler</a>
              <a href="/masraf-gir" class="block py-2 text-sm text-slate-600 font-medium">Masraf Gir Sistemi</a>
              <a href="/oto-tamir-yazilimi" class="block py-2 text-sm text-slate-600 font-medium">Oto Servis Yazılımı</a>
              <a href="/kuyumculuk-yazilimi" class="block py-2 text-sm text-slate-600 font-medium">Kuyumculuk Yazılımı</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Butik Giyim Yazılımı</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Tekstil Yazılımı</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Mağazacılık (Çok Şube/Depo)</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Gıda (Market) Yazılımı</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Toptancılık Yazılımı</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Çok Katlı Mağazacılık (AVM)</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">ERP - Üretim Yazılımı</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">CRM - Müşteri Takip</a>
              <a href="/ozelliklerimiz" class="block py-2 text-sm text-slate-600 font-medium">Hatırlatma Sistemi</a>
              <a href="/referanslarimiz" class="block py-2 text-sm text-slate-600 font-medium">Referanslar</a>
              <a href="/neden-stok-pratik" class="block py-2 text-sm text-slate-600 font-medium">Sıkça Sorulan Sorular</a>
              <a href="/ekran-goruntuleri" class="block py-2 text-sm text-slate-600 font-medium">Program Görüntüleri</a>
              <a href="/blog" class="block py-2 text-sm text-slate-600 font-medium">Blog ve Destek Sayfaları</a>
              <a href="/yararli-bilgiler" class="block py-2 text-sm text-slate-600 font-medium">Yararlı Bilgiler</a>
              <a href="/bayilik" class="block py-2 text-sm text-red-600 font-bold">Bayimiz Olun</a>
              <a href="/sitemap" class="block py-2 text-sm text-slate-500">Site Haritası</a>
            </div>
          </li>
          
          <li>
            <a href="/blog" class="block px-4 py-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50 transition-colors">Blog</a>
          </li>
          
          <li>
            <a href="/iletisim" class="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              İletişim
            </a>
          </li>
        </ul>
      </div>

      <div class="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
        <div class="flex justify-center mb-6">
          <SocialMedia />
        </div>
        <a href="https://wa.me/+905325000999" class="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-red-600/20">
          Demo Talep Et
        </a>
      </div>
      
    </div>
  </div>
</header>

<script>
  document.addEventListener('astro:page-load', () => {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    const content = document.getElementById('mobileMenuContent');
    const closeBtn = document.getElementById('mobileMenuClose');
    
    function openMobileMenu() {
      if (!menu) return;
      menu.classList.remove('hidden');
      requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        content.classList.remove('translate-x-full');
        content.classList.add('translate-x-0');
      });
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      if (!menu) return;
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
      content.classList.remove('translate-x-0');
      content.classList.add('translate-x-full');
      
      setTimeout(() => {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }

    if (btn) btn.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

    const mobileDropdownBtn = document.getElementById('mobileDropdownBtn');
    const mobileDropdownMenu = document.getElementById('mobileDropdownMenu');
    
    if (mobileDropdownBtn && mobileDropdownMenu) {
      mobileDropdownBtn.addEventListener('click', () => {
        mobileDropdownMenu.classList.toggle('hidden');
        mobileDropdownMenu.classList.toggle('flex');
        const icon = mobileDropdownBtn.querySelector('svg');
        if (icon) {
          icon.style.transform = mobileDropdownMenu.classList.contains('hidden') ? '' : 'rotate(180deg)';
        }
      });
    }
  });
</script>
`;

fs.writeFileSync('src/components/Header.astro', newHeader, 'utf8');

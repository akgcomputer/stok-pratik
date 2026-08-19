import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  PhoneCall, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Sparkles,
  Layers,
  FileSpreadsheet,
  Package
} from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/mockData';

interface HeaderProps {
  onOpenDemoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemoModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Bar - Lively & Warm */}
      <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-indigo-800 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full text-xs uppercase tracking-wide flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" /> 14 Gün Ücretsiz
            </span>
            <span className="hidden sm:inline font-medium text-teal-100">
              Tekstil ve hazır giyim sektörüne özel renk, beden ve varyant yönetimini hemen test edin.
            </span>
            <span className="sm:hidden font-medium text-teal-100">
              Tekstil sektörüne özel varyant takibi
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a 
              href={OFFICIAL_LINKS.phone} 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>0850 308 00 00</span>
            </a>
            <span className="hidden md:inline-block text-teal-300/60">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Kredi Kartsız Kurulum
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3' 
            : 'bg-white/80 backdrop-blur-xs border-b border-slate-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Sector Tag */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                  <Scissors className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
                      Stok<span className="text-teal-600">Pratik</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/70 w-max">
                    Tekstil & Hazır Giyim
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
              <a href="#cozumler" className="hover:text-teal-600 transition-colors">
                Çözümlerimiz
              </a>
              <a href="#varyant-simulator" className="hover:text-teal-600 transition-colors flex items-center gap-1">
                <span>Varyant Simülatörü</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">Canlı</span>
              </a>
              <a href="#neden-stokpratik" className="hover:text-teal-600 transition-colors">
                Neden Stok Pratik?
              </a>
              <a href="#referanslar" className="hover:text-teal-600 transition-colors">
                Referanslar
              </a>
              <a href="#paketler" className="hover:text-teal-600 transition-colors">
                Paketler
              </a>
              <a href="#sss" className="hover:text-teal-600 transition-colors">
                SSS
              </a>
              <a href="#blog" className="hover:text-teal-600 transition-colors">
                Blog
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a 
                href={OFFICIAL_LINKS.packages} 
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-700 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Paketlerimiz
              </a>
              <button 
                id="btn-header-demo"
                onClick={onOpenDemoModal}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ücretsiz Demo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button 
                id="btn-header-mobile-demo"
                onClick={onOpenDemoModal}
                className="sm:hidden bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs"
              >
                Demo
              </button>
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Menüyü Aç/Kapat"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
              <a 
                href="#cozumler" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                🧵 Sektörel Çözümlerimiz
              </a>
              <a 
                href="#varyant-simulator" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center justify-between"
              >
                <span>🧪 Canlı Varyant Simülatörü</span>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Dene</span>
              </a>
              <a 
                href="#neden-stokpratik" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                ⭐ Neden Stok Pratik?
              </a>
              <a 
                href="#referanslar" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                💬 Tekstil Referansları
              </a>
              <a 
                href="#paketler" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                📦 Paketlerimiz
              </a>
              <a 
                href="#sss" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                ❓ Sıkça Sorulan Sorular
              </a>
              <a 
                href="#blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                📰 Blog & Rehberler
              </a>
              
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  id="btn-drawer-demo"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemoModal();
                  }}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> 14 Gün Ücretsiz Demo Başlat
                </button>
                <a
                  href={OFFICIAL_LINKS.packages}
                  className="w-full text-center py-2.5 text-slate-700 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Paketleri İncele
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

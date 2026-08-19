import React from 'react';
import { Scissors, Phone, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/mockData';

interface FooterProps {
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                Stok<span className="text-teal-400">Pratik</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tekstil ve hazır giyim sektörüne özel renk, beden, model ve sezon yönetimli yeni nesil bulut stok ve satış takip platformu.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <a href={OFFICIAL_LINKS.phone} className="hover:text-white transition-colors">
                  0850 308 00 00
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>destek@stokpratik.com.tr</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>İstanbul / Türkiye</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Exact official links requested) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a 
                  href={OFFICIAL_LINKS.packages} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Paketlerimiz</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={OFFICIAL_LINKS.features} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Özelliklerimiz</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={OFFICIAL_LINKS.whyUs} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Neden Stok Pratik</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={OFFICIAL_LINKS.testimonials} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Referanslarımız</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={OFFICIAL_LINKS.blog} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Blog & Yazılar</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={OFFICIAL_LINKS.contact} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span>İletişim</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Sektörel Çözümler */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sektörler
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <span className="text-teal-400 font-bold flex items-center gap-1.5">
                  <span>🧵 Tekstil & Hazır Giyim</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition-colors">
                  🚗 Otomotiv & Yedek Parça
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition-colors">
                  🥗 Gıda & İçecek (SKT)
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition-colors">
                  💄 Kozmetik & Parfümeri
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition-colors">
                  🔌 Elektronik & Dayanıklı Tüketim
                </span>
              </li>
            </ul>
          </div>

          {/* 14 Gün Ücretsiz Deneme Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              14 Gün Ücretsiz Deneyin
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kredi kartı gerekmeden 14 gün boyunca tüm tekstil varyant ve çoklu depo modüllerini kullanın.
            </p>
            <button
              onClick={onOpenDemoModal}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Demo Talep Et
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Stok Pratik. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <span>Kullanım Koşulları</span>
            <span>•</span>
            <span>Gizlilik Politikası</span>
            <span>•</span>
            <span>KVKK Aydınlatma Metni</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

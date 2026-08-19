import React from 'react';
import { 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Store, 
  Building2, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PACKAGES, OFFICIAL_LINKS } from '../data/mockData';

interface PricingPackagesSectionProps {
  onOpenDemoModal: () => void;
}

export const PricingPackagesSection: React.FC<PricingPackagesSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/60" id="paketler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Tekstil ve Hazır Giyim Paketleri
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            İşletmenizin Ölçeğine Uygun Paketler
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tek bir butikten onlarca şubeli zincir mağaza ve toptan merkezlerine kadar ölçeklenebilir altyapı.
          </p>
        </div>

        {/* 3 Packages Grid (Tek Mağaza, 5 Şubeli Mağaza, 10 Şubeli Mağaza) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const isHighlighted = pkg.highlight;
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#F0FDF4] via-white to-white border-2 border-teal-500 shadow-xl shadow-teal-500/10 lg:-translate-y-2'
                    : 'bg-[#FAF8F5] border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Badge if any */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Title & Description */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                      {pkg.id === 'single-store' && <Store className="w-6 h-6" />}
                      {pkg.id === 'five-branches' && <Layers className="w-6 h-6" />}
                      {pkg.id === 'ten-branches' && <Building2 className="w-6 h-6" />}
                    </div>

                    <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                      {pkg.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 min-h-[40px] leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Core Capacity Specs */}
                  <div className="bg-white/90 rounded-2xl p-4 border border-slate-200/80 mb-6 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Şube / Lokasyon:</span>
                      <span className="font-bold text-slate-900">{pkg.specs.branches}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Depo Kapasitesi:</span>
                      <span className="font-bold text-slate-900">{pkg.specs.warehouses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Kullanıcı Tanımı:</span>
                      <span className="font-bold text-teal-700">{pkg.specs.users}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Paket Kapsamındaki Özellikler:
                    </p>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons (Fiyat yazılmayacak, Detayları İncele -> https://stokpratik.com.tr/paketlerimiz) */}
                <div className="pt-4 border-t border-slate-200/70 space-y-2.5">
                  <a
                    href={pkg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 text-center cursor-pointer ${
                      isHighlighted
                        ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-700/20 hover:shadow-lg'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Detayları İncele</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={onOpenDemoModal}
                    className="w-full py-2.5 text-center text-xs font-bold text-teal-700 hover:text-teal-900 hover:bg-teal-50/50 rounded-lg transition-colors cursor-pointer"
                  >
                    veya 14 Gün Ücretsiz Demo Talep Et
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Note underneath packages */}
        <div className="mt-12 text-center bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-2xl mx-auto text-xs text-slate-600">
          <p>
            💡 İhtiyacınıza en uygun paket ve sektörel konfigürasyon için <a href={OFFICIAL_LINKS.packages} target="_blank" rel="noopener noreferrer" className="text-teal-700 font-bold underline hover:text-teal-900">paket sayfamızı ziyaret edebilir</a> ya da uzmanlarımızdan anında canlı demo alabilirsiniz.
          </p>
        </div>

      </div>
    </section>
  );
};

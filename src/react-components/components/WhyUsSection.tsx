import React from 'react';
import { 
  Globe, 
  PlugZap, 
  ShieldCheck, 
  Headphones, 
  TrendingUp, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WHY_US, OFFICIAL_LINKS } from '../data/mockData';

interface WhyUsSectionProps {
  onOpenDemoModal: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onOpenDemoModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-teal-600" />;
      case 'PlugZap':
        return <PlugZap className="w-6 h-6 text-cyan-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-indigo-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-amber-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/60" id="neden-stokpratik">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Neden Stok Pratik?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Tekstil İşletmenizi Büyütecek 5 Temel Avantaj
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Hantal, eski nesil ve pahalı yazılımlardan kurtulun. Hızlı, modern ve %100 bulut teknolojisiyle tanışın.
          </p>
        </div>

        {/* 5 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_US.map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                idx === 2 
                  ? 'bg-gradient-to-b from-teal-50/70 to-emerald-50/50 border-teal-200/90 shadow-sm' 
                  : 'bg-[#FAF8F5] border-slate-200 hover:border-teal-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center mb-5">
                  {getIcon(item.icon)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2 font-['Outfit',sans-serif]">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{item.title}</span>
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-teal-700 font-semibold">
                <span>Stok Pratik Güvencesi</span>
                <span>✓ Aktif</span>
              </div>
            </div>
          ))}

          {/* 6th Card: Interactive CTA Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-800 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Outfit',sans-serif]">
                Hemen Şimdi Test Edin
              </h3>
              <p className="text-sm text-teal-100 leading-relaxed">
                Kendi tekstil ürünlerinizi yükleyin, varyant matrisini ve çoklu depoları anında kullanmaya başlayın.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-teal-600/60">
              <button
                id="btn-whyus-start-demo"
                onClick={onOpenDemoModal}
                className="w-full py-3 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>14 Gün Ücretsiz Başla</span>
                <ArrowRight className="w-4 h-4 text-teal-700" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

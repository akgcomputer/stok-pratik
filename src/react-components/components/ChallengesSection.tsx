import React from 'react';
import { 
  Grid3X3, 
  CalendarSync, 
  Layers, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CHALLENGES } from '../data/mockData';

export const ChallengesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Grid3x3':
        return <Grid3X3 className="w-6 h-6" />;
      case 'CalendarSync':
        return <CalendarSync className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'RotateCcw':
        return <RotateCcw className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/60" id="zorluklar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            Sektörel Zorluklar & Çözüm Yaklaşımı
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Tekstil Sektöründe Karşılaşılan Zorluklar
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Hazır giyim ve tekstil operasyonlarında stok yönetimi geleneksel yazılımlarla kâbusa dönüşebilir. Stok Pratik, sektöre özel tasarımıyla bu sorunları kökten çözer.
          </p>
        </div>

        {/* 4 Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CHALLENGES.map((item) => (
            <div 
              key={item.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 font-['Outfit',sans-serif]">
                  {item.title}
                </h3>

                {/* Problem Box */}
                <div className="mb-3.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-rose-900 font-semibold">Geleneksel Sorun: </strong>
                    {item.issue}
                  </p>
                </div>

                {/* Solution Box */}
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    <strong className="text-emerald-900 font-bold">Stok Pratik Çözümü: </strong>
                    {item.solution}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Tekstil Akışına Özel Entegre</span>
                <span className="text-teal-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Çözümü Gör <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-amber-50 border border-teal-200/70 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900">
              Stok Pratik, tüm bu zorluklara sektöre özel çözümler sunar.
            </p>
            <p className="text-xs text-slate-600">
              Kendi varyantlarınızı ve depolarınızı 14 gün boyunca ücretsiz deneyin.
            </p>
          </div>
          <a
            href="#cozumler"
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            Tüm Çözümleri Keşfet
          </a>
        </div>

      </div>
    </section>
  );
};

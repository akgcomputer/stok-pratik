import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Package, 
  Store, 
  FileText, 
  Zap,
  Building2,
  Barcode,
  Truck,
  FileCheck,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { SOLUTIONS } from '../data/mockData';

interface SolutionsSectionProps {
  onOpenDemoModal: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onOpenDemoModal }) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentSolution = SOLUTIONS[activeTab];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-slate-200/60" id="cozumler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Sektöre Özel Çözümlerimiz
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Tekstil ve Hazır Giyime Özel Geliştirilmiş Modüller
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Sıradan muhasebe veya ERP yazılımlarının aksine, tekstil perakendecisi ve toptancısının tam sahadaki işleyişine göre tasarlandı.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start lg:justify-center">
          {SOLUTIONS.map((sol, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span className="text-base">{sol.emoji}</span>
                <span>{sol.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Solution Feature Spotlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Content and Checklist */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/80">
                <span>{currentSolution.emoji}</span>
                <span>{currentSolution.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {currentSolution.title}
              </h3>

              <p className="text-base text-slate-600 leading-relaxed">
                {currentSolution.fullDesc}
              </p>

              {/* Bullets List */}
              <div className="space-y-3 pt-2">
                {currentSolution.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  id={`btn-solution-demo-${currentSolution.id}`}
                  onClick={onOpenDemoModal}
                  className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-700/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Bu Modülü Canlı İncele</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#varyant-simulator"
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
                >
                  Simülatörde Test Et
                </a>
              </div>

            </div>

            {/* Right: Rich Interactive Visual Representation */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700 relative overflow-hidden">
                
                {/* Decorative header */}
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400 font-mono ml-2">stokpratik.app/textile</span>
                  </div>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 font-mono px-2 py-0.5 rounded border border-teal-500/30">
                    Sistem Aktif
                  </span>
                </div>

                {/* Dynamic Visual Content depending on active tab */}
                {activeTab === 0 && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <div>
                        <p className="text-xs font-bold text-teal-300">Model: Yazlık Keten Ceket</p>
                        <p className="text-[11px] text-slate-400">4 Renk x 5 Beden = 20 Varyant</p>
                      </div>
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded">
                        248 Adet Stok
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mx-auto mb-1" />
                        <p className="font-bold text-slate-200">Adaçayı</p>
                        <p className="text-teal-400 font-bold">54 Adet</p>
                      </div>
                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-600 mx-auto mb-1" />
                        <p className="font-bold text-slate-200">Kiremit</p>
                        <p className="text-teal-400 font-bold">48 Adet</p>
                      </div>
                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mx-auto mb-1" />
                        <p className="font-bold text-slate-200">Lacivert</p>
                        <p className="text-teal-400 font-bold">82 Adet</p>
                      </div>
                      <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200 mx-auto mb-1" />
                        <p className="font-bold text-slate-200">Beyaz</p>
                        <p className="text-teal-400 font-bold">64 Adet</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-900/40 border border-teal-500/30 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-teal-200">
                        <Barcode className="w-4 h-4 text-teal-300" /> Otomatik Seri Barkod Basımı
                      </span>
                      <span className="text-[10px] bg-teal-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                        Hazır
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Merkez Depo (Merter)</span>
                        <span className="text-teal-300 font-bold">1.420 Adet</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div className="bg-teal-400 h-1.5 rounded-full w-3/4" />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Nişantaşı Şube Deposu</span>
                        <span className="text-cyan-300 font-bold">340 Adet</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div className="bg-cyan-400 h-1.5 rounded-full w-2/5" />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-amber-300" /> Şubeler Arası Sevk Fişi (120 Adet)
                      </span>
                      <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                        Yolda
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-indigo-300 font-bold">B2B Bayi: Ege Moda Toptan</span>
                        <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded">Özel Liste #A</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Sepet: 10 Seri (120 Parça Gömlek & Pantolon)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                        <p className="text-[10px] text-slate-400">Toptan Tutar</p>
                        <p className="text-sm font-bold text-emerald-400">54.600 ₺</p>
                      </div>
                      <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                        <p className="text-[10px] text-slate-400">Kalan Cari Limit</p>
                        <p className="text-sm font-bold text-cyan-300">180.000 ₺</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200">
                      <span>✓ Sipariş otomatik onaylandı, stok rezerve edildi.</span>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-teal-300 font-bold">GİB e-Fatura Entegrasyonu</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">GİB ONAYLI</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Fatura No: GIB2026000018492</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-slate-300">Sevkiyat e-İrsaliyesi QR Kodu</span>
                      <span className="font-mono text-[11px] text-cyan-300">Oluşturuldu (PDF / Mail)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-teal-900/40 border border-teal-500/30 text-xs text-teal-200 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-teal-300" />
                      <span>Muhasebe programı ile anlık senkronize.</span>
                    </div>
                  </div>
                )}

                {activeTab === 4 && (
                  <div className="space-y-3 font-sans">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                        <p className="font-bold text-orange-400">Trendyol</p>
                        <p className="text-[11px] text-slate-300 mt-0.5">Senkron</p>
                      </div>
                      <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                        <p className="font-bold text-amber-400">Hepsiburada</p>
                        <p className="text-[11px] text-slate-300 mt-0.5">Senkron</p>
                      </div>
                      <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                        <p className="font-bold text-red-400">N11</p>
                        <p className="text-[11px] text-slate-300 mt-0.5">Senkron</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-slate-300">Son Satış: Terracotta / M Beden</span>
                      <span className="text-rose-400 font-bold">-1 Adet (Anında Düştü)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-emerald-400" />
                      <span>Çift satışı %100 engelleyen anlık kilit mekanizması.</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

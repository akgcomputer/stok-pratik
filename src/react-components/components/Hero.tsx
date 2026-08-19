import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Barcode, 
  Grid3X3, 
  Store, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Tag, 
  Palette,
  AlertCircle,
  RefreshCw,
  Printer
} from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/mockData';

interface HeroProps {
  onOpenDemoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal }) => {
  const [activeColor, setActiveColor] = useState<'sage' | 'terracotta' | 'navy' | 'white'>('sage');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [stockCounts, setStockCounts] = useState({
    sage: { S: 24, M: 18, L: 6 },
    terracotta: { S: 15, M: 4, L: 2 },
    navy: { S: 32, M: 28, L: 19 },
    white: { S: 45, M: 38, L: 8 }
  });
  const [isSelling, setIsSelling] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const colors = [
    { key: 'sage', name: 'Adaçayı Yeşili', bg: 'bg-[#52796F]', border: 'border-[#52796F]' },
    { key: 'terracotta', name: 'Terracotta (Kiremit)', bg: 'bg-[#C86446]', border: 'border-[#C86446]' },
    { key: 'navy', name: 'Gece Mavisi', bg: 'bg-[#1E3A8A]', border: 'border-[#1E3A8A]' },
    { key: 'white', name: 'Taş Beyazı', bg: 'bg-[#F1F5F9]', border: 'border-slate-300' }
  ] as const;

  const currentStock = stockCounts[activeColor][selectedSize];
  const isCritical = currentStock <= 5;

  const handleSimulateSale = () => {
    if (currentStock <= 0) return;
    setIsSelling(true);
    setTimeout(() => {
      setStockCounts(prev => ({
        ...prev,
        [activeColor]: {
          ...prev[activeColor],
          [selectedSize]: Math.max(0, prev[activeColor][selectedSize] - 1)
        }
      }));
      setLastAction(`1 Adet ${colors.find(c => c.key === activeColor)?.name} (${selectedSize}) satıldı! Trendyol & Depo eşitlendi.`);
      setIsSelling(false);
    }, 300);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#F3F8F8] via-[#FAF8F5] to-white border-b border-slate-200/60">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-cyan-100/40 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-bold mb-5 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span>Tekstil & Hazır Giyime Özel Akıllı Stok Yazılımı</span>
            </div>

            {/* Main Headline (Exact Turkish prompt text) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-['Outfit',sans-serif] mb-6">
              Renk, Beden ve Stokun <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-700 bg-clip-text text-transparent">
                Tek Adresi
              </span>
            </h1>

            {/* Description (Exact Turkish prompt text) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              Tekstil ve hazır giyim sektöründe stok yönetimi, her ürünün renk, beden, model ve sezon gibi onlarca varyantını aynı anda takip etmeyi gerektirir. Stok Pratik ile tüm varyantları tek bir ürün kartında toplayın, hangi bedenin hangi renkte ne kadar kaldığını anlık görün. Sezon geçişlerinde stok eritme stratejileri oluşturun, B2B portalı ile toptan müşterilerinize özel fiyat listeleri sunun.
            </p>

            {/* 3 Core Highlight Features in Grid/Pills */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              <div className="p-3.5 rounded-xl bg-white border border-teal-100 shadow-xs hover:border-teal-300 transition-all">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1">
                  <Grid3X3 className="w-4 h-4 text-teal-600" />
                  <span>Varyant Yönetimi</span>
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  Renk, beden, model, sezon tek bir ürün kartında.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-teal-100 shadow-xs hover:border-teal-300 transition-all">
                <div className="flex items-center gap-2 text-cyan-700 font-bold text-sm mb-1">
                  <Barcode className="w-4 h-4 text-cyan-600" />
                  <span>Barkodlu Stok</span>
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  Her varyanta özel barkod ile hızlı giriş-çıkış.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-teal-100 shadow-xs hover:border-teal-300 transition-all">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1">
                  <Store className="w-4 h-4 text-indigo-600" />
                  <span>Toptan & B2B</span>
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  Özel fiyat listeleriyle toptan sipariş yönetimi.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                id="btn-hero-free-demo"
                onClick={onOpenDemoModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Hemen Dene - 14 Gün Ücretsiz Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={OFFICIAL_LINKS.packages}
                id="btn-hero-view-packages"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-slate-300 hover:border-teal-500 text-slate-800 hover:text-teal-700 font-bold text-base shadow-xs hover:bg-teal-50/50 transition-all text-center"
              >
                <span>Paketleri İncele</span>
              </a>
            </div>

            {/* Assurance Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kredi Kartı Gerekmez
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Kurulumsuz Web Tabanlı
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> 180+ Tekstil Firması Referansı
              </span>
            </div>

          </div>

          {/* Right Column: Live Interactive Textile Variant Card Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200/90 overflow-hidden relative">
              
              {/* Card Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    STK
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-white font-['Outfit',sans-serif]">
                      Oversize Keten Gömlek
                    </h3>
                    <p className="text-[11px] text-teal-300">
                      Kod: STK-TX-2026 • Yaz 2026 Sezonu
                    </p>
                  </div>
                </div>
                <span className="bg-teal-400/20 text-teal-300 border border-teal-400/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  Canlı Matris
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                
                {/* 1. Color Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-teal-600" /> Renk Varyantı:
                    </span>
                    <span className="text-teal-700 font-semibold">
                      {colors.find(c => c.key === activeColor)?.name}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {colors.map(col => (
                      <button
                        key={col.key}
                        onClick={() => setActiveColor(col.key)}
                        className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                          activeColor === col.key 
                            ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 font-bold' 
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${col.bg} border ${col.border}`} />
                        <span className="text-xs truncate">{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Size Grid with Live Stock Numbers */}
                <div>
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-teal-600" /> Beden Seçimi & Anlık Stok:
                    </span>
                    <span className="text-xs text-slate-500">
                      Toplam: {Object.values(stockCounts[activeColor]).reduce((a: number, b: number) => a + b, 0)} Adet
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['S', 'M', 'L'] as const).map(size => {
                      const qty = stockCounts[activeColor][size];
                      const isLow = qty <= 5;
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          <span className="text-xs font-bold">{size} Beden</span>
                          <span className={`text-xs font-extrabold mt-0.5 ${
                            isSelected ? 'text-teal-300' : isLow ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {qty} Adet
                          </span>
                          {isLow && (
                            <span className={`text-[9px] font-bold px-1 rounded mt-0.5 ${
                              isSelected ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
                            }`}>
                              Kritik
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Barcode & Wholesale Pricing Details */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Barcode className="w-3.5 h-3.5 text-slate-700" /> Otomatik Barkod:
                    </span>
                    <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                      8680010920{activeColor === 'sage' ? '1' : activeColor === 'terracotta' ? '2' : activeColor === 'navy' ? '3' : '4'}{selectedSize === 'S' ? '1' : selectedSize === 'M' ? '2' : '3'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">B2B Toptan Fiyatı:</span>
                    <span className="font-bold text-indigo-700">420,00 ₺ <span className="text-[10px] text-slate-500 font-normal">+KDV</span></span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Perakende / POS Fiyatı:</span>
                    <span className="font-bold text-slate-900">890,00 ₺ <span className="text-[10px] text-slate-500 font-normal">KDV Dahil</span></span>
                  </div>
                </div>

                {/* 4. Action: Test Single Sale & Sync */}
                <div className="pt-1">
                  <button
                    id="btn-hero-simulate-sale"
                    onClick={handleSimulateSale}
                    disabled={isSelling || currentStock <= 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSelling ? 'animate-spin' : ''}`} />
                    <span>POS Satışı Simüle Et (Stok Düşür & Senkronize Et)</span>
                  </button>

                  {lastAction && (
                    <div className="mt-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{lastAction}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Quick Metric Bar */}
              <div className="bg-teal-50/70 border-t border-teal-100 px-4 py-2.5 flex items-center justify-between text-[11px] text-teal-900 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Trendyol & Hepsiburada Senkron
                </span>
                <span className="text-teal-700 font-bold">Tek Tıkla e-Fatura</span>
              </div>
            </div>

            {/* Floating Floating Pill */}
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200 hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                %70
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800">Daha Hızlı Varyant Girişi</p>
                <p className="text-slate-500">Tekstil firmalarında kanıtlanmış hız</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

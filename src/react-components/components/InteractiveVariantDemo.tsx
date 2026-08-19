import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Minus, 
  Barcode, 
  Printer, 
  ShoppingCart, 
  Check, 
  RefreshCcw, 
  Sliders, 
  Layers, 
  Tag, 
  Palette, 
  Store,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { SAMPLE_PRODUCT } from '../data/mockData';

export const InteractiveVariantDemo: React.FC<{ onOpenDemoModal: () => void }> = ({ onOpenDemoModal }) => {
  const [product, setProduct] = useState(SAMPLE_PRODUCT);
  const [activeColor, setActiveColor] = useState('Adaçayı Yeşili');
  const [notification, setNotification] = useState<string | null>(null);
  const [showBarcodePrint, setShowBarcodePrint] = useState(false);

  // Group colors and sizes
  const uniqueColors = Array.from(new Set(product.variants.map(v => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map(v => v.size)));

  const handleStockChange = (variantId: string, delta: number) => {
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.map(v => {
        if (v.id === variantId) {
          const newStock = Math.max(0, v.stock + delta);
          return { ...v, stock: newStock };
        }
        return v;
      })
    }));
  };

  const handleSimulateWholesaleOrder = () => {
    // reduce 2 from each variant of active color
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.map(v => {
        if (v.color === activeColor) {
          return { ...v, stock: Math.max(0, v.stock - 2) };
        }
        return v;
      })
    }));
    setNotification(`🎉 "${activeColor}" için toptan asgari seri siparişi (her bedenden 2'şer adet) işlendi ve stoktan düşüldü!`);
    setTimeout(() => setNotification(null), 4500);
  };

  const handleResetStock = () => {
    setProduct(SAMPLE_PRODUCT);
    setNotification('🔄 Örnek varyant stokları orijinal haline sıfırlandı.');
    setTimeout(() => setNotification(null), 3000);
  };

  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const totalB2BValue = product.variants.reduce((acc, v) => acc + (v.stock * v.b2bPrice), 0);
  const totalRetailValue = product.variants.reduce((acc, v) => acc + (v.stock * v.retailPrice), 0);

  const activeColorVariants = product.variants.filter(v => v.color === activeColor);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/60" id="varyant-simulator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>İnteraktif Deneyim Alanı</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Canlı Tekstil Varyant Matrisi Simülatörü
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Aşağıdaki simülatörde bir tekstil ürününün renk ve beden matrisini inceleyebilir, stokları güncelleyebilir ve anlık B2B sipariş akışını test edebilirsiniz.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="bg-[#FAF8F5] rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
          
          {/* Top Info Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded">
                  {product.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {product.fabric}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-['Outfit',sans-serif]">
                {product.name} <span className="text-sm font-mono text-slate-500 font-normal">({product.code})</span>
              </h3>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-left">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Toplam Varyant Stoku</p>
                <p className="text-base font-extrabold text-teal-700">{totalStock} Adet</p>
              </div>
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-left">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Toptan Portföy Değeri</p>
                <p className="text-base font-extrabold text-indigo-700">{totalB2BValue.toLocaleString('tr-TR')} ₺</p>
              </div>
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-left">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Perakende Satış Hacmi</p>
                <p className="text-base font-extrabold text-emerald-700">{totalRetailValue.toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>
          </div>

          {/* Color Navigation Tabs */}
          <div className="mt-6">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2.5">
              <Palette className="w-4 h-4 text-teal-600" />
              <span>Renk Seçin (Aktif Renk Matrisi):</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {uniqueColors.map(color => {
                const sampleVar = product.variants.find(v => v.color === color);
                const isSelected = activeColor === color;
                const colorStock = product.variants.filter(v => v.color === color).reduce((a, b) => a + b.stock, 0);

                return (
                  <button
                    key={color}
                    onClick={() => setActiveColor(color)}
                    className={`px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-500/30'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs" 
                      style={{ backgroundColor: sampleVar?.colorHex || '#52796F' }}
                    />
                    <span>{color}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                      isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {colorStock} ad.
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matrix Grid Table */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Beden</th>
                    <th className="py-3 px-4">SKU / Kod</th>
                    <th className="py-3 px-4">Barkod Numarası</th>
                    <th className="py-3 px-4">B2B Fiyatı</th>
                    <th className="py-3 px-4">Perakende Fiyatı</th>
                    <th className="py-3 px-4 text-center">Mevcut Stok</th>
                    <th className="py-3 px-4 text-center">Durum</th>
                    <th className="py-3 px-4 text-right">Stok Güncelle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeColorVariants.map((item) => {
                    const isLow = item.stock <= item.reorderPoint;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-extrabold text-xs">
                            {item.size}
                          </span>
                          <span>{item.size} Beden</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {item.sku}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-800">
                          <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                            {item.barcode}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-indigo-700">
                          {item.b2bPrice} ₺
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {item.retailPrice} ₺
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block font-extrabold px-3 py-1 rounded-full text-xs ${
                            item.stock === 0 
                              ? 'bg-rose-100 text-rose-800' 
                              : isLow 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {item.stock} Adet
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {item.stock === 0 ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                              <AlertTriangle className="w-3 h-3 text-rose-500" /> Tükendi
                            </span>
                          ) : isLow ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                              <AlertTriangle className="w-3 h-3 text-amber-500" /> Kritik Stok
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Yeterli
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <button
                              onClick={() => handleStockChange(item.id, -1)}
                              disabled={item.stock <= 0}
                              className="w-7 h-7 rounded bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 disabled:opacity-30 flex items-center justify-center transition-colors shadow-2xs font-bold cursor-pointer"
                              title="1 Azalt (Satış)"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-bold text-xs">
                              {item.stock}
                            </span>
                            <button
                              onClick={() => handleStockChange(item.id, 1)}
                              className="w-7 h-7 rounded bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 flex items-center justify-center transition-colors shadow-2xs font-bold cursor-pointer"
                              title="1 Ekle (Stok Girişi)"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notification Alert */}
          {notification && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Quick Action Simulation Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                id="btn-demo-simulate-wholesale"
                onClick={handleSimulateWholesaleOrder}
                className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>"{activeColor}" B2B Seri Sipariş Simüle Et (-2 Adet/Beden)</span>
              </button>

              <button
                id="btn-demo-print-barcode"
                onClick={() => setShowBarcodePrint(!showBarcodePrint)}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-teal-500 text-slate-800 hover:text-teal-700 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Barcode className="w-4 h-4 text-teal-600" />
                <span>{showBarcodePrint ? 'Barkod Önizlemeyi Gizle' : 'Etiket / Barkod Şablonu Göster'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetStock}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Stokları Sıfırla"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>

              <button
                onClick={onOpenDemoModal}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Tüm Sistemi 14 Gün Ücretsiz Dene</span>
              </button>
            </div>
          </div>

          {/* Barcode Print Template Preview */}
          {showBarcodePrint && (
            <div className="mt-6 p-5 rounded-2xl bg-white border-2 border-dashed border-teal-300 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-teal-600" />
                  <span>Tekstil Termal Barkod Yazıcı Çıktı Şablonu Önizleme (50x30mm)</span>
                </span>
                <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded">
                  Zebra, Argox, Xprinter Uyumlu
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeColorVariants.map(v => (
                  <div key={v.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-sans space-y-1">
                    <p className="text-[10px] font-bold text-slate-700 truncate">STOK PRATİK BUTİK</p>
                    <p className="text-xs font-extrabold text-slate-900">{product.name}</p>
                    <p className="text-[11px] text-teal-800 font-bold">{v.color} - Beden: {v.size}</p>
                    
                    {/* Simulated SVG Barcode Graphic */}
                    <div className="py-1 flex justify-center">
                      <div className="h-9 w-36 bg-white border border-slate-300 p-1 flex items-end justify-center gap-0.5">
                        <span className="w-0.5 h-full bg-black" />
                        <span className="w-1 h-full bg-black" />
                        <span className="w-0.5 h-full bg-black" />
                        <span className="w-1.5 h-full bg-black" />
                        <span className="w-0.5 h-full bg-black" />
                        <span className="w-1 h-full bg-black" />
                        <span className="w-0.5 h-full bg-black" />
                        <span className="w-2 h-full bg-black" />
                        <span className="w-0.5 h-full bg-black" />
                        <span className="w-1 h-full bg-black" />
                        <span className="w-0.5 h-full bg-black" />
                        <span className="w-1 h-full bg-black" />
                        <span className="w-1.5 h-full bg-black" />
                      </div>
                    </div>
                    <p className="text-[10px] font-mono tracking-widest text-slate-600">{v.barcode}</p>
                    <p className="text-xs font-extrabold text-slate-900 pt-0.5">FİYAT: {v.retailPrice},00 TL</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

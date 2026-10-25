import React, { useState, useMemo } from 'react';
import pricingData from '../data/pricing.json';

export default function ModernPricingCalculator() {
  const { packages, modules } = pricingData;

  // Varsayılan olarak en popüler paket (kobi_pro) seçili
  const [selectedPkgId, setSelectedPkgId] = useState('kobi_pro');
  
  // Seçili ek modüller state'i: { [moduleId]: boolean }
  const [activeModules, setActiveModules] = useState({});
  
  // Adet bazlı modüllerin adetleri: { [moduleId]: number }
  const [quantities, setQuantities] = useState({
    pazaryeri: 1,
    pdks: 5,
    ek_kullanici: 1,
    ek_sube: 1,
    ek_magaza: 1,
    saha_satis: 1
  });

  // Seçili ana paket objesi
  const selectedPkg = useMemo(() => {
    return packages.find(p => p.id === selectedPkgId) || packages[1];
  }, [selectedPkgId, packages]);

  // Bir modülün seçili ana pakete dahil olup olmadığını kontrol et
  const isIncludedInPackage = (modId) => {
    return selectedPkg?.included_modules?.includes(modId);
  };

  // Modül aç/kapa
  const toggleModule = (modId) => {
    if (isIncludedInPackage(modId)) return; // Pakette dahilse değiştirilemez
    setActiveModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  // Adet artır / azalt
  const updateQuantity = (modId, delta) => {
    setQuantities(prev => {
      const current = prev[modId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [modId]: next };
    });
  };

  // Ek modüllerin aylık maliyet toplamı
  const extraMonthlyTotal = useMemo(() => {
    let total = 0;
    modules.forEach(mod => {
      if (isIncludedInPackage(mod.id)) return; // Pakette dahilse ek ücret yok

      if (activeModules[mod.id]) {
        if (mod.type === 'quantity') {
          const qty = quantities[mod.id] || mod.default || 1;
          total += mod.price * qty;
        } else {
          total += mod.price;
        }
      }
    });
    return total;
  }, [activeModules, quantities, selectedPkg, modules]);

  // Aylık denk gelen toplam
  const monthlyTotal = useMemo(() => {
    return (selectedPkg?.monthly_price || 0) + extraMonthlyTotal;
  }, [selectedPkg, extraMonthlyTotal]);

  // Yıllık peşin toplam (Aylık toplam * 12)
  const yearlyTotal = useMemo(() => {
    return monthlyTotal * 12;
  }, [monthlyTotal]);

  // Aktif modül isimlerinin listesi (WhatsApp ve özet için)
  const selectedModulesList = useMemo(() => {
    const list = [];
    modules.forEach(mod => {
      const included = isIncludedInPackage(mod.id);
      const active = activeModules[mod.id];
      if (included) {
        list.push({ name: mod.name, status: 'Pakete Dahil', cost: 0, included: true });
      } else if (active) {
        const qty = quantities[mod.id] || mod.default || 1;
        const cost = mod.type === 'quantity' ? mod.price * qty : mod.price;
        list.push({ name: mod.name, status: 'Ek Modül', cost, qty, type: mod.type, included: false });
      }
    });
    return list;
  }, [modules, activeModules, quantities, selectedPkg]);

  // WhatsApp Mesajı URL oluşturucu
  const whatsappUrl = useMemo(() => {
    const lines = [
      `Merhaba Stok Pratik Ekibi, sitemizdeki Fiyat Hesaplama aracı üzerinden bir paket yapılandırdım:`,
      `📦 Ana Paket: ${selectedPkg?.name} (${selectedPkg?.monthly_price} ₺/ay)`,
    ];

    const addedExtras = selectedModulesList.filter(m => !m.included);
    if (addedExtras.length > 0) {
      lines.push(`⚙️ Ek Modüller:`);
      addedExtras.forEach(m => {
        if (m.type === 'quantity') {
          lines.push(` - ${m.name} (${m.qty} Adet): +${m.cost} ₺/ay`);
        } else {
          lines.push(` - ${m.name}: +${m.cost} ₺/ay`);
        }
      });
    }

    lines.push(`💰 Aylık Denk Gelen: ${monthlyTotal.toLocaleString('tr-TR')} ₺/ay`);
    lines.push(`💳 Yıllık Toplam: ${yearlyTotal.toLocaleString('tr-TR')} ₺ + KDV`);
    lines.push(`1 ay ücretsiz denemek ve kurulum hakkında bilgi almak istiyorum.`);

    return `https://wa.me/+905325000999?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [selectedPkg, selectedModulesList, monthlyTotal, yearlyTotal]);

  return (
    <div className="w-full">

      {/* 1. BÖLÜM: 3 HAZIR ANA PAKET SEÇİM KARTLARI */}
      <div className="mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg) => {
            const isSelected = selectedPkgId === pkg.id;
            return (
              <div 
                key={pkg.id}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`rounded-3xl p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-white border-2 border-red-600 shadow-2xl shadow-red-600/15 ring-4 ring-red-500/10 lg:-translate-y-2' 
                    : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300'
                }`}
              >
                {/* Seçili Rozeti veya Popüler Rozeti */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                      isSelected 
                        ? 'bg-red-600 text-white' 
                        : (pkg.is_popular ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700')
                    }`}>
                      {isSelected ? '✓ SEÇİLEN PAKET' : pkg.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {pkg.capacity}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {pkg.name}
                  </h3>

                  {/* Fiyat Kutusu */}
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 mb-5 border border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        {pkg.monthly_price.toLocaleString('tr-TR')} ₺
                      </span>
                      <span className="text-sm font-semibold text-slate-500">/ ay</span>
                    </div>
                    
                    <div className="mt-1 text-xs text-red-700 font-bold bg-red-50 py-1 px-2.5 rounded-lg border border-red-100 inline-block">
                      Yıllık Peşin: {pkg.yearly_total_price.toLocaleString('tr-TR')} ₺ + KDV
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      (Yıllık peşin faturalandırılır)
                    </div>
                  </div>

                  {/* Paket Özellikleri */}
                  <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-700">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seçim Butonu */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPkgId(pkg.id);
                  }}
                  className={`w-full py-3.5 px-6 rounded-full font-black text-sm text-center transition-all ${
                    isSelected 
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isSelected ? '✓ Seçildi' : 'Bu Paketi Seç'}
                </button>

              </div>
            );
          })}
        </div>
      </div>

      {/* 2. BÖLÜM: SADE MODÜL LİSTESİ (MİNİ BUTONLAR & ADET ARTTIRICI) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-12">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              ⚙️ İsteğe Bağlı Eklenti Modüller
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Paketinize Eklemek İstediğiniz Modülleri İşaretleyin
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Seçtiğiniz <span className="font-bold text-red-600">{selectedPkg?.name}</span> paketinde dahil olan modüller otomatik işaretlidir. İhtiyacınıza göre diğer modülleri ekleyebilirsiniz.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 font-semibold uppercase block">Tüm Modül Fiyatları</span>
            <span className="text-xs font-bold text-slate-600">Aylık karşılık olup yıllık toplanır</span>
          </div>
        </div>

        {/* Modül Listesi Grid (Kompakt ve Temiz) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => {
            const isIncluded = isIncludedInPackage(mod.id);
            const isChecked = isIncluded || !!activeModules[mod.id];
            const qty = quantities[mod.id] || mod.default || 1;

            return (
              <div 
                key={mod.id}
                onClick={() => !isIncluded && toggleModule(mod.id)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isIncluded 
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-800 cursor-default' 
                    : (isChecked 
                        ? 'bg-red-50/50 border-red-400 shadow-sm cursor-pointer' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer')
                }`}
              >
                {/* Sol: İkon & İsim */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    isIncluded ? 'bg-emerald-100 text-emerald-700' : (isChecked ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600')
                  }`}>
                    {mod.icon}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 leading-snug truncate">
                      {mod.name}
                    </div>

                    <div className="text-xs mt-0.5">
                      {isIncluded ? (
                        <span className="text-emerald-700 font-black">✓ Paketinizde Dahil</span>
                      ) : (
                        <span className="font-extrabold text-slate-900">
                          +{mod.price} ₺ <span className="font-normal text-slate-500">/ ay {mod.type === 'quantity' ? `(${mod.unit_label})` : ''}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sağ: Adet Sayacı veya Checkbox */}
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {mod.type === 'quantity' && !isIncluded && isChecked && (
                    <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg p-1 shadow-xs">
                      <button 
                        type="button" 
                        onClick={() => updateQuantity(mod.id, -1)}
                        className="w-6 h-6 rounded bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-600 font-black flex items-center justify-center text-sm"
                        aria-label="Azalt"
                      >
                        -
                      </button>
                      
                      <span className="text-xs font-black text-slate-900 w-6 text-center">
                        {qty}
                      </span>

                      <button 
                        type="button" 
                        onClick={() => updateQuantity(mod.id, 1)}
                        className="w-6 h-6 rounded bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-600 font-black flex items-center justify-center text-sm"
                        aria-label="Artır"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {/* Checkbox Göstergesi */}
                  <div 
                    onClick={() => !isIncluded && toggleModule(mod.id)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isIncluded 
                        ? 'bg-emerald-600 text-white' 
                        : (isChecked 
                            ? 'bg-red-600 text-white shadow-sm' 
                            : 'border-2 border-slate-300 bg-white text-transparent')
                    }`}
                  >
                    ✓
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 3. BÖLÜM: CANLI ŞEFFAF TOPLAM VE 1 AY ÜCRETSİZ BAŞLA BUTONU */}
      <div className="sticky bottom-4 z-40 bg-slate-950 text-white p-5 sm:p-7 rounded-3xl shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Sol: Seçim Özeti */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center text-2xl shrink-0">
            🧾
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Seçilen Yapılandırma
            </div>
            <div className="text-base sm:text-lg font-black text-white">
              {selectedPkg?.name}
              {extraMonthlyTotal > 0 && (
                <span className="text-red-400 text-sm font-bold ml-2">
                  (+{extraMonthlyTotal} ₺ Ek Modüller)
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">
              Yıllık peşin faturalandırma • Kredi kartsız 1 ay tam sürüm kullanım hakkı
            </div>
          </div>
        </div>

        {/* Sağ: Tutar ve Başla Butonu */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto justify-end">
          
          <div className="text-center sm:text-right">
            <div className="flex items-baseline justify-center sm:justify-end gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {monthlyTotal.toLocaleString('tr-TR')} ₺
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ ay</span>
            </div>
            
            <div className="text-xs font-extrabold text-amber-400 mt-0.5">
              Yıllık Peşin Toplam: {yearlyTotal.toLocaleString('tr-TR')} ₺ + KDV
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a 
              href="https://stokpratik.com.tr/firma-kaydi"
              className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-full text-center transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 group text-base shrink-0"
            >
              <span>1 Ay Ücretsiz Başla</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all text-xl shrink-0 shadow-md"
              title="WhatsApp ile Teklif Al"
            >
              💬
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}

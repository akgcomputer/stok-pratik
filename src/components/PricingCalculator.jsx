import React, { useState, useMemo } from 'react';
import pricingData from '../data/pricing.json';

export default function PricingCalculator() {
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'yearly' or 'monthly'
  const [activePreset, setActivePreset] = useState(null);
  
  // Selected state for toggle & quantity modules
  const [selectedModules, setSelectedModules] = useState({
    gib_edonusum: false,
    cek_senet: false,
    masraf_ocr: false,
    demirbas: false,
    pazaryeri: false,
    depodandirekt: false,
    hizli_pos: false,
    uretim_mrp: false,
    pdks: false,
    plasiyer: false,
    ek_kullanici: false,
    ek_depo: false
  });

  // Quantities for multiplier modules
  const [quantities, setQuantities] = useState({
    pazaryeri: 1,
    pdks: 5,
    plasiyer: 1,
    ek_kullanici: 1,
    ek_depo: 1
  });

  const { core_package, categories, modules, presets, currency_symbol, vat_text } = pricingData;

  // Toggle a module on/off
  const handleToggleModule = (moduleId) => {
    setActivePreset(null);
    setSelectedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Change quantity
  const handleQuantityChange = (moduleId, delta) => {
    setQuantities(prev => {
      const current = prev[moduleId] || 1;
      const targetModule = modules.find(m => m.id === moduleId);
      const min = targetModule?.min || 1;
      const next = Math.max(min, current + delta);
      return { ...prev, [moduleId]: next };
    });
  };

  // Apply a preset
  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    const newSelected = {};
    modules.forEach(m => {
      newSelected[m.id] = preset.module_ids.includes(m.id);
    });
    setSelectedModules(newSelected);

    if (preset.quantities) {
      setQuantities(prev => ({
        ...prev,
        ...preset.quantities
      }));
    }
  };

  // Price calculations
  const calculation = useMemo(() => {
    const isYearly = billingCycle === 'yearly';

    // Core Package
    const coreMonthly = core_package.monthly_price;
    const coreYearlyMonthly = core_package.yearly_monthly_price;
    const coreCurrentMonthly = isYearly ? coreYearlyMonthly : coreMonthly;

    // Modules
    const activeModuleDetails = [];
    let modulesMonthlySum = 0;
    let modulesYearlyMonthlySum = 0;

    modules.forEach(mod => {
      if (!selectedModules[mod.id]) return;

      let modMonthly = 0;
      let modYearlyMonthly = 0;
      let qty = 1;

      if (mod.type === 'toggle') {
        modMonthly = mod.monthly_price;
        modYearlyMonthly = mod.yearly_monthly_price;
      } else if (mod.type === 'quantity') {
        qty = quantities[mod.id] || mod.default || 1;
        modMonthly = mod.monthly_price * qty;
        modYearlyMonthly = mod.yearly_monthly_price * qty;
      } else if (mod.type === 'base_plus_quantity') {
        qty = quantities[mod.id] || mod.default || 1;
        modMonthly = mod.base_monthly_price + (mod.unit_monthly_price * qty);
        modYearlyMonthly = mod.base_yearly_monthly_price + (mod.unit_yearly_monthly_price * qty);
      }

      modulesMonthlySum += modMonthly;
      modulesYearlyMonthlySum += modYearlyMonthly;

      const currentPrice = isYearly ? modYearlyMonthly : modMonthly;

      activeModuleDetails.push({
        id: mod.id,
        name: mod.name,
        icon: mod.icon,
        type: mod.type,
        quantity: qty,
        unitLabel: mod.unit_label,
        currentPrice,
        monthlyPrice: modMonthly,
        yearlyMonthlyPrice: modYearlyMonthly
      });
    });

    const totalMonthlyEquiv = isYearly 
      ? (coreYearlyMonthly + modulesYearlyMonthlySum) 
      : (coreMonthly + modulesMonthlySum);

    const standardTotalMonthly = coreMonthly + modulesMonthlySum;
    const yearlyAnnualTotal = (coreYearlyMonthly + modulesYearlyMonthlySum) * 12;
    const fullAnnualWithoutDiscount = standardTotalMonthly * 12;
    const annualSavings = fullAnnualWithoutDiscount - yearlyAnnualTotal;

    return {
      isYearly,
      coreCurrentMonthly,
      activeModuleDetails,
      totalMonthlyEquiv,
      standardTotalMonthly,
      yearlyAnnualTotal,
      annualSavings
    };
  }, [billingCycle, selectedModules, quantities]);

  // Generate dynamic links
  const trialLink = useMemo(() => {
    const selectedList = Object.keys(selectedModules).filter(k => selectedModules[k]);
    const params = new URLSearchParams();
    params.set('cycle', billingCycle);
    if (selectedList.length > 0) {
      params.set('modules', selectedList.join(','));
    }
    return `/firma-kaydi?${params.toString()}`;
  }, [billingCycle, selectedModules]);

  const whatsappLink = useMemo(() => {
    const isYearly = calculation.isYearly;
    const lines = [
      'Merhaba Stok Pratik Ekibi,',
      'Sitedeki Modüler Fiyat Hesaplayıcı üzerinden bir paket oluşturdum:',
      '',
      `✅ ${core_package.name} (1 Kullanıcı + 1 Depo)`,
    ];

    if (calculation.activeModuleDetails.length > 0) {
      calculation.activeModuleDetails.forEach(item => {
        if (item.type === 'quantity' || item.type === 'base_plus_quantity') {
          lines.push(`+ ${item.icon} ${item.name} (${item.quantity} ${item.unitLabel || 'Adet'})`);
        } else {
          lines.push(`+ ${item.icon} ${item.name}`);
        }
      });
    }

    lines.push('');
    lines.push(`📌 Ödeme Modeli: ${isYearly ? 'Yıllık Peşin (Avantajlı)' : 'Aylık Ödeme'}`);
    lines.push(`💰 Aylık Tutar: ${calculation.totalMonthlyEquiv.toLocaleString('tr-TR')} ${currency_symbol} / ay (+KDV)`);
    if (isYearly) {
      lines.push(`💵 Yıllık Toplam: ${calculation.yearlyAnnualTotal.toLocaleString('tr-TR')} ${currency_symbol} (+KDV)`);
      lines.push(`🎉 Yıllık Tasarruf: ${calculation.annualSavings.toLocaleString('tr-TR')} ${currency_symbol}`);
    }
    lines.push('');
    lines.push('Bu paket hakkında detaylı demo ve teklif görüşmesi rica ediyorum.');

    const message = lines.join('\n');
    return `https://wa.me/905325000999?text=${encodeURIComponent(message)}`;
  }, [calculation, core_package, currency_symbol]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* 1. BILLING CYCLE SWITCHER & PRESETS BAR */}
      <div className="flex flex-col items-center justify-center mb-10">
        {/* Monthly / Yearly Switch */}
        <div className="inline-flex items-center p-1.5 bg-slate-900/90 backdrop-blur rounded-2xl shadow-xl border border-slate-700/80 mb-6">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-white text-slate-950 shadow-md scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Aylık Ödeme
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Yıllık Avantajlı</span>
            <span className="bg-emerald-400 text-emerald-950 text-[11px] font-black uppercase px-2 py-0.5 rounded-full tracking-wide">
              %20 İndirim
            </span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="w-full max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Hızlı Paket Şablonları (Tek Tıkla Seçin)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {presets.map(preset => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-md'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/70 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{preset.icon}</span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                      {preset.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    {preset.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID: MODULE SELECTORS (LEFT 8 COLS) + STICKY SUMMARY CARD (RIGHT 4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: MODULE SECTIONS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* A) MANDATORY CORE PACKAGE */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-2xl border border-indigo-500/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <span>🔒 Zorunlu Çekirdek Omurga</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {core_package.name}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {core_package.subtitle}
                </p>
              </div>

              <div className="sm:text-right bg-slate-800/80 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-slate-700 sm:border-0">
                <div className="flex items-baseline sm:justify-end gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {calculation.coreCurrentMonthly.toLocaleString('tr-TR')} {currency_symbol}
                  </span>
                  <span className="text-sm text-slate-300 font-medium">/ ay</span>
                </div>
                <p className="text-xs text-blue-300 mt-0.5 font-medium">
                  {calculation.isYearly ? 'Yıllıkta aylık (4.680 ₺ / yıl)' : 'Aylık taahhütsüz ödeme'}
                </p>
              </div>
            </div>

            {/* Core Features Pill Grid */}
            <div className="pt-6 relative z-10">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Her Kurulumda Standart Dahil Olan Temel Modüller:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {core_package.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* B) CATEGORIZED OPTIONAL MODULES */}
          {categories.map(category => {
            const categoryModules = modules.filter(m => m.category === category.id);
            if (categoryModules.length === 0) return null;

            return (
              <div key={category.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="text-2xl p-2.5 bg-slate-100 rounded-2xl">{category.icon}</span>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {category.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryModules.map(mod => {
                    const isSelected = !!selectedModules[mod.id];
                    const currentPrice = calculation.isYearly ? mod.yearly_monthly_price : mod.monthly_price;
                    const qty = quantities[mod.id] || mod.default || 1;

                    return (
                      <div
                        key={mod.id}
                        className={`rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-500 bg-gradient-to-b from-blue-50/50 to-white shadow-md ring-2 ring-blue-500/10'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Top: Icon, Title & Toggle Switch */}
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100">
                                {mod.icon}
                              </span>
                              <div>
                                <h5 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                                  {mod.name}
                                </h5>
                                {mod.badge && (
                                  <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 font-semibold text-[10px] rounded-md border border-indigo-100">
                                    {mod.badge}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Checkbox Toggle Button */}
                            <button
                              type="button"
                              onClick={() => handleToggleModule(mod.id)}
                              className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-200 ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                  : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                              }`}
                              aria-label={`${mod.name} modülünü ${isSelected ? 'çıkar' : 'ekle'}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {mod.description}
                          </p>
                        </div>

                        {/* Bottom: Price and Multipliers */}
                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs font-semibold text-slate-500">
                              {mod.unit_label ? `${mod.unit_label}:` : 'Modül Tutarı:'}
                            </span>
                            <div className="text-right">
                              <span className="text-base sm:text-lg font-black text-slate-900">
                                +{currentPrice} {currency_symbol}
                              </span>
                              <span className="text-xs text-slate-500 font-medium"> / ay</span>
                            </div>
                          </div>

                          {/* Multiplier for Quantity Modules (If selected) */}
                          {isSelected && mod.type === 'quantity' && (
                            <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-blue-200">
                              <span className="text-xs font-bold text-slate-700">
                                {mod.unit_label || 'Adet'}:
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(mod.id, -1)}
                                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center transition-colors"
                                  disabled={qty <= (mod.min || 1)}
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-black text-sm text-slate-900">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(mod.id, 1)}
                                  className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold text-sm flex items-center justify-center transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Base + Multiplier for PDKS */}
                          {isSelected && mod.type === 'base_plus_quantity' && (
                            <div className="space-y-2 bg-white p-2.5 rounded-xl border border-blue-200">
                              <div className="flex items-center justify-between text-xs text-slate-600">
                                <span>Açılış Ücreti:</span>
                                <span className="font-bold text-slate-900">
                                  {calculation.isYearly ? mod.base_yearly_monthly_price : mod.base_monthly_price} {currency_symbol}/ay
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                                <span className="text-xs font-bold text-slate-700">
                                  Personel Sayısı:
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleQuantityChange(mod.id, -1)}
                                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center transition-colors"
                                    disabled={qty <= (mod.min || 1)}
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-black text-sm text-slate-900">
                                    {qty}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleQuantityChange(mod.id, 1)}
                                    className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold text-sm flex items-center justify-center transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: STICKY LIVE COST SUMMARY CARD */}
        <div className="lg:col-span-4 sticky top-24 z-20">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-7">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h4 className="font-extrabold text-lg text-slate-900">
                  Paket Özeti
                </h4>
                <p className="text-xs text-slate-500">
                  Canlı Maliyet Hesaplayıcı
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                {calculation.isYearly ? 'Yıllık Sözleşme' : 'Aylık Ödeme'}
              </span>
            </div>

            {/* Line Items List */}
            <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
              {/* Core Package Item */}
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="font-bold text-slate-800">StokPratik Çekirdek</span>
                </div>
                <span className="font-bold text-slate-900">
                  {calculation.coreCurrentMonthly.toLocaleString('tr-TR')} {currency_symbol}/ay
                </span>
              </div>

              {/* Selected Modules */}
              {calculation.activeModuleDetails.map(item => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span>{item.icon}</span>
                    <span className="line-clamp-1">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="font-bold text-blue-600 shrink-0">
                        (x{item.quantity})
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    +{item.currentPrice.toLocaleString('tr-TR')} {currency_symbol}/ay
                  </span>
                </div>
              ))}

              {calculation.activeModuleDetails.length === 0 && (
                <p className="text-[11px] text-slate-400 italic py-1">
                  Henüz ek modül seçilmedi. Yalnızca çekirdek paket faturalandırılacaktır.
                </p>
              )}
            </div>

            {/* Total Section */}
            <div className="pt-4 border-t border-slate-200/80 mb-6 bg-slate-50/70 p-4 rounded-2xl">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Aylık Eşdeğer Tutar:
                </span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">
                    {calculation.totalMonthlyEquiv.toLocaleString('tr-TR')} {currency_symbol}
                  </span>
                  <span className="text-xs font-semibold text-slate-500"> / ay</span>
                </div>
              </div>

              {calculation.isYearly && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Yıllık Toplam Tutar:</span>
                    <span className="font-bold text-slate-950">
                      {calculation.yearlyAnnualTotal.toLocaleString('tr-TR')} {currency_symbol}
                    </span>
                  </div>
                  
                  {calculation.annualSavings > 0 && (
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1.5 rounded-lg mt-2">
                      <span>🎉 Yıllık Kazancınız:</span>
                      <span>{calculation.annualSavings.toLocaleString('tr-TR')} {currency_symbol}</span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                {vat_text}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              {/* Primary: 14 Days Free Trial */}
              <a
                href={trialLink}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base text-center block shadow-lg shadow-blue-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                14 Gün Ücretsiz Dene
              </a>

              {/* Secondary: WhatsApp Quick Quote */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp ile Hızlı Teklif Al</span>
              </a>
            </div>

            {/* Micro reassurance badges */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Kredi Kartı Gerekmez
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Anında Kurulum
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

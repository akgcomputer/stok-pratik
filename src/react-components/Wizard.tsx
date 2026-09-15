import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2, Store, Truck, Briefcase, Factory, Building2, Users, ShoppingCart, AlertCircle, Sparkles, Check, ArrowRight, ShieldCheck, XCircle, MapPin, Package, FileText, Wallet, Zap, Globe2 } from 'lucide-react';
import softwareMatrix from '../data/softwareMatrix.json';

interface WizardState {
  industries: string[];
  storeCount: string;
  salesTeam: string;
  marketplaces: string;
  painPoint: string;
}

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>({
    industries: [],
    storeCount: '',
    salesTeam: '',
    marketplaces: '',
    painPoint: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisTextIndex, setAnalysisTextIndex] = useState(0);
  const [scannedBrands, setScannedBrands] = useState<string[]>([]);
  const allBrands = ['Logo Yazılım', 'Mikro Yazılım', 'Zirve Bilgisayar', 'Luca', 'Paraşüt', 'Akınsoft', 'DİA Yazılım', 'ETA Bilgisayar', 'Nebim', 'Uyumsoft', 'Bizim Hesap', 'KolayBi\'', 'Logo İşbaşı', 'Vega Yazılım', 'Orka Bilgisayar', 'Datasoft', 'Canias ERP', 'Workcube ERP', 'SAP Business One', 'Microsoft Dynamics 365', 'Oracle NetSuite', 'Odoo ERP', 'GMS.NET', 'MikroX', 'BizMu', 'CPM Master ERP', 'İnpos', 'Bayt Yazılım', 'Demsoft', 'Sentez', 'Vento', 'Noyax', 'Minerva', 'IFS', 'Fenesoft', 'BilSoft', 'Karel', 'Aymet', 'Prosoft', 'CetaSoft', 'Pikademi', 'Axasoft', 'Yaylasoft', 'Netadam', 'Atia', 'Timecom', 'Vera ERP', 'Basecom', 'Asyasoft', 'Senkron ERP'];

  const analysisTexts = [
    { text: "İşletme modeliniz analiz ediliyor...", icon: <Loader2 className="animate-spin text-slate-500 mr-3" /> },
    { text: "Nelere ihtiyacınız var kontrol ediyorum (Perakende, Mağaza POS, E-Ticaret, Entegrasyon, Pazaryeri, ERP, CRM)...", icon: <CheckCircle2 className="text-emerald-500 mr-3" /> },
    { text: "60+ marka arasında işletmenize en uygun çözümler taranıyor...", icon: <Loader2 className="animate-spin text-slate-500 mr-3" /> },
    { text: "Fiyat/performans ve operasyonel uyuma göre en uygun 2 aday eşleştirildi!", icon: <Sparkles className="text-amber-500 mr-3" /> }
  ];

  const handleIndustryToggle = (val: string) => {
    setState(prev => {
      const exists = prev.industries.includes(val);
      if (exists) return { ...prev, industries: prev.industries.filter(i => i !== val) };
      return { ...prev, industries: [...prev.industries, val] };
    });
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setStep(4);
    setAnalysisTextIndex(0);
    setScannedBrands([]);
    let currentIdx = 0;
    
    let tick = 0;
    const textInterval = setInterval(() => {
      tick++;
      if (tick === 1) {
        currentIdx = 1;
        setAnalysisTextIndex(1);
      } else if (tick === 3) {
        currentIdx = 2;
        setAnalysisTextIndex(2);
      } else if (tick === 9) { // Much longer duration for the brands to appear (6 seconds)
        currentIdx = 3;
        setAnalysisTextIndex(3);
      } else if (tick === 11) {
        clearInterval(textInterval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setStep(5);
        }, 1000);
      }
    }, 1000); // 1s per tick

    const brandInterval = setInterval(() => {
      if (currentIdx === 2) {
        const pool = [...allBrands, 'Stok Pratik ERP', 'Stok Pratik ERP'];
        const randomBrands = pool.sort(() => 0.5 - Math.random()).slice(0, 4);
        setScannedBrands(randomBrands);
      } else if (currentIdx >= 3) {
        clearInterval(brandInterval);
      }
    }, 800); // Slower brand flashing (800ms)
  };

  const nextStep = () => {
    if (step === 1 && state.industries.length === 0) return;
    if (step === 2 && (!state.storeCount || !state.salesTeam || !state.marketplaces)) return;
    if (step === 3 && !state.painPoint) return;
    
    if (step === 3) {
      startAnalysis();
    } else {
      setStep(s => s + 1);
    }
  };

  const getCompetitor = () => {
    if (state.marketplaces === 'yes') {
      return softwareMatrix.brands.find(b => b.id === 'entegra') || softwareMatrix.brands[0];
    }
    if (state.industries.includes('perakende') || state.industries.includes('e-ticaret')) {
      return softwareMatrix.brands.find(b => b.id === 'ikas') || softwareMatrix.brands[0];
    }
    if (state.industries.includes('imalat')) {
      return softwareMatrix.brands.find(b => b.id === 'logo-tiger') || softwareMatrix.brands[0];
    }
    if (state.salesTeam === 'yes') {
      return softwareMatrix.brands.find(b => b.id === 'teamgram') || softwareMatrix.brands[0];
    }
    return softwareMatrix.brands.find(b => b.id === 'parasut') || softwareMatrix.brands[0];
  };

  const stokPratik = softwareMatrix.stokPratik;

  const getStokPratikPlan = () => {
    if (state.industries.includes('imalat')) {
      return {
        title: "ERP Üretim Süreçleri + CRM",
        price: "2.499",
        yearlyPrice: "29.988",
        features: [
          "Gelişmiş Üretim Reçeteleri ve İş Emirleri",
          "Detaylı Fire ve Maliyet Analizi",
          "B2B Bayi Portalı ve CRM Satış Yönetimi",
          "E-Fatura, Ön Muhasebe ve Cari Takip"
        ]
      };
    } else if (state.marketplaces === 'yes' || state.industries.includes('e-ticaret') || state.industries.includes('toptan')) {
      return {
        title: "E-Ticaret + B2B Paketi",
        price: "1.499",
        yearlyPrice: "17.988",
        features: [
          "Pazaryeri ve E-Ticaret Çift Yönlü Entegrasyon",
          "B2B Toptan Satış ve Bayi Yönetimi",
          "Kargo ve Sipariş Operasyonları Otomasyonu",
          "E-Fatura ve Ön Muhasebe Yönetimi"
        ]
      };
    } else {
      return {
        title: "Ön Muhasebe + 5 Şubeli Mağaza Paketi",
        price: "4.999",
        yearlyPrice: "59.988",
        features: [
          "Çoklu Şube ve Mağaza Kasa (POS) Yönetimi",
          "Gelişmiş Depo ve Stok Raf Transferleri",
          "Saha Satış Ekibi (Plasiyer) Yönetimi",
          "E-Fatura, Genel Muhasebe ve Cari Takip"
        ]
      };
    }
  };
  const spPlan = getStokPratikPlan();
  const competitor = getCompetitor();

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative min-h-[500px] flex flex-col my-10">
      {/* Header / Progress */}
      {step < 4 && (
        <div className="bg-slate-800 border-b border-slate-700 p-6 sm:px-8 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-600/30">
              {step}
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Adım {step} / 3</h2>
              <p className="text-white font-bold text-lg">
                {step === 1 && "Sektör & Faaliyet Alanı"}
                {step === 2 && "Operasyonel Varlıklar"}
                {step === 3 && "Temel İhtiyaç & Acı Noktası"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 hidden sm:flex">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 rounded-full transition-all duration-500 ${step >= s ? 'bg-red-500 w-12 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-600 w-4'}`} />
            ))}
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="p-8 flex-1 flex flex-col justify-center">
        
        {/* STEP 1 */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">İşletmeniz hangi alanda faaliyet gösteriyor?</h3>
            <p className="text-slate-500 text-center mb-8">Birden fazla seçenek işaretleyebilirsiniz.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'perakende', label: 'Perakende (Fiziki/Online Satış)', icon: <Store className="w-6 h-6" /> },
                { id: 'toptan', label: 'Toptan Satış & B2B (Bayilik, Dağıtım)', icon: <Briefcase className="w-6 h-6" /> },
                { id: 'hizmet', label: 'Hizmet Sektörü (Danışmanlık, Servis vb.)', icon: <Users className="w-6 h-6" /> },
                { id: 'imalat', label: 'İmalat / Üretim (Hammadde & Reçete)', icon: <Factory className="w-6 h-6" /> }
              ].map(item => {
                const isSelected = state.industries.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleIndustryToggle(item.id)}
                    className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${isSelected ? 'border-red-600 bg-red-50' : 'border-slate-200 hover:border-red-300 hover:bg-slate-50'}`}
                  >
                    <div className={`mt-1 flex-shrink-0 ${isSelected ? 'text-red-600' : 'text-slate-400'}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 font-medium text-slate-700">
                      {item.label}
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-red-600 border-red-600' : 'border-slate-300'}`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Operasyonel Varlıklarınız</h3>
            
              <div className="space-y-8">
              {/* Soru 1 */}
              <div>
                <p className="font-semibold text-slate-700 mb-4">Fiziki mağaza/depo var mı?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'Yok', label: 'Yok', icon: <XCircle className="w-5 h-5" /> },
                    { id: '1', label: '1 Mağaza yada Depo', icon: <Store className="w-5 h-5" /> },
                    { id: '2-5', label: '2-5 Arası Mağaza yada Depo', icon: <Building2 className="w-5 h-5" /> },
                    { id: '5-10', label: '5-10 Arası Mağaza yada Depo', icon: <Factory className="w-5 h-5" /> },
                    { id: '10-15', label: '10-15 Arası Mağaza yada Depo', icon: <MapPin className="w-5 h-5" /> },
                    { id: '15+', label: '15+ Fazla Mağaza yada Depo', icon: <Globe2 className="w-5 h-5" /> }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setState(s => ({ ...s, storeCount: opt.id }))}
                      className={`py-3 px-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 text-center text-sm font-medium transition-all ${state.storeCount === opt.id ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <div className={state.storeCount === opt.id ? 'text-red-600' : 'text-slate-400'}>{opt.icon}</div>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Soru 2 */}
              <div>
                <p className="font-semibold text-slate-700 mb-4">Sahada aktif satış ekibi veya plasiyer var mı?</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'yes', label: 'Evet', icon: <Users className="w-5 h-5" /> },
                    { val: 'no', label: 'Hayır', icon: <XCircle className="w-5 h-5" /> }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setState(s => ({ ...s, salesTeam: opt.val }))}
                      className={`py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-3 text-center font-medium transition-all ${state.salesTeam === opt.val ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <div className={state.salesTeam === opt.val ? 'text-red-600' : 'text-slate-400'}>{opt.icon}</div>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Soru 3 */}
              <div>
                <p className="font-semibold text-slate-700 mb-4">Pazar yerlerinde (Trendyol, Hepsiburada vb.) satış yapıyor musunuz?</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'yes', label: 'Evet', icon: <ShoppingCart className="w-5 h-5" /> },
                    { val: 'no', label: 'Hayır', icon: <XCircle className="w-5 h-5" /> }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setState(s => ({ ...s, marketplaces: opt.val }))}
                      className={`py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-3 text-center font-medium transition-all ${state.marketplaces === opt.val ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <div className={state.marketplaces === opt.val ? 'text-red-600' : 'text-slate-400'}>{opt.icon}</div>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Temel İhtiyacınız & Acı Noktanız Nedir?</h3>
            <p className="text-slate-500 text-center mb-8">En çok zorlandığınız veya çözmek istediğiniz durumu seçin.</p>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'stok', label: 'Satış kanalları ile depo stoklarının birbirini tutmaması', icon: <Package className="w-6 h-6" /> },
                { id: 'muhasebe', label: 'e-Fatura, cari ve banka hesaplarının tek ekrandan takibi', icon: <FileText className="w-6 h-6" /> },
                { id: 'maliyet', label: 'Birden fazla programa ayrı ayrı para ödemek ve entegrasyon kopuklukları', icon: <Wallet className="w-6 h-6" /> },
                { id: 'hiz', label: 'Mağaza içi barkodlu hızlı satış ve vardiya/kasa açıkları', icon: <Zap className="w-6 h-6" /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setState(s => ({ ...s, painPoint: item.id }))}
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${state.painPoint === item.id ? 'border-red-600 bg-red-50' : 'border-slate-200 hover:border-red-300 hover:bg-slate-50'}`}
                >
                  <div className={`mt-1 flex-shrink-0 ${state.painPoint === item.id ? 'text-red-600' : 'text-slate-400'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-slate-700 flex-1">{item.label}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${state.painPoint === item.id ? 'border-red-600 bg-red-600' : 'border-slate-300'}`}>
                    {state.painPoint === item.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: AI ANALYSIS */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-700">
            <div className="w-24 h-24 relative mb-8">
              <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Pratik Yapay Zeka Devrede</h3>
            
            <div className="w-full max-w-md space-y-4">
              {analysisTexts.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col p-4 rounded-lg bg-slate-50 border border-slate-100 transition-all duration-500 ${idx <= analysisTextIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}
                >
                  <div className="flex items-center w-full">
                    {idx === analysisTextIndex && idx < analysisTexts.length - 1 ? (
                       <span className="mr-3 w-5 h-5 flex-shrink-0">{item.icon}</span>
                    ) : (
                       <CheckCircle2 className="text-emerald-500 mr-3 w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-slate-700 font-medium">{item.text}</span>
                  </div>
                  
                  {idx === 2 && idx <= analysisTextIndex && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-start w-full transition-all duration-300">
                       {idx === analysisTextIndex && scannedBrands.map((brand, bIdx) => {
                          if (brand === 'Stok Pratik ERP') {
                            return <span key={bIdx} className="bg-red-600 text-white border border-red-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">Stok Pratik ERP</span>;
                          }
                          const colors = ['bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-purple-50 text-purple-700 border-purple-200'];
                          return <span key={bIdx} className={`border px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all ${colors[bIdx % colors.length]}`}>{brand}</span>;
                       })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: RESULTS */}
        {step === 5 && (
          <div className="animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
                <Sparkles className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">📋 Pratik Yapay Zeka Çözüm Raporu</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Operasyonel ihtiyaçlarınızı ve sektör dinamiklerinizi analiz ettik. İş modeliniz için en uygun, maliyet-etkin çözümleri aşağıda bulabilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Competitor Card */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-white flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-slate-100 text-slate-600 px-4 py-1 rounded-bl-lg text-xs font-bold uppercase tracking-wide">
                  {competitor?.badge}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-6">{competitor?.name}</h3>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">Neden Listede?</h4>
                  <ul className="space-y-2 mb-6">
                    {competitor?.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">Operasyonel Süreç Notu</h4>
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-sm flex gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{competitor?.limitations}</p>
                  </div>
                </div>

                <div className="mb-6 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600 text-sm">Tahmini Maliyet Modeli</span>
                  </div>
                  <p className="font-medium text-slate-800 text-sm">{competitor?.estimatedCostText}</p>
                </div>
                
                <div className="mt-auto text-center">
                   <p className="text-xs text-slate-400 mt-2">Daha fazla detay ve ek maliyetler için sağlayıcıyla görüşün.</p>
                </div>
              </div>

              {/* Stok Pratik Card */}
              <div className="border-2 border-red-500 rounded-2xl p-6 bg-white flex flex-col relative overflow-hidden shadow-lg shadow-red-100">
                <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-bl-lg text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {stokPratik?.badge}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="text-red-600">STOK</span> PRATİK
                </h3>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">Neden Tercih Etmelisiniz?</h4>
                  <ul className="space-y-3 mb-6">
                    {spPlan.features.map((str, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 pt-6 border-t border-slate-100">
                  <div className="text-center bg-red-50 p-4 rounded-xl border border-red-100">
                    <h4 className="text-red-900 font-bold mb-3">{spPlan.title}</h4>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-red-600">{spPlan.price} ₺ <span className="text-lg font-bold text-red-700">/aylık</span></span>
                      <span className="text-xs font-semibold text-red-500 mt-2 uppercase tracking-wider">+ KDV (Yıllık Toplam: {spPlan.yearlyPrice} ₺)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between bg-red-50 p-4 rounded-xl border border-red-100">
                  <span className="font-bold text-red-800">Uyumluluk Skoru</span>
                  <span className="text-3xl font-black text-red-600">%91</span>
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <a href="https://wa.me/905325000999?text=Merhaba,%20Stok%20Pratik%20hakkında%20demo%20istiyorum." target="_blank" rel="noopener noreferrer" className="w-full py-4 px-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2 text-lg">
                    15 Dk Hızlı Demoyu Başlat <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="/paketlerimiz" className="w-full py-3 px-4 rounded-xl font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-center text-sm flex items-center justify-center gap-2">
                    Tüm Özellikleri İncele
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center max-w-3xl mx-auto">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Pratik Yapay Zeka Karar Özeti
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                İşletmeniz aynı anda birden fazla operasyonel süreci yürüttüğü için harici entegrasyon köprüleri kurmak yerine hepsi bir arada çalışan Stok Pratik, hız ve maliyet açısından öndedir. Karar sizin!
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => {
                  setStep(1);
                  setState({ industries: [], storeCount: '', salesTeam: '', marketplaces: '', painPoint: '' });
                }}
                className="text-slate-500 hover:text-slate-800 underline underline-offset-4 text-sm font-medium"
              >
                Analizi Baştan Başlat
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Navigation */}
      {step < 4 && (
        <div className="bg-slate-100 border-t border-slate-200 p-6 flex justify-between items-center rounded-b-2xl">
          <button 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            <ChevronLeft className="w-5 h-5" />
            Geri
          </button>
          
          <button 
            onClick={nextStep}
            disabled={
              (step === 1 && state.industries.length === 0) ||
              (step === 2 && (!state.storeCount || !state.salesTeam || !state.marketplaces)) ||
              (step === 3 && !state.painPoint)
            }
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Analizi Başlat' : 'İleri'}
            {step < 3 && <ChevronRight className="w-5 h-5" />}
            {step === 3 && <Sparkles className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

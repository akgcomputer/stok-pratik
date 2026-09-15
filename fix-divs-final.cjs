const fs = require('fs');
let text = fs.readFileSync('src/react-components/Wizard.tsx', 'utf8');

const startIndex = text.indexOf('{step === 5 && (');
const endIndex = text.indexOf('{/* Footer / Navigation */}');

if (startIndex !== -1 && endIndex !== -1) {
  const newStep5 = `{step === 5 && (
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
                  <button className="w-full py-4 px-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2 text-lg">
                    15 Dk Hızlı Demo Al & Başla <ArrowRight className="w-5 h-5" />
                  </button>
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
      
      `;
  text = text.substring(0, startIndex) + newStep5 + text.substring(endIndex);
  fs.writeFileSync('src/react-components/Wizard.tsx', text, 'utf8');
  console.log('Successfully replaced step 5 completely');
} else {
  console.log('Failed to find indices');
}

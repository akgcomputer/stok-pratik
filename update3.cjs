const fs = require('fs');
const path = 'src/react-components/Wizard.tsx';
let content = fs.readFileSync(path, 'utf8');

const dynamicPlanLogic = `  const stokPratik = softwareMatrix.stokPratik;

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
  const spPlan = getStokPratikPlan();`;

content = content.replace(
  '  const stokPratik = softwareMatrix.stokPratik;',
  dynamicPlanLogic
);


const oldStrengths = `{stokPratik?.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}`;
const newStrengths = `{spPlan.features.map((str, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}`;
content = content.replace(oldStrengths, newStrengths);


const oldCost = `<div className="mb-6 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600 text-sm">Tahmini Maliyet Modeli</span>
                    </div>
                    <p className="font-medium text-slate-800 text-sm">{stokPratik?.estimatedCostText}</p>
                  </div>`;
const newCost = `<div className="mb-6 pt-6 border-t border-slate-100">
                    <div className="text-center bg-red-50 p-4 rounded-xl border border-red-100">
                      <h4 className="text-red-900 font-bold mb-3">{spPlan.title}</h4>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-red-600">{spPlan.price} ₺ <span className="text-lg font-bold text-red-700">/aylık</span></span>
                        <span className="text-xs font-semibold text-red-500 mt-2 uppercase tracking-wider">+ KDV (Yıllık Toplam: {spPlan.yearlyPrice} ₺)</span>
                      </div>
                    </div>
                  </div>`;
content = content.replace(oldCost, newCost);

fs.writeFileSync(path, content, 'utf8');

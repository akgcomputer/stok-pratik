const fs = require('fs');
let text = fs.readFileSync('src/react-components/Wizard.tsx', 'utf8');

// 1. Emoji fix (we just replace the whole header string directly instead of regex that might fail on encoding)
text = text.replace(/<h2[^>]*>.*Pratik Yapay Zeka Çözüm Raporu<\/h2>/, '<h2 className="text-3xl font-bold text-slate-800 mb-4">📋 Pratik Yapay Zeka Çözüm Raporu</h2>');
// In case the emoji was corrupted:
text = text.replace(/<h2[^>]*>.*Pratik Yapay Zeka.*<\/h2>/, '<h2 className="text-3xl font-bold text-slate-800 mb-4">📋 Pratik Yapay Zeka Çözüm Raporu</h2>');

// 2. Inject spPlan definition right before return (
if (!text.includes('const getStokPratikPlan = () => {')) {
  const getPlanCode = `
  const getStokPratikPlan = () => {
    if (state.industries.includes('imalat')) {
      return { title: 'ERP Üretim Süreçleri + CRM', price: '2.499', yearlyPrice: '29.988', features: ['Gelişmiş Üretim Reçeteleri ve İş Emirleri', 'Detaylı Fire ve Maliyet Analizi', 'B2B Bayi Portalı ve CRM Satış Yönetimi', 'E-Fatura, Ön Muhasebe ve Cari Takip'] };
    } else if (state.marketplaces === 'yes' || state.industries.includes('e-ticaret') || state.industries.includes('toptan')) {
      return { title: 'E-Ticaret + B2B Paketi', price: '1.499', yearlyPrice: '17.988', features: ['Pazaryeri ve E-Ticaret Çift Yönlü Entegrasyon', 'B2B Toptan Satış ve Bayi Yönetimi', 'Kargo ve Sipariş Operasyonları Otomasyonu', 'E-Fatura ve Ön Muhasebe Yönetimi'] };
    } else {
      return { title: 'Ön Muhasebe + 5 Şubeli Mağaza Paketi', price: '4.999', yearlyPrice: '59.988', features: ['Çoklu Şube ve Mağaza Kasa (POS) Yönetimi', 'Gelişmiş Depo ve Stok Raf Transferleri', 'Saha Satış Ekibi (Plasiyer) Yönetimi', 'E-Fatura, Genel Muhasebe ve Cari Takip'] };
    }
  };
  const spPlan = getStokPratikPlan();
  
  return (
`;
  text = text.replace('  return (', getPlanCode);
}

// 3. Replace cost rendering block
const newCost = `<div className="mb-6 pt-6 border-t border-slate-100">
                    <div className="text-center bg-red-50 p-4 rounded-xl border border-red-100">
                      <h4 className="text-red-900 font-bold mb-3">{spPlan.title}</h4>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-red-600">{spPlan.price} ₺ <span className="text-lg font-bold text-red-700">/aylık</span></span>
                        <span className="text-xs font-semibold text-red-500 mt-2 uppercase tracking-wider">+ KDV (Yıllık Toplam: {spPlan.yearlyPrice} ₺)</span>
                      </div>
                    </div>
                  </div>`;
                  
// Try to replace the old estimatedCost block
// We can use string split/join to replace it without regex since the whitespace might be weird.
const costStart = '<div className="mb-6 pt-6 border-t border-slate-100">';
const costEndStr = '{stokPratik?.estimatedCostText}</p>';
if (text.includes(costEndStr)) {
  const parts = text.split(costStart);
  if (parts.length > 1) {
    const afterStart = parts[1];
    const subParts = afterStart.split('</div>');
    // The old block had 2 closing divs (one for the inner flex, one for the outer)
    // Actually, it's easier to use a targeted substring replacement
    let startIndex = text.indexOf(costStart);
    if (startIndex !== -1) {
       let pIndex = text.indexOf(costEndStr, startIndex);
       if (pIndex !== -1) {
          let endIndex = text.indexOf('</div>', pIndex) + 6;
          text = text.substring(0, startIndex) + newCost + text.substring(endIndex);
       }
    }
  }
}

// 4. Replace strengths rendering
const strStart = '{stokPratik?.strengths.map((str, i) => (';
if (text.includes(strStart)) {
    text = text.replace(strStart, '{spPlan.features.map((str, i) => (');
}


fs.writeFileSync('src/react-components/Wizard.tsx', text, 'utf8');
console.log('Fixed Step 5 issues successfully');

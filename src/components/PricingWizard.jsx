import React, { useState, useEffect } from 'react';
import pricingData from '../data/pricing-data.json';
import './PricingWizard.css'; // We'll add some specific css here or rely on Astro styles

const formatCurrency = (amount, currency) => {
  if (amount === null) return "YOK";
  if (amount === "Özel Teklif") return "Özel Teklif";
  
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency || 'TRY',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function PricingWizard() {
  const [step, setStep] = useState(1);
  const [licenseType, setLicenseType] = useState('rental'); // rental, lifetime
  const [pathChoice, setPathChoice] = useState(null); // ready, configure
  
  // Configurator state
  const [sector, setSector] = useState('Genel Perakende');
  const [useEInvoice, setUseEInvoice] = useState(true);
  const [hasPhysicalStore, setHasPhysicalStore] = useState(true);
  const [storeCount, setStoreCount] = useState(1);
  const [addons, setAddons] = useState({
    crm: false,
    erp: false,
    demirbas: false,
    b2b: false,
    abonelik: false,
    hatirlatma: false,
    banka: false,
    ozelYazilim: false
  });

  const { packages, add_ons, settings } = pricingData;

  // Derive calculated package based on configurator
  let selectedBasePackage = packages.find(p => p.id === 'tek-magaza');
  let appliedAddons = [];
  let isCustomOffer = addons.ozelYazilim;

  if (sector === 'Kuyumculuk') {
    selectedBasePackage = packages.find(p => p.id === 'kuyumculuk');
  } else if (sector === 'Oto Servis') {
    selectedBasePackage = packages.find(p => p.id === 'oto-servis');
  } else {
    // Determine base package from add-ons
    if (addons.crm || addons.erp) {
      selectedBasePackage = packages.find(p => p.id === 'crm-erp');
    } else if (addons.b2b) {
      selectedBasePackage = packages.find(p => p.id === 'eticaret-b2b');
    } else if (storeCount > 0 && !addons.b2b && !addons.crm && !addons.erp) {
      selectedBasePackage = packages.find(p => p.id === 'tek-magaza');
      if (storeCount > 1) {
        appliedAddons.push(add_ons.find(a => a.id === '5-sube-eklenti'));
      }
    } else {
      selectedBasePackage = packages.find(p => p.id === 'girisimci');
    }
  }

  // Fallback for lifetime unsupported (like girisimci)
  if (licenseType === 'lifetime' && selectedBasePackage?.id === 'girisimci') {
    selectedBasePackage = packages.find(p => p.id === 'tek-magaza');
  }

  // Calculate totals
  let basePrice = licenseType === 'rental' ? selectedBasePackage?.rental_price : selectedBasePackage?.lifetime_price;
  let currency = licenseType === 'rental' ? selectedBasePackage?.rental_currency : selectedBasePackage?.lifetime_currency;
  
  let addonPrice = 0;
  appliedAddons.forEach(a => {
    addonPrice += (licenseType === 'rental' ? a.rental_price : a.lifetime_price) || 0;
  });

  let totalPrice = basePrice + addonPrice;
  let tryEquivalent = 0;
  
  if (currency === 'USD') {
    tryEquivalent = totalPrice * settings.usd_try_exchange_rate;
  }

  const toggleAddon = (key) => setAddons(prev => ({...prev, [key]: !prev[key]}));

  const handleWhatsApp = (pkgName, price) => {
    let msg = `Merhaba, ${pkgName} hakkında bilgi almak istiyorum.`;
    if (pathChoice === 'configure') {
       msg = `Merhaba, sistem üzerinden ihtiyacımı yapılandırdım.\\nSektör: ${sector}\\nMağaza Sayısı: ${storeCount}\\nSeçilen Modüller: ${Object.keys(addons).filter(k => addons[k]).join(', ')}\\nHesaplanan Paket: ${selectedBasePackage?.name}\\nTutar: ${isCustomOffer ? 'Özel Teklif' : formatCurrency(totalPrice, currency)}`;
    }
    window.open(`https://wa.me/+905325000999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="wizard-container">
      {/* Progress */}
      <div className="wizard-progress">
        <div className={`step ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>1. Lisans Tipi</div>
        <div className="divider"></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}>2. İlerleme Yolu</div>
        <div className="divider"></div>
        <div className={`step ${step >= 3 ? 'active' : ''}`} onClick={() => step > 2 && setStep(3)}>3. Yapılandırma</div>
      </div>

      <div className="wizard-content">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="step-panel animate-fade-in">
            <h2>Nasıl bir lisans modeli tercih edersiniz?</h2>
            <div className="cards-grid">
              <div 
                className={`option-card ${licenseType === 'rental' ? 'selected' : ''}`}
                onClick={() => { setLicenseType('rental'); setStep(2); }}
              >
                <div className="icon">🗓️</div>
                <h3>Kiralama (Abonelik)</h3>
                <p>Düşük başlangıç maliyeti, aylık veya yıllık düzenli ödeme planı.</p>
              </div>
              <div 
                className={`option-card ${licenseType === 'lifetime' ? 'selected' : ''}`}
                onClick={() => { setLicenseType('lifetime'); setStep(2); }}
              >
                <div className="icon">♾️</div>
                <h3>Ömür Boyu Satın Alma</h3>
                <p>Tek seferlik lisans ödemesi ile ömür boyu sınırsız kullanım.</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step-panel animate-fade-in">
            <h2>Nasıl ilerlemek istersiniz?</h2>
            <div className="cards-grid">
              <div 
                className="option-card"
                onClick={() => setPathChoice('ready')}
              >
                <div className="icon">📦</div>
                <h3>Hazır Paket Seç</h3>
                <p>İhtiyacınıza uygun oluşturduğumuz standart paketleri inceleyin.</p>
              </div>
              <div 
                className="option-card"
                onClick={() => { setPathChoice('configure'); setStep(3); }}
              >
                <div className="icon">⚙️</div>
                <h3>Paket Yapılandır</h3>
                <p>Adım adım soruları yanıtlayarak size en uygun paketi sistem bulsun.</p>
              </div>
            </div>

            {pathChoice === 'ready' && (
              <div className="ready-packages animate-fade-in">
                <h3>Hazır Paketlerimiz ({licenseType === 'rental' ? 'Kiralama' : 'Ömür Boyu'})</h3>
                <div className="pricing-grid">
                  {packages.filter(p => licenseType === 'rental' || (licenseType === 'lifetime' && p.lifetime_available)).map(pkg => (
                    <div className="pricing-card" key={pkg.id}>
                      <h4>{pkg.name}</h4>
                      <p className="desc">{pkg.description}</p>
                      <div className="price-box">
                        <span className="amount">
                          {formatCurrency(licenseType === 'rental' ? pkg.rental_price : pkg.lifetime_price, licenseType === 'rental' ? pkg.rental_currency : pkg.lifetime_currency)}
                        </span>
                        {pkg.rental_period && licenseType === 'rental' && <span className="period"> / {pkg.rental_period === 'monthly' ? 'aylık' : 'yıllık'}</span>}
                      </div>
                      <button className="btn-action" onClick={() => handleWhatsApp(pkg.name)}>Detaylı Bilgi İste</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 - WIZARD */}
        {step === 3 && pathChoice === 'configure' && (
          <div className="step-panel step3-panel animate-fade-in">
            <div className="config-form">
              <h3>İşletme Profiliniz</h3>
              
              <div className="form-group">
                <label>Sektörünüz Nedir?</label>
                <select value={sector} onChange={e => setSector(e.target.value)}>
                  <option>Genel Perakende</option>
                  <option>Oto Servis</option>
                  <option>Kuyumculuk</option>
                  <option>Üretim/Sanayi</option>
                  <option>Hizmet</option>
                </select>
              </div>

              <div className="form-group">
                <label>E-Fatura / E-İrsaliye Kullanacak mısınız?</label>
                <div className="toggle-group">
                  <button className={`toggle-btn ${useEInvoice ? 'active' : ''}`} onClick={() => setUseEInvoice(true)}>Evet</button>
                  <button className={`toggle-btn ${!useEInvoice ? 'active' : ''}`} onClick={() => setUseEInvoice(false)}>Hayır</button>
                </div>
              </div>

              <div className="form-group">
                <label>Fiziksel Mağaza Sayısı</label>
                <input type="number" min="0" max="50" value={storeCount} onChange={e => setStoreCount(parseInt(e.target.value) || 0)} />
                {storeCount > 1 && <span className="hint-text text-indigo">+5 Şubeli Mağaza Eklentisi fiyata dahil edildi.</span>}
              </div>

              <h3>Ek Modüller</h3>
              <div className="addons-grid">
                {Object.keys(addons).map(key => (
                  <label key={key} className="checkbox-label">
                    <input type="checkbox" checked={addons[key]} onChange={() => toggleAddon(key)} />
                    {key.toUpperCase()}
                  </label>
                ))}
              </div>
            </div>

            <div className="config-summary sticky">
              <div className="summary-card">
                <h4>Hesaplanan Paket</h4>
                
                {sector === 'Kuyumculuk' ? (
                  <div className="alert-box gold">
                    <strong>Kuyumculuk Seçimi:</strong> Size özel GOLD Kuyumculuk Paketi öneriyoruz.
                  </div>
                ) : (addons.crm || addons.erp || addons.b2b) ? (
                  <div className="alert-box success">
                    <strong>Akıllı Eşleşme!</strong> İhtiyaçlarınız doğrultusunda en avantajlı paket seçildi.
                  </div>
                ) : null}

                <h3 className="pkg-name text-gradient">{selectedBasePackage?.name}</h3>
                <p className="pkg-desc">{selectedBasePackage?.description}</p>
                
                {appliedAddons.length > 0 && (
                  <div className="applied-addons">
                    <strong>Eklenen Modüller:</strong>
                    <ul>
                      {appliedAddons.map(a => <li key={a.id}>+ {a.name}</li>)}
                    </ul>
                  </div>
                )}

                <div className="total-price-box">
                  <div className="label">Toplam Tutar ({licenseType === 'rental' ? 'Abonelik' : 'Ömür Boyu'})</div>
                  
                  {isCustomOffer ? (
                    <div className="amount highlight">ÖZEL TEKLİF</div>
                  ) : (
                    <>
                      <div className="amount highlight">
                        {formatCurrency(totalPrice, currency)}
                        {currency === 'USD' && <span className="try-eq"><br/>(~ {formatCurrency(tryEquivalent, 'TRY')})</span>}
                      </div>
                      <div className="vat-note">+ %20 KDV</div>
                    </>
                  )}
                </div>

                <button className="btn-action primary pulse" onClick={() => handleWhatsApp(selectedBasePackage?.name)}>
                  WhatsApp ile Teklif Al
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

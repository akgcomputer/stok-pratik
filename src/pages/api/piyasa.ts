import type { APIRoute } from 'astro';

// 60 saniyelik bellek içi önbellek (In-Memory Cache)
let cachedData: any = null;
let lastCacheTime = 0;
const CACHE_DURATION_MS = 60 * 1000; // 60 saniye

export const GET: APIRoute = async () => {
  const now = Date.now();

  if (cachedData && (now - lastCacheTime < CACHE_DURATION_MS)) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
        'X-Cache': 'HIT',
      },
    });
  }

  // Varsayılan / Fallback Değerler
  let usdBuying = 34.25;
  let usdSelling = 34.32;
  let eurBuying = 37.42;
  let eurSelling = 37.50;
  let gbpBuying = 44.80;
  let gbpSelling = 44.92;
  let btcUsd = 85200;
  let btcTry = 4180000;
  let ethUsd = 2695;
  let usdtTry = 34.38;

  // 1. TCMB Kurlarını Çek
  try {
    const tcmbRes = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      signal: AbortSignal.timeout(4000),
    });

    if (tcmbRes.ok) {
      const xml = await tcmbRes.text();

      const parseTCMB = (kod: string) => {
        const regex = new RegExp(`<Currency[^>]*Kod="${kod}"[\\s\\S]*?<\\/Currency>`);
        const block = xml.match(regex)?.[0];
        if (!block) return null;
        const buy = block.match(/<ForexBuying>([0-9.]+)<\/ForexBuying>/)?.[1];
        const sell = block.match(/<ForexSelling>([0-9.]+)<\/ForexSelling>/)?.[1];
        return {
          buy: buy ? parseFloat(buy) : null,
          sell: sell ? parseFloat(sell) : null,
        };
      };

      const usd = parseTCMB('USD');
      if (usd?.buy && usd?.sell) {
        usdBuying = usd.buy;
        usdSelling = usd.sell;
      }

      const eur = parseTCMB('EUR');
      if (eur?.buy && eur?.sell) {
        eurBuying = eur.buy;
        eurSelling = eur.sell;
      }

      const gbp = parseTCMB('GBP');
      if (gbp?.buy && gbp?.sell) {
        gbpBuying = gbp.buy;
        gbpSelling = gbp.sell;
      }
    }
  } catch (err) {
    console.warn('TCMB XML fetch fallback:', err);
  }

  // 2. Binance Public API (Kripto & USDT/TRY)
  try {
    const binanceRes = await fetch(
      'https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCTRY%22,%22BTCUSDT%22,%22ETHUSDT%22,%22USDTTRY%22%5D',
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(4000),
      }
    );

    if (binanceRes.ok) {
      const tickers: Array<{ symbol: string; price: string }> = await binanceRes.json();
      for (const t of tickers) {
        const price = parseFloat(t.price);
        if (t.symbol === 'BTCUSDT' && !isNaN(price)) btcUsd = price;
        if (t.symbol === 'BTCTRY' && !isNaN(price)) btcTry = price;
        if (t.symbol === 'ETHUSDT' && !isNaN(price)) ethUsd = price;
        if (t.symbol === 'USDTTRY' && !isNaN(price)) usdtTry = price;
      }
    }
  } catch (err) {
    console.warn('Binance fetch fallback:', err);
  }

  // 3. Altın ve Kıymetli Madenler (Dinamik Formül)
  const onsGoldUsd = 2742.80; // Uluslararası Ons Altın Referansı ($)
  const onsSilverUsd = 32.40; // Ons Gümüş ($)
  const onsGramRatio = 31.1034768; // 1 Troy Ons = 31.1034768 Gram

  // Has Gram Altın = (Ons x USD Satış) / 31.1034768
  const gramAltin = Math.round(((onsGoldUsd * usdSelling) / onsGramRatio) * 100) / 100;
  // Çeyrek Altın = Gram Altın x 1.63
  const ceyrekAltin = Math.round(gramAltin * 1.63);
  const yarimAltin = ceyrekAltin * 2;
  const tamAltin = ceyrekAltin * 4;
  const ataAltin = Math.round(gramAltin * 6.60);
  const gumusGram = Math.round(((onsSilverUsd * usdSelling) / onsGramRatio) * 100) / 100;

  // 4. Sanayi Emtiaları & Enerji
  const bakirTonUsd = 9780; // $/Ton
  const bakirKgTL = Math.round(((bakirTonUsd / 1000) * usdSelling) * 100) / 100;

  const aluminyumTonUsd = 2620; // $/Ton
  const aluminyumKgTL = Math.round(((aluminyumTonUsd / 1000) * usdSelling) * 100) / 100;

  const brentPetrolUsd = 77.85; // $/Varil
  const motorinTL = 43.85; // ₺/Litre (TR Ortalaması)
  const benzinTL = 42.90; // ₺/Litre (TR Ortalaması)

  // 5. Parite
  const eurUsd = Math.round((eurSelling / usdSelling) * 10000) / 10000;

  const responsePayload = {
    timestamp: new Date().toISOString(),
    disclaimer: '*Piyasa Radarında yer alan rakamlar bilgilendirme amaçlıdır, alım satım sırasında farklılık gösterebilir.',
    rates: {
      usd: usdSelling,
      eur: eurSelling,
      gbp: gbpSelling,
      eurUsd: eurUsd,
      usdt: usdtTry,
      onsAltin: onsGoldUsd,
      gramAltin: gramAltin,
      ceyrekAltin: ceyrekAltin,
      gumusGram: gumusGram,
      btcUsd: btcUsd,
      btcTry: btcTry,
      ethUsd: ethUsd,
      bakirKgTL: bakirKgTL,
      aluminyumKgTL: aluminyumKgTL,
      motorinTL: motorinTL,
      benzinTL: benzinTL,
    },
    sections: {
      doviz: [
        { code: 'USD/TRY', name: 'Amerikan Doları', buy: usdBuying.toFixed(4), sell: usdSelling.toFixed(4), change: '+0.15%', isUp: true, unit: '₺' },
        { code: 'EUR/TRY', name: 'Euro', buy: eurBuying.toFixed(4), sell: eurSelling.toFixed(4), change: '-0.08%', isUp: false, unit: '₺' },
        { code: 'GBP/TRY', name: 'İngiliz Sterlini', buy: gbpBuying.toFixed(4), sell: gbpSelling.toFixed(4), change: '+0.22%', isUp: true, unit: '₺' },
        { code: 'EUR/USD', name: 'Euro / Dolar Paritesi', buy: (eurUsd * 0.9998).toFixed(4), sell: eurUsd.toFixed(4), change: '-0.12%', isUp: false, unit: '$' },
        { code: 'USDT/TRY', name: 'Serbest Piyasa / Nakit USDT', buy: (usdtTry * 0.998).toFixed(2), sell: usdtTry.toFixed(2), change: '+0.18%', isUp: true, unit: '₺' },
      ],
      altin: [
        { code: 'ONS', name: 'Uluslararası Ons Altın', buy: (onsGoldUsd - 1).toFixed(2), sell: onsGoldUsd.toFixed(2), change: '+0.45%', isUp: true, unit: '$' },
        { code: 'GRAM_HAS', name: 'Has Gram Altın (24 Ayar)', buy: (gramAltin * 0.996).toFixed(2), sell: gramAltin.toFixed(2), change: '+0.52%', isUp: true, unit: '₺' },
        { code: 'CEYREK', name: 'Çeyrek Altın', buy: (ceyrekAltin * 0.985).toFixed(0), sell: ceyrekAltin.toFixed(0), change: '+0.52%', isUp: true, unit: '₺' },
        { code: 'YARIM', name: 'Yarım Altın', buy: (yarimAltin * 0.985).toFixed(0), sell: yarimAltin.toFixed(0), change: '+0.52%', isUp: true, unit: '₺' },
        { code: 'TAM', name: 'Tam Ziynet Altın', buy: (tamAltin * 0.985).toFixed(0), sell: tamAltin.toFixed(0), change: '+0.52%', isUp: true, unit: '₺' },
        { code: 'ATA', name: 'Ata Altın (Cumhuriyet)', buy: (ataAltin * 0.985).toFixed(0), sell: ataAltin.toFixed(0), change: '+0.52%', isUp: true, unit: '₺' },
        { code: 'GUMUS_GRAM', name: 'Gümüş Gram (Külçe)', buy: (gumusGram * 0.98).toFixed(2), sell: gumusGram.toFixed(2), change: '-0.30%', isUp: false, unit: '₺' },
      ],
      emtia: [
        { code: 'LME_BAKIR', name: 'LME Bakır (Katot)', priceUSD: `$${bakirTonUsd.toLocaleString('en-US')}/Ton`, priceTL: `${bakirKgTL.toFixed(2)} ₺/Kg`, change: '+0.85%', isUp: true },
        { code: 'LME_ALUMINYUM', name: 'LME Alüminyum', priceUSD: `$${aluminyumTonUsd.toLocaleString('en-US')}/Ton`, priceTL: `${aluminyumKgTL.toFixed(2)} ₺/Kg`, change: '-0.40%', isUp: false },
        { code: 'BRENT', name: 'Brent Petrol', priceUSD: `$${brentPetrolUsd.toFixed(2)}/Varil`, priceTL: `${(brentPetrolUsd * usdSelling).toFixed(2)} ₺/Varil`, change: '-1.15%', isUp: false },
        { code: 'MOTORIN', name: 'Motorin (Pompa Ort.)', priceUSD: `$${(motorinTL / usdSelling).toFixed(2)}/Lt`, priceTL: `${motorinTL.toFixed(2)} ₺/Lt`, change: '0.00%', isUp: true },
        { code: 'BENZIN', name: 'Kurşunsuz Benzin 95', priceUSD: `$${(benzinTL / usdSelling).toFixed(2)}/Lt`, priceTL: `${benzinTL.toFixed(2)} ₺/Lt`, change: '0.00%', isUp: true },
      ],
      borsaFaiz: [
        { code: 'XU100', name: 'BIST 100 Endeksi', value: '9,145.20', change: '+1.25%', isUp: true, unit: 'Puan' },
        { code: 'XUSIN', name: 'BIST Sınai (XUSIN)', value: '13,480.50', change: '+0.95%', isUp: true, unit: 'Puan' },
        { code: 'FAIZ', name: 'TCMB Politika Faizi', value: '%50.00', change: 'Sabit', isUp: true, unit: 'Yıllık' },
      ],
      kripto: [
        { code: 'BTC/USDT', name: 'Bitcoin (USD)', buy: (btcUsd - 5).toLocaleString('en-US'), sell: btcUsd.toLocaleString('en-US'), change: '+2.15%', isUp: true, unit: '$' },
        { code: 'BTC/TRY', name: 'Bitcoin (TL)', buy: (btcTry * 0.999).toLocaleString('tr-TR', { maximumFractionDigits: 0 }), sell: btcTry.toLocaleString('tr-TR', { maximumFractionDigits: 0 }), change: '+2.30%', isUp: true, unit: '₺' },
        { code: 'ETH/USDT', name: 'Ethereum (USD)', buy: (ethUsd - 1).toLocaleString('en-US'), sell: ethUsd.toLocaleString('en-US'), change: '+1.80%', isUp: true, unit: '$' },
        { code: 'USDT/TRY', name: 'Tether (USDT Nakit)', buy: (usdtTry * 0.998).toFixed(2), sell: usdtTry.toFixed(2), change: '+0.18%', isUp: true, unit: '₺' },
      ],
    },
  };

  cachedData = responsePayload;
  lastCacheTime = now;

  return new Response(JSON.stringify(responsePayload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
      'X-Cache': 'MISS',
    },
  });
};

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

  // Önce Stok Pratik Canlı Worker API'sinden çekmeyi dene (Harem/Kapalıçarşı & Binance entegre)
  try {
    const workerRes = await fetch('https://stok-pratik-api.akgcomputer.workers.dev/api/piyasa', {
      headers: { 'User-Agent': 'StokPratik-Web/1.0' },
      signal: AbortSignal.timeout(3500),
    });

    if (workerRes.ok) {
      const data = await workerRes.json();
      if (data && data.success && data.altinMaden && data.doviz) {
        // Hesaplayıcılar için rates objesini de ekleyip zenginleştirelim
        const rates = extractRates(data);
        const enrichedPayload = {
          ...data,
          rates,
          timestamp: data.updated_at || new Date().toISOString()
        };

        cachedData = enrichedPayload;
        lastCacheTime = now;

        return new Response(JSON.stringify(enrichedPayload), {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=60, s-maxage=60',
            'X-Cache': 'ORIGIN-WORKER',
          },
        });
      }
    }
  } catch (err) {
    console.warn('Worker API fetch fallback:', err);
  }

  // FALLBACK: 3 Katmanlı Hibrit Veri Motoru (Truncgil v4 + Binance + TCMB)
  try {
    // 1. Serbest Piyasa & Kapalıçarşı (finans.truncgil.com v4)
    let marketLive: any = null;
    try {
      const liveRes = await fetch('https://finans.truncgil.com/v4/today.json', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: AbortSignal.timeout(4000),
      });
      if (liveRes.ok) {
        marketLive = await liveRes.json();
      }
    } catch (e) {
      console.warn('Truncgil v4 fetch hatası:', e);
    }

    // 2. Kripto Verileri (Binance Public API)
    let btcTry = 4150000, btcUsd = 85000, ethUsd = 2650, usdtTry = 34.50;
    try {
      const cryptoRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCTRY%22,%22BTCUSDT%22,%22ETHUSDT%22,%22USDTTRY%22%5D', {
        signal: AbortSignal.timeout(4000),
      });
      if (cryptoRes.ok) {
        const cryptoData: any = await cryptoRes.json();
        for (const item of cryptoData) {
          if (item.symbol === 'BTCTRY') btcTry = parseFloat(item.price);
          if (item.symbol === 'BTCUSDT') btcUsd = parseFloat(item.price);
          if (item.symbol === 'ETHUSDT') ethUsd = parseFloat(item.price);
          if (item.symbol === 'USDTTRY') usdtTry = parseFloat(item.price);
        }
      }
    } catch (e) {
      console.warn('Binance API fetch hatası:', e);
    }

    // 3. TCMB Gösterge Kurları
    let usdBuy = 34.25, usdSell = 34.35;
    let eurBuy = 37.50, eurSell = 37.65;
    let gbpBuy = 44.80, gbpSell = 45.10;
    try {
      const tcmbRes = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: AbortSignal.timeout(4000),
      });
      if (tcmbRes.ok) {
        const xmlText = await tcmbRes.text();
        const getCurrency = (code: string) => {
          const regex = new RegExp(`<Currency[^>]*CurrencyCode="${code}"[\\s\\S]*?<ForexBuying>([0-9.,]+)<\\/ForexBuying>[\\s\\S]*?<ForexSelling>([0-9.,]+)<\\/ForexSelling>`, 'i');
          const match = xmlText.match(regex);
          if (match) {
            return {
              buying: parseFloat(match[1].replace(',', '.')),
              selling: parseFloat(match[2].replace(',', '.'))
            };
          }
          return null;
        };
        const usd = getCurrency('USD');
        if (usd) { usdBuy = usd.buying; usdSell = usd.selling; }
        const eur = getCurrency('EUR');
        if (eur) { eurBuy = eur.buying; eurSell = eur.selling; }
        const gbp = getCurrency('GBP');
        if (gbp) { gbpBuy = gbp.buying; gbpSell = gbp.selling; }
      }
    } catch (e) {
      console.warn('TCMB XML fetch hatası:', e);
    }

    const spUsdBuy = marketLive?.USD?.Buying || usdBuy;
    const spUsdSell = marketLive?.USD?.Selling || usdSell;
    const spEurBuy = marketLive?.EUR?.Buying || eurBuy;
    const spEurSell = marketLive?.EUR?.Selling || eurSell;
    const spGbpBuy = marketLive?.GBP?.Buying || gbpBuy;
    const spGbpSell = marketLive?.GBP?.Selling || gbpSell;

    // ALTIN VE KIYMETLİ MADEN HESAPLAMALARI (v4 JSON Anahtarları - Kapalıçarşı / Harem Altın)
    const hasGoldBuy = marketLive?.HAS?.Buying || marketLive?.GRA?.Buying || 3050;
    const hasGoldSell = marketLive?.HAS?.Selling || marketLive?.GRA?.Selling || 3090;
    const gramGoldBuy = marketLive?.GRA?.Buying || hasGoldBuy;
    const gramGoldSell = marketLive?.GRA?.Selling || hasGoldSell;
    const ceyrekGoldBuy = marketLive?.CEYREKALTIN?.Buying || Math.round(gramGoldSell * 1.63);
    const ceyrekGoldSell = marketLive?.CEYREKALTIN?.Selling || Math.round(gramGoldSell * 1.66);
    const yarimGoldBuy = marketLive?.YARIMALTIN?.Buying || Math.round(ceyrekGoldBuy * 2);
    const yarimGoldSell = marketLive?.YARIMALTIN?.Selling || Math.round(ceyrekGoldSell * 2);
    const tamGoldBuy = marketLive?.TAMALTIN?.Buying || Math.round(ceyrekGoldBuy * 4);
    const tamGoldSell = marketLive?.TAMALTIN?.Selling || Math.round(ceyrekGoldSell * 4);
    const ataGoldBuy = marketLive?.ATAALTIN?.Buying || Math.round(gramGoldSell * 6.7);
    const ataGoldSell = marketLive?.ATAALTIN?.Selling || Math.round(gramGoldSell * 6.8);
    const bilezik22Buy = marketLive?.YIA?.Buying || Math.round(gramGoldBuy * 0.916);
    const bilezik22Sell = marketLive?.YIA?.Selling || Math.round(gramGoldSell * 0.916);
    const gumusBuy = marketLive?.GUMUS?.Buying || 36.5;
    const gumusSell = marketLive?.GUMUS?.Selling || 37.8;
    const onsGoldUsd = marketLive?.ONS?.Selling || 2655;

    const doviz = [
      { id: 'usd', name: 'ABD Doları (Kapalıçarşı)', code: 'USD/TRY', buying: spUsdBuy, selling: spUsdSell, change: +(marketLive?.USD?.Change || 0.15), trend: 'up' },
      { id: 'eur', name: 'Euro (Kapalıçarşı)', code: 'EUR/TRY', buying: spEurBuy, selling: spEurSell, change: +(marketLive?.EUR?.Change || -0.20), trend: 'down' },
      { id: 'gbp', name: 'İngiliz Sterlini', code: 'GBP/TRY', buying: spGbpBuy, selling: spGbpSell, change: +(marketLive?.GBP?.Change || 0.10), trend: 'up' },
      { id: 'eurusd', name: 'EUR / USD Parite', code: 'EUR/USD', buying: +(spEurSell / (spUsdSell || 1)).toFixed(4), selling: +(spEurSell / (spUsdSell || 1)).toFixed(4), change: -0.05, trend: 'down' },
      { id: 'tcmb_usd', name: 'TCMB Resmi Dolar', code: 'TCMB/USD', buying: usdBuy, selling: usdSell, change: 0.05, trend: 'up' }
    ];

    const altinMaden = [
      { id: 'gram_altin', name: 'Gram Altın (Kapalıçarşı / Harem)', buying: gramGoldBuy, selling: gramGoldSell, price: gramGoldSell, unit: '₺', change: +(marketLive?.GRA?.Change || 1.1), trend: 'up' },
      { id: 'has_altin', name: 'Has Altın (Külçe .995)', buying: hasGoldBuy, selling: hasGoldSell, price: hasGoldSell, unit: '₺', change: +(marketLive?.HAS?.Change || 1.1), trend: 'up' },
      { id: 'ceyrek_altin', name: 'Çeyrek Altın (Yeni)', buying: ceyrekGoldBuy, selling: ceyrekGoldSell, price: ceyrekGoldSell, unit: '₺', change: +(marketLive?.CEYREKALTIN?.Change || 1.1), trend: 'up' },
      { id: 'yarim_altin', name: 'Yarım Altın', buying: yarimGoldBuy, selling: yarimGoldSell, price: yarimGoldSell, unit: '₺', change: +(marketLive?.YARIMALTIN?.Change || 1.1), trend: 'up' },
      { id: 'tam_altin', name: 'Tam Altın', buying: tamGoldBuy, selling: tamGoldSell, price: tamGoldSell, unit: '₺', change: +(marketLive?.TAMALTIN?.Change || 1.1), trend: 'up' },
      { id: 'ata_altin', name: 'Ata / Cumhuriyet Altını', buying: ataGoldBuy, selling: ataGoldSell, price: ataGoldSell, unit: '₺', change: +(marketLive?.ATAALTIN?.Change || 1.1), trend: 'up' },
      { id: 'bilezik_22', name: '22 Ayar Bilezik (Gram)', buying: bilezik22Buy, selling: bilezik22Sell, price: bilezik22Sell, unit: '₺', change: +(marketLive?.YIA?.Change || 1.1), trend: 'up' },
      { id: 'ons_altin', name: 'Ons Altın', price: onsGoldUsd, unit: '$', change: +(marketLive?.ONS?.Change || 0.5), trend: 'up' },
      { id: 'gumus_gram', name: 'Gümüş (Gram)', buying: gumusBuy, selling: gumusSell, price: gumusSell, unit: '₺', change: +(marketLive?.GUMUS?.Change || 2.0), trend: 'up' }
    ];

    const emtia = [
      { id: 'brent', name: 'Brent Petrol', symbol: 'BRENT', price: marketLive?.BRENT?.Selling || 78.20, unit: '$/Varil', change: +(marketLive?.BRENT?.Change || 0.42), trend: 'up' },
      { id: 'copper', name: 'LME Bakır', symbol: 'HG', price: 9820.00, unit: '$/Ton', change: +1.15, trend: 'up' },
      { id: 'aluminum', name: 'LME Alüminyum', symbol: 'AL', price: 2640.00, unit: '$/Ton', change: -0.35, trend: 'down' },
      { id: 'diesel', name: 'Motorin (Pompa Ort.)', symbol: 'DIESEL', price: 44.90, unit: '₺/Litre', change: 0.00, trend: 'stable' },
      { id: 'gasoline', name: 'Benzin (Pompa Ort.)', symbol: 'GAS', price: 43.95, unit: '₺/Litre', change: 0.00, trend: 'stable' }
    ];

    const borsa = [
      { id: 'bist100', name: 'BIST 100', code: 'XU100', price: marketLive?.XU100?.Selling || 9280.40, change: +(marketLive?.XU100?.Change || 0.45), trend: 'up' },
      { id: 'bist_sanayi', name: 'BIST Sınai', code: 'XUSIN', price: 13450.20, change: +1.80, trend: 'up' },
      { id: 'faiz_politika', name: 'TCMB Politika Faizi', code: 'FAİZ', price: 50.0, unit: '%', change: 0.00, trend: 'stable' }
    ];

    const kripto = [
      { id: 'btc_try', name: 'Bitcoin', code: 'BTC/TRY', price: btcTry || 2450000, change: +2.10, trend: 'up' },
      { id: 'btc_usd', name: 'Bitcoin ($)', code: 'BTC/USDT', price: btcUsd || 67800, change: +2.05, trend: 'up' },
      { id: 'eth_usd', name: 'Ethereum ($)', code: 'ETH/USDT', price: ethUsd || 2540, change: +1.30, trend: 'up' },
      { id: 'usdt_try', name: 'Tether (Serbest P.)', code: 'USDT/TRY', price: usdtTry || spUsdSell, change: +0.10, trend: 'up' }
    ];

    const payload: any = {
      success: true,
      updated_at: new Date().toISOString(),
      timestamp: new Date().toISOString(),
      doviz,
      altinMaden,
      emtia,
      borsa,
      kripto,
      disclaimer: "*Piyasa Radarında yer alan altın ve döviz rakamları Serbest Piyasa (Kapalıçarşı / Harem Altın) anlık verileridir."
    };

    payload.rates = extractRates(payload);

    cachedData = payload;
    lastCacheTime = now;

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
        'X-Cache': 'MISS',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: 'Piyasa verileri alınamadı: ' + error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }
};

// Yardımcı fonksiyon: Hesaplayıcılar ve Ticker için hızlı fiyat haritası
function extractRates(data: any) {
  const findAltin = (id: string) => data.altinMaden?.find((a: any) => a.id === id)?.selling || data.altinMaden?.find((a: any) => a.id === id)?.price || 0;
  const findDoviz = (id: string) => data.doviz?.find((d: any) => d.id === id)?.selling || 0;
  const findKripto = (id: string) => data.kripto?.find((k: any) => k.id === id)?.price || 0;
  const findEmtia = (id: string) => data.emtia?.find((e: any) => e.id === id)?.price || 0;

  const usdSell = findDoviz('usd') || 49.77;
  const copperTon = findEmtia('copper') || 9820;
  const aluminumTon = findEmtia('aluminum') || 2640;

  return {
    usd: usdSell,
    eur: findDoviz('eur') || 55.80,
    gbp: findDoviz('gbp') || 66.60,
    eurUsd: findDoviz('eurusd') || 1.12,
    usdt: findKripto('usdt_try') || usdSell,
    hasAltin: findAltin('has_altin') || 6352,
    gramAltin: findAltin('gram_altin') || 6384,
    ceyrekAltin: findAltin('ceyrek_altin') || 10560,
    yarimAltin: findAltin('yarim_altin') || 21120,
    tamAltin: findAltin('tam_altin') || 42112,
    ataAltin: findAltin('ata_altin') || 43662,
    bilezik22: findAltin('bilezik_22') || 5890,
    onsAltin: findAltin('ons_altin') || 2655,
    gumusGram: findAltin('gumus_gram') || 86.16,
    btcTry: findKripto('btc_try') || 2450000,
    btcUsd: findKripto('btc_usd') || 67800,
    ethUsd: findKripto('eth_usd') || 2540,
    bakirTonUsd: copperTon,
    bakirKgTL: Math.round(((copperTon / 1000) * usdSell) * 100) / 100,
    aluminyumTonUsd: aluminumTon,
    aluminyumKgTL: Math.round(((aluminumTon / 1000) * usdSell) * 100) / 100,
    brentPetrolUsd: findEmtia('brent') || 78.20,
    motorinTL: findEmtia('diesel') || 44.90,
    benzinTL: findEmtia('gasoline') || 43.95,
  };
}

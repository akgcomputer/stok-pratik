const fs = require('fs');
const path = require('path');

const SOURCE_BASE = path.join(__dirname, 'tek-sayfa');
const TARGET_DIR = path.join(__dirname, 'src', 'pages', 'ekosistem');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const PORTALS = [
  {
    folder: 'stokpratik_erp_e_ticaret_ekosistemi_11_departman_portal',
    targetFile: 'index.astro',
    url: '/ekosistem',
    fullUrl: 'https://stokpratik.com.tr/ekosistem',
    title: 'StokPratik ERP & E-Ticaret Ekosistemi | 11 Departman Tek Yazılımda',
    description: 'Ön muhasebe, B2B bayi, açık bankacılık, akıllı WMS depo, şantiye, QR-PDKS ve 50+ pazaryeri entegrasyonu tek çatıda. 45 gün kredi kartsız ücretsiz deneyin.',
    waText: 'Merhaba, StokPratik ERP & E-Ticaret Ekosistemi hakkında detaylı bilgi ve demo talep ediyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4iv-vI5AXqVNcNKj_b8E8yhq2kggHKzo1rK6GXrdJq_dRJp5VyNGWsU1h6UHNG7swSXfFzz8Zdjt6OCCFM7qenpFptxi5dNQuej8YvtI6WE1nfTmFt0G1fXOEBmFJOzrrNXseUdyEy7bEDBVb2os29dAfp7HWpl2vMAVR0H1xsTmPwiAPEs7Ka-S0I7tbOXWv4IJ16RTv9JMFfvJR5ZOfB9VyNk4bmm-x-U1y4Vru'
  },
  {
    folder: 'carinet_b2b_m_teri_bayi_self_servis_portal',
    targetFile: 'carinet.astro',
    url: '/ekosistem/carinet',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/carinet',
    title: 'CariNet B2B Müşteri & Bayi Portalı | StokPratik Ekosistemi',
    description: 'Bayileriniz 7/24 cari ekstresini incelesin, bakiye mutabakatı yapsın, online 3D Secure kredi kartı ile ödeme yapsın ve B2B sipariş versin.',
    waText: 'Merhaba, CariNet B2B Müşteri & Bayi Portalı hakkında detaylı bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'crmpratik_saha_sat_whatsapp_online_teklif_f_rsat_boru_hatt_portal',
    targetFile: 'crmpratik.astro',
    url: '/ekosistem/crmpratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/crmpratik',
    title: 'CRMPratik Saha Satış & Müşteri Portalı | StokPratik Ekosistemi',
    description: 'Saha satış ekibiniz için WhatsApp entegreli online teklif sunumu, müşteri görüşme takibi, satış hunisi (pipeline) ve anlık sipariş kapatma portalı.',
    waText: 'Merhaba, CRMPratik Saha Satış ve Müşteri Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg6Ir1dh98m1-jeBfUW9EBZZ3xt1bTzeXndmj-hGU3YtmGR7qpDU9f7Srtej99dVHjWDw5BGyddsgu__Izefkmu8ilfTVkwtuIgYlKXeoT-qR_Ws27UtMRQh3lK72VTL6G2C7vsn2qaTbLcmrAl3r73LGXXiCnfqSfOGNo6Hul5R8eheGKisOiZVQdKd3NWw6IEjlWhLFglrPneuTG1m1_UY0j8hpkannlVL-UWk_A'
  },
  {
    folder: 'e_ticaretpratik_omnichannel_pazaryeri_e_ticaret_operasyon_y_netim_ss',
    targetFile: 'e-ticaretpratik.astro',
    url: '/ekosistem/e-ticaretpratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/e-ticaretpratik',
    title: 'e-TicaretPratik Omnichannel & Pazaryeri Portalı | StokPratik Ekosistemi',
    description: 'Trendyol, Hepsiburada, Amazon ve 50+ pazaryeri ile web sitenizi tek merkezden yönetin. Anlık stok, otomatik fatura ve kargo barkodu senkronizasyonu.',
    waText: 'Merhaba, e-TicaretPratik Pazaryeri ve E-Ticaret Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnHn6B41Jet4uXz55ZlzuI3LnWbNPWZs20Rn1bJjPydgcNIgJgzeCB8tvPpE5jLbWsmfglvmBE73exwhUsDTrBeHjTp_OLsuVuf8HeU4pT5RD_59zCpRRNWYxhpHkFR57a9J_SRBdrT-UG3Q4rnwUFkBYMOK3FiQoLxvFpGIUI0HsdRREtTKyv4jN_3F8GD05lNqjaNO5njpi6fsxkGEH2_J6R6EJuA3R-4MLafyuV'
  },
  {
    folder: 'finanspratik_a_k_bankac_l_k_tahsilat_portal',
    targetFile: 'finanspratik.astro',
    url: '/ekosistem/finanspratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/finanspratik',
    title: 'FinansPratik Açık Bankacılık & Tahsilat Portalı | StokPratik Ekosistemi',
    description: '30+ banka hesabı tek ekranda. Canlı hesap hareketleri, otomatik cari fiş işleme, sanal POS ve linkle 3D Secure tahsilat altyapısı.',
    waText: 'Merhaba, FinansPratik Açık Bankacılık ve Tahsilat Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'lojistikpratik_wms_ak_ll_depo_raf_y_netimi_fiyats_z_sevkiyat_portal',
    targetFile: 'lojistikpratik.astro',
    url: '/ekosistem/lojistikpratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/lojistikpratik',
    title: 'LojistikPratik WMS Akıllı Depo Portalı | StokPratik Ekosistemi',
    description: 'Fiyatsız kör depo sevkiyatı, akıllı adresli raf yönetimi, el terminali ve barkodlu toplama ile sıfır hatalı depo operasyonu.',
    waText: 'Merhaba, LojistikPratik WMS Akıllı Depo Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'mutabakatpratik_cari_bakiye_ba_bs_dijital_mutabakat_portal',
    targetFile: 'mutabakatpratik.astro',
    url: '/ekosistem/mutabakatpratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/mutabakatpratik',
    title: 'MutabakatPratik BA/BS & Cari Mutabakat Portalı | StokPratik Ekosistemi',
    description: 'Tek tıkla yüzlerce cariye WhatsApp ve SMS ile interaktif mutabakat mektubu gönderin. Otomatik onay, itiraz ve ekstre karşılaştırma.',
    waText: 'Merhaba, MutabakatPratik Dijital Mutabakat Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'm_avirpratik_smmm_mali_m_avir_m_kellef_portal',
    targetFile: 'musavirpratik.astro',
    url: '/ekosistem/musavirpratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/musavirpratik',
    title: 'MüşavirPratik SMMM & Mali Müşavir Portalı | StokPratik Ekosistemi',
    description: 'Mali müşavir ve mükellef arasında evrak karmaşasına son. Z-raporları, banka ekstreleri ve e-faturalar tek tıkla Luca, Zirve ve GİB formatında hazır.',
    waText: 'Merhaba, MüşavirPratik SMMM & Mali Müşavir Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'personelpratik_dinamik_qr_pdks_sgk_puantaj_portal',
    targetFile: 'personelpratik.astro',
    url: '/ekosistem/personelpratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/personelpratik',
    title: 'PersonelPratik Dinamik QR PDKS Portalı | StokPratik Ekosistemi',
    description: 'Cihaz masrafı olmadan konum doğrulamalı dinamik QR kodla personel giriş-çıkış takibi, izin yönetimi ve tek tıkla SGK uyumlu puantaj cetveli.',
    waText: 'Merhaba, PersonelPratik Dinamik QR PDKS Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'projepratik_antiye_i_n_aat_ta_eron_hakedi_y_netim_portal',
    targetFile: 'projepratik.astro',
    url: '/ekosistem/projepratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/projepratik',
    title: 'ProjePratik Şantiye & Taşeron Hakediş Portalı | StokPratik Ekosistemi',
    description: 'İnşaat ve taahhüt projelerinizde taşeron sözleşmeleri, metraj girişleri, hakediş kesintileri ve şantiye malzeme stoklarını canlı takip edin.',
    waText: 'Merhaba, ProjePratik Şantiye & Taşeron Hakediş Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'retimpratik_at_lye_r_n_re_etesi_bom_i_malat_y_netim_portal',
    targetFile: 'uretimpratik.astro',
    url: '/ekosistem/uretimpratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/uretimpratik',
    title: 'ÜretimPratik BOM Ürün Reçetesi & İmalat Portalı | StokPratik Ekosistemi',
    description: 'Çok seviyeli ürün ağacı (BOM), fason iş takibi, iş istasyonları, hammadde sarfiyatı ve net birim maliyet hesaplama motoru.',
    waText: 'Merhaba, ÜretimPratik Üretim ve BOM İmalat Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  },
  {
    folder: 'servispratik_barkodlu_cihaz_kabul_whatsapp_canl_takip_garanti_portal',
    targetFile: 'servispratik.astro',
    url: '/ekosistem/servispratik',
    fullUrl: 'https://stokpratik.com.tr/ekosistem/servispratik',
    title: 'ServisPratik Barkodlu Teknik Servis Portalı | StokPratik Ekosistemi',
    description: 'Cihaz kabul, barkodlu servis fişi, WhatsApp üzerinden canlı durum sorgulama, yedek parça ve garanti takip portalı.',
    waText: 'Merhaba, ServisPratik Barkodlu Teknik Servis Portalı hakkında bilgi almak istiyorum.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRPclUgpTX-_PXtrOjndC2Cvk8Gq2wsHXQQSlAzt7lJBpxmUI7rPK2thEXYlri_uoIfF3y4w1R8jb2wUgjvW2ziR--7rVsrT6sFS9y7qse9P0FluS6Y6KQudffk_tQ9b0RghVXu-MH74g1NO9doR-4ZlLE5EVWm3H0PZpINMRh3abzWEcVH9xYT4JD7eHBW6wAqGeqYM1D0CDMilN-ag3PIAZzlXLbUj2HudCzn5ei'
  }
];

const LINK_MAPPINGS = {
  'musavir-portali': '/ekosistem/musavirpratik',
  'b2b-cari-portali': '/ekosistem/carinet',
  'finans-portali': '/ekosistem/finanspratik',
  'mutabakat-portali': '/ekosistem/mutabakatpratik',
  'e-ticaret-portali': '/ekosistem/e-ticaretpratik',
  'wms-depo-portali': '/ekosistem/lojistikpratik',
  'uretim-portali': '/ekosistem/uretimpratik',
  'crm-portali': '/ekosistem/crmpratik',
  'pdks-portali': '/ekosistem/personelpratik',
  'servis-portali': '/ekosistem/servispratik',
  'santiye-portali': '/ekosistem/projepratik'
};

const WA_BASE = 'https://wa.me/905412465429';
const REGISTER_URL = 'https://erp-eticaret.stokpratik.com.tr/';

for (const portal of PORTALS) {
  const htmlPath = path.join(SOURCE_BASE, portal.folder, 'code.html');
  if (!fs.existsSync(htmlPath)) {
    console.error(`Bulunamadı: ${htmlPath}`);
    continue;
  }

  let html = fs.readFileSync(htmlPath, 'utf8');

  // 1. Sabit piksel sınırlamalarını temizle
  html = html.replace(/<html[^>]*style="[^"]*"[^>]*>/i, '<html lang="tr">');
  html = html.replace(/style="width:\s*\d+px;\s*height:\s*\d+px;\s*overflow:\s*hidden;\s*position:\s*relative;"/gi, '');
  html = html.replace(/style="width:\s*1280px;[^"]*"/gi, '');

  // 2. SEO Title & Meta Etiketleri
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${portal.title}</title>`);
  
  const metaTags = `
    <meta name="description" content="${portal.description}" />
    <link rel="canonical" href="${portal.fullUrl}" />
    <meta property="og:title" content="${portal.title}" />
    <meta property="og:description" content="${portal.description}" />
    <meta property="og:url" content="${portal.fullUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="StokPratik" />
    <meta property="og:image" content="${portal.ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${portal.title}" />
    <meta name="twitter:description" content="${portal.description}" />
    <meta name="twitter:image" content="${portal.ogImage}" />
  `;

  if (html.includes('</head>')) {
    html = html.replace('</head>', `${metaTags}\n</head>`);
  }

  // 3. WhatsApp linklerini ve özel karşılama mesajlarını ayarla
  const waEncoded = encodeURIComponent(portal.waText);
  const waFull = `${WA_BASE}?text=${waEncoded}`;
  html = html.replace(/href="https:\/\/wa\.me\/[0-9]*[^"]*"/gi, `href="${waFull}" target="_blank" rel="noopener noreferrer"`);
  html = html.replace(/href="https:\/\/wa\.me\/"/gi, `href="${waFull}" target="_blank" rel="noopener noreferrer"`);
  html = html.replace(/href="https:\/\/wa\.me"/gi, `href="${waFull}" target="_blank" rel="noopener noreferrer"`);

  // 4. Firma Kaydı / Ücretsiz Başla butonlarını bağla
  html = html.replace(/data-path="ucretsiz-deneme-baslat"[^>]*href="[^"]*"/gi, `data-path="ucretsiz-deneme-baslat" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer"`);
  html = html.replace(/href="https:\/\/erp-eticaret\.stokpratik\.com\.tr\/"/gi, `href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer"`);

  // 5. Link Hiyerarşisi
  if (portal.url === '/ekosistem') {
    // Header sol logo tıklaması
    html = html.replace(/data-path="portal-ekosistemi-genel-bakis"[^>]*href="[^"]*"/gi, `data-path="portal-ekosistemi-genel-bakis" href="/ekosistem"`);

    // 11 Portal Menü linkleri (target="_blank" YENİ SEKMEDE)
    for (const [key, targetRoute] of Object.entries(LINK_MAPPINGS)) {
      const navRegex = new RegExp(`data-path="${key}"[^>]*href="[^"]*"`, 'gi');
      html = html.replace(navRegex, `data-path="${key}" href="${targetRoute}" target="_blank" rel="noopener noreferrer"`);
    }

    // Kartlar ve butonlar
    html = html.replace(/data-path="musavir-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/musavirpratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="b2b-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/carinet" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="finans-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/finanspratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="mutabakat-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/mutabakatpratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="eticaret-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/e-ticaretpratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="wms-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/lojistikpratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="uretim-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/uretimpratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="crm-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/crmpratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="pdks-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/personelpratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="servis-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/servispratik" target="_blank" rel="noopener noreferrer"`);
    html = html.replace(/data-path="santiye-detay"[^>]*href="[^"]*"/gi, `href="/ekosistem/projepratik" target="_blank" rel="noopener noreferrer"`);
  } else {
    // 11 Alt Portal için: Header logosu Ana Ekosistem sayfasına yönlendirsin
    html = html.replace(/data-path="[a-zA-Z0-9_-]*portal-ana-sayfa"[^>]*href="[^"]*"/gi, `href="/ekosistem" title="StokPratik Tüm Ekosistem"`);
  }

  // Mükerrer nitelikleri temizle
  html = html.replace(/(target="_blank"\s*){2,}/gi, 'target="_blank" ');
  html = html.replace(/(rel="noopener noreferrer"\s*){2,}/gi, 'rel="noopener noreferrer" ');
  html = html.replace(/target="_blank"\s*rel="noopener noreferrer"\s*target="_blank"/gi, 'target="_blank" rel="noopener noreferrer"');

  // 6. Astro Frontmatter
  const astroContent = `---
// İzole Tanıtım Sayfası - ${portal.title}
// Bu sayfa mevcut site stillerinden tamamen bağımsız çalışır.
---
${html}
`;

  const outputPath = path.join(TARGET_DIR, portal.targetFile);
  fs.writeFileSync(outputPath, astroContent, 'utf8');
  console.log(`Oluşturuldu: ${outputPath} -> ${portal.url}`);
}

console.log('Tüm 12 sayfa başarıyla oluşturuldu ve optimize edildi!');

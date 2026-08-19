import { PackagePlan, TestimonialItem, FaqItem, BlogPost, ProductModel } from '../types';

export const OFFICIAL_LINKS = {
  packages: 'https://stokpratik.com.tr/paketlerimiz',
  contact: 'https://stokpratik.com.tr/iletisim',
  features: 'https://stokpratik.com.tr/ozelliklerimiz',
  whyUs: 'https://stokpratik.com.tr/neden-stok-pratik',
  testimonials: 'https://stokpratik.com.tr/referanslarimiz',
  demo: 'https://stokpratik.com.tr/demo',
  blog: 'https://stokpratik.com.tr/blog',
  phone: 'tel:08503080000',
  whatsapp: 'https://wa.me/908503080000?text=Merhaba,%20Tekstil%20ve%20Haz%C4%B1r%20Giyim%20Stok%20Pratik%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.'
};

export const PACKAGES: PackagePlan[] = [
  {
    id: 'single-store',
    title: 'Tek Mağaza',
    description: 'Tek lokasyonda butik veya perakende mağaza işleten tekstilciler için ideal başlangıç çözümü.',
    features: [
      'Barkodlu Hızlı Satış (POS)',
      'Detaylı Varyant & Stok Yönetimi',
      'Renk, Beden ve Sezon Tanımlama',
      'e-Fatura & e-Arşiv Entegrasyonu',
      'Temel Kasa ve Gelir-Gider Takibi',
      'Etiket ve Barkod Basım Modülü'
    ],
    specs: {
      branches: '1 Şube / Satış Noktası',
      warehouses: '1 Ana Depo',
      users: 'Sınırsız Kullanıcı',
      integrations: 'e-Fatura + POS Donanımları'
    },
    link: 'https://stokpratik.com.tr/paketlerimiz'
  },
  {
    id: 'five-branches',
    title: '5 Şubeli Mağaza',
    badge: 'En Çok Tercih Edilen',
    highlight: true,
    description: 'Birden çok satış noktası ve toptan-perakende hibrit çalışan büyüyen tekstil zincirleri için.',
    features: [
      '5 Ayrı Şube & Çoklu Depo Yönetimi',
      'Şubeler Arası Anlık Stok Transferi',
      'Kapsamlı Personel Yetki & Prim Yönetimi',
      'B2B Toptan Müşteri Fiyat Listeleri',
      'Trendyol, Hepsiburada, N11 Entegrasyonu',
      'Gelişmiş Sezonluk Stok & Satış Raporları',
      'e-Fatura & e-İrsaliye Desteği'
    ],
    specs: {
      branches: '5 Şubeye Kadar',
      warehouses: '5 Bağımsız Depo',
      users: 'Yetkilendirilmiş Sınırsız Kullanıcı',
      integrations: 'Pazaryerleri + e-Dönüşüm + B2B'
    },
    link: 'https://stokpratik.com.tr/paketlerimiz'
  },
  {
    id: 'ten-branches',
    title: '10 Şubeli Mağaza',
    badge: 'Kurumsal Güç',
    description: 'Geniş bayi ağı, toptan üretim/ithalat ve büyük perakende mağaza zincirleri için tam kurumsal yönetim.',
    features: [
      '10 Ayrı Şube & 10 Bağımsız Depo',
      'Konsinye ve Bayi Stok Yönetimi',
      'B2B Toptan Portalı & Özel Cari Kotalar',
      'İleri Düzey Finans & Kâr-Zarar Analitiği',
      'Otomatik Kritik Seviye Sipariş Önerileri',
      'Öncelikli 7/24 VIP Müşteri Temsilcisi',
      'Tüm e-Ticaret ve Muhasebe Entegrasyonları'
    ],
    specs: {
      branches: '10 Şubeye Kadar (Genişletilebilir)',
      warehouses: '10+ Depo & Lojistik Merkezi',
      users: 'Sınırsız Rol & Departman',
      integrations: 'Özel API + ERP Entegrasyonları'
    },
    link: 'https://stokpratik.com.tr/paketlerimiz'
  }
];

export const CHALLENGES = [
  {
    id: 'variant-chaos',
    icon: 'Grid3x3',
    title: 'Varyant Karmaşası',
    issue: 'Aynı modelin onlarca renk ve beden kombinasyonu için yüzlerce ayrı ürün kartı açmak bilgi kirliliği ve sayım hataları yaratır.',
    solution: 'Tek bir ürün kartında tüm renk ve beden matrisini oluşturun. Her varyantın stok sayısını tek bakışta tablo halinde görün.',
    metric: '%70 daha hızlı varyant kaydı'
  },
  {
    id: 'season-shifts',
    icon: 'CalendarSync',
    title: 'Sezon Geçişleri',
    issue: 'İlkbahar/Yaz veya Sonbahar/Kış geçişlerinde elde kalan ürünleri tespit edememek ölü stok ve nakit akışı sıkışıklığına yol açar.',
    solution: 'Sezon filtreli stok raporlarıyla yavaş hareket eden varyantları anında saptayın, indirim ve stok eritme aksiyonları alın.',
    metric: '%35 stok eritme verimliliği'
  },
  {
    id: 'b2b-retail',
    icon: 'Layers',
    title: 'Toptan & Perakende Birlikte',
    issue: 'Perakende mağaza satışı ile toptan / bayi satışlarının aynı stoktan düşmesi ve farklı fiyat uygulanması manuel hatalara sebep olur.',
    solution: 'Aynı havuzdan hem mağaza POS satışı yapın hem de B2B portalı üzerinden bayilere özel fiyat listeleriyle toptan sipariş açın.',
    metric: '%100 anlık senkronizasyon'
  },
  {
    id: 'returns',
    icon: 'RotateCcw',
    title: 'İade Yönetimi',
    issue: 'Beden ve renk uyuşmazlığı kaynaklı yüksek iade oranları, geri gelen ürünün tekrar stoka girmesinde karışıklık yaratır.',
    solution: 'İade edilen varyant tek bir barkod okutmasıyla doğrudan doğru renk-beden hanesine eklenir, hatasız rafa döner.',
    metric: 'Sıfır stok kaydı hatası'
  }
];

export const SOLUTIONS = [
  {
    id: 'variant',
    emoji: '🧵',
    title: 'Varyant Yönetimi: Renk, Beden, Model, Sezon',
    shortDesc: 'Bir ürüne tüm varyantlarını tek seferde tanımlayın.',
    fullDesc: 'Bir ürüne tüm varyantlarını tek seferde tanımlayın. Her varyant için ayrı stok girişi yapmak zorunda kalmazsınız. Hangi bedenin hangi renkte ne kadar kaldığını anlık görün.',
    bullets: [
      'Tek ürün kartı altında sınırsız renk ve beden kombinasyonu',
      'Matris tipi hızlı stok girişi ve toplu fiyatlandırma',
      'Her varyanta özel otomatik benzersiz barkod üretimi',
      'Kritik stok alarmı (ör. Terracotta / M beden 3 adede düştüğünde uyarı)'
    ],
    tag: 'Temel Tekstil Gücü'
  },
  {
    id: 'warehouse',
    emoji: '📦',
    title: 'Stok & Depo Yönetimi',
    shortDesc: 'Tüm mağaza ve depoları tek ekrandan yönetin.',
    fullDesc: 'Birden fazla deponuz varsa, tüm stokları tek bir ekrandan yönetin. Depolar arası transfer işlemlerini birkaç tıkla gerçekleştirin. Hangi ürünün hangi depoda olduğunu anlık görün.',
    bullets: [
      'Merkez depo ve şube depoları arası tek tıkla sevk irsaliyesi',
      'Şubeler arası stok transfer onayı ve barkodlu teslim alma',
      'Depo bazlı minimum/maksimum stok seviyesi kuralı',
      'Mobil cihaz veya el terminali ile hızlı sayım ve fiş eşleme'
    ],
    tag: 'Çoklu Depo Gücü'
  },
  {
    id: 'b2b',
    emoji: '🛒',
    title: 'B2B Toptan Portalı & Özel Fiyat Listeleri',
    shortDesc: 'Bayilerinize özel fiyatlar ve sipariş otomasyonu.',
    fullDesc: 'Kendi toptan portalınızı oluşturun. Bayilerinize özel fiyat listeleri tanımlayın. Siparişler otomatik sisteme düşsün, stoklar anında güncellensin.',
    bullets: [
      'Her bayiye veya müşteri grubuna özel döviz/TL fiyat listesi',
      'Toptan asgari sipariş adedi (seri/lot bazında sipariş alma)',
      'Bayilerin güncel cari bakiye, ekstresi ve sipariş geçmişi',
      'Onaylanan siparişin otomatik rezervasyon ve faturaya dönüşmesi'
    ],
    tag: 'Toptan Satış Motoru'
  },
  {
    id: 'einvoice',
    emoji: '📄',
    title: 'e-Fatura ve e-İrsaliye',
    shortDesc: 'Maliye ile tam uyumlu otomatik e-dönüşüm.',
    fullDesc: 'Faturaları otomatik kesin, stoklarla senkronize çalışsın. e-Fatura ve e-İrsaliye entegrasyonu ile tüm süreçler dijital ve hatasız ilerlesin.',
    bullets: [
      'GİB onaylı entegratörler ile doğrudan tek tıkla e-Fatura kesimi',
      'Sevkiyat sırasında araç içi için anında e-İrsaliye çıktısı veya QR',
      'Gelen e-Faturaları sisteme tek tıkla çekip alış irsaliyesine dönüştürme',
      'Muhasebe programlarına anlık veri aktarımı ve cari mutabakat'
    ],
    tag: 'Yasal Uyum & Hız'
  },
  {
    id: 'ecommerce',
    emoji: '⚡',
    title: 'Pazaryeri & E-Ticaret Entegrasyonu',
    shortDesc: 'Trendyol, Hepsiburada, N11 doğrudan senkron.',
    fullDesc: 'Ayrı bir entegratör şirketine yüksek komisyonlar ödemeden Trendyol, Hepsiburada ve N11 mağazalarınızdaki renk/beden stoklarını tek merkezden yönetin.',
    bullets: [
      'Pazaryerinden sipariş geldiğinde fiziki mağazadaki stok anında düşer',
      'Mağazada satılan son ürün saniyeler içinde internette tükenir (çift satışı önler)',
      'Farklı pazaryerlerine farklı fiyat ve komisyon politikası',
      'Kargo barkodu ve müşteri faturası tek panelden toplu basım'
    ],
    tag: 'Komisyonsuz Entegrasyon'
  }
];

export const STATS = [
  {
    value: '180+',
    label: 'Tekstil & Giyim Markası',
    detail: "Türkiye'de 180'den fazla tekstil firması Stok Pratik'i tercih ediyor."
  },
  {
    value: '%97',
    label: 'Stok Doğruluğu Artışı',
    detail: 'Renk ve beden karmaşası son buluyor, sayım açıkları sıfırlanıyor.'
  },
  {
    value: '%40',
    label: 'Daha Kısa Sipariş Karşılama',
    detail: 'Toptan ve e-ticaret sipariş hazırlama ve sevk süreleri neredeyse yarıya iniyor.'
  },
  {
    value: '%70',
    label: 'Daha Hızlı Varyant Yönetimi',
    detail: 'Matris sistemiyle yüzlerce renk-beden kombinasyonu saniyeler içinde sisteme işleniyor.'
  }
];

export const WHY_US = [
  {
    icon: 'Globe',
    title: '%100 Web Tabanlı',
    desc: 'Hiçbir sunucu masrafı veya program kurulumu yok. İster mağazada tabletten, ister ofiste bilgisayardan, ister seyahatte cepten erişin.'
  },
  {
    icon: 'PlugZap',
    title: 'Entegrasyon Firmasına Gerek Yok',
    desc: 'Trendyol, Hepsiburada, N11 ile doğrudan entegrasyon. Aracı firmalara her ay yüzlerce lira ek yazılım bedeli ödemezsiniz.'
  },
  {
    icon: 'ShieldCheck',
    title: '14 Gün Ücretsiz Deneme',
    desc: 'Kredi kartı bilgisi vermeden, hiçbir taahhüt altına girmeden kendi ürün ve varyantlarınızla 14 gün boyunca sistemi test edin.'
  },
  {
    icon: 'Headphones',
    title: '7/24 Teknik Destek',
    desc: 'Tekstil sektörünün dinamiklerini bilen uzman destek ekibimiz telefon, WhatsApp ve canlı yardım ile her zaman yanınızda.'
  },
  {
    icon: 'TrendingUp',
    title: 'Ölçeklenebilir Altyapı',
    desc: '1 mağazadan 50 şubeye, perakende butikten uluslararası toptan ihracat merkezine kadar işiniz büyüdükçe Stok Pratik sizinle büyür.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: 'Varyant yönetiminde yaşadığımız zorlukları Stok Pratik ile tamamen çözdük. Artık hangi ürünün hangi bedende, hangi renkte kaldığını anlık takip ediyoruz.',
    author: 'Mehmet Yılmaz',
    role: 'Operasyon Müdürü',
    company: 'TrendLine Tekstil & Konfeksiyon',
    location: 'Merter / İstanbul',
    impactBadge: '%98 Stok Doğruluğu'
  },
  {
    quote: 'B2B portalımız sayesinde toptan müşterilerimiz kendi fiyatlarıyla sipariş veriyor, iş süreçlerimiz tamamen otomatikleşti. Telefonla sipariş alma devri bitti.',
    author: 'Selin Karadağ',
    role: 'Firma Sahibi',
    company: 'VogueLife Hazır Giyim',
    location: 'Osmanbey / İstanbul',
    impactBadge: 'Aylık 1.200+ Otomatik Toptan Sipariş'
  },
  {
    quote: '5 şubemiz ve 1 merkez depomuz arasında transferler daha önce kâbustu. Stok Pratik ile sevkiyatlar barkodlu ve hatasız ilerliyor, Trendyol stoklarımız da anında güncelleniyor.',
    author: 'Cemil Demirtaş',
    role: 'Genel Koordinatör',
    company: 'Demirtaş Butik & Giyim Zinciri',
    location: 'Bursa & İzmir',
    impactBadge: '5 Şube Tek Panel'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Varyant & Ürünler',
    question: 'Tekstil sektörü için özel varyant yönetimi var mı?',
    answer: 'Evet, Stok Pratik renk, beden, model, sezon gibi tüm varyantları tek bir ürün kartında toplar. Her varyant için ayrı stok girişi yapmanıza gerek kalmaz. Tek ekranda matris şeklinde tüm stokları görebilirsiniz.'
  },
  {
    category: 'Depo & Şube',
    question: 'Birden fazla deposu olan firmalar için uygun mu?',
    answer: 'Evet, Stok Pratik çoklu depo yönetimi desteği sunar. Tüm depolarınızı tek bir ekrandan yönetebilir, depolar ve şubeler arası stok transferlerini barkod kontrolüyle güvenle gerçekleştirebilirsiniz.'
  },
  {
    category: 'B2B & Toptan',
    question: 'Toptan müşterilere özel fiyat verebilir miyim?',
    answer: 'Evet, Stok Pratik B2B toptan portalı ile her müşteriye veya müşteri grubuna özel fiyat listesi tanımlayabilir, cari iskonto oranları atayabilir ve bayilerinizin kendi panelinden sipariş vermesini sağlayabilirsiniz.'
  },
  {
    category: 'Entegrasyon',
    question: 'Trendyol, Hepsiburada ve N11 stokları mağaza ile nasıl eşitlenir?',
    answer: 'Stok Pratik doğrudan pazar yeri API bağlantılarına sahiptir. Fiziki mağazanızda POS üzerinden bir tişört satıldığında, saniyeler içinde Trendyol ve diğer pazaryerlerindeki aynı renk-beden varyantının stoku otomatik 1 eksilir.'
  },
  {
    category: 'Maliyet & Kurulum',
    question: 'Sistemi kullanmak için bilgisayara ek bir donanım veya program kurmam gerekir mi?',
    answer: 'Hayır. Stok Pratik %100 bulut tabanlıdır. İnternet bağlantısı olan herhangi bir bilgisayar, tablet veya akıllı telefondan web tarayıcınızla hemen giriş yapıp kullanabilirsiniz. Mevcut barkod okuyucu ve fiş yazıcılarınızla da tam uyumludur.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Tekstil Sektöründe Varyant Yönetimini Kolaylaştırma Yolları',
    excerpt: 'Onlarca renk ve beden arasında kaybolmadan, tek bir ürün kartı üzerinden matris stok takibi yapmanın püf noktaları.',
    readTime: '4 dk okuma',
    category: 'Varyant Yönetimi',
    date: 'Ağustos 2026',
    slug: 'tekstil-varyant-yonetimi-kolaylastirma-yollari'
  },
  {
    title: 'Sezonluk Stok Planlaması Nasıl Yapılır?',
    excerpt: 'İlkbahar/Yaz ve Sonbahar/Kış geçişlerinde ölü stok maliyetini en aza indirip nakit akışınızı hızlandıracak stok eritme taktikleri.',
    readTime: '6 dk okuma',
    category: 'Stok Stratejisi',
    date: 'Temmuz 2026',
    slug: 'sezonluk-stok-planlamasi-nasil-yapilir'
  },
  {
    title: 'Toptan ve Perakende Satışı Birlikte Yönetmenin İpuçları',
    excerpt: 'Fiziki mağaza kasası ile toptan bayi siparişlerinin tek bir merkezi stok havuzundan çakışmasız ve hatasız yönetilme modeli.',
    readTime: '5 dk okuma',
    category: 'B2B & Çoklu Kanal',
    date: 'Haziran 2026',
    slug: 'toptan-ve-perakende-satisi-birlikte-yonetme'
  }
];

export const SAMPLE_PRODUCT: ProductModel = {
  id: 'prod-001',
  name: 'Oversize Keten Gömlek',
  code: 'STK-TX-2026',
  category: 'Üst Giyim / Gömlek',
  season: 'Yaz 2026 (Yeni Sezon)',
  fabric: '%100 Saf Keten Lif',
  variants: [
    { id: 'v1', color: 'Adaçayı Yeşili', colorHex: '#52796F', size: 'S', sku: 'KTM-AD-S', barcode: '868001092011', stock: 24, reserved: 4, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v2', color: 'Adaçayı Yeşili', colorHex: '#52796F', size: 'M', sku: 'KTM-AD-M', barcode: '868001092012', stock: 18, reserved: 6, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v3', color: 'Adaçayı Yeşili', colorHex: '#52796F', size: 'L', sku: 'KTM-AD-L', barcode: '868001092013', stock: 6, reserved: 2, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v4', color: 'Terracotta (Kiremit)', colorHex: '#C86446', size: 'S', sku: 'KTM-TR-S', barcode: '868001092021', stock: 15, reserved: 1, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v5', color: 'Terracotta (Kiremit)', colorHex: '#C86446', size: 'M', sku: 'KTM-TR-M', barcode: '868001092022', stock: 4, reserved: 0, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v6', color: 'Terracotta (Kiremit)', colorHex: '#C86446', size: 'L', sku: 'KTM-TR-L', barcode: '868001092023', stock: 2, reserved: 1, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v7', color: 'Gece Mavisi', colorHex: '#1E3A8A', size: 'S', sku: 'KTM-GM-S', barcode: '868001092031', stock: 32, reserved: 8, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v8', color: 'Gece Mavisi', colorHex: '#1E3A8A', size: 'M', sku: 'KTM-GM-M', barcode: '868001092032', stock: 28, reserved: 5, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v9', color: 'Gece Mavisi', colorHex: '#1E3A8A', size: 'L', sku: 'KTM-GM-L', barcode: '868001092033', stock: 19, reserved: 3, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v10', color: 'Taş Beyazı', colorHex: '#E2E8F0', size: 'S', sku: 'KTM-TB-S', barcode: '868001092041', stock: 45, reserved: 10, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v11', color: 'Taş Beyazı', colorHex: '#E2E8F0', size: 'M', sku: 'KTM-TB-M', barcode: '868001092042', stock: 38, reserved: 4, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 },
    { id: 'v12', color: 'Taş Beyazı', colorHex: '#E2E8F0', size: 'L', sku: 'KTM-TB-L', barcode: '868001092043', stock: 8, reserved: 2, reorderPoint: 5, b2bPrice: 420, retailPrice: 890 }
  ]
};

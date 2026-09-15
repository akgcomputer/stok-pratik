const fs = require('fs');
let text = fs.readFileSync('src/pages/destek-icerikleri.astro', 'utf8');

const regex = /filteredPages\.forEach\(page => \{[\s\S]*?  groupedPages\[category\]\.push\(\{\\n?\s*url: page\.url,\\n?\s*title: title\\n?\s*\}\);\n?\s*\}\);/;

// We can just replace everything between filteredPages.forEach and Object.keys(groupedPages)
const startIdx = text.indexOf('filteredPages.forEach(page => {');
const endIdx = text.indexOf('// Kategorileri alfabetik sıralamak için diziye çeviriyoruz');

const newCode = `// Sık kullanılan kelimeler için Türkçe sözlük (URL'den gelen ascii kelimeleri düzeltmek için)
const trDict = {
  'alim': 'alım', 'nasil': 'nasıl', 'yapilir': 'yapılır', 'sayim': 'sayım',
  'urun': 'ürün', 'olusturulur': 'oluşturulur', 'islem': 'işlem', 'islemleri': 'işlemleri',
  'ozellikleri': 'özellikleri', 'cikis': 'çıkış', 'giris': 'giriş', 'musteri': 'müşteri',
  'satis': 'satış', 'degistirme': 'değiştirme', 'guncelleme': 'güncelleme', 'kullanim': 'kullanım',
  'odeme': 'ödeme', 'tahsilat': 'tahsilat', 'acilis': 'açılış', 'kapanis': 'kapanış',
  'cikarma': 'çıkarma', 'aktarim': 'aktarım', 'basim': 'basım', 'kagit': 'kağıt',
  'degisim': 'değişim', 'tanimlama': 'tanımlama', 'baslangic': 'başlangıç', 'cozum': 'çözüm',
  'baglanti': 'bağlantı', 'sifre': 'şifre', 'kullanici': 'kullanıcı', 'ayarlar': 'ayarlar',
  'nedir': 'nedir', 'nelerdir': 'nelerdir', 'silinir': 'silinir', 'iptal': 'iptal',
  'fatura': 'fatura', 'stok': 'stok', 'kasa': 'kasa', 'banka': 'banka', 'hesaplar': 'hesaplar',
  'transferi': 'transferi', 'cari': 'cari', 'ekleme': 'ekleme'
};

filteredPages.forEach(page => {
  // URL'deki türkçe karakterleri düzeltmek için decodeURIComponent kullanıyoruz
  const slug = decodeURIComponent(page.url).split('/').pop() || '';
  
  // Örn: destek-fatura-fatura-nasil-kesilir
  const parts = slug.split('-');
  
  let categoryRaw = 'Genel';
  let titleRaw = slug;
  
  // Dosya adı en az 'destek-kategori-konu' formatındaysa (3 parça)
  if (parts.length >= 3 && parts[0] === 'destek') {
    categoryRaw = parts[1]; // fatura
    titleRaw = parts.slice(2).join(' '); // fatura nasil kesilir
  } else if (parts.length === 2 && parts[0] === 'destek') {
    categoryRaw = 'Genel';
    titleRaw = parts[1];
  } else {
    titleRaw = slug.replace(/-/g, ' ');
  }

  // Kelimeleri tek tek sözlükten geçirip Türkçe karşılığı varsa değiştir
  titleRaw = titleRaw.split(' ').map(word => {
    const lower = word.toLowerCase();
    return trDict[lower] ? trDict[lower] : word;
  }).join(' ');

  // Kategori ismini de sözlükten geçir
  categoryRaw = trDict[categoryRaw.toLowerCase()] ? trDict[categoryRaw.toLowerCase()] : categoryRaw;

  const category = formatText(categoryRaw);
  let title = formatText(titleRaw);
  
  // Eğer dosya içinde 'export const title = "...";' kullanıldıysa her şeyi ezip onu kullan (Opsiyonel)
  if (page.title) {
    title = page.title;
  }
  
  // Kullanıcının istediği gibi başlığın sonuna soru işareti eklemek için:
  const lowerTitle = title.toLowerCase();
  if (!page.title && (lowerTitle.includes('nasıl') || lowerTitle.includes('nasil') || lowerTitle.includes('nedir') || lowerTitle.includes('oluşturulur') || lowerTitle.includes('yapılır') || lowerTitle.includes('silinir') || lowerTitle.includes('nelerdir')) && !title.endsWith('?')) {
    title += '?';
  }

  if (!groupedPages[category]) {
    groupedPages[category] = [];
  }
  
  groupedPages[category].push({
    url: page.url,
    title: title
  });
});

`;

text = text.substring(0, startIdx) + newCode + text.substring(endIdx);
fs.writeFileSync('src/pages/destek-icerikleri.astro', text, 'utf8');

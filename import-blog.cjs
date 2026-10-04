/**
 * Google Drive / Yerel Excel (.xlsx) Blog İçe Aktarma Scripti
 * 
 * Kullanım:
 * 1) Link ile: node import-blog.cjs "https://drive.google.com/file/d/.../view"
 * 2) Yerel dosya ile: node import-blog.cjs blog-icerikleri.xlsx
 *    (veya parametresiz: ana dizindeki blog-icerikleri.xlsx'i okur)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const XLSX = require('xlsx');

// Blog markdown dosyalarının kaydedileceği hedef klasör
const BLOG_DIR = path.join(__dirname, 'src', 'content', 'blog');

// Türkçe karakterleri temizleyip slug üreten yardımcı fonksiyon
function slugify(text) {
  if (!text) return '';
  const trMap = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u'
  };

  return text
    .toString()
    .replace(/[çÇğĞıIİöÖşŞüÜ]/g, match => trMap[match] || match)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Harf, rakam, boşluk ve tire dışındakileri temizle
    .replace(/[\s-]+/g, '-')      // Boşlukları tireye dönüştür
    .replace(/^-+|-+$/g, '');     // Baş ve sondaki tireleri temizle
}

// Drive linkinden Dosya ID'sini ayıklama
function extractDriveId(url) {
  if (!url) return null;
  // Format 1: /file/d/ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  // Format 2: /spreadsheets/d/ID/edit
  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (sheetMatch) return sheetMatch[1];

  // Format 3: id=ID
  const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  return null;
}

// URL'den Buffer indirme (Redirectleri takip eder)
function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    client.get(url, (res) => {
      // 301 / 302 / 303 / 307 Redirect kontrolü
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        return resolve(downloadBuffer(redirectUrl));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`İndirme başarısız! HTTP Kod: ${res.statusCode}`));
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Tarih biçimlendirme (Varsayılan: YYYY-MM-DD)
function formatDate(val) {
  if (!val) {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Eğer Excel tarih sayısı (serial number) ise
  if (typeof val === 'number') {
    const date = new Date(Math.round((val - 25569) * 86400 * 1000));
    return date.toISOString().split('T')[0];
  }

  // String tarih kontrolü
  const d = new Date(val);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }

  return String(val).trim();
}

// Boolean/Aktiflik kontrolü
function isEnabled(val) {
  if (val === undefined || val === null || val === '') return true; // Boşsa varsayılan aktif
  const str = String(val).toLowerCase().trim();
  if (str === 'false' || str === '0' || str === 'hayır' || str === 'hayir' || str === 'pasif' || str === 'no') {
    return false;
  }
  return true;
}

// Ana çalışma fonksiyonu
async function main() {
  let targetArg = process.argv[2] || process.env.BLOG_DRIVE_URL;
  if (!targetArg) {
    if (fs.existsSync(path.join(process.cwd(), 'blog-icerikleri.xlsx'))) {
      targetArg = 'blog-icerikleri.xlsx';
    } else {
      targetArg = 'https://docs.google.com/spreadsheets/d/1rV-vrfS7Ox5oJ63umMfCjMjxvXhdz-wpYlVkXmLx2M0/edit?usp=sharing';
    }
  }

  console.log('🚀 Blog İçe Aktarma İşlemi Başlatılıyor...');

  let workbook;

  // 1. Durum: Google Drive veya Web Linki
  if (targetArg.startsWith('http://') || targetArg.startsWith('https://')) {
    console.log(`📥 Link algılandı: ${targetArg}`);
    const driveId = extractDriveId(targetArg);

    let downloadUrl = targetArg;
    if (driveId) {
      if (targetArg.includes('/spreadsheets/')) {
        // Google Sheets doğrudan XLSX export
        downloadUrl = `https://docs.google.com/spreadsheets/d/${driveId}/export?format=xlsx`;
      } else {
        // Google Drive normal dosya indirme
        downloadUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download`;
      }
    }

    try {
      console.log('⏳ Excel dosyası Google Drive üzerinden indiriliyor...');
      const buffer = await downloadBuffer(downloadUrl);
      workbook = XLSX.read(buffer, { type: 'buffer' });
      console.log('✅ Dosya başarıyla indirildi ve hafızaya alındı!');
    } catch (err) {
      // Eğer drive.usercontent çalışmazsa alternatif dene
      if (driveId) {
        console.log('⚠️ Alternatif indirme kanalı deneniyor...');
        try {
          const altUrl = `https://drive.google.com/uc?export=download&id=${driveId}`;
          const buffer = await downloadBuffer(altUrl);
          workbook = XLSX.read(buffer, { type: 'buffer' });
          console.log('✅ Dosya alternatif bağlantı ile indirildi!');
        } catch (altErr) {
          console.error(`❌ Drive'dan indirme hatası: ${err.message}`);
          console.log('💡 İpucu: Drive dosyasının "Bağlantıya sahip olan herkes görüntüleyebilir" olarak ayarlandığından emin olun.');
          process.exit(1);
        }
      } else {
        console.error(`❌ İndirme hatası: ${err.message}`);
        process.exit(1);
      }
    }
  } else {
    // 2. Durum: Yerel Dosya
    const localPath = path.isAbsolute(targetArg) ? targetArg : path.join(process.cwd(), targetArg);
    if (!fs.existsSync(localPath)) {
      console.error(`❌ Dosya bulunamadı: ${localPath}`);
      console.log('💡 Lütfen dosya yolunu kontrol edin veya bir Drive linki girin:');
      console.log('   Örn: node import-blog.cjs "https://drive.google.com/file/d/.../view"');
      process.exit(1);
    }
    console.log(`📂 Yerel dosya okunuyor: ${localPath}`);
    workbook = XLSX.readFile(localPath);
  }

  // İlk sayfayı seç
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  console.log(`📊 Toplam ${rows.length} satır veri bulundu.`);

  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  let addedCount = 0;
  let skippedCount = 0;
  let disabledCount = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Sütun eşleştirme (Büyük/küçük harf duyarlılığını ortadan kaldır)
    const getCol = (key) => {
      const matchKey = Object.keys(row).find(k => k.trim().toLowerCase() === key.toLowerCase());
      return matchKey ? row[matchKey] : '';
    };

    const title = String(getCol('title')).trim();
    const shortDesc = String(getCol('shortDescription') || getCol('description') || getCol('kisaAciklama')).trim();
    const content = String(getCol('content') || getCol('icerik')).trim();
    let slug = String(getCol('slug')).trim();
    const author = String(getCol('author') || getCol('yazar')).trim() || 'Stok Pratik Ekibi';
    const date = formatDate(getCol('date') || getCol('tarih'));
    const enabled = isEnabled(getCol('enabled') !== '' ? getCol('enabled') : getCol('aktif'));

    // Zorunlu alan kontrolü: Başlık, Kısa Açıklama ve İçerik boş olmamalı
    if (!title || !shortDesc || !content) {
      console.log(`⚠️ [Satır ${i + 2}] Zorunlu alanlar (başlık, kısa açıklama veya içerik) boş olduğu için ATLANDI.`);
      skippedCount++;
      continue;
    }

    // Aktif değilse atla
    if (!enabled) {
      console.log(`⏸️ [Satır ${i + 2}] Pasif durumda olduğu için atlandı: "${title}"`);
      disabledCount++;
      continue;
    }

    // Slug boşsa başlıktan otomatik oluştur
    if (!slug) {
      slug = slugify(title);
    } else {
      slug = slugify(slug);
    }

    const fileName = `${slug}.md`;
    const filePath = path.join(BLOG_DIR, fileName);

    // Eski yazılara DOKUNMA! Eğer dosya zaten varsa ATLA
    if (fs.existsSync(filePath)) {
      console.log(`⏭️ Zaten mevcut, atlandı: "${fileName}"`);
      skippedCount++;
      continue;
    }

    // Markdown / Frontmatter İçeriğini Oluştur
    // Keystatic şemasına tam uyumlu
    const fileContent = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(shortDesc)}
author: ${JSON.stringify(author)}
date: ${JSON.stringify(date)}
---
${content}
`;

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✨ Yeni yazı eklendi: "${fileName}"`);
    addedCount++;
  }

  console.log('\n=============================================');
  console.log(`🎉 İŞLEM TAMAMLANDI!`);
  console.log(`✅ Yeni Eklenen Yazı: ${addedCount}`);
  console.log(`⏭️ Mevcut / Atlanan Yazı: ${skippedCount}`);
  if (disabledCount > 0) {
    console.log(`⏸️ Pasif Olduğu İçin Eklenmeyen: ${disabledCount}`);
  }
  console.log('=============================================\n');
}

main().catch(err => {
  console.error('❌ Beklenmeyen hata:', err);
  process.exit(1);
});

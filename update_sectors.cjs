const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/pages/sektor');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro') && f !== 'tekstil-ve-hazir-giyim.astro');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const slug = file.replace('.astro', '');

  // Extract category name from pageTitle
  // e.g. const pageTitle = "Ayakkabı & Deri Mamulleri Toptan ve İhracat Yazılımı | Stok Pratik";
  const titleMatch = content.match(/const pageTitle = "(.*?)\s+Toptan/);
  let categoryName = "Bu Sektör";
  if (titleMatch) {
    categoryName = titleMatch[1].trim();
  } else {
    // fallback, capitalize slug
    categoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // Extract hero description
  // <p class="hero-description">...</p>
  const descMatch = content.match(/<p class="hero-description">([\s\S]*?)<\/p>/);
  let description = "";
  if (descMatch) {
    description = descMatch[1].trim();
  }

  // Build the new hero section
  const encodedWhatsappText = encodeURIComponent(`Depodandirekt de ${categoryName} Kategorisinde satış yapmak istiyorum`);

  const newHero = `  <section class="hero py-16" style="background: linear-gradient(135deg, #1e3a8a, #0f172a, #0f172a); overflow: hidden;">
    <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
      
      <!-- Başlık (Üstte) -->
      <div style="width: 100%; max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 2rem; line-height: 1.3; color: white; font-weight: 800; text-align: center;">
          Depodandirekt Pazaryeri ile ${categoryName} ürünlerinizi tüm Avrupa ve civar bölgelere satın
        </h1>
      </div>
      
      <!-- Resim (Ortada) -->
      <div style="width: 100%; max-width: 800px; margin-bottom: 2rem;">
        <img src="/images/sektorler/${slug}.jpg" alt="${categoryName}" style="width: 100%; border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.3); display: block;" />
      </div>
      
      <!-- Alt Metin ve Butonlar (Altta) -->
      <div class="hero-content" style="width: 100%; max-width: 800px;">
        <p class="hero-description" style="margin: 0 auto 2rem auto; font-size: 1.15rem; color: rgba(255,255,255,0.9);">
          ${description}
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="https://wa.me/+905325000999?text=${encodedWhatsappText}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg" style="background: linear-gradient(135deg, #25D366, #128C7E); border: none; color: white; text-align: center; padding: 1rem 2rem; font-weight: 600; border-radius: 0.75rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pazaryerinde Satıcı Ol
          </a>
          <a href="/pazaryeri-ihracat" class="btn btn-secondary btn-lg" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; text-align: center; padding: 1rem 2rem; font-weight: 600; border-radius: 0.75rem;">
            Tüm Sektörleri Gör
          </a>
        </div>
      </div>
    </div>
  </section>`;

  // replace the old hero section
  const heroRegex = /<section class="hero py-16"[\s\S]*?<\/section>/;
  content = content.replace(heroRegex, newHero);

  // replace the application bottom button section as well
  const bottomButtonRegex = /<div class="application-buttons">[\s\S]*?<\/div>/;
  const newBottomButton = `<div class="application-buttons">
            <a 
              href="https://wa.me/+905325000999?text=${encodedWhatsappText}" 
              class="btn btn-primary btn-lg"
              style="background: linear-gradient(135deg, #25D366, #128C7E); border: none; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pazaryerinde Satıcı Ol
            </a>
          </div>`;
  content = content.replace(bottomButtonRegex, newBottomButton);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
}

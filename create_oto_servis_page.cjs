const fs = require('fs');
const path = require('path');

const content = `---
import BaseLayout from '../layouts/BaseLayout.astro';

const pageTitle = "Oto Servis ve Yedek Parça Yazılımı | Stok Pratik";
const pageDescription = "Oto servisler ve yedek parça satıcıları için iş emri yönetimi, plaka/şasi takibi, OEM kod eşleşmesi ve B2B toptan satış tek platformda. Hemen inceleyin!";
---

<BaseLayout title={pageTitle} description={pageDescription}>
  <!-- Hero Section -->
  <section class="sector-hero">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <span class="badge">Otomotiv & Yedek Parça</span>
          <h1>İş Emri, Plaka ve Yedek Parça Stokunun Tek Adresi</h1>
          <p>Otomotiv sektöründe başarılı bir servis yönetimi, araç kayıtlarından iş emirlerine, OEM kodlu yedek parça stokundan toptan satışlara kadar her şeyin entegre olmasını gerektirir. Stok Pratik ile araçları plakasıyla kaydedin, iş emirlerini tek ekrandan yönetin, hangi parçanın stokta ne kadar kaldığını anlık görün ve B2B portalı ile toptan müşterilerinize özel fiyat listeleri sunun.</p>
          
          <div class="hero-features">
            <div class="feature-item">
              <strong>İş Emri & Plaka Takibi</strong>
              <span>Araçları plakasıyla sisteme alın, iş emirlerini kolayca takip edin.</span>
            </div>
            <div class="feature-item">
              <strong>Barkodlu & OEM Kodlu Stok</strong>
              <span>Her yedek parçayı OEM/OES kodlarıyla ve barkodla eşleştirin.</span>
            </div>
            <div class="feature-item">
              <strong>Toptan & B2B</strong>
              <span>Özel fiyat listeleriyle sanayi esnafına toptan sipariş yönetimi.</span>
            </div>
          </div>
          
          <div class="hero-actions">
            <a href="https://stokpratik.com.tr/demo" class="btn btn-primary" target="_blank">Hemen Dene - Ücretsiz Demo</a>
            <a href="https://stokpratik.com.tr/paketlerimiz" class="btn btn-secondary">Paketleri İncele</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="/images/sektorler/hero_auto_service.jpg" alt="Oto Servis ve Yedek Parça Yazılımı" />
        </div>
      </div>
    </div>
  </section>

  <!-- Zorluklar Section -->
  <section class="challenges py-16">
    <div class="container">
      <div class="section-header text-center">
        <h2>Otomotiv Sektöründe Karşılaşılan Zorluklar</h2>
        <p>Stok Pratik, tüm bu zorluklara sektöre özel çözümler sunar.</p>
      </div>
      <div class="challenges-grid">
        <div class="challenge-card">
          <div class="icon">⚠️</div>
          <h3>Yedek Parça Karmaşası</h3>
          <p>Aynı parçanın farklı markalara ve OEM kodlarına uymasını takip etmek zordur.</p>
        </div>
        <div class="challenge-card">
          <div class="icon">📋</div>
          <h3>İş Emri Takibi</h3>
          <p>Müşteri araçlarının durumunu ve işçilik maliyetlerini hesaplamak vakit alır.</p>
        </div>
        <div class="challenge-card">
          <div class="icon">⚖️</div>
          <h3>Toptan & Perakende Birlikte</h3>
          <p>Hem bireysel müşteriye hem de sanayiye farklı fiyat ve stok yönetimi gerekir.</p>
        </div>
        <div class="challenge-card">
          <div class="icon">🧾</div>
          <h3>Fatura ve İrsaliye</h3>
          <p>Servis sonrası oluşan karmaşık ve çok kalemli faturalandırma süreçleri yorucudur.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Çözümler Section -->
  <section class="solutions py-16">
    <div class="container">
      <div class="section-header text-center">
        <h2>Sektöre Özel Çözümlerimiz</h2>
      </div>
      <div class="solutions-grid">
        <div class="solution-card">
          <div class="icon">🚗</div>
          <h3>İş Emri ve Plaka Takibi</h3>
          <p>Servisinize gelen her aracı plakası, şasi numarası ve müşteri bilgisiyle kaydedin. Yapılan işlemleri, kullanılan yedek parçaları ve işçiliği tek bir iş emrinde toplayın.</p>
        </div>
        <div class="solution-card">
          <div class="icon">📦</div>
          <h3>Barkodlu ve OEM Kodlu Yedek Parça Yönetimi</h3>
          <p>Binlerce yedek parçayı barkod ve orijinal parça numaraları (OEM) ile sisteme tanıtın. Stok sayımında hata payını sıfıra indirin. Hangi deponuzda hangi parçadan kaç adet kaldığını anlık görün.</p>
        </div>
        <div class="solution-card">
          <div class="icon">🛒</div>
          <h3>B2B Toptan Portalı & Özel Fiyat Listeleri</h3>
          <p>Kendi toptan portalınızı oluşturun. Sanayideki diğer esnaflara veya bayilerinize özel iskonto oranları tanımlayın. Siparişler otomatik sisteme düşsün, stoklar anında güncellensin.</p>
        </div>
        <div class="solution-card">
          <div class="icon">📄</div>
          <h3>e-Fatura, e-İrsaliye ve Kolay Tahsilat</h3>
          <p>İş emri kapandığı an tek tıkla e-faturasını kesin. e-Fatura ve e-İrsaliye entegrasyonu ile tüm süreçler dijital ve hatasız ilerlesin. Cari hesap takibi ile tahsilatlarınızı hızlandırın.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- İstatistikler Section -->
  <section class="stats py-16 text-center">
    <div class="container">
      <h2 style="color: white; margin-bottom: 3rem;">Neden Stok Pratik? Rakamlarla Başarımız</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">Yüzlerce+</div>
          <div class="stat-text">Oto Servis ve Yedek Parçacı Stok Pratik'i tercih ediyor.</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">%98</div>
          <div class="stat-text">Stok doğruluğu ortalama bu oranda artıyor.</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">%50</div>
          <div class="stat-text">İş emri kapama ve faturalandırma süresi kısalıyor.</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">1-2 sn</div>
          <div class="stat-text">OEM koduyla parça bulma hızı saniyelere iniyor.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Neden Stok Pratik Section -->
  <section class="why-us py-16">
    <div class="container">
      <div class="why-us-grid">
        <div class="why-image">
          <img src="https://images.unsplash.com/photo-1611095973763-4140156a81fa?auto=format&fit=crop&q=80&w=800" alt="Neden Stok Pratik" style="border-radius: 1rem; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.1);" />
        </div>
        <div class="why-content">
          <h2>Neden Stok Pratik?</h2>
          <ul class="check-list">
            <li><strong>%100 Web Tabanlı:</strong> Kurulum yok, tablet veya bilgisayardan anında erişim.</li>
            <li><strong>Entegrasyon Firmasına Gerek Yok:</strong> Gelişmiş pazaryeri (N11, Hepsiburada, vb.) entegrasyonu.</li>
            <li><strong>14 Gün Ücretsiz Deneme:</strong> Risk almadan test edin, sistemimizi deneyimleyin.</li>
            <li><strong>7/24 Teknik Destek:</strong> Aklınıza takılan tüm sorularınıza anında yanıt bulun.</li>
            <li><strong>Ölçeklenebilir:</strong> Sadece yedek parça da satsanız, zincir servis de olsanız sistem sizinle büyür.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Referanslar Section -->
  <section class="testimonials py-16">
    <div class="container">
      <div class="section-header text-center">
        <h2>Sektöre Özel Referanslar</h2>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <p>"İş emri açmak ve kullanılan parçaları hesaba katmak eskiden çok zaman alıyordu. Stok Pratik ile plakayı giriyoruz, parçayı okutuyoruz ve faturayı anında kesiyoruz."</p>
          <div class="author">
            <strong>Özel Oto Servis Sahibi</strong>
          </div>
        </div>
        <div class="testimonial-card">
          <p>"B2B portalımız sayesinde toptan yedek parça siparişlerimizi bayilerimiz doğrudan sistemden geçiyor, stoklarımız anında düşüyor. İşimiz çok hızlandı."</p>
          <div class="author">
            <strong>Yedek Parça Toptancısı</strong>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SSS Section -->
  <section class="faq py-16">
    <div class="container">
      <div class="section-header text-center">
        <h2>Sıkça Sorulan Sorular (SSS)</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item">
          <h3>Servise gelen araçların geçmişini görebilir miyim?</h3>
          <p>Kesinlikle! Plaka veya müşteri adına göre arama yaparak aracın daha önceki iş emirlerini, değişen parçalarını ve yapılan bakımlarını görebilirsiniz.</p>
        </div>
        <div class="faq-item">
          <h3>OEM ve muadil parça eşleştirmesi yapabiliyor muyuz?</h3>
          <p>Evet, Stok Pratik ile bir parçaya birden fazla kod tanımlayabilir, orijinal ve muadil parçaları birbirleriyle ilişkilendirebilirsiniz.</p>
        </div>
        <div class="faq-item">
          <h3>Çoklu depo ve şube desteğiniz var mı?</h3>
          <p>Evet, birden fazla servis veya yedek parça deponuz varsa tüm stokları ve hareketleri tek bir ekrandan yönetebilirsiniz.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Paketler Section -->
  <section class="pricing py-16">
    <div class="container">
      <div class="section-header text-center">
        <h2>İşletmenize Uygun Paketler</h2>
        <p>Her ölçekteki işletme için esnek çözümler.</p>
      </div>
      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Tek Mağaza / Servis</h3>
          <p>İş Emri, Barkodlu Satış, Stok Yönetimi, POS, e-Fatura</p>
          <a href="https://stokpratik.com.tr/paketlerimiz" class="btn btn-outline" target="_blank">Detayları İncele</a>
        </div>
        <div class="pricing-card popular">
          <div class="popular-badge">En Çok Tercih Edilen</div>
          <h3>5 Şubeli İşletme</h3>
          <p>Çoklu Depo, 5 Şube, Personel Yönetimi, Gelişmiş Raporlama</p>
          <a href="https://stokpratik.com.tr/paketlerimiz" class="btn btn-primary" target="_blank">Detayları İncele</a>
        </div>
        <div class="pricing-card">
          <h3>10 Şubeli İşletme</h3>
          <p>10 Depo, 10 Şube, B2B Toptan Modülü, Kapsamlı Analiz</p>
          <a href="https://stokpratik.com.tr/paketlerimiz" class="btn btn-outline" target="_blank">Detayları İncele</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Blog & İletişim CTA -->
  <section class="cta py-16 text-center">
    <div class="container">
      <h2>Stok Pratik'i Oto Servis ve Yedek Parça Sektöründe Dene!</h2>
      <p>14 gün ücretsiz, taahhüt yok, kredi kartı bilgisi gerekmez.</p>
      <div class="hero-actions" style="justify-content: center; margin-top: 2rem;">
        <a href="https://stokpratik.com.tr/demo" class="btn btn-primary" target="_blank">Demo Talep Et</a>
        <a href="https://stokpratik.com.tr/iletisim" class="btn btn-secondary">İletişime Geç</a>
      </div>
      
      <div class="blog-links" style="margin-top: 4rem;">
        <h3 style="margin-bottom: 1.5rem; color: #475569; font-size: 1.1rem;">Blog & Kaynaklar</h3>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="https://stokpratik.com.tr/blog" style="background: #f1f5f9; padding: 0.8rem 1.2rem; border-radius: 0.5rem; color: #334155; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Oto Servislerde Randevu ve İş Emri Takibinin Püf Noktaları</a>
          <a href="https://stokpratik.com.tr/blog" style="background: #f1f5f9; padding: 0.8rem 1.2rem; border-radius: 0.5rem; color: #334155; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Yedek Parça Stoklarında OEM Kodlamanın Avantajları</a>
          <a href="https://stokpratik.com.tr/blog" style="background: #f1f5f9; padding: 0.8rem 1.2rem; border-radius: 0.5rem; color: #334155; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Toptan Yedek Parça Satışını B2B ile Nasıl Büyütürsünüz?</a>
        </div>
        <div style="margin-top: 1.5rem;">
          <a href="https://stokpratik.com.tr/blog" style="color: #2563eb; font-weight: 600;">Tüm Blog Yazıları →</a>
        </div>
      </div>
    </div>
  </section>

  <style>
    /* Sector Page Styles */
    :root {
      --sector-primary: #ea580c; /* Otomotiv için sıcak turuncu/kırmızı tonlar */
      --sector-secondary: #c2410c;
      --sector-light: #fff7ed;
    }

    .sector-hero {
      background: linear-gradient(135deg, var(--sector-light), #ffffff);
      padding: 4rem 0;
      overflow: hidden;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: center;
    }

    @media (min-width: 1024px) {
      .hero-grid {
        grid-template-columns: 1.1fr 0.9fr;
      }
    }

    .hero-content .badge {
      display: inline-block;
      background: #fed7aa;
      color: #9a3412;
      padding: 0.4rem 1rem;
      border-radius: 30px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .hero-content h1 {
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.2;
      color: #0f172a;
      margin-bottom: 1.5rem;
    }

    .hero-content p {
      font-size: 1.1rem;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .hero-features {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }

    .feature-item {
      display: flex;
      flex-direction: column;
      background: #fff;
      padding: 1rem;
      border-radius: 0.75rem;
      border-left: 4px solid var(--sector-primary);
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    }
    
    .feature-item strong {
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .feature-item span {
      font-size: 0.9rem;
      color: #64748b;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .hero-image img {
      width: 100%;
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }

    .btn-primary {
      background: var(--sector-primary);
      color: white;
      box-shadow: 0 4px 14px rgba(234, 88, 12, 0.3);
    }
    .btn-primary:hover {
      background: var(--sector-secondary);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(234, 88, 12, 0.4);
    }

    .btn-secondary {
      background: white;
      color: #334155;
      border: 2px solid #cbd5e1;
    }
    .btn-secondary:hover {
      border-color: var(--sector-primary);
      color: var(--sector-primary);
    }
    
    .btn-outline {
      background: transparent;
      color: var(--sector-primary);
      border: 2px solid var(--sector-primary);
    }
    .btn-outline:hover {
      background: var(--sector-primary);
      color: white;
    }

    /* Zorluklar */
    .challenges { background: #f8fafc; }
    .challenges-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
    }
    .challenge-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
      border: 1px solid #f1f5f9;
      transition: 0.3s;
    }
    .challenge-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }
    .challenge-card .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .challenge-card h3 {
      font-size: 1.1rem;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    .challenge-card p {
      font-size: 0.9rem;
      color: #64748b;
    }

    /* Çözümler */
    .solutions { background: white; }
    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
    }
    .solution-card {
      padding: 2rem;
      border-radius: 1rem;
      background: var(--sector-light);
      border-top: 4px solid var(--sector-primary);
    }
    .solution-card .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .solution-card h3 {
      font-size: 1.25rem;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    .solution-card p {
      color: #475569;
      line-height: 1.6;
    }

    /* İstatistikler */
    .stats {
      background: linear-gradient(135deg, #1e293b, #0f172a);
      color: white;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }
    .stat-item {
      padding: 1.5rem;
    }
    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      color: var(--sector-primary);
      margin-bottom: 0.5rem;
    }
    .stat-text {
      font-size: 1rem;
      color: #cbd5e1;
    }

    /* Why Us */
    .why-us { background: white; }
    .why-us-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4rem;
      align-items: center;
    }
    @media (min-width: 768px) {
      .why-us-grid { grid-template-columns: 1fr 1fr; }
    }
    .check-list {
      list-style: none;
      padding: 0;
    }
    .check-list li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: 1.2rem;
      color: #475569;
      line-height: 1.5;
    }
    .check-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      top: 0;
      color: var(--sector-primary);
      font-weight: bold;
      font-size: 1.2rem;
    }

    /* Testimonials */
    .testimonials { background: #f8fafc; }
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .testimonial-card {
      background: white;
      padding: 2.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
      position: relative;
    }
    .testimonial-card p {
      font-style: italic;
      color: #334155;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    .testimonial-card .author {
      color: #0f172a;
    }

    /* FAQ */
    .faq { background: white; }
    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }
    .faq-item {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5rem;
    }
    .faq-item h3 {
      font-size: 1.15rem;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    .faq-item p {
      color: #64748b;
    }

    /* Pricing */
    .pricing { background: #f8fafc; }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      align-items: center;
    }
    .pricing-card {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 1rem;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
      border: 1px solid #e2e8f0;
      position: relative;
    }
    .pricing-card h3 {
      font-size: 1.25rem;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    .pricing-card p {
      color: #64748b;
      margin-bottom: 2rem;
      min-height: 60px;
    }
    .pricing-card.popular {
      border-color: var(--sector-primary);
      box-shadow: 0 10px 30px rgba(234, 88, 12, 0.1);
      transform: scale(1.05);
      z-index: 2;
    }
    @media (max-width: 768px) {
      .pricing-card.popular { transform: scale(1); }
    }
    .popular-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--sector-primary);
      color: white;
      padding: 0.2rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
    }
  </style>
</BaseLayout>
`;

fs.writeFileSync(path.join(__dirname, 'src/pages/oto-servis-ve-yedek-parca-yazilimi.astro'), content, 'utf8');
console.log('Created auto service page.');

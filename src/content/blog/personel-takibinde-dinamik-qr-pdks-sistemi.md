---
title: "Personel Mesai Takibinde Kart Basma Hilelerine Son: Dinamik QR-PDKS Sistemi ⏱️"
description: "İşletmelerde kart basma ve ekran görüntüsü hilelerini sıfırlayan, donanım masrafsız 15 saniyede bir dönen dinamik QR-PDKS personel devam kontrol mimarisi."
author: "Mehmet Fatih"
date: "2026-10-15"
---
İşletmelerde personel yönetimi dendiğinde akla ilk gelen çilelerden biri mesai takibidir. Yıllardır KOBİ'lerin, atölyelerin, mağazaların ve üretim tesislerinin girişinde gördüğümüz o klasik cihazları hatırlayın: Duvara monte edilmiş, sürekli arızalanan kart okuma terminalleri veya tozdan, kirden parmak izini okumayan pahalı biyometrik cihazlar...

Fakat bu geleneksel sistemlerin maliyetinden çok daha büyük bir derdi var: **Güvenilirlik.**

## Birbirinin Yerine Kart Basma ve Mesai Kaçakları

Sahada ter döken hangi işletme sahibine veya mağaza müdürüne sorsanız aynı dertten yakınır:
- İşe geç kalan bir çalışan, servisteki veya binadaki arkadaşına *"Benim kartı da okutuver"* der.
- Turnike başında yığılmalar olur, kartını evde unutan personelle uğraşılır.
- Ay sonu geldiğinde insan kaynakları veya muhasebeci, kimin kaç saat fazla mesai yaptığını, kimin erken çıktığını anlamak için günlerce kamera kayıtlarıyla puantaj tutanaklarını eşleştirmeye çalışır.

Peki, dijitalleşen dünyada işletmeler bu sorunu nasıl çözüyor?

## Statik Karekodlar Neden İşe Yaramaz?

Bazı işletmeler donanım maliyetinden kaçmak için duvara basit bir kağıt karekod (QR Kod) yapıştırarak personelin telefonla okutmasını deniyor. Ancak çok geçmeden karşılaşılan tablo şu oluyor:
Uyanık bir personel duvardaki QR kodun fotoğrafını çekip WhatsApp grubundan dışarıdaki arkadaşına gönderiyor. Arkadaşı henüz evden çıkmadan veya trafikteyken o fotoğrafı kendi ekranından okutarak *"İşyerindeyim"* bildirimi yapabiliyor.

İşte tam bu noktada teknolojiye akıl katmak gerekiyor.

## Çözüm: 15 Saniyede Bir Kendini İmha Eden Dinamik QR Kiosk

Stok Pratik QR-PDKS modülü, işletmeleri pahalı parmak izi okuyucularından ve aldatılabilir kart sistemlerinden tamamen kurtarıyor.

Sistemin arkasında çalışan güvenlik mimarisi şöyle işler:

1. **15 Saniyede Bir Dönen Kriptografik QR Kod (HMAC-SHA256):**  
   İş yerinin girişindeki bir tablete veya bilgisayar ekranına Stok Pratik Kiosk ekranı açılır. Buradaki QR kod her 15 saniyede bir tamamen değişir. Bir personel ekranın fotoğrafını çekip arkadaşına atsa dahi, o kod 15 saniye sonra geçersiz hale gelir.
2. **Cihaz Kilidi (Tek Personel - Tek Telefon):**  
   Her personelin hesabı yalnızca kendi akıllı telefonuna kilitlenir. Başka birinin telefonundan sisteme giriş yapılamaz.
3. **Coğrafi Konum Doğrulaması (GPS Kilidi):**  
   Karekod okutulduğu anda personelin telefonundaki konum verisi kontrol edilir. İşletme sınırları (belirlenen koordinat alanı) dışında yapılan hiçbir okutma sisteme kabul edilmez.

## Canlı Takip ve Tek Tıkla SGK Puantaj Cetveli

Sistem sadece girişi çıkışı kaydetmekle kalmaz; yöneticinin cebindeki Stok Pratik paneline anlık bildirim düşürür:
- Şu an kaç kişi mesaide?
- Kimler molada?
- Kim vardiyasına geç kaldı veya erken ayrıldı?

Ay sonu geldiğinde ise muhasebecinin veya patronun saatlerce hesap yapmasına gerek kalmaz. Toplam çalışma saatleri, fazla mesailer, eksik günler ve molalar tek tıkla resmi **SGK Bordro Puantaj Cetveli** formatında Excel olarak indirilir.

Personel takibini donanım maliyetsiz, hilesiz ve %100 şeffaf bir şekilde yönetmek için [Stok Pratik'i hemen ücretsiz deneyin](/firma-kaydi).

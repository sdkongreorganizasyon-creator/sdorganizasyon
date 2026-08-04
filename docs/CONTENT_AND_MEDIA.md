# İçerik ve Medya Yönetimi

## Kaynak metinler

Kurumsal, hizmet, organizasyon süreci ve yasal içerikler kullanıcı tarafından sağlanan dokümanlardan aktarılmıştır.

Kaynakta bulunmayan:

- müşteri adı
- proje sayısı
- referans
- ödül
- sertifika
- performans yüzdesi
- katılımcı sayısı

üretilmemiştir.

## Doğrulanması gereken kaynak iddiaları

Kaynak metinde yer alan aşağıdaki ifadeler canlı yayın öncesinde şirket tarafından doğrulanmalıdır:

- Türkiye genelinde aynı kalite standardında operasyon
- Türkiye'nin en güçlü ve en çok tercih edilen markalarından biri olma hedefi
- Mobil uygulama, canlı yayın, ödeme ve gerçek zamanlı takip özellikleri
- Yatırım geri dönüşü analizi
- Bildiri ve sponsorluk yönetim sistemi
- En yüksek güvenlik standartları

Doğrulanmayan hizmet veya özellikler yayımlanmamalıdır.

## Projeler

Proje eklerken:

- Gerçek proje adı
- Müşteri/kurum yayın izni
- Tarih ve şehir
- Kullanılan hizmetler
- İhtiyaç
- Çözüm
- Doğrulanabilir sonuç
- Kullanım izni bulunan fotoğraf/video

girilmelidir.

Sahte örnek proje oluşturmayın.

## Referanslar

Referans eklerken:

- Logo kullanım izni
- Doğru kurum adı
- Güncel logo
- Onaylı web sitesi
- Varsa onaylanmış başarı hikâyesi

kullanılmalıdır.

## Medya teknik kriterleri

### Logo

- SVG tercih edilir.
- Şeffaf arka plan kullanılmalıdır.
- Koyu ve açık zemin varyantları hazırlanmalıdır.
- Header için yatay/kompakt sürüm bulunmalıdır.
- Favicon için sade işaret hazırlanmalıdır.

### Hero video

- Desktop: optimize 1080p
- Mobil: optimize 720p veya poster
- 24/30 FPS
- 12–25 saniye
- WebM ve MP4
- Sessiz, döngülü ve `playsInline`
- Yüksek kaliteli poster

4K 60 FPS zorunlu değildir.

### Görseller

- Proje kapak: en az 2000 px
- Galeri: en az 1600 px
- Blog kullanılmadığı için blog görseli gerekmez
- AVIF/WebP tercih edilir
- Alt metin görsel bağlamına göre yazılır
- Kişisel veri veya okunabilir yaka kartı içeren görseller dikkatle kontrol edilir

## Yüklenen logo görseli

`docs/source/LOGOLAR.jpeg` tabela uygulaması görselidir. İçinde:

- iki farklı tabela
- arka plan
- montaj delikleri
- gölge

bulunduğu için doğrudan web logosu olarak kullanılmamıştır.

Kod içinde geçici, temiz bir SVG yorum bulunur. Orijinal vektör logo sağlandığında:

```text
src/components/brand/logo.tsx
src/app/icon.svg
```

dosyaları marka dosyasıyla güncellenmelidir.

# SDKONGRE Medya Kaynakları

Bu sürümde üçüncü taraf, kaynağı belirsiz veya filigranlı stok medya kullanılmamıştır. Paket içindeki görseller iki güvenli kaynaktan üretilmiştir:

1. Kullanıcının sağladığı orijinal logo dosyası.
2. Kullanıcının onayladığı SDKONGRE tasarım görseli ve bu proje için OpenAI tarafından oluşturulan tasarım görselleri.

Bu yaklaşım, doğrulanamayan üçüncü taraf stok lisanslarının projeye girmesini engeller. Gerçek proje, müşteri veya referans görseli izlenimi verilmez.

## Marka Varlıkları

| Dosya | Kullanım | Kaynak | İşlem | Ticari kullanım durumu |
|---|---|---|---|---|
| `public/brand/sdkongre-logo-web.png` | Header, footer ve admin | Kullanıcının yüklediği `Logo(2).png` | En-boy oranı korunarak yüksek çözünürlüğe ölçeklendirildi; logo geometrisi ve renkleri değiştirilmedi | Kullanıcı tarafından sağlanan kurumsal varlık |
| `public/brand/sdkongre-logo-8k.png` | 8K arşiv kaynak | Kullanıcının yüklediği `Logo(2).png` | 8192 piksel genişliğe Lanczos yöntemiyle ölçeklendirildi; şeffaflık korundu | Kullanıcı tarafından sağlanan kurumsal varlık |
| `public/brand/sdkongre-favicon.png` | Favicon | Kullanıcının yüklediği `Logo(2).png` | Şeffaf kare tuvale oranı korunarak yerleştirildi | Kullanıcı tarafından sağlanan kurumsal varlık |

## Ana Sayfa

| Dosya | Sayfa / Bölüm | Kaynak | Lisans / kullanım türü |
|---|---|---|---|
| `public/media/home/sdkongre-approved-hero.webp` | Ana sayfa hero | Kullanıcının onayladığı tasarım görselinden etkinlik atmosferi kırpımı | Kullanıcı tarafından onaylanan proje tasarım varlığı |
| `docs/APPROVED_HOME_REFERENCE.png` | Tasarım referansı | Kullanıcının yüklediği onaylı ana sayfa görseli | Yalnız tasarım karşılaştırma referansı |

## Fiziksel Hizmet Kartları

Aşağıdaki dosyalar kullanıcı tarafından onaylanan tasarım görseli ve bu proje için oluşturulmuş OpenAI tasarım görsellerindeki etkinlik sahnelerinden hazırlanmıştır. Görseller başka firma projesi veya gerçek SDKONGRE referansı olarak sunulmaz; yalnız hizmet anlatımı amacıyla kullanılır.

- `public/media/services/physical/lansman-ve-kurumsal-etkinlikler.webp`
- `public/media/services/physical/kongre-organizasyonlari.webp`
- `public/media/services/physical/toplanti-ve-sempozyum-yonetimi.webp`
- `public/media/services/physical/workshop-organizasyonlari.webp`
- `public/media/services/physical/fuar-ve-sergi-organizasyonlari.webp`
- `public/media/services/physical/seyahat-ve-konaklama-yonetimi.webp`
- `public/media/services/physical/transfer-ve-lojistik-yonetimi.webp`
- `public/media/services/physical/tedarikci-ve-operasyon-yonetimi.webp`

Kaynak platform: Kullanıcı onaylı proje tasarımı / OpenAI proje görsel üretimi  
İçerik üreticisi: OpenAI ve kullanıcı tarafından sağlanan referans  
Kullanım türü: SDKONGRE web sitesi tasarım ve hizmet anlatımı  
Hazırlama tarihi: 2026-08-05

## Dijital Hizmet Kartları

- `public/media/services/digital/katilimci-ve-kayit-yonetimi.webp`
- `public/media/services/digital/dijital-altyapi-ve-etkinlik-teknolojileri.webp`
- `public/media/services/digital/qr-kod-ve-yaka-kart-sistemleri.webp`
- `public/media/services/digital/online-davet-ve-iletisim-yonetimi.webp`
- `public/media/services/digital/organizasyon-takip-sistemleri.webp`
- `public/media/services/digital/veri-ve-raporlama-sistemleri.webp`
- `public/media/services/digital/veri-guvenligi-ve-merkezi-yonetim.webp`

Kaynak platform: OpenAI proje görsel üretimi  
Kullanım türü: Teknoloji ve dijital hizmet anlatımı  
Hazırlama tarihi: 2026-08-05

## İç Sayfa Görselleri

- `public/media/pages/kurumsal.webp`
- `public/media/pages/neden-biz.webp`
- `public/media/pages/organizasyon-sureci.webp`
- `public/media/pages/projeler.webp`
- `public/media/pages/referanslar.webp`
- `public/media/pages/iletisim.webp`
- `public/media/pages/kvkk.webp`

Bu görseller yalnız atmosfer ve sektör temsili amacıyla kullanılır. Gerçek müşteri, proje veya başarı hikâyesi olarak sunulmaz.

## Yeni Medya Eklerken

Admin panelindeki Medya Kütüphanesi üzerinden eklenecek her yeni medya için aşağıdaki bilgiler tutulmalıdır:

- Dosya adı
- Kullanıldığı sayfa ve bölüm
- Kaynak platform
- Kaynak sayfa bağlantısı
- Fotoğrafçı veya içerik üreticisi
- Lisans türü
- Ticari kullanım durumu
- İndirme tarihi

Kaynağı ve ticari kullanım hakkı doğrulanamayan medya eklenmemelidir.

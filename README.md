# SDKONGRE Web

Bu repository, SDKONGRE Design Bible v2.0 esas alınarak hazırlanmış kurumsal web sitesi, Supabase veritabanı ve yönetim panelidir.

## Kurulum yöntemi

Bu proje için terminal kullanmanız gerekmez.

Tarayıcı üzerinden yapılacak bütün işlemler şu rehberde adım adım açıklanmıştır:

**`BROWSER_ONLY_KURULUM.md`**

İşlem sırası:

1. GitHub'a kodları yükleme
2. Supabase veritabanını kurma
3. Vercel'e bağlama ve yayınlama
4. Natro domainini Vercel'e yönlendirme
5. Admin paneline giriş ve son kontroller

## Değiştirilemez proje kararları

- Menü başlıkları `src/config/navigation.ts` içinde kilitlidir.
- Ana sayfa yalnız şu bölümlerden oluşur:
  1. Üst Banner
  2. Header
  3. Tam Ekran Hero
  4. Beş Premium Değer Kartı
  5. Footer
- Sahte proje, referans, istatistik veya müşteri bilgisi bulunmaz.
- Proje ve referans sayfaları gerçek kayıt gelene kadar kontrollü boş durum gösterir.
- Admin panelinden menü başlıkları veya tasarım sistemi değiştirilemez.
- Supabase değişiklikleri migration dosyalarıyla sürümlenir.
- Gizli anahtarlar GitHub'a yüklenmez.

## Teknik yapı

- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security
- Vercel
- GitHub Actions
- Resend
- Cloudflare Turnstile
- Vitest
- Playwright

## Repository içeriği

- Tüm public sayfalar
- Erişilebilir tam ekran menü
- Hero video/poster altyapısı
- Kurumsal ve hizmet sayfaları
- Organizasyon süreci
- Proje ve referans alanları
- KVKK ve yasal sayfalar
- İletişim formu
- Dört adımlı teklif formu
- Çerez tercih merkezi
- SEO, sitemap, robots ve JSON-LD
- Supabase migration ve seed dosyaları
- Rol tabanlı admin paneli
- Audit log ve içerik sürüm geçmişi
- Planlı yayın altyapısı

## Gerçek bilgi gerektiren alanlar

Canlı yayından önce şu gerçek bilgiler eklenmelidir:

- Orijinal şeffaf SVG logo
- Hero video veya poster
- Telefon, e-posta, adres ve WhatsApp
- Sosyal medya bağlantıları
- Gerçek proje kayıtları
- İzinli referans logoları
- Son hukuk kontrolünden geçmiş yasal metinler

Tabela JPEG'i web logosu olarak kullanılmamıştır. Kod içinde geçici temiz SVG marka yorumu bulunmaktadır.


## Onaylı Tasarım ve CMS Güncellemesi — 2026-08-05

Bu sürüm, kullanıcı tarafından onaylanan koyu lacivert/altın ana sayfa kompozisyonunu, şeffaf orijinal SDKONGRE logosunu, tek sayfalık Hizmetlerimiz ve Dijital Hizmetler kartlarını ve profesyonel admin ayar akışını içerir.

- Tasarım referansı: `docs/APPROVED_HOME_REFERENCE.png`
- Uygulama raporu: `docs/IMPLEMENTATION_20260805.md`
- Medya kayıtları: `docs/MEDIA_SOURCES.md`
- Tarayıcı kurulum adımları: `docs/BROWSER_UPDATE_20260805.md`

Domain ve Natro DNS işlemleri bu sürüm kapsamında yapılmamıştır.

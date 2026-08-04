# Güvenlik ve Bakım Rehberi

## Güvenlik ilkeleri

- Supabase RLS politikalarını kapatmayın.
- Service Role anahtarını browser'a göndermeyin.
- `.env.local` dosyasını GitHub'a yüklemeyin.
- Admin hesaplarında benzersiz güçlü parola kullanın.
- Mümkünse Supabase MFA etkinleştirin.
- En az ayrıcalık ilkesini uygulayın.
- Ayrılan kullanıcıların erişimini hemen kapatın.
- Yasal ve kişisel veri kayıtlarını gereğinden uzun saklamayın.

## Rol modeli

- `super_admin`: kullanıcı, ayar ve tüm içerikler
- `admin`: içerik, proje, referans, lead ve yayın
- `editor`: içerik ve yayın
- `content_author`: taslak ve review
- `sales_ops`: iletişim ve teklif kayıtları
- `viewer`: salt okunur yetkili görünüm

İlk kullanıcı dışındaki herkese varsayılan olarak en düşük gerekli rol verilmelidir.

## Anahtar rotasyonu

Aşağıdaki durumlarda anahtarları değiştirin:

- Yetkisiz erişim şüphesi
- Anahtarın yanlışlıkla GitHub'a yüklenmesi
- Çalışanın ayrılması
- Üçüncü taraf hizmet ihlali
- Düzenli güvenlik periyodu

Değiştirilecek değerler:

- Supabase Service Role
- Database parolası/URL
- Resend API key
- Turnstile secret
- Vercel team tokenları

## Form güvenliği

Form akışı:

1. İstemci Zod doğrulaması
2. Sunucu Zod doğrulaması
3. Honeypot
4. Turnstile
5. IP hash tabanlı rate limit
6. Supabase kayıt
7. E-posta gönderimi
8. Form event log

E-posta başarısız olduğunda lead veritabanında kalır.

## Loglar

Kontrol edilecek alanlar:

- Vercel build ve runtime logları
- `form_events`
- `audit_logs`
- Supabase Auth logları
- Turnstile dashboard
- Resend delivery logları

Loglara açık kişisel veri yazmamaya dikkat edin.

## Backup

- Supabase otomatik backup
- Kritik yayın öncesi mantıksal export
- Storage medya envanteri
- GitHub migration/seed sürümleri
- Altı ayda bir restore testi

## Periyodik bakım

### Her yayın

- Build
- Smoke test
- Form testi
- Kritik route kontrolü

### Haftalık

- Form teslimleri
- Runtime hataları
- Spam
- Uptime

### Aylık

- Dependency güncellemeleri
- Kullanıcı yetkileri
- Storage kullanımı
- Broken link kontrolü

### Üç aylık

- Lighthouse/Web Vitals
- Mobil cihaz kontrolü
- İçerik güncelliği
- SEO teknik kontrol

### Altı aylık

- RLS incelemesi
- Restore testi
- Güvenlik erişim incelemesi

### Yıllık

- Domain ve DNS
- SSL
- MX/SPF/DKIM/DMARC
- KVKK ve çerez metinleri
- Kurumsal hesap sahipliği

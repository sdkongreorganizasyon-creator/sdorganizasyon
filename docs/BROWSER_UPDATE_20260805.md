# SDKONGRE Tarayıcı Üzerinden Güncelleme

Terminal kullanılmayacaktır. Domain ve Natro işlemleri bu aşamada yapılmayacaktır.

## 1. GitHub'a Yükleme

1. `SDKONGRE_APPROVED_DESIGN_PATCH.zip` dosyasını bilgisayarınızda ayıklayın.
2. GitHub'da `sdorganizasyon` repository ana sayfasını açın.
3. `Add file → Upload files` seçin.
4. Ayıklanan klasörün içindeki bütün dosya ve klasörleri yükleme alanına sürükleyin.
5. Dıştaki paket klasörünü tek klasör olarak yüklemeyin.
6. Commit mesajı:
   `feat: apply approved SDKONGRE design and CMS update`
7. `Commit directly to the main branch` seçili kalsın.
8. `Commit changes` düğmesine basın.

Silinmesi gereken üç eski dosya GitHub tarayıcı yüklemesiyle otomatik silinmez:

- `src/app/icon.svg`
- `src/components/layout/top-banner.tsx`
- `src/components/pages/page-cta.tsx`
- `public/fallback/hero-poster.svg`

GitHub'da bu dosyaları tek tek açın, çöp kutusu / Delete file seçeneğine basın ve aynı branch'e commit edin.

## 2. GitHub Actions

1. `Actions → Quality` bölümünü açın.
2. Yeni çalışmanın yeşil olmasını bekleyin.
3. Ardından `Actions → E2E → Run workflow` seçin.
4. Branch `main` kalsın.
5. E2E sonucunun yeşil olmasını bekleyin.

## 3. Vercel

GitHub commit sonrası Vercel otomatik deployment başlatır.

1. `Vercel → sdorganizasyon → Deployments`
2. En yeni deployment sonucunun `Ready` olmasını bekleyin.
3. Yeni environment variable eklenmesi gerekmez.
4. Domain eklemeyin.

## 4. Admin Ayarları

1. Geçici Vercel adresinde `/admin/settings` açın.
2. `Marka ve Logo` sekmesinde aşağıdaki yollar görünmelidir:
   - `/brand/sdkongre-logo-web.png`
   - `/brand/sdkongre-favicon.png`
3. `Ana Sayfa Hero` sekmesinde poster:
   - `/media/home/sdkongre-approved-hero.webp`
4. İletişim bilgilerini girip Kaydet'e basın.
5. Public siteyi yenileyin; footer ve iletişim sayfası redeploy olmadan güncellenmelidir.
6. Beş ana sayfa kartını kontrol edip bir kez kaydedin.

## 5. Kontrol Edilecek Sayfalar

- `/`
- `/hizmetlerimiz`
- `/dijital-hizmetler`
- `/kurumsal`
- `/neden-biz`
- `/organizasyon-sureci`
- `/iletisim`
- `/admin`
- `/admin/settings`
- `/admin/media`
- `/api/health`

## 6. Beklenen Sonuç

- Ana sayfa onaylı koyu lacivert ve altın kompozisyonda görünür.
- Sağda “Neden Biz?” paneli bulunur.
- Beş görselli ana hizmet kartı görünür.
- Hizmet ve dijital hizmet kartları başka sayfaya yönlendirmez.
- Footer kompakt görünür.
- `.env.local` mesajı görünmez.
- Admin iletişim kaydı public siteye yansır.
- Domain henüz bağlı değildir.

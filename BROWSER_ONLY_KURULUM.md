# SDKONGRE — Tarayıcı Üzerinden Kurulum Rehberi

Bu rehberde terminal kullanılmaz. İşlemler yalnızca şu panellerden yapılır:

1. GitHub
2. Supabase
3. Vercel
4. Natro

## Çok önemli güvenlik kuralı

Aşağıdaki bilgileri GitHub dosyalarına, açıklama alanlarına veya herkese açık yerlere yazmayın:

- Supabase Secret Key
- Eski Supabase Service Role Key
- Resend API Key
- Turnstile Secret Key
- Natro, GitHub, Supabase veya Vercel şifresi
- Database şifresi

Bu değerler yalnızca Vercel'in **Environment Variables** ekranına girilecektir.

---

# BÖLÜM 1 — GitHub'a kodları yükleme

## 1. GitHub repository oluşturun

1. GitHub hesabınıza tarayıcıdan giriş yapın.
2. Sağ üstteki **+** simgesine basın.
3. **New repository** seçin.
4. Şu bilgileri girin:

```text
Repository name: sdkongre-web
Description: SDKONGRE kurumsal web sitesi ve yönetim paneli
Visibility: Private
```

5. Şu seçenekleri işaretlemeyin:
   - Add a README file
   - Add .gitignore
   - Choose a license
6. **Create repository** düğmesine basın.

## 2. Kod paketini bilgisayarınızda açın

İndirdiğiniz ana ZIP dosyasına sağ tıklayın ve **Tümünü Ayıkla** seçin.

GitHub tarayıcı ekranı aynı anda en fazla 100 dosya yüklediği için proje üç parça hâlinde yüklenecektir. Hazırlanan üç tarayıcı yükleme ZIP'ini de ayrı klasörlere çıkarın.

## 3. Birinci parçayı yükleyin

1. GitHub'daki boş `sdkongre-web` repository sayfasını açın.
2. **Add file → Upload files** seçin.
3. `01_GITHUB_ROOT` klasörünün **içindeki bütün dosya ve klasörleri** yükleme alanına sürükleyin.
4. Alt taraftaki commit mesajına şunu yazın:

```text
chore: add SDKONGRE project root
```

5. **Commit changes** düğmesine basın.

Bu bölümde `package.json`, `next.config.ts`, `supabase`, `public`, `docs` ve diğer temel dosyalar yüklenecektir. `.github` klasörü son parçada yüklenecektir.

## 4. İkinci parçayı yükleyin

1. Repository ana sayfasına geri dönün.
2. **Add file → Upload files** seçin.
3. `02_GITHUB_SRC_APP_COMPONENTS` klasörünün içindeki `src` klasörünü sürükleyin.
4. Commit mesajı:

```text
feat: add application pages and components
```

5. **Commit changes** düğmesine basın.

## 5. Üçüncü parçayı yükleyin

1. Repository ana sayfasına geri dönün.
2. **Add file → Upload files** seçin.
3. `03_GITHUB_SRC_OTHER` klasörünün içindeki `src` ve `.github` klasörlerini birlikte sürükleyin.
4. Commit mesajı:

```text
feat: add application configuration and libraries
```

5. **Commit changes** düğmesine basın.

Aynı isimli `src` klasörü mevcut klasörle birleşir; var olan dosyalar silinmez. `.github` klasörü bu son adımda geldiği için otomatik kalite kontrolleri proje tamamen yüklendikten sonra başlar.

## 6. GitHub kontrolü

Repository ana sayfasında en az şu öğeleri görmelisiniz:

```text
.github
docs
public
scripts
src
supabase
.env.example
package.json
next.config.ts
tsconfig.json
vercel.json
README.md
```

`src` klasörünün içinde şunlar bulunmalıdır:

```text
app
components
config
content
lib
types
proxy.ts
```

`.env.local` veya gerçek gizli anahtar içeren bir dosya yüklemeyin.

---

# BÖLÜM 2 — Supabase kurulumu

## 1. Proje oluşturun

1. Supabase hesabınıza tarayıcıdan giriş yapın.
2. **New project** seçin.
3. Proje adı:

```text
sdkongre-production
```

4. Güçlü bir database şifresi oluşturun ve güvenli bir yerde saklayın.
5. Türkiye'ye yakın bir Avrupa bölgesi seçin.
6. Projenin kurulmasını bekleyin.

## 2. Veritabanı yapısını kurun

1. Bilgisayarınızda ana proje klasörünü açın.
2. Şu dosyayı bir metin düzenleyicide açın:

```text
supabase/migrations/202608040001_initial_schema.sql
```

3. Dosyanın içindeki metnin tamamını kopyalayın.
4. Supabase panelinde **SQL Editor** bölümünü açın.
5. **New query** seçin.
6. Kopyaladığınız SQL metnini yapıştırın.
7. **Run** düğmesine basın.
8. Hata mesajı çıkmamasını bekleyin.

Bu işlem tabloları, kullanıcı rollerini, RLS güvenlik kurallarını ve Storage alanlarını oluşturur.

## 3. Başlangıç içeriklerini yükleyin

1. Bilgisayarınızda şu dosyayı açın:

```text
supabase/seed.sql
```

2. İçeriğin tamamını kopyalayın.
3. Supabase panelinde **SQL Editor → New query** seçin.
4. Metni yapıştırın.
5. **Run** düğmesine basın.

Bu işlem kurumsal sayfaları, hizmetleri, organizasyon sürecini, yasal metinleri ve ana sayfadaki beş değer kartını ekler.

Gerçek proje ve referans bilgisi olmadığı için sahte proje veya sahte referans eklenmez.

## 4. Supabase anahtarlarını alın

Supabase panelinde:

```text
Settings → API Keys
```

bölümüne girin.

Şu üç değeri ayrı ve güvenli bir notta tutun:

```text
Project URL
Publishable key
Secret key
```

Vercel'de karşılıkları şöyle olacaktır:

```text
Project URL      → NEXT_PUBLIC_SUPABASE_URL
Publishable key  → NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
Secret key       → SUPABASE_SECRET_KEY
```

**Secret key'i GitHub'a yazmayın.**

## 5. İlk yönetici hesabını oluşturun

1. Supabase panelinde **Authentication → Users** bölümüne girin.
2. **Add user** seçin.
3. **Create new user** veya panelde görünen eşdeğer seçeneği kullanın.
4. Kendi yönetici e-posta adresinizi girin.
5. Güçlü bir şifre belirleyin.
6. Kullanıcıyı oluşturun.

Sonra:

1. **SQL Editor → New query** seçin.
2. Aşağıdaki sorguyu yapıştırın.
3. `SIZIN_EPOSTANIZ` kısmını kendi e-posta adresinizle değiştirin.

```sql
update public.profiles
set
  role = 'super_admin'::public.user_role,
  active = true
where id = (
  select id
  from auth.users
  where email = 'SIZIN_EPOSTANIZ'
);
```

4. **Run** düğmesine basın.

## 6. Storage kontrolü

Supabase panelinde **Storage** bölümünü açın. Şu alanlar görünmelidir:

```text
public-site-media
project-media
reference-logos
legal-files
private-form-uploads
```

---

# BÖLÜM 3 — Vercel kurulumu

## 1. GitHub repository'yi bağlayın

1. Vercel hesabınıza tarayıcıdan giriş yapın.
2. **Add New → Project** seçin.
3. GitHub bağlantısı istenirse izin verin.
4. Listeden `sdkongre-web` repository'sini seçin.
5. **Import** düğmesine basın.

Ayarlar:

```text
Framework Preset: Next.js
Root Directory: ./
Production Branch: main
```

Build ve Install alanlarını değiştirmeyin; Vercel otomatik ayarları kullansın.

## 2. İlk environment değişkenlerini ekleyin

Deploy ekranındaki **Environment Variables** bölümüne aşağıdaki adları tek tek ekleyin.

### Zorunlu site ayarları

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SITE_INDEXABLE
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
RATE_LIMIT_SALT
CRON_SECRET
```

İlk değerler:

```text
NEXT_PUBLIC_SITE_URL = https://www.sdkongre.com
NEXT_PUBLIC_SITE_INDEXABLE = false
```

Supabase değerlerini bir önceki bölümden alın:

```text
NEXT_PUBLIC_SUPABASE_URL = Supabase Project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = Supabase Publishable key
SUPABASE_SECRET_KEY = Supabase Secret key
```

`RATE_LIMIT_SALT` ve `CRON_SECRET` için parola yöneticinizin oluşturduğu, birbirinden farklı, en az 32 karakterlik iki rastgele değer kullanın.

### Gerçek iletişim bilgileri

Aşağıdaki değişkenleri gerçek bilgilerinizle doldurun:

```text
NEXT_PUBLIC_CONTACT_PHONE
NEXT_PUBLIC_CONTACT_MOBILE
NEXT_PUBLIC_CONTACT_EMAIL
NEXT_PUBLIC_CONTACT_ADDRESS
NEXT_PUBLIC_CONTACT_WHATSAPP
NEXT_PUBLIC_WORKING_HOURS
NEXT_PUBLIC_MAP_URL
```

WhatsApp numarasını boşluksuz ülke koduyla girin:

```text
905XXXXXXXXX
```

### Sosyal medya

Kullandıklarınızı ekleyin; kullanmadıklarınızı eklemeyebilirsiniz:

```text
NEXT_PUBLIC_INSTAGRAM_URL
NEXT_PUBLIC_LINKEDIN_URL
NEXT_PUBLIC_YOUTUBE_URL
NEXT_PUBLIC_X_URL
```

### Hero medya

Gerçek video veya poster henüz yoksa bu alanları ilk aşamada eklemeyebilirsiniz. Geçici poster otomatik kullanılır.

```text
NEXT_PUBLIC_HERO_POSTER
NEXT_PUBLIC_HERO_VIDEO_DESKTOP
NEXT_PUBLIC_HERO_VIDEO_MOBILE
```

### Form e-posta bildirimi — isteğe bağlı

Resend hesabı hazır olduğunda:

```text
CONTACT_TO_EMAIL
EMAIL_FROM
RESEND_API_KEY
```

### Spam koruması — isteğe bağlı fakat önerilir

Cloudflare Turnstile hesabı hazır olduğunda:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

### Analitik — isteğe bağlı

```text
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_META_PIXEL_ID
```

## 3. İlk deploy

1. Environment değişkenlerini kaydedin.
2. **Deploy** düğmesine basın.
3. Kurulumun tamamlanmasını bekleyin.
4. Sonuç **Ready** olursa verilen `vercel.app` adresini açın.

Kontrol edilecek adresler:

```text
/
 /kurumsal
 /hizmetlerimiz
 /dijital-hizmetler
 /organizasyon-sureci
 /projeler
 /referanslar
 /kvkk
 /iletisim
 /teklif-al
 /admin
 /api/health
```

## 4. Supabase Auth URL ayarları

Vercel size geçici bir `vercel.app` adresi verdikten sonra Supabase'e dönün.

Supabase:

```text
Authentication → URL Configuration
```

Geçici olarak:

```text
Site URL: https://VERCEL-PROJE-ADRESINIZ.vercel.app
Redirect URL: https://VERCEL-PROJE-ADRESINIZ.vercel.app/auth/callback
```

ekleyin.

Natro domain bağlantısı tamamlandığında bunları `https://www.sdkongre.com` olarak güncelleyeceksiniz.

## 5. Environment değişikliği sonrası

Vercel'de bir Environment Variable değiştirdiğinizde:

1. **Deployments** bölümüne girin.
2. Son deployment'ın yanındaki üç nokta menüsünü açın.
3. **Redeploy** seçin.

Değişiklikler eski deployment'a geriye dönük uygulanmaz.

## 6. Admin paneli

Tarayıcıda:

```text
https://VERCEL-PROJE-ADRESINIZ.vercel.app/admin
```

adresini açın.

Supabase'te oluşturduğunuz yönetici e-posta ve şifresiyle giriş yapın.

---

# BÖLÜM 4 — Natro domain bağlantısı

Bu işlemi yalnız Vercel sitesi düzgün çalıştıktan sonra yapın.

## 1. Vercel'e domainleri ekleyin

Vercel projesinde:

```text
Settings → Domains
```

bölümüne girin.

Şu iki domaini ayrı ayrı ekleyin:

```text
sdkongre.com
www.sdkongre.com
```

Vercel ekranda gerekli DNS kayıtlarını gösterecektir. Natro'ya yalnız Vercel'in sizin projeniz için gösterdiği güncel değerleri girin.

## 2. Natro kayıtlarını yedekleyin

Natro paneline giriş yapın.

Domain yönetimi veya DNS yönetimi ekranında mevcut kayıtların ekran görüntüsünü alın:

```text
A
CNAME
MX
TXT
SPF
DKIM
DMARC
```

Özellikle e-posta kayıtlarını kaybetmeyin.

## 3. Web kayıtlarını değiştirin

Natro'da DNS yönetimi ekranında:

- Ana domain `sdkongre.com` için Vercel'in gösterdiği **A** kaydını,
- `www.sdkongre.com` için Vercel'in gösterdiği **CNAME** kaydını,
- Vercel isterse doğrulama için gösterdiği **TXT** kaydını

aynen girin.

Aynı `@` veya `www` adına ait eski web hosting kayıtları çakışıyorsa, yalnız bu eski web kayıtlarını kaldırın.

## 4. E-posta kayıtlarını koruyun

Şunları silmeyin veya değiştirmeyin:

```text
MX
SPF
DKIM
DMARC
```

Bunlar e-posta hizmetiniz için gereklidir.

## 5. Vercel doğrulamasını bekleyin

Vercel **Domains** ekranında domainlerin yanında doğrulama tamamlanana kadar bekleyin.

Durum hazır olduğunda Vercel SSL sertifikasını otomatik oluşturur.

Ana adres olarak önerilen seçim:

```text
https://www.sdkongre.com
```

`https://sdkongre.com` adresini `www` adresine yönlendirin. Bu ayar Vercel Domains ekranındaki **Redirect to** seçeneğinden yapılabilir.

---

# BÖLÜM 5 — Domain sonrası son güncellemeler

## 1. Vercel site URL

Vercel:

```text
Settings → Environment Variables
```

alanında:

```text
NEXT_PUBLIC_SITE_URL = https://www.sdkongre.com
```

olduğunu kontrol edin.

Sonra yeniden **Redeploy** yapın.

## 2. Supabase Auth URL

Supabase:

```text
Authentication → URL Configuration
```

alanını şu şekilde güncelleyin:

```text
Site URL: https://www.sdkongre.com
Redirect URL: https://www.sdkongre.com/auth/callback
```

Geçici Vercel callback adresini isterseniz ek redirect olarak tutabilirsiniz.

## 3. Google indekslemesi

Bütün içerikler, formlar, KVKK metinleri ve domain kontrolü tamamlanana kadar:

```text
NEXT_PUBLIC_SITE_INDEXABLE = false
```

kalsın.

Site tamamen hazır olduğunda Vercel'de:

```text
NEXT_PUBLIC_SITE_INDEXABLE = true
```

yapın ve yeniden deploy edin.

---

# BÖLÜM 6 — Son kontrol listesi

## GitHub

- [ ] Repository `sdkongre-web` adıyla oluşturuldu.
- [ ] Üç yükleme parçası başarıyla yüklendi.
- [ ] `src`, `supabase`, `public` ve `.github` klasörleri görünüyor.
- [ ] GitHub içinde gerçek gizli anahtar yok.

## Supabase

- [ ] Migration SQL başarılı çalıştı.
- [ ] Seed SQL başarılı çalıştı.
- [ ] Storage bucketları oluştu.
- [ ] Yönetici kullanıcısı oluşturuldu.
- [ ] Kullanıcı rolü `super_admin` oldu.

## Vercel

- [ ] GitHub repository bağlandı.
- [ ] Build durumu `Ready`.
- [ ] Environment Variables girildi.
- [ ] `/api/health` açılıyor.
- [ ] `/admin` giriş ekranı açılıyor.
- [ ] İletişim ve teklif formları test edildi.

## Natro

- [ ] Vercel'in gösterdiği A kaydı girildi.
- [ ] Vercel'in gösterdiği CNAME kaydı girildi.
- [ ] Gerekli TXT doğrulama kaydı girildi.
- [ ] MX/SPF/DKIM/DMARC kayıtları korundu.
- [ ] `www.sdkongre.com` HTTPS ile açılıyor.

## Canlı yayın

- [ ] Gerçek logo eklendi.
- [ ] Gerçek iletişim bilgileri eklendi.
- [ ] Yasal metinler kontrol edildi.
- [ ] Sahte proje veya referans eklenmedi.
- [ ] Mobil ve masaüstü görünüm kontrol edildi.
- [ ] `NEXT_PUBLIC_SITE_INDEXABLE=true` yapıldı.

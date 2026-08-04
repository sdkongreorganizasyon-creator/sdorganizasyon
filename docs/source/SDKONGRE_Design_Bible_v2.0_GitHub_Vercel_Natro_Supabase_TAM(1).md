
> SDKONGRE DIGITAL EXPERIENCE BIBLE v2.0 GitHub + Vercel + Natro + Supabase Uygulama ve Yayın Mimarisi TAM REVİZE SÜRÜM  •  AĞUSTOS 2026

Mevcut doküman incelenerek; menü başlıkları korunmuş, teknik çelişkiler giderilmiş ve uygulanabilir geliştirme-yayın altyapısı eklenmiştir.


> BÖLÜM 00 YÖNETİCİ ÖZETİ Mevcut dokümanda tespit edilen güçlü yönler, hatalar, fazlalıklar ve eksikler



# 0.1 İnceleme Sonucu

Mevcut dokümanın marka vizyonu, ana sayfa sadeliği, premium görsel yaklaşımı, erişilebilirlik ve component mantığı doğru yöndedir. Buna karşın dokümanın teknik bölümleri gerçek geliştirme ve yayın operasyonunu tarif etmek için yetersiz; bazı maddeler ise performans, sürdürülebilirlik veya yönetilebilirlik açısından yanlış ya da aşırıdır.
Bu revizyonda menüde yer alan başlıkların adı ve kapsamı korunmuştur. Teknik altyapı; GitHub üzerinde geliştirilen, Vercel üzerinden yayınlanan, Natro üzerinden domain bağlanan ve Supabase üzerinden veritabanı, kimlik doğrulama ile medya yönetimi kullanan tek bir bütün olarak yeniden tanımlanmıştır.

> DEĞİŞTİRİLMEYECEK KARAR Menü başlıkları ve ana sayfanın temel akışı değiştirilmez. Tasarım ve teknik uygulama bu yapı çevresinde optimize edilir.



# 0.2 Eksik, Fazla ve Yanlış Alanların Özeti


| Durum | Tespit | Revizyon |
| --- | --- | --- |
| Doğru ve korunmalı | Marka vizyonu, premium/özgün tasarım hedefi, hedef kitle, güven odaklı kullanıcı psikolojisi. | Aynen korundu; dili sıkılaştırıldı. |
| Doğru ve korunmalı | Ana sayfanın Üst Banner + Header + Hero + 5 Değer Kartı + Footer akışı. | Zorunlu ve değiştirilemez kapsam olarak tanımlandı. |
| Doğru ve korunmalı | WCAG 2.2 AA, semantik HTML, özgün metadata, responsive tasarım ve component yaklaşımı. | Kabul kriterlerine dönüştürüldü. |
| Yanlış / aşırı | Hero video için zorunlu 4K 60 FPS şartı. | Web için 1080p/720p, 24/30 FPS, mobil/desktop ayrı encode, poster ve veri tasarrufu fallback’i getirildi. |
| Yanlış / aşırı | Her açılışta 3 saniyeye yaklaşan loader. | Normalde kaldırıldı; yalnız ilk ziyaret veya medya beklemesinde 400-800 ms’lik non-blocking marka geçişi opsiyonel. |
| Yanlış / pazarlama ifadesi | Lenis ile “120 FPS hissiyatı” garantisi. | Native scroll varsayılan; Lenis yalnız ölçüm sonrası ve reduced-motion uyumlu. |
| Yanlış / sabit ölçü | Footer yüksekliğinin 450 px olarak kilitlenmesi. | İçeriğe göre min-height; taşma ve mobil uyumluluk esas. |
| Yanlış / teknik | Next.js App Router yanında Next SEO zorunluluğu. | Next.js Metadata API, sitemap.ts ve robots.ts kullanıldı. |
| Riskli / gereksiz | Admin panelinden sayfa tasarımları, fontlar ve tüm boyutların değiştirilebilmesi. | Tasarım sistemi kodda kilitli; admin yalnız içerik, görsel, sıralama, görünürlük ve SEO yönetir. |
| Yanlış / kopyala-yapıştır | Kurumsal, Neden Biz, Dijital Hizmetler, Organizasyon Süreci, KVKK ve İletişim modüllerinin “Her hizmet için” alanlarıyla tanımlanması. | Her modül için özel içerik modeli oluşturuldu. |
| Fazla / kapsam dışı | Menüde bulunmayan Blog’un zorunlu modül olarak eklenmesi. | İlk sürüm kapsamından çıkarıldı; gelecek modül olarak bırakıldı. |
| Eksik | GitHub repo, branch/PR akışı, preview deployment ve kodun tek kaynak olması. | Tam CI/CD ve yayın akışı eklendi. |
| Eksik | Vercel deployment, environment variable, staging/production ayrımı. | Ayrıntılı Vercel mimarisi eklendi. |
| Eksik | Natro domain DNS bağlantısı, canonical domain ve e-posta MX kayıtlarının korunması. | DNS/SSL ve e-posta koruma prosedürü eklendi. |
| Eksik | Supabase Postgres, Auth, Storage, RLS, migration, yedek ve audit log yapısı. | Veri modeli ve güvenlik politikaları eklendi. |
| Eksik | Form e-posta teslimi, spam koruması, rate limit, başarısız gönderim ve loglama. | Vercel Route Handler + Supabase + e-posta servisi akışı tanımlandı. |
| Eksik | Test, rollback, bakım, izleme ve felaket kurtarma. | Yayın öncesi ve sonrası operasyon planı eklendi. |



# 0.3 Revizyonun Temel Sonucu

- GitHub, kod ve Supabase migration dosyalarının tek kaynak noktasıdır.
- Her feature branch için Vercel Preview Deployment oluşturulur; onaylanan kod main branch’e birleştirilince production yayını yapılır.
- Natro yalnız domain ve DNS yönetiminde kullanılır; Vercel’in verdiği güncel DNS kayıtları Natro paneline girilir.
- Natro üzerindeki mevcut e-posta hizmeti kullanılıyorsa MX, SPF, DKIM ve DMARC kayıtları korunur; domain yönlendirmesi sırasında silinmez.
- Supabase; Postgres veritabanı, Admin Auth, Storage ve Row Level Security sağlar.
- Admin paneli aynı Next.js projesi içinde /admin alanında çalışır; site tasarımını değil içerikleri yönetir.
- Ana sayfa yalnız Üst Banner, Header, Hero, beş değer kartı ve Footer’dan oluşur.
- Blog, dark mode ve ağır custom cursor ilk sürümün zorunlu kapsamından çıkarılmıştır.


> BÖLÜM 01 KAPSAM VE DEĞİŞMEZ KARARLAR Menü başlıkları, ana sayfa akışı ve proje sınırları



# 1.1 Projenin Amacı

SDKONGRE web sitesi; kongre, toplantı, etkinlik ve dijital organizasyon hizmetlerini premium, güvenilir ve özgün bir dijital deneyimle sunacaktır. Site hazır tema hissi vermemeli; aynı zamanda hızlı, erişilebilir, arama motorlarına uygun, güvenli ve teknik bilgi gerektirmeden yönetilebilir olmalıdır.

> İLK 5 SANİYE HEDEFİ Ziyaretçi “Bu firma büyük organizasyonları planlı, güvenilir ve profesyonel biçimde yönetiyor.” algısına ulaşmalıdır.



# 1.2 Ana Sayfa - Zorunlu Sıralama

1. Üst Banner
1. Header / Navigasyon
1. Tam Ekran Hero
1. Beş Premium Değer Kartı
1. Footer
Ana sayfaya hizmet kartları, proje galerisi, referans logoları, blog, ekip, istatistik, müşteri yorumu veya ayrı CTA bölümü eklenmeyecektir. İlgili içerikler menü üzerinden ayrı sayfalarda gösterilecektir.

# 1.3 Menü Başlıkları - Korunan Yapı


| Menü Başlığı | Önerilen Route | Sayfa Görevi |
| --- | --- | --- |
| ANA SAYFA | / | Tek sayfa; üst banner, header, hero, 5 değer kartı ve footer. |
| KURUMSAL | /kurumsal | Alt sayfaları açan üst menü. |
| Hakkımızda | /kurumsal/hakkimizda | Kurumsal tanıtım. |
| Hikayemiz | /kurumsal/hikayemiz | Marka hikâyesi ve gelişim. |
| Misyon | /kurumsal/misyon | Misyon içeriği. |
| Vizyon | /kurumsal/vizyon | Vizyon içeriği. |
| Değerlerimiz | /kurumsal/degerlerimiz | Kurumsal değerler. |
| NEDEN BİZ | /neden-biz | Farklılaşma, çalışma ilkeleri ve güven unsurları. |
| HİZMETLERİMİZ | /hizmetlerimiz | Fiziksel/operasyonel hizmetlerin ana sayfası. |
| Lansman ve Kurumsal Etkinlikler | /hizmetlerimiz/lansman-ve-kurumsal-etkinlikler | Hizmet detay sayfası. |
| Kongre Organizasyonları | /hizmetlerimiz/kongre-organizasyonlari | Hizmet detay sayfası. |
| Toplantı  ve Sempozyum Yönetimi | /hizmetlerimiz/toplanti-ve-sempozyum-yonetimi | Hizmet detay sayfası. |
| Workshop Organizasyonları | /hizmetlerimiz/workshop-organizasyonlari | Hizmet detay sayfası. |
| Fuar ve Sergi Organizasyonları | /hizmetlerimiz/fuar-ve-sergi-organizasyonlari | Hizmet detay sayfası. |
| Seyahat ve Konaklama Yönetimi | /hizmetlerimiz/seyahat-ve-konaklama-yonetimi | Hizmet detay sayfası. |
| Transfer ve lojistik Yönetimi | /hizmetlerimiz/transfer-ve-lojistik-yonetimi | Hizmet detay sayfası. |
| Tedarikçi ve Operasyon Yönetimi | /hizmetlerimiz/tedarikci-ve-operasyon-yonetimi | Hizmet detay sayfası. |
| DİJİTAL HİZMETLER | /dijital-hizmetler | Dijital hizmetlerin ana sayfası. |
| Katılımcı ve Kayıt Yönetimi | /dijital-hizmetler/katilimci-ve-kayit-yonetimi | Dijital hizmet detay sayfası. |
| Dijital Altyapı ve Etkinlik Teknolojileri | /dijital-hizmetler/dijital-altyapi-ve-etkinlik-teknolojileri | Dijital hizmet detay sayfası. |
| QR Kod ve Yaka Kart Sistemleri | /dijital-hizmetler/qr-kod-ve-yaka-kart-sistemleri | Dijital hizmet detay sayfası. |
| Online Davet ve İletişim Yönetimi | /dijital-hizmetler/online-davet-ve-iletisim-yonetimi | Dijital hizmet detay sayfası. |
| Organizasyon Takip Sistemleri | /dijital-hizmetler/organizasyon-takip-sistemleri | Dijital hizmet detay sayfası. |
| Veri ve Raporlama Sistemleri | /dijital-hizmetler/veri-ve-raporlama-sistemleri | Dijital hizmet detay sayfası. |
| Veri Güvenliği ve Merkezi Yönetim | /dijital-hizmetler/veri-guvenligi-ve-merkezi-yonetim | Dijital hizmet detay sayfası. |
| ORGANİZASYON SURECİ | /organizasyon-sureci | Brief, Planlama, Teklif, Onay, Operasyon, Raporlama. |
| PROJELER | /projeler | Filtrelenebilir proje/vaka listesi. |
| REFERANSLAR | /referanslar | Referans logoları ve onaylı kısa başarı hikâyeleri. |
| KVKK | /kvkk | Yasal sayfaları açan üst menü. |
| KVKK Aydınlatma Metni | /kvkk/aydinlatma-metni | Yasal metin. |
| Gizlilik Politikası | /kvkk/gizlilik-politikasi | Yasal metin. |
| Çerez (Cookie) Politikası | /kvkk/cerez-politikasi | Yasal metin. |
| Açık Rıza Metni | /kvkk/acik-riza-metni | Yasal metin. |
| Yasal Dayanaklar | /kvkk/yasal-dayanaklar | Yasal metin. |
| İLETİŞİM | /iletisim | İletişim kanalları, form ve harita. |



> MENÜ UYGULAMA NOTU Başlık adları değiştirilmez. Yalnız URL slug’ları Türkçe karakter içermeyen, küçük harfli ve SEO uyumlu teknik karşılıklarla oluşturulur.



# 1.4 Header Yerleşim Kararı

Üst düzey menü sayısı geniş olduğu için tüm başlıkları tek satıra sıkıştırmak masaüstünde bile okunabilirliği bozabilir. Başlıklar korunarak erişilebilir mega menü veya tam ekran navigasyon paneli kullanılmalıdır. Kullanıcı her başlığa en fazla iki etkileşimde ulaşmalıdır.
- Logo solda; iletişim, dil ve Teklif Al aksiyonu sağda.
- Desktopta birincil başlıkların bir bölümü görünür, tüm yapı mega menü panelinde eksiksiz bulunur.
- Tablet ve mobilde drawer/full-screen menü kullanılır.
- Alt menüler klavye, touch, Escape ve dışarı tıklama davranışlarıyla çalışır.
- Aktif sayfa başlık adı değiştirilmeden gold vurgu veya alt çizgiyle gösterilir.

# 1.5 Kapsam Dışı veya Gelecek Faz


| Öğe | Karar | Gerekçe |
| --- | --- | --- |
| Blog | İlk sürümde zorunlu değil. | Menü yapısında bulunmuyor; gereksiz geliştirme ve içerik yükü oluşturur. |
| Light Mode | Zorunlu değil. | Marka koyu premium tema üzerinden tanımlanmıştır. |
| Ağır Custom Cursor | Opsiyonel. | Performans ve erişilebilirlik riskine karşı yalnız güçlü desktop cihazlarında. |
| Online ödeme / katılımcı portalı | Gelecek faz. | Ayrı iş kuralları, güvenlik ve operasyon gerektirir. |
| Bildiri ve hakem sistemi | Gelecek faz. | Mevcut kurumsal site kapsamının dışında. |
| Mobil uygulama | Gelecek faz. | API ve ayrı ürün planı gerektirir. |




> BÖLÜM 02 TEKNİK MİMARİ GitHub, Vercel, Natro ve Supabase’in tek sistem olarak çalışması



# 2.1 Nihai Teknoloji Yığını


| Katman | Teknoloji | Sorumluluk |
| --- | --- | --- |
| Kaynak Kod | GitHub | Kod, migration, dokümantasyon ve issue/PR geçmişinin tek kaynağı. |
| Frontend / Backend for Frontend | Next.js App Router + TypeScript | Kurumsal site, admin paneli, server actions/route handlers ve SEO. |
| Stil | Tailwind CSS + CSS Variables | Token tabanlı tasarım sistemi. |
| Animasyon | Framer Motion; gerektiğinde sınırlı GSAP | Bileşen ve karmaşık timeline animasyonları. |
| Yayın | Vercel | Preview deployment, production deployment, CDN, SSL ve loglar. |
| Domain / DNS | Natro | Alan adı sahipliği ve DNS yönetimi; kayıtlar Vercel’e yönlendirilir. |
| Veritabanı | Supabase Postgres | İçerik, proje, referans, iletişim, teklif ve audit kayıtları. |
| Kimlik Doğrulama | Supabase Auth | Admin kullanıcıları, rol ve oturum. |
| Medya | Supabase Storage | Görsel, video posterleri ve dokümanlar. |
| Yetkilendirme | Supabase RLS | Public read ve rol bazlı write politikaları. |
| Form Doğrulama | React Hook Form + Zod | İstemci ve sunucu tarafında aynı şema. |
| E-posta | Vercel Route Handler + Resend/SMTP | İletişim ve teklif bildirimleri; veritabanı kaydıyla birlikte. |
| Spam Koruması | Cloudflare Turnstile veya eşdeğeri | Bot, abuse ve form spam azaltma. |
| Analitik | GA4 / Search Console, isteğe bağlı Meta Pixel | Çerez onayı ve KVKK politikasına bağlı. |
| Test | Vitest/Jest + Playwright + axe | Unit, integration, E2E ve erişilebilirlik. |
| İzleme | Vercel Logs + hata izleme servisi | Runtime hata, form teslimi ve uptime gözlemi. |



# 2.2 Sistem Akış Diyagramı


> GELİŞTİRİCİ    ↓  feature branch / pull request GITHUB REPOSITORY    ↓  otomatik Preview Deployment VERCEL PREVIEW    ↓  test + içerik/tasarım onayı MAIN BRANCH    ↓  Production Deployment VERCEL PRODUCTION + CDN + SSL    ↑ NATRO DNS  ── domain / www / e-posta kayıtları    ↓ NEXT.JS SITE + /ADMIN    ↕ SUPABASE Postgres + Auth + Storage + RLS + Audit Logs    ↓ E-POSTA SERVİSİ / ANALİTİK / HARİTA


# 2.3 Mimari İlkeler

- GitHub repository üretim kodunun tek gerçeğidir; production üzerinde elle kod değişikliği yapılmaz.
- Vercel yalnız build ve yayın platformudur; içerik verileri Supabase’den okunur.
- Natro domain sahibi ve DNS yöneticisidir; web barındırma Vercel’dedir.
- Supabase Service Role anahtarı hiçbir zaman tarayıcıya gönderilmez.
- Public site yalnız yayındaki içerikleri okuyabilir; admin yazma işlemleri rol ve RLS politikalarıyla korunur.
- Veritabanı değişiklikleri manuel production düzenlemesi yerine migration dosyalarıyla GitHub’a kaydedilir.
- Medya dosyaları GitHub repository içine yığılmaz; Supabase Storage üzerinden yönetilir.


> BÖLÜM 03 GITHUB GELİŞTİRME STANDARDI Repository, branch, pull request, migration ve sürüm yönetimi



# 3.1 Repository Yapısı

Tek bir Next.js repository kullanılması önerilir. Kurumsal site, admin paneli, Supabase istemcileri, migration dosyaları ve teknik dokümantasyon aynı repository içinde tutulur. Böylece tasarım, kod, veritabanı ve yayın sürümleri birlikte izlenebilir.

> sdkongre-web/ ├── src/ │   ├── app/ │   │   ├── (site)/ │   │   ├── admin/ │   │   ├── api/ │   │   ├── layout.tsx │   │   ├── sitemap.ts │   │   └── robots.ts │   ├── components/ │   │   ├── ui/ │   │   ├── layout/ │   │   ├── navigation/ │   │   ├── sections/ │   │   ├── forms/ │   │   └── admin/ │   ├── lib/ │   │   ├── supabase/ │   │   ├── auth/ │   │   ├── seo/ │   │   ├── validation/ │   │   └── email/ │   ├── hooks/ │   ├── styles/ │   ├── types/ │   └── config/ ├── public/ │   ├── brand/ │   ├── icons/ │   └── fallback/ ├── supabase/ │   ├── migrations/ │   ├── seed.sql │   └── config.toml ├── tests/ │   ├── unit/ │   ├── integration/ │   └── e2e/ ├── .github/ │   ├── workflows/ │   └── pull_request_template.md ├── .env.example ├── next.config.ts ├── package.json └── README.md


# 3.2 Branch Modeli


| Branch | Amaç | Kural |
| --- | --- | --- |
| main | Canlı production sürümü. | Doğrudan push kapalı; yalnız onaylı PR merge edilir. |
| develop | İsteğe bağlı entegrasyon/staging. | Ekip küçükse kullanılmayabilir; preview PR’lar yeterli olabilir. |
| feature/* | Yeni sayfa, component veya özellik. | Kısa ömürlü; tek konu ve anlaşılır commit. |
| fix/* | Hata düzeltmesi. | Hata senaryosu ve test bilgisi PR’a yazılır. |
| hotfix/* | Production kritik düzeltmesi. | Hızlı fakat yine PR ve minimum test gerektirir. |
| content/* | Kodla yönetilen sabit içerik veya config. | CMS dışındaki sınırlı içerikler için. |



# 3.3 Pull Request Kabul Kriterleri

- [ ] PR açıklamasında yapılan değişiklik, etkilenen route’lar ve test adımları yazılmıştır.
- [ ] Vercel Preview bağlantısı oluşmuş ve erişilebilir durumdadır.
- [ ] Desktop, tablet ve mobil görünüm kontrol edilmiştir.
- [ ] TypeScript, lint, unit test ve build kontrolleri geçmiştir.
- [ ] Yeni veritabanı alanı varsa Supabase migration dosyası repository’ye eklenmiştir.
- [ ] Environment variable eklenmişse .env.example ve README güncellenmiştir.
- [ ] Kişisel veri, gizli anahtar veya production bilgisi commit edilmemiştir.
- [ ] SEO, erişilebilirlik ve performance etkisi kontrol edilmiştir.
- [ ] Menü başlıkları ve route eşleşmesi değiştirilmemiştir.
- [ ] En az bir yetkili incelemesi sonrası merge yapılmıştır.

# 3.4 Commit ve Sürümleme

- Commit mesajları kısa, anlamlı ve tek değişiklik odaklı olmalıdır.
- Önerilen format: feat:, fix:, refactor:, docs:, test:, chore:, content:.
- Production sürümleri gerektiğinde v1.0.0, v1.1.0 gibi tag’lerle işaretlenir.
- Supabase migration dosyaları zaman damgalı ve geri alınabilir mantıkta hazırlanır.
- Büyük görseller ve video dosyaları Git’e eklenmez; Storage kullanılır.

# 3.5 GitHub Actions


| Kontrol | Ne Zaman | Çıktı |
| --- | --- | --- |
| Install + Cache | Her PR ve main push. | Bağımlılık kurulumu. |
| Type Check | Her PR. | TypeScript hataları. |
| Lint | Her PR. | Kod standardı. |
| Unit Test | Her PR. | Fonksiyon ve component güveni. |
| Build | Her PR ve main. | Next.js production build doğrulaması. |
| Optional E2E | Ana PR veya nightly. | Kritik kullanıcı akışları. |
| Dependency Audit | Haftalık veya PR. | Bilinen paket riskleri. |




> BÖLÜM 04 VERCEL YAYIN MİMARİSİ Preview, production, environment variables, loglar ve rollback



# 4.1 Vercel Proje Yapılandırması

- Vercel projesi doğrudan GitHub repository’ye bağlanır.
- Framework Preset Next.js olarak otomatik algılanır.
- Production Branch main olarak belirlenir.
- Her pull request için benzersiz Preview Deployment oluşturulur.
- Preview ortamında gerçek production verisine yazma engellenir; ayrı Supabase staging projesi tercih edilir.
- Production deployment yalnız main branch merge sonrasında gerçekleşir.

# 4.2 Ortam Ayrımı


| Ortam | Kod | Supabase | Domain | Kullanım |
| --- | --- | --- | --- | --- |
| Local | Developer branch | Local veya development projesi | localhost | Geliştirme. |
| Preview | PR commit | Staging Supabase | vercel.app preview URL | Tasarım ve fonksiyon testi. |
| Staging | develop veya özel branch | Staging Supabase | staging alt alan adı, noindex | Kapsamlı kabul testi. |
| Production | main | Production Supabase | Ana domain | Canlı kullanıcılar. |



# 4.3 Environment Variable Standardı


| Değişken | Ortam | Gizlilik / Kullanım |
| --- | --- | --- |
| NEXT_PUBLIC_SITE_URL | Tümü | Canonical ve paylaşım URL’si; public. |
| NEXT_PUBLIC_SUPABASE_URL | Tümü | İlgili Supabase proje URL’si; public. |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Tümü | RLS ile sınırlandırılmış public anahtar. |
| SUPABASE_SERVICE_ROLE_KEY | Server only | Asla NEXT_PUBLIC_ ile başlamaz; yalnız güvenli server işlemleri. |
| SUPABASE_DB_URL | CI / migration | Migration ve bakım; browser’a çıkmaz. |
| CONTACT_TO_EMAIL | Server only | Form bildirim alıcısı. |
| EMAIL_FROM | Server only | Doğrulanmış gönderen adresi. |
| RESEND_API_KEY veya SMTP_* | Server only | E-posta teslimi. |
| TURNSTILE_SITE_KEY | Client | Spam doğrulama site anahtarı. |
| TURNSTILE_SECRET_KEY | Server only | Spam doğrulama gizli anahtarı. |
| NEXT_PUBLIC_GA_ID | Production | Onay sonrası analitik. |
| NEXT_PUBLIC_META_PIXEL_ID | Production / opsiyonel | Pazarlama onayı sonrası. |



> GÜVENLİK KURALI Service Role, database URL, e-posta API anahtarı ve spam secret hiçbir zaman client bundle’a veya GitHub repository’ye yazılmaz.



# 4.4 Build ve Runtime Kuralları

- Next.js production build hata verirse deployment başarısız sayılır.
- Server Components varsayılan; client JavaScript yalnız etkileşim gereken alanlarda kullanılır.
- İletişim ve teklif endpoint’leri Node runtime üzerinde çalıştırılabilir; kullanılan SDK’ya göre Edge seçimi bilinçli yapılır.
- Görseller next/image ile responsive sunulur; dış domainler next.config içinde sınırlanır.
- Uzun süren video dönüşümü Vercel function içinde yapılmaz; yükleme öncesi veya ayrı medya pipeline’ında hazırlanır.
- Cache ve revalidation; içerik türüne göre tanımlanır. Yasal metinler ve iletişim bilgileri güncelleme sonrası revalidate edilir.

# 4.5 Rollback ve Acil Durum

- Vercel deployment geçmişi üzerinden son sağlıklı production sürümüne geri dönülebilir.
- Rollback yalnız frontend kodunu geri alır; veritabanı migration etkisi ayrıca değerlendirilmelidir.
- Yıkıcı migration aynı deployment içinde kontrolsüz uygulanmaz.
- Form veya admin hatasında geçici feature flag veya bakım mesajı kullanılabilir.
- Rollback sonrası GitHub main branch durumu da düzeltilir; yalnız platform üzerinde kalıcı manuel fark bırakılmaz.


> BÖLÜM 05 NATRO DOMAIN VE DNS PLANI Domain bağlantısı, canonical adres, SSL ve e-posta kayıtlarının korunması



# 5.1 Sorumluluk Dağılımı


| Platform | Sorumluluk |
| --- | --- |
| Natro | Domain sahipliği, nameserver veya DNS zone yönetimi, mevcut e-posta kayıtları. |
| Vercel | Web uygulaması, CDN, otomatik SSL, www/apex yönlendirmesi. |
| Supabase | Veritabanı, Auth ve Storage; ana web domaininin host’u değildir. |
| GitHub | Kaynak kod ve deployment tetikleyicisi. |



# 5.2 Domain Bağlama Adımları

1. Vercel projesine ana domain ve www varyantı eklenir.
1. Canonical domain seçilir: örneğin www alan adına yönlendirme veya apex domain kullanımı. İki sürüm aynı içeriği ayrı ayrı sunmaz.
1. Vercel domain ekranında gösterilen güncel DNS kayıtları alınır.
1. Natro DNS panelinde yalnız web yönlendirmesi için gereken A, CNAME veya platformun önerdiği kayıtlar uygulanır.
1. Mevcut MX, SPF, DKIM, DMARC ve e-posta doğrulama kayıtları silinmeden korunur.
1. DNS doğrulaması tamamlandıktan sonra Vercel SSL sertifikası aktif duruma gelir.
1. HTTP, alternatif domain ve www/apex trafiklerinin canonical HTTPS adrese yönlendiği test edilir.
1. DNS yayılımı tamamlanana kadar eski site kapatılmaz; geçiş penceresi planlanır.

> KRİTİK E-POSTA UYARISI Natro üzerinden e-posta kullanılıyorsa nameserver veya DNS değişikliği sırasında MX/SPF/DKIM/DMARC kayıtlarının kaybolması e-posta kesintisine yol açar. Web domain bağlantısı ile e-posta kayıtları ayrı ayrı kontrol edilmelidir.



# 5.3 DNS Değişiklik Kontrol Formu


| Kayıt / Kontrol | Önce | Sonra |
| --- | --- | --- |
| Apex domain | Mevcut hedef kaydedildi. | Vercel doğrulandı. |
| www CNAME | Mevcut hedef kaydedildi. | Canonical yönlendirme doğrulandı. |
| MX kayıtları | Ekran görüntüsü / export alındı. | Değişmeden çalışıyor. |
| SPF | Mevcut TXT kaydedildi. | E-posta gönderimi test edildi. |
| DKIM | Selector kayıtları kaydedildi. | Doğrulama geçti. |
| DMARC | Politika kaydedildi. | Raporlama ve doğrulama geçti. |
| SSL | Eski sertifika durumu not edildi. | Vercel HTTPS aktif. |
| Redirect | Eski URL listesi hazır. | 301 yönlendirmeleri çalışıyor. |



# 5.4 URL ve Yönlendirme Standardı

- Tüm URL’ler küçük harf, tire ayrımlı ve Türkçe karakter içermeyen slug kullanır.
- Menüde görünen Türkçe başlıklar değiştirilmez.
- Eski siteden gelen önemli URL’ler 301 ile yeni karşılığına yönlendirilir.
- Trailing slash politikası tek biçimde uygulanır.
- Canonical URL production domainini kullanır; preview URL’leri indexlenmez.
- 404 sayfası doğru HTTP durumuyla çalışır; yanlış URL’ler ana sayfaya topluca yönlendirilmez.


> BÖLÜM 06 SUPABASE VERİTABANI VE CMS MİMARİSİ Postgres şeması, Auth, Storage, RLS, migration ve yedekleme



# 6.1 Supabase Kullanım Kapsamı

- Postgres: Sayfa içerikleri, hizmetler, süreç adımları, projeler, referanslar, iletişim ve teklif kayıtları.
- Auth: Yalnız admin paneli kullanıcılarının güvenli girişi.
- Storage: Proje görselleri, referans logoları, hero poster/video dosyaları ve yasal dokümanlar.
- Row Level Security: Public kullanıcı ile admin rollerinin veri erişimini ayırma.
- Database Functions / Triggers: updated_at, slug benzersizliği, audit ve yayın kuralları.
- Realtime: İlk sürüm için zorunlu değildir; iletişim paneli bildirimleri için sonra değerlendirilebilir.

# 6.2 Önerilen Veri Modeli


| Tablo | Temel Alanlar | Amaç |
| --- | --- | --- |
| profiles | id, full_name, role, active, last_login_at | Supabase Auth kullanıcısına bağlı admin profili. |
| site_settings | key, value_json, locale, updated_by | Logo, iletişim, sosyal ağlar, banner ve global SEO. |
| pages | id, page_key, locale, title, slug, summary, content_json, status, seo_json | Kurumsal, Neden Biz, İletişim ve diğer tekil sayfalar. |
| services | id, category, locale, title, slug, summary, body_json, cover_id, icon, order_no, status, seo_json | HİZMETLERİMİZ ve DİJİTAL HİZMETLER alt sayfaları. |
| process_steps | id, locale, step_key, title, description, icon, order_no, status | Brief, Planlama, Teklif, Onay, Operasyon, Raporlama. |
| projects | id, locale, title, slug, client_name, event_type, city, venue, start_date, end_date, summary, challenge, solution, result_json, status, featured, seo_json | Proje vaka içerikleri. |
| project_services | project_id, service_id | Proje-hizmet çoktan çoğa bağlantı. |
| project_media | id, project_id, media_id, media_type, caption, order_no | Proje galeri ve video ilişkisi. |
| references | id, locale, name, logo_id, website, category, story, order_no, visible | Referans listesi ve onaylı hikâye. |
| media_assets | id, bucket, path, file_name, mime_type, size_bytes, width, height, alt_text, focal_point, created_by | Medya kütüphanesi metadatası. |
| legal_documents | id, document_key, locale, title, slug, body_json, version, effective_date, status, seo_json | KVKK alt sayfaları. |
| contact_messages | id, full_name, company, email, phone, subject, message, consent_at, status, assigned_to, created_at | İletişim formu kayıtları. |
| quote_requests | id, full_name, company, email, phone, event_type, event_date, city, attendee_count, services_json, notes, consent_at, source, status, assigned_to | Teklif talepleri. |
| audit_logs | id, actor_id, action, entity_type, entity_id, before_json, after_json, ip_hash, created_at | Kritik admin değişiklikleri. |
| content_versions | id, entity_type, entity_id, version_no, snapshot_json, created_by, created_at | İçerik geçmişi ve geri alma. |
| form_events | id, form_type, request_id, event_type, provider_message_id, error_code, created_at | E-posta/form teslim takibi. |



# 6.3 Menü Başlıklarının Korunması

Menü başlıkları kullanıcı talebi gereği değiştirilemez. Bu nedenle menü etiketleri kod içindeki güvenli bir navigation config dosyasında seed edilir ve admin panelinde serbest metin olarak düzenlenmez. Admin yalnız görünürlük, alt içerik ve gerekirse sıralama üzerinde yetkili olabilir; başlık değişikliği ayrıca onay gerektirir.

| Başlık Türü | Saklama | Admin Yetkisi |
| --- | --- | --- |
| Top-level menü | src/config/navigation.ts | Başlık kilitli; route ve görünürlük kontrollü. |
| Alt menü | navigation config + içerik kaydı | Başlık kilitli; sayfa içeriği düzenlenebilir. |
| CTA | site_settings veya page content | Metin ve hedef düzenlenebilir. |
| Footer kopyası | Aynı navigation config | Başlık tek kaynaktan gelir. |



# 6.4 İçerik Durumları


| Durum | Public Erişim | Admin Davranışı |
| --- | --- | --- |
| draft | Hayır | Düzenlenebilir; preview ile görüntülenir. |
| review | Hayır | Editör incelemesinde. |
| scheduled | Tarihe kadar hayır | Yayın zamanı gelince aktif. |
| published | Evet | Public query tarafından okunur. |
| archived | Hayır | Geçmişte saklanır; URL yönlendirmesi değerlendirilir. |



# 6.5 Supabase Auth ve Roller


| Rol | Yetki |
| --- | --- |
| super_admin | Kullanıcı, rol, sistem ayarı, içerik, yayın, silme ve audit erişimi. |
| admin | Tüm içerik, proje, referans, form ve yayın işlemleri; kullanıcı yönetimi sınırlı. |
| editor | İçerik oluşturma/düzenleme, medya yükleme, review’a gönderme; yayın yetkisi politika ile. |
| content_author | Kendi taslakları ve medya; yayın yok. |
| sales_ops | İletişim ve teklif kayıtları; içerik salt okunur. |
| viewer | Yetkili modüllerde salt okunur erişim. |



# 6.6 RLS Politika Matrisi


| Kaynak | anon | authenticated editor | admin / service role |
| --- | --- | --- | --- |
| published pages/services/projects/references/legal | SELECT published | SELECT published + permitted drafts | Full according to role. |
| contact_messages | INSERT only via validated server endpoint | Own scope if role permits | Read/update according to role. |
| quote_requests | INSERT only via validated server endpoint | Sales role read/update | Full according to role. |
| media public bucket | SELECT public assets | Upload/update permitted folder | Manage. |
| private uploads | No direct access | Signed URL by permission | Manage. |
| profiles | No access | Own profile limited | Role-based manage. |
| audit_logs | No access | No direct update | Read by authorized roles; immutable write. |



> RLS KURALI RLS bütün public tablolar ve Storage bucket’larında etkin olmalıdır. “Anon key gizli değildir”; güvenlik anon key’i saklamaya değil doğru RLS politikasına dayanır.



# 6.7 Storage Bucket Yapısı


| Bucket | Erişim | İçerik |
| --- | --- | --- |
| public-site-media | Public read, admin write | Hero poster, hizmet kapakları, genel sayfa görselleri. |
| project-media | Public read for published projects | Proje fotoğraf ve optimize videoları. |
| reference-logos | Public read, admin write | SVG/PNG referans logoları. |
| legal-files | Public veya controlled read | İndirilebilir yasal dokümanlar. |
| private-form-uploads | Private | Gelecekte teklif eki; signed URL ile erişim. |


- Storage path yapısı entity/yıl/slug/dosya adı şeklinde düzenlenmelidir.
- Dosyalar yüklenmeden önce MIME, uzantı, boyut ve mümkünse zararlı içerik kontrolünden geçirilmelidir.
- Alt metin ve odak noktası yalnız dosya adında değil media_assets tablosunda saklanmalıdır.
- Hero video dönüşümü Storage’a yüklemeden önce optimize edilmelidir.
- Kullanımda olan medya silinmeden önce ilişki kontrolü yapılmalıdır.

# 6.8 Migration ve Seed Yönetimi

- Schema değişiklikleri supabase/migrations klasörüne zaman damgalı SQL olarak eklenir.
- Migration önce local veya staging Supabase üzerinde uygulanır.
- Production migration PR onayı ve backup doğrulamasından sonra uygulanır.
- Menü yapısı, roller, process steps ve temel site settings için seed.sql tutulur.
- Production verisi seed dosyasına kopyalanmaz.
- Geri dönüşü zor migrationlarda expand-migrate-contract yaklaşımı kullanılır.

# 6.9 Yedekleme ve Felaket Kurtarma

- [ ] Supabase planının sunduğu otomatik backup özellikleri aktif edilir.
- [ ] Aylık veya kritik yayın öncesi mantıksal export ayrıca güvenli ortamda saklanır.
- [ ] Storage kritik dosyalarının envanteri ve gerektiğinde dış yedeği tutulur.
- [ ] Migrations ve seed GitHub’da sürümlenir.
- [ ] Restore testi en az yılda iki kez staging ortamında uygulanır.
- [ ] RPO ve RTO hedefleri iş sahibiyle yazılı olarak belirlenir.
- [ ] Silme veya yanlış yayın için content_versions üzerinden içerik geri alma sağlanır.


> BÖLÜM 07 FORM, E-POSTA VE LEAD AKIŞI İletişim ve teklif taleplerinin güvenli alınması ve izlenmesi



# 7.1 Form İşlem Sırası

1. Kullanıcı formu doldurur; istemci tarafında Zod şemasıyla hızlı doğrulama yapılır.
1. Form Vercel Route Handler veya Server Action’a gönderilir.
1. Sunucu aynı Zod şemasıyla yeniden doğrular.
1. Spam token’ı doğrulanır ve IP/kullanıcı bazlı rate limit uygulanır.
1. Kayıt Supabase contact_messages veya quote_requests tablosuna yazılır.
1. E-posta sağlayıcısına bildirim gönderilir.
1. Başarılı/başarısız e-posta olayı form_events tablosuna kaydedilir.
1. Kullanıcıya veri tabanı kaydı başarıyla oluştuysa net bir sonuç mesajı gösterilir.
1. Yönetim panelinde kayıt Yeni durumunda görünür.

# 7.2 İletişim Formu Alanları


| Alan | Zorunlu | Kural |
| --- | --- | --- |
| Ad Soyad | Evet | 2-100 karakter. |
| Firma / Kurum | Hayır | En fazla 150 karakter. |
| E-posta | Evet | Normalize ve format doğrulama. |
| Telefon | Tercihen | Ülke kodu destekli; yalnız rakam varsayımı yapılmaz. |
| Konu | Evet | Ön tanımlı seçenek veya kısa metin. |
| Mesaj | Evet | 20-4000 karakter; HTML kabul edilmez. |
| KVKK Onayı | Evet | Önceden işaretli olmaz; metne bağlantı verir. |
| Pazarlama İzni | Hayır | KVKK onayından ayrı ve opsiyonel. |



# 7.3 Teklif Formu


| Adım | Alanlar |
| --- | --- |
| 1 - İletişim | Ad Soyad, Firma/Kurum, E-posta, Telefon. |
| 2 - Etkinlik | Organizasyon türü, tarih veya tarih aralığı, şehir/mekân, katılımcı sayısı. |
| 3 - Hizmetler | İlgili HİZMETLERİMİZ ve DİJİTAL HİZMETLER seçimleri, notlar. |
| 4 - Onay | Özet, KVKK onayı, opsiyonel pazarlama izni ve gönderim. |



# 7.4 Hata ve Başarı Senaryoları


| Senaryo | Kullanıcı Mesajı | Sistem Davranışı |
| --- | --- | --- |
| Doğrulama hatası | Alan altı açıklayıcı hata. | Gönderim yapılmaz; ilk hataya focus. |
| Spam doğrulama başarısız | İşlem doğrulanamadı. | Kayıt ve e-posta oluşmaz; olay loglanır. |
| DB yazma başarısız | Talep alınamadı; tekrar deneyin. | E-posta gönderilmez; hata izleme kaydı. |
| DB başarılı, e-posta başarısız | Talebiniz alındı. | Kayıt panelde görünür; retry veya uyarı oluşur. |
| Tam başarı | Talebiniz başarıyla alındı. | Kayıt, e-posta ve event log tamamlanır. |



# 7.5 Güvenlik ve Gizlilik

- Form endpoint’i yalnız kabul edilen origin ve method’ları işler.
- HTML/script içeriği escape edilir; rich text kabul edilmez.
- Kişisel veriler analitik event içine açık metin olarak gönderilmez.
- IP adresi gerekiyorsa tam IP yerine hash veya sınırlı süreli kayıt değerlendirilir.
- E-posta içeriği hassas alanları gereksiz yere çoğaltmaz.
- Retention süresi KVKK politikasına göre belirlenir ve otomatik silme/anonymization planlanır.


> BÖLÜM 08 DESIGN SYSTEM VE GÖRSEL DİL Premium, özgün, erişilebilir ve performans odaklı arayüz standardı



# 8.1 Tasarım İlkeleri


| İlke | Uygulama |
| --- | --- |
| Premium | Malzeme hissi, tipografi, görsel kalite ve boşlukla oluşturulur; aşırı efektle değil. |
| Özgün | Hazır tema kalıpları ve jenerik kurumsal bloklardan kaçınılır. |
| Minimal | Her sayfada yalnız kullanıcı görevini destekleyen içerik bulunur. |
| Tutarlı | Aynı component aynı görünüm ve davranışı gösterir. |
| Erişilebilir | Klavye, kontrast, focus, reduced motion ve ekran okuyucu önceliklidir. |
| Performanslı | Hareket, video ve görsel kalitesi Web Vitals bütçesine göre uygulanır. |
| Yönetilebilir | İçerik CMS’den değişir; tasarım sistemi kodda korunur. |



# 8.2 Renk Tokenları


| Token | Değer | Kullanım |
| --- | --- | --- |
| brand.navy | #071A2F | Ana koyu yüzey, header ve footer. |
| brand.graphite | #0E1116 | Derin arka plan ve video overlay. |
| brand.gold | #D4AF37 | Primary CTA ve sınırlı vurgu. |
| brand.gold-dark | #A88420 | Hover, pressed ve kontrastlı gold. |
| surface.white | #FFFFFF | Açık yüzey ve koyu zeminde metin. |
| surface.soft | #F3F5F7 | Açık bölüm zemini. |
| border.soft | #D9DEE5 | İnce ayırıcı ve açık sınır. |
| text.primary | #25313C | Açık yüzey ana metni. |
| text.muted | #637282 | İkincil metin. |
| feedback.success | #2E7D5A | Başarı. |
| feedback.error | #B54747 | Hata. |
| feedback.warning | #B86B25 | Uyarı. |


Gold rengin toplam görsel alan içindeki payı düşük tutulmalıdır. Gold; CTA, aktif menü, focus detayı, küçük ikon ve ince çizgi için kullanılır; geniş arka plan veya uzun metin rengi olarak kullanılmaz.

# 8.3 Grid ve Responsive Sistem


| Ekran | Genişlik | Grid | Kenar | Davranış |
| --- | --- | --- | --- | --- |
| Mobile S | 320-389 px | 4 kolon | 16 px | Tek kolon, video yerine poster değerlendirilebilir. |
| Mobile | 390-767 px | 4 kolon | 20 px | Drawer menü, CTA’lar tam/yarım genişlik. |
| Tablet | 768-1023 px | 8 kolon | 32 px | 2 kolon içerik ve kontrollü animasyon. |
| Laptop | 1024-1439 px | 12 kolon | 48-72 px | Maksimum içerik 1280 px. |
| Desktop | 1440 px+ | 12 kolon | 80-120 px | Maksimum içerik 1440 px. |



# 8.4 Spacing Sistemi

8 px temelli ana ölçek kullanılmalı; mikro boşluklar için 4 ve 12 px tokenları desteklenmelidir. Önerilen tokenlar: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120 ve 160 px.

# 8.5 Tipografi


| Stil | Responsive Boyut | Satır Yüksekliği | Kullanım |
| --- | --- | --- | --- |
| Display XL | clamp(3.25rem, 7vw, 7rem) | 0.92-1.0 | Ana hero başlığı. |
| Display L | clamp(2.75rem, 5vw, 5.5rem) | 0.98-1.05 | İç sayfa hero. |
| H1 | clamp(2.25rem, 4vw, 4rem) | 1.05 | Sayfa ana başlığı. |
| H2 | clamp(1.75rem, 3vw, 3rem) | 1.12 | Bölüm başlığı. |
| H3 | 1.5-2rem | 1.2 | Kart ve alt bölüm. |
| Body L | 18-20 px | 1.6-1.7 | Önemli açıklama. |
| Body | 16-18 px | 1.6-1.7 | Standart metin. |
| Small | 14-15 px | 1.5-1.6 | Yardımcı metin. |



# 8.6 Component Kuralları


| Component | Kural |
| --- | --- |
| Primary Button | Gold zemin, koyu metin, minimum 48 px yükseklik, görünür focus. |
| Secondary Button | Şeffaf/koyu yüzey, ince gold veya beyaz sınır. |
| Ghost Button | Metin + ok; kontrollü alt çizgi veya ok hareketi. |
| Value Card | Numara, başlık, açıklama ve tek stil ikon; hover en fazla 6 px. |
| Service Card | Kısa açıklama, görsel/ikon ve detay bağlantısı. |
| Project Card | Görsel, proje adı, tür ve yer; mobile hover’a bağımlı değil. |
| Input | Gerçek label, yardımcı metin, hata metni ve en az 48 px yükseklik. |
| Header | Şeffaf başlar, scroll sonrası blur; layout shift oluşturmaz. |
| Mega Menu | Başlıkları değiştirmeden hiyerarşik ve klavye uyumlu. |
| Footer | İçeriğe bağlı yükseklik; sabit 450 px şartı yok. |
| Modal/Drawer | Focus trap, Escape, scroll lock ve focus restore. |



# 8.7 Hareket ve Mikro Etkileşim


| Öğe | Süre | Kural |
| --- | --- | --- |
| Buton / Menü | 160-260 ms | Küçük translate, renk ve sınır değişimi. |
| Kart | 220-320 ms | En fazla 6 px yükselme, kontrollü ışık. |
| Bölüm Reveal | 400-650 ms | Fade + 16-32 px translate; tek sefer. |
| Sayfa Geçişi | 450-700 ms | İçeriği geciktirmeyen fade/blur. |
| Hero Giriş | Toplam 1.2-1.8 sn | Video/poster, başlık, metin, CTA sırası. |
| Loader | 0 veya en fazla 400-800 ms | Yalnız gerekliyse; siteyi bloke etmez. |



> DÜZELTME “3 saniyelik loader”, “120 FPS hissi” ve zorunlu ağır custom cursor kaldırılmıştır. Hareket kalitesi ölçülebilir performans ve erişilebilirlik sınırları içinde uygulanır.



# 8.8 Hero Video Teknik Standardı


| Alan | Standart |
| --- | --- |
| Süre | Yaklaşık 12-25 saniye; döngü noktası hissedilmez. |
| Kare Hızı | 24 veya 30 FPS; 60 FPS zorunlu değildir. |
| Çözünürlük | Desktop için optimize 1080p; mobil için 720p veya poster. |
| Format | WebM + MP4 fallback. |
| Ses | Muted, playsInline; otomatik ses yok. |
| Poster | Yüksek kaliteli AVIF/WebP; ilk boyamada görünür. |
| Overlay | Her sahnede metin kontrastı sağlar. |
| Fallback | Reduced data, reduced motion veya bağlantı sorunu için poster. |
| İçerik | Kongre salonu, LED sahne, konuşmacı, kayıt, networking, gala, destinasyon. |




> BÖLÜM 09 SAYFA TASARIMLARI VE İÇERİK MODELLERİ Menü başlıkları korunarak her sayfanın görev ve CMS alanlarının tanımlanması



# 9.1 ANA SAYFA

Ana sayfanın amacı ayrıntılı katalog sunmak değil, güçlü marka algısı oluşturmak ve kullanıcıyı ilgili iç sayfaya veya teklif aksiyonuna yönlendirmektir.

## Üst Banner

- 44-56 px yükseklik.
- Telefon, e-posta, WhatsApp ve seçili sosyal bağlantılar.
- Sağda Hemen Teklif Al butonu.
- Mobilde yalnız kritik iletişim ve CTA.
- İçerik site_settings üzerinden yönetilir.

## Header ve Navigasyon

- Hero üzerinde şeffaf; scroll sonrasında koyu cam yüzey.
- Logo, menü paneli, TR/EN hazırlığı ve Teklif Al aksiyonu.
- Menü başlıkları exact navigation config’ten okunur.
- Çok sayıda üst başlık nedeniyle erişilebilir mega menu/full-screen navigation.
- Active route görsel olarak belirtilir; başlık metni değişmez.

## Hero

Önerilen ana başlık: “Doğru Planlama. Unutulmaz Deneyimler.”
Önerilen alt metin: “Ulusal ve uluslararası kongre, toplantı ve etkinlik organizasyonlarında fikirleri kusursuz deneyimlere dönüştürüyoruz.”
- min-height: 100svh.
- Primary CTA: Teklif Al.
- Secondary CTA: Projelerimizi İncele.
- Desktop ve mobile ayrı medya alanı.
- Scroll indicator doğrudan değer kartlarına gider.

## Beş Premium Değer Kartı


| No | Başlık | Açıklama |
| --- | --- | --- |
| 01 | Kusursuz Planlama | Her ayrıntıyı önceden düşünür, olası riskleri etkinlik başlamadan yönetiriz. |
| 02 | Uluslararası Standart | Yerel deneyimi global hizmet anlayışı ve kurumsal süreç disipliniyle birleştiririz. |
| 03 | Deneyim Odaklı | Her temas noktasını katılımcılar için akıcı ve hatırlanabilir bir deneyime dönüştürürüz. |
| 04 | Tek Noktadan Yönetim | Planlama, kayıt, teknik operasyon, konaklama ve koordinasyonu tek merkezden yürütürüz. |
| 05 | Güven Veren Çözümler | Şeffaf iletişim, profesyonel ekip ve sürdürülebilir kalite anlayışıyla ilerleriz. |



## Footer


| Kolon | İçerik |
| --- | --- |
| Marka | Logo, kısa açıklama ve sosyal medya. |
| Hızlı Menü | Menü başlıklarının gerekli kopyaları; tek config kaynağı. |
| Yasal | KVKK Aydınlatma Metni, Gizlilik, Çerez, Açık Rıza, Yasal Dayanaklar. |
| İletişim | Telefon, e-posta, adres, çalışma saatleri, WhatsApp ve Google Maps. |
| Alt Satır | © 2026 SDKONGRE. Tüm hakları saklıdır. |



# 9.2 KURUMSAL

KURUMSAL üst menüsü Hakkımızda, Hikayemiz, Misyon, Vizyon ve Değerlerimiz alt sayfalarını açar. Her alt sayfa ayrı route ve ayrı CMS kaydı olarak yönetilir; başlıklar değiştirilemez.

| Sayfa | İçerik Modeli |
| --- | --- |
| Hakkımızda | Hero, kısa tanıtım, çalışma alanları, kurumsal yaklaşım, CTA, SEO. |
| Hikayemiz | Kronoloji/timeline, dönüm noktaları, görsel, CTA, SEO. |
| Misyon | Ana metin, destekleyici ilkeler, görsel, CTA, SEO. |
| Vizyon | Ana metin, gelecek yaklaşımı, görsel, CTA, SEO. |
| Değerlerimiz | Değer kartları, açıklamalar, ikonlar, sıra, CTA, SEO. |



# 9.3 NEDEN BİZ

- Güven ve farklılaşma amacı taşır; hizmet listesi gibi kurgulanmaz.
- Önerilen bloklar: yaklaşım, tek noktadan yönetim, deneyim, şeffaflık, teknoloji, kriz/risk yönetimi ve kalite.
- Yalnız doğrulanabilir sayı veya iddialar kullanılmalıdır.
- CMS alanları: hero, value_items, proof_items, image, CTA ve SEO.
- Admin panelinde “Her hizmet için” alanları kullanılmaz.

# 9.4 HİZMETLERİMİZ

Ana sayfa kartları; menüde belirtilen sekiz hizmeti aynı hiyerarşiyle gösterir. Her hizmet ayrı detay sayfasına sahiptir.

| Hizmet | Detay Sayfası Bölümleri |
| --- | --- |
| Lansman ve Kurumsal Etkinlikler | Hero, ihtiyaç, çözüm yaklaşımı, kapsam, süreç, galeri, SSS, CTA. |
| Kongre Organizasyonları | Hero, bilimsel/kurumsal kapsam, kayıt, program, salon, teknik, konaklama, CTA. |
| Toplantı  ve Sempozyum Yönetimi | Hero, içerik/konuşmacı, salon, teknik, katılımcı, raporlama, CTA. |
| Workshop Organizasyonları | Hero, format, kapasite, ekipman, uygulama akışı, CTA. |
| Fuar ve Sergi Organizasyonları | Hero, alan, stand, lojistik, operasyon, ziyaretçi deneyimi, CTA. |
| Seyahat ve Konaklama Yönetimi | Hero, otel, oda blokajı, rezervasyon, misafir iletişimi, CTA. |
| Transfer ve lojistik Yönetimi | Hero, rota, araç, karşılama, operasyon merkezi, CTA. |
| Tedarikçi ve Operasyon Yönetimi | Hero, tedarikçi seçimi, sözleşme, kontrol, saha ve raporlama, CTA. |



# 9.5 DİJİTAL HİZMETLER


| Dijital Hizmet | Detay Sayfası Odağı |
| --- | --- |
| Katılımcı ve Kayıt Yönetimi | Kayıt akışı, ödeme opsiyonu, veri yönetimi ve raporlama. |
| Dijital Altyapı ve Etkinlik Teknolojileri | Web, mobil, ekran, yayın ve entegrasyon altyapısı. |
| QR Kod ve Yaka Kart Sistemleri | QR üretim, check-in, yaka kartı ve giriş raporu. |
| Online Davet ve İletişim Yönetimi | Davet, RSVP, e-posta/SMS bildirim ve segmentasyon. |
| Organizasyon Takip Sistemleri | Görev, takvim, tedarikçi ve saha takibi. |
| Veri ve Raporlama Sistemleri | Kayıt, katılım, operasyon ve yönetim raporları. |
| Veri Güvenliği ve Merkezi Yönetim | Yetki, erişim, veri saklama ve merkezi kontrol. |


Dijital hizmet detaylarında sistemin gerçekten sunduğu özellikler anlatılmalıdır. Mevcut olmayan entegrasyon, ödeme, güvenlik sertifikası veya otomasyon özelliği pazarlama amacıyla yazılmamalıdır.

# 9.6 ORGANİZASYON SURECİ


| Adım | Sayfa İçeriği |
| --- | --- |
| Brief | Hedef, kapsam, bütçe, tarih, katılımcı ve beklenti toplama. |
| Planlama | Mekân, program, ekip, teknoloji, tedarikçi ve risk planı. |
| Teklif | Kapsam, teslimatlar, takvim, fiyat ve koşulların sunulması. |
| Onay | Sözleşme, sorumluluklar, ödeme ve uygulama planının kesinleşmesi. |
| Operasyon | Hazırlık, kurulum, kayıt, saha yönetimi, teknik ve kriz iletişimi. |
| Raporlama | Katılım, operasyon, bütçe ve iyileştirme raporlarının paylaşılması. |


Bu adımlar tek bir sayfada sıralı timeline veya sticky process layout ile sunulur. Her adım admin panelinde title, description, icon, order ve visibility alanlarıyla yönetilir; adım başlıkları korunur.

# 9.7 PROJELER

- Liste sayfası kategori, yıl, şehir veya etkinlik türüne göre filtrelenebilir.
- İlk proje listesi sunucu tarafında render edilir.
- Proje detayı: özet, müşteri/kurum, tarih, lokasyon, ihtiyaç, çözüm, kullanılan hizmetler, galeri ve sonuç.
- Doğrulanmayan başarı rakamı kullanılmaz.
- Logo ve görsel yayın izinleri kontrol edilir.
- Projeler draft, review, published ve archived durumlarını destekler.

# 9.8 REFERANSLAR

- Logo duvarında optik ağırlık dengesi sağlanır.
- Yalnız izinli ve güncel referanslar yayımlanır.
- Monokrom başlangıç ve hover’da orijinal renk kullanılabilir.
- Onaylı kısa başarı hikâyeleri opsiyoneldir.
- Admin alanları: name, logo, website, category, story, order ve visible.

# 9.9 KVKK


| Alt Sayfa | Zorunlu Alanlar |
| --- | --- |
| KVKK Aydınlatma Metni | Başlık, gövde, veri sorumlusu bilgisi, amaç, hukuki sebep, aktarım, haklar, tarih ve sürüm. |
| Gizlilik Politikası | Veri türleri, kullanım, saklama, güvenlik, üçüncü taraflar ve iletişim. |
| Çerez (Cookie) Politikası | Çerez kategorileri, süre, sağlayıcı, amaç ve tercih yönetimi. |
| Açık Rıza Metni | Açık, ayrı, özgür iradeye dayalı onay; form ile ilişki. |
| Yasal Dayanaklar | İlgili mevzuat ve politikalara erişim. |


Yasal metinler hukuk danışmanı veya yetkili kişi tarafından onaylanmadan üretim metni olarak kabul edilmemelidir. Admin paneli sürüm ve yürürlük tarihi tutmalıdır.

# 9.10 İLETİŞİM

- İletişim bilgileri, çalışma saatleri, harita, WhatsApp ve erişilebilir form.
- Harita sayfa ilk yükünde zorunlu iframe olarak yüklenmez; etkileşim veya lazy loading kullanılır.
- Form verileri Supabase’e yazılır; e-posta bildirimi ayrıca gönderilir.
- Adres Google Maps bağlantısı açar.
- Telefon ve e-posta doğru tel: ve mailto: protokolleriyle çalışır.


> BÖLÜM 10 ADMIN PANELİ VE İÇERİK YÖNETİMİ Aynı Next.js uygulaması içinde Supabase tabanlı güvenli yönetim alanı



# 10.1 Yönetim Paneli Konumu

Admin paneli aynı GitHub repository ve Vercel projesi içinde /admin route grubu altında geliştirilir. Supabase Auth ile giriş yapılır. Public site ile admin paneli component ve veri tiplerini paylaşabilir; ancak admin bundle’ı public sayfalara gereksiz JavaScript yüklememelidir.

# 10.2 Panel Modülleri


| Modül | Kapsam |
| --- | --- |
| Dashboard | Yeni iletişim, yeni teklifler, taslak içerikler, son yayınlar, sistem uyarıları. |
| Ana Sayfa | Üst banner, hero başlık/metin, CTA, desktop/mobile video, poster, 5 değer kartı ve footer içerikleri. |
| Kurumsal | Hakkımızda, Hikayemiz, Misyon, Vizyon ve Değerlerimiz içerikleri. |
| Neden Biz | Farklılaşma kartları, kanıt alanları, görsel ve CTA. |
| Hizmetlerimiz | Sekiz hizmetin detay içeriği, görsel, galeri, SSS, sıralama ve SEO. |
| Dijital Hizmetler | Yedi dijital hizmetin detay içeriği, görsel, özellik ve SEO. |
| Organizasyon Süreci | Brief, Planlama, Teklif, Onay, Operasyon ve Raporlama adımları. |
| Projeler | Vaka içeriği, medya, etiket, tarih, yer, hizmet ilişkisi ve yayın durumu. |
| Referanslar | Logo, firma adı, kategori, sıra, görünürlük ve onaylı hikâye. |
| KVKK | Beş yasal sayfa, sürüm, yürürlük tarihi ve yayın durumu. |
| İletişim | Gelen mesajlar, durum, atama, not ve dışa aktarma yetkisi. |
| Teklif Talepleri | Lead detayları, hizmet seçimleri, durum, sorumlu ve notlar. |
| Medya Kütüphanesi | Storage dosyaları, alt metin, odak noktası ve kullanım yeri. |
| SEO | Global metadata, sayfa metadata, OG görsel, canonical ve index ayarı. |
| Kullanıcılar | Rol, aktiflik, 2FA ve oturum yönetimi. |
| Ayarlar | Logo, favicon, iletişim, sosyal ağlar, harita, analitik ve form alıcısı. |
| Audit Log | Kritik değişikliklerin kim, ne zaman, ne yaptığı. |



# 10.3 Ana Sayfa Yönetimi


| Alan | Admin Kontrolü | Kilitli Tasarım Kuralı |
| --- | --- | --- |
| Üst Banner | Metin, telefon, e-posta, link ve görünürlük. | Yükseklik, renk ve layout kodda. |
| Hero | Başlık, açıklama, CTA, poster ve video. | Grid, font ölçeği, overlay ve animasyon kodda. |
| Değer Kartları | Başlık, açıklama, ikon ve sıra. | Kart componenti, hover ve radius kodda. |
| Footer | Kurumsal metin, iletişim, sosyal ve yasal linkler. | Kolon yapısı ve responsive davranış kodda. |
| Menü | Görünürlük ve gerekirse sıra. | Başlık metinleri ve route eşleşmesi kilitli. |



> ÖNEMLİ DÜZELTME Admin panelinden sayfa tasarımları, font ailesi, rastgele yazı boyutu, grid veya component yapısı değiştirilmeyecektir. Bu yetki tasarım sistemini bozar, responsive hatalara ve marka tutarsızlığına yol açar.



# 10.4 Editör Deneyimi

- Rich text alanları kontrollü blok editör kullanmalı; serbest HTML kabul edilmemelidir.
- Başlık uzunluğu, görsel oranı, dosya boyutu ve meta karakter sayısı için anlık uyarı gösterilir.
- Kaydet, Önizle, İncelemeye Gönder, Yayınla, Zamanla ve Arşivle aksiyonları ayrıdır.
- Unsaved changes uyarısı bulunur.
- Yayın öncesi validasyon; slug, başlık, ana görsel, alt metin ve SEO eksiklerini gösterir.
- Canlı önizleme Vercel preview veya güvenli preview token üzerinden açılır.
- İçerik geçmişi ve önceki sürüme geri dönme sağlanır.

# 10.5 Rol Bazlı İş Akışı


| İşlem | Yazar | Editör | Admin | Süper Admin |
| --- | --- | --- | --- | --- |
| Taslak oluşturma | Evet | Evet | Evet | Evet |
| Kendi taslağını düzenleme | Evet | Evet | Evet | Evet |
| Tüm içeriği düzenleme | Hayır | Evet | Evet | Evet |
| Review’a gönderme | Evet | Evet | Evet | Evet |
| Yayınlama | Hayır | Politikaya bağlı | Evet | Evet |
| Yasal metin yayınlama | Hayır | Hayır | Yetkiyle | Evet |
| Kullanıcı yönetimi | Hayır | Hayır | Sınırlı | Evet |
| Sistem ayarı | Hayır | Hayır | Sınırlı | Evet |
| Audit log görüntüleme | Hayır | Sınırlı | Evet | Evet |



# 10.6 Medya Kütüphanesi

- Dosya yüklerken tür, boyut, ölçü ve kullanım hakkı kontrolü.
- Alt metin zorunlu/opsiyonel kuralları kullanım bağlamına göre gösterilir.
- SVG yalnız güvenli ve sanitize edilmiş içerik olarak kabul edilir.
- Görsel odak noktası kart/hero crop davranışında kullanılır.
- Dosya adları normalize edilir ve çakışma önlenir.
- Kullanımda olan dosya silinmek istendiğinde ilişki listesi gösterilir.
- Public ve private bucket ayrımı editöre anlaşılır biçimde yansıtılır.

# 10.7 Menü Başlıkları Koruma Mekanizması

- Başlıklar kod tarafındaki navigation config dosyasından gelir.
- Admin panelinde başlık metni alanı gösterilmez veya salt okunur gösterilir.
- Route slug değişikliği yalnız geliştirici ve yönlendirme planıyla yapılır.
- Footer menüsü aynı config’i kullanarak çift veri girişini engeller.
- TR/EN altyapısı açılırsa Türkçe başlıklar korunur; İngilizce karşılıklar ayrı locale config’te tanımlanır.


> BÖLÜM 11 SEO, ERİŞİLEBİLİRLİK VE PERFORMANS Arama görünürlüğü, WCAG 2.2 AA ve Core Web Vitals kabul kriterleri



# 11.1 Next.js SEO Mimarisi

Next.js App Router kullanıldığı için ayrı bir Next SEO bağımlılığı zorunlu değildir. Metadata API, generateMetadata, sitemap.ts, robots.ts ve JSON-LD componentleri yeterli ve daha doğal bir mimari sağlar.

| Sayfa Türü | Metadata / Schema |
| --- | --- |
| Ana Sayfa | Organization veya LocalBusiness, WebSite, Open Graph. |
| Kurumsal / Neden Biz | WebPage ve BreadcrumbList. |
| Hizmet Detayı | Service + BreadcrumbList; yalnız gerçek hizmet bilgileri. |
| Proje Detayı | Article/CreativeWork benzeri uygun yapı; uydurma rating kullanılmaz. |
| Referanslar | WebPage; müşteri logo listesi schema’ya zorla dönüştürülmez. |
| KVKK | WebPage; noindex kararı hukuk ve SEO stratejisine göre. |
| İletişim | ContactPage ve Organization iletişim bilgileri. |



# 11.2 SEO Zorunlulukları

- [ ] Her sayfada benzersiz title ve meta description.
- [ ] Tek H1 ve sıralı H2/H3 hiyerarşisi.
- [ ] Canonical URL production domainini kullanır.
- [ ] TR/EN yayına alınırsa hreflang ve x-default doğru uygulanır.
- [ ] Open Graph görseli 1200x630 ve sayfaya uygun.
- [ ] İç linkler anlamlı anchor text kullanır.
- [ ] Projeler ve hizmetler XML sitemap’e yalnız published durumda girer.
- [ ] Preview ve staging noindex/nofollow olur.
- [ ] Eski URL’ler için 301 redirect haritası hazırlanır.
- [ ] Structured data yalnız sayfada gerçekten görünen veriyi içerir.

# 11.3 Erişilebilirlik


| Alan | Kabul Kriteri |
| --- | --- |
| Klavye | Tüm menü, modal, form, slider ve CTA klavye ile kullanılabilir. |
| Focus | Görünür focus; focus sırası görsel sırayla uyumlu. |
| Kontrast | Metin ve UI renkleri WCAG 2.2 AA seviyesini karşılar. |
| Touch | Etkileşim alanları en az 44x44 px. |
| Form | Gerçek label, açıklayıcı hata, aria-describedby ve hata özeti. |
| Navigasyon | Skip link, semantic nav ve doğru landmark yapısı. |
| Motion | prefers-reduced-motion desteği. |
| Video | Dekoratif video erişilebilirlik ağacında uygun davranır; ses otomatik başlamaz. |
| Görsel | Anlamlı görselde açıklayıcı alt; dekoratifte boş alt. |
| Zoom | %200 zoom ve büyük metinde içerik taşmaz. |



# 11.4 Performans Hedefleri


| Metrik | Hedef | Uygulama |
| --- | --- | --- |
| LCP | ≤ 2.5 sn | Hero poster, font, kritik CSS ve server render. |
| INP | ≤ 200 ms | Client JS azaltma, event ve form optimizasyonu. |
| CLS | ≤ 0.1 | Görsel oranları, font metric ve sabit alanlar. |
| Lighthouse Performance | 95+ hedef | Production build ve gerçek cihaz ölçümü. |
| Accessibility | 100 hedef | Otomatik ve manuel test. |
| Best Practices | 100 hedef | HTTPS, modern API ve güvenli kaynaklar. |
| SEO | 100 hedef | Metadata, crawl, semantic yapı ve mobile. |



# 11.5 Performans Bütçesi

- Hero video ilk yüklemede sayfanın etkileşimini engellemez.
- Client component yalnız gerektiği kadar küçük tutulur.
- Bir sayfada hem GSAP hem Framer Motion aynı görev için kullanılmaz.
- Lenis varsayılan zorunluluk değildir; native scroll yeterliyse eklenmez.
- Custom cursor touch cihazlarda yüklenmez.
- Üçüncü taraf scriptler consent ve etkileşim sonrasına ertelenir.
- Google Maps ilk görüntüde iframe yüklemek yerine lazy veya tıklama sonrası açılır.
- Görseller AVIF/WebP, doğru sizes ve responsive srcset ile sunulur.
- Font sayısı ve ağırlıkları sınırlandırılır; next/font kullanılır.
- Supabase sorguları yalnız gereken kolonları çeker; N+1 sorgu önlenir.

# 11.6 İçerik ve SEO Yönetim Alanları


| Alan | Kural |
| --- | --- |
| SEO Title | Yaklaşık 45-60 karakter rehberi; otomatik önizleme. |
| Meta Description | Yaklaşık 120-160 karakter rehberi; zorunlu değilse fallback. |
| OG Image | Sayfaya özgü veya global fallback. |
| Canonical | Normalde otomatik; özel durumda yetkili kullanıcı. |
| Index | Yayın durumuna göre; draft ve preview indexlenmez. |
| Slug | Benzersiz, lower-case, tireli ve redirect kontrollü. |
| Alt Text | Görsel bağlamına göre; dosya adı otomatik alt metin olmaz. |




> BÖLÜM 12 GÜVENLİK, KVKK VE OPERASYONEL KONTROLLER Uygulama, veritabanı, admin, form ve üçüncü taraf güvenliği



# 12.1 Uygulama Güvenliği

- [ ] Güvenli HTTP header’ları next.config veya Vercel yapılandırması üzerinden uygulanır.
- [ ] Content Security Policy kullanılan üçüncü taraf alanlarına göre dar kapsamlı tanımlanır.
- [ ] Admin session güvenli cookie ve Supabase SSR yaklaşımıyla yönetilir.
- [ ] Server action ve route handler’larda yetki kontrolü zorunludur.
- [ ] İstemci tarafındaki gizleme yetkilendirme sayılmaz; sunucu ve RLS ayrıca kontrol eder.
- [ ] Zod ile hem client hem server validation yapılır.
- [ ] Rate limit giriş, form ve hassas admin endpoint’lerinde uygulanır.
- [ ] Gizli anahtarlar Vercel Environment Variables içinde tutulur.
- [ ] Paket güncellemeleri ve dependency audit düzenli çalıştırılır.
- [ ] Production hata mesajı hassas ayrıntı göstermez.

# 12.2 Supabase Güvenliği

- [ ] Tüm public tablolar ve Storage bucket’larında RLS etkin.
- [ ] Service Role yalnız server tarafında ve minimum endpointte.
- [ ] Admin role bilgisi profiles tablosu ve güvenli claim/policy ile doğrulanır.
- [ ] Public SELECT sorguları status = published koşuluyla sınırlı.
- [ ] Contact ve quote tablolarına browser’dan serbest SELECT izni verilmez.
- [ ] Audit log satırları normal kullanıcı tarafından güncellenemez veya silinemez.
- [ ] Private bucket dosyaları signed URL ve kısa süreyle açılır.
- [ ] Database function security definer kullanılırsa search_path ve yetki dikkatle sınırlandırılır.
- [ ] Staging ve production farklı Supabase projeleri veya en az ayrı güvenlik sınırları kullanır.

# 12.3 KVKK ve Çerez

- Zorunlu çerezler açık rıza gerektirmeyen teknik ihtiyaçlarla sınırlıdır.
- Analitik ve pazarlama scriptleri kullanıcı tercihi alınmadan çalışmaz.
- Çerez paneli kategorileri ayrı açıp kapatmaya izin verir.
- KVKK onayı ile pazarlama izni tek kutuda birleştirilmez.
- Form kayıtlarında onay zamanı ve ilgili metin sürümü saklanır.
- Kişisel veri saklama süresi ve silme/anonymization prosedürü belirlenir.
- Yasal metin içerikleri yetkili hukuk danışmanı tarafından onaylanır.
- Üçüncü taraf veri aktarımı gerçek servis ve ülke durumuna göre metinlere yansıtılır.

# 12.4 Loglama


| Log Türü | İçerik | Saklama Yaklaşımı |
| --- | --- | --- |
| Deployment Log | Build, route ve runtime hataları. | Vercel retention + gerekirse dış hata izleme. |
| Admin Audit | Kullanıcı, işlem, entity ve önce/sonra. | Uzun süreli, değiştirilemez yaklaşım. |
| Form Event | DB kaydı, e-posta sonucu, provider ID. | İş ihtiyacı ve KVKK süresine göre. |
| Auth Event | Başarılı/başarısız giriş ve 2FA. | Güvenlik ihtiyacına göre sınırlı. |
| Security Event | Rate limit, spam ve yetkisiz deneme. | IP minimizasyonu ve sınırlı süre. |



# 12.5 Güvenlik Olayı Müdahalesi

1. Etkilenen anahtarlar derhal rotate edilir.
1. Vercel deployment ve Supabase audit kayıtları incelenir.
1. Gerekirse admin oturumları sonlandırılır.
1. Etkilenen endpoint geçici olarak devre dışı bırakılır veya rate limit sıkılaştırılır.
1. Veri etkisi ve bildirim yükümlülüğü yetkili kişiyle değerlendirilir.
1. Düzeltme GitHub PR ile yapılır; production üzerinde kalıcı manuel patch bırakılmaz.
1. Olay sonrası neden, etki, müdahale ve önleme aksiyonu kaydedilir.


> BÖLÜM 13 GELİŞTİRME VE YAYIN PLANI GitHub’dan production domainine kontrollü proje akışı



# 13.1 Fazlar


| Faz | Çalışma | Teslim |
| --- | --- | --- |
| Faz 0 - Hazırlık | Logo, içerik, domain/DNS, e-posta kayıtları, Supabase ve Vercel erişimleri. | Onaylı kapsam ve erişim listesi. |
| Faz 1 - Repository | GitHub repo, branch protection, Next.js kurulumu, lint/test ve Vercel bağlantısı. | Boş ama deploy olan temel proje. |
| Faz 2 - Tasarım Sistemi | Token, typography, grid, button, form, card, header, mega menu ve footer. | Responsive UI kit. |
| Faz 3 - Public Sayfalar | Ana sayfa ve tüm menü sayfaları; gerçek veri yapısı. | Staging public site. |
| Faz 4 - Supabase | Schema, migrations, seed, RLS, Auth, Storage ve server clients. | Güvenli veri katmanı. |
| Faz 5 - Admin Paneli | İçerik modülleri, medya, yayın akışı, form ve audit. | Kodsuz içerik yönetimi. |
| Faz 6 - Entegrasyon | E-posta, spam, analitik, harita, çerez paneli ve SEO. | Tam çalışan sistem. |
| Faz 7 - QA | Responsive, accessibility, browser, performance, security ve content QA. | Kabul raporu. |
| Faz 8 - Domain Geçişi | Natro DNS, Vercel domain/SSL, redirect ve e-posta kontrolü. | Production yayını. |
| Faz 9 - İzleme | Log, uptime, form teslimi, Search Console ve hata takibi. | Stabilizasyon ve bakım. |



# 13.2 Preview ve Onay Akışı

1. Geliştirici feature branch açar.
1. Kod GitHub’a push edildiğinde Vercel Preview oluşur.
1. Tasarım ve içerik kontrolü preview URL üzerinden yapılır.
1. Hatalar aynı branch üzerinde düzeltilir.
1. Automated checks ve manuel checklist tamamlanır.
1. Yetkili onayından sonra PR main branch’e merge edilir.
1. Vercel production deployment otomatik başlar.
1. Production smoke test tamamlanır.
1. Gerekirse Vercel rollback ve GitHub düzeltme PR akışı uygulanır.

# 13.3 İlk Kurulum Checklist

- [ ] GitHub organization/repository sahipliği SDKONGRE hesabındadır.
- [ ] En az iki yönetici yetkisi vardır; kişisel tek hesaba bağımlı değildir.
- [ ] Vercel proje sahipliği kurumsal hesaptadır.
- [ ] Supabase production ve staging proje sahipliği kurumsal hesaptadır.
- [ ] Natro domain ve DNS erişimi kayıtlıdır.
- [ ] Mevcut MX, SPF, DKIM ve DMARC kayıtları export edilmiştir.
- [ ] Vercel environment variable listesi ve sorumluları belirlenmiştir.
- [ ] Form e-posta sağlayıcısı ve doğrulanmış domain hazırlanmıştır.
- [ ] Production ve staging domain kararları verilmiştir.
- [ ] İçerik ve görsel kullanım hakları doğrulanmıştır.

# 13.4 Domain Geçiş Günü

- [ ] Production build ve smoke test tamamlandı.
- [ ] Mevcut site URL ve redirect listesi kaydedildi.
- [ ] DNS kayıtlarının yedeği alındı.
- [ ] Natro web kayıtları Vercel talimatına göre değiştirildi.
- [ ] MX/SPF/DKIM/DMARC kayıtlarının aynı kaldığı doğrulandı.
- [ ] Vercel domain doğrulaması ve SSL aktif oldu.
- [ ] Apex/www/HTTP yönlendirmeleri test edildi.
- [ ] İletişim ve teklif formları gerçek production akışıyla test edildi.
- [ ] Search Console domain/URL doğrulaması kontrol edildi.
- [ ] 24-48 saat hata, form ve uptime izleme yoğunlaştırıldı.

# 13.5 Bakım Modeli


| Periyot | Kontrol |
| --- | --- |
| Her yayın | Build, smoke test, form ve kritik route kontrolü. |
| Haftalık | Form teslimleri, runtime hataları, spam ve uptime. |
| Aylık | Dependency, kullanıcı yetkileri, medya/Storage ve SEO teknik kontrol. |
| 3 Aylık | Lighthouse/Web Vitals, broken link, içerik güncelliği ve yasal linkler. |
| 6 Aylık | RLS/rol incelemesi, backup restore testi ve güvenlik gözden geçirme. |
| Yıllık | Domain, DNS, SSL, e-posta kayıtları, KVKK metinleri ve erişim sahipliği. |




> BÖLÜM 14 KALİTE KONTROL LİSTESİ Tasarım, kod, Supabase, deployment, domain ve yayın için 100 maddelik kontrol



# A. Kapsam ve Menü

- [ ] Ana sayfa yalnız Üst Banner, Header, Hero, 5 Değer Kartı ve Footer içeriyor.
- [ ] Menü başlıkları dokümanda belirtilen biçimde korunuyor.
- [ ] Route slug değişse de kullanıcıya görünen başlık değişmiyor.
- [ ] KURUMSAL altındaki beş başlık eksiksiz.
- [ ] HİZMETLERİMİZ altındaki sekiz başlık eksiksiz.
- [ ] DİJİTAL HİZMETLER altındaki yedi başlık eksiksiz.
- [ ] ORGANİZASYON SURECİ adımları eksiksiz.
- [ ] KVKK altındaki beş başlık eksiksiz.
- [ ] Blog veya başka kapsam dışı başlık menüye eklenmemiş.
- [ ] Teklif Al, menü başlığı değil ayrı CTA olarak doğru yerde.

# B. Tasarım ve Responsive

- [ ] Site ilk 5 saniyede premium ve güven veren algı oluşturuyor.
- [ ] Hazır tema hissi oluşturmuyor.
- [ ] Gold renk sınırlı ve tutarlı kullanılıyor.
- [ ] Desktop grid 12 kolon ve container sınırları tutarlı.
- [ ] Tablet 8 kolon, mobil 4 kolon davranışı uygulanmış.
- [ ] 320 px genişlikte yatay taşma yok.
- [ ] Mobil tasarım masaüstünün küçültülmüş kopyası değil.
- [ ] Footer sabit 450 px’e kilitli değil; içeriğe göre büyüyor.
- [ ] Hero 100svh yaklaşımıyla mobil tarayıcıya uyumlu.
- [ ] Font, spacing, radius ve gölge tokenları tek kaynaktan geliyor.

# C. Hero ve Motion

- [ ] Hero başlığı iki satırı aşmıyor.
- [ ] Video sessiz ve playsInline çalışıyor.
- [ ] Desktop ve mobile medya ayrı optimize edilmiş.
- [ ] Poster görseli video öncesi ve fallback olarak kullanılıyor.
- [ ] Video 4K 60 FPS zorunluluğu taşımıyor; web bütçesine uygun.
- [ ] Loader siteyi 3 saniye bloke etmiyor.
- [ ] Lenis kullanılmasa da site doğru çalışıyor.
- [ ] Reduced motion tercihinde hareketler sadeleşiyor.
- [ ] Custom cursor touch cihazlarda yok.
- [ ] Animasyonlar CLS ve etkileşim gecikmesi oluşturmuyor.

# D. GitHub ve Kod Kalitesi

- [ ] main branch doğrudan push’a kapalı.
- [ ] Her değişiklik PR üzerinden ilerliyor.
- [ ] PR’da Vercel Preview bağlantısı var.
- [ ] TypeScript strict yaklaşımı uygulanıyor.
- [ ] Lint ve build GitHub Actions’ta çalışıyor.
- [ ] Testler kritik akışları kapsıyor.
- [ ] .env dosyaları repository’ye commit edilmemiş.
- [ ] .env.example güncel.
- [ ] Supabase migrations GitHub’da sürümlü.
- [ ] README kurulum ve deployment adımlarını içeriyor.

# E. Vercel

- [ ] GitHub repository Vercel’e doğru bağlı.
- [ ] Production branch main.
- [ ] Preview deploymentlar production verisine kontrolsüz yazmıyor.
- [ ] Staging ve production environment variableları ayrılmış.
- [ ] Service Role yalnız server environmentta.
- [ ] Preview ve staging noindex.
- [ ] Production deployment sonrası smoke test var.
- [ ] Vercel logları erişilebilir.
- [ ] Rollback prosedürü test edilmiş.
- [ ] Canonical site URL production domainini kullanıyor.

# F. Natro ve Domain

- [ ] Natro DNS kayıtlarının değişiklik öncesi yedeği alınmış.
- [ ] Vercel’in güncel domain talimatları uygulanmış.
- [ ] Apex ve www arasından canonical seçim yapılmış.
- [ ] HTTP trafiği HTTPS’e yönleniyor.
- [ ] Alternatif domain canonical adrese 301 ile gidiyor.
- [ ] MX kayıtları korunmuş.
- [ ] SPF kaydı korunmuş ve çakışmıyor.
- [ ] DKIM kayıtları korunmuş.
- [ ] DMARC kaydı korunmuş.
- [ ] Domain geçişi sonrası web ve e-posta birlikte test edilmiş.

# G. Supabase

- [ ] Production ve staging veri katmanı ayrılmış.
- [ ] Tüm public tablolar RLS etkin.
- [ ] Public sorgular yalnız published içerikleri okuyor.
- [ ] Service Role browser bundle’a çıkmıyor.
- [ ] Admin Auth güvenli SSR session ile çalışıyor.
- [ ] Role ve profiles ilişkisi yetki kontrolünde kullanılıyor.
- [ ] Contact ve quote tablolarında public SELECT yok.
- [ ] Storage bucket erişimleri doğru ayrılmış.
- [ ] Migration önce staging üzerinde uygulanıyor.
- [ ] Backup ve restore planı mevcut.

# H. Admin Paneli

- [ ] Admin /admin altında güvenli çalışıyor.
- [ ] Menü başlıkları admin tarafından serbestçe değiştirilemiyor.
- [ ] Admin sayfa tasarımı ve font boyutu gibi sistemi bozan ayarları açmıyor.
- [ ] Her modül kendi içerik modeline sahip.
- [ ] Kurumsal, Neden Biz ve KVKK için “Her hizmet için” kopyası kalmamış.
- [ ] Taslak, review, published ve archived durumları var.
- [ ] Önizleme ve yayın aksiyonları ayrılmış.
- [ ] Medya alt metin ve odak noktası yönetiliyor.
- [ ] Kullanımdaki medya silme uyarısı var.
- [ ] Audit log kritik değişiklikleri kaydediyor.

# I. Form, KVKK ve Güvenlik

- [ ] Form hem client hem server tarafında doğrulanıyor.
- [ ] Spam doğrulaması ve rate limit var.
- [ ] DB kaydı e-posta gönderiminden bağımsız izleniyor.
- [ ] E-posta başarısız olsa da kayıt kaybolmuyor.
- [ ] KVKK onayı önceden işaretli değil.
- [ ] Pazarlama izni KVKK onayından ayrı.
- [ ] Kişisel veri analitik eventlere yazılmıyor.
- [ ] Form retention süresi belirlenmiş.
- [ ] Güvenli header ve CSP uygulanmış.
- [ ] Paket ve anahtar güncelleme süreci var.

# J. SEO, Erişilebilirlik ve Yayın

- [ ] Next.js Metadata API kullanılıyor; gereksiz Next SEO bağımlılığı yok.
- [ ] Her sayfanın benzersiz title ve description alanı var.
- [ ] Canonical, sitemap, robots ve gerekli hreflang doğru.
- [ ] Structured data yalnız gerçek bilgi içeriyor.
- [ ] Tüm menü ve formlar klavye ile kullanılabiliyor.
- [ ] Focus görünür ve sırası doğru.
- [ ] Dokunma hedefleri en az 44x44 px.
- [ ] LCP, INP ve CLS hedefleri production üzerinde ölçülmüş.
- [ ] Tüm form ve kritik linkler production domaininde test edilmiş.
- [ ] Yayın sonrası izleme ve bakım sorumlusu belirlenmiş.
Toplam kontrol maddesi: 100.


> BÖLÜM 15 NİHAİ MASTER BUILD PROMPT Kod üreten yapay zekâ veya geliştirici ekibe verilecek birleşik talimat



> KULLANIM NOTU Bu prompt yeni projeyi başlatmak için kullanılabilir. Mevcut stabil kod üzerinde çalışılacaksa en başına “mevcut tasarım ve çalışan yapıyı bozma; yalnız onaylanan değişiklikleri uygula” talimatı eklenmelidir.


ROL
Senior UI/UX Designer, Creative Director, Accessibility Specialist, Security Engineer ve Senior Full-Stack Next.js Developer gibi davran.
PROJE
SDKONGRE isimli kongre, toplantı ve etkinlik organizasyonu şirketi için premium, özgün, hızlı, erişilebilir ve yönetilebilir bir kurumsal web sitesi geliştir.
ZORUNLU TEKNİK MİMARİ
- Kaynak kod ve migrationlar GitHub repository’de tutulacak.
- Next.js App Router + TypeScript kullanılacak.
- Vercel, Preview ve Production deployment için kullanılacak.
- Domain Natro üzerinde kalacak; Vercel’in güncel DNS kayıtları Natro DNS paneline uygulanacak.
- Natro üzerindeki MX, SPF, DKIM ve DMARC kayıtları korunacak.
- Supabase Postgres veritabanı, Supabase Auth, Supabase Storage ve RLS kullanılacak.
- Admin paneli aynı Next.js uygulaması içinde /admin route’unda çalışacak.
- Service Role anahtarı yalnız server tarafında kullanılacak.
- Supabase migration dosyaları GitHub’da supabase/migrations içinde sürümlenecek.
MENÜ BAŞLIKLARI
Aşağıdaki kullanıcıya görünen menü başlıklarını değiştirme:
ANA SAYFA
KURUMSAL
- Hakkımızda
- Hikayemiz
- Misyon
- Vizyon
- Değerlerimiz
NEDEN BİZ
HİZMETLERİMİZ
- Lansman ve Kurumsal Etkinlikler
- Kongre Organizasyonları
- Toplantı  ve Sempozyum Yönetimi
- Workshop Organizasyonları
- Fuar ve Sergi Organizasyonları
- Seyahat ve Konaklama Yönetimi
- Transfer ve lojistik Yönetimi
- Tedarikçi ve Operasyon Yönetimi
DİJİTAL HİZMETLER
- Katılımcı ve Kayıt Yönetimi
- Dijital Altyapı ve Etkinlik Teknolojileri
- QR Kod ve Yaka Kart Sistemleri
- Online Davet ve İletişim Yönetimi
- Organizasyon Takip Sistemleri
- Veri ve Raporlama Sistemleri
- Veri Güvenliği ve Merkezi Yönetim
ORGANİZASYON SURECİ
- Brief
- Planlama
- Teklif
- Onay
- Operasyon
- Raporlama
PROJELER
REFERANSLAR
KVKK
- KVKK Aydınlatma Metni
- Gizlilik Politikası
- Çerez (Cookie) Politikası
- Açık Rıza Metni
- Yasal Dayanaklar
İLETİŞİM
ANA SAYFA KAPSAMI
Ana sayfada yalnız:
1. Üst Banner
2. Header
3. Tam ekran Hero
4. Beş Premium Değer Kartı
5. Footer
bulunacak. Hizmet, proje, referans, blog, ekip, istatistik veya müşteri yorumu bölümü ekleme.
HERO
- Başlık: “Doğru Planlama. Unutulmaz Deneyimler.”
- Alt metin: “Ulusal ve uluslararası kongre, toplantı ve etkinlik organizasyonlarında fikirleri kusursuz deneyimlere dönüştürüyoruz.”
- CTA: “Teklif Al” ve “Projelerimizi İncele”.
- min-height: 100svh.
- Desktop ve mobile için ayrı optimize video/poster.
- 4K 60 FPS şartı koyma; 1080p/720p ve 24/30 FPS web optimizasyonu kullan.
- muted, loop, playsInline ve poster fallback.
- prefers-reduced-motion ve prefers-reduced-data desteği.
DEĞER KARTLARI
01 Kusursuz Planlama
02 Uluslararası Standart
03 Deneyim Odaklı
04 Tek Noktadan Yönetim
05 Güven Veren Çözümler
İstatistik kullanma. Hover en fazla 6 px; touch cihazda hover’a bağımlı bilgi bırakma.
TASARIM SİSTEMİ
- Navy #071A2F
- Graphite #0E1116
- Gold #D4AF37
- Gold Dark #A88420
- White #FFFFFF
- Soft Surface #F3F5F7
- Text #25313C
- Muted #637282
Gold yalnız CTA, aktif durum ve sınırlı vurgu için kullanılacak.
Desktop 12 kolon, tablet 8 kolon, mobil 4 kolon.
Spacing tokenları: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160.
Admin paneli font, grid, radius veya sayfa tasarımını serbestçe değiştirmeyecek.
NAVİGASYON
Üst başlık sayısı fazla olduğu için başlıkları değiştirmeden erişilebilir mega menu veya full-screen navigation uygula. Klavye, touch, Escape, focus trap ve active route desteği sağla.
SUPABASE VERİ MODELİ
profiles, site_settings, pages, services, process_steps, projects, project_services, project_media, references, media_assets, legal_documents, contact_messages, quote_requests, audit_logs, content_versions ve form_events tablolarını migrationlarla oluştur.
RLS:
- anon yalnız published içerikleri okuyabilsin.
- form kayıtları doğrulanmış server endpoint üzerinden yazılsın.
- contact_messages ve quote_requests için anon SELECT olmasın.
- admin/editor yetkileri role göre ayrılsın.
Storage bucketları:
- public-site-media
- project-media
- reference-logos
- legal-files
- private-form-uploads
ADMIN PANELİ
Modüller:
Dashboard, Ana Sayfa, Kurumsal, Neden Biz, Hizmetlerimiz, Dijital Hizmetler, Organizasyon Süreci, Projeler, Referanslar, KVKK, İletişim, Teklif Talepleri, Medya, SEO, Kullanıcılar, Ayarlar, Audit Log.
Menü başlıkları read-only veya kod configinden gelsin.
İçerik durumları: draft, review, scheduled, published, archived.
Canlı önizleme, sürüm geçmişi, alt metin ve medya kullanım kontrolü ekle.
FORM AKIŞI
React Hook Form + Zod kullan.
Server tarafında tekrar doğrula.
Spam doğrulaması ve rate limit uygula.
Önce Supabase’e kaydet, sonra e-posta servisine bildirim gönder.
E-posta başarısızsa lead kaydı kaybolmasın; form_events tablosuna yaz.
KVKK onayı ile pazarlama iznini ayrı tut.
VERCEL
- GitHub bağlantısı.
- Production branch main.
- PR başına Preview Deployment.
- Local/Preview/Staging/Production environment ayrımı.
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_DB_URL
- CONTACT_TO_EMAIL
- EMAIL_FROM
- RESEND_API_KEY veya SMTP
- TURNSTILE anahtarları
- Opsiyonel GA/Meta değerleri.
Gizli değerleri hiçbir zaman client veya GitHub’a yazma.
NATRO
Domaini Vercel projesine ekle.
Vercel’in gösterdiği güncel DNS kayıtlarını Natro’da uygula.
Canonical apex/www seç.
MX, SPF, DKIM ve DMARC kayıtlarını değiştirme veya silme.
HTTPS ve tüm redirectleri test et.
SEO
Next.js Metadata API, generateMetadata, sitemap.ts, robots.ts ve JSON-LD kullan.
Ayrı Next SEO bağımlılığını zorunlu tutma.
Her sayfada benzersiz title/description, tek H1, canonical, OG, breadcrumb ve uygun schema.
Preview/staging noindex.
ERİŞİLEBİLİRLİK
WCAG 2.2 AA.
Skip link, semantic landmarks, görünür focus, 44x44 touch target, gerçek labels, açıklayıcı errors, alt metin, keyboard navigation, focus trap ve reduced motion.
PERFORMANS
LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.
Lighthouse Performance 95+, Accessibility/SEO/Best Practices 100 hedef.
Lenis ve custom cursor opsiyonel; ölçüm ve erişilebilirlik testinden sonra.
3 saniyelik blocking loader kullanma.
Footer yüksekliğini sabit 450 px yapma.
GITHUB VE KALİTE
main branch protected.
feature/fix branch + PR.
Type check, lint, test ve build CI.
.env.example ve README.
Supabase migrations repository’de.
Playwright E2E: ana sayfa, menü, proje, form, admin login ve yayın akışları.
Production deployment sonrası smoke test ve rollback planı.
ÇIKTI
Tam çalışan proje, temiz klasör yapısı, component library, tüm route’lar, admin paneli, SQL migrations, RLS policies, seed, README, .env.example, testler ve deployment dokümantasyonu üret.
Sahte müşteri, sahte istatistik veya doğrulanmamış başarı iddiası ekleme.


> BÖLÜM EK A TESLİM EDİLECEK DOSYALAR Geliştirme sonunda SDKONGRE’ye devredilecek teknik ve yönetsel paket


- [ ] GitHub repository sahipliği ve tüm branch/PR geçmişi.
- [ ] Vercel proje erişimi, environment variable listesi ve domain yapılandırması.
- [ ] Natro DNS değişiklik kayıtları ve e-posta DNS yedeği.
- [ ] Supabase production/staging proje erişimleri.
- [ ] SQL migrations, seed ve RLS policy dosyaları.
- [ ] Admin kullanıcı ve rol kılavuzu.
- [ ] İçerik editörü kullanım kılavuzu.
- [ ] Veri modeli ve Storage bucket açıklaması.
- [ ] README, .env.example ve deployment prosedürü.
- [ ] Redirect listesi ve SEO metadata matrisi.
- [ ] Responsive, erişilebilirlik, performans ve browser test raporu.
- [ ] Form ve e-posta test raporu.
- [ ] Backup, restore, rollback ve güvenlik olay prosedürü.
- [ ] Kaynak görsellerin kullanım izinleri ve dosya envanteri.
- [ ] Production yayın ve bakım sorumluluk listesi.

> SONUÇ Bu doküman; mevcut tasarım vizyonunu korurken projeyi gerçek bir GitHub + Vercel + Natro + Supabase geliştirme ve yayın sistemine dönüştüren nihai uygulama rehberidir.



# TEMİZ KOPYALANABİLİR MASTER BUILD PROMPT

```text
ROL
Senior UI/UX Designer, Creative Director, Accessibility Specialist, Security Engineer ve Senior Full-Stack Next.js Developer gibi davran.

PROJE
SDKONGRE isimli kongre, toplantı ve etkinlik organizasyonu şirketi için premium, özgün, hızlı, erişilebilir ve yönetilebilir bir kurumsal web sitesi geliştir.

ZORUNLU TEKNİK MİMARİ
- Kaynak kod ve migrationlar GitHub repository’de tutulacak.
- Next.js App Router + TypeScript kullanılacak.
- Vercel, Preview ve Production deployment için kullanılacak.
- Domain Natro üzerinde kalacak; Vercel’in güncel DNS kayıtları Natro DNS paneline uygulanacak.
- Natro üzerindeki MX, SPF, DKIM ve DMARC kayıtları korunacak.
- Supabase Postgres veritabanı, Supabase Auth, Supabase Storage ve RLS kullanılacak.
- Admin paneli aynı Next.js uygulaması içinde /admin route’unda çalışacak.
- Service Role anahtarı yalnız server tarafında kullanılacak.
- Supabase migration dosyaları GitHub’da supabase/migrations içinde sürümlenecek.

MENÜ BAŞLIKLARI
Aşağıdaki kullanıcıya görünen menü başlıklarını değiştirme:
ANA SAYFA
KURUMSAL
- Hakkımızda
- Hikayemiz
- Misyon
- Vizyon
- Değerlerimiz
NEDEN BİZ
HİZMETLERİMİZ
- Lansman ve Kurumsal Etkinlikler
- Kongre Organizasyonları
- Toplantı  ve Sempozyum Yönetimi
- Workshop Organizasyonları
- Fuar ve Sergi Organizasyonları
- Seyahat ve Konaklama Yönetimi
- Transfer ve lojistik Yönetimi
- Tedarikçi ve Operasyon Yönetimi
DİJİTAL HİZMETLER
- Katılımcı ve Kayıt Yönetimi
- Dijital Altyapı ve Etkinlik Teknolojileri
- QR Kod ve Yaka Kart Sistemleri
- Online Davet ve İletişim Yönetimi
- Organizasyon Takip Sistemleri
- Veri ve Raporlama Sistemleri
- Veri Güvenliği ve Merkezi Yönetim
ORGANİZASYON SURECİ
- Brief
- Planlama
- Teklif
- Onay
- Operasyon
- Raporlama
PROJELER
REFERANSLAR
KVKK
- KVKK Aydınlatma Metni
- Gizlilik Politikası
- Çerez (Cookie) Politikası
- Açık Rıza Metni
- Yasal Dayanaklar
İLETİŞİM

ANA SAYFA KAPSAMI
Ana sayfada yalnız:
1. Üst Banner
2. Header
3. Tam ekran Hero
4. Beş Premium Değer Kartı
5. Footer
bulunacak. Hizmet, proje, referans, blog, ekip, istatistik veya müşteri yorumu bölümü ekleme.

HERO
- Başlık: “Doğru Planlama. Unutulmaz Deneyimler.”
- Alt metin: “Ulusal ve uluslararası kongre, toplantı ve etkinlik organizasyonlarında fikirleri kusursuz deneyimlere dönüştürüyoruz.”
- CTA: “Teklif Al” ve “Projelerimizi İncele”.
- min-height: 100svh.
- Desktop ve mobile için ayrı optimize video/poster.
- 4K 60 FPS şartı koyma; 1080p/720p ve 24/30 FPS web optimizasyonu kullan.
- muted, loop, playsInline ve poster fallback.
- prefers-reduced-motion ve prefers-reduced-data desteği.

DEĞER KARTLARI
01 Kusursuz Planlama
02 Uluslararası Standart
03 Deneyim Odaklı
04 Tek Noktadan Yönetim
05 Güven Veren Çözümler
İstatistik kullanma. Hover en fazla 6 px; touch cihazda hover’a bağımlı bilgi bırakma.

TASARIM SİSTEMİ
- Navy #071A2F
- Graphite #0E1116
- Gold #D4AF37
- Gold Dark #A88420
- White #FFFFFF
- Soft Surface #F3F5F7
- Text #25313C
- Muted #637282
Gold yalnız CTA, aktif durum ve sınırlı vurgu için kullanılacak.
Desktop 12 kolon, tablet 8 kolon, mobil 4 kolon.
Spacing tokenları: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160.
Admin paneli font, grid, radius veya sayfa tasarımını serbestçe değiştirmeyecek.

NAVİGASYON
Üst başlık sayısı fazla olduğu için başlıkları değiştirmeden erişilebilir mega menu veya full-screen navigation uygula. Klavye, touch, Escape, focus trap ve active route desteği sağla.

SUPABASE VERİ MODELİ
profiles, site_settings, pages, services, process_steps, projects, project_services, project_media, references, media_assets, legal_documents, contact_messages, quote_requests, audit_logs, content_versions ve form_events tablolarını migrationlarla oluştur.
RLS:
- anon yalnız published içerikleri okuyabilsin.
- form kayıtları doğrulanmış server endpoint üzerinden yazılsın.
- contact_messages ve quote_requests için anon SELECT olmasın.
- admin/editor yetkileri role göre ayrılsın.
Storage bucketları:
- public-site-media
- project-media
- reference-logos
- legal-files
- private-form-uploads

ADMIN PANELİ
Modüller:
Dashboard, Ana Sayfa, Kurumsal, Neden Biz, Hizmetlerimiz, Dijital Hizmetler, Organizasyon Süreci, Projeler, Referanslar, KVKK, İletişim, Teklif Talepleri, Medya, SEO, Kullanıcılar, Ayarlar, Audit Log.
Menü başlıkları read-only veya kod configinden gelsin.
İçerik durumları: draft, review, scheduled, published, archived.
Canlı önizleme, sürüm geçmişi, alt metin ve medya kullanım kontrolü ekle.

FORM AKIŞI
React Hook Form + Zod kullan.
Server tarafında tekrar doğrula.
Spam doğrulaması ve rate limit uygula.
Önce Supabase’e kaydet, sonra e-posta servisine bildirim gönder.
E-posta başarısızsa lead kaydı kaybolmasın; form_events tablosuna yaz.
KVKK onayı ile pazarlama iznini ayrı tut.

VERCEL
- GitHub bağlantısı.
- Production branch main.
- PR başına Preview Deployment.
- Local/Preview/Staging/Production environment ayrımı.
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_DB_URL
- CONTACT_TO_EMAIL
- EMAIL_FROM
- RESEND_API_KEY veya SMTP
- TURNSTILE anahtarları
- Opsiyonel GA/Meta değerleri.
Gizli değerleri hiçbir zaman client veya GitHub’a yazma.

NATRO
Domaini Vercel projesine ekle.
Vercel’in gösterdiği güncel DNS kayıtlarını Natro’da uygula.
Canonical apex/www seç.
MX, SPF, DKIM ve DMARC kayıtlarını değiştirme veya silme.
HTTPS ve tüm redirectleri test et.

SEO
Next.js Metadata API, generateMetadata, sitemap.ts, robots.ts ve JSON-LD kullan.
Ayrı Next SEO bağımlılığını zorunlu tutma.
Her sayfada benzersiz title/description, tek H1, canonical, OG, breadcrumb ve uygun schema.
Preview/staging noindex.

ERİŞİLEBİLİRLİK
WCAG 2.2 AA.
Skip link, semantic landmarks, görünür focus, 44x44 touch target, gerçek labels, açıklayıcı errors, alt metin, keyboard navigation, focus trap ve reduced motion.

PERFORMANS
LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.
Lighthouse Performance 95+, Accessibility/SEO/Best Practices 100 hedef.
Lenis ve custom cursor opsiyonel; ölçüm ve erişilebilirlik testinden sonra.
3 saniyelik blocking loader kullanma.
Footer yüksekliğini sabit 450 px yapma.

GITHUB VE KALİTE
main branch protected.
feature/fix branch + PR.
Type check, lint, test ve build CI.
.env.example ve README.
Supabase migrations repository’de.
Playwright E2E: ana sayfa, menü, proje, form, admin login ve yayın akışları.
Production deployment sonrası smoke test ve rollback planı.

ÇIKTI
Tam çalışan proje, temiz klasör yapısı, component library, tüm route’lar, admin paneli, SQL migrations, RLS policies, seed, README, .env.example, testler ve deployment dokümantasyonu üret.
Sahte müşteri, sahte istatistik veya doğrulanmamış başarı iddiası ekleme.
```

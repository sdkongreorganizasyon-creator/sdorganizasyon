SDKONGRE Admin Tip Modeli Senkronizasyonu

Logdaki 27 TypeScript hatasının nedeni:
- Boşluk kontrollerini kullanan bileşenler GitHub'a yüklenmiş.
- Bu yeni alanları tanımlayan TypeScript tip ve doğrulama dosyaları eski kalmış.

Bu paket yalnız şu dosyaları senkronize eder:
- src/types/content.ts
- src/lib/content/settings.ts
- src/lib/validation/site-settings.ts
- src/lib/validation/admin.ts

Tanımlanan alanlar:
- Tema: sectionSpacing, cardPadding, cardGap, contentGap, heroSpacing
- Sayfa bölümü: paddingTop, paddingBottom, contentGap, contentPadding, mediaHeight
- Hizmet kartı: cardPadding, mediaHeight, contentGap

Public tasarım, içerikler, Supabase verileri ve Vercel ayarları değiştirilmez.

# Form ve E-posta Kurulumu

## Resend

1. Resend hesabı oluşturun.
2. Gönderen domaini ekleyin.
3. Resend'in verdiği DNS doğrulama kayıtlarını Natro DNS paneline ekleyin.
4. Domain doğrulandıktan sonra API key oluşturun.
5. Vercel Environment Variables alanına ekleyin:

```env
CONTACT_TO_EMAIL=teklif@sdkongre.com
EMAIL_FROM=SDKONGRE Web <web@sdkongre.com>
RESEND_API_KEY=re_...
```

Adresler örnektir; gerçek şirket e-posta adreslerini kullanın.

## Cloudflare Turnstile

1. Turnstile site oluşturun.
2. Production ve preview domainlerini ekleyin.
3. Anahtarları Vercel'e ekleyin:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Turnstile değerleri boş bırakılırsa geliştirme ortamında form doğrulaması bu adımı atlar. Production'da etkinleştirilmesi önerilir.

## Rate limit

Güçlü rastgele bir değer oluşturun:

```env
RATE_LIMIT_SALT=
```

IP adresi açık biçimde değil, bu salt ile hashlenerek kısa süreli rate-limit kontrolünde kullanılır.

## Test senaryoları

- Geçerli iletişim formu
- Geçerli teklif formu
- Eksik zorunlu alan
- KVKK onayı yok
- Turnstile başarısız
- Çok hızlı tekrar gönderim
- Supabase kayıt hatası
- E-posta sağlayıcısı hatası

E-posta gönderimi başarısız olsa bile Supabase lead kaydı korunmalıdır.

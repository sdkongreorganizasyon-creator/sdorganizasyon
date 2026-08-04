# Supabase Tarayıcı Kurulumu

Terminal kullanılmayacaktır.

Ana ve güncel talimatlar repository kökündeki:

```text
BROWSER_ONLY_KURULUM.md
```

dosyasında, **BÖLÜM 2 — Supabase kurulumu** başlığı altında yer almaktadır.

Uygulanacak iki SQL dosyası:

```text
supabase/migrations/202608040001_initial_schema.sql
supabase/seed.sql
```

Her dosya Supabase Dashboard içindeki **SQL Editor → New query → Run** adımlarıyla çalıştırılacaktır.

Vercel'e girilecek güncel anahtar adları:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
```

`SUPABASE_SECRET_KEY` yalnız Vercel Environment Variables alanına girilmelidir; GitHub'a yüklenmemelidir.

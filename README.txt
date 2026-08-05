SDKONGRE E2E Supabase Duzeltmesi

Bu paket yalnızca şu dosyayı günceller:
src/lib/supabase/proxy.ts

Amaç:
Supabase ortam değişkenleri henüz tanımlı değilken public sayfaların ve E2E testlerinin
çalışabilmesini sağlamak. Supabase bağlandığında mevcut oturum yenileme davranışı aynen devam eder.

SDKONGRE E2E Test Scope Düzeltmesi

Güncellenen dosya:
tests/e2e/home.spec.ts

Logdaki hata:
Playwright getByText("HİZMETLERİMİZ") sorgusu sayfanın tamamında iki eşleşme
buluyordu: biri açılan menüde, diğeri sayfanın başka bir bölümünde. Strict mode
bu nedenle testi durduruyordu.

Düzeltme:
Başlık kontrolleri "Site menüsü" dialog alanıyla sınırlandırıldı. Uygulama
kodunda değişiklik yapılmadı.

SDKONGRE E2E Menü Test Düzeltmesi

Güncellenen dosya:
tests/e2e/home.spec.ts

Log sonucu:
27 test başarılı, 1 test başarısız.

Hatanın nedeni:
Test, menü düğmesini yönetim panelinden değiştirilebilen görünür metni üzerinden
getByRole(... name: /Menü/i) ile arıyordu. Üretim ortamındaki etiket farklı
olduğunda düğme bulunamıyordu.

Düzeltme:
Test, menü bileşeninin sabit ve mevcut CSS seçicisi olan
button.menu-trigger üzerinden düğmeye tıklıyor.

Public site tasarımı, içerikler, Supabase veya Vercel ayarları değiştirilmez.

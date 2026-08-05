SDKONGRE E2E Menü Düzeltmesi

Bu paket yalnızca şu dosyayı günceller:
src/components/layout/menu-overlay.tsx

Sorun:
E2E testi, Next.js istemci tarafı hydration tamamlanmadan Menü düğmesine
tıklayabildiği için ilk tıklama kayboluyor ve dialog açılmıyordu.

Çözüm:
Menü düğmesi hydration tamamlanana kadar native disabled durumda tutulur.
Hydration tamamlandığında otomatik etkinleşir. Playwright ve gerçek kullanıcı
tıklamaları artık React olay dinleyicileri hazır olduktan sonra gerçekleşir.

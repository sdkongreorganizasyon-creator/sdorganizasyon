SDKONGRE E2E Menü Hydration Düzeltmesi

Güncellenen dosya:
src/components/layout/menu-overlay.tsx

Düzeltme:
Önceki useSyncExternalStore tabanlı hydration kontrolü butonu sürekli disabled
durumda bırakıyordu. Yeni sürüm, hydration tamamlandıktan sonraki ilk animation
frame içinde butonu etkinleştirir. Playwright click işlemi buton etkinleşene
kadar otomatik bekler.

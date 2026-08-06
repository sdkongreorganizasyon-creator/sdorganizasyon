SDKONGRE Kurumsal TypeScript Build Düzeltmesi

Güncellenen tek dosya:
src/app/(site)/kurumsal/[slug]/page.tsx

Düzeltme:
- page.headline || page.paragraphs[0] yerine page.headline kullanıldı.
- page.headline || undefined yerine page.headline kullanıldı.

Neden:
corporatePages `as const` olarak tanımlandığından headline değerleri TypeScript
tarafından boş olmayan sabit string olarak biliniyor. Bu nedenle `||`
ifadesinin sağ tarafında page değişkeni `never` tipine daralıyordu.

Başka hiçbir dosya veya özellik değiştirilmedi.

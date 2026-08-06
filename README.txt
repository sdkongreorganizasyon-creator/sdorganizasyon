SDKONGRE Admin TypeScript Düzeltmesi

Güncellenen dosya:
src/app/admin/actions.ts

Düzeltilen GitHub Actions hataları:
1. Yeni proje taslağı oluşturulurken "draft" durumu TypeScript tarafından genel string
   olarak genişliyordu. Literal tür korunacak şekilde düzeltildi.
2. projectId oluşturma işleminden sonra string olduğu açıkça doğrulandı.
3. referenceId oluşturma işleminden sonra string olduğu açıkça doğrulandı.

Bu paket yalnız TypeScript derleme hatalarını düzeltir.
Admin tasarımı, public site, Supabase şeması ve Vercel ayarları değişmez.

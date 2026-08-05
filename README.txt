SDKONGRE E2E Development Origin Düzeltmesi

Güncellenen dosya:
next.config.ts

Düzeltme:
GitHub Actions E2E testi uygulamayı 127.0.0.1 üzerinden açıyor.
Next.js geliştirme sunucusu bu origin'i izinli görmediği için istemci
kaynakları ve hydration tamamlanmıyordu. allowedDevOrigins alanına
127.0.0.1 ve localhost eklendi.

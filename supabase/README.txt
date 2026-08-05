SDKONGRE Supabase Migration Düzeltmesi

Güncellenen dosya:
supabase/migrations/202608040001_initial_schema.sql

Düzeltilen hata:
PostgreSQL format('%I') kullanımı tetikleyici adının yalnız bir bölümünü
tırnakladığı için references tablosunda set_"references"_updated_at gibi
geçersiz bir SQL tanımlayıcısı oluşuyordu.

Düzeltme:
Tetikleyici adlarının tamamı önce metin olarak birleştiriliyor, daha sonra
tek bir %I alanıyla güvenli biçimde alıntılanıyor.

Aynı hata daha sonra oluşmasın diye üç tetikleyici grubu düzeltildi:
- set_<table>_updated_at
- audit_<table>
- version_<table>

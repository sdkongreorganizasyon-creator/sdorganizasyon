-- SDKONGRE requested four-item update
begin;

update public.services
set
  body_json = jsonb_set(
    body_json,
    '{paragraphs}',
    '["Organizasyonların başarısı yalnızca iyi bir planlamaya değil, aynı zamanda doğru tedarikçilerin etkin şekilde yönetilmesine bağlıdır.", "SD Kongre olarak yıllar içerisinde oluşturduğumuz güçlü iş ortaklığı ağı sayesinde organizasyonun ihtiyaç duyduğu tüm hizmetleri kalite standartları çerçevesinde yönetiyoruz."]'::jsonb,
    true
  ),
  updated_at = now()
where locale = 'tr'
  and category = 'physical'
  and slug = 'tedarikci-ve-operasyon-yonetimi';

commit;

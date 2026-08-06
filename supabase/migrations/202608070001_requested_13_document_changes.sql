-- SDKONGRE requested 13-item document changes
begin;

delete from public.pages
where locale = 'tr'
  and page_key in ('mission', 'vision');

insert into public.pages
(page_key,locale,title,slug,eyebrow,summary,content_json,status,seo_json,published_at)
values (
  'about',
  'tr',
  'Hakkımızda',
  'hakkimizda',
  'KURUMSAL',
  'Organizasyon Yönetiminde Güvenilir ve Stratejik Çözüm Ortağınız',
  '{"headline":"Organizasyon Yönetiminde Güvenilir ve Stratejik Çözüm Ortağınız","paragraphs":["SD Kongre, kongre, sempozyum, kurumsal toplantı, eğitim programı, lansman, fuar, sergi, çalıştay ve seyahat organizasyonlarında uçtan uca hizmet sunan profesyonel bir organizasyon ve etkinlik yönetim şirketidir.","Günümüzde başarılı bir organizasyon yalnızca iyi bir fikirden ibaret değildir. Başarı; doğru planlama, güçlü koordinasyon, etkin bütçe yönetimi, deneyimli operasyon ekipleri ve kusursuz uygulama süreçleri ile mümkün olmaktadır. SD Kongre olarak tam da bu noktada devreye giriyor, kurumların tüm organizasyon süreçlerini tek merkezden yöneterek iş yükünü azaltıyor, verimliliği artırıyor ve hedeflerine ulaşmalarına katkı sağlıyoruz.","Kurulduğumuz günden bu yana temel amacımız, organizasyon yönetimini daha sistematik, daha ölçülebilir ve daha sürdürülebilir hale getirmektir. Bir organizasyonun yalnızca etkinlik gününde değil, fikir aşamasından sonuç raporuna kadar geçen tüm süreçlerinin aynı profesyonellik anlayışıyla yönetilmesi gerektiğine inanıyoruz.","Bu anlayış doğrultusunda; stratejik planlama, proje yönetimi, bütçe kontrolü, tedarikçi koordinasyonu, kayıt ve katılımcı yönetimi, konaklama ve seyahat planlaması, dijital altyapı çözümleri, operasyon yönetimi, veri analizi ve raporlama süreçlerinin tamamını profesyonel ekiplerimizle yürütüyor, kurumlarımıza zaman ve maliyet avantajı sağlıyoruz.","Her organizasyon bizim için bağımsız bir projedir. Bu nedenle standart çözümler yerine sektör, kurum yapısı, hedef kitle ve proje hedeflerine göre özel çözümler geliştiriyor; organizasyonları yalnızca gerçekleştirmiyor, aynı zamanda stratejik bir başarı hikayesine dönüştürüyoruz.","Bugün kamu kurumlarından üniversitelere, sağlık kuruluşlarından meslek örgütlerine, derneklerden özel sektör markalarına kadar geniş bir müşteri portföyüne hizmet veriyor; her projemizde aynı kalite standartlarını koruyarak güvenilir iş ortaklıkları kuruyoruz.","SD Kongre olarak biz, yalnızca etkinlik düzenleyen bir firma değil; kurumların hedeflerine ulaşmasını sağlayan, süreçleri kolaylaştıran ve başarıyı görünür hale getiren güçlü bir çözüm ortağıyız."],"values":[{"title":"Misyonumuz","description":"Kurumların ihtiyaçlarına özel, yenilikçi, sürdürülebilir ve sonuç odaklı organizasyon çözümleri geliştirerek her projeyi uluslararası kalite standartlarında hayata geçirmek. Planlama gücümüzü, operasyonel deneyimimizi, teknolojik altyapılarımızı ve uzman insan kaynağımızı bir araya getirerek müşterilerimize maksimum verimlilik, minimum operasyonel yük ve ölçülebilir başarı sunmak. Her organizasyonu, müşterilerimizin kurumsal hedeflerine ulaşmasını sağlayan stratejik bir yatırım olarak değerlendiriyor ve bu doğrultuda değer üretmeye odaklanıyoruz."},{"title":"Vizyonumuz","description":"Kongre, etkinlik ve organizasyon yönetimi sektöründe yenilikçi yaklaşımı, güçlü teknoloji altyapısı, sürdürülebilir operasyon modeli ve yüksek hizmet kalitesi ile Türkiye''nin en güçlü ve en çok tercih edilen organizasyon yönetim markalarından biri olmak. Ulusal ve uluslararası ölçekte yürütülen projelerde kalite, güven, şeffaflık ve operasyonel mükemmeliyet denildiğinde akla gelen ilk çözüm ortağı haline gelmek. Sektöre yön veren uygulamalar geliştirerek organizasyon yönetiminin geleceğini şekillendiren öncü markalar arasında yer almak."}],"heroImage":"/media/corporate/hakkimizda.webp"}'::jsonb,
  'published'::public.content_status,
  '{"title":"Hakkımızda","description":"Organizasyon Yönetiminde Güvenilir ve Stratejik Çözüm Ortağınız"}'::jsonb,
  '2026-08-06T00:00:00.000Z'::timestamptz
)
on conflict (locale,page_key) do update set
  title=excluded.title,
  slug=excluded.slug,
  eyebrow=excluded.eyebrow,
  summary=excluded.summary,
  content_json=excluded.content_json,
  status=excluded.status,
  seo_json=excluded.seo_json,
  published_at=excluded.published_at,
  updated_at=now();

update public.site_settings
set value_json = jsonb_set(
  value_json,
  '{contact,mapUrl}',
  to_jsonb('https://www.google.com/maps/place/Me%C5%9Frutiyet,+Atat%C3%BCrk+Blv+No:109+D:16,+06420+%C3%87ankaya%2FAnkara/@39.918431,32.8517774,17z/data=!4m5!3m4!1s0x14d34faa6d9b9587:0x47c2d3c596b0c6!8m2!3d39.9184269!4d32.8543523!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D'::text),
  true
),
updated_at = now()
where key = 'global' and locale = 'tr';

update public.site_settings
set value_json = jsonb_set(
  value_json,
  '{navigation}',
  (
    select coalesce(
      jsonb_agg(
        case
          when item->>'id' = 'corporate' then
            jsonb_set(
              item,
              '{children}',
              (
                select coalesce(jsonb_agg(child order by child_order), '[]'::jsonb)
                from jsonb_array_elements(coalesce(item->'children', '[]'::jsonb))
                  with ordinality as corporate_children(child, child_order)
                where child->>'id' not in ('mission', 'vision')
                  and child->>'href' not in ('/kurumsal/misyon', '/kurumsal/vizyon')
              ),
              true
            )
          when item->>'id' = 'contact' then
            jsonb_set(
              jsonb_set(item, '{visible}', 'true'::jsonb, true),
              '{showInHeader}',
              'true'::jsonb,
              true
            )
          else item
        end
        order by item_order
      ),
      '[]'::jsonb
    )
    from jsonb_array_elements(coalesce(value_json->'navigation', '[]'::jsonb))
      with ordinality as navigation_items(item, item_order)
  ),
  true
),
updated_at = now()
where key = 'global'
  and locale = 'tr'
  and jsonb_typeof(value_json->'navigation') = 'array';

commit;

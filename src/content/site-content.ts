import type {
  CorporatePageContent,
  HomeValue,
  LegalDocumentContent,
  ProcessStep,
  ServiceContent,
} from "@/types/content";

export const corporatePages = {
  "hakkimizda": {
    "pageKey": "about",
    "title": "Hakkımızda",
    "eyebrow": "KURUMSAL",
    "headline": "Organizasyon Yönetiminde Güvenilir ve Stratejik Çözüm Ortağınız",
    "paragraphs": [
      "SD Kongre, kongre, sempozyum, kurumsal toplantı, eğitim programı, lansman, fuar, sergi, çalıştay ve seyahat organizasyonlarında uçtan uca hizmet sunan profesyonel bir organizasyon ve etkinlik yönetim şirketidir.",
      "Günümüzde başarılı bir organizasyon yalnızca iyi bir fikirden ibaret değildir. Başarı; doğru planlama, güçlü koordinasyon, etkin bütçe yönetimi, deneyimli operasyon ekipleri ve kusursuz uygulama süreçleri ile mümkün olmaktadır. SD Kongre olarak tam da bu noktada devreye giriyor, kurumların tüm organizasyon süreçlerini tek merkezden yöneterek iş yükünü azaltıyor, verimliliği artırıyor ve hedeflerine ulaşmalarına katkı sağlıyoruz.",
      "Kurulduğumuz günden bu yana temel amacımız, organizasyon yönetimini daha sistematik, daha ölçülebilir ve daha sürdürülebilir hale getirmektir. Bir organizasyonun yalnızca etkinlik gününde değil, fikir aşamasından sonuç raporuna kadar geçen tüm süreçlerinin aynı profesyonellik anlayışıyla yönetilmesi gerektiğine inanıyoruz.",
      "Bu anlayış doğrultusunda; stratejik planlama, proje yönetimi, bütçe kontrolü, tedarikçi koordinasyonu, kayıt ve katılımcı yönetimi, konaklama ve seyahat planlaması, dijital altyapı çözümleri, operasyon yönetimi, veri analizi ve raporlama süreçlerinin tamamını profesyonel ekiplerimizle yürütüyor, kurumlarımıza zaman ve maliyet avantajı sağlıyoruz.",
      "Her organizasyon bizim için bağımsız bir projedir. Bu nedenle standart çözümler yerine sektör, kurum yapısı, hedef kitle ve proje hedeflerine göre özel çözümler geliştiriyor; organizasyonları yalnızca gerçekleştirmiyor, aynı zamanda stratejik bir başarı hikayesine dönüştürüyoruz.",
      "Bugün kamu kurumlarından üniversitelere, sağlık kuruluşlarından meslek örgütlerine, derneklerden özel sektör markalarına kadar geniş bir müşteri portföyüne hizmet veriyor; her projemizde aynı kalite standartlarını koruyarak güvenilir iş ortaklıkları kuruyoruz.",
      "SD Kongre olarak biz, yalnızca etkinlik düzenleyen bir firma değil; kurumların hedeflerine ulaşmasını sağlayan, süreçleri kolaylaştıran ve başarıyı görünür hale getiren güçlü bir çözüm ortağıyız."
    ],
    "heroImage": "/media/corporate/hakkimizda.webp"
  },
  "hikayemiz": {
    "pageKey": "story",
    "title": "Hikayemiz",
    "eyebrow": "KURUMSAL",
    "headline": "Bir Organizasyondan Çok Daha Fazlasını İnşa Ettik",
    "paragraphs": [
      "SD Kongre'nin hikayesi, organizasyon sektöründe sıklıkla karşılaşılan bir soruna çözüm üretme isteğiyle başladı.",
      "Kurumlar büyük organizasyonlar planlarken çoğu zaman farklı tedarikçiler, farklı operasyon ekipleri ve birbirinden bağımsız süreçlerle çalışmak zorunda kalıyor; bu durum hem zaman kaybına hem de maliyetlerin kontrol edilmesinde ciddi zorluklara neden oluyordu.",
      "Biz ise bu karmaşık yapıyı daha yönetilebilir hale getirmek için yola çıktık.",
      "Kuruluşumuzun temelinde; organizasyon süreçlerini tek çatı altında toplayan, teknolojiyle destekleyen ve profesyonel proje yönetimi yaklaşımıyla yöneten bir sistem kurma fikri bulunmaktadır.",
      "İlk günden itibaren hedefimiz yalnızca organizasyon düzenlemek olmadı. Süreçleri analiz eden, riskleri öngören, operasyonları yöneten, verileri raporlayan ve müşterilerine ölçülebilir sonuçlar sunan bir organizasyon yönetim modeli oluşturmayı hedefledik.",
      "Bu vizyon doğrultusunda teknoloji yatırımlarımızı artırdık, operasyon ağımızı geliştirdik ve organizasyon yönetimini klasik hizmet anlayışının ötesine taşıdık.",
      "Yıllar içerisinde gerçekleştirdiğimiz kongreler, sempozyumlar, bilimsel toplantılar, eğitim programları, kurumsal etkinlikler, fuarlar ve lansman projeleri sayesinde yalnızca operasyonel deneyim değil, aynı zamanda güçlü bir kurumsal bilgi birikimi oluşturduk.",
      "Bugün Türkiye'nin farklı şehirlerinde yürüttüğümüz başarılı projelerle sektörün güvenilir markalarından biri haline gelmiş bulunuyoruz.",
      "Ancak bizim için başarı; tamamlanan organizasyon sayısından çok, müşterilerimizin bize duyduğu güven, tekrar çalışma tercihleri ve tavsiyeleridir.",
      "Çünkü her başarılı organizasyonun sonunda yalnızca bir etkinlik değil, uzun vadeli bir iş ortaklığı doğduğuna inanıyoruz."
    ],
    "heroImage": "/media/corporate/hikayemiz.webp"
  },
  "misyon": {
    "pageKey": "mission",
    "title": "Misyonumuz",
    "eyebrow": "KURUMSAL",
    "headline": "",
    "paragraphs": [
      "Kurumların ihtiyaçlarına özel, yenilikçi, sürdürülebilir ve sonuç odaklı organizasyon çözümleri geliştirerek her projeyi uluslararası kalite standartlarında hayata geçirmek.",
      "Planlama gücümüzü, operasyonel deneyimimizi, teknolojik altyapılarımızı ve uzman insan kaynağımızı bir araya getirerek müşterilerimize maksimum verimlilik, minimum operasyonel yük ve ölçülebilir başarı sunmak.",
      "Her organizasyonu, müşterilerimizin kurumsal hedeflerine ulaşmasını sağlayan stratejik bir yatırım olarak değerlendiriyor ve bu doğrultuda değer üretmeye odaklanıyoruz."
    ],
    "heroImage": "/media/corporate/misyon.webp"
  },
  "vizyon": {
    "pageKey": "vision",
    "title": "Vizyonumuz",
    "eyebrow": "KURUMSAL",
    "headline": "",
    "paragraphs": [
      "Kongre, etkinlik ve organizasyon yönetimi sektöründe yenilikçi yaklaşımı, güçlü teknoloji altyapısı, sürdürülebilir operasyon modeli ve yüksek hizmet kalitesi ile Türkiye'nin en güçlü ve en çok tercih edilen organizasyon yönetim markalarından biri olmak.",
      "Ulusal ve uluslararası ölçekte yürütülen projelerde kalite, güven, şeffaflık ve operasyonel mükemmeliyet denildiğinde akla gelen ilk çözüm ortağı haline gelmek.",
      "Sektöre yön veren uygulamalar geliştirerek organizasyon yönetiminin geleceğini şekillendiren öncü markalar arasında yer almak."
    ],
    "heroImage": "/media/corporate/vizyon.webp"
  },
  "degerlerimiz": {
    "pageKey": "values",
    "title": "Değerlerimiz",
    "eyebrow": "KURUMSAL",
    "headline": "Başarıya Giden Yolun Temel İlkeleri",
    "paragraphs": [
      "SD Kongre olarak gerçekleştirdiğimiz her organizasyonun merkezinde yalnızca operasyonel mükemmeliyet değil; güçlü değerler, sürdürülebilir iş anlayışı ve uzun vadeli güven ilişkileri bulunmaktadır. İş yapış şeklimizi belirleyen bu değerler, müşterilerimizle kurduğumuz her iş birliğinin temelini oluşturur.",
      "Kurulduğumuz günden bu yana tüm projelerimizi aynı profesyonel yaklaşım ve sorumluluk bilinciyle yönetiyor, her adımda kurumlarımıza değer katmayı hedefliyoruz."
    ],
    "values": [
      {
        "title": "Güven",
        "description": "Her Başarılı İş Birliğinin Temelinde Güven Yatar. Bizim için güven, yalnızca bir değer değil; tüm faaliyetlerimizin temelidir. Müşterilerimize verdiğimiz sözleri zamanında yerine getirir, süreçleri şeffaf şekilde yönetir ve her aşamada açık iletişim kurarız. Organizasyonların en kritik anlarında dahi çözüm odaklı yaklaşımımızı korur, sorumluluğumuzu eksiksiz şekilde yerine getiririz. Uzun yıllara dayanan müşteri ilişkilerimizin ve tekrar eden iş birliklerimizin arkasındaki en büyük güç, kazandığımız güvendir."
      },
      {
        "title": "Şeffaflık",
        "description": "Her Süreçte Açık ve Hesap Verebilir Yönetim. Başarılı organizasyonların temelinde açık iletişim ve şeffaf süreç yönetimi bulunmaktadır. Bütçe planlamasından satın alma süreçlerine, tedarikçi yönetiminden raporlamaya kadar tüm aşamaları müşterilerimizle paylaşırız. Harcamalar, planlamalar ve operasyonel süreçler her zaman kontrol edilebilir ve izlenebilir yapıdadır. Bu yaklaşım sayesinde müşterilerimiz organizasyonun her aşamasına hakim olur ve süreçleri güvenle takip edebilir."
      },
      {
        "title": "Profesyonellik",
        "description": "Her Projeye Aynı Ciddiyet ve Sorumlulukla Yaklaşıyoruz. Küçük bir toplantı da büyük ölçekli bir uluslararası kongre de bizim için aynı öneme sahiptir. Her projeye titizlikle hazırlanır, detayları önceden planlar ve süreçleri uzman ekiplerimizle yönetiriz. Karşılaşılabilecek riskleri önceden değerlendirerek alternatif çözümler geliştirir ve organizasyonların kesintisiz ilerlemesini sağlarız. Profesyonellik anlayışımız, yalnızca etkinlik gününde değil, projenin başlangıcından sonuç raporuna kadar tüm süreçlerde kendini göstermektedir."
      },
      {
        "title": "Müşteri Odaklılık",
        "description": "Önce Dinliyor, Sonra Çözüm Üretiyoruz. Her kurumun ihtiyaçlarının farklı olduğuna inanıyoruz. Bu nedenle hazır kalıplar yerine müşterilerimizin hedeflerini, beklentilerini ve önceliklerini analiz ederek kurumlara özel çözümler geliştiriyoruz. Başarımızı yalnızca tamamlanan organizasyonlarla değil, müşterilerimizin memnuniyeti ve hedeflerine ulaşmasıyla ölçüyoruz. Her projeyi kendi projemiz gibi sahipleniyor ve maksimum katma değer üretmeye odaklanıyoruz."
      },
      {
        "title": "Yenilikçilik",
        "description": "Sürekli Gelişiyor, Sürekli Daha İyisini Arıyoruz. Organizasyon sektörü sürekli değişmekte ve gelişmektedir. SD Kongre olarak yeni teknolojileri, global organizasyon trendlerini ve sektördeki yenilikleri yakından takip ediyoruz. Dijital kayıt sistemlerinden hibrit etkinlik çözümlerine, QR kod uygulamalarından veri analiz araçlarına kadar yenilikçi teknolojileri organizasyon süreçlerine entegre ediyoruz. Amacımız, müşterilerimize yalnızca bugünün değil, geleceğin organizasyon çözümlerini sunmaktır."
      },
      {
        "title": "Kalite",
        "description": "Mükemmelliği Standart Haline Getiriyoruz. Kalite anlayışımız, sunduğumuz her hizmetin merkezinde yer alır. Planlamadan operasyona, teknik altyapıdan katılımcı deneyimine kadar tüm süreçlerde yüksek standartlarla çalışırız. Her organizasyonu detaylı kontrol mekanizmalarıyla yönetir, mükemmel sonuçlar elde etmek için sürekli iyileştirme yaklaşımını benimseriz. Bizim için kalite, bir hedef değil; vazgeçilmez bir çalışma prensibidir."
      },
      {
        "title": "Sürdürülebilirlik",
        "description": "Bugünü Yönetirken Geleceği de Düşünüyoruz. Kaynakların doğru kullanılması ve süreçlerin verimli yönetilmesi başarılı organizasyonların temel unsurlarından biridir. SD Kongre olarak çevresel, ekonomik ve operasyonel sürdürülebilirliği organizasyon yönetiminin ayrılmaz bir parçası olarak görüyoruz. Dijital çözümleri yaygınlaştırıyor, israfı azaltıyor ve kaynakların verimli kullanımını destekleyen uygulamalar geliştiriyoruz. Sürdürülebilir yaklaşımımız sayesinde hem müşterilerimize hem de gelecek nesillere karşı sorumluluğumuzu yerine getiriyoruz."
      },
      {
        "title": "Takım Ruhu",
        "description": "Başarı, Güçlü Ekiplerin Ortak Üretimidir. Başarılı organizasyonlar bireysel çabalarla değil, uyum içerisinde çalışan ekiplerin ortak başarısıyla ortaya çıkar. Proje yöneticilerimizden saha ekiplerimize, teknik uzmanlarımızdan çözüm ortaklarımıza kadar tüm paydaşlarımızla ortak hedef doğrultusunda hareket ediyoruz. İş birliği kültürünü destekliyor, iletişimin gücüne inanıyor ve ekip ruhunu başarımızın önemli bir parçası olarak görüyoruz."
      },
      {
        "title": "Sonuç Odaklılık",
        "description": "Hedefimiz Etkinlik Değil, Başarıdır. Her organizasyonun arkasında ulaşılması gereken kurumsal hedefler bulunmaktadır. Bu nedenle yalnızca organizasyonu gerçekleştirmeye değil, organizasyonun sağlayacağı sonuçlara odaklanıyoruz. Katılımcı memnuniyeti, operasyonel verimlilik, bütçe başarısı ve kurumsal hedeflere katkı gibi tüm kriterleri değerlendirerek ölçülebilir başarılar üretmeyi amaçlıyoruz."
      }
    ],
    "heroImage": "/media/corporate/degerlerimiz.webp"
  }
} as const satisfies Record<string, CorporatePageContent>;

export const whyUsContent = {
  "pageKey": "why-us",
  "title": "Neden Biz",
  "eyebrow": "NEDEN BİZ",
  "headline": "Sadece Organizasyon Yönetmiyoruz, Başarı Yönetiyoruz",
  "paragraphs": [
    "Bir organizasyonun başarısı yalnızca etkinlik günüyle ölçülmez.",
    "Gerçek başarı; doğru planlama, etkili koordinasyon, kontrollü bütçe yönetimi, profesyonel uygulama ve detaylı raporlama süreçlerinin tamamında ortaya çıkar.",
    "SD Kongre olarak müşterilerimize yalnızca bir hizmet sağlayıcı değil, organizasyonun her aşamasında yanında olan stratejik bir iş ortağı yaklaşımı sunuyoruz."
  ],
  "items": [
    {
      "title": "Tek Noktadan Yönetim",
      "description": "Tüm süreçler tek merkezden planlanır ve yönetilir. Böylece farklı tedarikçiler arasında koordinasyon kaybı yaşanmaz, süreçler daha hızlı ve daha kontrollü ilerler.",
      "icon": "network"
    },
    {
      "title": "Türkiye Genelinde Operasyon Gücü",
      "description": "Türkiye genelindeki çözüm ortaklarımız ve saha ekiplerimiz sayesinde organizasyonlarınızı nerede gerçekleştirirseniz gerçekleştirin aynı kalite standartlarıyla hizmet sunuyoruz.",
      "icon": "map"
    },
    {
      "title": "Teknoloji Destekli Süreçler",
      "description": "Online kayıt sistemleri, QR kod çözümleri, katılımcı panelleri, dijital raporlama sistemleri ve hibrit etkinlik altyapıları sayesinde süreçleri daha verimli hale getiriyoruz.",
      "icon": "cpu"
    },
    {
      "title": "Şeffaf Bütçe Yönetimi",
      "description": "Her harcama kalemi planlanır, izlenir ve raporlanır. Böylece bütçeniz üzerinde tam kontrol sağlarsınız.",
      "icon": "wallet"
    },
    {
      "title": "Deneyimli Uzman Kadro",
      "description": "Yılların deneyimine sahip proje yöneticileri, operasyon uzmanları ve teknik ekiplerimizle süreçlerin her aşamasını profesyonel şekilde yönetiyoruz.",
      "icon": "users"
    },
    {
      "title": "Ölçülebilir Sonuçlar",
      "description": "Her organizasyon sonrasında performans verileri, bütçe analizleri, katılımcı istatistikleri ve memnuniyet raporları sunarak yatırımınızın karşılığını somut verilerle ortaya koyuyoruz.",
      "icon": "chart"
    }
  ],
  "heroImage": "/media/headers/neden-biz.webp"
} as const;

export const servicesIntro = {
  "title": "Hizmetlerimiz",
  "headline": "Kurumunuza Özel, Uçtan Uca Organizasyon Yönetimi Çözümleri",
  "paragraphs": [
    "SD Kongre olarak her organizasyonun kendine özgü hedefleri, dinamikleri ve ihtiyaçları olduğuna inanıyoruz. Bu nedenle standart hizmet anlayışının ötesine geçerek kurumunuza özel planlanan, profesyonel şekilde yönetilen ve ölçülebilir sonuçlar üreten organizasyon çözümleri sunuyoruz.",
    "Kongrelerden kurumsal toplantılara, lansmanlardan fuar organizasyonlarına kadar tüm süreçleri tek merkezden yönetiyor; planlama, koordinasyon, operasyon ve raporlama aşamalarının tamamında kurumunuza güvenilir bir çözüm ortağı olarak destek veriyoruz.",
    "Yılların deneyimi, güçlü tedarikçi ağımız, uzman proje ekiplerimiz ve teknolojik altyapımız sayesinde organizasyonlarınızı yalnızca başarıyla gerçekleştirmiyor, aynı zamanda markanıza değer katan profesyonel deneyimlere dönüştürüyoruz."
  ]
} as const;

export const physicalServices = [
  {
    "category": "physical",
    "slug": "lansman-ve-kurumsal-etkinlikler",
    "title": "Lansman ve Kurumsal Etkinlikler",
    "icon": "sparkles",
    "summary": "Markanızın Hikâyesini Etkileyici Bir Deneyime Dönüştürüyoruz.",
    "paragraphs": [
      "Yeni bir ürünün, hizmetin veya markanın pazara sunulması, kurumunuz için kritik öneme sahip stratejik bir adımdır. İlk izlenimlerin güçlü olduğu, hedef kitlenin markanızla duygusal bağ kurduğu bu süreçte profesyonel organizasyon yönetimi büyük fark yaratır.",
      "SD Kongre olarak markanızın vizyonunu, kurumsal kimliğini ve vermek istediği mesajı analiz ederek hedef kitleniz üzerinde güçlü etki bırakacak etkinlikler tasarlıyoruz.",
      "Etkinliğin ilk konsept çalışmasından son misafir uğurlanana kadar tüm süreçleri titizlikle yönetiyoruz.",
      "Amacımız yalnızca bir etkinlik düzenlemek değil; markanızın hedef kitlesiyle güçlü bağ kurmasını sağlayan unutulmaz deneyimler oluşturmaktır."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "kongre-organizasyonlari",
    "title": "Kongre Organizasyonları",
    "icon": "presentation",
    "summary": "Organizasyonlarınızda profesyonel yönetim anlayışıyla mükemmel sonuçlar hedefliyoruz.",
    "paragraphs": [
      "Kongre organizasyonları, yüksek katılımcı sayısı, çok paydaşlı yapısı ve detaylı operasyon süreçleri nedeniyle profesyonel yönetim gerektiren etkinliklerdir.",
      "SD Kongre olarak ulusal ve uluslararası kongrelerin tüm planlama ve uygulama süreçlerini uzman ekiplerimizle yönetiyor, akademik ve bilimsel organizasyonların başarıyla yürütülmesini sağlıyoruz.",
      "Bilimsel kurulların koordinasyonundan sponsorluk yönetimine, kayıt sistemlerinden katılımcı deneyimine kadar tüm süreçleri tek merkezden kontrol ediyoruz.",
      "Kongrenizin akademik başarısını destekleyen, katılımcı deneyimini güçlendiren ve kurumsal itibarınızı yükselten profesyonel çözümler sunuyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "toplanti-ve-sempozyum-yonetimi",
    "title": "Toplantı ve Sempozyum Yönetimi",
    "icon": "messages",
    "summary": "Verimli, Kontrollü ve Hedef Odaklı Organizasyonlar için buradayız.",
    "paragraphs": [
      "Kurumsal toplantılar ve sempozyumlar, bilgi paylaşımının yanı sıra kurumların stratejik hedeflerine ulaşmasına katkı sağlayan önemli organizasyonlardır.",
      "SD Kongre olarak toplantılarınızın her aşamasını planlıyor, katılımcı deneyimini artıran ve operasyonel verimliliği sağlayan profesyonel çözümler geliştiriyoruz.",
      "İster küçük ölçekli yönetici toplantıları ister yüzlerce kişinin katıldığı kapsamlı sempozyumlar olsun; organizasyonun tüm süreçlerini eksiksiz şekilde yönetiyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "workshop-organizasyonlari",
    "title": "Workshop Organizasyonları",
    "icon": "workflow",
    "summary": "Etkileşimi ve Öğrenmeyi Güçlendiren Profesyonel Çözümler sunmak için her türlü talebinizi eksiksiz olarak yönetiyoruz.",
    "paragraphs": [
      "Workshop ve eğitim etkinlikleri, katılımcılarla doğrudan etkileşim kurulmasını sağlayan özel organizasyonlardır. Bu tür etkinliklerde teknik detaylar ve operasyonel süreçlerin kusursuz yönetimi büyük önem taşır.",
      "SD Kongre olarak eğitim ve workshop organizasyonlarında verimli öğrenme ortamları oluşturuyor, katılımcı deneyimini üst seviyeye taşıyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "fuar-ve-sergi-organizasyonlari",
    "title": "Fuar ve Sergi Organizasyonları",
    "icon": "landmark",
    "summary": "Markanızı Daha Fazla Kişiyle Buluşturuyoruz",
    "paragraphs": [
      "Fuarlar ve sergiler, markaların görünürlüğünü artırdığı, potansiyel müşterilerle doğrudan iletişim kurduğu ve sektördeki konumunu güçlendirdiği önemli platformlardır.",
      "SD Kongre olarak yaratıcı tasarım anlayışını profesyonel operasyon yönetimiyle birleştirerek markanızın hedef kitlesi üzerinde güçlü etki yaratmasını sağlıyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "seyahat-ve-konaklama-yonetimi",
    "title": "Seyahat ve Konaklama Yönetimi",
    "icon": "hotel",
    "summary": "Katılımcılarınız İçin Kusursuz Seyahat Deneyimi",
    "paragraphs": [
      "Başarılı bir organizasyonun temel unsurlarından biri de katılımcıların seyahat ve konaklama süreçlerinin eksiksiz yönetilmesidir.",
      "SD Kongre olarak konuşmacılar, davetliler, protokol üyeleri ve katılımcılar için profesyonel seyahat planlaması gerçekleştiriyor, tüm süreçlerin sorunsuz ilerlemesini sağlıyoruz.",
      "Katılımcılarınızın etkinliğe odaklanmasını sağlıyor, tüm lojistik detayları sizin yerinize yönetiyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "transfer-ve-lojistik-yonetimi",
    "title": "Transfer ve Lojistik Yönetimi",
    "icon": "bus",
    "summary": "Organizasyonun Görünmeyen Gücünü Yönetiyoruz",
    "paragraphs": [
      "Organizasyonların başarısında lojistik süreçler kritik rol oynar. Doğru planlanmamış transfer ve lojistik operasyonları, etkinliğin genel başarısını doğrudan etkileyebilir.",
      "SD Kongre olarak tüm lojistik süreçleri detaylı operasyon planları doğrultusunda yürütüyor, katılımcı hareketlerini ve ekipman akışını kusursuz şekilde yönetiyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "tedarikci-ve-operasyon-yonetimi",
    "title": "Tedarikçi ve Operasyon Yönetimi",
    "icon": "clipboard",
    "summary": "Doğru İş Ortaklarıyla Kusursuz Sonuçlar",
    "paragraphs": [
      "Organizasyonların başarısı yalnızca iyi bir planlamaya değil, aynı zamanda doğru tedarikçilerin etkin şekilde yönetilmesine bağlıdır.",
      "SD Kongre olarak yıllar içerisinde oluşturduğumuz güçlü iş ortaklığı ağı sayesinde organizasyonun ihtiyaç duyduğu tüm hizmetleri kalite standartları çerçevesinde yönetiyoruz.",
      "Teknik ekiplerden dekorasyon firmalarına, catering hizmetlerinden ulaşım sağlayıcılarına kadar tüm tedarikçilerin seçimi, koordinasyonu ve performans takibini gerçekleştiriyoruz.",
      "SD Kongre ile çalıştığınızda yalnızca bir organizasyon firmasıyla değil; onlarca farklı süreci sizin adınıza yöneten, riskleri azaltan ve etkinliğinizin başarısını güvence altına alan profesyonel bir proje yönetim ekibiyle çalışmış olursunuz. Bu sayede siz hedeflerinize odaklanırken, biz organizasyonunuzun her detayını kusursuz şekilde yönetiriz."
    ],
    "features": []
  }
] as const satisfies readonly ServiceContent[];

export const digitalServicesIntro = {
  "title": "Dijital Hizmetler",
  "headline": "Teknolojiyi Organizasyon Yönetiminin Merkezine Taşıyoruz",
  "paragraphs": [
    "Modern organizasyonların başarısı artık yalnızca güçlü operasyonlarla değil, süreçlerin dijital olarak yönetilebilmesiyle de ölçülmektedir. Katılımcı deneyiminin iyileştirilmesi, verilerin doğru işlenmesi, operasyonel süreçlerin hızlandırılması ve etkinlik performansının ölçülebilmesi için teknolojik altyapı kritik rol oynamaktadır.",
    "SD Kongre olarak organizasyon yönetimini dijital çözümlerle destekliyor, tüm süreçlerin daha hızlı, daha güvenli, daha verimli ve daha kontrol edilebilir şekilde ilerlemesini sağlıyoruz.",
    "Kayıt sistemlerinden katılımcı yönetimine, online davet çözümlerinden canlı yayın teknolojilerine kadar organizasyonlarınızın ihtiyaç duyduğu tüm dijital altyapıları tek merkezden sunuyoruz."
  ]
} as const;

export const digitalServices = [
  {
    "category": "digital",
    "slug": "katilimci-ve-kayit-yonetimi",
    "title": "Katılımcı ve Kayıt Yönetimi",
    "icon": "user-check",
    "summary": "Katılımcı Deneyimini Başlangıç Noktasında Güçlendiriyoruz",
    "paragraphs": [
      "Bir organizasyonun başarısı, katılımcının ilk kayıt işlemiyle başlar. Karmaşık ve zaman alan kayıt süreçleri hem katılımcı memnuniyetini düşürür hem de organizasyon ekibine ek operasyonel yük oluşturur.",
      "SD Kongre tarafından geliştirilen dijital kayıt sistemleri sayesinde katılımcılar hızlı ve kolay şekilde kayıt oluşturabilirken organizasyon ekipleri de tüm süreci anlık olarak takip edebilmektedir.",
      "Sağladığımız çözümler; online kayıt sistemleri, kişiselleştirilebilir katılım formları, online ödeme entegrasyonları, katılımcı veri yönetimi ve dijital check-in çözümleridir.",
      "Bu sayede kayıt süreçleri daha hızlı ilerlerken hata oranları minimum seviyeye indirilmektedir."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "dijital-altyapi-ve-etkinlik-teknolojileri",
    "title": "Dijital Altyapı ve Etkinlik Teknolojileri",
    "icon": "monitor",
    "summary": "Organizasyonlarınızı Geleceğin Teknolojileriyle Güçlendiriyoruz",
    "paragraphs": [
      "Günümüz etkinlik dünyasında teknoloji artık bir tercih değil, bir gereklilik haline gelmiştir. SD Kongre olarak organizasyonlarınıza yenilikçi teknolojiler entegre ederek katılımcı deneyimini artırıyor, operasyonel yönetimi kolaylaştırıyor ve organizasyon performansını üst seviyeye taşıyoruz.",
      "Sunulan teknolojik çözümler; kayıt ve yönetim yazılımları, canlı yayın sistemleri, online katılım altyapıları, hibrit etkinlik çözümleri, etkinlik web siteleri, dijital sponsorluk alanları, etkileşim ve geri bildirim sistemleridir.",
      "Teknoloji destekli çözümlerimiz sayesinde hem fiziksel hem dijital katılımcılar için kesintisiz etkinlik deneyimi sunuyoruz."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "qr-kod-ve-yaka-kart-sistemleri",
    "title": "QR Kod ve Yaka Kart Sistemleri",
    "icon": "qr",
    "summary": "Hızlı, Güvenli ve Temassız Katılım Yönetimi",
    "paragraphs": [
      "Yüksek katılımcı sayısına sahip etkinliklerde giriş süreçlerinin hızlı ve hatasız yönetilmesi büyük önem taşır. QR kod entegrasyonlu dijital kontrol sistemlerimiz sayesinde katılımcı girişleri saniyeler içerisinde gerçekleştirilebilir ve tüm süreç anlık olarak izlenebilir.",
      "Bu sistemler sayesinde organizasyonlar daha kontrollü, güvenli ve profesyonel şekilde yönetilmektedir."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "online-davet-ve-iletisim-yonetimi",
    "title": "Online Davet ve İletişim Yönetimi",
    "icon": "mail",
    "summary": "Katılımcılarınızla Güçlü ve Kesintisiz İletişim Kurun",
    "paragraphs": [
      "Organizasyon başarısında doğru iletişim stratejileri kritik rol oynar. Katılımcılarla zamanında ve etkili iletişim kurulması, katılım oranlarını doğrudan etkileyen faktörlerden biridir.",
      "SD Kongre olarak davet süreçlerini dijital platformlara taşıyor, profesyonel tasarımlı iletişim sistemleri ile hedef kitlenizle güçlü bağlar kurmanızı sağlıyoruz."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "organizasyon-takip-sistemleri",
    "title": "Organizasyon Takip Sistemleri",
    "icon": "list-checks",
    "summary": "Projenizin Her Aşamasını Gerçek Zamanlı Olarak Yönetin",
    "paragraphs": [
      "Büyük ölçekli organizasyonlarda onlarca farklı sürecin eş zamanlı yürütülmesi gerekmektedir.",
      "SD Kongre tarafından kullanılan dijital proje takip sistemleri sayesinde organizasyonun hangi aşamada olduğu, hangi görevlerin tamamlandığı ve hangi süreçlerin devam ettiği anlık olarak görüntülenebilmektedir.",
      "Bu yapı sayesinde müşterilerimiz süreçler üzerinde tam görünürlük elde ederken proje yönetimi daha kontrollü hale gelmektedir."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "veri-ve-raporlama-sistemleri",
    "title": "Veri ve Raporlama Sistemleri",
    "icon": "chart",
    "summary": "Organizasyonlarınızı Verilerle Ölçülebilir Hale Getiriyoruz",
    "paragraphs": [
      "Başarılı organizasyonlar yalnızca uygulanan değil, analiz edilen organizasyonlardır.",
      "Bu nedenle etkinlik sonunda kapsamlı veri analizleri ve profesyonel raporlama hizmetleri sunuyoruz.",
      "Elde edilen veriler sayesinde kurumlar yatırım geri dönüşlerini değerlendirebilir, güçlü yönlerini görebilir ve gelecekteki projelerini daha verimli planlayabilir."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "veri-guvenligi-ve-merkezi-yonetim",
    "title": "Veri Güvenliği ve Merkezi Yönetim",
    "icon": "shield",
    "summary": "Verilerinizi En Yüksek Güvenlik Standartlarıyla Koruyoruz",
    "paragraphs": [
      "Dijitalleşmenin en önemli unsurlarından biri veri güvenliğidir.",
      "SD Kongre olarak tüm katılımcı ve kurumsal verileri güvenli altyapılarda saklıyor, KVKK ve ilgili mevzuat hükümlerine uygun şekilde işliyoruz.",
      "Veri güvenliğini yalnızca teknik bir gereklilik değil, kurumsal sorumluluğumuzun ayrılmaz bir parçası olarak görüyoruz. Güvenlik yaklaşımımız; KVKK uyumlu veri yönetimi, yetkilendirilmiş erişim sistemleri, güvenli veri saklama altyapıları, merkezi yönetim panelleri ve veri erişim kontrol mekanizmalarından oluşmaktadır."
    ],
    "features": []
  }
] as const satisfies readonly ServiceContent[];

export const processIntro = "Başarılı bir organizasyon, yalnızca etkinlik günü yapılan uygulamalarla değil; doğru analiz, detaylı planlama, etkin koordinasyon ve profesyonel raporlama süreçlerinin bir bütün olarak yönetilmesiyle mümkün olur. SD Kongre olarak her projeyi sistematik, kontrol edilebilir ve ölçülebilir bir süreç içerisinde ele alıyor; organizasyonun ilk fikrinden son raporuna kadar tüm aşamaları titizlikle yönetiyoruz.";

export const processSteps = [
  {
    "stepKey": "brief",
    "number": "01",
    "title": "BRIEF",
    "subtitle": "İhtiyaçların Doğru Analizi ile Sağlam Bir Başlangıç",
    "description": "Her başarılı organizasyonun temelinde doğru bir ihtiyaç analizi bulunur. Bu nedenle proje sürecine başlamadan önce kurumun beklentilerini, hedeflerini ve organizasyonun genel kapsamını detaylı şekilde değerlendiriyoruz.",
    "items": [
      "Organizasyonun amacı ve hedefleri belirlenir.",
      "Hedef katılımcı profili analiz edilir.",
      "Etkinliğin türü, kapsamı ve büyüklüğü netleştirilir.",
      "Tarih ve lokasyon alternatifleri değerlendirilir.",
      "Kurumsal beklentiler ve özel talepler kayıt altına alınır.",
      "Operasyonel ihtiyaçlar ve olası riskler belirlenir.",
      "Bütçe çerçevesi ve mali beklentiler analiz edilir."
    ],
    "closing": "Gerçekleştirdiğimiz detaylı brief toplantıları sayesinde organizasyonun yol haritasını oluşturarak sonraki süreçlerin eksiksiz ilerlemesini sağlıyoruz.",
    "outputs": [
      "İhtiyaç Analiz Raporu",
      "Hedef Kitle Belirleme",
      "Organizasyon Kapsamı",
      "İlk Operasyon Taslağı",
      "Ön Bütçe Çalışması"
    ]
  },
  {
    "stepKey": "planlama",
    "number": "02",
    "title": "PLANLAMA",
    "subtitle": "Her Detayın Önceden Tasarlandığı Profesyonel Hazırlık Süreci",
    "description": "Planlama aşaması, organizasyonun başarısını doğrudan etkileyen en kritik süreçlerden biridir. Bu aşamada tüm operasyonel ve teknik detaylar sistematik şekilde oluşturulur.",
    "items": [
      "Organizasyon takvimini hazırlar.",
      "Görev ve sorumluluk dağılımlarını belirler.",
      "Mekân planlamasını yapar.",
      "Teknik altyapı ihtiyaçlarını tespit eder.",
      "Konaklama ve ulaşım planlarını oluşturur.",
      "Tedarikçi ve çözüm ortaklarını belirler.",
      "Risk ve kriz yönetim planlarını hazırlar.",
      "Satın alma süreçlerini planlar.",
      "Kaynak ve bütçe yönetimini oluşturur."
    ],
    "closing": "Planlama sürecinde tüm paydaşlar arasında koordinasyon sağlanarak organizasyon gününe kadar gerçekleşecek her adım netleştirilir.",
    "outputs": [
      "Operasyon Takvimi",
      "Görev ve Sorumluluk Planı",
      "Bütçe Planı",
      "Risk Yönetim Planı",
      "Teknik Altyapı Planlaması",
      "Lojistik ve Transfer Planı"
    ]
  },
  {
    "stepKey": "teklif",
    "number": "03",
    "title": "TEKLİF",
    "subtitle": "Şeffaf, Anlaşılır ve İhtiyaca Özel Çözümler",
    "description": "Planlama çalışmaları tamamlandıktan sonra organizasyonun tüm kapsamını içeren detaylı teklif dosyası hazırlanır.",
    "items": [
      "Hizmet kapsamı detaylandırılır.",
      "Alternatif uygulama senaryoları hazırlanır.",
      "Bütçe kalemleri açık şekilde listelenir.",
      "Operasyonel süreçler tanımlanır.",
      "Teknik ihtiyaçlar belirlenir.",
      "İnsan kaynağı planlaması sunulur.",
      "Zaman çizelgesi oluşturulur."
    ],
    "closing": "Amacımız yalnızca maliyet sunmak değil; kurumun ihtiyaçlarına uygun, maksimum verim sağlayacak sürdürülebilir bir çözüm modeli geliştirmektir.",
    "outputs": [
      "Organizasyon Konsepti",
      "Hizmet Kapsamı",
      "Teknik ve Operasyonel Çözümler",
      "Personel Planlaması",
      "Konaklama ve Seyahat Yönetimi",
      "Detaylı Bütçe Analizi",
      "Uygulama Takvimi"
    ]
  },
  {
    "stepKey": "onay",
    "number": "04",
    "title": "ONAY",
    "subtitle": "Sürecin Netleştirildiği ve Projenin Başlatıldığı Aşama",
    "description": "Teklif değerlendirme sürecinin ardından proje detayları karşılıklı olarak gözden geçirilir ve son hali oluşturulur.",
    "items": [
      "Hizmet kapsamı kesinleştirilir.",
      "Bütçe kalemleri onaylanır.",
      "Uygulama takvimi netleştirilir.",
      "Tedarikçi seçimleri tamamlanır.",
      "Operasyon ekibi oluşturulur.",
      "İş planları kesinleştirilir.",
      "İletişim ve koordinasyon süreçleri tanımlanır."
    ],
    "closing": "Onay aşaması sayesinde tüm paydaşlar aynı hedef doğrultusunda hareket eder ve uygulama süreci kontrollü şekilde başlatılır.",
    "outputs": [
      "Onaylanmış Proje Planı",
      "Kesin Bütçe Çalışması",
      "Operasyon Organizasyon Şeması",
      "Uygulama Takvimi",
      "Tedarikçi ve Çözüm Ortakları Listesi"
    ]
  },
  {
    "stepKey": "operasyon",
    "number": "05",
    "title": "OPERASYON",
    "subtitle": "Organizasyonun Sahadaki Kusursuz Yönetimi",
    "description": "Operasyon süreci, hazırlıkların gerçeğe dönüştüğü ve organizasyonun tüm detaylarının uygulandığı aşamadır. SD Kongre operasyon ekibi etkinlik öncesi, etkinlik süresince ve etkinlik sonrasında tüm süreçlerin koordinasyonunu sağlar.",
    "groups": [
      {
        "title": "Etkinlik Öncesi",
        "items": [
          "Mekân hazırlıkları gerçekleştirilir.",
          "Teknik ekipman kurulumları yapılır.",
          "Kayıt alanları oluşturulur.",
          "Yaka kartları ve materyaller hazırlanır.",
          "Transfer planları uygulanır.",
          "Konaklama organizasyonları tamamlanır."
        ]
      },
      {
        "title": "Etkinlik Sırasında",
        "items": [
          "Katılımcı kayıt süreçleri yönetilir.",
          "Konuşmacı koordinasyonu sağlanır.",
          "Teknik ekipler yönetilir.",
          "Protokol organizasyonu yürütülür.",
          "Sahne ve program akışı takip edilir.",
          "Anlık kriz ve risk yönetimi gerçekleştirilir."
        ]
      },
      {
        "title": "Etkinlik Sonrasında",
        "items": [
          "Kapanış operasyonları tamamlanır.",
          "Demontaj süreçleri yürütülür.",
          "Katılımcı verileri konsolide edilir.",
          "Tedarikçi kapanış işlemleri gerçekleştirilir."
        ]
      }
    ],
    "items": [],
    "closing": "",
    "outputs": [
      "Tek Merkezden Koordinasyon",
      "Anlık Süreç Takibi",
      "Profesyonel Saha Yönetimi",
      "Kriz ve Risk Yönetimi",
      "Katılımcı Memnuniyeti Odaklı Hizmet",
      "Tam Operasyonel Kontrol"
    ]
  },
  {
    "stepKey": "raporlama",
    "number": "06",
    "title": "RAPORLAMA",
    "subtitle": "Ölçülebilir Sonuçlar ve Stratejik Değerlendirme",
    "description": "Bir organizasyonun başarısı yalnızca tamamlanmış olmasıyla değil, elde edilen çıktılarla değerlendirilir. Bu nedenle proje sonunda kapsamlı raporlama ve analiz çalışmaları gerçekleştiriyoruz.",
    "items": [
      "Katılımcı istatistikleri hazırlanır.",
      "Kayıt ve katılım oranları analiz edilir.",
      "Operasyon performansı değerlendirilir.",
      "Bütçe gerçekleşme raporları oluşturulur.",
      "Tedarikçi performans analizleri yapılır.",
      "Memnuniyet anketleri değerlendirilir.",
      "Güçlü yönler ve geliştirme alanları belirlenir.",
      "Gelecek organizasyonlar için öneriler hazırlanır."
    ],
    "closing": "Sunulan raporlar sayesinde kurumlar organizasyon yatırımlarının çıktılarını somut verilerle değerlendirebilir ve gelecekteki projelerini daha verimli planlayabilir.",
    "outputs": [
      "Katılımcı ve Kayıt Analizleri",
      "Etkinlik Performans Değerlendirmesi",
      "Bütçe Gerçekleşme Raporu",
      "Operasyon Sonuç Raporu",
      "Memnuniyet ve Geri Bildirim Analizi",
      "Fotoğraf ve Medya Arşivi",
      "Yönetici Özet Raporu",
      "Gelecek Dönem Önerileri"
    ]
  }
] as const satisfies readonly ProcessStep[];

export const processOutro = "Analiz ediyoruz, planlıyoruz, yönetiyoruz ve raporluyoruz. Her organizasyonu yalnızca bir etkinlik olarak değil, kurumunuzun hedeflerine hizmet eden stratejik bir proje olarak görüyor; süreçlerin tamamını profesyonel proje yönetimi anlayışıyla yürütüyoruz. Böylece organizasyonlarınız daha kontrollü, daha verimli ve daha başarılı sonuçlara ulaşıyor.";

export const legalDocuments = {
  "aydinlatma-metni": {
    "documentKey": "privacy-notice",
    "title": "KVKK Aydınlatma Metni",
    "headline": "Kişisel Verilerin Korunması ve İşlenmesine İlişkin Aydınlatma Metni",
    "sections": [
      {
        "title": null,
        "paragraphs": [
          "SD Kongre Organizasyon ve Etkinlik Yönetimi (\"SD Kongre\") olarak özel hayatın gizliliğine ve kişisel verilerin korunmasına önem vermekteyiz. Bu kapsamda, 6698 Sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda belirtilen çerçevede işlemekteyiz."
        ]
      },
      {
        "title": "İşlenen Kişisel Veriler",
        "bullets": [
          "Ad, soyad",
          "T.C. Kimlik numarası",
          "Telefon numarası",
          "E-posta adresi",
          "Kurum ve görev bilgileri",
          "Konaklama ve seyahat bilgileri",
          "Katılımcı kayıt bilgileri",
          "Finansal ve faturalandırma bilgileri",
          "IP adresi ve internet kullanım verileri",
          "Fotoğraf ve video kayıtları"
        ]
      },
      {
        "title": "Kişisel Verilerin İşlenme Amaçları",
        "paragraphs": [
          "Kişisel verileriniz aşağıdaki amaçlarla işlenebilmektedir."
        ],
        "bullets": [
          "Kongre, toplantı ve etkinlik organizasyonlarının yürütülmesi",
          "Katılımcı kayıt süreçlerinin yönetilmesi",
          "Konaklama ve ulaşım hizmetlerinin sağlanması",
          "Bilgilendirme ve duyuru faaliyetlerinin gerçekleştirilmesi",
          "Sözleşmesel yükümlülüklerin yerine getirilmesi",
          "Finans ve muhasebe süreçlerinin yürütülmesi",
          "Müşteri memnuniyetinin artırılması",
          "Yasal yükümlülüklerin yerine getirilmesi",
          "Bilgi güvenliği süreçlerinin sağlanması"
        ]
      },
      {
        "title": "Kişisel Verilerin Aktarılması",
        "paragraphs": [
          "Kişisel verileriniz ilgili mevzuat hükümleri çerçevesinde aşağıdaki kişi ve kuruluşlara aktarılabilmektedir."
        ],
        "bullets": [
          "Yetkili kamu kurum ve kuruluşlarına",
          "İş ortaklarına",
          "Konaklama ve ulaşım hizmet sağlayıcılarına",
          "Teknoloji altyapı hizmet sağlayıcılarına",
          "Hukuken yetkili kişi ve kurumlara"
        ]
      },
      {
        "title": "Veri Sahibinin Hakları",
        "paragraphs": [
          "KVKK'nın 11. maddesi kapsamında veri sahipleri aşağıdaki haklara sahiptir."
        ],
        "bullets": [
          "Kişisel verilerinin işlenip işlenmediğini öğrenme",
          "İşlenen verilere ilişkin bilgi talep etme",
          "İşleme amacını öğrenme",
          "Yanlış veya eksik işlenen verilerin düzeltilmesini isteme",
          "Verilerin silinmesini veya yok edilmesini talep etme",
          "İşlemenin hukuka uygunluğunu sorgulama",
          "Zarara uğraması halinde tazminat talep etme"
        ]
      }
    ]
  },
  "gizlilik-politikasi": {
    "documentKey": "privacy-policy",
    "title": "Gizlilik Politikası",
    "headline": "Bilgileriniz Bizim İçin Değerlidir",
    "sections": [
      {
        "title": null,
        "paragraphs": [
          "SD Kongre, web sitesini ziyaret eden kullanıcıların ve hizmetlerinden yararlanan müşterilerinin kişisel bilgilerinin güvenliğini sağlamayı temel ilkelerinden biri olarak kabul etmektedir.",
          "Web sitemiz üzerinden paylaşılan bilgiler yalnızca hizmet sunulması, iletişim faaliyetlerinin yürütülmesi, organizasyon süreçlerinin yönetilmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılmaktadır."
        ]
      },
      {
        "title": "Toplanan Bilgilerin Korunması",
        "bullets": [
          "Yetkisiz erişime karşı korunur",
          "Güvenli sistemlerde saklanır",
          "Üçüncü kişilerle izinsiz paylaşılmaz",
          "Yasal zorunluluklar dışında aktarılmaz"
        ],
        "paragraphs": [
          "SD Kongre, kişisel verilerin korunmasına ilişkin tüm teknik ve idari tedbirleri uygulamayı taahhüt eder."
        ]
      },
      {
        "title": "Veri Güvenliği",
        "paragraphs": [
          "Kurumumuz aşağıdaki uygulamalarla verilerinizin korunmasını sağlamaktadır."
        ],
        "bullets": [
          "SSL güvenlik sertifikaları",
          "Güncel güvenlik altyapıları",
          "Erişim yetkilendirme sistemleri",
          "Veri yedekleme uygulamaları",
          "Düzenli güvenlik kontrolleri"
        ]
      }
    ]
  },
  "cerez-politikasi": {
    "documentKey": "cookie-policy",
    "title": "Çerez (Cookie) Politikası",
    "headline": "Çerez Kullanımı Hakkında Bilgilendirme",
    "sections": [
      {
        "title": null,
        "paragraphs": [
          "Bu web sitesi kullanıcı deneyimini geliştirmek, site performansını analiz etmek ve sunulan hizmetleri iyileştirmek amacıyla çerezler kullanmaktadır.",
          "Çerezler, ziyaret ettiğiniz internet sitesi tarafından cihazınıza kaydedilen küçük veri dosyalarıdır."
        ]
      },
      {
        "title": "Zorunlu Çerezler",
        "paragraphs": [
          "Web sitesinin temel işlevlerinin çalışabilmesi için gereklidir."
        ]
      },
      {
        "title": "Performans ve Analitik Çerezleri",
        "paragraphs": [
          "Kullanıcıların web sitesini nasıl kullandığına ilişkin anonim veriler sağlar."
        ]
      },
      {
        "title": "İşlevsel Çerezler",
        "paragraphs": [
          "Tercihlerinizin hatırlanmasına yardımcı olur."
        ]
      },
      {
        "title": "Pazarlama Çerezleri",
        "paragraphs": [
          "Sunulan içeriklerin ve reklamların ilgi alanlarınıza göre özelleştirilmesini sağlar."
        ]
      },
      {
        "title": "Çerez Yönetimi",
        "paragraphs": [
          "Tarayıcı ayarlarınızı değiştirerek çerezleri silebilir, engelleyebilir veya kullanımını sınırlandırabilirsiniz.",
          "Çerezleri devre dışı bırakmanız halinde web sitesinin bazı özelliklerinden tam olarak yararlanamayabilirsiniz."
        ]
      }
    ]
  },
  "acik-riza-metni": {
    "documentKey": "explicit-consent",
    "title": "Açık Rıza Metni",
    "headline": "Açık Rıza Beyanı",
    "sections": [
      {
        "title": null,
        "paragraphs": [
          "6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında tarafıma sunulan Aydınlatma Metni'ni okuduğumu ve anladığımı kabul ederim.",
          "Bu kapsamda aşağıdaki verilerimin SD Kongre tarafından ilgili mevzuata uygun şekilde işlenmesine, saklanmasına ve gerekli durumlarda belirtilen üçüncü kişilerle paylaşılmasına özgür irademle açık rıza verdiğimi kabul ederim."
        ],
        "bullets": [
          "Kimlik bilgilerimin",
          "İletişim bilgilerimin",
          "Katılım ve kayıt bilgilerimin",
          "Organizasyon süreçlerine ilişkin verilerimin",
          "Görsel ve işitsel kayıtlarımın"
        ]
      },
      {
        "title": null,
        "paragraphs": [
          "Vermiş olduğum açık rızayı dilediğim zaman geri çekme hakkına sahip olduğumu biliyorum."
        ]
      }
    ]
  },
  "yasal-dayanaklar": {
    "documentKey": "legal-basis",
    "title": "Yasal Dayanaklar",
    "headline": "Kişisel Verilerin İşlenmesine İlişkin Hukuki Çerçeve",
    "sections": [
      {
        "title": null,
        "paragraphs": [
          "SD Kongre tarafından gerçekleştirilen tüm veri işleme faaliyetleri ulusal ve uluslararası mevzuat hükümlerine uygun şekilde yürütülmektedir."
        ]
      },
      {
        "title": "Dayanak Alınan Mevzuatlar",
        "items": [
          {
            "title": "6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK)",
            "description": "Kişisel verilerin işlenmesine ilişkin temel usul ve esasları belirlemektedir."
          },
          {
            "title": "Türk Borçlar Kanunu",
            "description": "Müşteri ve hizmet sağlayıcı arasındaki sözleşmesel ilişkilerin yürütülmesine ilişkin hükümleri kapsar."
          },
          {
            "title": "Türk Ticaret Kanunu",
            "description": "Ticari faaliyetler kapsamında tutulması gereken kayıtlar ve yükümlülükleri düzenler."
          },
          {
            "title": "Vergi Usul Kanunu",
            "description": "Muhasebe ve mali kayıtların saklanmasıyla ilgili yükümlülükleri belirler."
          },
          {
            "title": "Elektronik Ticaretin Düzenlenmesi Hakkında Kanun",
            "description": "Elektronik ortamda yürütülen iletişim ve ticari faaliyetlere ilişkin hükümleri düzenler."
          }
        ]
      },
      {
        "title": "Veri İşleme Şartları",
        "paragraphs": [
          "Kişisel veriler aşağıdaki hukuki sebeplerinden en az birine dayanılarak işlenmektedir."
        ],
        "bullets": [
          "Kanunlarda açıkça öngörülmesi",
          "Bir sözleşmenin kurulması veya ifası için gerekli olması",
          "Hukuki yükümlülüklerin yerine getirilmesi",
          "Bir hakkın tesisi, kullanılması veya korunması",
          "İlgili kişinin açık rızasının bulunması"
        ]
      },
      {
        "title": "Veri Saklama ve İmha",
        "paragraphs": [
          "Kişisel veriler, ilgili mevzuatta öngörülen süreler boyunca saklanmakta; saklama süresinin sona ermesi veya işleme amacının ortadan kalkması halinde güvenli yöntemlerle silinmekte, yok edilmekte veya anonim hale getirilmektedir."
        ]
      }
    ]
  }
} as const satisfies Record<string, LegalDocumentContent>;

export const homeValues = [
  {
    "number": "01",
    "title": "Kusursuz Planlama",
    "description": "Her ayrıntıyı önceden düşünür, olası riskleri etkinlik başlamadan yönetiriz.",
    "icon": "calendar-check"
  },
  {
    "number": "02",
    "title": "Uluslararası Standart",
    "description": "Yerel deneyimi global hizmet anlayışı ve kurumsal süreç disipliniyle birleştiririz.",
    "icon": "globe"
  },
  {
    "number": "03",
    "title": "Deneyim Odaklı",
    "description": "Her temas noktasını katılımcılar için akıcı ve hatırlanabilir bir deneyime dönüştürürüz.",
    "icon": "sparkles"
  },
  {
    "number": "04",
    "title": "Tek Noktadan Yönetim",
    "description": "Planlama, kayıt, teknik operasyon, konaklama ve koordinasyonu tek merkezden yürütürüz.",
    "icon": "network"
  },
  {
    "number": "05",
    "title": "Güven Veren Çözümler",
    "description": "Şeffaf iletişim, profesyonel ekip ve sürdürülebilir kalite anlayışıyla ilerleriz.",
    "icon": "shield-check"
  }
] as const satisfies readonly HomeValue[];

export const projectsIntro = {
  "title": "Projeler",
  "headline": "Her Proje, Yeni Bir Deneyim ve Yeni Bir Başarı Hikayesidir",
  "paragraphs": [
    "Farklı sektörlerde gerçekleştirdiğimiz kongreler, sempozyumlar, kurumsal toplantılar, lansmanlar ve fuarlar ile markaların hedeflerine ulaşmasına katkı sağlıyoruz.",
    "Başarıyla tamamladığımız projeler; organizasyon yönetimindeki uzmanlığımızın, operasyonel gücümüzün ve çözüm odaklı yaklaşımımızın somut göstergesidir."
  ]
} as const;

export const referencesIntro = {
  "title": "Referanslar",
  "headline": "Güvenin Kazandırdığı Uzun Soluklu İş Ortaklıkları",
  "paragraphs": [
    "Bir organizasyon şirketinin en önemli sermayesi gerçekleştirdiği projelerden çok, müşterilerinin ona duyduğu güvendir.",
    "SD Kongre olarak bugüne kadar kamu kurumları, üniversiteler, sağlık kuruluşları, meslek odaları, birlikler, dernekler ve özel sektör şirketleriyle birçok başarılı projeye imza attık.",
    "Her iş birliğimizi yalnızca bir hizmet ilişkisi olarak değil, uzun vadeli bir ortaklık olarak görüyoruz.",
    "Müşterilerimizin bizi tekrar tercih etmesi, farklı kurumlara tavsiye etmesi ve yıllar boyunca aynı güvenle çalışmayı sürdürmesi kalite anlayışımızın en güçlü göstergesidir.",
    "Bugün sahip olduğumuz referans ağı, profesyonelliğimizin, operasyonel gücümüzün, şeffaf çalışma anlayışımızın ve müşteri memnuniyetine verdiğimiz önemin doğal sonucudur.",
    "SD Kongre, güvenilir organizasyon yönetiminin arkasındaki güçlü çözüm ortağıdır."
  ]
} as const;

export const allServices = [...physicalServices, ...digitalServices] as const;

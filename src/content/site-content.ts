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
    "headline": "Organizasyon Yönetiminde Güvenilir Çözüm Ortağınız",
    "paragraphs": [
      "SD Kongre, kongre, sempozyum, toplantı, lansman, fuar, kurumsal etkinlik ve seyahat organizasyonlarında uçtan uca hizmet sunan profesyonel bir organizasyon ve etkinlik yönetim şirketidir.",
      "Kurulduğumuz günden bu yana temel amacımız; kurumların organizasyon süreçlerini daha verimli, daha kontrollü ve daha başarılı hale getirmektir. Organizasyonların yalnızca etkinlik günü değil, fikir aşamasından sonuç raporuna kadar geçen tüm süreçlerinin profesyonel şekilde yönetilmesi gerektiğine inanıyoruz.",
      "Bu anlayışla; planlama, bütçe yönetimi, tedarikçi koordinasyonu, konaklama çözümleri, dijital kayıt sistemleri, saha operasyonları ve raporlama süreçlerini tek merkezden yönetiyor, müşterilerimize zaman ve maliyet avantajı sağlıyoruz.",
      "Kamu kurumlarından özel sektöre, meslek örgütlerinden akademik kuruluşlara kadar geniş bir yelpazede hizmet verirken her projeyi kendi dinamikleri içerisinde değerlendiriyor ve kurumlara özel çözümler geliştiriyoruz.",
      "SD Kongre olarak biz, yalnızca organizasyon düzenleyen bir firma değil; kurumların hedeflerine ulaşmasını sağlayan stratejik bir çözüm ortağı olmayı hedefliyoruz."
    ]
  },
  "hikayemiz": {
    "pageKey": "story",
    "title": "Hikayemiz",
    "eyebrow": "KURUMSAL",
    "headline": "Bir Organizasyondan Daha Fazlası",
    "paragraphs": [
      "SD Kongre'nin hikayesi, profesyonel organizasyon yönetimine duyulan ihtiyaçtan doğdu.",
      "Kuruluşumuzun temelinde; kurumların farklı tedarikçilerle çalışırken yaşadığı koordinasyon sorunlarını, bütçe kontrolündeki zorlukları ve operasyonel yükleri azaltma fikri bulunmaktadır.",
      "İlk günden itibaren yalnızca etkinlik organizasyonu gerçekleştirmeyi değil, süreç yönetimi konusunda fark yaratmayı hedefledik. Bu nedenle organizasyon sektörünü teknoloji, raporlama ve veri yönetimiyle birleştirerek daha ölçülebilir ve daha sürdürülebilir bir yapı oluşturduk.",
      "Yıllar içerisinde gerçekleştirdiğimiz toplantılar, kongreler, sempozyumlar, eğitim programları, kurumsal etkinlikler ve lansmanlar sayesinde sektörde önemli bir deneyim birikimi elde ettik.",
      "Bugün geldiğimiz noktada SD Kongre; planlama gücü, güçlü operasyon ağı, dijital altyapıları ve uzman ekibiyle Türkiye'nin farklı şehirlerinde başarılı organizasyonlara imza atan güvenilir bir marka haline gelmiştir.",
      "Ancak bizim için başarı, tamamlanan organizasyon sayısından çok müşterilerimizin bize yeniden güvenmesi ve bizi tavsiye etmesidir."
    ]
  },
  "misyon": {
    "pageKey": "mission",
    "title": "Misyon",
    "eyebrow": "KURUMSAL",
    "headline": "Kurumların ihtiyaçlarına özel, yenilikçi ve sürdürülebilir organizasyon çözümleri geliştirerek her projeyi yüksek kalite standartlarında hayata geçirmek.",
    "paragraphs": [
      "Kurumların ihtiyaçlarına özel, yenilikçi ve sürdürülebilir organizasyon çözümleri geliştirerek her projeyi yüksek kalite standartlarında hayata geçirmek.",
      "Planlama, koordinasyon, teknoloji ve operasyon gücümüzü bir araya getirerek müşterilerimize maksimum verimlilik, minimum operasyonel yük ve ölçülebilir başarı sunmak.",
      "Organizasyon süreçlerinde güvenilir bir iş ortağı olarak müşterilerimizin hedeflerine ulaşmalarına katkı sağlamak."
    ]
  },
  "vizyon": {
    "pageKey": "vision",
    "title": "Vizyon",
    "eyebrow": "KURUMSAL",
    "headline": "Kongre ve etkinlik yönetimi sektöründe yenilikçi yaklaşımı, teknolojik altyapıları ve operasyonel mükemmeliyetiyle Türkiye'nin en güçlü ve en çok tercih edilen organizasyon yönetim markalarından biri olmak.",
    "paragraphs": [
      "Kongre ve etkinlik yönetimi sektöründe yenilikçi yaklaşımı, teknolojik altyapıları ve operasyonel mükemmeliyetiyle Türkiye'nin en güçlü ve en çok tercih edilen organizasyon yönetim markalarından biri olmak.",
      "Ulusal ve uluslararası ölçekte yürütülen projelerde kalite, güven ve sürdürülebilirlik denildiğinde akla gelen ilk çözüm ortağı haline gelmek."
    ]
  },
  "degerlerimiz": {
    "pageKey": "values",
    "title": "Değerlerimiz",
    "eyebrow": "KURUMSAL",
    "headline": "Değerlerimiz",
    "paragraphs": [],
    "values": [
      {
        "title": "Güven",
        "description": "İşimizin temelinde güven yer alır. Verdiğimiz sözleri zamanında yerine getirir, süreçleri şeffaf biçimde yönetir ve müşterilerimizle uzun vadeli ilişkiler kurarız."
      },
      {
        "title": "Şeffaflık",
        "description": "Bütçe, planlama, satın alma ve raporlama süreçlerinin tamamında açık iletişim prensibiyle hareket ederiz."
      },
      {
        "title": "Profesyonellik",
        "description": "Her organizasyona aynı ciddiyet ve sorumluluk bilinciyle yaklaşırız."
      },
      {
        "title": "Yenilikçilik",
        "description": "Teknolojik gelişmeleri yakından takip eder, organizasyon süreçlerine yenilikçi çözümler entegre ederiz."
      },
      {
        "title": "Sürdürülebilirlik",
        "description": "Planlama ve operasyon süreçlerinde kaynakların verimli kullanımını esas alırız."
      },
      {
        "title": "Müşteri Odaklılık",
        "description": "Başarımızın merkezinde müşteri memnuniyeti bulunmaktadır."
      }
    ]
  }
} as const satisfies Record<string, CorporatePageContent>;

export const whyUsContent = {
  "pageKey": "why-us",
  "title": "Neden Biz",
  "eyebrow": "NEDEN BİZ",
  "headline": "Her Detayı Yönetiyor, Her Süreci Kontrol Ediyoruz",
  "paragraphs": [
    "Bir organizasyonun başarısı yalnızca etkinlik günündeki kusursuz uygulamayla değil, öncesinde yapılan doğru planlama ve profesyonel koordinasyonla mümkündür.",
    "SD Kongre olarak müşterilerimize yalnızca organizasyon hizmeti değil, bütüncül proje yönetimi sunuyoruz."
  ],
  "items": [
    {
      "title": "Tek Noktadan Yönetim",
      "description": "Farklı tedarikçiler, farklı ekipler ve ayrı koordinasyon süreçleri yerine tüm organizasyon tek merkezden yönetilir.",
      "icon": "network"
    },
    {
      "title": "Türkiye Genelinde Operasyon Gücü",
      "description": "Ankara merkezli yapımız ve geniş çözüm ortağı ağımız sayesinde ülke genelinde aynı kalite standartlarında hizmet veriyoruz.",
      "icon": "map"
    },
    {
      "title": "Teknoloji Destekli Süreçler",
      "description": "Online kayıt sistemleri, QR kod uygulamaları, dijital davet çözümleri ve raporlama sistemleriyle süreçleri daha verimli yönetiyoruz.",
      "icon": "cpu"
    },
    {
      "title": "Şeffaf Bütçe Yönetimi",
      "description": "Harcamaların her aşaması kontrol altında tutulur ve düzenli raporlanır.",
      "icon": "wallet"
    },
    {
      "title": "Deneyimli Uzman Kadro",
      "description": "Alanında uzman proje yöneticileri, operasyon ekipleri ve teknik destek personelleri ile tüm süreçler profesyonel şekilde yürütülür.",
      "icon": "users"
    },
    {
      "title": "Ölçülebilir Sonuçlar",
      "description": "Her organizasyon sonunda detaylı raporlama sunularak yatırımın geri dönüşü analiz edilir.",
      "icon": "chart"
    }
  ]
} as const;

export const physicalServices = [
  {
    "category": "physical",
    "slug": "lansman-ve-kurumsal-etkinlikler",
    "title": "Lansman ve Kurumsal Etkinlikler",
    "icon": "sparkles",
    "summary": "Yeni ürün, hizmet veya marka tanıtımlarında hedef kitleniz üzerinde güçlü ve kalıcı etkiler bırakacak profesyonel etkinlikler tasarlıyoruz.",
    "paragraphs": [
      "Etkinlik konseptinin oluşturulmasından mekan seçimine, sahne tasarımından teknik altyapıya, davet süreçlerinden medya koordinasyonuna kadar tüm organizasyon detaylarını yönetiyoruz.",
      "Markanızın kurumsal kimliğini ve mesajını doğru şekilde yansıtan etkinlik deneyimleri sunuyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "kongre-organizasyonlari",
    "title": "Kongre Organizasyonları",
    "icon": "presentation",
    "summary": "Bilimsel, akademik, mesleki ve sektörel kongrelerin tüm süreçlerini profesyonel standartlarda yönetiyoruz.",
    "paragraphs": [],
    "features": [
      "Bilimsel kurul koordinasyonu",
      "Kongre sekretaryası",
      "Katılımcı yönetimi",
      "Bildiri yönetim sistemleri",
      "Konuşmacı koordinasyonu",
      "Sponsorluk yönetimi",
      "Kayıt sistemleri",
      "Konaklama planlaması",
      "Teknik altyapı yönetimi",
      "Sergi alanı organizasyonu",
      "Bütçe ve raporlama süreçleri"
    ]
  },
  {
    "category": "physical",
    "slug": "toplanti-ve-sempozyum-yonetimi",
    "title": "Toplantı  ve Sempozyum Yönetimi",
    "icon": "messages",
    "summary": "Kurumsal toplantılar, eğitim seminerleri ve sempozyum organizasyonlarında verimlilik odaklı çözümler sunuyoruz.",
    "paragraphs": [
      "Katılımcı deneyimini artıran, kurumsal hedeflere katkı sağlayan profesyonel toplantı organizasyonları gerçekleştiriyoruz."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "workshop-organizasyonlari",
    "title": "Workshop Organizasyonları",
    "icon": "workflow",
    "summary": "Katılımcı etkileşiminin yüksek olduğu workshop ve eğitim etkinliklerinde tüm operasyonel süreçleri planlıyor ve yönetiyoruz.",
    "paragraphs": [
      "Mekan planlaması, teknik ekipman tedariği, kayıt süreçleri ve saha yönetimi eksiksiz olarak yürütülmektedir."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "fuar-ve-sergi-organizasyonlari",
    "title": "Fuar ve Sergi Organizasyonları",
    "icon": "landmark",
    "summary": "Markanızın görünürlüğünü artıracak fuar ve sergi organizasyonlarını yaratıcı çözümlerle destekliyoruz.",
    "paragraphs": [
      "Stand tasarımlarından teknik kurulumlara, ziyaretçi yönetiminden operasyonel koordinasyona kadar tüm süreçler kontrol altında tutulmaktadır."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "seyahat-ve-konaklama-yonetimi",
    "title": "Seyahat ve Konaklama Yönetimi",
    "icon": "hotel",
    "summary": "Katılımcı, konuşmacı ve davetlilerin tüm seyahat süreçlerini profesyonel biçimde planlıyoruz.",
    "paragraphs": [],
    "features": [
      "Uçak bileti organizasyonu",
      "Otel rezervasyonları",
      "VIP konaklama çözümleri",
      "Grup rezervasyonları",
      "Karşılama hizmetleri",
      "Transfer koordinasyonu"
    ]
  },
  {
    "category": "physical",
    "slug": "transfer-ve-lojistik-yonetimi",
    "title": "Transfer ve lojistik Yönetimi",
    "icon": "bus",
    "summary": "Etkinliklerin görünmeyen ancak en kritik süreçlerinden biri olan lojistik yönetimini profesyonel ekiplerle yürütüyoruz.",
    "paragraphs": [
      "Katılımcı transferlerinden ekipman taşımalarına kadar tüm süreçler detaylı planlarla yönetilmektedir."
    ],
    "features": []
  },
  {
    "category": "physical",
    "slug": "tedarikci-ve-operasyon-yonetimi",
    "title": "Tedarikçi ve Operasyon Yönetimi",
    "icon": "clipboard",
    "summary": "Organizasyon başarısının temelinde doğru tedarikçi seçimi yer alır.",
    "paragraphs": [
      "SD Kongre olarak teknik ekiplerden catering hizmetlerine, dekorasyon firmalarından ulaşım sağlayıcılarına kadar tüm tedarikçi yönetimini gerçekleştiriyoruz."
    ],
    "features": []
  }
] as const satisfies readonly ServiceContent[];

export const digitalServices = [
  {
    "category": "digital",
    "slug": "katilimci-ve-kayit-yonetimi",
    "title": "Katılımcı ve Kayıt Yönetimi",
    "icon": "user-check",
    "summary": "Katılımcı kayıt süreçlerini tamamen dijital ortama taşıyarak zaman kaybını ve operasyonel yükü azaltıyoruz.",
    "paragraphs": [
      "Katılım formları, ödeme sistemleri, kayıt takibi ve anlık raporlama tek platform üzerinden yönetilmektedir."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "dijital-altyapi-ve-etkinlik-teknolojileri",
    "title": "Dijital Altyapı ve Etkinlik Teknolojileri",
    "icon": "monitor",
    "summary": "Modern organizasyonların ihtiyaç duyduğu tüm teknolojik çözümleri sunuyoruz.",
    "paragraphs": [],
    "features": [
      "Kayıt yazılımları",
      "Mobil uygulamalar",
      "Canlı yayın sistemleri",
      "Hibrit etkinlik çözümleri",
      "Katılımcı yönetim panelleri"
    ]
  },
  {
    "category": "digital",
    "slug": "qr-kod-ve-yaka-kart-sistemleri",
    "title": "QR Kod ve Yaka Kart Sistemleri",
    "icon": "qr",
    "summary": "Katılımcı girişlerini hızlandıran ve hata oranını en aza indiren dijital kontrol sistemleri sağlıyoruz.",
    "paragraphs": [
      "QR kod entegrasyonlu yaka kartları sayesinde anlık giriş takibi ve raporlama yapılabilmektedir."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "online-davet-ve-iletisim-yonetimi",
    "title": "Online Davet ve İletişim Yönetimi",
    "icon": "mail",
    "summary": "Profesyonel tasarıma sahip dijital davet sistemleri ve toplu iletişim çözümleri ile katılımcılarla etkin iletişim kuruyoruz.",
    "paragraphs": [],
    "features": []
  },
  {
    "category": "digital",
    "slug": "organizasyon-takip-sistemleri",
    "title": "Organizasyon Takip Sistemleri",
    "icon": "list-checks",
    "summary": "Tüm proje süreçleri dijital olarak izlenebilir hale getirilir.",
    "paragraphs": [
      "Bu sayede organizasyonun hangi aşamada olduğu gerçek zamanlı olarak takip edilebilir."
    ],
    "features": []
  },
  {
    "category": "digital",
    "slug": "veri-ve-raporlama-sistemleri",
    "title": "Veri ve Raporlama Sistemleri",
    "icon": "chart",
    "summary": "Etkinlik sonunda yalnızca organizasyonu tamamlamıyor, ölçülebilir sonuçlar da sunuyoruz.",
    "paragraphs": [],
    "features": [
      "Katılımcı analizleri",
      "Katılım oranları",
      "Operasyon raporları",
      "Bütçe raporları",
      "Performans değerlendirmeleri"
    ]
  },
  {
    "category": "digital",
    "slug": "veri-guvenligi-ve-merkezi-yonetim",
    "title": "Veri Güvenliği ve Merkezi Yönetim",
    "icon": "shield",
    "summary": "Tüm katılımcı verileri güvenli sunucularda saklanmakta ve KVKK hükümlerine uygun şekilde işlenmektedir.",
    "paragraphs": [
      "Kurumsal verileriniz en yüksek güvenlik standartlarıyla korunmaktadır."
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
  "headline": "Başarılı organizasyonların temelinde güçlü iş birlikleri bulunmaktadır.",
  "paragraphs": [
    "Başarılı organizasyonların temelinde güçlü iş birlikleri bulunmaktadır.",
    "Bugüne kadar kamu kurumları, üniversiteler, odalar, dernekler, sağlık kuruluşları ve özel sektör şirketleriyle yürüttüğümüz projelerde kalite ve güven odaklı hizmet anlayışımızla uzun soluklu iş ortaklıkları geliştirdik.",
    "Müşterilerimizin memnuniyeti, SD Kongre'nin en değerli referansıdır."
  ]
} as const;

export const allServices = [...physicalServices, ...digitalServices] as const;

export type NavigationChild = Readonly<{
  id: string;
  label: string;
  href: string;
}>;

export type NavigationItem = Readonly<{
  id: string;
  label: string;
  href: string;
  children?: readonly NavigationChild[];
}>;

export const navigation: readonly NavigationItem[] = [
  {
    id: "home",
    label: "ANA SAYFA",
    href: "/",
  },
  {
    id: "corporate",
    label: "KURUMSAL",
    href: "/kurumsal",
    children: [
      {
        id: "about",
        label: "Hakkımızda",
        href: "/kurumsal#hakkimizda",
      },
      {
        id: "story",
        label: "Hikayemiz",
        href: "/kurumsal#hikayemiz",
      },
      {
        id: "mission",
        label: "Misyon",
        href: "/kurumsal#misyon",
      },
      {
        id: "vision",
        label: "Vizyon",
        href: "/kurumsal#vizyon",
      },
      {
        id: "values",
        label: "Değerlerimiz",
        href: "/kurumsal#degerlerimiz",
      },
    ],
  },
  {
    id: "why-us",
    label: "NEDEN BİZ",
    href: "/neden-biz",
  },
  {
    id: "services",
    label: "HİZMETLERİMİZ",
    href: "/hizmetlerimiz",
    children: [
      {
        id: "launch-events",
        label: "Lansman ve Kurumsal Etkinlikler",
        href: "/hizmetlerimiz#lansman-ve-kurumsal-etkinlikler",
      },
      {
        id: "congress-events",
        label: "Kongre Organizasyonları",
        href: "/hizmetlerimiz#kongre-organizasyonlari",
      },
      {
        id: "meeting-symposium",
        label: "Toplantı  ve Sempozyum Yönetimi",
        href: "/hizmetlerimiz#toplanti-ve-sempozyum-yonetimi",
      },
      {
        id: "workshops",
        label: "Workshop Organizasyonları",
        href: "/hizmetlerimiz#workshop-organizasyonlari",
      },
      {
        id: "fair-exhibition",
        label: "Fuar ve Sergi Organizasyonları",
        href: "/hizmetlerimiz#fuar-ve-sergi-organizasyonlari",
      },
      {
        id: "travel-accommodation",
        label: "Seyahat ve Konaklama Yönetimi",
        href: "/hizmetlerimiz#seyahat-ve-konaklama-yonetimi",
      },
      {
        id: "transfer-logistics",
        label: "Transfer ve lojistik Yönetimi",
        href: "/hizmetlerimiz#transfer-ve-lojistik-yonetimi",
      },
      {
        id: "supplier-operations",
        label: "Tedarikçi ve Operasyon Yönetimi",
        href: "/hizmetlerimiz#tedarikci-ve-operasyon-yonetimi",
      },
    ],
  },
  {
    id: "digital-services",
    label: "DİJİTAL HİZMETLER",
    href: "/dijital-hizmetler",
    children: [
      {
        id: "participant-registration",
        label: "Katılımcı ve Kayıt Yönetimi",
        href: "/dijital-hizmetler#katilimci-ve-kayit-yonetimi",
      },
      {
        id: "event-technology",
        label: "Dijital Altyapı ve Etkinlik Teknolojileri",
        href: "/dijital-hizmetler#dijital-altyapi-ve-etkinlik-teknolojileri",
      },
      {
        id: "qr-badges",
        label: "QR Kod ve Yaka Kart Sistemleri",
        href: "/dijital-hizmetler#qr-kod-ve-yaka-kart-sistemleri",
      },
      {
        id: "online-invitation",
        label: "Online Davet ve İletişim Yönetimi",
        href: "/dijital-hizmetler#online-davet-ve-iletisim-yonetimi",
      },
      {
        id: "event-tracking",
        label: "Organizasyon Takip Sistemleri",
        href: "/dijital-hizmetler#organizasyon-takip-sistemleri",
      },
      {
        id: "data-reporting",
        label: "Veri ve Raporlama Sistemleri",
        href: "/dijital-hizmetler#veri-ve-raporlama-sistemleri",
      },
      {
        id: "data-security",
        label: "Veri Güvenliği ve Merkezi Yönetim",
        href: "/dijital-hizmetler#veri-guvenligi-ve-merkezi-yonetim",
      },
    ],
  },
  {
    id: "process",
    label: "ORGANİZASYON SURECİ",
    href: "/organizasyon-sureci",
  },
  {
    id: "projects",
    label: "PROJELER",
    href: "/projeler",
  },
  {
    id: "references",
    label: "REFERANSLAR",
    href: "/referanslar",
  },
  {
    id: "privacy",
    label: "KVKK",
    href: "/kvkk",
    children: [
      {
        id: "privacy-notice",
        label: "KVKK Aydınlatma Metni",
        href: "/kvkk/aydinlatma-metni",
      },
      {
        id: "privacy-policy",
        label: "Gizlilik Politikası",
        href: "/kvkk/gizlilik-politikasi",
      },
      {
        id: "cookie-policy",
        label: "Çerez (Cookie) Politikası",
        href: "/kvkk/cerez-politikasi",
      },
      {
        id: "explicit-consent",
        label: "Açık Rıza Metni",
        href: "/kvkk/acik-riza-metni",
      },
      {
        id: "legal-basis",
        label: "Yasal Dayanaklar",
        href: "/kvkk/yasal-dayanaklar",
      },
    ],
  },
  {
    id: "contact",
    label: "İLETİŞİM",
    href: "/iletisim",
  },
] as const;

export const lockedNavigationLabels = navigation.flatMap((item) => [
  item.label,
  ...(item.children?.map((child) => child.label) ?? []),
]);

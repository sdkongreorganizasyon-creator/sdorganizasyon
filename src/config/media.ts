import type { HomeValue } from "@/types/content";

export const approvedHeroPoster = "/media/headers/anasayfa.webp";

export const brandAssets = {
  headerLogo: "/brand/sdkongre-logo-dark.png",
  footerLogo: "/brand/sdkongre-logo-dark.png",
  compactLogo: "/brand/sdkongre-logo-dark.png",
  favicon: "/brand/sdkongre-favicon.png",
  source8k: "/brand/sdkongre-logo-8k.png",
} as const;

export const homeShowcaseCards = [
  {
    number: "01",
    title: "Kongre Organizasyonu",
    description:
      "Ulusal ve uluslararası kongrelerin planlama, koordinasyon ve saha süreçlerini profesyonel biçimde yönetiyoruz.",
    icon: "presentation",
    image: "/media/services/physical/kongre-organizasyonlari.webp",
  },
  {
    number: "02",
    title: "Toplantı Yönetimi",
    description:
      "Yönetim toplantıları, genel kurullar ve kurumsal buluşmalar için uçtan uca çözümler sunuyoruz.",
    icon: "users",
    image:
      "/media/services/physical/toplanti-ve-sempozyum-yonetimi.webp",
  },
  {
    number: "03",
    title: "Etkinlik Tasarımı",
    description:
      "Markanızın hedeflerine uygun yaratıcı etkinlik tasarımları ve etkileyici deneyimler oluşturuyoruz.",
    icon: "sparkles",
    image: "/media/services/physical/fuar-ve-sergi-organizasyonlari.webp",
  },
  {
    number: "04",
    title: "Destinasyon Yönetimi",
    description:
      "Konaklama, ulaşım ve yerel operasyonları tek merkezden planlayarak kusursuz bir katılımcı deneyimi sağlıyoruz.",
    icon: "map",
    image: "/media/services/physical/seyahat-ve-konaklama-yonetimi.webp",
  },
  {
    number: "05",
    title: "Teknik Çözümler",
    description:
      "Ses, ışık, sahne, yayın ve etkinlik teknolojilerini ihtiyaca uygun şekilde yönetiyoruz.",
    icon: "cpu",
    image:
      "/media/services/physical/tedarikci-ve-operasyon-yonetimi.webp",
  },
] as const;

export const whyUsHighlights = [
  {
    title: "Deneyimli Ekip",
    description: "Alanında uzman profesyoneller",
    icon: "shield",
  },
  {
    title: "Yaratıcı Yaklaşım",
    description: "Yenilikçi ve özgün çözümler",
    icon: "sparkles",
  },
  {
    title: "Uçtan Uca Hizmet",
    description: "Planlamadan uygulamaya her aşamada yanınızdayız",
    icon: "network",
  },
  {
    title: "Global Deneyim",
    description: "Ulusal ve uluslararası organizasyon yaklaşımı",
    icon: "globe",
  },
] as const;

export const capabilityStrip = [
  {
    title: "Deneyimli Ekip",
    description: "Uzmanlık ve kontrollü operasyon",
    icon: "users",
  },
  {
    title: "Şeffaf Süreç",
    description: "Planlama ve bütçede açık iletişim",
    icon: "chart",
  },
  {
    title: "Her Aşamada Destek",
    description: "Hazırlıktan etkinlik sonuna kadar",
    icon: "clock",
  },
  {
    title: "Uçtan Uca Çözüm",
    description: "Tek merkezden kapsamlı yönetim",
    icon: "network",
  },
] as const;

export const physicalServiceImages: Readonly<Record<string, string>> = {
  "lansman-ve-kurumsal-etkinlikler":
    "/media/services/physical/lansman-ve-kurumsal-etkinlikler.webp",
  "kongre-organizasyonlari":
    "/media/services/physical/kongre-organizasyonlari.webp",
  "toplanti-ve-sempozyum-yonetimi":
    "/media/services/physical/toplanti-ve-sempozyum-yonetimi.webp",
  "workshop-organizasyonlari":
    "/media/services/physical/workshop-organizasyonlari.webp",
  "fuar-ve-sergi-organizasyonlari":
    "/media/services/physical/fuar-ve-sergi-organizasyonlari.webp",
  "seyahat-ve-konaklama-yonetimi":
    "/media/services/physical/seyahat-ve-konaklama-yonetimi.webp",
  "transfer-ve-lojistik-yonetimi":
    "/media/services/physical/transfer-ve-lojistik-yonetimi.webp",
  "tedarikci-ve-operasyon-yonetimi":
    "/media/services/physical/tedarikci-ve-operasyon-yonetimi.webp",
};

export const digitalServiceImages: Readonly<Record<string, string>> = {
  "katilimci-ve-kayit-yonetimi":
    "/media/services/digital/katilimci-ve-kayit-yonetimi.webp",
  "dijital-altyapi-ve-etkinlik-teknolojileri":
    "/media/services/digital/dijital-altyapi-ve-etkinlik-teknolojileri.webp",
  "qr-kod-ve-yaka-kart-sistemleri":
    "/media/services/digital/qr-kod-ve-yaka-kart-sistemleri.webp",
  "online-davet-ve-iletisim-yonetimi":
    "/media/services/digital/online-davet-ve-iletisim-yonetimi.webp",
  "organizasyon-takip-sistemleri":
    "/media/services/digital/organizasyon-takip-sistemleri.webp",
  "veri-ve-raporlama-sistemleri":
    "/media/services/digital/veri-ve-raporlama-sistemleri.webp",
  "veri-guvenligi-ve-merkezi-yonetim":
    "/media/services/digital/veri-guvenligi-ve-merkezi-yonetim.webp",
};

export const defaultHomeValues: readonly HomeValue[] = homeShowcaseCards.map(
  ({ number, title, description, icon, image }) => ({
    number,
    title,
    description,
    icon,
    image,
    active: true,
  }),
);

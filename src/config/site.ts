import { approvedHeroPoster, brandAssets } from "@/config/media";

const fallbackSiteUrl = "https://www.sdkongre.com";

function optionalEnv(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export const siteConfig = {
  name: "SD Kongre",
  shortName: "SDKONGRE",
  defaultTitle: "SDKONGRE | Kongre ve Etkinlik Organizasyonu",
  legalName: "SD Kongre Organizasyon Hizmetleri",
  description:
    "Kongre, toplantı, sempozyum, kurumsal etkinlik ve dijital organizasyon süreçlerinde uçtan uca profesyonel çözümler.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl,
  locale: "tr_TR",
  language: "tr",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  contact: {
    phone: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    mobile: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_MOBILE),
    email: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    quoteEmail: optionalEnv(process.env.CONTACT_TO_EMAIL),
    address: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
    district: null,
    city: null,
    postalCode: null,
    whatsapp: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP),
    workingDays: null,
    workingHours: optionalEnv(process.env.NEXT_PUBLIC_WORKING_HOURS),
    mapUrl: optionalEnv(process.env.NEXT_PUBLIC_MAP_URL),
  },
  social: {
    instagram: optionalEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    linkedin: optionalEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    youtube: optionalEnv(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    x: optionalEnv(process.env.NEXT_PUBLIC_X_URL),
    facebook: null,
  },
  hero: {
    desktopVideo: optionalEnv(process.env.NEXT_PUBLIC_HERO_VIDEO_DESKTOP),
    mobileVideo: optionalEnv(process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE),
    poster:
      optionalEnv(process.env.NEXT_PUBLIC_HERO_POSTER) ?? approvedHeroPoster,
  },
  branding: brandAssets,
} as const;

export type SiteConfig = typeof siteConfig;

import { unstable_cache } from "next/cache";

import { approvedHeroPoster, brandAssets, defaultHomeValues } from "@/config/media";
import { siteConfig } from "@/config/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import type { HomeValue } from "@/types/content";

export const SITE_SETTINGS_TAG = "site-settings-global-tr";

export type ResolvedSiteSettings = Readonly<{
  general: {
    siteName: string;
    legalName: string;
    slogan: string;
    shortDescription: string;
    establishmentYear: string;
    headquarters: string;
  };
  contact: {
    phone: string | null;
    mobile: string | null;
    email: string | null;
    quoteEmail: string | null;
    address: string | null;
    district: string | null;
    city: string | null;
    postalCode: string | null;
    whatsapp: string | null;
    workingDays: string | null;
    workingHours: string | null;
    mapUrl: string | null;
  };
  social: {
    instagram: string | null;
    linkedin: string | null;
    youtube: string | null;
    x: string | null;
    facebook: string | null;
  };
  header: {
    quoteButtonLabel: string;
    quoteButtonUrl: string;
    menuButtonLabel: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    description: string;
    primaryButtonLabel: string;
    primaryButtonUrl: string;
    secondaryButtonLabel: string;
    secondaryButtonUrl: string;
    poster: string;
    desktopVideo: string | null;
    mobileVideo: string | null;
  };
  footer: {
    description: string;
    copyrightText: string;
    showQuickMenu: boolean;
    showLegalLinks: boolean;
    showContact: boolean;
    showSocialLinks: boolean;
  };
  branding: {
    headerLogoUrl: string;
    footerLogoUrl: string;
    compactLogoUrl: string;
    faviconUrl: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
    canonicalBaseUrl: string;
    indexable: boolean;
  };
  homeValues: readonly HomeValue[];
}>;

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function has(source: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(source, key);
}

function text(
  source: Record<string, unknown>,
  key: string,
  fallback: string,
): string {
  if (!has(source, key)) return fallback;
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(
  source: Record<string, unknown>,
  key: string,
  fallback: string | null,
): string | null {
  if (!has(source, key)) return fallback;
  const value = source[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function bool(
  source: Record<string, unknown>,
  key: string,
  fallback: boolean,
) {
  if (!has(source, key)) return fallback;
  return typeof source[key] === "boolean" ? source[key] : fallback;
}

function resolveHomeValues(value: unknown): readonly HomeValue[] {
  if (!Array.isArray(value) || value.length !== 5) return defaultHomeValues;

  const usesLegacyShape = value.some((item) => {
    const source = record(item);
    return !has(source, "image") || !has(source, "active");
  });

  if (usesLegacyShape) return defaultHomeValues;

  const normalized = value.flatMap((item, index) => {
    const source = record(item);
    const fallback = defaultHomeValues[index];
    const title = text(source, "title", fallback.title);
    const description = text(source, "description", fallback.description);

    if (!title || !description) return [];

    return [
      {
        number: text(source, "number", fallback.number),
        title,
        description,
        icon: text(source, "icon", fallback.icon),
        image: text(source, "image", fallback.image ?? ""),
        active: bool(source, "active", true),
      },
    ];
  });

  return normalized.length === 5 ? normalized : defaultHomeValues;
}

export const fallbackSiteSettings: ResolvedSiteSettings = {
  general: {
    siteName: siteConfig.name,
    legalName: siteConfig.legalName,
    slogan: "Doğru yerde. Doğru zaman. Mükemmel sonuçlar.",
    shortDescription: siteConfig.description,
    establishmentYear: "",
    headquarters: "",
  },
  contact: {
    phone: siteConfig.contact.phone,
    mobile: siteConfig.contact.mobile,
    email: siteConfig.contact.email,
    quoteEmail: siteConfig.contact.quoteEmail,
    address: siteConfig.contact.address,
    district: siteConfig.contact.district,
    city: siteConfig.contact.city,
    postalCode: siteConfig.contact.postalCode,
    whatsapp: siteConfig.contact.whatsapp,
    workingDays: siteConfig.contact.workingDays,
    workingHours: siteConfig.contact.workingHours,
    mapUrl: siteConfig.contact.mapUrl,
  },
  social: siteConfig.social,
  header: {
    quoteButtonLabel: "Teklif Al",
    quoteButtonUrl: "/teklif-al",
    menuButtonLabel: "Menü",
  },
  hero: {
    eyebrow: "KONGRE · TOPLANTI · ETKİNLİK",
    titleLine1: "DOĞRU YERDE",
    titleLine2: "DOĞRU ZAMAN",
    titleHighlight: "MÜKEMMEL SONUÇLAR",
    description:
      "Kongre, toplantı ve etkinlikleriniz için yaratıcı ve etkili çözümler üretiyoruz.",
    primaryButtonLabel: "HİZMETLERİMİZİ KEŞFET",
    primaryButtonUrl: "/hizmetlerimiz",
    secondaryButtonLabel: "BİZİ TANIYIN",
    secondaryButtonUrl: "/kurumsal/hakkimizda",
    poster: siteConfig.hero.poster || approvedHeroPoster,
    desktopVideo: siteConfig.hero.desktopVideo,
    mobileVideo: siteConfig.hero.mobileVideo,
  },
  footer: {
    description:
      "Ulusal ve uluslararası kongre, toplantı ve etkinlik organizasyonlarında planlamadan uygulamaya profesyonel çözümler sunuyoruz.",
    copyrightText: "SDKONGRE Organizasyon Hizmetleri. Tüm hakları saklıdır.",
    showQuickMenu: true,
    showLegalLinks: true,
    showContact: true,
    showSocialLinks: true,
  },
  branding: {
    headerLogoUrl: brandAssets.headerLogo,
    footerLogoUrl: brandAssets.footerLogo,
    compactLogoUrl: brandAssets.compactLogo,
    faviconUrl: brandAssets.favicon,
  },
  seo: {
    defaultTitle: siteConfig.defaultTitle,
    defaultDescription: siteConfig.description,
    ogImage: approvedHeroPoster,
    canonicalBaseUrl: siteConfig.url,
    indexable: siteConfig.indexable,
  },
  homeValues: defaultHomeValues,
};

function resolveDatabaseValue(value: unknown): ResolvedSiteSettings {
  const root = record(value);
  const general = record(root.general);
  const contact = record(root.contact);
  const social = record(root.social);
  const header = record(root.header);
  const hero = record(root.hero);
  const footer = record(root.footer);
  const branding = record(root.branding);
  const seo = record(root.seo);

  return {
    general: {
      siteName: text(general, "siteName", fallbackSiteSettings.general.siteName),
      legalName: text(general, "legalName", fallbackSiteSettings.general.legalName),
      slogan: text(general, "slogan", fallbackSiteSettings.general.slogan),
      shortDescription: text(
        general,
        "shortDescription",
        fallbackSiteSettings.general.shortDescription,
      ),
      establishmentYear: text(general, "establishmentYear", ""),
      headquarters: text(general, "headquarters", ""),
    },
    contact: {
      phone: nullableText(contact, "phone", null),
      mobile: nullableText(contact, "mobile", null),
      email: nullableText(contact, "email", null),
      quoteEmail: nullableText(contact, "quoteEmail", null),
      address: nullableText(contact, "address", null),
      district: nullableText(contact, "district", null),
      city: nullableText(contact, "city", null),
      postalCode: nullableText(contact, "postalCode", null),
      whatsapp: nullableText(contact, "whatsapp", null),
      workingDays: nullableText(contact, "workingDays", null),
      workingHours: nullableText(contact, "workingHours", null),
      mapUrl: nullableText(contact, "mapUrl", null),
    },
    social: {
      instagram: nullableText(social, "instagram", null),
      linkedin: nullableText(social, "linkedin", null),
      youtube: nullableText(social, "youtube", null),
      x: nullableText(social, "x", null),
      facebook: nullableText(social, "facebook", null),
    },
    header: {
      quoteButtonLabel: text(
        header,
        "quoteButtonLabel",
        fallbackSiteSettings.header.quoteButtonLabel,
      ),
      quoteButtonUrl: text(
        header,
        "quoteButtonUrl",
        fallbackSiteSettings.header.quoteButtonUrl,
      ),
      menuButtonLabel: text(
        header,
        "menuButtonLabel",
        fallbackSiteSettings.header.menuButtonLabel,
      ),
    },
    hero: {
      eyebrow: text(hero, "eyebrow", fallbackSiteSettings.hero.eyebrow),
      titleLine1: text(hero, "titleLine1", fallbackSiteSettings.hero.titleLine1),
      titleLine2: text(hero, "titleLine2", fallbackSiteSettings.hero.titleLine2),
      titleHighlight: text(
        hero,
        "titleHighlight",
        fallbackSiteSettings.hero.titleHighlight,
      ),
      description: text(
        hero,
        "description",
        fallbackSiteSettings.hero.description,
      ),
      primaryButtonLabel: text(
        hero,
        "primaryButtonLabel",
        fallbackSiteSettings.hero.primaryButtonLabel,
      ),
      primaryButtonUrl: text(
        hero,
        "primaryButtonUrl",
        fallbackSiteSettings.hero.primaryButtonUrl,
      ),
      secondaryButtonLabel: text(
        hero,
        "secondaryButtonLabel",
        fallbackSiteSettings.hero.secondaryButtonLabel,
      ),
      secondaryButtonUrl: text(
        hero,
        "secondaryButtonUrl",
        fallbackSiteSettings.hero.secondaryButtonUrl,
      ),
      poster: (() => {
        const value = text(hero, "poster", approvedHeroPoster);
        return !value || value === "/fallback/hero-poster.svg"
          ? approvedHeroPoster
          : value;
      })(),
      desktopVideo: nullableText(hero, "desktopVideo", null),
      mobileVideo: nullableText(hero, "mobileVideo", null),
    },
    homeValues: resolveHomeValues(root.homeValues),
    footer: {
      description: text(
        footer,
        "description",
        fallbackSiteSettings.footer.description,
      ),
      copyrightText: text(
        footer,
        "copyrightText",
        fallbackSiteSettings.footer.copyrightText,
      ),
      showQuickMenu: bool(footer, "showQuickMenu", true),
      showLegalLinks: bool(footer, "showLegalLinks", true),
      showContact: bool(footer, "showContact", true),
      showSocialLinks: bool(footer, "showSocialLinks", true),
    },
    branding: {
      headerLogoUrl:
        text(
          branding,
          "headerLogoUrl",
          fallbackSiteSettings.branding.headerLogoUrl,
        ) || fallbackSiteSettings.branding.headerLogoUrl,
      footerLogoUrl:
        text(
          branding,
          "footerLogoUrl",
          fallbackSiteSettings.branding.footerLogoUrl,
        ) || fallbackSiteSettings.branding.footerLogoUrl,
      compactLogoUrl:
        text(
          branding,
          "compactLogoUrl",
          fallbackSiteSettings.branding.compactLogoUrl,
        ) || fallbackSiteSettings.branding.compactLogoUrl,
      faviconUrl:
        text(
          branding,
          "faviconUrl",
          fallbackSiteSettings.branding.faviconUrl,
        ) || fallbackSiteSettings.branding.faviconUrl,
    },
    seo: {
      defaultTitle: text(
        seo,
        "defaultTitle",
        fallbackSiteSettings.seo.defaultTitle,
      ),
      defaultDescription: text(
        seo,
        "defaultDescription",
        fallbackSiteSettings.seo.defaultDescription,
      ),
      ogImage: text(seo, "ogImage", fallbackSiteSettings.seo.ogImage),
      canonicalBaseUrl: text(
        seo,
        "canonicalBaseUrl",
        fallbackSiteSettings.seo.canonicalBaseUrl,
      ),
      indexable: bool(
        seo,
        "indexable",
        fallbackSiteSettings.seo.indexable,
      ),
    },
  };
}

const readCachedSettings = unstable_cache(
  async (): Promise<ResolvedSiteSettings> => {
    if (!isSupabaseConfigured()) return fallbackSiteSettings;

    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value_json")
      .eq("key", "global")
      .eq("locale", "tr")
      .maybeSingle();

    if (error) {
      console.error("[site-settings] Supabase read failed", {
        code: error.code,
        message: error.message,
      });
      return fallbackSiteSettings;
    }

    if (!data?.value_json) return fallbackSiteSettings;
    return resolveDatabaseValue(data.value_json);
  },
  ["site-settings-global-tr"],
  {
    tags: [SITE_SETTINGS_TAG],
    revalidate: false,
  },
);

export async function getResolvedSiteSettings() {
  return readCachedSettings();
}

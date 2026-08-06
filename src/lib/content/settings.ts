import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";

import { approvedHeroPoster, brandAssets, defaultHomeValues } from "@/config/media";
import {
  navigation as defaultNavigation,
  type NavigationChild,
  type NavigationItem,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { HomeValue } from "@/types/content";

export const SITE_SETTINGS_TAG = "site-settings-global-tr";

export type ResolvedNavigationChild = NavigationChild & {
  visible: boolean;
};

export type ResolvedNavigationItem = Omit<NavigationItem, "children"> & {
  visible: boolean;
  showInHeader: boolean;
  showInFooter: boolean;
  children?: readonly ResolvedNavigationChild[];
};

export type ResolvedPageHero = Readonly<{
  id: string;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  video: string | null;
  animation: "fade" | "slide" | "scale" | "none";
  template?: "standard" | "split" | "editorial" | "minimal";
  headingFont?: "system" | "serif" | "geometric" | "humanist";
  bodyFont?: "system" | "serif" | "geometric" | "humanist";
  background?: string;
  textColor?: string;
  accentColor?: string;
  headingScale?: number;
  bodyScale?: number;
  heroSpacing?: number;
}>;

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
  theme: {
    background: string;
    surface: string;
    surfaceAlt: string;
    accent: string;
    text: string;
    muted: string;
    border: string;
    headingFont: "system" | "serif" | "geometric" | "humanist";
    bodyFont: "system" | "serif" | "geometric" | "humanist";
    radius: "compact" | "soft" | "rounded";
    container: "narrow" | "standard" | "wide";
    headingScale: number;
    bodyScale: number;
    sectionSpacing: number;
    cardPadding: number;
    cardGap: number;
    contentGap: number;
    heroSpacing: number;
  };
  motion: {
    enabled: boolean;
    preset: "fade" | "slide" | "scale" | "none";
    duration: number;
  };
  navigation: readonly ResolvedNavigationItem[];
  pageHeroes: readonly ResolvedPageHero[];
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

function numberValue(
  source: Record<string, unknown>,
  key: string,
  fallback: number,
  min: number,
  max: number,
) {
  const value = source[key];
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : fallback;
}

function enumValue<T extends string>(
  source: Record<string, unknown>,
  key: string,
  values: readonly T[],
  fallback: T,
): T {
  const value = source[key];
  return typeof value === "string" && values.includes(value as T)
    ? (value as T)
    : fallback;
}

function resolveHomeValues(value: unknown): readonly HomeValue[] {
  if (!Array.isArray(value)) return defaultHomeValues;

  return value.map((item, index) => {
    const source = record(item);
    const fallback = defaultHomeValues[index] ?? {
      number: "",
      title: "",
      description: "",
      icon: "",
      image: "",
      active: true,
    };

    return {
      number: text(source, "number", fallback.number),
      title: text(source, "title", fallback.title),
      description: text(source, "description", fallback.description),
      icon: text(source, "icon", fallback.icon),
      image: text(source, "image", fallback.image ?? ""),
      active: bool(source, "active", true),
    };
  });
}

function defaultResolvedNavigation(): readonly ResolvedNavigationItem[] {
  return defaultNavigation.map((item) => ({
    ...item,
    visible: true,
    showInHeader: [
      "home",
      "corporate",
      "services",
      "digital-services",
      "references",
      "contact",
    ].includes(item.id),
    showInFooter: !["privacy"].includes(item.id),
    children: item.children?.map((child) => ({
      ...child,
      visible: true,
    })),
  }));
}

function resolveNavigation(value: unknown): readonly ResolvedNavigationItem[] {
  const stored = Array.isArray(value)
    ? value.flatMap((item, index) => {
        const source = record(item);
        const label = text(source, "label", "");
        const href = text(source, "href", "");
        if (!label || !href) return [];

        const rawChildren = Array.isArray(source.children) ? source.children : [];
        const children = rawChildren.flatMap((child, childIndex) => {
          const childSource = record(child);
          const childLabel = text(childSource, "label", "");
          const childHref = text(childSource, "href", "");
          if (!childLabel || !childHref) return [];
          return [{
            id: text(childSource, "id", `child-${index}-${childIndex}`),
            label: childLabel,
            href: childHref,
            visible: bool(childSource, "visible", true),
          }];
        });

        return [{
          id: text(source, "id", `menu-${index}`),
          label,
          href,
          visible: bool(source, "visible", true),
          showInHeader: bool(source, "showInHeader", true),
          showInFooter: bool(source, "showInFooter", true),
          children,
        }];
      })
    : [];

  const defaults = defaultResolvedNavigation();
  const storedById = new Map(stored.map((item) => [item.id, item]));
  const storedByHref = new Map(stored.map((item) => [item.href, item]));

  const merged = defaults.map((fallback) => {
    const saved = storedById.get(fallback.id) ?? storedByHref.get(fallback.href);
    if (!saved) return fallback;

    const defaultChildren = fallback.children ?? [];
    const savedChildrenById = new Map(
      (saved.children ?? []).map((child) => [child.id, child]),
    );
    const savedChildrenByHref = new Map(
      (saved.children ?? []).map((child) => [child.href, child]),
    );
    const mergedChildren = defaultChildren.map((child) => {
      const savedChild =
        savedChildrenById.get(child.id) ??
        savedChildrenByHref.get(child.href);

      if (fallback.id === "corporate") {
        return {
          ...child,
          visible: savedChild?.visible ?? child.visible,
        };
      }

      return {
        ...child,
        ...(savedChild ?? {}),
      };
    });
    const knownChildIds = new Set(defaultChildren.map((child) => child.id));
    const knownChildHrefs = new Set(defaultChildren.map((child) => child.href));

    return {
      ...fallback,
      ...saved,
      ...(fallback.id === "corporate"
        ? {
            label: fallback.label,
            href: fallback.href,
          }
        : {}),
      children: [
        ...mergedChildren,
        ...(saved.children ?? []).filter(
          (child) =>
            !knownChildIds.has(child.id) && !knownChildHrefs.has(child.href),
        ),
      ],
    };
  });

  const knownIds = new Set(defaults.map((item) => item.id));
  const knownHrefs = new Set(defaults.map((item) => item.href));

  return [
    ...merged,
    ...stored.filter(
      (item) => !knownIds.has(item.id) && !knownHrefs.has(item.href),
    ),
  ];
}


const defaultPageHeroes: readonly ResolvedPageHero[] = [
  {
    id: "corporate",
    path: "/kurumsal",
    eyebrow: "KURUMSAL",
    title: "SDKONGRE'yi Yakından Tanıyın",
    description:
      "Hikayemizi, yaklaşımımızı, misyonumuzu, vizyonumuzu ve değerlerimizi tek sayfada inceleyin.",
    image: "/media/headers/kurumsal.webp",
    video: null,
    animation: "fade",
    template: "split",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "why-us",
    path: "/neden-biz",
    eyebrow: "NEDEN BİZ",
    title: "Deneyim, güven ve kontrollü operasyon",
    description:
      "Planlamadan raporlamaya kadar her adımda profesyonel proje yönetimi.",
    image: "/media/headers/neden-biz.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "services",
    path: "/hizmetlerimiz",
    eyebrow: "HİZMETLERİMİZ",
    title: "Tüm Organizasyon Hizmetleri Tek Sayfada",
    description:
      "Planlamadan uygulamaya kadar sunduğumuz hizmetleri, açıklamaları ve görselleriyle birlikte inceleyin.",
    image: "/media/headers/hizmetlerimiz.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "digital-services",
    path: "/dijital-hizmetler",
    eyebrow: "DİJİTAL HİZMETLER",
    title: "Etkinlik Teknolojileri ve Dijital Çözümler",
    description:
      "Kayıt, iletişim, takip ve raporlama süreçlerini tek sayfada açıklamalarıyla birlikte inceleyin.",
    image: "/media/headers/dijital-hizmetler.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "process",
    path: "/organizasyon-sureci",
    eyebrow: "ORGANİZASYON SURECİ",
    title: "Organizasyon Süreci",
    description:
      "Brief, planlama, teklif, onay, operasyon ve raporlama aşamalarından oluşan profesyonel organizasyon yönetimi.",
    image: "/media/headers/organizasyon-sureci.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "projects",
    path: "/projeler",
    eyebrow: "PROJELER",
    title: "Projeler",
    description:
      "Kullanım izni bulunan gerçek proje kayıtlarımızı inceleyin.",
    image: "/media/headers/projeler.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "references",
    path: "/referanslar",
    eyebrow: "REFERANSLAR",
    title: "Referanslar",
    description:
      "Güven ve kalite odaklı iş birliklerimizi inceleyin.",
    image: "/media/headers/referanslar.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "contact",
    path: "/iletisim",
    eyebrow: "İLETİŞİM",
    title: "Bizimle İletişime Geçin",
    description:
      "Sorularınızı, proje kapsamınızı veya iş birliği talebinizi güvenli form üzerinden bize iletin.",
    image: "/media/headers/iletisim.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "quote",
    path: "/teklif-al",
    eyebrow: "TEKLİF AL",
    title: "Organizasyonunuzu Birlikte Planlayalım",
    description:
      "Etkinliğinizin temel bilgilerini paylaşın. Ekibimiz ihtiyaçlarınızı değerlendirerek sizinle iletişime geçsin.",
    image: "/media/headers/teklif-al.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
  {
    id: "privacy",
    path: "/kvkk",
    eyebrow: "KVKK",
    title: "Kişisel Verilerin Korunması",
    description:
      "Aydınlatma, gizlilik, çerez ve açık rıza metinlerini inceleyin.",
    image: "/media/headers/kvkk.webp",
    video: null,
    animation: "fade",
    template: "standard",
    headingFont: "system",
    bodyFont: "system",
    background: "#07111d",
    textColor: "#ffffff",
    accentColor: "#f2b632",
    headingScale: 1,
    bodyScale: 1,
    heroSpacing: 72,
  },
];

function resolvePageHeroes(value: unknown): readonly ResolvedPageHero[] {
  const stored = Array.isArray(value)
    ? value.flatMap((item, index) => {
        const source = record(item);
        const path = text(source, "path", "");
        if (!path) return [];

        const rawAnimation = text(source, "animation", "fade");
        const animation =
          rawAnimation === "slide" ||
          rawAnimation === "scale" ||
          rawAnimation === "none"
            ? rawAnimation
            : "fade";
        const template = enumValue(
          source,
          "template",
          ["standard", "split", "editorial", "minimal"] as const,
          "standard",
        );
        const headingFont = enumValue(
          source,
          "headingFont",
          ["system", "serif", "geometric", "humanist"] as const,
          "system",
        );
        const bodyFont = enumValue(
          source,
          "bodyFont",
          ["system", "serif", "geometric", "humanist"] as const,
          "system",
        );

        return [
          {
            id: text(source, "id", `page-hero-${index}`),
            path,
            eyebrow: text(source, "eyebrow", ""),
            title: text(source, "title", ""),
            description: text(source, "description", ""),
            image: text(source, "image", ""),
            video: nullableText(source, "video", null),
            animation,
            template,
            headingFont,
            bodyFont,
            background: text(source, "background", "#07111d"),
            textColor: text(source, "textColor", "#ffffff"),
            accentColor: text(source, "accentColor", "#f2b632"),
            headingScale: numberValue(source, "headingScale", 1, 0.5, 2),
            bodyScale: numberValue(source, "bodyScale", 1, 0.5, 2),
            heroSpacing: numberValue(source, "heroSpacing", 72, 0, 240),
          } satisfies ResolvedPageHero,
        ];
      })
    : [];

  const byPath = new Map(stored.map((item) => [item.path, item]));
  const legacyHeroImages = new Set([
    "",
    "/fallback/hero-poster.svg",
    "/media/home/sdkongre-approved-hero.webp",
  ]);
  const merged = defaultPageHeroes.map((fallback) => {
    const saved = byPath.get(fallback.path);
    if (!saved) return fallback;

    return {
      ...fallback,
      ...saved,
      image: legacyHeroImages.has(saved.image) ? fallback.image : saved.image,
    };
  });
  const knownPaths = new Set(defaultPageHeroes.map((item) => item.path));
  return [...merged, ...stored.filter((item) => !knownPaths.has(item.path))];
}

export function getPageHero(
  settings: ResolvedSiteSettings,
  path: string,
  fallback: Omit<ResolvedPageHero, "id" | "path">,
): ResolvedPageHero {
  return (
    settings.pageHeroes.find((item) => item.path === path) ?? {
      id: path.replaceAll("/", "-") || "home",
      path,
      ...fallback,
    }
  );
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
    description: "Doğru İş Ortakları ile Kusursuz Sonuçlar",
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
  theme: {
    background: "#07111d",
    surface: "#0b1c2b",
    surfaceAlt: "#10263a",
    accent: "#f2b632",
    text: "#ffffff",
    muted: "#a8b3c0",
    border: "#314052",
    headingFont: "system",
    bodyFont: "system",
    radius: "soft",
    container: "standard",
    headingScale: 1,
    bodyScale: 1,
    sectionSpacing: 72,
    cardPadding: 18,
    cardGap: 16,
    contentGap: 32,
    heroSpacing: 72,
  },
  motion: {
    enabled: true,
    preset: "fade",
    duration: 500,
  },
  navigation: defaultResolvedNavigation(),
  pageHeroes: defaultPageHeroes,
  homeValues: defaultHomeValues,
};

export function resolveSiteSettingsValue(value: unknown): ResolvedSiteSettings {
  const root = record(value);
  const general = record(root.general);
  const contact = record(root.contact);
  const social = record(root.social);
  const header = record(root.header);
  const hero = record(root.hero);
  const footer = record(root.footer);
  const branding = record(root.branding);
  const seo = record(root.seo);
  const theme = record(root.theme);
  const motion = record(root.motion);

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
        const candidate = text(hero, "poster", approvedHeroPoster);
        return !candidate || candidate === "/fallback/hero-poster.svg"
          ? approvedHeroPoster
          : candidate;
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
        text(branding, "headerLogoUrl", fallbackSiteSettings.branding.headerLogoUrl) ||
        fallbackSiteSettings.branding.headerLogoUrl,
      footerLogoUrl:
        text(branding, "footerLogoUrl", fallbackSiteSettings.branding.footerLogoUrl) ||
        fallbackSiteSettings.branding.footerLogoUrl,
      compactLogoUrl:
        text(branding, "compactLogoUrl", fallbackSiteSettings.branding.compactLogoUrl) ||
        fallbackSiteSettings.branding.compactLogoUrl,
      faviconUrl:
        text(branding, "faviconUrl", fallbackSiteSettings.branding.faviconUrl) ||
        fallbackSiteSettings.branding.faviconUrl,
    },
    seo: {
      defaultTitle: text(seo, "defaultTitle", fallbackSiteSettings.seo.defaultTitle),
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
      indexable: bool(seo, "indexable", fallbackSiteSettings.seo.indexable),
    },
    theme: {
      background: text(theme, "background", fallbackSiteSettings.theme.background),
      surface: text(theme, "surface", fallbackSiteSettings.theme.surface),
      surfaceAlt: text(theme, "surfaceAlt", fallbackSiteSettings.theme.surfaceAlt),
      accent: text(theme, "accent", fallbackSiteSettings.theme.accent),
      text: text(theme, "text", fallbackSiteSettings.theme.text),
      muted: text(theme, "muted", fallbackSiteSettings.theme.muted),
      border: text(theme, "border", fallbackSiteSettings.theme.border),
      headingFont: enumValue(
        theme,
        "headingFont",
        ["system", "serif", "geometric", "humanist"] as const,
        fallbackSiteSettings.theme.headingFont,
      ),
      bodyFont: enumValue(
        theme,
        "bodyFont",
        ["system", "serif", "geometric", "humanist"] as const,
        fallbackSiteSettings.theme.bodyFont,
      ),
      radius: enumValue(
        theme,
        "radius",
        ["compact", "soft", "rounded"] as const,
        fallbackSiteSettings.theme.radius,
      ),
      container: enumValue(
        theme,
        "container",
        ["narrow", "standard", "wide"] as const,
        fallbackSiteSettings.theme.container,
      ),
      headingScale: numberValue(theme, "headingScale", 1, 0.5, 2),
      bodyScale: numberValue(theme, "bodyScale", 1, 0.5, 2),
      sectionSpacing: numberValue(theme, "sectionSpacing", 72, 0, 240),
      cardPadding: numberValue(theme, "cardPadding", 18, 0, 96),
      cardGap: numberValue(theme, "cardGap", 16, 0, 96),
      contentGap: numberValue(theme, "contentGap", 32, 0, 160),
      heroSpacing: numberValue(theme, "heroSpacing", 72, 0, 240),
    },
    motion: {
      enabled: bool(motion, "enabled", true),
      preset: enumValue(
        motion,
        "preset",
        ["fade", "slide", "scale", "none"] as const,
        "fade",
      ),
      duration: numberValue(motion, "duration", 500, 100, 1600),
    },
    navigation: resolveNavigation(root.navigation),
    pageHeroes: resolvePageHeroes(root.pageHeroes),
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
    return resolveSiteSettingsValue(data.value_json);
  },
  ["site-settings-global-tr"],
  {
    tags: [SITE_SETTINGS_TAG],
    revalidate: false,
  },
);

async function readDraftSettings() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value_json")
    .eq("key", "global_draft")
    .eq("locale", "tr")
    .maybeSingle();

  if (error) {
    console.error("[site-settings] Taslak ayarlar okunamadı", {
      code: error.code,
      message: error.message,
    });
    return null;
  }

  return data?.value_json ? resolveSiteSettingsValue(data.value_json) : null;
}

export async function getResolvedSiteSettings() {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const draft = await readDraftSettings();
    if (draft) return draft;
  }

  return readCachedSettings();
}

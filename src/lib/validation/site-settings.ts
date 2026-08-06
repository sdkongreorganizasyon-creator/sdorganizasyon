import { z } from "zod";

/**
 * Yönetim panelindeki içerik alanları zorunlu değildir.
 * Boş değerler kaydı, taslak önizlemeyi veya yayınlamayı durdurmaz.
 */
const text = () => z.string().trim().catch("").default("");
const bool = (fallback = false) =>
  z.boolean().catch(fallback).default(fallback);
const number = (fallback = 0) =>
  z.coerce.number().catch(fallback).default(fallback);

export const homeValueSchema = z.object({
  number: text(),
  title: text(),
  description: text(),
  icon: text(),
  image: text(),
  active: bool(true),
});

export const navigationChildSchema = z.object({
  id: text(),
  label: text(),
  href: text(),
  visible: bool(true),
});

export const navigationItemSchema = z.object({
  id: text(),
  label: text(),
  href: text(),
  visible: bool(true),
  showInHeader: bool(true),
  showInFooter: bool(true),
  children: z.array(navigationChildSchema).catch([]).default([]),
});

export const pageHeroSchema = z.object({
  id: text(),
  path: text(),
  eyebrow: text(),
  title: text(),
  description: text(),
  image: text(),
  video: text(),
  animation: z
    .enum(["fade", "slide", "scale", "none"])
    .catch("fade")
    .default("fade"),
  template: z
    .enum(["standard", "split", "editorial", "minimal"])
    .catch("standard")
    .default("standard"),
  headingFont: z
    .enum(["system", "serif", "geometric", "humanist"])
    .catch("system")
    .default("system"),
  bodyFont: z
    .enum(["system", "serif", "geometric", "humanist"])
    .catch("system")
    .default("system"),
  background: text(),
  textColor: text(),
  accentColor: text(),
  headingScale: number(1),
  bodyScale: number(1),
  heroSpacing: number(72),
});

export const siteSettingsSchema = z.object({
  general: z.object({
    siteName: text(),
    legalName: text(),
    slogan: text(),
    shortDescription: text(),
    establishmentYear: text(),
    headquarters: text(),
  }),
  contact: z.object({
    phone: text(),
    mobile: text(),
    email: text(),
    quoteEmail: text(),
    whatsapp: text(),
    address: text(),
    district: text(),
    city: text(),
    postalCode: text(),
    workingDays: text(),
    workingHours: text(),
    mapUrl: text(),
  }),
  social: z.object({
    instagram: text(),
    linkedin: text(),
    youtube: text(),
    x: text(),
    facebook: text(),
  }),
  header: z.object({
    quoteButtonLabel: text(),
    quoteButtonUrl: text(),
    menuButtonLabel: text(),
  }),
  hero: z.object({
    eyebrow: text(),
    titleLine1: text(),
    titleLine2: text(),
    titleHighlight: text(),
    description: text(),
    primaryButtonLabel: text(),
    primaryButtonUrl: text(),
    secondaryButtonLabel: text(),
    secondaryButtonUrl: text(),
    poster: text(),
    desktopVideo: text(),
    mobileVideo: text(),
  }),
  homeValues: z.array(homeValueSchema).catch([]).default([]),
  footer: z.object({
    description: text(),
    copyrightText: text(),
    showQuickMenu: bool(true),
    showLegalLinks: bool(true),
    showContact: bool(true),
    showSocialLinks: bool(true),
  }),
  seo: z.object({
    defaultTitle: text(),
    defaultDescription: text(),
    ogImage: text(),
    canonicalBaseUrl: text(),
    indexable: bool(false),
  }),
  branding: z.object({
    headerLogoUrl: text(),
    footerLogoUrl: text(),
    compactLogoUrl: text(),
    faviconUrl: text(),
  }),
  theme: z.object({
    background: text(),
    surface: text(),
    surfaceAlt: text(),
    accent: text(),
    text: text(),
    muted: text(),
    border: text(),
    headingFont: z
      .enum(["system", "serif", "geometric", "humanist"])
      .catch("system")
      .default("system"),
    bodyFont: z
      .enum(["system", "serif", "geometric", "humanist"])
      .catch("system")
      .default("system"),
    radius: z
      .enum(["compact", "soft", "rounded"])
      .catch("soft")
      .default("soft"),
    container: z
      .enum(["narrow", "standard", "wide"])
      .catch("standard")
      .default("standard"),
    headingScale: number(1),
    bodyScale: number(1),
    sectionSpacing: number(72),
    cardPadding: number(18),
    cardGap: number(16),
    contentGap: number(32),
    heroSpacing: number(72),
  }),
  motion: z.object({
    enabled: bool(true),
    preset: z
      .enum(["fade", "slide", "scale", "none"])
      .catch("fade")
      .default("fade"),
    duration: number(500),
  }),
  navigation: z.array(navigationItemSchema).catch([]).default([]),
  pageHeroes: z.array(pageHeroSchema).catch([]).default([]),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

import { z } from "zod";

const optionalText = z.string().trim().default("");
const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) =>
      !value ||
      value.startsWith("/") ||
      /^https?:\/\//i.test(value),
    "Geçerli bir https:// adresi veya / ile başlayan proje yolu girin.",
  )
  .default("");
const optionalEmail = z
  .string()
  .trim()
  .refine(
    (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Geçerli bir e-posta adresi girin.",
  )
  .default("");
const color = z
  .string()
  .trim()
  .regex(/^#[0-9a-f]{6}$/i, "Renk #RRGGBB biçiminde olmalıdır.");

export const homeValueSchema = z.object({
  number: optionalText,
  title: optionalText,
  description: optionalText,
  icon: optionalText,
  image: optionalUrl,
  active: z.boolean().default(true),
});

export const navigationChildSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1, "Menü etiketi gereklidir."),
  href: optionalUrl,
  visible: z.boolean().default(true),
});

export const navigationItemSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1, "Menü etiketi gereklidir."),
  href: optionalUrl,
  visible: z.boolean().default(true),
  showInHeader: z.boolean().default(true),
  showInFooter: z.boolean().default(true),
  children: z.array(navigationChildSchema).default([]),
});


export const pageHeroSchema = z.object({
  id: z.string().trim().min(1),
  path: optionalUrl,
  eyebrow: optionalText,
  title: optionalText,
  description: optionalText,
  image: optionalUrl,
  video: optionalUrl,
  animation: z.enum(["fade", "slide", "scale", "none"]).default("fade"),
});

export const siteSettingsSchema = z.object({
  general: z.object({
    siteName: optionalText,
    legalName: optionalText,
    slogan: optionalText,
    shortDescription: optionalText,
    establishmentYear: optionalText,
    headquarters: optionalText,
  }),
  contact: z.object({
    phone: optionalText,
    mobile: optionalText,
    email: optionalEmail,
    quoteEmail: optionalEmail,
    whatsapp: optionalText,
    address: optionalText,
    district: optionalText,
    city: optionalText,
    postalCode: optionalText,
    workingDays: optionalText,
    workingHours: optionalText,
    mapUrl: optionalUrl,
  }),
  social: z.object({
    instagram: optionalUrl,
    linkedin: optionalUrl,
    youtube: optionalUrl,
    x: optionalUrl,
    facebook: optionalUrl,
  }),
  header: z.object({
    quoteButtonLabel: optionalText,
    quoteButtonUrl: optionalUrl,
    menuButtonLabel: optionalText,
  }),
  hero: z.object({
    eyebrow: optionalText,
    titleLine1: optionalText,
    titleLine2: optionalText,
    titleHighlight: optionalText,
    description: optionalText,
    primaryButtonLabel: optionalText,
    primaryButtonUrl: optionalUrl,
    secondaryButtonLabel: optionalText,
    secondaryButtonUrl: optionalUrl,
    poster: optionalUrl,
    desktopVideo: optionalUrl,
    mobileVideo: optionalUrl,
  }),
  homeValues: z.array(homeValueSchema).length(5),
  footer: z.object({
    description: optionalText,
    copyrightText: optionalText,
    showQuickMenu: z.boolean().default(true),
    showLegalLinks: z.boolean().default(true),
    showContact: z.boolean().default(true),
    showSocialLinks: z.boolean().default(true),
  }),
  seo: z.object({
    defaultTitle: optionalText,
    defaultDescription: optionalText,
    ogImage: optionalUrl,
    canonicalBaseUrl: optionalUrl,
    indexable: z.boolean().default(false),
  }),
  branding: z.object({
    headerLogoUrl: optionalUrl,
    footerLogoUrl: optionalUrl,
    compactLogoUrl: optionalUrl,
    faviconUrl: optionalUrl,
  }),
  theme: z.object({
    background: color.default("#07111d"),
    surface: color.default("#0b1c2b"),
    surfaceAlt: color.default("#10263a"),
    accent: color.default("#f2b632"),
    text: color.default("#ffffff"),
    muted: color.default("#a8b3c0"),
    border: color.default("#314052"),
    headingFont: z
      .enum(["system", "serif", "geometric", "humanist"])
      .default("system"),
    bodyFont: z
      .enum(["system", "serif", "geometric", "humanist"])
      .default("system"),
    radius: z.enum(["compact", "soft", "rounded"]).default("soft"),
    container: z.enum(["narrow", "standard", "wide"]).default("standard"),
    headingScale: z.coerce.number().min(0.75).max(1.25).default(1),
    bodyScale: z.coerce.number().min(0.85).max(1.2).default(1),
  }),
  motion: z.object({
    enabled: z.boolean().default(true),
    preset: z.enum(["fade", "slide", "scale", "none"]).default("fade"),
    duration: z.coerce.number().int().min(100).max(1600).default(500),
  }),
  navigation: z.array(navigationItemSchema).max(30),
  pageHeroes: z.array(pageHeroSchema).max(50),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

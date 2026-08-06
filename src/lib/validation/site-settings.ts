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

export const homeValueSchema = z.object({
  number: optionalText,
  title: optionalText,
  description: optionalText,
  icon: optionalText,
  image: optionalUrl,
  active: z.boolean().default(true),
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
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

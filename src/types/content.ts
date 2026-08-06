export type ContentStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";

export type SeoData = Readonly<{
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}>;

export type FontPreset = "system" | "serif" | "geometric" | "humanist";

export type PageTemplate = "standard" | "split" | "editorial" | "cards";

export type PageDesign = Readonly<{
  template?: PageTemplate;
  headingFont?: FontPreset;
  bodyFont?: FontPreset;
  background?: string;
  textColor?: string;
  accentColor?: string;
  contentWidth?: "narrow" | "standard" | "wide";
  headingScale?: number;
  bodyScale?: number;
  sectionSpacing?: number;
  cardGap?: number;
  cardPadding?: number;
  heroSpacing?: number;
}>;

export type ValueItem = Readonly<{
  title: string;
  description: string;
  icon?: string;
}>;

export type CmsPageSection = Readonly<{
  id: string;
  type: "text" | "media-text" | "feature-grid" | "quote";
  eyebrow?: string;
  title?: string;
  body?: string;
  imageUrl?: string;
  videoUrl?: string;
  imageAlt?: string;
  background?: string;
  textColor?: string;
  animation?: "fade" | "slide" | "scale" | "none";
  align?: "left" | "center" | "right";
  paddingTop?: number;
  paddingBottom?: number;
  contentGap?: number;
  contentPadding?: number;
  mediaHeight?: number;
  template?: PageTemplate;
  headingFont?: FontPreset;
  bodyFont?: FontPreset;
  headingScale?: number;
  bodyScale?: number;
  active?: boolean;
}>;

export type CorporatePageContent = Readonly<{
  pageKey: string;
  title: string;
  eyebrow: string;
  headline: string;
  paragraphs: readonly string[];
  values?: readonly ValueItem[];
  sections?: readonly CmsPageSection[];
  heroImage?: string;
  heroVideo?: string;
  heroAnimation?: string;
  design?: PageDesign;
}>;

export type ServiceContent = Readonly<{
  category: "physical" | "digital";
  slug: string;
  title: string;
  icon: string;
  summary: string;
  paragraphs: readonly string[];
  features: readonly string[];
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  animation?: string;
  cardBackground?: string;
  textColor?: string;
  cardPadding?: number;
  mediaHeight?: number;
  contentGap?: number;
}>;

export type ProcessGroup = Readonly<{
  title: string;
  items: readonly string[];
}>;

export type ProcessStep = Readonly<{
  stepKey: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: readonly string[];
  groups?: readonly ProcessGroup[];
  closing: string;
  outputs: readonly string[];
}>;

export type LegalSection = Readonly<{
  title?: string | null;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  items?: readonly Readonly<{
    title: string;
    description: string;
  }>[];
}>;

export type LegalDocumentContent = Readonly<{
  documentKey: string;
  title: string;
  headline: string;
  sections: readonly LegalSection[];
}>;

export type HomeValue = Readonly<{
  number: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  active?: boolean;
}>;

export type ProjectRecord = Readonly<{
  id: string;
  slug: string;
  title: string;
  clientName?: string | null;
  eventType?: string | null;
  city?: string | null;
  venue?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  summary: string;
  challenge?: string | null;
  solution?: string | null;
  result?: Record<string, unknown> | null;
  coverUrl?: string | null;
  media?: readonly Readonly<{
    id: string;
    url: string;
    altText?: string | null;
    caption?: string | null;
    mediaType: "image" | "video";
  }>[];
}>;

export type ReferenceRecord = Readonly<{
  id: string;
  name: string;
  website?: string | null;
  category?: string | null;
  story?: string | null;
  logoUrl?: string | null;
}>;

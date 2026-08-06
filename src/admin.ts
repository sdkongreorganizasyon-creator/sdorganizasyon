import { z } from "zod";

const contentStatusSchema = z
  .enum(["draft", "review", "scheduled", "published", "archived"])
  .catch("draft")
  .default("draft");

const optionalText = z.string().trim().catch("").default("");

export const genericContentSchema = z.object({
  id: z.string().uuid(),
  entity: z.enum([
    "pages",
    "services",
    "process_steps",
    "legal_documents",
  ]),
  title: optionalText,
  eyebrow: optionalText,
  summary: optionalText,
  body: optionalText,
  features: optionalText,
  outputs: optionalText,
  subtitle: optionalText,
  status: contentStatusSchema,
  scheduledAt: optionalText,
  seoTitle: optionalText,
  seoDescription: optionalText,
  version: optionalText,
  effectiveDate: optionalText,
});

export const projectAdminSchema = z.object({
  id: z.string().uuid().optional(),
  title: optionalText,
  slug: optionalText,
  clientName: optionalText,
  eventType: optionalText,
  city: optionalText,
  venue: optionalText,
  startDate: optionalText,
  endDate: optionalText,
  summary: optionalText,
  challenge: optionalText,
  solution: optionalText,
  result: optionalText,
  status: contentStatusSchema,
  scheduledAt: optionalText,
  coverMediaId: optionalText,
  galleryMediaIds: optionalText,
  featured: z.boolean().catch(false).default(false),
});

export const referenceAdminSchema = z.object({
  id: z.string().uuid().optional(),
  name: optionalText,
  website: optionalText,
  category: optionalText,
  story: optionalText,
  logoMediaId: optionalText,
  visible: z.boolean().catch(false).default(false),
});

export type GenericContentInput = z.infer<typeof genericContentSchema>;
export type ProjectAdminInput = z.infer<typeof projectAdminSchema>;
export type ReferenceAdminInput = z.infer<typeof referenceAdminSchema>;

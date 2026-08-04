import { z } from "zod";

const contentStatusSchema = z.enum([
  "draft",
  "review",
  "scheduled",
  "published",
  "archived",
]);

function requireSchedule(
  value: { status: string; scheduledAt?: string },
  context: z.RefinementCtx,
) {
  if (
    value.status === "scheduled" &&
    (!value.scheduledAt || Number.isNaN(Date.parse(value.scheduledAt)))
  ) {
    context.addIssue({
      code: "custom",
      path: ["scheduledAt"],
      message: "Planlı yayın için geçerli tarih ve saat gereklidir.",
    });
  }
}

export const genericContentSchema = z
  .object({
    id: z.string().uuid(),
    entity: z.enum([
      "pages",
      "services",
      "process_steps",
      "legal_documents",
    ]),
    title: z.string().trim().min(2).max(200),
    eyebrow: z.string().trim().max(100).optional().or(z.literal("")),
    summary: z.string().trim().max(1000).optional().or(z.literal("")),
    body: z.string().trim().min(2),
    features: z.string().optional().or(z.literal("")),
    outputs: z.string().optional().or(z.literal("")),
    subtitle: z.string().trim().max(300).optional().or(z.literal("")),
    status: contentStatusSchema,
    scheduledAt: z.string().optional().or(z.literal("")),
    seoTitle: z.string().trim().max(70).optional().or(z.literal("")),
    seoDescription: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal("")),
    version: z.string().trim().max(40).optional().or(z.literal("")),
    effectiveDate: z.string().optional().or(z.literal("")),
  })
  .superRefine(requireSchedule);

export const projectAdminSchema = z
  .object({
    id: z.string().uuid().optional(),
    title: z.string().trim().min(2).max(200),
    slug: z
      .string()
      .trim()
      .min(2)
      .max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    clientName: z.string().trim().max(200).optional().or(z.literal("")),
    eventType: z.string().trim().max(150).optional().or(z.literal("")),
    city: z.string().trim().max(120).optional().or(z.literal("")),
    venue: z.string().trim().max(200).optional().or(z.literal("")),
    startDate: z.string().optional().or(z.literal("")),
    endDate: z.string().optional().or(z.literal("")),
    summary: z.string().trim().min(10).max(2000),
    challenge: z.string().trim().max(5000).optional().or(z.literal("")),
    solution: z.string().trim().max(5000).optional().or(z.literal("")),
    result: z.string().trim().max(5000).optional().or(z.literal("")),
    status: contentStatusSchema,
    scheduledAt: z.string().optional().or(z.literal("")),
    coverMediaId: z.string().uuid().optional().or(z.literal("")),
    galleryMediaIds: z.string().max(20_000).optional().or(z.literal("")),
    featured: z.boolean().optional(),
  })
  .superRefine(requireSchedule);

export const referenceAdminSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(200),
  website: z.string().trim().url().optional().or(z.literal("")),
  category: z.string().trim().max(120).optional().or(z.literal("")),
  story: z.string().trim().max(5000).optional().or(z.literal("")),
  logoMediaId: z.string().uuid().optional().or(z.literal("")),
  visible: z.boolean().optional(),
});

export type GenericContentInput = z.infer<typeof genericContentSchema>;
export type ProjectAdminInput = z.infer<typeof projectAdminSchema>;
export type ReferenceAdminInput = z.infer<typeof referenceAdminSchema>;

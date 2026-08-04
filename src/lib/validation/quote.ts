import { z } from "zod";

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2, "Firma veya kurum adı gereklidir.").max(150),
  email: z.string().email("Geçerli bir e-posta adresi girin.").max(200),
  phone: z.string().trim().min(7, "Telefon numarası gereklidir.").max(40),
  eventType: z.string().trim().min(2, "Organizasyon türünü seçin.").max(150),
  eventDate: z.string().optional().or(z.literal("")),
  eventEndDate: z.string().optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  venue: z.string().trim().max(200).optional().or(z.literal("")),
  attendeeCount: z
    .string()
    .trim()
    .regex(/^\d+$/, "Katılımcı sayısı yalnız rakam olmalıdır.")
    .refine((value) => Number(value) > 0 && Number(value) <= 1_000_000, {
      message: "Katılımcı sayısı 1 ile 1.000.000 arasında olmalıdır.",
    })
    .optional()
    .or(z.literal("")),
  services: z.array(z.string().max(200)).max(30),
  notes: z.string().trim().max(5000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((value) => value, {
      message: "KVKK Aydınlatma Metni'ni kabul etmelisiniz.",
    }),
  marketingConsent: z.boolean().optional(),
  source: z.string().trim().max(200).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

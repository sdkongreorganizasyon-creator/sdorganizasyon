import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalıdır.")
    .max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().email("Geçerli bir e-posta adresi girin.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(2, "Konu seçin veya yazın.")
    .max(150),
  message: z
    .string()
    .trim()
    .min(20, "Mesaj en az 20 karakter olmalıdır.")
    .max(4000),
  consent: z
    .boolean()
    .refine((value) => value, {
      message: "KVKK Aydınlatma Metni'ni kabul etmelisiniz.",
    }),
  marketingConsent: z.boolean().optional(),
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

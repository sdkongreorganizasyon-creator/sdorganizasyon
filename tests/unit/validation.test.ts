import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/validation/contact";
import { quoteSchema } from "@/lib/validation/quote";

describe("public form validation", () => {
  it("rejects contact requests without consent", () => {
    const result = contactSchema.safeParse({
      fullName: "Test Kullanıcı",
      company: "",
      email: "test@example.com",
      phone: "",
      subject: "Genel Bilgi",
      message: "Bu, yirmi karakterden uzun örnek bir mesajdır.",
      consent: false,
      marketingConsent: false,
      website: "",
      turnstileToken: "",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a valid quote request", () => {
    const result = quoteSchema.safeParse({
      fullName: "Test Kullanıcı",
      company: "Test Kurumu",
      email: "test@example.com",
      phone: "+90 555 000 00 00",
      eventType: "Kongre",
      eventDate: "",
      eventEndDate: "",
      city: "Ankara",
      venue: "",
      attendeeCount: "300",
      services: ["Kongre Organizasyonları"],
      notes: "",
      consent: true,
      marketingConsent: false,
      source: "Test",
      website: "",
      turnstileToken: "",
    });

    expect(result.success).toBe(true);
  });
});

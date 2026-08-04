import { NextResponse, type NextRequest } from "next/server";

import { quoteEmailTemplate } from "@/lib/email/templates";
import { sendNotificationEmail } from "@/lib/email/send";
import { getRequestIp, hashIp } from "@/lib/security/ip";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { quoteSchema } from "@/lib/validation/quote";

export const runtime = "nodejs";

const CONSENT_VERSION = "1.0";

export async function POST(request: NextRequest) {
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Teklif sistemi henüz yapılandırılmadı. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 503 },
    );
  }

  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Geçersiz istek." },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Form alanlarını kontrol edin.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const input = parsed.data;

  if (input.website) {
    return NextResponse.json({ success: true, message: "Talebiniz alındı." });
  }

  const ip = getRequestIp(request);
  const ipHash = hashIp(ip);
  const supabase = createAdminClient();

  try {
    const limit = await checkRateLimit(supabase, {
      formType: "quote",
      ipHash,
      maxAttempts: 4,
      windowMinutes: 15,
    });

    await supabase.from("form_events").insert({
      form_type: "quote",
      event_type: "attempt",
      ip_hash: ipHash,
      metadata_json: {
        userAgent: request.headers.get("user-agent"),
      },
    });

    if (!limit.allowed) {
      await supabase.from("form_events").insert({
        form_type: "quote",
        event_type: "rate_limited",
        ip_hash: ipHash,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Çok sayıda gönderim denemesi yapıldı. Lütfen daha sonra tekrar deneyin.",
        },
        { status: 429 },
      );
    }

    const turnstile = await verifyTurnstile(input.turnstileToken, ip);

    if (!turnstile.success) {
      await supabase.from("form_events").insert({
        form_type: "quote",
        event_type: "turnstile_failed",
        ip_hash: ipHash,
        error_code: turnstile.error,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Güvenlik doğrulaması tamamlanamadı.",
        },
        { status: 400 },
      );
    }

    const { data: quote, error: insertError } = await supabase
      .from("quote_requests")
      .insert({
        full_name: input.fullName,
        company: input.company,
        email: input.email,
        phone: input.phone,
        event_type: input.eventType,
        event_date: input.eventDate || null,
        event_end_date: input.eventEndDate || null,
        city: input.city || null,
        venue: input.venue || null,
        attendee_count: input.attendeeCount ? Number(input.attendeeCount) : null,
        services_json: input.services,
        notes: input.notes || null,
        consent_at: new Date().toISOString(),
        consent_version: CONSENT_VERSION,
        marketing_consent: input.marketingConsent ?? false,
        source: input.source || "Teklif Sayfası",
        status: "new",
      })
      .select("id")
      .single();

    if (insertError || !quote) {
      await supabase.from("form_events").insert({
        form_type: "quote",
        event_type: "database_failed",
        ip_hash: ipHash,
        error_code: insertError.code,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Teklif talebiniz kaydedilemedi. Lütfen daha sonra tekrar deneyin.",
        },
        { status: 500 },
      );
    }

    const email = await sendNotificationEmail({
      subject: `Yeni Teklif Talebi: ${input.company}`,
      html: quoteEmailTemplate(input),
      replyTo: input.email,
    });

    await supabase.from("form_events").insert({
      form_type: "quote",
      request_id: quote.id,
      event_type: email.sent
        ? "email_sent"
        : email.skipped
          ? "email_skipped"
          : "email_failed",
      provider_message_id: email.id,
      error_code: email.error,
      ip_hash: ipHash,
    });

    return NextResponse.json({
      success: true,
      message:
        "Teklif talebiniz başarıyla alındı. Ekibimiz sizinle iletişime geçecektir.",
    });
  } catch (error) {
    console.error("Quote form error", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Beklenmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 500 },
    );
  }
}

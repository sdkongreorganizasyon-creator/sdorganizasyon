import { NextResponse } from "next/server";

import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "sdkongre-web",
      timestamp: new Date().toISOString(),
      integrations: {
        supabasePublic: isSupabaseConfigured(),
        supabaseAdmin: isSupabaseAdminConfigured(),
        email: Boolean(
          process.env.RESEND_API_KEY &&
            process.env.EMAIL_FROM &&
            process.env.CONTACT_TO_EMAIL,
        ),
        turnstile: Boolean(process.env.TURNSTILE_SECRET_KEY),
      },
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}

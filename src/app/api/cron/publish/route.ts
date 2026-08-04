import { NextResponse, type NextRequest } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { success: false, message: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  const [
    pages,
    services,
    projects,
    legalDocuments,
    processSteps,
  ] = await Promise.all([
    supabase
      .from("pages")
      .update({
        status: "published",
        published_at: now,
        scheduled_at: null,
      })
      .eq("status", "scheduled")
      .lte("scheduled_at", now)
      .select("id"),
    supabase
      .from("services")
      .update({
        status: "published",
        published_at: now,
        scheduled_at: null,
      })
      .eq("status", "scheduled")
      .lte("scheduled_at", now)
      .select("id"),
    supabase
      .from("projects")
      .update({
        status: "published",
        published_at: now,
        scheduled_at: null,
      })
      .eq("status", "scheduled")
      .lte("scheduled_at", now)
      .select("id"),
    supabase
      .from("legal_documents")
      .update({
        status: "published",
        published_at: now,
        scheduled_at: null,
      })
      .eq("status", "scheduled")
      .lte("scheduled_at", now)
      .select("id"),
    supabase
      .from("process_steps")
      .update({
        status: "published",
        scheduled_at: null,
      })
      .eq("status", "scheduled")
      .lte("scheduled_at", now)
      .select("id"),
  ]);

  const operations = {
    pages,
    services,
    projects,
    legal_documents: legalDocuments,
    process_steps: processSteps,
  };

  for (const [name, operation] of Object.entries(operations)) {
    if (operation.error) {
      return NextResponse.json(
        {
          success: false,
          message: `${name} publishing failed: ${operation.error.message}`,
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({
    success: true,
    publishedAt: now,
    results: {
      pages: pages.data?.length ?? 0,
      services: services.data?.length ?? 0,
      projects: projects.data?.length ?? 0,
      legal_documents: legalDocuments.data?.length ?? 0,
      process_steps: processSteps.data?.length ?? 0,
    },
  });
}

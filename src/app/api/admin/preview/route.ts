import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminContext } from "@/lib/auth/require-admin";

function safePath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function GET(request: Request) {
  const context = await getAdminContext();

  if (!context.user || !context.profile?.active) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const url = new URL(request.url);
  const path = safePath(url.searchParams.get("path"));
  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(path, request.url));
}

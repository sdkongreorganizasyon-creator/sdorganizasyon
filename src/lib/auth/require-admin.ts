import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

const adminRoles: readonly UserRole[] = [
  "super_admin",
  "admin",
  "editor",
  "content_author",
  "sales_ops",
  "viewer",
];

export async function getAdminContext() {
  if (!isSupabaseConfigured()) {
    return {
      configured: false as const,
      user: null,
      profile: null,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      configured: true as const,
      user: null,
      profile: null,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role, active")
    .eq("id", user.id)
    .maybeSingle();

  return {
    configured: true as const,
    user,
    profile,
  };
}

export async function requireAdmin() {
  const context = await getAdminContext();

  if (!context.configured) {
    return context;
  }

  if (!context.user) {
    redirect("/admin/login");
  }

  if (
    !context.profile ||
    !context.profile.active ||
    !adminRoles.includes(context.profile.role)
  ) {
    redirect("/admin/login?error=yetkisiz");
  }

  return context;
}

export function canPublish(role: UserRole | undefined) {
  return role === "super_admin" || role === "admin" || role === "editor";
}

export function canManageUsers(role: UserRole | undefined) {
  return role === "super_admin";
}

export function canViewLeads(role: UserRole | undefined) {
  return (
    role === "super_admin" ||
    role === "admin" ||
    role === "sales_ops" ||
    role === "viewer"
  );
}

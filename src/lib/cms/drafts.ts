import "server-only";

import { draftMode } from "next/headers";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

export type CmsDraftEntity =
  | "pages"
  | "services"
  | "process_steps"
  | "legal_documents"
  | "projects"
  | "references";

export function cmsDraftKey(entity: CmsDraftEntity, id: string) {
  return `draft:${entity}:${id}`;
}

export async function isCmsPreviewEnabled() {
  const { isEnabled } = await draftMode();
  return isEnabled;
}

export async function getCmsDraft<T extends Json = Json>(
  entity: CmsDraftEntity,
  id: string,
): Promise<T | null> {
  if (!isSupabaseConfigured()) return null;

  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value_json")
    .eq("key", cmsDraftKey(entity, id))
    .eq("locale", "tr")
    .maybeSingle();

  if (error) {
    console.error("[cms-preview] Taslak okunamadı", {
      entity,
      id,
      code: error.code,
      message: error.message,
    });
    return null;
  }

  return (data?.value_json as T | undefined) ?? null;
}

import "server-only";

import { createClient } from "@/lib/supabase/server";

export type AdminMediaOption = Readonly<{
  id: string;
  label: string;
  url: string;
  mimeType: string | null;
}>;

export async function getAdminMediaOptions(
  limit = 300,
): Promise<AdminMediaOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media_assets")
    .select("id,bucket,path,file_name,mime_type")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[admin-media] Medya seçenekleri yüklenemedi", {
      code: error.code,
      message: error.message,
    });
    return [];
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    label: item.file_name || item.path,
    url: supabase.storage.from(item.bucket).getPublicUrl(item.path).data
      .publicUrl,
    mimeType: item.mime_type || null,
  }));
}

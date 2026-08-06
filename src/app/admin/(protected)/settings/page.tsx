import { SettingsForm } from "@/components/admin/settings-form";
import {
  fallbackSiteSettings,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const [{ data, error }, { data: media }] = await Promise.all([
    supabase
      .from("site_settings")
      .select("value_json")
      .eq("key", "global")
      .eq("locale", "tr")
      .maybeSingle(),
    supabase
      .from("media_assets")
      .select("id,bucket,path,file_name,mime_type")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  const settings = error
    ? fallbackSiteSettings
    : await getResolvedSiteSettings();

  const mediaOptions = [
    {
      label: "Orijinal SDKONGRE Logo",
      value: "/brand/sdkongre-logo-web.png",
      type: "image/png",
    },
    {
      label: "SDKONGRE 8K Logo",
      value: "/brand/sdkongre-logo-8k.png",
      type: "image/png",
    },
    {
      label: "Onaylı Ana Sayfa Hero",
      value: "/media/home/sdkongre-approved-hero.webp",
      type: "image/webp",
    },
    ...(media ?? []).map((item) => ({
      label: item.file_name || item.path,
      value: supabase.storage
        .from(item.bucket)
        .getPublicUrl(item.path).data.publicUrl,
      type: item.mime_type || "application/octet-stream",
    })),
  ];

  return (
    <SettingsForm
      settings={settings}
      loadError={error?.message ?? null}
      mediaOptions={mediaOptions}
      integrations={{
        supabasePublic: isSupabaseConfigured(),
        supabaseAdmin: isSupabaseAdminConfigured(),
        email: Boolean(
          process.env.RESEND_API_KEY?.trim() &&
            process.env.CONTACT_TO_EMAIL?.trim(),
        ),
        turnstile: Boolean(
          process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() &&
            process.env.TURNSTILE_SECRET_KEY?.trim(),
        ),
      }}
    />
  );
}

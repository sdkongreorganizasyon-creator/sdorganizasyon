import { SettingsForm } from "@/components/admin/settings-form";
import {
  fallbackSiteSettings,
  getResolvedSiteSettings,
  resolveSiteSettingsValue,
} from "@/lib/content/settings";
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { getAdminMediaOptions } from "@/lib/cms/media-options";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const [{ data: published, error }, { data: draft }, availableMedia] =
    await Promise.all([
      supabase
        .from("site_settings")
        .select("value_json")
        .eq("key", "global")
        .eq("locale", "tr")
        .maybeSingle(),
      supabase
        .from("site_settings")
        .select("value_json")
        .eq("key", "global_draft")
        .eq("locale", "tr")
        .maybeSingle(),
      getAdminMediaOptions(200),
    ]);

  const settings = draft?.value_json
    ? resolveSiteSettingsValue(draft.value_json)
    : published?.value_json
      ? resolveSiteSettingsValue(published.value_json)
      : error
        ? fallbackSiteSettings
        : await getResolvedSiteSettings();

  const mediaOptions = availableMedia.map((item) => ({
    label: item.label,
    value: item.url,
    type: item.mimeType || "application/octet-stream",
  }));

  return (
    <SettingsForm
      settings={settings}
      hasDraft={Boolean(draft?.value_json)}
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

import { SettingsForm } from "@/components/admin/settings-form";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value_json")
    .eq("key", "global")
    .eq("locale", "tr")
    .maybeSingle();

  const settings =
    data?.value_json &&
    typeof data.value_json === "object" &&
    !Array.isArray(data.value_json)
      ? (data.value_json as Record<string, unknown>)
      : null;

  return <SettingsForm settings={settings} />;
}

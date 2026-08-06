import { notFound } from "next/navigation";

import { ReferenceForm } from "@/components/admin/reference-form";
import { cmsDraftKey } from "@/lib/cms/drafts";
import { getAdminMediaOptions } from "@/lib/cms/media-options";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

function asObject(value: Json | null | undefined): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export default async function EditReferencePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data }, { data: draftRow }, mediaOptions] = await Promise.all([
    supabase
      .from("references")
      .select("id,name,website,category,story,logo_media_id,visible")
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("site_settings")
      .select("value_json")
      .eq("key", cmsDraftKey("references", id))
      .eq("locale", "tr")
      .maybeSingle(),
    getAdminMediaOptions(),
  ]);

  if (!data) notFound();

  const draft = asObject(draftRow?.value_json);
  const effective = { ...data, ...draft };

  return (
    <ReferenceForm
      mediaOptions={mediaOptions}
      hasDraft={Boolean(draftRow?.value_json)}
      reference={{
        id: data.id,
        name:
          typeof effective.name === "string" ? effective.name : data.name,
        website:
          typeof effective.website === "string" ? effective.website : null,
        category:
          typeof effective.category === "string" ? effective.category : null,
        story: typeof effective.story === "string" ? effective.story : null,
        logoMediaId:
          typeof effective.logo_media_id === "string"
            ? effective.logo_media_id
            : null,
        visible: Boolean(effective.visible),
      }}
    />
  );
}

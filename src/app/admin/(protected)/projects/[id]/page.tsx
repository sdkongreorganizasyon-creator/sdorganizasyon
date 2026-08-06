import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { cmsDraftKey } from "@/lib/cms/drafts";
import { getAdminMediaOptions } from "@/lib/cms/media-options";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus, Json } from "@/types/database";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

function asObject(value: Json | null | undefined): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data }, { data: draftRow }, mediaOptions] = await Promise.all([
    supabase
      .from("projects")
      .select(
        "id,title,slug,client_name,event_type,city,venue,start_date,end_date,summary,challenge,solution,result_json,status,scheduled_at,featured,cover_media_id",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("site_settings")
      .select("value_json")
      .eq("key", cmsDraftKey("projects", id))
      .eq("locale", "tr")
      .maybeSingle(),
    getAdminMediaOptions(),
  ]);

  if (!data) notFound();

  const draft = asObject(draftRow?.value_json);
  const effective = { ...data, ...draft };

  const { data: liveGallery } = await supabase
    .from("project_media")
    .select("media_id,media_type,caption,order_no")
    .eq("project_id", data.id)
    .order("order_no");

  const draftGallery = Array.isArray(draft.gallery_media)
    ? draft.gallery_media
    : null;

  const gallery = draftGallery ?? liveGallery ?? [];
  const galleryMediaIds = gallery
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return "";
      const row = item as Record<string, unknown>;
      return [
        typeof row.media_id === "string" ? row.media_id : "",
        row.media_type === "video" ? "video" : "image",
        typeof row.caption === "string" ? row.caption : "",
      ].join("|");
    })
    .filter(Boolean)
    .join("\n");

  const resultJson = asObject(effective.result_json as Json | undefined);
  const result =
    typeof resultJson.narrative === "string" ? resultJson.narrative : "";

  return (
    <ProjectForm
      mediaOptions={mediaOptions}
      hasDraft={Boolean(draftRow?.value_json)}
      project={{
        id: data.id,
        title:
          typeof effective.title === "string" ? effective.title : data.title,
        slug: typeof effective.slug === "string" ? effective.slug : data.slug,
        clientName:
          typeof effective.client_name === "string"
            ? effective.client_name
            : null,
        eventType:
          typeof effective.event_type === "string"
            ? effective.event_type
            : null,
        city: typeof effective.city === "string" ? effective.city : null,
        venue: typeof effective.venue === "string" ? effective.venue : null,
        startDate:
          typeof effective.start_date === "string"
            ? effective.start_date
            : null,
        endDate:
          typeof effective.end_date === "string" ? effective.end_date : null,
        summary:
          typeof effective.summary === "string"
            ? effective.summary
            : data.summary,
        challenge:
          typeof effective.challenge === "string"
            ? effective.challenge
            : null,
        solution:
          typeof effective.solution === "string" ? effective.solution : null,
        result,
        status:
          typeof effective.status === "string"
            ? (effective.status as ContentStatus)
            : (data.status as ContentStatus),
        scheduledAt:
          typeof effective.scheduled_at === "string"
            ? effective.scheduled_at
            : null,
        coverMediaId:
          typeof effective.cover_media_id === "string"
            ? effective.cover_media_id
            : null,
        galleryMediaIds,
        featured: Boolean(effective.featured),
      }}
    />
  );
}

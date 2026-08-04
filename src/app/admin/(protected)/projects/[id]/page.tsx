import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select(
      "id,title,slug,client_name,event_type,city,venue,start_date,end_date,summary,challenge,solution,result_json,status,scheduled_at,featured,cover_media_id",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const { data: gallery } = await supabase
    .from("project_media")
    .select("media_id,media_type,caption,order_no")
    .eq("project_id", data.id)
    .order("order_no");

  const galleryMediaIds = (gallery ?? [])
    .map((item) =>
      [item.media_id, item.media_type, item.caption ?? ""].join("|"),
    )
    .join("\n");

  const result =
    data.result_json &&
    typeof data.result_json === "object" &&
    !Array.isArray(data.result_json) &&
    typeof data.result_json.narrative === "string"
      ? data.result_json.narrative
      : "";

  return (
    <ProjectForm
      project={{
        id: data.id,
        title: data.title,
        slug: data.slug,
        clientName: data.client_name,
        eventType: data.event_type,
        city: data.city,
        venue: data.venue,
        startDate: data.start_date,
        endDate: data.end_date,
        summary: data.summary,
        challenge: data.challenge,
        solution: data.solution,
        result,
        status: data.status as ContentStatus,
        scheduledAt: data.scheduled_at,
        coverMediaId: data.cover_media_id,
        galleryMediaIds,
        featured: data.featured,
      }}
    />
  );
}

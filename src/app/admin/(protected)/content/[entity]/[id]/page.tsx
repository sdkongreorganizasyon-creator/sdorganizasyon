import { notFound } from "next/navigation";

import { EntityForm } from "@/components/admin/entity-form";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus, Json } from "@/types/database";

type Entity =
  | "pages"
  | "services"
  | "process_steps"
  | "legal_documents";

type PageProps = Readonly<{
  params: Promise<{ entity: string; id: string }>;
}>;

const allowedEntities: readonly Entity[] = [
  "pages",
  "services",
  "process_steps",
  "legal_documents",
];

export default async function AdminContentEditorPage({
  params,
}: PageProps) {
  const { entity: rawEntity, id } = await params;

  if (!allowedEntities.includes(rawEntity as Entity)) {
    notFound();
  }

  const entity = rawEntity as Entity;
  const supabase = await createClient();

  const { data: mediaRows } = await supabase
    .from("media_assets")
    .select("bucket,path,file_name,mime_type")
    .order("created_at", { ascending: false })
    .limit(200);

  const mediaOptions = (mediaRows ?? []).map((item) => ({
    label: item.file_name || item.path,
    value: supabase.storage
      .from(item.bucket)
      .getPublicUrl(item.path).data.publicUrl,
    type: item.mime_type || "application/octet-stream",
  }));

  if (entity === "pages") {
    const { data } = await supabase
      .from("pages")
      .select(
        "id,title,eyebrow,summary,content_json,status,scheduled_at,seo_json",
      )
      .eq("id", id)
      .maybeSingle();

    if (!data) notFound();

    return (
      <EntityForm
        entity="pages"
        mediaOptions={mediaOptions}
        record={{
          id: data.id,
          title: data.title,
          eyebrow: data.eyebrow,
          summary: data.summary,
          contentJson: data.content_json as Json,
          status: data.status as ContentStatus,
          scheduledAt: data.scheduled_at,
          seoJson: data.seo_json as Json,
        }}
      />
    );
  }

  if (entity === "services") {
    const { data } = await supabase
      .from("services")
      .select(
        "id,title,slug,icon,order_no,summary,body_json,status,scheduled_at,seo_json",
      )
      .eq("id", id)
      .maybeSingle();

    if (!data) notFound();

    return (
      <EntityForm
        entity="services"
        mediaOptions={mediaOptions}
        record={{
          id: data.id,
          title: data.title,
          slug: data.slug,
          icon: data.icon,
          orderNo: data.order_no,
          summary: data.summary,
          contentJson: data.body_json as Json,
          status: data.status as ContentStatus,
          scheduledAt: data.scheduled_at,
          seoJson: data.seo_json as Json,
        }}
      />
    );
  }

  if (entity === "process_steps") {
    const { data } = await supabase
      .from("process_steps")
      .select(
        "id,title,subtitle,description,content_json,status,scheduled_at",
      )
      .eq("id", id)
      .maybeSingle();

    if (!data) notFound();

    return (
      <EntityForm
        entity="process_steps"
        mediaOptions={mediaOptions}
        record={{
          id: data.id,
          title: data.title,
          subtitle: data.subtitle,
          summary: data.description,
          contentJson: data.content_json as Json,
          status: data.status as ContentStatus,
          scheduledAt: data.scheduled_at,
          seoJson: {},
        }}
      />
    );
  }

  const { data } = await supabase
    .from("legal_documents")
    .select(
      "id,title,body_json,status,scheduled_at,seo_json,version,effective_date",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <EntityForm
      entity="legal_documents"
      mediaOptions={mediaOptions}
      record={{
        id: data.id,
        title: data.title,
        contentJson: data.body_json as Json,
        status: data.status as ContentStatus,
        scheduledAt: data.scheduled_at,
        seoJson: data.seo_json as Json,
        version: data.version,
        effectiveDate: data.effective_date,
      }}
    />
  );
}

import { notFound } from "next/navigation";

import { EntityForm } from "@/components/admin/entity-form";
import { cmsDraftKey } from "@/lib/cms/drafts";
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

function objectValue(value: Json | null | undefined): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringOr<T extends string | null>(
  value: unknown,
  fallback: T,
): string | T {
  return typeof value === "string" ? value : fallback;
}

function previewPathForPage(pageKey: string, slug: string) {
  if (pageKey === "why-us") return "/neden-biz";
  if (
    ["about", "story", "mission", "vision", "values"].includes(pageKey) ||
    ["hakkimizda", "hikayemiz", "misyon", "vizyon", "degerlerimiz"].includes(slug)
  ) {
    return `/kurumsal#${slug}`;
  }
  return slug.startsWith("/") ? slug : `/${slug}`;
}

export default async function AdminContentEditorPage({
  params,
}: PageProps) {
  const { entity: rawEntity, id } = await params;

  if (!allowedEntities.includes(rawEntity as Entity)) {
    notFound();
  }

  const entity = rawEntity as Entity;
  const supabase = await createClient();

  const [{ data: mediaRows }, { data: draftRow }] = await Promise.all([
    supabase
      .from("media_assets")
      .select("bucket,path,file_name,mime_type")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("site_settings")
      .select("value_json")
      .eq("key", cmsDraftKey(entity, id))
      .eq("locale", "tr")
      .maybeSingle(),
  ]);

  const draft = objectValue(draftRow?.value_json as Json | undefined);
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
        "id,page_key,slug,title,eyebrow,summary,content_json,status,scheduled_at,seo_json",
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
          title: stringOr(draft.title, data.title) as string,
          eyebrow: stringOr(draft.eyebrow, data.eyebrow) as string | null,
          summary: stringOr(draft.summary, data.summary) as string | null,
          contentJson: (draft.content_json as Json | undefined) ?? (data.content_json as Json),
          status: (stringOr(draft.status, data.status) as ContentStatus),
          scheduledAt: stringOr(draft.scheduled_at, data.scheduled_at) as string | null,
          seoJson: (draft.seo_json as Json | undefined) ?? (data.seo_json as Json),
          previewPath: previewPathForPage(data.page_key, data.slug),
        }}
      />
    );
  }

  if (entity === "services") {
    const { data } = await supabase
      .from("services")
      .select(
        "id,category,title,slug,icon,order_no,summary,body_json,status,scheduled_at,seo_json",
      )
      .eq("id", id)
      .maybeSingle();

    if (!data) notFound();

    const slug = stringOr(draft.slug, data.slug) as string;
    return (
      <EntityForm
        entity="services"
        mediaOptions={mediaOptions}
        record={{
          id: data.id,
          title: stringOr(draft.title, data.title) as string,
          slug,
          icon: stringOr(draft.icon, data.icon) as string | null,
          orderNo:
            typeof draft.order_no === "number" ? draft.order_no : data.order_no,
          summary: stringOr(draft.summary, data.summary) as string | null,
          contentJson: (draft.body_json as Json | undefined) ?? (data.body_json as Json),
          status: stringOr(draft.status, data.status) as ContentStatus,
          scheduledAt: stringOr(draft.scheduled_at, data.scheduled_at) as string | null,
          seoJson: (draft.seo_json as Json | undefined) ?? (data.seo_json as Json),
          previewPath:
            data.category === "digital"
              ? `/dijital-hizmetler#${slug}`
              : `/hizmetlerimiz#${slug}`,
        }}
      />
    );
  }

  if (entity === "process_steps") {
    const { data } = await supabase
      .from("process_steps")
      .select(
        "id,step_key,title,subtitle,description,content_json,status,scheduled_at",
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
          title: stringOr(draft.title, data.title) as string,
          subtitle: stringOr(draft.subtitle, data.subtitle) as string | null,
          summary: stringOr(draft.description, data.description) as string | null,
          contentJson:
            (draft.content_json as Json | undefined) ?? (data.content_json as Json),
          status: stringOr(draft.status, data.status) as ContentStatus,
          scheduledAt: stringOr(draft.scheduled_at, data.scheduled_at) as string | null,
          seoJson: {},
          previewPath: `/organizasyon-sureci#${data.step_key}`,
        }}
      />
    );
  }

  const { data } = await supabase
    .from("legal_documents")
    .select(
      "id,slug,title,body_json,status,scheduled_at,seo_json,version,effective_date",
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
        title: stringOr(draft.title, data.title) as string,
        contentJson: (draft.body_json as Json | undefined) ?? (data.body_json as Json),
        status: stringOr(draft.status, data.status) as ContentStatus,
        scheduledAt: stringOr(draft.scheduled_at, data.scheduled_at) as string | null,
        seoJson: (draft.seo_json as Json | undefined) ?? (data.seo_json as Json),
        version: stringOr(draft.version, data.version) as string | null,
        effectiveDate: stringOr(draft.effective_date, data.effective_date) as string | null,
        previewPath: `/kvkk/${data.slug}`,
      }}
    />
  );
}

import {
  corporatePages,
  digitalServices,
  legalDocuments,
  physicalServices,
  processSteps,
  whyUsContent,
} from "@/content/site-content";
import {
  digitalServiceImages,
  physicalServiceImages,
} from "@/config/media";
import { getCmsDraft, isCmsPreviewEnabled } from "@/lib/cms/drafts";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type {
  CorporatePageContent,
  LegalDocumentContent,
  ProcessStep,
  ProjectRecord,
  ReferenceRecord,
  ServiceContent,
} from "@/types/content";
import type { Json } from "@/types/database";

type PageRow = {
  id: string;
  page_key: string;
  slug: string;
  status: string;
  title: string;
  eyebrow: string | null;
  summary: string | null;
  content_json: Json;
};

type ServiceRow = {
  id: string;
  status: string;
  category: "physical" | "digital";
  title: string;
  slug: string;
  summary: string | null;
  body_json: Json;
  icon: string | null;
  order_no: number;
};

type ProcessRow = {
  id: string;
  status: string;
  step_key: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  content_json: Json;
  order_no: number;
};

type LegalRow = {
  id: string;
  status: string;
  document_key: string;
  title: string;
  body_json: Json;
};

type ProjectRow = {
  id: string;
  status: string;
  slug: string;
  title: string;
  client_name: string | null;
  event_type: string | null;
  city: string | null;
  venue: string | null;
  start_date: string | null;
  end_date: string | null;
  summary: string;
  challenge: string | null;
  solution: string | null;
  result_json: Json;
  cover_media_id: string | null;
};

type ProjectMediaRow = {
  id: string;
  media_id: string;
  media_type: "image" | "video";
  caption: string | null;
  order_no: number;
};

type MediaAssetRow = {
  id: string;
  bucket: string;
  path: string;
  alt_text?: string | null;
};

type ReferenceRow = {
  id: string;
  visible: boolean;
  name: string;
  website: string | null;
  category: string | null;
  story: string | null;
  logo_media_id: string | null;
  order_no: number;
};

function asRecord(value: Json | null | undefined): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export async function getCorporatePage(
  slug: string,
): Promise<CorporatePageContent | null> {
  const fallback =
    corporatePages[slug as keyof typeof corporatePages] ?? null;

  if (!isSupabaseConfigured()) return fallback;

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();
  let query = supabase
    .from("pages")
    .select("id,page_key,slug,status,title,eyebrow,summary,content_json")
    .eq("slug", slug)
    .eq("locale", "tr");

  if (!preview) query = query.eq("status", "published");

  const { data } = await query.maybeSingle();
  const row = data as PageRow | null;
  if (!row) return fallback;

  const draft = preview ? await getCmsDraft("pages", row.id) : null;
  const effective = draft && typeof draft === "object" && !Array.isArray(draft)
    ? ({ ...row, ...draft } as PageRow)
    : row;
  const content = asRecord(effective.content_json);
  const fallbackValues =
    fallback && "values" in fallback ? fallback.values : undefined;

  return {
    pageKey: effective.page_key,
    title: effective.title,
    eyebrow: effective.eyebrow ?? "KURUMSAL",
    headline:
      typeof content.headline === "string"
        ? content.headline
        : effective.summary ?? effective.title,
    paragraphs: stringArray(content.paragraphs),
    values: Array.isArray(content.values)
      ? (content.values as CorporatePageContent["values"])
      : fallbackValues,
    sections: Array.isArray(content.sections)
      ? (content.sections as CorporatePageContent["sections"])
      : [],
    heroImage:
      typeof content.heroImage === "string" ? content.heroImage : undefined,
    heroVideo:
      typeof content.heroVideo === "string" ? content.heroVideo : undefined,
    heroAnimation:
      typeof content.heroAnimation === "string"
        ? content.heroAnimation
        : undefined,
  };
}

export async function getWhyUsContent() {
  if (!isSupabaseConfigured()) return whyUsContent;

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();
  let query = supabase
    .from("pages")
    .select("id,page_key,slug,status,title,eyebrow,summary,content_json")
    .eq("page_key", "why-us")
    .eq("locale", "tr");

  if (!preview) query = query.eq("status", "published");

  const { data } = await query.maybeSingle();
  const row = data as PageRow | null;
  if (!row) return whyUsContent;

  const draft = preview ? await getCmsDraft("pages", row.id) : null;
  const effective = draft && typeof draft === "object" && !Array.isArray(draft)
    ? ({ ...row, ...draft } as PageRow)
    : row;
  const content = asRecord(effective.content_json);

  return {
    pageKey: effective.page_key,
    title: effective.title,
    eyebrow: effective.eyebrow ?? "NEDEN BİZ",
    headline:
      typeof content.headline === "string"
        ? content.headline
        : effective.summary ?? effective.title,
    paragraphs: stringArray(content.paragraphs),
    items: Array.isArray(content.items)
      ? (content.items as unknown as typeof whyUsContent.items)
      : whyUsContent.items,
    sections: Array.isArray(content.sections) ? content.sections : [],
    heroImage:
      typeof content.heroImage === "string" ? content.heroImage : undefined,
    heroVideo:
      typeof content.heroVideo === "string" ? content.heroVideo : undefined,
    heroAnimation:
      typeof content.heroAnimation === "string"
        ? content.heroAnimation
        : undefined,
  };
}

export async function getServices(
  category: "physical" | "digital",
): Promise<readonly ServiceContent[]> {
  const fallback =
    category === "physical" ? physicalServices : digitalServices;

  if (!isSupabaseConfigured()) {
    const imageMap =
      category === "physical"
        ? physicalServiceImages
        : digitalServiceImages;

    return fallback.map((item) => ({
      ...item,
      imageUrl: imageMap[item.slug],
      imageAlt: `${item.title} hizmetini temsil eden etkinlik görseli`,
    }));
  }

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();
  let query = supabase
    .from("services")
    .select("id,status,category,title,slug,summary,body_json,icon,order_no")
    .eq("category", category)
    .eq("locale", "tr");

  if (!preview) query = query.eq("status", "published");

  const { data } = await query.order("order_no");
  let rows = (data ?? []) as ServiceRow[];

  if (preview) {
    rows = await Promise.all(
      rows.map(async (row) => {
        const draft = await getCmsDraft("services", row.id);
        return draft && typeof draft === "object" && !Array.isArray(draft)
          ? ({ ...row, ...draft } as ServiceRow)
          : row;
      }),
    );
    rows = rows.filter((row) => row.status !== "archived");
  }

  if (!rows.length) {
    const imageMap =
      category === "physical"
        ? physicalServiceImages
        : digitalServiceImages;

    return fallback.map((item) => ({
      ...item,
      imageUrl: imageMap[item.slug],
      imageAlt: `${item.title} hizmetini temsil eden etkinlik görseli`,
    }));
  }

  return rows.map((item) => {
    const body = asRecord(item.body_json);
    const imageMap =
      item.category === "physical"
        ? physicalServiceImages
        : digitalServiceImages;

    return {
      category: item.category,
      slug: item.slug,
      title: item.title,
      icon: item.icon ?? "sparkles",
      summary: item.summary ?? "",
      paragraphs: stringArray(body.paragraphs),
      features: stringArray(body.features),
      imageUrl:
        typeof body.imageUrl === "string" && body.imageUrl.trim()
          ? body.imageUrl.trim()
          : imageMap[item.slug],
      imageAlt:
        typeof body.imageAlt === "string" && body.imageAlt.trim()
          ? body.imageAlt.trim()
          : `${item.title} hizmetini temsil eden etkinlik görseli`,
      videoUrl:
        typeof body.videoUrl === "string" && body.videoUrl.trim()
          ? body.videoUrl.trim()
          : undefined,
      animation:
        typeof body.animation === "string" ? body.animation : "fade",
      cardBackground:
        typeof body.cardBackground === "string"
          ? body.cardBackground
          : undefined,
      textColor:
        typeof body.textColor === "string" ? body.textColor : undefined,
      cardPadding:
        typeof body.cardPadding === "number" ? body.cardPadding : undefined,
      mediaHeight:
        typeof body.mediaHeight === "number" ? body.mediaHeight : undefined,
      contentGap:
        typeof body.contentGap === "number" ? body.contentGap : undefined,
    };
  });
}

export async function getService(
  category: "physical" | "digital",
  slug: string,
): Promise<ServiceContent | null> {
  const list = await getServices(category);
  return list.find((item) => item.slug === slug) ?? null;
}

export async function getProcessSteps(): Promise<readonly ProcessStep[]> {
  if (!isSupabaseConfigured()) return processSteps;

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();
  let query = supabase
    .from("process_steps")
    .select(
      "id,status,step_key,title,subtitle,description,content_json,order_no",
    )
    .eq("locale", "tr");

  if (!preview) query = query.eq("status", "published");

  const { data } = await query.order("order_no");
  let rows = (data ?? []) as ProcessRow[];

  if (preview) {
    rows = await Promise.all(
      rows.map(async (row) => {
        const draft = await getCmsDraft("process_steps", row.id);
        return draft && typeof draft === "object" && !Array.isArray(draft)
          ? ({ ...row, ...draft } as ProcessRow)
          : row;
      }),
    );
    rows = rows.filter((row) => row.status !== "archived");
  }

  if (!rows.length) return processSteps;

  return rows.map((item, index) => {
    const content = asRecord(item.content_json);

    return {
      stepKey: item.step_key,
      number:
        typeof content.number === "string"
          ? content.number
          : String(index + 1).padStart(2, "0"),
      title: item.title,
      subtitle: item.subtitle ?? "",
      description: item.description ?? "",
      items: stringArray(content.items),
      groups: Array.isArray(content.groups)
        ? (content.groups as ProcessStep["groups"])
        : undefined,
      closing:
        typeof content.closing === "string" ? content.closing : "",
      outputs: stringArray(content.outputs),
    };
  });
}

export async function getLegalDocument(
  slug: string,
): Promise<LegalDocumentContent | null> {
  const fallback =
    legalDocuments[slug as keyof typeof legalDocuments] ?? null;

  if (!isSupabaseConfigured()) return fallback;

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();
  let query = supabase
    .from("legal_documents")
    .select("id,status,document_key,title,body_json")
    .eq("slug", slug)
    .eq("locale", "tr");

  if (!preview) query = query.eq("status", "published");

  const { data } = await query.maybeSingle();
  const row = data as LegalRow | null;
  if (!row) return fallback;

  const draft = preview ? await getCmsDraft("legal_documents", row.id) : null;
  const effective = draft && typeof draft === "object" && !Array.isArray(draft)
    ? ({ ...row, ...draft } as LegalRow)
    : row;
  const body = asRecord(effective.body_json);

  return {
    documentKey: effective.document_key,
    title: effective.title,
    headline:
      typeof body.headline === "string" ? body.headline : effective.title,
    sections: Array.isArray(body.sections)
      ? (body.sections as LegalDocumentContent["sections"])
      : fallback?.sections ?? [],
  };
}

export async function getProjects(): Promise<ProjectRecord[]> {
  if (!isSupabaseConfigured()) return [];

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();
  let query = supabase
    .from("projects")
    .select(
      "id,status,slug,title,client_name,event_type,city,venue,start_date,end_date,summary,challenge,solution,result_json,cover_media_id",
    )
    .eq("locale", "tr");

  if (!preview) query = query.eq("status", "published");

  const { data } = await query.order("start_date", { ascending: false });
  let rows = (data ?? []) as ProjectRow[];

  if (preview) {
    rows = await Promise.all(
      rows.map(async (row) => {
        const draft = await getCmsDraft("projects", row.id);
        return draft && typeof draft === "object" && !Array.isArray(draft)
          ? ({ ...row, ...draft } as ProjectRow)
          : row;
      }),
    );
    rows = rows.filter((row) => row.status !== "archived");
  }

  if (!rows.length) return [];

  const coverIds = rows
    .map((item) => item.cover_media_id)
    .filter((id): id is string => Boolean(id));

  const mediaMap = new Map<string, string>();

  if (coverIds.length) {
    const { data: media } = await supabase
      .from("media_assets")
      .select("id,bucket,path")
      .in("id", coverIds);

    for (const item of (media ?? []) as MediaAssetRow[]) {
      const { data: urlData } = supabase.storage
        .from(item.bucket)
        .getPublicUrl(item.path);
      mediaMap.set(item.id, urlData.publicUrl);
    }
  }

  return rows.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    clientName: item.client_name,
    eventType: item.event_type,
    city: item.city,
    venue: item.venue,
    startDate: item.start_date,
    endDate: item.end_date,
    summary: item.summary,
    challenge: item.challenge,
    solution: item.solution,
    result: asRecord(item.result_json),
    coverUrl: item.cover_media_id
      ? mediaMap.get(item.cover_media_id) ?? null
      : null,
  }));
}

export async function getProject(
  slug: string,
): Promise<ProjectRecord | null> {
  if (!isSupabaseConfigured()) return null;

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();

  let project: ProjectRow | null = null;
  let draftGallery: ProjectMediaRow[] | null = null;

  if (preview) {
    const { data } = await supabase
      .from("projects")
      .select(
        "id,status,slug,title,client_name,event_type,city,venue,start_date,end_date,summary,challenge,solution,result_json,cover_media_id",
      )
      .eq("locale", "tr");

    const effectiveRows = await Promise.all(
      ((data ?? []) as ProjectRow[]).map(async (row) => {
        const draft = await getCmsDraft("projects", row.id);
        if (!draft || typeof draft !== "object" || Array.isArray(draft)) {
          return { row, gallery: null };
        }

        const record = draft as Record<string, Json | undefined>;
        const gallery = Array.isArray(record.gallery_media)
          ? record.gallery_media.flatMap((item, index) => {
              if (!item || typeof item !== "object" || Array.isArray(item)) {
                return [];
              }
              const media = item as Record<string, Json | undefined>;
              const mediaId =
                typeof media.media_id === "string" ? media.media_id : "";
              if (!mediaId) return [];

              return [
                {
                  id: `draft-${index}-${mediaId}`,
                  media_id: mediaId,
                  media_type:
                    media.media_type === "video" ? "video" : "image",
                  caption:
                    typeof media.caption === "string" ? media.caption : null,
                  order_no:
                    typeof media.order_no === "number"
                      ? media.order_no
                      : index + 1,
                } satisfies ProjectMediaRow,
              ];
            })
          : null;

        return {
          row: { ...row, ...record } as ProjectRow,
          gallery,
        };
      }),
    );

    const match = effectiveRows.find(
      (item) => item.row.slug === slug && item.row.status !== "archived",
    );
    project = match?.row ?? null;
    draftGallery = match?.gallery ?? null;
  } else {
    const { data } = await supabase
      .from("projects")
      .select(
        "id,status,slug,title,client_name,event_type,city,venue,start_date,end_date,summary,challenge,solution,result_json,cover_media_id",
      )
      .eq("slug", slug)
      .eq("locale", "tr")
      .eq("status", "published")
      .maybeSingle();

    project = data as ProjectRow | null;
  }

  if (!project) return null;

  let projectMedia: ProjectMediaRow[];

  if (draftGallery) {
    projectMedia = draftGallery;
  } else {
    const { data: projectMediaData } = await supabase
      .from("project_media")
      .select("id,media_id,media_type,caption,order_no")
      .eq("project_id", project.id)
      .order("order_no");

    projectMedia = (projectMediaData ?? []) as ProjectMediaRow[];
  }

  const mediaIds = [
    ...(project.cover_media_id ? [project.cover_media_id] : []),
    ...projectMedia.map((item) => item.media_id),
  ];

  let mediaAssets: MediaAssetRow[] = [];

  if (mediaIds.length) {
    const { data: mediaAssetData } = await supabase
      .from("media_assets")
      .select("id,bucket,path,alt_text")
      .in("id", mediaIds);

    mediaAssets = (mediaAssetData ?? []) as MediaAssetRow[];
  }

  const assetMap = new Map<string, MediaAssetRow>(
    mediaAssets.map((asset) => [asset.id, asset]),
  );

  const media = projectMedia.flatMap((item) => {
    const asset = assetMap.get(item.media_id);
    if (!asset) return [];

    const { data: urlData } = supabase.storage
      .from(asset.bucket)
      .getPublicUrl(asset.path);

    return [
      {
        id: item.id,
        url: urlData.publicUrl,
        altText: asset.alt_text ?? null,
        caption: item.caption,
        mediaType: item.media_type,
      },
    ];
  });

  let coverUrl: string | null = null;
  if (project.cover_media_id) {
    const cover = assetMap.get(project.cover_media_id);
    if (cover) {
      coverUrl = supabase.storage
        .from(cover.bucket)
        .getPublicUrl(cover.path).data.publicUrl;
    }
  }

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    clientName: project.client_name,
    eventType: project.event_type,
    city: project.city,
    venue: project.venue,
    startDate: project.start_date,
    endDate: project.end_date,
    summary: project.summary,
    challenge: project.challenge,
    solution: project.solution,
    result: asRecord(project.result_json),
    coverUrl,
    media,
  };
}

export async function getReferences(): Promise<ReferenceRecord[]> {
  if (!isSupabaseConfigured()) return [];

  const preview = await isCmsPreviewEnabled();
  const supabase = preview ? await createClient() : createPublicClient();
  let query = supabase
    .from("references")
    .select(
      "id,visible,name,website,category,story,logo_media_id,order_no",
    )
    .eq("locale", "tr");

  if (!preview) query = query.eq("visible", true);

  const { data } = await query.order("order_no");
  let rows = (data ?? []) as ReferenceRow[];

  if (preview) {
    rows = await Promise.all(
      rows.map(async (row) => {
        const draft = await getCmsDraft("references", row.id);
        return draft && typeof draft === "object" && !Array.isArray(draft)
          ? ({ ...row, ...draft } as ReferenceRow)
          : row;
      }),
    );
    rows = rows.filter((row) => row.visible);
  }

  if (!rows.length) return [];

  const logoIds = rows
    .map((item) => item.logo_media_id)
    .filter((id): id is string => Boolean(id));

  const logoMap = new Map<string, string>();

  if (logoIds.length) {
    const { data: media } = await supabase
      .from("media_assets")
      .select("id,bucket,path")
      .in("id", logoIds);

    for (const item of (media ?? []) as MediaAssetRow[]) {
      logoMap.set(
        item.id,
        supabase.storage.from(item.bucket).getPublicUrl(item.path).data
          .publicUrl,
      );
    }
  }

  return rows.map((item) => ({
    id: item.id,
    name: item.name,
    website: item.website,
    category: item.category,
    story: item.story,
    logoUrl: item.logo_media_id
      ? logoMap.get(item.logo_media_id) ?? null
      : null,
  }));
}

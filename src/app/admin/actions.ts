"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

import {
  canManageUsers,
  canPublish,
  requireAdmin,
} from "@/lib/auth/require-admin";
import { cmsDraftKey } from "@/lib/cms/drafts";
import { SITE_SETTINGS_TAG } from "@/lib/content/settings";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import {
  genericContentSchema,
  projectAdminSchema,
  referenceAdminSchema,
} from "@/lib/validation/admin";
import { siteSettingsSchema } from "@/lib/validation/site-settings";
import type { Json, UserRole } from "@/types/database";

export type ActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const initialFailure: ActionState = {
  success: false,
  message: "İşlem tamamlanamadı.",
};

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function booleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function scheduledLocalToIso(value: string) {
  if (!value) return null;
  const normalized = value.length === 16 ? `${value}:00` : value;
  const date = new Date(`${normalized}+03:00`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseJson(value: string, fallback: Json = {}) {
  if (!value.trim()) return fallback;

  try {
    return JSON.parse(value) as Json;
  } catch {
    throw new Error("İçerik JSON alanı geçerli JSON biçiminde değildir.");
  }
}

export async function loginAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message:
        "Supabase henüz yapılandırılmadı. Kurulum dokümanındaki environment değerlerini ekleyin.",
    };
  }

  const email = stringValue(formData, "email");
  const password = stringValue(formData, "password");

  if (!email || !password) {
    return {
      success: false,
      message: "E-posta ve şifre gereklidir.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return {
      success: false,
      message: "E-posta veya şifre hatalı.",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,active")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile?.active) {
    await supabase.auth.signOut();
    return {
      success: false,
      message: "Bu kullanıcı için aktif yönetim paneli yetkisi bulunmuyor.",
    };
  }

  await supabase
    .from("profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", data.user.id);

  redirect("/admin");
}

export async function logoutAction() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

export async function saveGenericContentAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const context = await requireAdmin();
  const role = context.profile?.role;
  const intent = stringValue(formData, "intent") || "draft";
  const previewPath = stringValue(formData, "previewPath") || "/";

  const raw = {
    id: stringValue(formData, "id"),
    entity: stringValue(formData, "entity"),
    title: stringValue(formData, "title"),
    eyebrow: stringValue(formData, "eyebrow"),
    summary: stringValue(formData, "summary"),
    body: stringValue(formData, "body"),
    features: stringValue(formData, "features"),
    outputs: stringValue(formData, "outputs"),
    subtitle: stringValue(formData, "subtitle"),
    status: stringValue(formData, "status"),
    scheduledAt: stringValue(formData, "scheduledAt"),
    seoTitle: stringValue(formData, "seoTitle"),
    seoDescription: stringValue(formData, "seoDescription"),
    version: stringValue(formData, "version"),
    effectiveDate: stringValue(formData, "effectiveDate"),
  };

  const parsed = genericContentSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ...initialFailure,
      message: "Alanları kontrol edin.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (intent === "publish" && !canPublish(role)) {
    return {
      success: false,
      message: "Bu rolün yayınlama yetkisi bulunmuyor.",
    };
  }

  let contentJson: Json;

  try {
    contentJson = parseJson(parsed.data.body, {});
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "JSON içeriği geçersiz.",
    };
  }

  if (parsed.data.entity === "services") {
    const paragraphs = stringValue(formData, "serviceParagraphs")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    const features = stringValue(formData, "serviceFeatures")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    contentJson = {
      paragraphs,
      features,
      imageUrl: stringValue(formData, "serviceImageUrl"),
      imageAlt: stringValue(formData, "serviceImageAlt"),
      videoUrl: stringValue(formData, "serviceVideoUrl"),
      animation: stringValue(formData, "serviceAnimation") || "fade",
      cardBackground: stringValue(formData, "serviceCardBackground"),
      textColor: stringValue(formData, "serviceTextColor"),
    };
  }

  const supabase = await createClient();
  const seoJson = {
    title: parsed.data.seoTitle || null,
    description: parsed.data.seoDescription || null,
  };
  const publishedAt =
    intent === "publish" ? new Date().toISOString() : null;
  const scheduledAt =
    parsed.data.status === "scheduled"
      ? scheduledLocalToIso(parsed.data.scheduledAt ?? "")
      : null;

  const serviceSlug = stringValue(formData, "serviceSlug");
  const serviceIcon = stringValue(formData, "serviceIcon");
  const rawOrderNo = Number(stringValue(formData, "serviceOrderNo"));

  if (
    parsed.data.entity === "services" &&
    serviceSlug &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(serviceSlug)
  ) {
    return {
      success: false,
      message: "Anchor slug yalnız küçük harf, rakam ve tire içerebilir.",
    };
  }

  const payloadByEntity: Record<string, Json> = {
    pages: {
      title: parsed.data.title,
      eyebrow: parsed.data.eyebrow || null,
      summary: parsed.data.summary || null,
      content_json: contentJson,
      status: parsed.data.status,
      seo_json: seoJson,
      scheduled_at: scheduledAt,
      published_at: publishedAt,
    },
    services: {
      title: parsed.data.title,
      slug: serviceSlug || null,
      icon: serviceIcon || null,
      order_no: Number.isFinite(rawOrderNo) ? rawOrderNo : 0,
      summary: parsed.data.summary || null,
      body_json: contentJson,
      status: parsed.data.status,
      seo_json: seoJson,
      scheduled_at: scheduledAt,
      published_at: publishedAt,
    },
    process_steps: {
      title: parsed.data.title,
      subtitle: parsed.data.subtitle || null,
      description: parsed.data.summary || null,
      content_json: contentJson,
      status: parsed.data.status,
      scheduled_at: scheduledAt,
    },
    legal_documents: {
      title: parsed.data.title,
      body_json: contentJson,
      version: parsed.data.version || "1.0",
      effective_date: parsed.data.effectiveDate || null,
      status: parsed.data.status,
      seo_json: seoJson,
      scheduled_at: scheduledAt,
      published_at: publishedAt,
    },
  };

  const payload = payloadByEntity[parsed.data.entity];
  if (!payload) {
    return {
      success: false,
      message: "Desteklenmeyen içerik türü.",
    };
  }

  const draftKey = cmsDraftKey(
    parsed.data.entity as
      | "pages"
      | "services"
      | "process_steps"
      | "legal_documents",
    parsed.data.id,
  );

  if (intent !== "publish") {
    const { error } = await supabase.from("site_settings").upsert(
      {
        key: draftKey,
        locale: "tr",
        value_json: payload,
        updated_by: context.user?.id ?? null,
      },
      { onConflict: "key,locale" },
    );

    if (error) {
      return {
        success: false,
        message: `Taslak kaydedilemedi: ${error.message}`,
      };
    }

    if (intent === "preview") {
      redirect(
        `/admin/preview?path=${encodeURIComponent(previewPath)}`,
      );
    }

    revalidatePath("/admin/content");
    return {
      success: true,
      message:
        "Taslak kaydedildi. Canlı site değiştirilmedi; önizleme ile kontrol edebilirsiniz.",
    };
  }

  let errorMessage: string | null = null;

  if (parsed.data.entity === "pages") {
    const { error } = await supabase
      .from("pages")
      .update(payload)
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (parsed.data.entity === "services") {
    const { error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (parsed.data.entity === "process_steps") {
    const { error } = await supabase
      .from("process_steps")
      .update(payload)
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (parsed.data.entity === "legal_documents") {
    const { error } = await supabase
      .from("legal_documents")
      .update(payload)
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (errorMessage) {
    return {
      success: false,
      message: `Kayıt yayımlanamadı: ${errorMessage}`,
    };
  }

  await supabase
    .from("site_settings")
    .delete()
    .eq("key", draftKey)
    .eq("locale", "tr");

  revalidatePath("/", "layout");
  revalidatePath(previewPath);
  revalidatePath("/admin/content");

  return {
    success: true,
    message: "İçerik yayımlandı ve canlı site güncellendi.",
  };
}

export async function saveProjectAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const context = await requireAdmin();
  const role = context.profile?.role;
  const intent = stringValue(formData, "intent") || "draft";

  const parsed = projectAdminSchema.safeParse({
    id: stringValue(formData, "id") || undefined,
    title: stringValue(formData, "title"),
    slug: stringValue(formData, "slug"),
    clientName: stringValue(formData, "clientName"),
    eventType: stringValue(formData, "eventType"),
    city: stringValue(formData, "city"),
    venue: stringValue(formData, "venue"),
    startDate: stringValue(formData, "startDate"),
    endDate: stringValue(formData, "endDate"),
    summary: stringValue(formData, "summary"),
    challenge: stringValue(formData, "challenge"),
    solution: stringValue(formData, "solution"),
    result: stringValue(formData, "result"),
    status: stringValue(formData, "status"),
    scheduledAt: stringValue(formData, "scheduledAt"),
    coverMediaId: stringValue(formData, "coverMediaId"),
    galleryMediaIds: stringValue(formData, "galleryMediaIds"),
    featured: booleanValue(formData, "featured"),
  });

  if (!parsed.success) {
    return {
      ...initialFailure,
      message: "Proje alanlarını kontrol edin.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (intent === "publish" && !canPublish(role)) {
    return {
      success: false,
      message: "Bu rolün yayınlama yetkisi bulunmuyor.",
    };
  }

  const galleryRows = (parsed.data.galleryMediaIds ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line, index) => {
      const [mediaId, rawType, ...captionParts] = line
        .split("|")
        .map((part) => part.trim());

      if (!mediaId || !/^[0-9a-f-]{36}$/i.test(mediaId)) return [];

      return [
        {
          media_id: mediaId,
          media_type: rawType === "video" ? "video" : "image",
          caption: captionParts.join("|") || null,
          order_no: index + 1,
        },
      ];
    });

  const status =
    intent === "publish" && parsed.data.status === "draft"
      ? "published"
      : parsed.data.status;

  const payload = {
    locale: "tr",
    title: parsed.data.title,
    slug: parsed.data.slug,
    client_name: parsed.data.clientName || null,
    event_type: parsed.data.eventType || null,
    city: parsed.data.city || null,
    venue: parsed.data.venue || null,
    start_date: parsed.data.startDate || null,
    end_date: parsed.data.endDate || null,
    summary: parsed.data.summary,
    challenge: parsed.data.challenge || null,
    solution: parsed.data.solution || null,
    result_json: parsed.data.result
      ? { narrative: parsed.data.result }
      : {},
    cover_media_id: parsed.data.coverMediaId || null,
    featured: parsed.data.featured,
    status,
    seo_json: {},
    scheduled_at:
      status === "scheduled"
        ? scheduledLocalToIso(parsed.data.scheduledAt ?? "")
        : null,
    published_at:
      status === "published" ? new Date().toISOString() : null,
  };

  const supabase = await createClient();
  let projectId = parsed.data.id;

  if (!projectId) {
    const basePayload =
      intent === "publish"
        ? payload
        : {
            ...payload,
            status: "draft" as const,
            published_at: null,
            scheduled_at: null,
          };

    const { data, error } = await supabase
      .from("projects")
      .insert(basePayload)
      .select("id")
      .single();

    if (error || !data) {
      return {
        success: false,
        message: `Proje oluşturulamadı: ${error?.message ?? "Kayıt oluşturulamadı."}`,
      };
    }

    projectId = data.id;
  }

  if (!projectId) {
    return {
      success: false,
      message: "Proje kimliği oluşturulamadı.",
    };
  }

  const draftKey = cmsDraftKey("projects", projectId);

  if (intent !== "publish") {
    const draftPayload: Json = {
      ...payload,
      gallery_media: galleryRows,
    };

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: draftKey,
        locale: "tr",
        value_json: draftPayload,
        updated_by: context.user?.id ?? null,
      },
      { onConflict: "key,locale" },
    );

    if (error) {
      return {
        success: false,
        message: `Proje taslağı kaydedilemedi: ${error.message}`,
      };
    }

    revalidatePath("/admin/projects");

    if (intent === "preview") {
      redirect(
        `/admin/preview?path=${encodeURIComponent(`/projeler/${parsed.data.slug}`)}`,
      );
    }

    if (!parsed.data.id) {
      redirect(`/admin/projects/${projectId}`);
    }

    return {
      success: true,
      message:
        "Proje taslağı kaydedildi. Canlı proje değiştirilmedi.",
    };
  }

  if (parsed.data.id) {
    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", projectId);

    if (error) {
      return {
        success: false,
        message: `Proje yayımlanamadı: ${error.message}`,
      };
    }
  }

  const { error: deleteMediaError } = await supabase
    .from("project_media")
    .delete()
    .eq("project_id", projectId);

  if (deleteMediaError) {
    return {
      success: false,
      message: `Proje yayımlandı ancak galeri güncellenemedi: ${deleteMediaError.message}`,
    };
  }

  if (galleryRows.length) {
    const { error: galleryError } = await supabase
      .from("project_media")
      .insert(
        galleryRows.map((row) => ({
          ...row,
          project_id: projectId,
        })),
      );

    if (galleryError) {
      return {
        success: false,
        message: `Proje yayımlandı ancak galeri eklenemedi: ${galleryError.message}`,
      };
    }
  }

  await supabase
    .from("site_settings")
    .delete()
    .eq("key", draftKey)
    .eq("locale", "tr");

  revalidatePath("/projeler");
  revalidatePath(`/projeler/${parsed.data.slug}`);
  revalidatePath("/admin/projects");

  if (!parsed.data.id) {
    redirect(`/admin/projects/${projectId}`);
  }

  return {
    success: true,
    message: "Proje yayımlandı ve canlı site güncellendi.",
  };
}

export async function deleteProjectAction(formData: FormData) {
  const context = await requireAdmin();
  if (!canPublish(context.profile?.role)) {
    return;
  }

  const id = stringValue(formData, "id");
  if (!id) return;

  const supabase = await createClient();
  await Promise.all([
    supabase.from("projects").delete().eq("id", id),
    supabase
      .from("site_settings")
      .delete()
      .eq("key", cmsDraftKey("projects", id))
      .eq("locale", "tr"),
  ]);
  revalidatePath("/admin/projects");
  revalidatePath("/projeler");
}

export async function saveReferenceAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const context = await requireAdmin();
  const intent = stringValue(formData, "intent") || "draft";

  const parsed = referenceAdminSchema.safeParse({
    id: stringValue(formData, "id") || undefined,
    name: stringValue(formData, "name"),
    website: stringValue(formData, "website"),
    category: stringValue(formData, "category"),
    story: stringValue(formData, "story"),
    logoMediaId: stringValue(formData, "logoMediaId"),
    visible: booleanValue(formData, "visible"),
  });

  if (!parsed.success) {
    return {
      ...initialFailure,
      message: "Referans alanlarını kontrol edin.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (intent === "publish" && !canPublish(context.profile?.role)) {
    return {
      success: false,
      message: "Bu rolün yayınlama yetkisi bulunmuyor.",
    };
  }

  const payload = {
    locale: "tr",
    name: parsed.data.name,
    website: parsed.data.website || null,
    category: parsed.data.category || null,
    story: parsed.data.story || null,
    logo_media_id: parsed.data.logoMediaId || null,
    visible: parsed.data.visible,
  };

  const supabase = await createClient();
  let referenceId = parsed.data.id;

  if (!referenceId) {
    const { data, error } = await supabase
      .from("references")
      .insert({
        ...payload,
        visible: intent === "publish" ? payload.visible : false,
      })
      .select("id")
      .single();

    if (error || !data) {
      return {
        success: false,
        message: `Referans oluşturulamadı: ${error?.message ?? "Kayıt oluşturulamadı."}`,
      };
    }

    referenceId = data.id;
  }

  if (!referenceId) {
    return {
      success: false,
      message: "Referans kimliği oluşturulamadı.",
    };
  }

  const draftKey = cmsDraftKey("references", referenceId);

  if (intent !== "publish") {
    const { error } = await supabase.from("site_settings").upsert(
      {
        key: draftKey,
        locale: "tr",
        value_json: payload as Json,
        updated_by: context.user?.id ?? null,
      },
      { onConflict: "key,locale" },
    );

    if (error) {
      return {
        success: false,
        message: `Referans taslağı kaydedilemedi: ${error.message}`,
      };
    }

    revalidatePath("/admin/references");

    if (intent === "preview") {
      redirect("/admin/preview?path=/referanslar");
    }

    if (!parsed.data.id) {
      redirect(`/admin/references/${referenceId}`);
    }

    return {
      success: true,
      message:
        "Referans taslağı kaydedildi. Canlı referanslar değiştirilmedi.",
    };
  }

  if (parsed.data.id) {
    const { error } = await supabase
      .from("references")
      .update(payload)
      .eq("id", referenceId);

    if (error) {
      return {
        success: false,
        message: `Referans yayımlanamadı: ${error.message}`,
      };
    }
  }

  await supabase
    .from("site_settings")
    .delete()
    .eq("key", draftKey)
    .eq("locale", "tr");

  revalidatePath("/referanslar");
  revalidatePath("/admin/references");

  if (!parsed.data.id) {
    redirect(`/admin/references/${referenceId}`);
  }

  return {
    success: true,
    message: "Referans yayımlandı ve canlı site güncellendi.",
  };
}

export async function deleteReferenceAction(formData: FormData) {
  const context = await requireAdmin();
  if (!canPublish(context.profile?.role)) return;

  const id = stringValue(formData, "id");
  if (!id) return;

  const supabase = await createClient();
  await Promise.all([
    supabase.from("references").delete().eq("id", id),
    supabase
      .from("site_settings")
      .delete()
      .eq("key", cmsDraftKey("references", id))
      .eq("locale", "tr"),
  ]);
  revalidatePath("/referanslar");
  revalidatePath("/admin/references");
}

export async function updateLeadStatusAction(formData: FormData) {
  const context = await requireAdmin();
  const role = context.profile?.role;

  if (
    !["super_admin", "admin", "sales_ops"].includes(role ?? "")
  ) {
    return;
  }

  const entity = stringValue(formData, "entity");
  const id = stringValue(formData, "id");
  const status = stringValue(formData, "status");
  const notes = stringValue(formData, "adminNotes");

  if (!id || !status) return;

  const supabase = await createClient();

  if (entity === "contact_messages") {
    await supabase
      .from("contact_messages")
      .update({ status, admin_notes: notes || null })
      .eq("id", id);
    revalidatePath("/admin/messages");
  }

  if (entity === "quote_requests") {
    await supabase
      .from("quote_requests")
      .update({ status, admin_notes: notes || null })
      .eq("id", id);
    revalidatePath("/admin/quotes");
  }
}

export async function saveSettingsAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const context = await requireAdmin();
  const intent = stringValue(formData, "intent") || "draft";

  if (!canPublish(context.profile?.role)) {
    return {
      success: false,
      message: "Bu rolün ayar değiştirme yetkisi bulunmuyor.",
    };
  }

  const homeValues = Array.from({ length: 5 }, (_, index) => ({
    number: stringValue(formData, `homeValue${index}Number`),
    title: stringValue(formData, `homeValue${index}Title`),
    description: stringValue(formData, `homeValue${index}Description`),
    icon: stringValue(formData, `homeValue${index}Icon`),
    image: stringValue(formData, `homeValue${index}Image`),
    active: booleanValue(formData, `homeValue${index}Active`),
  }));

  let navigation: Json = [];
  let pageHeroes: Json = [];

  try {
    navigation = parseJson(stringValue(formData, "navigationJson"), []);
    pageHeroes = parseJson(stringValue(formData, "pageHeroesJson"), []);
  } catch {
    return {
      success: false,
      message:
        "Menü veya sayfa başlıkları yapısı geçerli JSON biçiminde değildir.",
    };
  }

  const parsed = siteSettingsSchema.safeParse({
    general: {
      siteName: stringValue(formData, "siteName"),
      legalName: stringValue(formData, "legalName"),
      slogan: stringValue(formData, "slogan"),
      shortDescription: stringValue(formData, "shortDescription"),
      establishmentYear: stringValue(formData, "establishmentYear"),
      headquarters: stringValue(formData, "headquarters"),
    },
    contact: {
      phone: stringValue(formData, "phone"),
      mobile: stringValue(formData, "mobile"),
      email: stringValue(formData, "email"),
      quoteEmail: stringValue(formData, "quoteEmail"),
      whatsapp: stringValue(formData, "whatsapp"),
      address: stringValue(formData, "address"),
      district: stringValue(formData, "district"),
      city: stringValue(formData, "city"),
      postalCode: stringValue(formData, "postalCode"),
      workingDays: stringValue(formData, "workingDays"),
      workingHours: stringValue(formData, "workingHours"),
      mapUrl: stringValue(formData, "mapUrl"),
    },
    social: {
      instagram: stringValue(formData, "instagram"),
      linkedin: stringValue(formData, "linkedin"),
      youtube: stringValue(formData, "youtube"),
      x: stringValue(formData, "x"),
      facebook: stringValue(formData, "facebook"),
    },
    header: {
      quoteButtonLabel: stringValue(formData, "quoteButtonLabel"),
      quoteButtonUrl: stringValue(formData, "quoteButtonUrl"),
      menuButtonLabel: stringValue(formData, "menuButtonLabel"),
    },
    hero: {
      eyebrow: stringValue(formData, "heroEyebrow"),
      titleLine1: stringValue(formData, "heroTitleLine1"),
      titleLine2: stringValue(formData, "heroTitleLine2"),
      titleHighlight: stringValue(formData, "heroTitleHighlight"),
      description: stringValue(formData, "heroDescription"),
      primaryButtonLabel: stringValue(formData, "heroPrimaryButtonLabel"),
      primaryButtonUrl: stringValue(formData, "heroPrimaryButtonUrl"),
      secondaryButtonLabel: stringValue(formData, "heroSecondaryButtonLabel"),
      secondaryButtonUrl: stringValue(formData, "heroSecondaryButtonUrl"),
      poster: stringValue(formData, "heroPoster"),
      desktopVideo: stringValue(formData, "heroDesktopVideo"),
      mobileVideo: stringValue(formData, "heroMobileVideo"),
    },
    homeValues,
    footer: {
      description: stringValue(formData, "footerDescription"),
      copyrightText: stringValue(formData, "copyrightText"),
      showQuickMenu: booleanValue(formData, "showQuickMenu"),
      showLegalLinks: booleanValue(formData, "showLegalLinks"),
      showContact: booleanValue(formData, "showContact"),
      showSocialLinks: booleanValue(formData, "showSocialLinks"),
    },
    seo: {
      defaultTitle: stringValue(formData, "defaultTitle"),
      defaultDescription: stringValue(formData, "defaultDescription"),
      ogImage: stringValue(formData, "ogImage"),
      canonicalBaseUrl: stringValue(formData, "canonicalBaseUrl"),
      indexable: booleanValue(formData, "indexable"),
    },
    branding: {
      headerLogoUrl: stringValue(formData, "headerLogoUrl"),
      footerLogoUrl: stringValue(formData, "footerLogoUrl"),
      compactLogoUrl: stringValue(formData, "compactLogoUrl"),
      faviconUrl: stringValue(formData, "faviconUrl"),
    },
    theme: {
      background: stringValue(formData, "themeBackground"),
      surface: stringValue(formData, "themeSurface"),
      surfaceAlt: stringValue(formData, "themeSurfaceAlt"),
      accent: stringValue(formData, "themeAccent"),
      text: stringValue(formData, "themeText"),
      muted: stringValue(formData, "themeMuted"),
      border: stringValue(formData, "themeBorder"),
      headingFont: stringValue(formData, "themeHeadingFont"),
      bodyFont: stringValue(formData, "themeBodyFont"),
      radius: stringValue(formData, "themeRadius"),
      container: stringValue(formData, "themeContainer"),
      headingScale: stringValue(formData, "themeHeadingScale"),
      bodyScale: stringValue(formData, "themeBodyScale"),
    },
    motion: {
      enabled: booleanValue(formData, "motionEnabled"),
      preset: stringValue(formData, "motionPreset"),
      duration: stringValue(formData, "motionDuration"),
    },
    navigation,
    pageHeroes,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Ayar alanlarını kontrol edin.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[] | undefined
      >,
    };
  }

  const activeCount = parsed.data.homeValues.filter(
    (item) => item.active,
  ).length;

  if (activeCount !== 5) {
    return {
      success: false,
      message: "Ana sayfada tam olarak beş aktif kart bulunmalıdır.",
    };
  }

  const supabase = await createClient();
  const targetKey = intent === "publish" ? "global" : "global_draft";
  const { error } = await supabase.from("site_settings").upsert(
    {
      key: targetKey,
      locale: "tr",
      value_json: parsed.data as Json,
      updated_by: context.user?.id ?? null,
    },
    { onConflict: "key,locale" },
  );

  if (error) {
    return {
      success: false,
      message: `Ayarlar kaydedilemedi: ${error.message}`,
    };
  }

  if (intent === "preview") {
    redirect("/admin/preview?path=/");
  }

  if (intent === "publish") {
    await supabase
      .from("site_settings")
      .delete()
      .eq("key", "global_draft")
      .eq("locale", "tr");

    updateTag(SITE_SETTINGS_TAG);
    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    revalidatePath("/iletisim");
    revalidatePath("/hizmetlerimiz");
    revalidatePath("/dijital-hizmetler");

    return {
      success: true,
      message: "Ayarlar yayımlandı ve canlı site güncellendi.",
    };
  }

  revalidatePath("/admin/settings");
  return {
    success: true,
    message:
      "Taslak ayarlar kaydedildi. Canlı site değişmedi; önizleme ile kontrol edebilirsiniz.",
  };
}

export async function updateUserRoleAction(formData: FormData) {
  const context = await requireAdmin();

  if (!canManageUsers(context.profile?.role)) return;

  const id = stringValue(formData, "id");
  const role = stringValue(formData, "role") as UserRole;
  const active = booleanValue(formData, "active");

  const allowedRoles: UserRole[] = [
    "super_admin",
    "admin",
    "editor",
    "content_author",
    "sales_ops",
    "viewer",
  ];

  if (!id || !allowedRoles.includes(role)) return;

  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({ role, active })
    .eq("id", id);

  revalidatePath("/admin/users");
}

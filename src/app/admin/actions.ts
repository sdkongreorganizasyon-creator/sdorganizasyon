"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  canManageUsers,
  canPublish,
  getAdminContext,
  requireAdmin,
} from "@/lib/auth/require-admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import {
  genericContentSchema,
  projectAdminSchema,
  referenceAdminSchema,
} from "@/lib/validation/admin";
import type { ContentStatus, Json, UserRole } from "@/types/database";

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

  if (parsed.data.status === "published" && !canPublish(role)) {
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

  const supabase = await createClient();
  const seoJson = {
    title: parsed.data.seoTitle || null,
    description: parsed.data.seoDescription || null,
  };
  const publishedAt =
    parsed.data.status === "published" ? new Date().toISOString() : null;
  const scheduledAt =
    parsed.data.status === "scheduled"
      ? scheduledLocalToIso(parsed.data.scheduledAt ?? "")
      : null;

  let errorMessage: string | null = null;

  if (parsed.data.entity === "pages") {
    const { error } = await supabase
      .from("pages")
      .update({
        title: parsed.data.title,
        eyebrow: parsed.data.eyebrow || null,
        summary: parsed.data.summary || null,
        content_json: contentJson,
        status: parsed.data.status,
        seo_json: seoJson,
        scheduled_at: scheduledAt,
        published_at: publishedAt,
      })
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (parsed.data.entity === "services") {
    const { error } = await supabase
      .from("services")
      .update({
        title: parsed.data.title,
        summary: parsed.data.summary || null,
        body_json: contentJson,
        status: parsed.data.status,
        seo_json: seoJson,
        scheduled_at: scheduledAt,
        published_at: publishedAt,
      })
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (parsed.data.entity === "process_steps") {
    const { error } = await supabase
      .from("process_steps")
      .update({
        title: parsed.data.title,
        subtitle: parsed.data.subtitle || null,
        description: parsed.data.summary || null,
        content_json: contentJson,
        status: parsed.data.status,
        scheduled_at: scheduledAt,
      })
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (parsed.data.entity === "legal_documents") {
    const { error } = await supabase
      .from("legal_documents")
      .update({
        title: parsed.data.title,
        body_json: contentJson,
        version: parsed.data.version || "1.0",
        effective_date: parsed.data.effectiveDate || null,
        status: parsed.data.status,
        seo_json: seoJson,
        scheduled_at: scheduledAt,
        published_at: publishedAt,
      })
      .eq("id", parsed.data.id);
    errorMessage = error?.message ?? null;
  }

  if (errorMessage) {
    return {
      success: false,
      message: `Kayıt güncellenemedi: ${errorMessage}`,
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/content");

  return {
    success: true,
    message: "İçerik başarıyla kaydedildi.",
  };
}

export async function saveProjectAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const context = await requireAdmin();
  const role = context.profile?.role;

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

  if (parsed.data.status === "published" && !canPublish(role)) {
    return {
      success: false,
      message: "Bu rolün yayınlama yetkisi bulunmuyor.",
    };
  }

  const supabase = await createClient();
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
    status: parsed.data.status,
    seo_json: {},
    scheduled_at:
      parsed.data.status === "scheduled"
        ? scheduledLocalToIso(parsed.data.scheduledAt ?? "")
        : null,
    published_at:
      parsed.data.status === "published" ? new Date().toISOString() : null,
  } as const;

  const result = parsed.data.id
    ? await supabase
        .from("projects")
        .update(payload)
        .eq("id", parsed.data.id)
        .select("id")
        .single()
    : await supabase
        .from("projects")
        .insert(payload)
        .select("id")
        .single();

  if (result.error || !result.data) {
    return {
      success: false,
      message: `Proje kaydedilemedi: ${result.error?.message ?? "Kayıt oluşturulamadı."}`,
    };
  }

  const projectId = result.data.id;
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
          project_id: projectId,
          media_id: mediaId,
          media_type: rawType === "video" ? "video" : "image",
          caption: captionParts.join("|") || null,
          order_no: index + 1,
        },
      ];
    });

  const { error: deleteMediaError } = await supabase
    .from("project_media")
    .delete()
    .eq("project_id", projectId);

  if (deleteMediaError) {
    return {
      success: false,
      message: `Proje kaydedildi ancak galeri güncellenemedi: ${deleteMediaError.message}`,
    };
  }

  if (galleryRows.length) {
    const { error: galleryError } = await supabase
      .from("project_media")
      .insert(galleryRows);

    if (galleryError) {
      return {
        success: false,
        message: `Proje kaydedildi ancak galeri eklenemedi: ${galleryError.message}`,
      };
    }
  }

  revalidatePath("/projeler");
  revalidatePath("/admin/projects");

  return {
    success: true,
    message: "Proje başarıyla kaydedildi.",
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
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/projeler");
}

export async function saveReferenceAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

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

  const supabase = await createClient();
  const payload = {
    locale: "tr",
    name: parsed.data.name,
    website: parsed.data.website || null,
    category: parsed.data.category || null,
    story: parsed.data.story || null,
    logo_media_id: parsed.data.logoMediaId || null,
    visible: parsed.data.visible,
  };

  const result = parsed.data.id
    ? await supabase
        .from("references")
        .update(payload)
        .eq("id", parsed.data.id)
        .select("id")
        .single()
    : await supabase
        .from("references")
        .insert(payload)
        .select("id")
        .single();

  if (result.error) {
    return {
      success: false,
      message: `Referans kaydedilemedi: ${result.error.message}`,
    };
  }

  revalidatePath("/referanslar");
  revalidatePath("/admin/references");

  return {
    success: true,
    message: "Referans başarıyla kaydedildi.",
  };
}

export async function deleteReferenceAction(formData: FormData) {
  const context = await requireAdmin();
  if (!canPublish(context.profile?.role)) return;

  const id = stringValue(formData, "id");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("references").delete().eq("id", id);
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

  if (!canPublish(context.profile?.role)) {
    return {
      success: false,
      message: "Bu rolün ayar değiştirme yetkisi bulunmuyor.",
    };
  }

  let homeValues: Json;

  try {
    homeValues = parseJson(stringValue(formData, "homeValues"), []);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Değer kartları JSON'u geçersiz.",
    };
  }

  const validHomeValues =
    Array.isArray(homeValues) &&
    homeValues.length === 5 &&
    homeValues.every(
      (item) =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        typeof item.number === "string" &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        typeof item.icon === "string",
    );

  if (!validHomeValues) {
    return {
      success: false,
      message:
        "Ana sayfada number, title, description ve icon alanlarına sahip tam olarak beş değer kartı bulunmalıdır.",
    };
  }

  const valueJson = {
    contact: {
      phone: stringValue(formData, "phone"),
      mobile: stringValue(formData, "mobile"),
      email: stringValue(formData, "email"),
      address: stringValue(formData, "address"),
      whatsapp: stringValue(formData, "whatsapp"),
      workingHours: stringValue(formData, "workingHours"),
      mapUrl: stringValue(formData, "mapUrl"),
    },
    social: {
      instagram: stringValue(formData, "instagram"),
      linkedin: stringValue(formData, "linkedin"),
      youtube: stringValue(formData, "youtube"),
      x: stringValue(formData, "x"),
    },
    hero: {
      poster: stringValue(formData, "heroPoster"),
      desktopVideo: stringValue(formData, "heroDesktopVideo"),
      mobileVideo: stringValue(formData, "heroMobileVideo"),
    },
    homeValues,
    seo: {
      defaultTitle: stringValue(formData, "defaultTitle"),
      defaultDescription: stringValue(formData, "defaultDescription"),
    },
  };

  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").upsert({
    key: "global",
    locale: "tr",
    value_json: valueJson,
    updated_by: context.user?.id ?? null,
  });

  if (error) {
    return {
      success: false,
      message: `Ayarlar kaydedilemedi: ${error.message}`,
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");

  return {
    success: true,
    message: "Ayarlar başarıyla kaydedildi.",
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

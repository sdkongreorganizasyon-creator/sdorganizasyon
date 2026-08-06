import "server-only";

import { createClient } from "@/lib/supabase/server";

export type AdminMediaOption = Readonly<{
  id: string;
  label: string;
  url: string;
  mimeType: string | null;
}>;

export const staticAdminMediaOptions: readonly AdminMediaOption[] = [
  {
    id: "local-logo-dark",
    label: "SDKONGRE Logo — Koyu Zemin",
    url: "/brand/sdkongre-logo-dark.png",
    mimeType: "image/png",
  },
  {
    id: "local-logo-light",
    label: "SDKONGRE Logo — Açık Zemin",
    url: "/brand/sdkongre-logo-light.png",
    mimeType: "image/png",
  },
  {
    id: "local-header-home",
    label: "Header — Ana Sayfa",
    url: "/media/headers/anasayfa.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-corporate",
    label: "Header — Kurumsal",
    url: "/media/headers/kurumsal.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-why-us",
    label: "Header — Neden Biz",
    url: "/media/headers/neden-biz.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-services",
    label: "Header — Hizmetlerimiz",
    url: "/media/headers/hizmetlerimiz.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-digital-services",
    label: "Header — Dijital Hizmetler",
    url: "/media/headers/dijital-hizmetler.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-process",
    label: "Header — Organizasyon Süreci",
    url: "/media/headers/organizasyon-sureci.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-projects",
    label: "Header — Projeler",
    url: "/media/headers/projeler.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-references",
    label: "Header — Referanslar",
    url: "/media/headers/referanslar.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-contact",
    label: "Header — İletişim",
    url: "/media/headers/iletisim.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-quote",
    label: "Header — Teklif Al",
    url: "/media/headers/teklif-al.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-header-legal",
    label: "Header — Yasal Metinler",
    url: "/media/headers/kvkk.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-corporate-about",
    label: "Kurumsal — Hakkımızda",
    url: "/media/corporate/hakkimizda.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-corporate-story",
    label: "Kurumsal — Hikayemiz",
    url: "/media/corporate/hikayemiz.webp",
    mimeType: "image/webp",
  },
  {
    id: "local-corporate-values",
    label: "Kurumsal — Değerlerimiz",
    url: "/media/corporate/degerlerimiz.webp",
    mimeType: "image/webp",
  },
];

export async function getAdminMediaOptions(
  limit = 300,
): Promise<AdminMediaOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media_assets")
    .select("id,bucket,path,file_name,mime_type")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[admin-media] Medya seçenekleri yüklenemedi", {
      code: error.code,
      message: error.message,
    });
    return [...staticAdminMediaOptions];
  }

  const databaseOptions = (data ?? []).map((item) => ({
    id: item.id,
    label: item.file_name || item.path,
    url: supabase.storage.from(item.bucket).getPublicUrl(item.path).data
      .publicUrl,
    mimeType: item.mime_type || null,
  }));

  const knownUrls = new Set(staticAdminMediaOptions.map((item) => item.url));

  return [
    ...staticAdminMediaOptions,
    ...databaseOptions.filter((item) => !knownUrls.has(item.url)),
  ];
}

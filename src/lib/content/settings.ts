import { cache } from "react";
import { siteConfig } from "@/config/site";
import { homeValues } from "@/content/site-content";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import type { HomeValue } from "@/types/content";

export type ResolvedSiteSettings = Readonly<{
  contact: {
    phone: string | null;
    mobile: string | null;
    email: string | null;
    address: string | null;
    whatsapp: string | null;
    workingHours: string | null;
    mapUrl: string | null;
  };
  social: {
    instagram: string | null;
    linkedin: string | null;
    youtube: string | null;
    x: string | null;
  };
  hero: {
    poster: string;
    desktopVideo: string | null;
    mobileVideo: string | null;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
  homeValues: readonly HomeValue[];
}>;

function nonEmpty(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function resolveHomeValues(value: unknown): readonly HomeValue[] {
  if (!Array.isArray(value) || value.length !== 5) return homeValues;

  const normalized = value.flatMap((item) => {
    const source = record(item);
    const number = nonEmpty(source.number);
    const title = nonEmpty(source.title);
    const description = nonEmpty(source.description);
    const icon = nonEmpty(source.icon);

    if (!number || !title || !description || !icon) return [];

    return [{ number, title, description, icon }];
  });

  return normalized.length === 5 ? normalized : homeValues;
}

async function resolveSiteSettings(): Promise<ResolvedSiteSettings> {
  const fallback: ResolvedSiteSettings = {
    contact: siteConfig.contact,
    social: siteConfig.social,
    hero: siteConfig.hero,
    seo: {
      defaultTitle: siteConfig.defaultTitle,
      defaultDescription: siteConfig.description,
    },
    homeValues,
  };

  if (!isSupabaseConfigured()) return fallback;

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value_json")
      .eq("key", "global")
      .eq("locale", "tr")
      .maybeSingle();

    if (!data?.value_json) return fallback;

    const root = record(data.value_json);
    const contact = record(root.contact);
    const social = record(root.social);
    const hero = record(root.hero);
    const seo = record(root.seo);

    return {
      contact: {
        phone: nonEmpty(contact.phone) ?? fallback.contact.phone,
        mobile: nonEmpty(contact.mobile) ?? fallback.contact.mobile,
        email: nonEmpty(contact.email) ?? fallback.contact.email,
        address: nonEmpty(contact.address) ?? fallback.contact.address,
        whatsapp:
          nonEmpty(contact.whatsapp) ?? fallback.contact.whatsapp,
        workingHours:
          nonEmpty(contact.workingHours) ??
          fallback.contact.workingHours,
        mapUrl: nonEmpty(contact.mapUrl) ?? fallback.contact.mapUrl,
      },
      social: {
        instagram:
          nonEmpty(social.instagram) ?? fallback.social.instagram,
        linkedin: nonEmpty(social.linkedin) ?? fallback.social.linkedin,
        youtube: nonEmpty(social.youtube) ?? fallback.social.youtube,
        x: nonEmpty(social.x) ?? fallback.social.x,
      },
      hero: {
        poster: nonEmpty(hero.poster) ?? fallback.hero.poster,
        desktopVideo:
          nonEmpty(hero.desktopVideo) ?? fallback.hero.desktopVideo,
        mobileVideo:
          nonEmpty(hero.mobileVideo) ?? fallback.hero.mobileVideo,
      },
      seo: {
        defaultTitle:
          nonEmpty(seo.defaultTitle) ?? fallback.seo.defaultTitle,
        defaultDescription:
          nonEmpty(seo.defaultDescription) ??
          fallback.seo.defaultDescription,
      },
      homeValues: resolveHomeValues(root.homeValues),
    };
  } catch {
    return fallback;
  }
}


export const getResolvedSiteSettings = cache(resolveSiteSettings);

"use client";

import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useActionState } from "react";

import {
  saveSettingsAction,
  type ActionState,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { homeValues } from "@/content/site-content";
import { Textarea, TextInput } from "@/components/ui/field";

type SettingsFormProps = Readonly<{
  settings?: Record<string, unknown> | null;
}>;

const initialState: ActionState = {
  success: false,
  message: "",
};

function nested(
  settings: Record<string, unknown> | null | undefined,
  group: string,
  key: string,
) {
  const parent = settings?.[group];
  if (!parent || typeof parent !== "object" || Array.isArray(parent)) return "";
  const value = (parent as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

function jsonValue(
  settings: Record<string, unknown> | null | undefined,
  key: string,
) {
  const value = settings?.[key];
  return value ? JSON.stringify(value, null, 2) : "";
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [state, action, pending] = useActionState(
    saveSettingsAction,
    initialState,
  );

  return (
    <form action={action} className="admin-form">
      <div className="admin-form__header">
        <div>
          <p className="eyebrow">SİTE AYARLARI</p>
          <h1>İletişim ve Global Ayarlar</h1>
        </div>
        <Button disabled={pending} type="submit">
          {pending ? (
            <Loader2 className="spin" aria-hidden="true" />
          ) : (
            <Save aria-hidden="true" size={18} />
          )}
          Kaydet
        </Button>
      </div>

      {state.message ? (
        <div
          className={
            state.success ? "admin-alert is-success" : "admin-alert is-error"
          }
        >
          {state.success ? <CheckCircle2 aria-hidden="true" /> : null}
          {state.message}
        </div>
      ) : null}

      <div className="admin-form__grid">
        <section className="admin-panel">
          <h2>İletişim</h2>
          <div className="form-grid form-grid--two">
            <TextInput
              label="Telefon"
              name="phone"
              defaultValue={nested(settings, "contact", "phone")}
            />
            <TextInput
              label="GSM"
              name="mobile"
              defaultValue={nested(settings, "contact", "mobile")}
            />
            <TextInput
              label="E-posta"
              name="email"
              type="email"
              defaultValue={nested(settings, "contact", "email")}
            />
            <TextInput
              label="WhatsApp"
              name="whatsapp"
              defaultValue={nested(settings, "contact", "whatsapp")}
            />
            <TextInput
              label="Çalışma Saatleri"
              name="workingHours"
              defaultValue={nested(settings, "contact", "workingHours")}
            />
            <TextInput
              label="Google Maps URL"
              name="mapUrl"
              type="url"
              defaultValue={nested(settings, "contact", "mapUrl")}
            />
          </div>
          <Textarea
            label="Adres"
            name="address"
            rows={4}
            defaultValue={nested(settings, "contact", "address")}
          />
        </section>

        <section className="admin-panel">
          <h2>Sosyal Medya</h2>
          <TextInput
            label="Instagram URL"
            name="instagram"
            type="url"
            defaultValue={nested(settings, "social", "instagram")}
          />
          <TextInput
            label="LinkedIn URL"
            name="linkedin"
            type="url"
            defaultValue={nested(settings, "social", "linkedin")}
          />
          <TextInput
            label="YouTube URL"
            name="youtube"
            type="url"
            defaultValue={nested(settings, "social", "youtube")}
          />
          <TextInput
            label="X URL"
            name="x"
            type="url"
            defaultValue={nested(settings, "social", "x")}
          />
        </section>

        <section className="admin-panel">
          <h2>Ana Sayfa Hero</h2>
          <TextInput
            label="Poster URL"
            name="heroPoster"
            defaultValue={
              nested(settings, "hero", "poster") ||
              "/fallback/hero-poster.svg"
            }
          />
          <TextInput
            label="Desktop Video URL"
            name="heroDesktopVideo"
            type="url"
            defaultValue={nested(settings, "hero", "desktopVideo")}
          />
          <TextInput
            label="Mobil Video URL"
            name="heroMobileVideo"
            type="url"
            defaultValue={nested(settings, "hero", "mobileVideo")}
          />
          <Textarea
            label="Beş Değer Kartı JSON"
            name="homeValues"
            rows={20}
            hint="Tam olarak beş kart bulunmalıdır. number, title, description ve icon alanlarını koruyun."
            defaultValue={
              jsonValue(settings, "homeValues") ||
              JSON.stringify(homeValues, null, 2)
            }
          />
        </section>

        <section className="admin-panel">
          <h2>Global SEO</h2>
          <TextInput
            label="Varsayılan Başlık"
            name="defaultTitle"
            maxLength={70}
            defaultValue={nested(settings, "seo", "defaultTitle")}
          />
          <Textarea
            label="Varsayılan Açıklama"
            name="defaultDescription"
            maxLength={200}
            rows={4}
            defaultValue={nested(settings, "seo", "defaultDescription")}
          />
          <p className="admin-help">
            Environment değişkenleri public site için temel kaynaktır.
            Veritabanındaki ayarlar ileride canlı arayüze bağlanabilir.
          </p>
        </section>
      </div>
    </form>
  );
}

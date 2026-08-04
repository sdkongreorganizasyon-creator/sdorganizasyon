"use client";

import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useActionState } from "react";

import {
  saveGenericContentAction,
  type ActionState,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  Textarea,
  TextInput,
} from "@/components/ui/field";
import { utcToIstanbulDateTimeLocal } from "@/lib/utils/format";
import type { ContentStatus, Json } from "@/types/database";

type EntityName =
  | "pages"
  | "services"
  | "process_steps"
  | "legal_documents";

type EntityRecord = Readonly<{
  id: string;
  title: string;
  eyebrow?: string | null;
  summary?: string | null;
  subtitle?: string | null;
  contentJson: Json;
  status: ContentStatus;
  scheduledAt?: string | null;
  seoJson?: Json;
  version?: string | null;
  effectiveDate?: string | null;
}>;

type EntityFormProps = Readonly<{
  entity: EntityName;
  record: EntityRecord;
}>;

const initialState: ActionState = {
  success: false,
  message: "",
};

function seoValue(value: Json | undefined, key: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const candidate = value[key];
  return typeof candidate === "string" ? candidate : "";
}

export function EntityForm({ entity, record }: EntityFormProps) {
  const [state, action, pending] = useActionState(
    saveGenericContentAction,
    initialState,
  );

  const entityLabels: Record<EntityName, string> = {
    pages: "Sayfa",
    services: "Hizmet",
    process_steps: "Organizasyon Süreci",
    legal_documents: "Yasal Metin",
  };

  return (
    <form action={action} className="admin-form">
      <input type="hidden" name="id" value={record.id} />
      <input type="hidden" name="entity" value={entity} />

      <div className="admin-form__header">
        <div>
          <p className="eyebrow">{entityLabels[entity]}</p>
          <h1>{record.title}</h1>
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
          role="status"
        >
          {state.success ? <CheckCircle2 aria-hidden="true" /> : null}
          {state.message}
        </div>
      ) : null}

      <div className="admin-form__grid">
        <section className="admin-panel">
          <h2>Temel Bilgiler</h2>
          <TextInput
            label="Başlık"
            name="title"
            defaultValue={record.title}
            required
          />

          {entity === "pages" ? (
            <TextInput
              label="Üst Etiket"
              name="eyebrow"
              defaultValue={record.eyebrow ?? ""}
            />
          ) : null}

          {entity === "process_steps" ? (
            <TextInput
              label="Alt Başlık"
              name="subtitle"
              defaultValue={record.subtitle ?? ""}
            />
          ) : null}

          {entity !== "legal_documents" ? (
            <Textarea
              label={
                entity === "process_steps"
                  ? "Açıklama"
                  : "Kısa Açıklama / Hero Metni"
              }
              name="summary"
              rows={5}
              defaultValue={record.summary ?? ""}
            />
          ) : null}

          {entity === "legal_documents" ? (
            <div className="form-grid form-grid--two">
              <TextInput
                label="Sürüm"
                name="version"
                defaultValue={record.version ?? "1.0"}
              />
              <TextInput
                label="Yürürlük Tarihi"
                name="effectiveDate"
                type="date"
                defaultValue={record.effectiveDate ?? ""}
              />
            </div>
          ) : null}

          <Select
            label="Yayın Durumu"
            name="status"
            defaultValue={record.status}
          >
            <option value="draft">Taslak</option>
            <option value="review">İncelemede</option>
            <option value="scheduled">Zamanlanmış</option>
            <option value="published">Yayında</option>
            <option value="archived">Arşiv</option>
          </Select>
          <TextInput
            label="Planlı Yayın Zamanı"
            name="scheduledAt"
            type="datetime-local"
            hint="Durum scheduled olduğunda Vercel Cron bu zamanı kullanır."
            defaultValue={
              utcToIstanbulDateTimeLocal(record.scheduledAt)
            }
          />
        </section>

        <section className="admin-panel">
          <h2>İçerik Yapısı</h2>
          <p className="admin-help">
            Bu alan içerik bloklarının yapısını korur. JSON biçimini
            değiştirmeden yalnız metinleri düzenleyin. Geçersiz JSON
            kaydedilmez.
          </p>
          <Textarea
            label="İçerik JSON"
            name="body"
            rows={26}
            defaultValue={JSON.stringify(record.contentJson, null, 2)}
            spellCheck={false}
          />
          <input type="hidden" name="features" value="" />
          <input type="hidden" name="outputs" value="" />
        </section>

        <section className="admin-panel">
          <h2>SEO</h2>
          <TextInput
            label="SEO Başlığı"
            name="seoTitle"
            defaultValue={seoValue(record.seoJson, "title")}
            maxLength={70}
          />
          <Textarea
            label="Meta Açıklama"
            name="seoDescription"
            rows={4}
            defaultValue={seoValue(record.seoJson, "description")}
            maxLength={200}
          />
        </section>
      </div>
    </form>
  );
}

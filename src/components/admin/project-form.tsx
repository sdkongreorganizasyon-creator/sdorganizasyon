"use client";

import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useActionState } from "react";

import {
  saveProjectAction,
  type ActionState,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  Textarea,
  TextInput,
} from "@/components/ui/field";
import { utcToIstanbulDateTimeLocal } from "@/lib/utils/format";
import type { ContentStatus } from "@/types/database";

type ProjectFormProps = Readonly<{
  project?: {
    id: string;
    title: string;
    slug: string;
    clientName?: string | null;
    eventType?: string | null;
    city?: string | null;
    venue?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    summary: string;
    challenge?: string | null;
    solution?: string | null;
    result?: string | null;
    status: ContentStatus;
    scheduledAt?: string | null;
    coverMediaId?: string | null;
    galleryMediaIds?: string;
    featured: boolean;
  };
}>;

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ProjectForm({ project }: ProjectFormProps) {
  const [state, action, pending] = useActionState(
    saveProjectAction,
    initialState,
  );

  return (
    <form action={action} className="admin-form">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="admin-form__header">
        <div>
          <p className="eyebrow">PROJE</p>
          <h1>{project ? project.title : "Yeni Proje"}</h1>
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
          <h2>Proje Bilgileri</h2>
          <TextInput
            label="Proje Adı"
            name="title"
            required
            defaultValue={project?.title ?? ""}
          />
          <TextInput
            label="URL Slug"
            name="slug"
            required
            hint="Küçük harf, Türkçe karaktersiz ve tireli."
            defaultValue={project?.slug ?? ""}
          />
          <div className="form-grid form-grid--two">
            <TextInput
              label="Müşteri / Kurum"
              name="clientName"
              defaultValue={project?.clientName ?? ""}
            />
            <TextInput
              label="Etkinlik Türü"
              name="eventType"
              defaultValue={project?.eventType ?? ""}
            />
            <TextInput
              label="Şehir"
              name="city"
              defaultValue={project?.city ?? ""}
            />
            <TextInput
              label="Mekân"
              name="venue"
              defaultValue={project?.venue ?? ""}
            />
            <TextInput
              label="Başlangıç Tarihi"
              name="startDate"
              type="date"
              defaultValue={project?.startDate ?? ""}
            />
            <TextInput
              label="Bitiş Tarihi"
              name="endDate"
              type="date"
              defaultValue={project?.endDate ?? ""}
            />
          </div>
          <Textarea
            label="Kısa Özet"
            name="summary"
            required
            rows={5}
            defaultValue={project?.summary ?? ""}
          />
          <TextInput
            label="Kapak Görseli Media ID"
            name="coverMediaId"
            hint="Medya kütüphanesindeki görsel UUID'si."
            defaultValue={project?.coverMediaId ?? ""}
          />
          <Textarea
            label="Galeri Media ID'leri"
            name="galleryMediaIds"
            rows={5}
            hint="Her satıra: UUID|image|Açıklama veya UUID|video|Açıklama"
            defaultValue={project?.galleryMediaIds ?? ""}
          />
        </section>

        <section className="admin-panel">
          <h2>Vaka Çalışması</h2>
          <Textarea
            label="İhtiyaç / Zorluk"
            name="challenge"
            rows={7}
            defaultValue={project?.challenge ?? ""}
          />
          <Textarea
            label="Çözüm"
            name="solution"
            rows={7}
            defaultValue={project?.solution ?? ""}
          />
          <Textarea
            label="Sonuç"
            name="result"
            rows={7}
            defaultValue={project?.result ?? ""}
          />
        </section>

        <section className="admin-panel">
          <h2>Yayın</h2>
          <Select
            label="Durum"
            name="status"
            defaultValue={project?.status ?? "draft"}
          >
            <option value="draft">Taslak</option>
            <option value="review">İncelemede</option>
            <option value="published">Yayında</option>
            <option value="archived">Arşiv</option>
          </Select>
          <TextInput
            label="Planlı Yayın Zamanı"
            name="scheduledAt"
            type="datetime-local"
            defaultValue={
              utcToIstanbulDateTimeLocal(project?.scheduledAt)
            }
          />

          <label className="checkbox-field">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured ?? false}
            />
            <span>Öne çıkan proje olarak işaretle</span>
          </label>

          <p className="admin-help">
            Kapak ve galeri dosyalarını Medya bölümünden yükleyin. Proje medya
            ilişkilendirmesi sonraki içerik güncellemesinde genişletilebilir.
          </p>
        </section>
      </div>
    </form>
  );
}

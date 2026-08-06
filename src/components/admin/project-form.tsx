"use client";

import {
  CheckCircle2,
  Eye,
  Loader2,
  Rocket,
  Save,
} from "lucide-react";
import { useActionState } from "react";

import {
  saveProjectAction,
  type ActionState,
} from "@/app/admin/actions";
import {
  MediaAssetSelect,
  MediaGalleryBuilder,
} from "@/components/admin/media-select";
import { Button } from "@/components/ui/button";
import {
  Select,
  Textarea,
  TextInput,
} from "@/components/ui/field";
import { utcToIstanbulDateTimeLocal } from "@/lib/utils/format";
import type { ContentStatus } from "@/types/database";

type MediaOption = Readonly<{
  id: string;
  label: string;
  url: string;
  mimeType?: string | null;
}>;

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
  mediaOptions?: readonly MediaOption[];
  hasDraft?: boolean;
}>;

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ProjectForm({
  project,
  mediaOptions = [],
  hasDraft = false,
}: ProjectFormProps) {
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
          <p>
            Değişiklikleri önce taslak olarak kaydedin, önizleyin ve yalnız
            onayınızdan sonra yayımlayın.
          </p>
        </div>
        <div className="admin-publish-actions">
          <Button
            disabled={pending}
            type="submit"
            name="intent"
            value="draft"
            variant="secondary"
          >
            {pending ? (
              <Loader2 className="spin" aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" size={17} />
            )}
            Taslak Kaydet
          </Button>
          <Button
            disabled={pending}
            type="submit"
            name="intent"
            value="preview"
            variant="secondary"
          >
            <Eye aria-hidden="true" size={17} />
            Önizle
          </Button>
          <Button
            disabled={pending}
            type="submit"
            name="intent"
            value="publish"
          >
            <Rocket aria-hidden="true" size={17} />
            Yayımla
          </Button>
        </div>
      </div>

      {hasDraft ? (
        <div className="admin-alert is-info" role="status">
          Bu proje için canlıya alınmamış bir taslak bulunuyor. Form taslak
          değerleriyle açıldı.
        </div>
      ) : null}

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
        </section>

        <section className="admin-panel">
          <h2>Medya</h2>
          <MediaAssetSelect
            label="Kapak Görseli"
            name="coverMediaId"
            options={mediaOptions}
            accept="image"
            defaultValue={project?.coverMediaId ?? ""}
            hint="Medya kütüphanesine yüklenen görseller arasından seçin."
          />
          <MediaGalleryBuilder
            options={mediaOptions}
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
          <h2>Yayın Ayarları</h2>
          <Select
            label="İçerik Durumu"
            name="status"
            defaultValue={project?.status ?? "draft"}
          >
            <option value="draft">Taslak</option>
            <option value="review">İncelemede</option>
            <option value="scheduled">Planlandı</option>
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
            “Taslak Kaydet” ve “Önizle” canlı siteyi değiştirmez. Yalnız
            “Yayımla” işlemi onaylı içeriği ziyaretçilere açar.
          </p>
        </section>
      </div>
    </form>
  );
}

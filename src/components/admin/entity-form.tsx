"use client";

import {
  CheckCircle2,
  ExternalLink,
  Eye,
  ImageIcon,
  Loader2,
  Rocket,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import {
  saveGenericContentAction,
  type ActionState,
} from "@/app/admin/actions";
import { PageBuilder } from "@/components/admin/page-builder";
import {
  LegalContentBuilder,
  ProcessContentBuilder,
} from "@/components/admin/structured-content-builders";
import { Button } from "@/components/ui/button";
import { Select, Textarea, TextInput } from "@/components/ui/field";
import { utcToIstanbulDateTimeLocal } from "@/lib/utils/format";
import type { ContentStatus, Json } from "@/types/database";

type EntityName =
  | "pages"
  | "services"
  | "process_steps"
  | "legal_documents";

type MediaOption = Readonly<{
  label: string;
  value: string;
  type: string;
}>;

type EntityRecord = Readonly<{
  id: string;
  title: string;
  eyebrow?: string | null;
  summary?: string | null;
  subtitle?: string | null;
  slug?: string | null;
  icon?: string | null;
  orderNo?: number | null;
  contentJson: Json;
  status: ContentStatus;
  scheduledAt?: string | null;
  seoJson?: Json;
  version?: string | null;
  effectiveDate?: string | null;
  previewPath: string;
}>;

type EntityFormProps = Readonly<{
  entity: EntityName;
  record: EntityRecord;
  mediaOptions?: readonly MediaOption[];
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

function contentRecord(value: Json): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function EntityForm({
  entity,
  record,
  mediaOptions = [],
}: EntityFormProps) {
  const [state, action, pending] = useActionState(
    saveGenericContentAction,
    initialState,
  );

  const entityLabels: Record<EntityName, string> = {
    pages: "Sayfa",
    services: "Hizmet Kartı",
    process_steps: "Organizasyon Süreci",
    legal_documents: "Yasal Metin",
  };

  const content = contentRecord(record.contentJson);
  const serviceImageUrl =
    typeof content.imageUrl === "string" ? content.imageUrl : "";
  const serviceImageAlt =
    typeof content.imageAlt === "string" ? content.imageAlt : "";
  const serviceParagraphs = stringList(content.paragraphs).join("\n");
  const serviceFeatures = stringList(content.features).join("\n");
  const serviceVideoUrl =
    typeof content.videoUrl === "string" ? content.videoUrl : "";
  const serviceAnimation =
    typeof content.animation === "string" ? content.animation : "fade";
  const serviceCardBackground =
    typeof content.cardBackground === "string" ? content.cardBackground : "#0b1c2b";
  const serviceTextColor =
    typeof content.textColor === "string" ? content.textColor : "#ffffff";
  const imageOptions = mediaOptions.filter((item) =>
    item.type.startsWith("image"),
  );
  const videoOptions = mediaOptions.filter((item) =>
    item.type.startsWith("video"),
  );
  const currentInOptions =
    !serviceImageUrl ||
    imageOptions.some((option) => option.value === serviceImageUrl);
  const currentVideoInOptions =
    !serviceVideoUrl ||
    videoOptions.some((option) => option.value === serviceVideoUrl);

  return (
    <form action={action} className="admin-form">
      <input type="hidden" name="id" value={record.id} />
      <input type="hidden" name="entity" value={entity} />
      <input type="hidden" name="previewPath" value={record.previewPath} />

      <div className="admin-form__header">
        <div>
          <p className="eyebrow">{entityLabels[entity]}</p>
          <h1>{record.title}</h1>
          <p>
            İçerik, yayın durumu, görsel ve SEO alanlarını tek ekrandan yönetin.
          </p>
        </div>
        <div className="admin-form__header-actions">
          <Link className="button button--secondary" href={record.previewPath} target="_blank">
            <ExternalLink aria-hidden="true" size={17} />
            Canlı Sayfa
          </Link>
          <Link className="button button--secondary" href="/admin/media">
            <ImageIcon aria-hidden="true" size={17} />
            Medya
          </Link>
          <Button
            variant="secondary"
            disabled={pending}
            name="intent"
            value="draft"
            type="submit"
          >
            {pending ? (
              <Loader2 className="spin" aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" size={17} />
            )}
            Taslak Kaydet
          </Button>
          <Button
            variant="secondary"
            disabled={pending}
            name="intent"
            value="preview"
            type="submit"
          >
            <Eye aria-hidden="true" size={17} />
            Önizle
          </Button>
          <Button
            disabled={pending}
            name="intent"
            value="publish"
            type="submit"
          >
            <Rocket aria-hidden="true" size={17} />
            Yayımla
          </Button>
        </div>
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
          ) : (
            <input type="hidden" name="eyebrow" value="" />
          )}

          {entity === "process_steps" ? (
            <TextInput
              label="Alt Başlık"
              name="subtitle"
              defaultValue={record.subtitle ?? ""}
            />
          ) : (
            <input type="hidden" name="subtitle" value="" />
          )}

          {entity !== "legal_documents" ? (
            <Textarea
              label={
                entity === "process_steps"
                  ? "Açıklama"
                  : "Kısa Açıklama"
              }
              name="summary"
              rows={5}
              defaultValue={record.summary ?? ""}
            />
          ) : (
            <input type="hidden" name="summary" value="" />
          )}

          {entity === "services" ? (
            <>
              <div className="form-grid form-grid--two">
                <TextInput
                  label="Anchor Slug"
                  name="serviceSlug"
                  defaultValue={record.slug ?? ""}
                  hint="Örnek: kongre-organizasyonlari"
                  required
                />
                <TextInput
                  label="Sıra"
                  name="serviceOrderNo"
                  type="number"
                  min={0}
                  defaultValue={record.orderNo ?? 0}
                />
                <TextInput
                  label="İkon"
                  name="serviceIcon"
                  defaultValue={record.icon ?? "sparkles"}
                />
              </div>
            </>
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
          ) : (
            <>
              <input type="hidden" name="version" value="" />
              <input type="hidden" name="effectiveDate" value="" />
            </>
          )}

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
            defaultValue={utcToIstanbulDateTimeLocal(record.scheduledAt)}
          />
        </section>

        {entity === "services" ? (
          <>
            <section className="admin-panel">
              <h2>Görsel ve Kart İçeriği</h2>
              <Select
                label="Kart Görseli"
                name="serviceImageUrl"
                defaultValue={serviceImageUrl}
                hint="Supabase Medya Kütüphanesinden yüklenen görseller burada listelenir."
              >
                <option value="">Görsel seçilmedi</option>
                {!currentInOptions && serviceImageUrl ? (
                  <option value={serviceImageUrl}>{serviceImageUrl}</option>
                ) : null}
                {imageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <Select
                label="Kart Videosu"
                name="serviceVideoUrl"
                defaultValue={serviceVideoUrl}
              >
                <option value="">Video seçilmedi</option>
                {!currentVideoInOptions && serviceVideoUrl ? (
                  <option value={serviceVideoUrl}>{serviceVideoUrl}</option>
                ) : null}
                {videoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <div className="form-grid form-grid--two">
                <Select
                  label="Animasyon"
                  name="serviceAnimation"
                  defaultValue={serviceAnimation}
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                  <option value="scale">Scale</option>
                  <option value="none">Animasyonsuz</option>
                </Select>
                <label className="admin-color-field">
                  <span>Kart Arka Planı</span>
                  <input
                    type="color"
                    name="serviceCardBackground"
                    defaultValue={serviceCardBackground}
                  />
                </label>
                <label className="admin-color-field">
                  <span>Metin Rengi</span>
                  <input
                    type="color"
                    name="serviceTextColor"
                    defaultValue={serviceTextColor}
                  />
                </label>
              </div>
              <TextInput
                label="Görsel Alt Metni"
                name="serviceImageAlt"
                defaultValue={serviceImageAlt}
                maxLength={180}
              />
              <Textarea
                label="Ek Açıklama Paragrafları"
                name="serviceParagraphs"
                rows={7}
                hint="Her satır ayrı paragraf olarak kaydedilir."
                defaultValue={serviceParagraphs}
              />
              <Textarea
                label="Özellikler"
                name="serviceFeatures"
                rows={8}
                hint="Her satır ayrı madde olarak kaydedilir."
                defaultValue={serviceFeatures}
              />
              <input type="hidden" name="body" value="{}" />
              <input type="hidden" name="features" value="" />
              <input type="hidden" name="outputs" value="" />
            </section>

            <section className="admin-panel">
              <h2>Kart Önizlemesi</h2>
              <article className="admin-service-preview">
                {serviceImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={serviceImageUrl} alt="" />
                ) : (
                  <div className="admin-service-preview__empty">
                    Görsel seçilmedi
                  </div>
                )}
                <div>
                  <span>{record.orderNo ?? "—"}</span>
                  <h3>{record.title}</h3>
                  <p>{record.summary}</p>
                </div>
              </article>
            </section>
          </>
        ) : entity === "pages" ? (
          <section className="admin-panel admin-panel--wide">
            <PageBuilder
              initial={record.contentJson}
              mediaOptions={mediaOptions}
            />
            <input type="hidden" name="features" value="" />
            <input type="hidden" name="outputs" value="" />
          </section>
        ) : entity === "process_steps" ? (
          <section className="admin-panel admin-panel--wide">
            <h2>Süreç İçeriği</h2>
            <ProcessContentBuilder initial={record.contentJson} />
            <input type="hidden" name="features" value="" />
            <input type="hidden" name="outputs" value="" />
          </section>
        ) : (
          <section className="admin-panel admin-panel--wide">
            <h2>Yasal Metin İçeriği</h2>
            <LegalContentBuilder initial={record.contentJson} />
            <input type="hidden" name="features" value="" />
            <input type="hidden" name="outputs" value="" />
          </section>
        )}

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

"use client";

import {
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { Json } from "@/types/database";

type MediaOption = Readonly<{
  label: string;
  value: string;
  type: string;
}>;

type PageSection = {
  id: string;
  type: "text" | "media-text" | "feature-grid" | "quote";
  eyebrow: string;
  title: string;
  body: string;
  imageUrl: string;
  videoUrl: string;
  imageAlt: string;
  background: string;
  textColor: string;
  animation: "fade" | "slide" | "scale" | "none";
  align: "left" | "center" | "right";
  paddingTop: number;
  paddingBottom: number;
  contentGap: number;
  contentPadding: number;
  mediaHeight: number;
  active: boolean;
};

function record(value: Json): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function numberValue(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;

  return Number.isFinite(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : fallback;
}

function initialSections(value: unknown): PageSection[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const source = item as Record<string, unknown>;
    return [{
      id: typeof source.id === "string" ? source.id : `section-${index}`,
      type:
        source.type === "text" ||
        source.type === "media-text" ||
        source.type === "feature-grid" ||
        source.type === "quote"
          ? source.type
          : "media-text",
      eyebrow: typeof source.eyebrow === "string" ? source.eyebrow : "",
      title: typeof source.title === "string" ? source.title : "",
      body: typeof source.body === "string" ? source.body : "",
      imageUrl: typeof source.imageUrl === "string" ? source.imageUrl : "",
      videoUrl: typeof source.videoUrl === "string" ? source.videoUrl : "",
      imageAlt: typeof source.imageAlt === "string" ? source.imageAlt : "",
      background:
        typeof source.background === "string" ? source.background : "#0b1c2b",
      textColor:
        typeof source.textColor === "string" ? source.textColor : "#ffffff",
      animation:
        source.animation === "slide" ||
        source.animation === "scale" ||
        source.animation === "none"
          ? source.animation
          : "fade",
      align:
        source.align === "center" || source.align === "right"
          ? source.align
          : "left",
      paddingTop: numberValue(source.paddingTop, 64, 0, 240),
      paddingBottom: numberValue(source.paddingBottom, 64, 0, 240),
      contentGap: numberValue(source.contentGap, 40, 0, 160),
      contentPadding: numberValue(source.contentPadding, 0, 0, 96),
      mediaHeight: numberValue(source.mediaHeight, 360, 80, 800),
      active: typeof source.active === "boolean" ? source.active : true,
    }];
  });
}

export function PageBuilder({
  initial,
  mediaOptions,
}: Readonly<{
  initial: Json;
  mediaOptions: readonly MediaOption[];
}>) {
  const content = record(initial);
  const [headline, setHeadline] = useState(
    typeof content.headline === "string" ? content.headline : "",
  );
  const [paragraphs, setParagraphs] = useState(
    Array.isArray(content.paragraphs)
      ? content.paragraphs.filter((item): item is string => typeof item === "string").join("\n\n")
      : "",
  );
  const [heroImage, setHeroImage] = useState(
    typeof content.heroImage === "string" ? content.heroImage : "",
  );
  const [heroVideo, setHeroVideo] = useState(
    typeof content.heroVideo === "string" ? content.heroVideo : "",
  );
  const [heroAnimation, setHeroAnimation] = useState(
    typeof content.heroAnimation === "string" ? content.heroAnimation : "fade",
  );
  const [sections, setSections] = useState<PageSection[]>(
    initialSections(content.sections),
  );

  const imageOptions = mediaOptions.filter((item) =>
    item.type.startsWith("image"),
  );
  const videoOptions = mediaOptions.filter((item) =>
    item.type.startsWith("video"),
  );

  const payload = useMemo(
    () => ({
      ...content,
      headline,
      paragraphs: paragraphs
        .split(/\n\s*\n/)
        .map((item) => item.trim())
        .filter(Boolean),
      heroImage,
      heroVideo,
      heroAnimation,
      sections,
    }),
    [
      content,
      headline,
      paragraphs,
      heroAnimation,
      heroImage,
      heroVideo,
      sections,
    ],
  );

  function updateSection(index: number, patch: Partial<PageSection>) {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    );
  }

  function moveSection(index: number, direction: -1 | 1) {
    setSections((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
  }

  function addSection() {
    setSections((current) => [
      ...current,
      {
        id: `section-${Date.now()}`,
        type: "media-text",
        eyebrow: "",
        title: "Yeni Bölüm",
        body: "",
        imageUrl: "",
        videoUrl: "",
        imageAlt: "",
        background: "#0b1c2b",
        textColor: "#ffffff",
        animation: "fade",
        align: "left",
        paddingTop: 64,
        paddingBottom: 64,
        contentGap: 40,
        contentPadding: 0,
        mediaHeight: 360,
        active: true,
      },
    ]);
  }

  return (
    <div className="admin-page-builder">
      <input type="hidden" name="body" value={JSON.stringify(payload)} />

      <div className="admin-panel__heading">
        <div>
          <h2>Sayfa İçeriği ve Görsel Tasarım</h2>
          <p>
            Metin, görsel, video, renk ve animasyon alanlarını düzenleyin.
            Değişiklikler taslak olarak saklanabilir.
          </p>
        </div>
        <button type="button" className="button button--secondary" onClick={addSection}>
          <Plus aria-hidden="true" size={16} />
          Bölüm Ekle
        </button>
      </div>

      <div className="form-grid form-grid--two">
        <label className="field">
          <span>Sayfa Ana Başlığı</span>
          <input value={headline} onChange={(event) => setHeadline(event.target.value)} />
        </label>
        <label className="field">
          <span>Hero Animasyonu</span>
          <select
            value={heroAnimation}
            onChange={(event) => setHeroAnimation(event.target.value)}
          >
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="scale">Scale</option>
            <option value="none">Animasyonsuz</option>
          </select>
        </label>
        <label className="field">
          <span>Hero Görseli</span>
          <select value={heroImage} onChange={(event) => setHeroImage(event.target.value)}>
            <option value="">Görsel seçilmedi</option>
            {imageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Hero Videosu</span>
          <select value={heroVideo} onChange={(event) => setHeroVideo(event.target.value)}>
            <option value="">Video seçilmedi</option>
            {videoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Ana Metin Paragrafları</span>
        <textarea
          rows={9}
          value={paragraphs}
          onChange={(event) => setParagraphs(event.target.value)}
          placeholder="Paragrafları bir boş satırla ayırın."
        />
      </label>

      <div className="admin-page-builder__sections">
        {sections.map((section, index) => (
          <article className="admin-page-builder__section" key={section.id}>
            <header>
              <div>
                <strong>{section.title || `Bölüm ${index + 1}`}</strong>
                <span>{section.type}</span>
              </div>
              <div>
                <button
                  type="button"
                  aria-label="Yukarı taşı"
                  disabled={index === 0}
                  onClick={() => moveSection(index, -1)}
                >
                  <ChevronUp aria-hidden="true" size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Aşağı taşı"
                  disabled={index === sections.length - 1}
                  onClick={() => moveSection(index, 1)}
                >
                  <ChevronDown aria-hidden="true" size={16} />
                </button>
                <button
                  type="button"
                  className="is-danger"
                  aria-label="Bölümü sil"
                  onClick={() =>
                    setSections((current) =>
                      current.filter((_, sectionIndex) => sectionIndex !== index),
                    )
                  }
                >
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </div>
            </header>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Bölüm Tipi</span>
                <select
                  value={section.type}
                  onChange={(event) =>
                    updateSection(index, {
                      type: event.target.value as PageSection["type"],
                    })
                  }
                >
                  <option value="media-text">Görsel + Metin</option>
                  <option value="text">Metin</option>
                  <option value="feature-grid">Özellik Kartları</option>
                  <option value="quote">Vurgu / Alıntı</option>
                </select>
              </label>
              <label className="field">
                <span>Animasyon</span>
                <select
                  value={section.animation}
                  onChange={(event) =>
                    updateSection(index, {
                      animation: event.target.value as PageSection["animation"],
                    })
                  }
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                  <option value="scale">Scale</option>
                  <option value="none">Animasyonsuz</option>
                </select>
              </label>
              <label className="field">
                <span>Üst Etiket</span>
                <input
                  value={section.eyebrow}
                  onChange={(event) =>
                    updateSection(index, { eyebrow: event.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>Başlık</span>
                <input
                  value={section.title}
                  onChange={(event) =>
                    updateSection(index, { title: event.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>Görsel</span>
                <select
                  value={section.imageUrl}
                  onChange={(event) =>
                    updateSection(index, { imageUrl: event.target.value })
                  }
                >
                  <option value="">Görsel seçilmedi</option>
                  {imageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Video</span>
                <select
                  value={section.videoUrl}
                  onChange={(event) =>
                    updateSection(index, { videoUrl: event.target.value })
                  }
                >
                  <option value="">Video seçilmedi</option>
                  {videoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Görsel Alt Metni</span>
                <input
                  value={section.imageAlt}
                  onChange={(event) =>
                    updateSection(index, { imageAlt: event.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>Hizalama</span>
                <select
                  value={section.align}
                  onChange={(event) =>
                    updateSection(index, {
                      align: event.target.value as PageSection["align"],
                    })
                  }
                >
                  <option value="left">Sol</option>
                  <option value="center">Orta</option>
                  <option value="right">Sağ</option>
                </select>
              </label>
              <label className="field">
                <span>Üst Boşluk (px)</span>
                <input
                  type="number"
                  min={0}
                  max={240}
                  step={4}
                  value={section.paddingTop}
                  onChange={(event) =>
                    updateSection(index, {
                      paddingTop: numberValue(event.target.value, 64, 0, 240),
                    })
                  }
                />
              </label>
              <label className="field">
                <span>Alt Boşluk (px)</span>
                <input
                  type="number"
                  min={0}
                  max={240}
                  step={4}
                  value={section.paddingBottom}
                  onChange={(event) =>
                    updateSection(index, {
                      paddingBottom: numberValue(event.target.value, 64, 0, 240),
                    })
                  }
                />
              </label>
              <label className="field">
                <span>Kolon / İçerik Boşluğu (px)</span>
                <input
                  type="number"
                  min={0}
                  max={160}
                  step={4}
                  value={section.contentGap}
                  onChange={(event) =>
                    updateSection(index, {
                      contentGap: numberValue(event.target.value, 40, 0, 160),
                    })
                  }
                />
              </label>
              <label className="field">
                <span>Metin İç Boşluğu (px)</span>
                <input
                  type="number"
                  min={0}
                  max={96}
                  step={2}
                  value={section.contentPadding}
                  onChange={(event) =>
                    updateSection(index, {
                      contentPadding: numberValue(event.target.value, 0, 0, 96),
                    })
                  }
                />
              </label>
              <label className="field">
                <span>Görsel / Video Yüksekliği (px)</span>
                <input
                  type="number"
                  min={80}
                  max={800}
                  step={10}
                  value={section.mediaHeight}
                  onChange={(event) =>
                    updateSection(index, {
                      mediaHeight: numberValue(event.target.value, 360, 80, 800),
                    })
                  }
                />
              </label>
              <label className="admin-color-field">
                <span>Arka Plan</span>
                <input
                  type="color"
                  value={section.background}
                  onChange={(event) =>
                    updateSection(index, { background: event.target.value })
                  }
                />
              </label>
              <label className="admin-color-field">
                <span>Metin Rengi</span>
                <input
                  type="color"
                  value={section.textColor}
                  onChange={(event) =>
                    updateSection(index, { textColor: event.target.value })
                  }
                />
              </label>
            </div>

            <label className="field">
              <span>Metin</span>
              <textarea
                rows={7}
                value={section.body}
                onChange={(event) =>
                  updateSection(index, { body: event.target.value })
                }
              />
            </label>

            <label className="admin-switch-row">
              <input
                type="checkbox"
                checked={section.active}
                onChange={(event) =>
                  updateSection(index, { active: event.target.checked })
                }
              />
              <span>Bu bölümü göster</span>
            </label>

            <div className="admin-page-builder__media-hint">
              {section.videoUrl ? (
                <>
                  <Video aria-hidden="true" size={16} />
                  Video seçildi
                </>
              ) : section.imageUrl ? (
                <>
                  <ImageIcon aria-hidden="true" size={16} />
                  Görsel seçildi
                </>
              ) : (
                "Medya seçilmedi"
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

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
import type { FontPreset, PageTemplate } from "@/types/content";

type MediaOption = Readonly<{
  label: string;
  value: string;
  type: string;
}>;

type PageDesign = {
  template: PageTemplate;
  headingFont: FontPreset;
  bodyFont: FontPreset;
  background: string;
  textColor: string;
  accentColor: string;
  contentWidth: "narrow" | "standard" | "wide";
  headingScale: number;
  bodyScale: number;
  sectionSpacing: number;
  cardGap: number;
  cardPadding: number;
  heroSpacing: number;
};

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
  template: PageTemplate;
  headingFont: FontPreset;
  bodyFont: FontPreset;
  headingScale: number;
  bodyScale: number;
  active: boolean;
};

function record(value: Json | unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringValue(
  source: Record<string, unknown>,
  key: string,
  fallback = "",
) {
  return typeof source[key] === "string" ? source[key] : fallback;
}

function numberValue(
  source: Record<string, unknown>,
  key: string,
  fallback: number,
) {
  const value = source[key];
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function fontValue(value: unknown): FontPreset {
  return value === "serif" || value === "geometric" || value === "humanist"
    ? value
    : "system";
}

function templateValue(value: unknown): PageTemplate {
  return value === "split" || value === "editorial" || value === "cards"
    ? value
    : "standard";
}

function initialDesign(value: unknown): PageDesign {
  const source = record(value);
  return {
    template: templateValue(source.template),
    headingFont: fontValue(source.headingFont),
    bodyFont: fontValue(source.bodyFont),
    background: stringValue(source, "background", "#07111d"),
    textColor: stringValue(source, "textColor", "#ffffff"),
    accentColor: stringValue(source, "accentColor", "#f2b632"),
    contentWidth:
      source.contentWidth === "narrow" || source.contentWidth === "wide"
        ? source.contentWidth
        : "standard",
    headingScale: numberValue(source, "headingScale", 1),
    bodyScale: numberValue(source, "bodyScale", 1),
    sectionSpacing: numberValue(source, "sectionSpacing", 72),
    cardGap: numberValue(source, "cardGap", 16),
    cardPadding: numberValue(source, "cardPadding", 18),
    heroSpacing: numberValue(source, "heroSpacing", 72),
  };
}

function initialSections(value: unknown): PageSection[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const source = item as Record<string, unknown>;

    return [
      {
        id: stringValue(source, "id", `section-${index}`),
        type:
          source.type === "text" ||
          source.type === "media-text" ||
          source.type === "feature-grid" ||
          source.type === "quote"
            ? source.type
            : "media-text",
        eyebrow: stringValue(source, "eyebrow"),
        title: stringValue(source, "title"),
        body: stringValue(source, "body"),
        imageUrl: stringValue(source, "imageUrl"),
        videoUrl: stringValue(source, "videoUrl"),
        imageAlt: stringValue(source, "imageAlt"),
        background: stringValue(source, "background", "#0b1c2b"),
        textColor: stringValue(source, "textColor", "#ffffff"),
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
        paddingTop: numberValue(source, "paddingTop", 64),
        paddingBottom: numberValue(source, "paddingBottom", 64),
        contentGap: numberValue(source, "contentGap", 32),
        contentPadding: numberValue(source, "contentPadding", 0),
        mediaHeight: numberValue(source, "mediaHeight", 360),
        template: templateValue(source.template),
        headingFont: fontValue(source.headingFont),
        bodyFont: fontValue(source.bodyFont),
        headingScale: numberValue(source, "headingScale", 1),
        bodyScale: numberValue(source, "bodyScale", 1),
        active: typeof source.active === "boolean" ? source.active : true,
      },
    ];
  });
}

function initialStructuredItems(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const source = item as Record<string, unknown>;
    return [{
      title: stringValue(source, "title"),
      description: stringValue(source, "description"),
    }];
  });
}

function structuredItemsToText(
  items: readonly Readonly<{ title: string; description: string }>[],
) {
  return items
    .map((item) => `${item.title} | ${item.description}`)
    .join("\n");
}

function textToStructuredItems(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...descriptionParts] = line.split("|");
      return {
        title: title?.trim() ?? "",
        description: descriptionParts.join("|").trim(),
      };
    });
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: Readonly<{
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}>) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
      />
    </label>
  );
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
    stringValue(content, "headline"),
  );
  const [paragraphs, setParagraphs] = useState(
    Array.isArray(content.paragraphs)
      ? content.paragraphs
          .filter((item): item is string => typeof item === "string")
          .join("\n\n")
      : "",
  );
  const [heroImage, setHeroImage] = useState(
    stringValue(content, "heroImage"),
  );
  const [heroVideo, setHeroVideo] = useState(
    stringValue(content, "heroVideo"),
  );
  const [heroAnimation, setHeroAnimation] = useState(
    stringValue(content, "heroAnimation", "fade"),
  );
  const [design, setDesign] = useState<PageDesign>(
    initialDesign(content.design),
  );
  const [sections, setSections] = useState<PageSection[]>(
    initialSections(content.sections),
  );
  const structuredItemsKey = Array.isArray(content.values)
    ? "values"
    : Array.isArray(content.items)
      ? "items"
      : "items";
  const [structuredItems, setStructuredItems] = useState(
    initialStructuredItems(content[structuredItemsKey]),
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
      design,
      sections,
      [structuredItemsKey]: structuredItems,
    }),
    [
      content,
      design,
      headline,
      paragraphs,
      heroAnimation,
      heroImage,
      heroVideo,
      sections,
      structuredItems,
      structuredItemsKey,
    ],
  );

  function updateDesign(patch: Partial<PageDesign>) {
    setDesign((current) => ({ ...current, ...patch }));
  }

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
        background: design.background,
        textColor: design.textColor,
        animation: "fade",
        align: "left",
        paddingTop: design.sectionSpacing,
        paddingBottom: design.sectionSpacing,
        contentGap: design.cardGap,
        contentPadding: design.cardPadding,
        mediaHeight: 360,
        template: design.template,
        headingFont: design.headingFont,
        bodyFont: design.bodyFont,
        headingScale: design.headingScale,
        bodyScale: design.bodyScale,
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
            Metin, şablon, yazı tipi, renk, boşluk, görsel, video ve animasyon
            alanlarını düzenleyin.
          </p>
        </div>
        <button
          type="button"
          className="button button--secondary"
          onClick={addSection}
        >
          <Plus aria-hidden="true" size={16} />
          Bölüm Ekle
        </button>
      </div>

      <div className="admin-builder-block">
        <h3>Sayfa Geneli</h3>
        <div className="form-grid form-grid--two">
          <label className="field">
            <span>Sayfa Şablonu</span>
            <select
              value={design.template}
              onChange={(event) =>
                updateDesign({
                  template: event.target.value as PageTemplate,
                })
              }
            >
              <option value="standard">Standart</option>
              <option value="split">Bölünmüş</option>
              <option value="editorial">Editoryal</option>
              <option value="cards">Kart Düzeni</option>
            </select>
          </label>
          <label className="field">
            <span>İçerik Genişliği</span>
            <select
              value={design.contentWidth}
              onChange={(event) =>
                updateDesign({
                  contentWidth: event.target
                    .value as PageDesign["contentWidth"],
                })
              }
            >
              <option value="narrow">Dar</option>
              <option value="standard">Standart</option>
              <option value="wide">Geniş</option>
            </select>
          </label>
          <label className="field">
            <span>Başlık Yazı Tipi</span>
            <select
              value={design.headingFont}
              onChange={(event) =>
                updateDesign({
                  headingFont: event.target.value as FontPreset,
                })
              }
            >
              <option value="system">Modern Sistem</option>
              <option value="geometric">Geometrik</option>
              <option value="humanist">Humanist</option>
              <option value="serif">Serif</option>
            </select>
          </label>
          <label className="field">
            <span>Metin Yazı Tipi</span>
            <select
              value={design.bodyFont}
              onChange={(event) =>
                updateDesign({
                  bodyFont: event.target.value as FontPreset,
                })
              }
            >
              <option value="system">Modern Sistem</option>
              <option value="geometric">Geometrik</option>
              <option value="humanist">Humanist</option>
              <option value="serif">Serif</option>
            </select>
          </label>
          <label className="admin-color-field">
            <span>Sayfa Arka Planı</span>
            <input
              type="color"
              value={design.background}
              onChange={(event) =>
                updateDesign({ background: event.target.value })
              }
            />
          </label>
          <label className="admin-color-field">
            <span>Sayfa Metin Rengi</span>
            <input
              type="color"
              value={design.textColor}
              onChange={(event) =>
                updateDesign({ textColor: event.target.value })
              }
            />
          </label>
          <label className="admin-color-field">
            <span>Vurgu Rengi</span>
            <input
              type="color"
              value={design.accentColor}
              onChange={(event) =>
                updateDesign({ accentColor: event.target.value })
              }
            />
          </label>
          <NumberField
            label="Başlık Ölçeği"
            value={design.headingScale}
            min={0.5}
            max={2}
            onChange={(value) => updateDesign({ headingScale: value })}
          />
          <NumberField
            label="Metin Ölçeği"
            value={design.bodyScale}
            min={0.5}
            max={2}
            onChange={(value) => updateDesign({ bodyScale: value })}
          />
          <NumberField
            label="Bölüm Dikey Boşluğu (px)"
            value={design.sectionSpacing}
            min={0}
            max={240}
            onChange={(value) => updateDesign({ sectionSpacing: value })}
          />
          <NumberField
            label="Kartlar Arası Boşluk (px)"
            value={design.cardGap}
            min={0}
            max={120}
            onChange={(value) => updateDesign({ cardGap: value })}
          />
          <NumberField
            label="Kart İç Boşluğu (px)"
            value={design.cardPadding}
            min={0}
            max={120}
            onChange={(value) => updateDesign({ cardPadding: value })}
          />
          <NumberField
            label="Hero Dikey Boşluğu (px)"
            value={design.heroSpacing}
            min={0}
            max={240}
            onChange={(value) => updateDesign({ heroSpacing: value })}
          />
        </div>
      </div>

      <div className="admin-builder-block">
        <h3>Ana Metin ve Hero</h3>
        <div className="form-grid form-grid--two">
          <label className="field">
            <span>Sayfa Ana Başlığı</span>
            <input
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
            />
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
            <select
              value={heroImage}
              onChange={(event) => setHeroImage(event.target.value)}
            >
              <option value="">Görsel seçilmedi</option>
              {!imageOptions.some((option) => option.value === heroImage) &&
              heroImage ? (
                <option value={heroImage}>{heroImage}</option>
              ) : null}
              {imageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Hero Videosu</span>
            <select
              value={heroVideo}
              onChange={(event) => setHeroVideo(event.target.value)}
            >
              <option value="">Video seçilmedi</option>
              {!videoOptions.some((option) => option.value === heroVideo) &&
              heroVideo ? (
                <option value={heroVideo}>{heroVideo}</option>
              ) : null}
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

        <label className="field">
          <span>Kart / Değer Öğeleri</span>
          <textarea
            rows={8}
            value={structuredItemsToText(structuredItems)}
            onChange={(event) =>
              setStructuredItems(textToStructuredItems(event.target.value))
            }
            placeholder="Her satır: Başlık | Açıklama"
          />
          <small>
            Değerlerimiz ve Neden Biz gibi sayfalardaki kart metinlerini bu
            alandan düzenleyebilirsiniz.
          </small>
        </label>
      </div>

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
                      current.filter(
                        (_, sectionIndex) => sectionIndex !== index,
                      ),
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
                <span>Bölüm Şablonu</span>
                <select
                  value={section.template}
                  onChange={(event) =>
                    updateSection(index, {
                      template: event.target.value as PageTemplate,
                    })
                  }
                >
                  <option value="standard">Standart</option>
                  <option value="split">Bölünmüş</option>
                  <option value="editorial">Editoryal</option>
                  <option value="cards">Kart Düzeni</option>
                </select>
              </label>
              <label className="field">
                <span>Başlık Yazı Tipi</span>
                <select
                  value={section.headingFont}
                  onChange={(event) =>
                    updateSection(index, {
                      headingFont: event.target.value as FontPreset,
                    })
                  }
                >
                  <option value="system">Modern Sistem</option>
                  <option value="geometric">Geometrik</option>
                  <option value="humanist">Humanist</option>
                  <option value="serif">Serif</option>
                </select>
              </label>
              <label className="field">
                <span>Metin Yazı Tipi</span>
                <select
                  value={section.bodyFont}
                  onChange={(event) =>
                    updateSection(index, {
                      bodyFont: event.target.value as FontPreset,
                    })
                  }
                >
                  <option value="system">Modern Sistem</option>
                  <option value="geometric">Geometrik</option>
                  <option value="humanist">Humanist</option>
                  <option value="serif">Serif</option>
                </select>
              </label>
              <label className="field">
                <span>Animasyon</span>
                <select
                  value={section.animation}
                  onChange={(event) =>
                    updateSection(index, {
                      animation:
                        event.target.value as PageSection["animation"],
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
                  {!imageOptions.some(
                    (option) => option.value === section.imageUrl,
                  ) && section.imageUrl ? (
                    <option value={section.imageUrl}>
                      {section.imageUrl}
                    </option>
                  ) : null}
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
                  {!videoOptions.some(
                    (option) => option.value === section.videoUrl,
                  ) && section.videoUrl ? (
                    <option value={section.videoUrl}>
                      {section.videoUrl}
                    </option>
                  ) : null}
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
              <NumberField
                label="Üst Boşluk (px)"
                value={section.paddingTop}
                min={0}
                max={240}
                onChange={(value) =>
                  updateSection(index, { paddingTop: value })
                }
              />
              <NumberField
                label="Alt Boşluk (px)"
                value={section.paddingBottom}
                min={0}
                max={240}
                onChange={(value) =>
                  updateSection(index, { paddingBottom: value })
                }
              />
              <NumberField
                label="İçerik Boşluğu (px)"
                value={section.contentGap}
                min={0}
                max={160}
                onChange={(value) =>
                  updateSection(index, { contentGap: value })
                }
              />
              <NumberField
                label="İç Metin Boşluğu (px)"
                value={section.contentPadding}
                min={0}
                max={120}
                onChange={(value) =>
                  updateSection(index, { contentPadding: value })
                }
              />
              <NumberField
                label="Görsel / Video Yüksekliği (px)"
                value={section.mediaHeight}
                min={120}
                max={900}
                onChange={(value) =>
                  updateSection(index, { mediaHeight: value })
                }
              />
              <NumberField
                label="Başlık Ölçeği"
                value={section.headingScale}
                min={0.5}
                max={2}
                onChange={(value) =>
                  updateSection(index, { headingScale: value })
                }
              />
              <NumberField
                label="Metin Ölçeği"
                value={section.bodyScale}
                min={0.5}
                max={2}
                onChange={(value) =>
                  updateSection(index, { bodyScale: value })
                }
              />
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

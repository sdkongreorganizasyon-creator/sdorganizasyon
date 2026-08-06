"use client";

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { ResolvedPageHero } from "@/lib/content/settings";

type MediaOption = Readonly<{
  label: string;
  value: string;
  type: string;
}>;

type EditablePageHero = ResolvedPageHero;

export function PageHeroBuilder({
  initial,
  mediaOptions,
}: Readonly<{
  initial: readonly ResolvedPageHero[];
  mediaOptions: readonly MediaOption[];
}>) {
  const [items, setItems] = useState<EditablePageHero[]>(
    initial.map((item) => ({ ...item })),
  );

  const serialized = useMemo(() => JSON.stringify(items), [items]);
  const images = mediaOptions.filter((item) => item.type.startsWith("image"));
  const videos = mediaOptions.filter((item) => item.type.startsWith("video"));

  function update(index: number, patch: Partial<EditablePageHero>) {
    setItems((current) =>
      current.map((item, rowIndex) =>
        rowIndex === index ? { ...item, ...patch } : item,
      ),
    );
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const clone = [...current];
      const currentItem = clone[index];
      const targetItem = clone[target];
      if (!currentItem || !targetItem) return current;
      clone[index] = targetItem;
      clone[target] = currentItem;
      return clone;
    });
  }

  return (
    <div className="admin-page-hero-builder">
      <input type="hidden" name="pageHeroesJson" value={serialized} />

      <div className="admin-navigation-builder__toolbar">
        <div>
          <h3>Sayfa Başlıkları ve Hero Medyası</h3>
          <p>
            İç sayfalardaki üst etiket, başlık, açıklama, görsel, video ve
            animasyonu yönetin.
          </p>
        </div>
        <button
          type="button"
          className="button button--secondary"
          onClick={() =>
            setItems((current) => [
              ...current,
              {
                id: `page-${Date.now()}`,
                path: "/yeni-sayfa",
                eyebrow: "SAYFA",
                title: "Yeni Sayfa Başlığı",
                description: "",
                image: "",
                video: null,
                animation: "fade",
              },
            ])
          }
        >
          <Plus aria-hidden="true" size={16} />
          Sayfa Başlığı Ekle
        </button>
      </div>

      <div className="admin-page-hero-builder__list">
        {items.map((item, index) => (
          <article key={item.id}>
            <header>
              <div>
                <strong>{item.title || "Adsız sayfa"}</strong>
                <span>{item.path}</span>
              </div>
              <div>
                <button
                  type="button"
                  aria-label="Yukarı taşı"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp aria-hidden="true" size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Aşağı taşı"
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown aria-hidden="true" size={15} />
                </button>
                <button
                  type="button"
                  className="is-danger"
                  aria-label="Sayfa başlığını sil"
                  onClick={() =>
                    setItems((current) =>
                      current.filter((_, rowIndex) => rowIndex !== index),
                    )
                  }
                >
                  <Trash2 aria-hidden="true" size={15} />
                </button>
              </div>
            </header>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Sayfa Yolu</span>
                <input
                  value={item.path}
                  onChange={(event) =>
                    update(index, { path: event.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>Üst Etiket</span>
                <input
                  value={item.eyebrow}
                  onChange={(event) =>
                    update(index, { eyebrow: event.target.value })
                  }
                />
              </label>
            </div>

            <label className="field">
              <span>Başlık</span>
              <input
                value={item.title}
                onChange={(event) =>
                  update(index, { title: event.target.value })
                }
              />
            </label>

            <label className="field">
              <span>Açıklama</span>
              <textarea
                rows={4}
                value={item.description}
                onChange={(event) =>
                  update(index, { description: event.target.value })
                }
              />
            </label>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Hero Görseli</span>
                <select
                  value={item.image}
                  onChange={(event) =>
                    update(index, { image: event.target.value })
                  }
                >
                  <option value="">Görsel seçilmedi</option>
                  {!images.some((option) => option.value === item.image) &&
                  item.image ? (
                    <option value={item.image}>{item.image}</option>
                  ) : null}
                  {images.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Hero Videosu</span>
                <select
                  value={item.video ?? ""}
                  onChange={(event) =>
                    update(index, { video: event.target.value || null })
                  }
                >
                  <option value="">Video seçilmedi</option>
                  {!videos.some((option) => option.value === item.video) &&
                  item.video ? (
                    <option value={item.video}>{item.video}</option>
                  ) : null}
                  {videos.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Animasyon</span>
                <select
                  value={item.animation}
                  onChange={(event) =>
                    update(index, {
                      animation:
                        event.target.value as EditablePageHero["animation"],
                    })
                  }
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                  <option value="scale">Scale</option>
                  <option value="none">Animasyonsuz</option>
                </select>
              </label>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

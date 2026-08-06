"use client";

import {
  ArrowDown,
  ArrowUp,
  ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type MediaOption = Readonly<{
  id: string;
  label: string;
  url: string;
  mimeType?: string | null;
}>;

export function MediaAssetSelect({
  label,
  name,
  options,
  defaultValue = "",
  hint,
  accept = "all",
}: Readonly<{
  label: string;
  name: string;
  options: readonly MediaOption[];
  defaultValue?: string;
  hint?: string;
  accept?: "all" | "image" | "video";
}>) {
  const filtered = options.filter((option) => {
    if (accept === "all") return true;
    if (!option.mimeType) return accept === "image";
    return option.mimeType.startsWith(`${accept}/`);
  });

  const [selectedId, setSelectedId] = useState(defaultValue);
  const selected = filtered.find((option) => option.id === selectedId);

  return (
    <div className="admin-media-select">
      <label className="field">
        <span>{label}</span>
        <select
          name={name}
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
        >
          <option value="">Medya seçilmedi</option>
          {filtered.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {hint ? <small>{hint}</small> : null}
      </label>

      {selected?.url ? (
        <div className="admin-media-select__preview">
          {selected.mimeType?.startsWith("video/") ? (
            <video controls preload="metadata">
              <source src={selected.url} type={selected.mimeType ?? undefined} />
            </video>
          ) : (
            <Image
              src={selected.url}
              alt={selected.label}
              width={480}
              height={280}
            />
          )}
        </div>
      ) : null}

      <Link className="admin-media-select__link" href="/admin/media">
        <ImageIcon aria-hidden="true" size={15} />
        Medya kütüphanesini aç
      </Link>
    </div>
  );
}

type GalleryRow = {
  id: string;
  mediaId: string;
  mediaType: "image" | "video";
  caption: string;
};

export function MediaGalleryBuilder({
  options,
  defaultValue = "",
}: Readonly<{
  options: readonly MediaOption[];
  defaultValue?: string;
}>) {
  const initialRows: GalleryRow[] = defaultValue
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [mediaId = "", mediaType = "image", ...caption] = line.split("|");
      return {
        id: `initial-${index}-${mediaId.trim()}`,
        mediaId: mediaId.trim(),
        mediaType: mediaType.trim() === "video" ? "video" : "image",
        caption: caption.join("|").trim(),
      };
    });

  const [rows, setRows] = useState<GalleryRow[]>(initialRows);

  const serialized = useMemo(
    () =>
      rows
        .filter((row) => row.mediaId)
        .map((row) =>
          [row.mediaId, row.mediaType, row.caption.replaceAll("\n", " ")].join(
            "|",
          ),
        )
        .join("\n"),
    [rows],
  );

  function update(index: number, patch: Partial<GalleryRow>) {
    setRows((current) =>
      current.map((row, rowIndex) =>
        rowIndex === index ? { ...row, ...patch } : row,
      ),
    );
  }

  function move(index: number, direction: -1 | 1) {
    setRows((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const clone = [...current];
      const currentRow = clone[index];
      const targetRow = clone[target];
      if (!currentRow || !targetRow) return current;
      clone[index] = targetRow;
      clone[target] = currentRow;
      return clone;
    });
  }

  return (
    <div className="admin-gallery-builder">
      <input type="hidden" name="galleryMediaIds" value={serialized} />

      <div className="admin-gallery-builder__header">
        <div>
          <strong>Proje Galerisi</strong>
          <p>Görsel ve videoları seçin, sıralayın ve açıklama ekleyin.</p>
        </div>
        <button
          type="button"
          onClick={() =>
            setRows((current) => [
              ...current,
              {
                id: crypto.randomUUID(),
                mediaId: "",
                mediaType: "image",
                caption: "",
              },
            ])
          }
        >
          <Plus aria-hidden="true" size={16} />
          Medya Ekle
        </button>
      </div>

      {rows.length ? (
        <div className="admin-gallery-builder__rows">
          {rows.map((row, index) => {
            const selected = options.find((option) => option.id === row.mediaId);
            return (
              <article key={row.id}>
                {selected?.url ? (
                  <div className="admin-gallery-builder__preview">
                    {selected.mimeType?.startsWith("video/") ? (
                      <video controls preload="metadata">
                        <source
                          src={selected.url}
                          type={selected.mimeType ?? undefined}
                        />
                      </video>
                    ) : (
                      <Image
                        src={selected.url}
                        alt={selected.label}
                        width={320}
                        height={180}
                      />
                    )}
                  </div>
                ) : null}

                <div className="admin-gallery-builder__fields">
                  <label className="field">
                    <span>Medya</span>
                    <select
                      value={row.mediaId}
                      onChange={(event) => {
                        const option = options.find(
                          (item) => item.id === event.target.value,
                        );
                        update(index, {
                          mediaId: event.target.value,
                          mediaType: option?.mimeType?.startsWith("video/")
                            ? "video"
                            : "image",
                        });
                      }}
                    >
                      <option value="">Seçiniz</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="field">
                    <span>Açıklama</span>
                    <input
                      value={row.caption}
                      onChange={(event) =>
                        update(index, { caption: event.target.value })
                      }
                    />
                  </label>
                </div>

                <div className="admin-gallery-builder__actions">
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
                    disabled={index === rows.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown aria-hidden="true" size={15} />
                  </button>
                  <button
                    type="button"
                    className="is-danger"
                    aria-label="Galeriden kaldır"
                    onClick={() =>
                      setRows((current) =>
                        current.filter((_, rowIndex) => rowIndex !== index),
                      )
                    }
                  >
                    <Trash2 aria-hidden="true" size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="admin-help">
          Galeri boş. “Medya Ekle” ile görsel veya video seçebilirsiniz.
        </p>
      )}
    </div>
  );
}

"use client";

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { Json } from "@/types/database";

function objectValue(value: Json): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function lines(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

type ProcessGroup = {
  id: string;
  title: string;
  items: string;
};

export function ProcessContentBuilder({
  initial,
}: Readonly<{ initial: Json }>) {
  const source = objectValue(initial);
  const [number, setNumber] = useState(
    typeof source.number === "string" ? source.number : "",
  );
  const [items, setItems] = useState(lines(source.items).join("\n"));
  const [closing, setClosing] = useState(
    typeof source.closing === "string" ? source.closing : "",
  );
  const [outputs, setOutputs] = useState(lines(source.outputs).join("\n"));
  const [groups, setGroups] = useState<ProcessGroup[]>(
    Array.isArray(source.groups)
      ? source.groups.flatMap((group, index) => {
          if (!group || typeof group !== "object" || Array.isArray(group)) {
            return [];
          }
          const record = group as Record<string, unknown>;
          return [
            {
              id: `group-${index}`,
              title:
                typeof record.title === "string" ? record.title : "",
              items: lines(record.items).join("\n"),
            },
          ];
        })
      : [],
  );

  const payload = useMemo(
    () => ({
      ...source,
      number,
      items: items
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      closing,
      outputs: outputs
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      groups: groups.map((group) => ({
        title: group.title,
        items: group.items
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      })),
    }),
    [closing, groups, items, number, outputs, source],
  );

  function move(index: number, direction: -1 | 1) {
    setGroups((current) => {
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
    <div className="admin-structured-builder">
      <input type="hidden" name="body" value={JSON.stringify(payload)} />

      <div className="form-grid form-grid--two">
        <label className="field">
          <span>Süreç Etiketi / Numara</span>
          <input
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span>Ana Adımlar</span>
        <textarea
          rows={9}
          value={items}
          onChange={(event) => setItems(event.target.value)}
          placeholder="Her satıra bir adım yazın."
        />
      </label>

      <label className="field">
        <span>Kapanış Metni</span>
        <textarea
          rows={4}
          value={closing}
          onChange={(event) => setClosing(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Çıktılar</span>
        <textarea
          rows={7}
          value={outputs}
          onChange={(event) => setOutputs(event.target.value)}
          placeholder="Her satıra bir çıktı yazın."
        />
      </label>

      <div className="admin-structured-builder__header">
        <div>
          <h3>Alt Gruplar</h3>
          <p>Etkinlik öncesi, sırasında ve sonrası gibi gruplar ekleyin.</p>
        </div>
        <button
          type="button"
          onClick={() =>
            setGroups((current) => [
              ...current,
              {
                id: crypto.randomUUID(),
                title: "Yeni Grup",
                items: "",
              },
            ])
          }
        >
          <Plus aria-hidden="true" size={16} />
          Grup Ekle
        </button>
      </div>

      <div className="admin-structured-builder__list">
        {groups.map((group, index) => (
          <article key={group.id}>
            <header>
              <strong>{group.title || `Grup ${index + 1}`}</strong>
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
                  disabled={index === groups.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown aria-hidden="true" size={15} />
                </button>
                <button
                  type="button"
                  className="is-danger"
                  aria-label="Grubu sil"
                  onClick={() =>
                    setGroups((current) =>
                      current.filter((_, rowIndex) => rowIndex !== index),
                    )
                  }
                >
                  <Trash2 aria-hidden="true" size={15} />
                </button>
              </div>
            </header>
            <label className="field">
              <span>Grup Başlığı</span>
              <input
                value={group.title}
                onChange={(event) =>
                  setGroups((current) =>
                    current.map((item, rowIndex) =>
                      rowIndex === index
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  )
                }
              />
            </label>
            <label className="field">
              <span>Maddeler</span>
              <textarea
                rows={6}
                value={group.items}
                onChange={(event) =>
                  setGroups((current) =>
                    current.map((item, rowIndex) =>
                      rowIndex === index
                        ? { ...item, items: event.target.value }
                        : item,
                    ),
                  )
                }
                placeholder="Her satıra bir madde yazın."
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string;
  bullets: string;
};

export function LegalContentBuilder({
  initial,
}: Readonly<{ initial: Json }>) {
  const source = objectValue(initial);
  const [headline, setHeadline] = useState(
    typeof source.headline === "string" ? source.headline : "",
  );
  const [sections, setSections] = useState<LegalSection[]>(
    Array.isArray(source.sections)
      ? source.sections.flatMap((section, index) => {
          if (
            !section ||
            typeof section !== "object" ||
            Array.isArray(section)
          ) {
            return [];
          }
          const record = section as Record<string, unknown>;
          return [
            {
              id: `legal-${index}`,
              title:
                typeof record.title === "string" ? record.title : "",
              paragraphs: lines(record.paragraphs).join("\n\n"),
              bullets: lines(record.bullets).join("\n"),
            },
          ];
        })
      : [],
  );

  const payload = useMemo(
    () => ({
      ...source,
      headline,
      sections: sections.map((section) => ({
        title: section.title || null,
        paragraphs: section.paragraphs
          .split(/\n\s*\n/)
          .map((item) => item.trim())
          .filter(Boolean),
        bullets: section.bullets
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      })),
    }),
    [headline, sections, source],
  );

  function update(index: number, patch: Partial<LegalSection>) {
    setSections((current) =>
      current.map((section, rowIndex) =>
        rowIndex === index ? { ...section, ...patch } : section,
      ),
    );
  }

  function move(index: number, direction: -1 | 1) {
    setSections((current) => {
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
    <div className="admin-structured-builder">
      <input type="hidden" name="body" value={JSON.stringify(payload)} />

      <label className="field">
        <span>Sayfa Ana Başlığı</span>
        <input
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
        />
      </label>

      <div className="admin-structured-builder__header">
        <div>
          <h3>Metin Bölümleri</h3>
          <p>Başlık, paragraflar ve madde listelerini ayrı ayrı yönetin.</p>
        </div>
        <button
          type="button"
          onClick={() =>
            setSections((current) => [
              ...current,
              {
                id: crypto.randomUUID(),
                title: "Yeni Bölüm",
                paragraphs: "",
                bullets: "",
              },
            ])
          }
        >
          <Plus aria-hidden="true" size={16} />
          Bölüm Ekle
        </button>
      </div>

      <div className="admin-structured-builder__list">
        {sections.map((section, index) => (
          <article key={section.id}>
            <header>
              <strong>{section.title || `Bölüm ${index + 1}`}</strong>
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
                  disabled={index === sections.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown aria-hidden="true" size={15} />
                </button>
                <button
                  type="button"
                  className="is-danger"
                  aria-label="Bölümü sil"
                  onClick={() =>
                    setSections((current) =>
                      current.filter((_, rowIndex) => rowIndex !== index),
                    )
                  }
                >
                  <Trash2 aria-hidden="true" size={15} />
                </button>
              </div>
            </header>

            <label className="field">
              <span>Bölüm Başlığı</span>
              <input
                value={section.title}
                onChange={(event) =>
                  update(index, { title: event.target.value })
                }
              />
            </label>
            <label className="field">
              <span>Paragraflar</span>
              <textarea
                rows={8}
                value={section.paragraphs}
                onChange={(event) =>
                  update(index, { paragraphs: event.target.value })
                }
                placeholder="Paragrafları bir boş satırla ayırın."
              />
            </label>
            <label className="field">
              <span>Madde Listesi</span>
              <textarea
                rows={6}
                value={section.bullets}
                onChange={(event) =>
                  update(index, { bullets: event.target.value })
                }
                placeholder="Her satıra bir madde yazın."
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}

"use client";

import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import type {
  ResolvedNavigationChild,
  ResolvedNavigationItem,
} from "@/lib/content/settings";

type EditableChild = ResolvedNavigationChild;
type EditableItem = ResolvedNavigationItem;

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function childrenToText(children: readonly EditableChild[] | undefined) {
  return (children ?? [])
    .map((item) => `${item.label} | ${item.href}`)
    .join("\n");
}

function textToChildren(value: string, parentId: string): EditableChild[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line, index) => {
      const [label, href] = line.split("|").map((part) => part.trim());
      if (!label || !href) return [];
      return [
        {
          id: `${parentId}-${slugify(label) || index}`,
          label,
          href,
          visible: true,
        },
      ];
    });
}

export function NavigationBuilder({
  initial,
}: Readonly<{ initial: readonly ResolvedNavigationItem[] }>) {
  const [items, setItems] = useState<EditableItem[]>(
    initial.map((item) => ({
      ...item,
      children: item.children?.map((child) => ({ ...child })) ?? [],
    })),
  );

  const serialized = useMemo(() => JSON.stringify(items), [items]);

  function updateItem(index: number, patch: Partial<EditableItem>) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    );
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
  }

  function addItem() {
    const id = `menu-${Date.now()}`;
    setItems((current) => [
      ...current,
      {
        id,
        label: "Yeni Menü",
        href: "/",
        visible: true,
        showInHeader: true,
        showInFooter: true,
        children: [],
      },
    ]);
  }

  return (
    <div className="admin-navigation-builder">
      <input type="hidden" name="navigationJson" value={serialized} />

      <div className="admin-navigation-builder__toolbar">
        <div>
          <h3>Menü Yapısı</h3>
          <p>
            Menü başlığı, bağlantı, görünürlük ve alt menüleri yönetin.
            Alt menülerde her satırı <code>Başlık | /baglanti</code> biçiminde
            yazın.
          </p>
        </div>
        <button type="button" className="button button--secondary" onClick={addItem}>
          <Plus aria-hidden="true" size={16} />
          Menü Ekle
        </button>
      </div>

      <div className="admin-navigation-list">
        {items.map((item, index) => (
          <article className="admin-navigation-item" key={item.id}>
            <header>
              <strong>{item.label || "Adsız menü"}</strong>
              <div>
                <button
                  type="button"
                  aria-label="Yukarı taşı"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                >
                  <ChevronUp aria-hidden="true" size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Aşağı taşı"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                >
                  <ChevronDown aria-hidden="true" size={16} />
                </button>
                <button
                  type="button"
                  aria-label={item.visible ? "Menüyü gizle" : "Menüyü göster"}
                  onClick={() => updateItem(index, { visible: !item.visible })}
                >
                  {item.visible ? (
                    <Eye aria-hidden="true" size={16} />
                  ) : (
                    <EyeOff aria-hidden="true" size={16} />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Menüyü sil"
                  className="is-danger"
                  onClick={() =>
                    setItems((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </div>
            </header>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Menü Başlığı</span>
                <input
                  value={item.label}
                  onChange={(event) =>
                    updateItem(index, { label: event.target.value })
                  }
                />
              </label>
              <label className="field">
                <span>Bağlantı</span>
                <input
                  value={item.href}
                  onChange={(event) =>
                    updateItem(index, { href: event.target.value })
                  }
                />
              </label>
            </div>

            <div className="admin-checkbox-grid">
              <label>
                <input
                  type="checkbox"
                  checked={item.visible}
                  onChange={(event) =>
                    updateItem(index, { visible: event.target.checked })
                  }
                />
                <span>Aktif</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={item.showInHeader}
                  onChange={(event) =>
                    updateItem(index, { showInHeader: event.target.checked })
                  }
                />
                <span>Header’da göster</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={item.showInFooter}
                  onChange={(event) =>
                    updateItem(index, { showInFooter: event.target.checked })
                  }
                />
                <span>Footer’da göster</span>
              </label>
            </div>

            <label className="field">
              <span>Alt Menü Öğeleri</span>
              <textarea
                rows={Math.max(3, item.children?.length ?? 0)}
                defaultValue={childrenToText(item.children)}
                onChange={(event) =>
                  updateItem(index, {
                    children: textToChildren(event.target.value, item.id),
                  })
                }
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}

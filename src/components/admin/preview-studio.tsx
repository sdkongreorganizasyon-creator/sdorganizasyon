"use client";

import {
  ExternalLink,
  Laptop,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const widths = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
} as const;

type Viewport = keyof typeof widths;

export function PreviewStudio({
  initialPath,
}: Readonly<{ initialPath: string }>) {
  const [path, setPath] = useState(initialPath);
  const [activePath, setActivePath] = useState(initialPath);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [revision, setRevision] = useState(0);

  const src = useMemo(
    () =>
      `/api/admin/preview?path=${encodeURIComponent(activePath)}&revision=${revision}`,
    [activePath, revision],
  );

  return (
    <section className="admin-preview-studio">
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">TASLAK ÖNİZLEME</p>
          <h1>Canlıya Almadan Önce Kontrol Edin</h1>
          <p>
            Taslak içerikler yalnız sizin oturumunuzda görünür. Ziyaretçiler
            yayımlanmış siteyi görmeye devam eder.
          </p>
        </div>
        <div className="admin-page-heading__actions">
          <Link
            className="button button--secondary"
            href={activePath}
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={17} />
            Yeni Sekmede Aç
          </Link>
          <Link
            className="button button--secondary"
            href="/api/admin/preview/disable"
          >
            Önizlemeyi Kapat
          </Link>
        </div>
      </div>

      <div className="admin-preview-studio__toolbar">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setActivePath(path.startsWith("/") ? path : `/${path}`);
            setRevision((value) => value + 1);
          }}
        >
          <label>
            <span>Önizlenecek Sayfa</span>
            <input
              value={path}
              onChange={(event) => setPath(event.target.value)}
              placeholder="/"
            />
          </label>
          <button type="submit">Sayfayı Aç</button>
        </form>

        <div className="admin-preview-studio__devices">
          {[
            ["desktop", Monitor, "Masaüstü"],
            ["tablet", Tablet, "Tablet"],
            ["mobile", Smartphone, "Mobil"],
          ].map(([id, Icon, label]) => (
            <button
              key={String(id)}
              type="button"
              className={viewport === id ? "is-active" : undefined}
              aria-label={String(label)}
              onClick={() => setViewport(id as Viewport)}
            >
              <Icon aria-hidden="true" size={17} />
              <span>{String(label)}</span>
            </button>
          ))}
          <button
            type="button"
            aria-label="Önizlemeyi yenile"
            onClick={() => setRevision((value) => value + 1)}
          >
            <RefreshCw aria-hidden="true" size={17} />
            <span>Yenile</span>
          </button>
        </div>
      </div>

      <div className="admin-preview-studio__canvas">
        <div
          className={`admin-preview-studio__device is-${viewport}`}
          style={{ width: widths[viewport] }}
        >
          <div className="admin-preview-studio__device-bar">
            {viewport === "desktop" ? (
              <Laptop aria-hidden="true" size={16} />
            ) : viewport === "tablet" ? (
              <Tablet aria-hidden="true" size={16} />
            ) : (
              <Smartphone aria-hidden="true" size={16} />
            )}
            <span>{activePath}</span>
          </div>
          <iframe
            key={src}
            src={src}
            title={`Taslak önizleme: ${activePath}`}
          />
        </div>
      </div>
    </section>
  );
}

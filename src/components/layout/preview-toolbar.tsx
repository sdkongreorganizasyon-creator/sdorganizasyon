"use client";

import { Eye, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export function PreviewToolbar() {
  return (
    <aside className="preview-toolbar" aria-label="Taslak önizleme araçları">
      <div>
        <Eye aria-hidden="true" size={18} />
        <span>
          <strong>Taslak önizleme</strong>
          <small>Bu görünüm henüz canlı sitede yayımlanmadı.</small>
        </span>
      </div>
      <nav>
        <Link href="/admin/content" prefetch={false}>
          <Settings aria-hidden="true" size={16} />
          Yönetime Dön
        </Link>
        <Link href="/api/admin/preview/disable" prefetch={false}>
          <LogOut aria-hidden="true" size={16} />
          Önizlemeyi Kapat
        </Link>
      </nav>
    </aside>
  );
}

"use client";

import {
  ExternalLink,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import { AdminNav } from "@/components/admin/admin-nav";
import { Logo } from "@/components/brand/logo";
import type { UserRole } from "@/types/database";

type AdminShellProps = Readonly<{
  children: ReactNode;
  userEmail: string;
  fullName?: string | null;
  role?: UserRole;
}>;

const pageLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/content": "İçerikler",
  "/admin/projects": "Projeler",
  "/admin/references": "Referanslar",
  "/admin/messages": "İletişim Talepleri",
  "/admin/quotes": "Teklif Talepleri",
  "/admin/media": "Medya Kütüphanesi",
  "/admin/settings": "Site Ayarları",
  "/admin/users": "Kullanıcılar",
  "/admin/audit": "Audit Log",
};

export function AdminShell({
  children,
  userEmail,
  fullName,
  role,
}: AdminShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLabel =
    Object.entries(pageLabels)
      .filter(([path]) =>
        path === "/admin" ? pathname === path : pathname.startsWith(path),
      )
      .sort(([a], [b]) => b.length - a.length)[0]?.[1] ?? "Yönetim Paneli";

  return (
    <div
      className={`admin-shell${collapsed ? " is-collapsed" : ""}${
        mobileOpen ? " is-mobile-open" : ""
      }`}
    >
      <button
        className="admin-mobile-backdrop"
        type="button"
        aria-label="Menüyü kapat"
        onClick={() => setMobileOpen(false)}
      />

      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Logo compact className="admin-sidebar__logo" />
          <div>
            <strong>SDKONGRE</strong>
            <span>Yönetim Paneli</span>
          </div>
          <button
            className="admin-sidebar__mobile-close"
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setMobileOpen(false)}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <AdminNav
          role={role}
          collapsed={collapsed}
          onNavigate={() => setMobileOpen(false)}
        />

        <div className="admin-sidebar__user">
          <span className="admin-avatar">
            {(fullName || userEmail).slice(0, 1).toUpperCase()}
          </span>
          <div>
            <strong>{fullName || userEmail}</strong>
            <span>{role ?? "viewer"}</span>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <button
              className="admin-mobile-trigger"
              type="button"
              aria-label="Yönetim menüsünü aç"
              onClick={() => setMobileOpen(true)}
            >
              <Menu aria-hidden="true" />
            </button>
            <button
              className="admin-collapse-trigger"
              type="button"
              aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
              onClick={() => setCollapsed((value) => !value)}
            >
              {collapsed ? (
                <PanelLeftOpen aria-hidden="true" />
              ) : (
                <PanelLeftClose aria-hidden="true" />
              )}
            </button>
            <div>
              <p className="admin-breadcrumb">Yönetim / {currentLabel}</p>
              <strong>{currentLabel}</strong>
            </div>
          </div>

          <div className="admin-topbar__actions">
            <Link href="/" target="_blank">
              <ExternalLink aria-hidden="true" size={17} />
              <span>Siteyi Görüntüle</span>
            </Link>
            <span className="admin-role">{role ?? "viewer"}</span>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

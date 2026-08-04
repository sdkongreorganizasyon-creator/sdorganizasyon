import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { AdminNav } from "@/components/admin/admin-nav";
import type { UserRole } from "@/types/database";

type AdminShellProps = Readonly<{
  children: ReactNode;
  userEmail: string;
  fullName?: string | null;
  role?: UserRole;
}>;

export function AdminShell({
  children,
  userEmail,
  fullName,
  role,
}: AdminShellProps) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Logo compact className="admin-sidebar__logo" />
          <div>
            <strong>SDKONGRE</strong>
            <span>Yönetim Paneli</span>
          </div>
        </div>

        <AdminNav role={role} />

        <div className="admin-sidebar__user">
          <strong>{fullName || userEmail}</strong>
          <span>{role ?? "viewer"}</span>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">SDKONGRE CMS</p>
            <strong>{fullName || userEmail}</strong>
          </div>
          <span className="admin-role">{role}</span>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

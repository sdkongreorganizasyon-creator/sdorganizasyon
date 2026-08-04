"use client";

import {
  Activity,
  BookOpenText,
  FileText,
  FolderKanban,
  Gauge,
  ImageIcon,
  Inbox,
  LogOut,
  MessageSquareQuote,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAction } from "@/app/admin/actions";
import type { UserRole } from "@/types/database";

type NavItem = Readonly<{
  href: string;
  label: string;
  icon: typeof Gauge;
  roles: readonly UserRole[] | "all";
}>;

const contentRoles: readonly UserRole[] = [
  "super_admin",
  "admin",
  "editor",
  "content_author",
];

const leadRoles: readonly UserRole[] = [
  "super_admin",
  "admin",
  "sales_ops",
  "viewer",
];

const items: readonly NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: Gauge, roles: "all" },
  {
    href: "/admin/content",
    label: "İçerikler",
    icon: BookOpenText,
    roles: contentRoles,
  },
  {
    href: "/admin/projects",
    label: "Projeler",
    icon: FolderKanban,
    roles: contentRoles,
  },
  {
    href: "/admin/references",
    label: "Referanslar",
    icon: ShieldCheck,
    roles: contentRoles,
  },
  {
    href: "/admin/messages",
    label: "İletişim",
    icon: Inbox,
    roles: leadRoles,
  },
  {
    href: "/admin/quotes",
    label: "Teklifler",
    icon: MessageSquareQuote,
    roles: leadRoles,
  },
  {
    href: "/admin/media",
    label: "Medya",
    icon: ImageIcon,
    roles: contentRoles,
  },
  {
    href: "/admin/settings",
    label: "Ayarlar",
    icon: Settings,
    roles: ["super_admin", "admin", "editor"],
  },
  {
    href: "/admin/users",
    label: "Kullanıcılar",
    icon: Users,
    roles: ["super_admin"],
  },
  {
    href: "/admin/audit",
    label: "Audit Log",
    icon: Activity,
    roles: ["super_admin", "admin"],
  },
  { href: "/", label: "Siteyi Görüntüle", icon: FileText, roles: "all" },
];

export function AdminNav({
  role,
}: Readonly<{ role: UserRole | undefined }>) {
  const pathname = usePathname();

  const visibleItems = items.filter(
    (item) =>
      item.roles === "all" ||
      (role ? item.roles.includes(role) : false),
  );

  return (
    <nav className="admin-nav" aria-label="Yönetim paneli">
      <ul>
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                className={active ? "is-active" : undefined}
                href={item.href}
              >
                <Icon aria-hidden="true" size={18} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <form action={logoutAction}>
        <button type="submit">
          <LogOut aria-hidden="true" size={18} />
          <span>Çıkış Yap</span>
        </button>
      </form>
    </nav>
  );
}

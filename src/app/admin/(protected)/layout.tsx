import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { SetupRequired } from "@/components/admin/setup-required";
import { requireAdmin } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

type ProtectedAdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function ProtectedAdminLayout({
  children,
}: ProtectedAdminLayoutProps) {
  const context = await requireAdmin();

  if (!context.configured) {
    return <SetupRequired />;
  }

  return (
    <AdminShell
      userEmail={context.user?.email ?? ""}
      fullName={context.profile?.full_name}
      role={context.profile?.role}
    >
      {children}
    </AdminShell>
  );
}

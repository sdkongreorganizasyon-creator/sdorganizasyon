import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { SetupRequired } from "@/components/admin/setup-required";
import { getAdminContext } from "@/lib/auth/require-admin";

export const metadata: Metadata = {
  title: "Yönetim Paneli Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const context = await getAdminContext();

  if (!context.configured) {
    return <SetupRequired />;
  }

  if (context.user && context.profile?.active) {
    redirect("/admin");
  }

  return (
    <main className="admin-login">
      <LoginForm />
    </main>
  );
}

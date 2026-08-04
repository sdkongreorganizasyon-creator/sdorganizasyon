import {
  BookOpenText,
  FolderKanban,
  Inbox,
  MessageSquareQuote,
} from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: contentCount },
    { count: projectCount },
    { count: messageCount },
    { count: quoteCount },
  ] = await Promise.all([
    supabase
      .from("pages")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  const cards = [
    {
      label: "Sayfa İçerikleri",
      value: contentCount ?? 0,
      href: "/admin/content",
      icon: BookOpenText,
    },
    {
      label: "Projeler",
      value: projectCount ?? 0,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Yeni Mesajlar",
      value: messageCount ?? 0,
      href: "/admin/messages",
      icon: Inbox,
    },
    {
      label: "Yeni Teklifler",
      value: quoteCount ?? 0,
      href: "/admin/quotes",
      icon: MessageSquareQuote,
    },
  ];

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">DASHBOARD</p>
          <h1>Genel Durum</h1>
          <p>İçerik, proje ve taleplerin güncel görünümü.</p>
        </div>
      </div>

      <div className="admin-stat-grid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link className="admin-stat-card" href={card.href} key={card.label}>
              <Icon aria-hidden="true" />
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </Link>
          );
        })}
      </div>

      <section className="admin-panel">
        <h2>Başlangıç Kontrolü</h2>
        <ul className="admin-check-list">
          <li>Gerçek iletişim bilgilerini Vercel environment değerlerine ekleyin.</li>
          <li>Seed scriptini çalıştırarak kaynak içerikleri Supabase'e aktarın.</li>
          <li>Gerçek proje ve referansları kullanım izinleriyle birlikte ekleyin.</li>
          <li>Yasal metinleri canlı yayın öncesi yetkili kişiyle doğrulayın.</li>
          <li>Natro domain geçişini tüm testler tamamlandıktan sonra yapın.</li>
        </ul>
      </section>
    </>
  );
}

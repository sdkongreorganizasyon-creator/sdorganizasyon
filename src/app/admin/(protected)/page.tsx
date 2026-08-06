import {
  BookOpenText,
  CalendarClock,
  CheckCircle2,
  FilePenLine,
  FolderKanban,
  ImageIcon,
  Inbox,
  MessageSquareQuote,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { getResolvedSiteSettings } from "@/lib/content/settings";
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const settings = await getResolvedSiteSettings();

  const [
    { count: contentCount },
    { count: publishedCount },
    { count: draftCount },
    { count: scheduledCount },
    { count: projectCount },
    { count: referenceCount },
    { count: messageCount },
    { count: quoteCount },
    { data: recentMessages },
    { data: recentQuotes },
    { data: recentAudit },
  ] = await Promise.all([
    supabase.from("pages").select("id", { count: "exact", head: true }),
    supabase
      .from("pages")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("pages")
      .select("id", { count: "exact", head: true })
      .in("status", ["draft", "review"]),
    supabase
      .from("pages")
      .select("id", { count: "exact", head: true })
      .eq("status", "scheduled"),
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("references").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("contact_messages")
      .select("id,full_name,email,subject,status,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("quote_requests")
      .select("id,full_name,email,event_type,status,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("audit_logs")
      .select("id,action,entity_type,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const cards = [
    {
      label: "Toplam İçerik",
      value: contentCount ?? 0,
      href: "/admin/content",
      icon: BookOpenText,
    },
    {
      label: "Yayındaki İçerik",
      value: publishedCount ?? 0,
      href: "/admin/content",
      icon: CheckCircle2,
    },
    {
      label: "Taslak / İnceleme",
      value: draftCount ?? 0,
      href: "/admin/content",
      icon: FilePenLine,
    },
    {
      label: "Planlanmış",
      value: scheduledCount ?? 0,
      href: "/admin/content",
      icon: CalendarClock,
    },
    {
      label: "Projeler",
      value: projectCount ?? 0,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Referanslar",
      value: referenceCount ?? 0,
      href: "/admin/references",
      icon: ShieldCheck,
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

  const missingSettings = [
    !settings.contact.phone && "Telefon bilgisi eksik",
    !settings.contact.email && "E-posta bilgisi eksik",
    !settings.contact.address && "Adres bilgisi eksik",
    !settings.hero.poster && "Hero görseli eksik",
    !settings.branding.headerLogoUrl && "Header logosu eksik",
  ].filter((item): item is string => Boolean(item));

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">DASHBOARD</p>
          <h1>Genel Durum</h1>
          <p>
            İçerik, talepler, entegrasyonlar ve eksik ayarların güncel görünümü.
          </p>
        </div>
        <div className="admin-page-heading__actions">
          <Link className="button button--secondary" href="/admin/settings">
            <Settings aria-hidden="true" size={17} />
            Site Ayarları
          </Link>
          <Link className="button button--secondary" href="/admin/media">
            <ImageIcon aria-hidden="true" size={17} />
            Medya
          </Link>
        </div>
      </div>

      <div className="admin-stat-grid admin-stat-grid--wide">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link className="admin-stat-card" href={card.href} key={card.label}>
              <span className="admin-stat-card__icon">
                <Icon aria-hidden="true" />
              </span>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel__heading">
            <div>
              <h2>Son Gelen Talepler</h2>
              <p>İletişim ve teklif formlarının son kayıtları.</p>
            </div>
          </div>

          <div className="admin-feed">
            {[...(recentMessages ?? []).map((item) => ({
              id: item.id,
              name: item.full_name,
              detail: item.subject || item.email,
              status: item.status,
              href: "/admin/messages",
              type: "Mesaj",
              createdAt: item.created_at,
            })), ...(recentQuotes ?? []).map((item) => ({
              id: item.id,
              name: item.full_name,
              detail: item.event_type || item.email,
              status: item.status,
              href: "/admin/quotes",
              type: "Teklif",
              createdAt: item.created_at,
            }))]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 8)
              .map((item) => (
                <Link href={item.href} key={`${item.type}-${item.id}`}>
                  <span className="admin-feed__avatar">
                    {(item.name || item.type).slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <strong>{item.name || item.type}</strong>
                    <p>{item.detail || "Detay bulunmuyor"}</p>
                  </div>
                  <span className={`admin-badge is-${item.status}`}>
                    {item.status}
                  </span>
                </Link>
              ))}
          </div>
        </section>

        <section className="admin-panel">
          <h2>Sistem Durumu</h2>
          <div className="admin-integration-grid">
            {[
              ["Supabase Public", isSupabaseConfigured()],
              ["Supabase Admin", isSupabaseAdminConfigured()],
              [
                "E-posta",
                Boolean(
                  process.env.RESEND_API_KEY?.trim() &&
                    process.env.CONTACT_TO_EMAIL?.trim(),
                ),
              ],
              [
                "Turnstile",
                Boolean(
                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() &&
                    process.env.TURNSTILE_SECRET_KEY?.trim(),
                ),
              ],
            ].map(([label, connected]) => (
              <article key={String(label)}>
                <span
                  className={
                    connected
                      ? "admin-status-dot is-connected"
                      : "admin-status-dot"
                  }
                />
                <div>
                  <strong>{String(label)}</strong>
                  <p>{connected ? "Bağlı" : "Bağlı değil"}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <h2>Eksik Ayarlar</h2>
          {missingSettings.length ? (
            <ul className="admin-check-list">
              {missingSettings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <div className="admin-empty-success">
              <CheckCircle2 aria-hidden="true" />
              <p>Temel site ayarları tamamlandı.</p>
            </div>
          )}
          <Link className="admin-inline-link" href="/admin/settings">
            Ayarları düzenle
          </Link>
        </section>

        <section className="admin-panel">
          <h2>Son Audit Kayıtları</h2>
          <div className="admin-audit-mini">
            {(recentAudit ?? []).map((item) => (
              <div key={item.id}>
                <strong>{item.action}</strong>
                <span>{item.entity_type}</span>
                <time dateTime={item.created_at}>
                  {new Date(item.created_at).toLocaleString("tr-TR")}
                </time>
              </div>
            ))}
          </div>
          <Link className="admin-inline-link" href="/admin/audit">
            Tüm kayıtları görüntüle
          </Link>
        </section>
      </div>
    </>
  );
}

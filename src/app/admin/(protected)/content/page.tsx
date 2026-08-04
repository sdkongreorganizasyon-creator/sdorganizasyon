import { Edit3 } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

type Group = Readonly<{
  title: string;
  entity: "pages" | "services" | "process_steps" | "legal_documents";
  items: readonly Readonly<{
    id: string;
    title: string;
    status: string;
    updated_at: string;
  }>[];
}>;

export default async function AdminContentPage() {
  const supabase = await createClient();

  const [pages, services, process, legal] = await Promise.all([
    supabase
      .from("pages")
      .select("id,title,status,updated_at")
      .order("title"),
    supabase
      .from("services")
      .select("id,title,status,updated_at")
      .order("category")
      .order("order_no"),
    supabase
      .from("process_steps")
      .select("id,title,status,updated_at")
      .order("order_no"),
    supabase
      .from("legal_documents")
      .select("id,title,status,updated_at")
      .order("title"),
  ]);

  const groups: Group[] = [
    { title: "Kurumsal ve Genel Sayfalar", entity: "pages", items: pages.data ?? [] },
    { title: "Hizmetler", entity: "services", items: services.data ?? [] },
    { title: "Organizasyon Süreci", entity: "process_steps", items: process.data ?? [] },
    { title: "Yasal Metinler", entity: "legal_documents", items: legal.data ?? [] },
  ];

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">İÇERİK YÖNETİMİ</p>
          <h1>Sayfa İçerikleri</h1>
          <p>Kaynak metinleri, yayın durumlarını ve SEO alanlarını yönetin.</p>
        </div>
      </div>

      <div className="admin-content-groups">
        {groups.map((group) => (
          <section className="admin-panel" key={group.entity}>
            <div className="admin-panel__heading">
              <h2>{group.title}</h2>
              <span>{group.items.length} kayıt</span>
            </div>

            {group.items.length ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Başlık</th>
                      <th>Durum</th>
                      <th>Güncelleme</th>
                      <th aria-label="İşlem" />
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>
                          <span className={`status-badge status-${item.status}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {new Intl.DateTimeFormat("tr-TR", {
                            dateStyle: "medium",
                          }).format(new Date(item.updated_at))}
                        </td>
                        <td>
                          <Link
                            className="admin-icon-link"
                            href={`/admin/content/${group.entity}/${item.id}`}
                            aria-label={`${item.title} içeriğini düzenle`}
                          >
                            <Edit3 aria-hidden="true" size={17} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="admin-help">
                Kayıt bulunamadı. Önce `npm run seed:supabase` komutunu
                çalıştırın.
              </p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}

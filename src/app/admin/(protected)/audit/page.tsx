import { createClient } from "@/lib/supabase/server";

export default async function AdminAuditPage() {
  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("audit_logs")
    .select(
      "id,actor_id,action,entity_type,entity_id,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">AUDIT LOG</p>
          <h1>İşlem Geçmişi</h1>
          <p>Kritik içerik ve yönetim işlemlerinin değiştirilemez kaydı.</p>
        </div>
      </div>

      <section className="admin-panel">
        {logs?.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>İşlem</th>
                  <th>Varlık</th>
                  <th>Kullanıcı</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      {new Intl.DateTimeFormat("tr-TR", {
                        dateStyle: "medium",
                        timeStyle: "medium",
                      }).format(new Date(log.created_at))}
                    </td>
                    <td>{log.action}</td>
                    <td>
                      {log.entity_type}
                      {log.entity_id ? ` / ${log.entity_id}` : ""}
                    </td>
                    <td>{log.actor_id || "system"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-help">Henüz audit kaydı bulunmuyor.</p>
        )}
      </section>
    </>
  );
}

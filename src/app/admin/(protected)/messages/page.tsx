import { updateLeadStatusAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

const statuses = [
  "new",
  "reviewing",
  "contacted",
  "resolved",
  "archived",
] as const;

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select(
      "id,full_name,company,email,phone,subject,message,status,admin_notes,created_at",
    )
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">İLETİŞİM</p>
          <h1>Gelen Mesajlar</h1>
          <p>Kişisel verileri yalnız iş amacıyla ve yetki kapsamında kullanın.</p>
        </div>
      </div>

      <div className="admin-lead-list">
        {messages?.length ? (
          messages.map((message) => (
            <article className="admin-lead-card" key={message.id}>
              <header>
                <div>
                  <p className="eyebrow">{message.subject}</p>
                  <h2>{message.full_name}</h2>
                  <p>{message.company || "Firma bilgisi belirtilmedi"}</p>
                </div>
                <span className={`status-badge status-${message.status}`}>
                  {message.status}
                </span>
              </header>

              <dl>
                <div>
                  <dt>E-posta</dt>
                  <dd>
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Telefon</dt>
                  <dd>{message.phone || "—"}</dd>
                </div>
                <div>
                  <dt>Tarih</dt>
                  <dd>
                    {new Intl.DateTimeFormat("tr-TR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(message.created_at))}
                  </dd>
                </div>
              </dl>

              <div className="admin-lead-card__message">
                <p>{message.message}</p>
              </div>

              <form action={updateLeadStatusAction} className="admin-lead-form">
                <input type="hidden" name="entity" value="contact_messages" />
                <input type="hidden" name="id" value={message.id} />

                <label>
                  <span>Durum</span>
                  <select name="status" defaultValue={message.status}>
                    {statuses.map((status) => (
                      <option value={status} key={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Yönetici Notu</span>
                  <textarea
                    name="adminNotes"
                    rows={3}
                    defaultValue={message.admin_notes ?? ""}
                  />
                </label>

                <button className="button button--secondary" type="submit">
                  Kaydet
                </button>
              </form>
            </article>
          ))
        ) : (
          <section className="admin-panel">
            <p className="admin-help">Henüz iletişim mesajı bulunmuyor.</p>
          </section>
        )}
      </div>
    </>
  );
}

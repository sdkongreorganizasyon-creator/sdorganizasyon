import { updateLeadStatusAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

const statuses = [
  "new",
  "reviewing",
  "contacted",
  "preparing",
  "sent",
  "won",
  "lost",
  "archived",
] as const;

function servicesFromJson(value: Json) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export default async function AdminQuotesPage() {
  const supabase = await createClient();
  const { data: quotes } = await supabase
    .from("quote_requests")
    .select(
      "id,full_name,company,email,phone,event_type,event_date,event_end_date,city,venue,attendee_count,services_json,notes,status,admin_notes,source,created_at",
    )
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">TEKLİF TALEPLERİ</p>
          <h1>Satış ve Operasyon Takibi</h1>
          <p>Talep kapsamını, durumu ve yönetici notlarını tek ekranda yönetin.</p>
        </div>
      </div>

      <div className="admin-lead-list">
        {quotes?.length ? (
          quotes.map((quote) => {
            const services = servicesFromJson(quote.services_json);

            return (
              <article className="admin-lead-card" key={quote.id}>
                <header>
                  <div>
                    <p className="eyebrow">{quote.event_type}</p>
                    <h2>{quote.company}</h2>
                    <p>{quote.full_name}</p>
                  </div>
                  <span className={`status-badge status-${quote.status}`}>
                    {quote.status}
                  </span>
                </header>

                <dl>
                  <div>
                    <dt>E-posta</dt>
                    <dd>
                      <a href={`mailto:${quote.email}`}>{quote.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Telefon</dt>
                    <dd>{quote.phone}</dd>
                  </div>
                  <div>
                    <dt>Tarih</dt>
                    <dd>
                      {[quote.event_date, quote.event_end_date]
                        .filter(Boolean)
                        .join(" – ") || "Belirtilmedi"}
                    </dd>
                  </div>
                  <div>
                    <dt>Lokasyon</dt>
                    <dd>
                      {[quote.venue, quote.city].filter(Boolean).join(", ") ||
                        "Belirtilmedi"}
                    </dd>
                  </div>
                  <div>
                    <dt>Katılımcı</dt>
                    <dd>{quote.attendee_count ?? "Belirtilmedi"}</dd>
                  </div>
                  <div>
                    <dt>Kaynak</dt>
                    <dd>{quote.source || "—"}</dd>
                  </div>
                </dl>

                {services.length ? (
                  <div className="admin-tag-list">
                    {services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </div>
                ) : null}

                {quote.notes ? (
                  <div className="admin-lead-card__message">
                    <p>{quote.notes}</p>
                  </div>
                ) : null}

                <form action={updateLeadStatusAction} className="admin-lead-form">
                  <input type="hidden" name="entity" value="quote_requests" />
                  <input type="hidden" name="id" value={quote.id} />

                  <label>
                    <span>Durum</span>
                    <select name="status" defaultValue={quote.status}>
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
                      defaultValue={quote.admin_notes ?? ""}
                    />
                  </label>

                  <button className="button button--secondary" type="submit">
                    Kaydet
                  </button>
                </form>
              </article>
            );
          })
        ) : (
          <section className="admin-panel">
            <p className="admin-help">Henüz teklif talebi bulunmuyor.</p>
          </section>
        )}
      </div>
    </>
  );
}

import { Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

import { deleteReferenceAction } from "@/app/admin/actions";
import { ReferenceForm } from "@/components/admin/reference-form";
import { createClient } from "@/lib/supabase/server";

export default async function AdminReferencesPage() {
  const supabase = await createClient();
  const { data: references } = await supabase
    .from("references")
    .select("id,name,category,website,visible,updated_at")
    .order("order_no")
    .order("name");

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">REFERANSLAR</p>
          <h1>Referans Yönetimi</h1>
          <p>
            Yalnız logo kullanım izni doğrulanmış gerçek kurum ve firmaları
            ekleyin.
          </p>
        </div>
      </div>

      <ReferenceForm />

      <section className="admin-panel">
        <h2>Mevcut Referanslar</h2>
        {references?.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kurum / Firma</th>
                  <th>Kategori</th>
                  <th>Görünürlük</th>
                  <th aria-label="İşlem" />
                </tr>
              </thead>
              <tbody>
                {references.map((reference) => (
                  <tr key={reference.id}>
                    <td>{reference.name}</td>
                    <td>{reference.category || "—"}</td>
                    <td>{reference.visible ? "Görünür" : "Gizli"}</td>
                    <td>
                      <div className="admin-row-actions">
                        <Link
                          className="admin-icon-link"
                          href={`/admin/references/${reference.id}`}
                          aria-label={`${reference.name} referansını düzenle`}
                        >
                          <Edit3 aria-hidden="true" size={17} />
                        </Link>
                        <form action={deleteReferenceAction}>
                          <input
                            type="hidden"
                            name="id"
                            value={reference.id}
                          />
                          <button
                            className="admin-icon-link is-danger"
                            type="submit"
                            aria-label={`${reference.name} referansını sil`}
                          >
                            <Trash2 aria-hidden="true" size={17} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-help">Henüz referans kaydı bulunmuyor.</p>
        )}
      </section>
    </>
  );
}

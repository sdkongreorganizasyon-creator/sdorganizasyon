import { Edit3, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

import { deleteProjectAction } from "@/app/admin/actions";
import { ButtonLink } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id,title,slug,status,client_name,start_date,updated_at")
    .order("updated_at", { ascending: false });

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">PROJELER</p>
          <h1>Proje Yönetimi</h1>
          <p>Yalnız gerçek ve yayın izni bulunan proje kayıtlarını ekleyin.</p>
        </div>
        <ButtonLink href="/admin/projects/new">
          <Plus aria-hidden="true" size={18} />
          Yeni Proje
        </ButtonLink>
      </div>

      <section className="admin-panel">
        {projects?.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Proje</th>
                  <th>Müşteri / Kurum</th>
                  <th>Durum</th>
                  <th>Tarih</th>
                  <th aria-label="İşlem" />
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <strong>{project.title}</strong>
                      <small>/{project.slug}</small>
                    </td>
                    <td>{project.client_name || "—"}</td>
                    <td>
                      <span className={`status-badge status-${project.status}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.start_date || "—"}</td>
                    <td>
                      <div className="admin-row-actions">
                        <Link
                          className="admin-icon-link"
                          href={`/admin/projects/${project.id}`}
                          aria-label={`${project.title} projesini düzenle`}
                        >
                          <Edit3 aria-hidden="true" size={17} />
                        </Link>
                        <form action={deleteProjectAction}>
                          <input type="hidden" name="id" value={project.id} />
                          <button
                            className="admin-icon-link is-danger"
                            type="submit"
                            aria-label={`${project.title} projesini sil`}
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
          <p className="admin-help">
            Henüz proje kaydı yok. Sahte proje eklemeyin; gerçek proje bilgileri
            hazır olduğunda Yeni Proje düğmesini kullanın.
          </p>
        )}
      </section>
    </>
  );
}

import { updateUserRoleAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

const roles: UserRole[] = [
  "super_admin",
  "admin",
  "editor",
  "content_author",
  "sales_ops",
  "viewer",
];

export default async function AdminUsersPage() {
  const context = await requireAdmin();
  const supabase = await createClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("id,full_name,role,active,last_login_at,created_at")
    .order("created_at");

  const canManage = context.profile?.role === "super_admin";

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">KULLANICILAR</p>
          <h1>Rol ve Yetki Yönetimi</h1>
          <p>
            En az ayrıcalık ilkesiyle yalnız ihtiyaç duyulan yetkileri verin.
          </p>
        </div>
      </div>

      <section className="admin-panel">
        {users?.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>Rol</th>
                  <th>Aktif</th>
                  <th>Son Giriş</th>
                  <th aria-label="İşlem" />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.full_name || "İsimsiz Kullanıcı"}</strong>
                      <small>{user.id}</small>
                    </td>
                    <td colSpan={canManage ? 1 : 4}>
                      {canManage ? (
                        <form
                          action={updateUserRoleAction}
                          className="admin-inline-form"
                        >
                          <input type="hidden" name="id" value={user.id} />
                          <select name="role" defaultValue={user.role}>
                            {roles.map((role) => (
                              <option value={role} key={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                          <label className="admin-inline-checkbox">
                            <input
                              type="checkbox"
                              name="active"
                              defaultChecked={user.active}
                            />
                            Aktif
                          </label>
                          <button
                            className="button button--secondary"
                            type="submit"
                          >
                            Güncelle
                          </button>
                        </form>
                      ) : (
                        user.role
                      )}
                    </td>
                    {canManage ? (
                      <>
                        <td>{user.active ? "Evet" : "Hayır"}</td>
                        <td>
                          {user.last_login_at
                            ? new Intl.DateTimeFormat("tr-TR", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }).format(new Date(user.last_login_at))
                            : "—"}
                        </td>
                        <td />
                      </>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-help">
            Auth kullanıcısı oluşturulduğunda profil kaydı burada görünür.
          </p>
        )}
      </section>
    </>
  );
}

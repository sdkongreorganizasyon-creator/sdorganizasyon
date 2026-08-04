import { MediaUploader } from "@/components/admin/media-uploader";
import { createClient } from "@/lib/supabase/server";

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const { data: media } = await supabase
    .from("media_assets")
    .select(
      "id,bucket,path,file_name,mime_type,size_bytes,alt_text,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">MEDYA</p>
          <h1>Medya Kütüphanesi</h1>
          <p>Görseller, videolar, logolar ve yasal dosyalar.</p>
        </div>
      </div>

      <MediaUploader />

      <section className="admin-panel">
        <h2>Son Yüklenen Dosyalar</h2>
        {media?.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Dosya</th>
                  <th>Bucket</th>
                  <th>Boyut</th>
                  <th>Alt Metin</th>
                  <th>Media ID</th>
                </tr>
              </thead>
              <tbody>
                {media.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.file_name}</strong>
                      <small>{item.mime_type || "—"}</small>
                    </td>
                    <td>{item.bucket}</td>
                    <td>
                      {item.size_bytes
                        ? `${(item.size_bytes / 1024 / 1024).toFixed(2)} MB`
                        : "—"}
                    </td>
                    <td>{item.alt_text || "—"}</td>
                    <td>
                      <code>{item.id}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-help">Henüz medya dosyası bulunmuyor.</p>
        )}
      </section>
    </>
  );
}

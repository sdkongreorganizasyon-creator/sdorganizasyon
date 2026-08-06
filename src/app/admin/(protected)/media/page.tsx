import Image from "next/image";

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

  const rows = (media ?? []).map((item) => ({
    ...item,
    url: supabase.storage.from(item.bucket).getPublicUrl(item.path).data
      .publicUrl,
  }));

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">MEDYA</p>
          <h1>Medya Kütüphanesi</h1>
          <p>
            Görselleri, videoları, logoları ve yasal dosyaları önizleyerek yönetin.
          </p>
        </div>
      </div>

      <MediaUploader />

      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <h2>Son Yüklenen Dosyalar</h2>
            <p>{rows.length} medya kaydı gösteriliyor.</p>
          </div>
        </div>

        {rows.length ? (
          <div className="admin-media-grid">
            {rows.map((item) => (
              <article key={item.id}>
                <div className="admin-media-grid__preview">
                  {item.mime_type?.startsWith("image/") ? (
                    <Image
                      src={item.url}
                      alt={item.alt_text || item.file_name || "Medya görseli"}
                      fill
                      sizes="(max-width: 720px) 100vw, 25vw"
                    />
                  ) : item.mime_type?.startsWith("video/") ? (
                    <video controls preload="metadata">
                      <source src={item.url} type={item.mime_type} />
                    </video>
                  ) : (
                    <span>Dosya</span>
                  )}
                </div>
                <div className="admin-media-grid__body">
                  <strong>{item.file_name}</strong>
                  <p>{item.alt_text || "Alt metin girilmemiş"}</p>
                  <dl>
                    <div>
                      <dt>Bucket</dt>
                      <dd>{item.bucket}</dd>
                    </div>
                    <div>
                      <dt>Boyut</dt>
                      <dd>
                        {item.size_bytes
                          ? `${(item.size_bytes / 1024 / 1024).toFixed(2)} MB`
                          : "—"}
                      </dd>
                    </div>
                  </dl>
                  <code>{item.id}</code>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="admin-help">Henüz medya dosyası bulunmuyor.</p>
        )}
      </section>
    </>
  );
}

"use client";

import {
  CheckCircle2,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";

const allowedBuckets = [
  "public-site-media",
  "project-media",
  "reference-logos",
  "legal-files",
  "private-form-uploads",
] as const;

type UploadState =
  | { status: "idle" }
  | { status: "uploading" }
  | { status: "success"; message: string; mediaId: string }
  | { status: "error"; message: string };

function sanitizeFileName(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-");
}

export function MediaUploader() {
  const [state, setState] = useState<UploadState>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "uploading" });

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file");
    const bucket = String(formData.get("bucket") ?? "");
    const altText = String(formData.get("altText") ?? "").trim();

    if (!(file instanceof File) || !file.size) {
      setState({ status: "error", message: "Bir dosya seçin." });
      return;
    }

    if (!allowedBuckets.includes(bucket as (typeof allowedBuckets)[number])) {
      setState({ status: "error", message: "Geçersiz bucket." });
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setState({
        status: "error",
        message: "Dosya boyutu 25 MB sınırını aşıyor.",
      });
      return;
    }

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Oturum bulunamadı.");
      }

      const safeName = sanitizeFileName(file.name);
      const path = `${new Date().getFullYear()}/${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type || undefined,
        });

      if (uploadError) throw uploadError;

      const { data: media, error: mediaError } = await supabase
        .from("media_assets")
        .insert({
          bucket,
          path,
          file_name: file.name,
          mime_type: file.type || null,
          size_bytes: file.size,
          alt_text: altText || null,
          focal_point: { x: 50, y: 50 },
          created_by: user.id,
        })
        .select("id")
        .single();

      if (mediaError || !media) {
        await supabase.storage.from(bucket).remove([path]);
        throw mediaError ?? new Error("Medya kaydı oluşturulamadı.");
      }

      setState({
        status: "success",
        message: "Dosya başarıyla yüklendi.",
        mediaId: media.id,
      });
      event.currentTarget.reset();
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Yükleme başarısız.",
      });
    }
  }

  return (
    <form className="admin-panel media-uploader" onSubmit={onSubmit}>
      <div className="admin-form__header">
        <div>
          <p className="eyebrow">MEDYA KÜTÜPHANESİ</p>
          <h2>Yeni Dosya Yükle</h2>
        </div>
        <Button disabled={state.status === "uploading"} type="submit">
          {state.status === "uploading" ? (
            <Loader2 className="spin" aria-hidden="true" />
          ) : (
            <UploadCloud aria-hidden="true" size={18} />
          )}
          Yükle
        </Button>
      </div>

      <Select label="Bucket" name="bucket" defaultValue="public-site-media">
        {allowedBuckets.map((bucket) => (
          <option value={bucket} key={bucket}>
            {bucket}
          </option>
        ))}
      </Select>

      <TextInput
        label="Dosya"
        name="file"
        type="file"
        accept="image/*,video/mp4,video/webm,application/pdf"
      />

      <TextInput
        label="Alternatif Metin"
        name="altText"
        hint="Dekoratif olmayan görseller için açıklayıcı metin."
      />

      {state.status === "success" ? (
        <div className="admin-alert is-success">
          <CheckCircle2 aria-hidden="true" />
          <div>
            <p>{state.message}</p>
            <code>Media ID: {state.mediaId}</code>
          </div>
        </div>
      ) : null}

      {state.status === "error" ? (
        <div className="admin-alert is-error" role="alert">
          {state.message}
        </div>
      ) : null}
    </form>
  );
}

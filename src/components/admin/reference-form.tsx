"use client";

import {
  CheckCircle2,
  Eye,
  Loader2,
  Rocket,
  Save,
} from "lucide-react";
import { useActionState } from "react";

import {
  saveReferenceAction,
  type ActionState,
} from "@/app/admin/actions";
import { MediaAssetSelect } from "@/components/admin/media-select";
import { Button } from "@/components/ui/button";
import { Textarea, TextInput } from "@/components/ui/field";

type MediaOption = Readonly<{
  id: string;
  label: string;
  url: string;
  mimeType?: string | null;
}>;

type ReferenceFormProps = Readonly<{
  reference?: {
    id: string;
    name: string;
    website?: string | null;
    category?: string | null;
    story?: string | null;
    logoMediaId?: string | null;
    visible: boolean;
  };
  mediaOptions?: readonly MediaOption[];
  hasDraft?: boolean;
}>;

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ReferenceForm({
  reference,
  mediaOptions = [],
  hasDraft = false,
}: ReferenceFormProps) {
  const [state, action, pending] = useActionState(
    saveReferenceAction,
    initialState,
  );

  return (
    <form action={action} className="admin-panel admin-reference-form">
      {reference ? (
        <input type="hidden" name="id" value={reference.id} />
      ) : null}

      <div className="admin-form__header">
        <div>
          <p className="eyebrow">REFERANS</p>
          <h2>{reference ? reference.name : "Yeni Referans"}</h2>
          <p>
            Referansı taslak olarak hazırlayın, referanslar sayfasında
            önizleyin ve sonra yayımlayın.
          </p>
        </div>
        <div className="admin-publish-actions">
          <Button
            disabled={pending}
            type="submit"
            name="intent"
            value="draft"
            variant="secondary"
          >
            {pending ? (
              <Loader2 className="spin" aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" size={17} />
            )}
            Taslak Kaydet
          </Button>
          <Button
            disabled={pending}
            type="submit"
            name="intent"
            value="preview"
            variant="secondary"
          >
            <Eye aria-hidden="true" size={17} />
            Önizle
          </Button>
          <Button
            disabled={pending}
            type="submit"
            name="intent"
            value="publish"
          >
            <Rocket aria-hidden="true" size={17} />
            Yayımla
          </Button>
        </div>
      </div>

      {hasDraft ? (
        <div className="admin-alert is-info" role="status">
          Bu referans için canlıya alınmamış bir taslak bulunuyor.
        </div>
      ) : null}

      {state.message ? (
        <div
          className={
            state.success ? "admin-alert is-success" : "admin-alert is-error"
          }
          role="status"
        >
          {state.success ? <CheckCircle2 aria-hidden="true" /> : null}
          {state.message}
        </div>
      ) : null}

      <div className="form-grid form-grid--two">
        <TextInput
          label="Kurum / Firma Adı"
          name="name"
          required
          defaultValue={reference?.name ?? ""}
        />
        <TextInput
          label="Kategori"
          name="category"
          defaultValue={reference?.category ?? ""}
        />
        <TextInput
          label="Web Sitesi"
          name="website"
          type="url"
          defaultValue={reference?.website ?? ""}
        />
        <MediaAssetSelect
          label="Kurum Logosu"
          name="logoMediaId"
          options={mediaOptions}
          accept="image"
          defaultValue={reference?.logoMediaId ?? ""}
          hint="Yalnız kullanım izni bulunan logoları seçin."
        />
      </div>

      <Textarea
        label="Onaylı Başarı Hikâyesi"
        name="story"
        rows={5}
        defaultValue={reference?.story ?? ""}
      />

      <label className="checkbox-field">
        <input
          type="checkbox"
          name="visible"
          defaultChecked={reference?.visible ?? true}
        />
        <span>Yayımlandığında web sitesinde görünür</span>
      </label>
    </form>
  );
}

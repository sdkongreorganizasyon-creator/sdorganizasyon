"use client";

import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useActionState } from "react";

import {
  saveReferenceAction,
  type ActionState,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Textarea, TextInput } from "@/components/ui/field";

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
}>;

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ReferenceForm({ reference }: ReferenceFormProps) {
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
        </div>
        <Button disabled={pending} type="submit">
          {pending ? (
            <Loader2 className="spin" aria-hidden="true" />
          ) : (
            <Save aria-hidden="true" size={18} />
          )}
          Kaydet
        </Button>
      </div>

      {state.message ? (
        <div
          className={
            state.success ? "admin-alert is-success" : "admin-alert is-error"
          }
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
        <TextInput
          label="Logo Media ID"
          name="logoMediaId"
          hint="Medya ekranındaki UUID."
          defaultValue={reference?.logoMediaId ?? ""}
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
        <span>Web sitesinde görünür</span>
      </label>
    </form>
  );
}

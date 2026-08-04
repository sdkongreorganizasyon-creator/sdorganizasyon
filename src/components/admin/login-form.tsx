"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { useActionState } from "react";

import {
  loginAction,
  type ActionState,
} from "@/app/admin/actions";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/field";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, action, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="admin-login__card">
      <Logo className="admin-login__logo" />
      <div>
        <p className="eyebrow">YÖNETİM PANELİ</p>
        <h1>Güvenli Giriş</h1>
        <p>
          İçerik, proje, referans ve talepleri yönetmek için hesabınızla giriş
          yapın.
        </p>
      </div>

      <form action={action} className="admin-login__form">
        <TextInput
          label="E-posta"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextInput
          label="Şifre"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />

        {state.message ? (
          <p className="form-error" role="alert">
            {state.message}
          </p>
        ) : null}

        <Button disabled={pending} type="submit">
          {pending ? (
            <>
              <Loader2 className="spin" aria-hidden="true" />
              Giriş Yapılıyor
            </>
          ) : (
            <>
              <LockKeyhole aria-hidden="true" size={18} />
              Giriş Yap
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

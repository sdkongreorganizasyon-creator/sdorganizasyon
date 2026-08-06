"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { TurnstileField } from "@/components/forms/turnstile-field";
import { Button } from "@/components/ui/button";
import {
  Select,
  Textarea,
  TextInput,
} from "@/components/ui/field";
import { zodResolver } from "@/lib/validation/zod-resolver";
import {
  contactSchema,
  type ContactInput,
} from "@/lib/validation/contact";

type ApiState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [apiState, setApiState] = useState<ApiState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
      marketingConsent: false,
      website: "",
      turnstileToken: "",
    },
  });

  const onToken = useCallback(
    (token: string) =>
      setValue("turnstileToken", token, { shouldValidate: true }),
    [setValue],
  );

  async function onSubmit(values: ContactInput) {
    setApiState({ status: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "Mesajınız şu anda gönderilemedi.",
        );
      }

      setApiState({
        status: "success",
        message:
          result.message ??
          "Mesajınız başarıyla alındı. Ekibimiz sizinle iletişime geçecektir.",
      });
      reset();
    } catch (error) {
      setApiState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Beklenmeyen bir hata oluştu.",
      });
    }
  }

  if (apiState.status === "success") {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <h2>Talebiniz Alındı</h2>
        <p>{apiState.message}</p>
        <Button
          variant="secondary"
          onClick={() => setApiState({ status: "idle" })}
        >
          Yeni Mesaj Gönder
        </Button>
      </div>
    );
  }

  return (
    <form
      className="form-card"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-grid form-grid--two">
        <TextInput
          label="Ad Soyad"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <TextInput
          label="Firma / Kurum"
          autoComplete="organization"
          error={errors.company?.message}
          {...register("company")}
        />
        <TextInput
          label="E-posta"
          required
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextInput
          label="Telefon"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <Select
        label="Konu"
        required
        error={errors.subject?.message}
        {...register("subject")}
      >
        <option value="">Seçiniz</option>
        <option value="Genel Bilgi">Genel Bilgi</option>
        <option value="Kongre Organizasyonu">Kongre Organizasyonu</option>
        <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
        <option value="Dijital Hizmetler">Dijital Hizmetler</option>
        <option value="İş Birliği">İş Birliği</option>
        <option value="Diğer">Diğer</option>
      </Select>

      <Textarea
        label="Mesajınız"
        required
        rows={7}
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Web sitesi</label>
        <input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <label className="checkbox-field">
        <input type="checkbox" {...register("consent")} />
        <span>
          <a href="/kvkk/aydinlatma-metni" target="_blank">
            KVKK Aydınlatma Metni
          </a>
          &apos;ni okudum ve iletişim talebimin işlenmesini kabul ediyorum.
        </span>
      </label>
      {errors.consent ? (
        <p className="field__error">{errors.consent.message}</p>
      ) : null}

      <label className="checkbox-field">
        <input type="checkbox" {...register("marketingConsent")} />
        <span>
          Kampanya ve bilgilendirme iletileri almak istiyorum. Bu izin
          opsiyoneldir.
        </span>
      </label>

      <TurnstileField onToken={onToken} />

      {apiState.status === "error" ? (
        <div className="form-error" role="alert">
          {apiState.message}
        </div>
      ) : null}

      <Button
        className="contact-submit-button"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="spin" aria-hidden="true" />
            Gönderiliyor
          </>
        ) : (
          "Mesajı Gönder"
        )}
      </Button>
    </form>
  );
}

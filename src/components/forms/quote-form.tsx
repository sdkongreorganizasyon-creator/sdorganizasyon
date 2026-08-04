"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { TurnstileField } from "@/components/forms/turnstile-field";
import { Button } from "@/components/ui/button";
import {
  Select,
  Textarea,
  TextInput,
} from "@/components/ui/field";
import {
  digitalServices,
  physicalServices,
} from "@/content/site-content";
import {
  quoteSchema,
  type QuoteInput,
} from "@/lib/validation/quote";

const steps = [
  { id: 1, label: "İletişim" },
  { id: 2, label: "Etkinlik" },
  { id: 3, label: "Hizmetler" },
  { id: 4, label: "Onay" },
] as const;

type ApiState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function QuoteForm({
  initialService,
}: Readonly<{ initialService?: string }>) {
  const [step, setStep] = useState(1);
  const [apiState, setApiState] = useState<ApiState>({ status: "idle" });

  const allServiceNames = useMemo<string[]>(
    () => [...physicalServices, ...digitalServices].map((item) => item.title),
    [],
  );

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      eventEndDate: "",
      city: "",
      venue: "",
      attendeeCount: "",
      services:
        initialService && allServiceNames.includes(initialService)
          ? [initialService]
          : [],
      notes: "",
      consent: false,
      marketingConsent: false,
      source: initialService ? `Hizmet: ${initialService}` : "Teklif Sayfası",
      website: "",
      turnstileToken: "",
    },
  });

  const selectedServices = watch("services") ?? [];

  const onToken = useCallback(
    (token: string) =>
      setValue("turnstileToken", token, { shouldValidate: true }),
    [setValue],
  );

  async function next() {
    const fieldsByStep: Record<number, Array<keyof QuoteInput>> = {
      1: ["fullName", "company", "email", "phone"],
      2: ["eventType", "eventDate", "eventEndDate", "city", "venue", "attendeeCount"],
      3: ["services", "notes"],
      4: ["consent", "marketingConsent"],
    };

    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((current) => Math.min(4, current + 1));
  }

  function previous() {
    setStep((current) => Math.max(1, current - 1));
  }

  async function onSubmit(values: QuoteInput) {
    setApiState({ status: "idle" });

    try {
      const response = await fetch("/api/quote", {
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
          result.message ?? "Teklif talebiniz şu anda gönderilemedi.",
        );
      }

      setApiState({
        status: "success",
        message:
          result.message ??
          "Teklif talebiniz başarıyla alındı. Ekibimiz sizinle iletişime geçecektir.",
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
        <h2>Teklif Talebiniz Alındı</h2>
        <p>{apiState.message}</p>
        <Button
          variant="secondary"
          onClick={() => {
            setApiState({ status: "idle" });
            setStep(1);
          }}
        >
          Yeni Talep Oluştur
        </Button>
      </div>
    );
  }

  return (
    <form
      className="form-card quote-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <ol className="quote-steps" aria-label="Teklif formu adımları">
        {steps.map((item) => (
          <li
            className={
              item.id === step
                ? "is-active"
                : item.id < step
                  ? "is-complete"
                  : undefined
            }
            key={item.id}
          >
            <span>{item.id}</span>
            <strong>{item.label}</strong>
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <section className="quote-step" aria-labelledby="quote-step-1">
          <h2 id="quote-step-1">İletişim Bilgileri</h2>
          <p>Talebinizle ilgili size ulaşabileceğimiz bilgileri paylaşın.</p>

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
              required
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
              required
              type="tel"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="quote-step" aria-labelledby="quote-step-2">
          <h2 id="quote-step-2">Etkinlik Bilgileri</h2>
          <p>Planlamayı başlatmak için temel etkinlik detaylarını girin.</p>

          <Select
            label="Organizasyon Türü"
            required
            error={errors.eventType?.message}
            {...register("eventType")}
          >
            <option value="">Seçiniz</option>
            <option value="Kongre">Kongre</option>
            <option value="Toplantı / Sempozyum">
              Toplantı / Sempozyum
            </option>
            <option value="Lansman / Kurumsal Etkinlik">
              Lansman / Kurumsal Etkinlik
            </option>
            <option value="Workshop">Workshop</option>
            <option value="Fuar / Sergi">Fuar / Sergi</option>
            <option value="Diğer">Diğer</option>
          </Select>

          <div className="form-grid form-grid--two">
            <TextInput
              label="Başlangıç Tarihi"
              type="date"
              error={errors.eventDate?.message}
              {...register("eventDate")}
            />
            <TextInput
              label="Bitiş Tarihi"
              type="date"
              error={errors.eventEndDate?.message}
              {...register("eventEndDate")}
            />
            <TextInput
              label="Şehir"
              error={errors.city?.message}
              {...register("city")}
            />
            <TextInput
              label="Mekân"
              error={errors.venue?.message}
              {...register("venue")}
            />
            <TextInput
              label="Tahmini Katılımcı Sayısı"
              type="number"
              min={1}
              error={errors.attendeeCount?.message}
              {...register("attendeeCount")}
            />
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="quote-step" aria-labelledby="quote-step-3">
          <h2 id="quote-step-3">İhtiyaç Duyduğunuz Hizmetler</h2>
          <p>Bir veya birden fazla hizmet seçebilirsiniz.</p>

          <div className="service-checkbox-grid">
            {[...physicalServices, ...digitalServices].map((service) => (
              <label
                className={
                  selectedServices.includes(service.title)
                    ? "service-checkbox is-selected"
                    : "service-checkbox"
                }
                key={service.slug}
              >
                <input
                  type="checkbox"
                  value={service.title}
                  {...register("services")}
                />
                <strong>{service.title}</strong>
                <span>{service.summary}</span>
              </label>
            ))}
          </div>

          <Textarea
            label="Ek Notlar"
            rows={6}
            error={errors.notes?.message}
            {...register("notes")}
          />
        </section>
      ) : null}

      {step === 4 ? (
        <section className="quote-step" aria-labelledby="quote-step-4">
          <h2 id="quote-step-4">Onay ve Gönderim</h2>
          <p>
            Talebinizi göndermeden önce kişisel veri işleme bilgilendirmesini
            inceleyin.
          </p>

          <label className="checkbox-field">
            <input type="checkbox" {...register("consent")} />
            <span>
              <a href="/kvkk/aydinlatma-metni" target="_blank">
                KVKK Aydınlatma Metni
              </a>
              &apos;ni okudum ve teklif talebimin işlenmesini kabul ediyorum.
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

          <div className="honeypot" aria-hidden="true">
            <label htmlFor="quote-website">Web sitesi</label>
            <input
              id="quote-website"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <TurnstileField onToken={onToken} />

          {apiState.status === "error" ? (
            <div className="form-error" role="alert">
              {apiState.message}
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="quote-form__actions">
        {step > 1 ? (
          <Button variant="ghost" onClick={previous}>
            <ArrowLeft aria-hidden="true" size={18} />
            Geri
          </Button>
        ) : (
          <span />
        )}

        {step < 4 ? (
          <Button onClick={next}>
            Devam Et
            <ArrowRight aria-hidden="true" size={18} />
          </Button>
        ) : (
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="spin" aria-hidden="true" />
                Gönderiliyor
              </>
            ) : (
              "Teklif Talebini Gönder"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}

"use client";

import {
  CheckCircle2,
  ExternalLink,
  Eye,
  ImageIcon,
  Loader2,
  Palette,
  Rocket,
  Save,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";

import {
  saveSettingsAction,
  type ActionState,
} from "@/app/admin/actions";
import { NavigationBuilder } from "@/components/admin/navigation-builder";
import { PageHeroBuilder } from "@/components/admin/page-hero-builder";
import { Button } from "@/components/ui/button";
import { Select, Textarea, TextInput } from "@/components/ui/field";
import type { ResolvedSiteSettings } from "@/lib/content/settings";

type MediaOption = Readonly<{
  label: string;
  value: string;
  type: string;
}>;

type SettingsFormProps = Readonly<{
  settings: ResolvedSiteSettings;
  loadError?: string | null;
  hasDraft?: boolean;
  mediaOptions?: readonly MediaOption[];
  integrations: {
    supabasePublic: boolean;
    supabaseAdmin: boolean;
    email: boolean;
    turnstile: boolean;
  };
}>;

const initialState: ActionState = {
  success: false,
  message: "",
};

const tabs = [
  ["general", "Genel"],
  ["branding", "Marka ve Logo"],
  ["contact", "İletişim"],
  ["social", "Sosyal Medya"],
  ["header", "Header"],
  ["hero", "Ana Sayfa Hero"],
  ["values", "Ana Sayfa Değerleri"],
  ["footer", "Footer"],
  ["seo", "SEO"],
  ["pageHeroes", "Sayfa Başlıkları"],
  ["design", "Tasarım"],
  ["navigation", "Menü Yönetimi"],
  ["integrations", "Entegrasyon Durumu"],
] as const;

function MediaSelect({
  label,
  name,
  defaultValue,
  options,
  hint,
}: Readonly<{
  label: string;
  name: string;
  defaultValue: string;
  options: readonly MediaOption[];
  hint?: string;
}>) {
  const hasCurrent =
    !defaultValue || options.some((option) => option.value === defaultValue);

  return (
    <Select
      label={label}
      name={name}
      defaultValue={defaultValue}
      hint={hint}
    >
      <option value="">Medya seçilmedi</option>
      {!hasCurrent ? (
        <option value={defaultValue}>{defaultValue}</option>
      ) : null}
      {options.map((option) => (
        <option key={`${name}-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export function SettingsForm({
  settings,
  loadError,
  hasDraft = false,
  mediaOptions = [],
  integrations,
}: SettingsFormProps) {
  const [state, action, pending] = useActionState(
    saveSettingsAction,
    initialState,
  );
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number][0]>("general");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!state.success) return;

    const frame = window.requestAnimationFrame(() => {
      setDirty(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [state.success]);

  const imageOptions = useMemo(
    () => mediaOptions.filter((option) => option.type.startsWith("image")),
    [mediaOptions],
  );
  const videoOptions = useMemo(
    () => mediaOptions.filter((option) => option.type.startsWith("video")),
    [mediaOptions],
  );

  return (
    <form
      action={action}
      className="admin-form admin-settings"
      onChange={() => setDirty(true)}
    >
      <div className="admin-form__header admin-settings__heading">
        <div>
          <p className="eyebrow">SİTE AYARLARI</p>
          <h1>Global İçerik ve Marka Yönetimi</h1>
          <p>
            İçerik, tasarım ve menü ayarlarını önce taslak olarak kaydedin,
            gerçek site görünümünde önizleyin ve onayladığınızda yayımlayın.
          </p>
        </div>
        <div className="admin-form__header-actions">
          <Link className="button button--secondary" href="/" target="_blank">
            <ExternalLink aria-hidden="true" size={17} />
            Canlı Site
          </Link>
          <Link className="button button--secondary" href="/admin/media">
            <ImageIcon aria-hidden="true" size={17} />
            Medya Kütüphanesi
          </Link>
        </div>
      </div>

      {loadError ? (
        <div className="admin-alert is-error" role="alert">
          Ayar verileri okunamadı: {loadError}
        </div>
      ) : null}

      {hasDraft ? (
        <div className="admin-alert is-info" role="status">
          <Eye aria-hidden="true" size={18} />
          Yayımlanmamış bir taslak bulunuyor. Önizleme ile kontrol edip
          yayımlayabilirsiniz.
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

      <div className="admin-settings__layout">
        <nav className="admin-settings__tabs" aria-label="Ayar bölümleri">
          {tabs.map(([id, label]) => (
            <button
              className={activeTab === id ? "is-active" : undefined}
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
            >
              <Settings2 aria-hidden="true" size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-settings__content">
          <section
            className={activeTab === "general" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>Genel Bilgiler</h2>
            <div className="form-grid form-grid--two">
              <TextInput
                label="Site Adı"
                name="siteName"
                defaultValue={settings.general.siteName}
                required
              />
              <TextInput
                label="Ticari / Yasal Unvan"
                name="legalName"
                defaultValue={settings.general.legalName}
              />
              <TextInput
                label="Slogan"
                name="slogan"
                defaultValue={settings.general.slogan}
              />
              <TextInput
                label="Kuruluş Yılı"
                name="establishmentYear"
                defaultValue={settings.general.establishmentYear}
              />
              <TextInput
                label="Merkez"
                name="headquarters"
                defaultValue={settings.general.headquarters}
              />
            </div>
            <Textarea
              label="Kısa Şirket Açıklaması"
              name="shortDescription"
              rows={5}
              defaultValue={settings.general.shortDescription}
            />
          </section>

          <section
            className={activeTab === "branding" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>Marka ve Logo</h2>
            <p className="admin-help">
              Orijinal şeffaf PNG kullanılır. Varsayılan 8K kaynak:
              <code>/brand/sdkongre-logo-8k.png</code>
            </p>
            <MediaSelect
              label="Header Logo"
              name="headerLogoUrl"
              defaultValue={settings.branding.headerLogoUrl}
              options={imageOptions}
            />
            <MediaSelect
              label="Footer Logo"
              name="footerLogoUrl"
              defaultValue={settings.branding.footerLogoUrl}
              options={imageOptions}
            />
            <MediaSelect
              label="Kompakt Logo"
              name="compactLogoUrl"
              defaultValue={settings.branding.compactLogoUrl}
              options={imageOptions}
            />
            <MediaSelect
              label="Favicon"
              name="faviconUrl"
              defaultValue={settings.branding.faviconUrl}
              options={imageOptions}
            />
            <div className="admin-brand-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Mevcut SDKONGRE logosu"
                src={settings.branding.headerLogoUrl}
              />
            </div>
          </section>

          <section
            className={activeTab === "contact" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>İletişim Bilgileri</h2>
            <div className="form-grid form-grid--two">
              <TextInput
                label="Telefon"
                name="phone"
                defaultValue={settings.contact.phone ?? ""}
              />
              <TextInput
                label="GSM"
                name="mobile"
                defaultValue={settings.contact.mobile ?? ""}
              />
              <TextInput
                label="Genel E-posta"
                name="email"
                type="email"
                defaultValue={settings.contact.email ?? ""}
              />
              <TextInput
                label="Teklif E-postası"
                name="quoteEmail"
                type="email"
                defaultValue={settings.contact.quoteEmail ?? ""}
              />
              <TextInput
                label="WhatsApp"
                name="whatsapp"
                defaultValue={settings.contact.whatsapp ?? ""}
              />
              <TextInput
                label="İlçe"
                name="district"
                defaultValue={settings.contact.district ?? ""}
              />
              <TextInput
                label="Şehir"
                name="city"
                defaultValue={settings.contact.city ?? ""}
              />
              <TextInput
                label="Posta Kodu"
                name="postalCode"
                defaultValue={settings.contact.postalCode ?? ""}
              />
              <TextInput
                label="Çalışma Günleri"
                name="workingDays"
                defaultValue={settings.contact.workingDays ?? ""}
              />
              <TextInput
                label="Çalışma Saatleri"
                name="workingHours"
                defaultValue={settings.contact.workingHours ?? ""}
              />
              <TextInput
                label="Google Maps URL"
                name="mapUrl"
                type="url"
                defaultValue={settings.contact.mapUrl ?? ""}
              />
            </div>
            <Textarea
              label="Adres"
              name="address"
              rows={4}
              defaultValue={settings.contact.address ?? ""}
            />
          </section>

          <section
            className={activeTab === "social" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>Sosyal Medya</h2>
            <div className="form-grid form-grid--two">
              <TextInput
                label="Instagram URL"
                name="instagram"
                type="url"
                defaultValue={settings.social.instagram ?? ""}
              />
              <TextInput
                label="LinkedIn URL"
                name="linkedin"
                type="url"
                defaultValue={settings.social.linkedin ?? ""}
              />
              <TextInput
                label="YouTube URL"
                name="youtube"
                type="url"
                defaultValue={settings.social.youtube ?? ""}
              />
              <TextInput
                label="X URL"
                name="x"
                type="url"
                defaultValue={settings.social.x ?? ""}
              />
              <TextInput
                label="Facebook URL"
                name="facebook"
                type="url"
                defaultValue={settings.social.facebook ?? ""}
              />
            </div>
          </section>

          <section
            className={activeTab === "header" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>Header</h2>
            <div className="form-grid form-grid--two">
              <TextInput
                label="Teklif Butonu"
                name="quoteButtonLabel"
                defaultValue={settings.header.quoteButtonLabel}
              />
              <TextInput
                label="Teklif Butonu URL"
                name="quoteButtonUrl"
                defaultValue={settings.header.quoteButtonUrl}
              />
              <TextInput
                label="Menü Butonu"
                name="menuButtonLabel"
                defaultValue={settings.header.menuButtonLabel}
              />
            </div>
          </section>

          <section
            className={activeTab === "hero" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>Ana Sayfa Hero</h2>
            <div className="form-grid form-grid--two">
              <TextInput
                label="Üst Etiket"
                name="heroEyebrow"
                defaultValue={settings.hero.eyebrow}
              />
              <TextInput
                label="Başlık 1"
                name="heroTitleLine1"
                defaultValue={settings.hero.titleLine1}
                required
              />
              <TextInput
                label="Başlık 2"
                name="heroTitleLine2"
                defaultValue={settings.hero.titleLine2}
                required
              />
              <TextInput
                label="Vurgulu Başlık"
                name="heroTitleHighlight"
                defaultValue={settings.hero.titleHighlight}
                required
              />
            </div>
            <Textarea
              label="Hero Açıklaması"
              name="heroDescription"
              rows={4}
              defaultValue={settings.hero.description}
            />
            <div className="form-grid form-grid--two">
              <TextInput
                label="Birincil Buton"
                name="heroPrimaryButtonLabel"
                defaultValue={settings.hero.primaryButtonLabel}
              />
              <TextInput
                label="Birincil Buton URL"
                name="heroPrimaryButtonUrl"
                defaultValue={settings.hero.primaryButtonUrl}
              />
              <TextInput
                label="İkincil Buton"
                name="heroSecondaryButtonLabel"
                defaultValue={settings.hero.secondaryButtonLabel}
              />
              <TextInput
                label="İkincil Buton URL"
                name="heroSecondaryButtonUrl"
                defaultValue={settings.hero.secondaryButtonUrl}
              />
            </div>
            <MediaSelect
              label="Hero Poster"
              name="heroPoster"
              defaultValue={settings.hero.poster}
              options={imageOptions}
              hint="Public site hero görseli. Medya kütüphanesinden seçilebilir."
            />
            <MediaSelect
              label="Desktop Video"
              name="heroDesktopVideo"
              defaultValue={settings.hero.desktopVideo ?? ""}
              options={videoOptions}
            />
            <MediaSelect
              label="Mobil Video"
              name="heroMobileVideo"
              defaultValue={settings.hero.mobileVideo ?? ""}
              options={videoOptions}
            />
            <div
              className="admin-hero-preview"
              style={{ backgroundImage: `url("${settings.hero.poster}")` }}
            >
              <span>{settings.hero.titleLine1}</span>
              <span>{settings.hero.titleLine2}</span>
              <strong>{settings.hero.titleHighlight}</strong>
            </div>
          </section>

          <section
            className={activeTab === "values" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <div className="admin-panel__heading">
              <div>
                <h2>Ana Sayfa Değerleri</h2>
                <p>Public ana sayfada tam olarak beş aktif kart gösterilir.</p>
              </div>
            </div>
            <div className="admin-value-editor">
              {settings.homeValues.map((item, index) => (
                <article key={`${item.number}-${index}`}>
                  <div className="admin-value-editor__top">
                    <strong>Kart {index + 1}</strong>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        name={`homeValue${index}Active`}
                        defaultChecked={item.active !== false}
                      />
                      <span>Aktif</span>
                    </label>
                  </div>
                  <div className="form-grid form-grid--two">
                    <TextInput
                      label="Sıra"
                      name={`homeValue${index}Number`}
                      defaultValue={item.number}
                    />
                    <TextInput
                      label="İkon"
                      name={`homeValue${index}Icon`}
                      defaultValue={item.icon}
                    />
                  </div>
                  <TextInput
                    label="Başlık"
                    name={`homeValue${index}Title`}
                    defaultValue={item.title}
                    required
                  />
                  <Textarea
                    label="Açıklama"
                    name={`homeValue${index}Description`}
                    rows={4}
                    defaultValue={item.description}
                    required
                  />
                  <MediaSelect
                    label="Kart Görseli"
                    name={`homeValue${index}Image`}
                    defaultValue={item.image ?? ""}
                    options={imageOptions}
                  />
                  <div className="admin-value-editor__preview">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" src={item.image} />
                    ) : null}
                    <div>
                      <span>{item.number}</span>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className={activeTab === "footer" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>Footer</h2>
            <Textarea
              label="Footer Açıklaması"
              name="footerDescription"
              rows={5}
              defaultValue={settings.footer.description}
            />
            <TextInput
              label="Telif Metni"
              name="copyrightText"
              defaultValue={settings.footer.copyrightText}
            />
            <div className="admin-checkbox-grid">
              {[
                ["showQuickMenu", "Hızlı Menü", settings.footer.showQuickMenu],
                ["showLegalLinks", "Yasal Metinler", settings.footer.showLegalLinks],
                ["showContact", "İletişim", settings.footer.showContact],
                ["showSocialLinks", "Sosyal Medya", settings.footer.showSocialLinks],
              ].map(([name, label, checked]) => (
                <label key={String(name)}>
                  <input
                    type="checkbox"
                    name={String(name)}
                    defaultChecked={Boolean(checked)}
                  />
                  <span>{String(label)}</span>
                </label>
              ))}
            </div>
          </section>

          <section
            className={activeTab === "seo" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <h2>Global SEO</h2>
            <TextInput
              label="Varsayılan Başlık"
              name="defaultTitle"
              maxLength={70}
              defaultValue={settings.seo.defaultTitle}
            />
            <Textarea
              label="Varsayılan Açıklama"
              name="defaultDescription"
              maxLength={200}
              rows={4}
              defaultValue={settings.seo.defaultDescription}
            />
            <MediaSelect
              label="Open Graph Görseli"
              name="ogImage"
              defaultValue={settings.seo.ogImage}
              options={imageOptions}
            />
            <TextInput
              label="Canonical Base URL"
              name="canonicalBaseUrl"
              type="url"
              defaultValue={settings.seo.canonicalBaseUrl}
            />
            <label className="admin-switch admin-switch--block">
              <input
                type="checkbox"
                name="indexable"
                defaultChecked={settings.seo.indexable}
              />
              <span>Arama motoru indekslemesine izin ver</span>
            </label>
          </section>

          <section
            className={
              activeTab === "pageHeroes"
                ? "admin-panel"
                : "admin-panel is-hidden"
            }
          >
            <PageHeroBuilder
              initial={settings.pageHeroes}
              mediaOptions={mediaOptions}
            />
          </section>

          <section
            className={activeTab === "design" ? "admin-panel" : "admin-panel is-hidden"}
          >
            <div className="admin-panel__heading">
              <div>
                <h2>Renk, Tipografi ve Animasyon</h2>
                <p>
                  Seçimler site genelinde CSS değişkenleri olarak uygulanır.
                  Güvenli font aileleri ve kontrollü animasyon seçenekleri kullanılır.
                </p>
              </div>
              <Palette aria-hidden="true" />
            </div>

            <div className="admin-theme-grid">
              {[
                ["Arka Plan", "themeBackground", settings.theme.background],
                ["Ana Yüzey", "themeSurface", settings.theme.surface],
                ["İkincil Yüzey", "themeSurfaceAlt", settings.theme.surfaceAlt],
                ["Vurgu Rengi", "themeAccent", settings.theme.accent],
                ["Ana Metin", "themeText", settings.theme.text],
                ["Soluk Metin", "themeMuted", settings.theme.muted],
                ["Çizgi / Border", "themeBorder", settings.theme.border],
              ].map(([label, name, value]) => (
                <label className="admin-color-field" key={name}>
                  <span>{label}</span>
                  <div>
                    <input type="color" name={name} defaultValue={value} />
                    <code>{value}</code>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-grid form-grid--two">
              <Select
                label="Başlık Fontu"
                name="themeHeadingFont"
                defaultValue={settings.theme.headingFont}
              >
                <option value="system">Modern Sistem</option>
                <option value="geometric">Geometrik</option>
                <option value="humanist">Humanist</option>
                <option value="serif">Serif</option>
              </Select>
              <Select
                label="Gövde Fontu"
                name="themeBodyFont"
                defaultValue={settings.theme.bodyFont}
              >
                <option value="system">Modern Sistem</option>
                <option value="geometric">Geometrik</option>
                <option value="humanist">Humanist</option>
                <option value="serif">Serif</option>
              </Select>
              <Select
                label="Köşe Yuvarlaklığı"
                name="themeRadius"
                defaultValue={settings.theme.radius}
              >
                <option value="compact">Kompakt</option>
                <option value="soft">Yumuşak</option>
                <option value="rounded">Yuvarlak</option>
              </Select>
              <Select
                label="İçerik Genişliği"
                name="themeContainer"
                defaultValue={settings.theme.container}
              >
                <option value="narrow">Dar</option>
                <option value="standard">Standart</option>
                <option value="wide">Geniş</option>
              </Select>
              <TextInput
                label="Başlık Ölçeği"
                name="themeHeadingScale"
                type="number"
                min={0.75}
                max={1.25}
                step={0.05}
                defaultValue={settings.theme.headingScale}
              />
              <TextInput
                label="Metin Ölçeği"
                name="themeBodyScale"
                type="number"
                min={0.85}
                max={1.2}
                step={0.05}
                defaultValue={settings.theme.bodyScale}
              />
              <Select
                label="Animasyon Stili"
                name="motionPreset"
                defaultValue={settings.motion.preset}
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="scale">Scale</option>
                <option value="none">Animasyonsuz</option>
              </Select>
              <TextInput
                label="Animasyon Süresi (ms)"
                name="motionDuration"
                type="number"
                min={100}
                max={1600}
                step={50}
                defaultValue={settings.motion.duration}
              />
            </div>
            <label className="admin-switch-row">
              <input
                type="checkbox"
                name="motionEnabled"
                defaultChecked={settings.motion.enabled}
              />
              <span>Public sayfalarda animasyonları etkinleştir</span>
            </label>
          </section>

          <section
            className={
              activeTab === "navigation"
                ? "admin-panel"
                : "admin-panel is-hidden"
            }
          >
            <NavigationBuilder initial={settings.navigation} />
          </section>

          <section
            className={
              activeTab === "integrations"
                ? "admin-panel"
                : "admin-panel is-hidden"
            }
          >
            <h2>Entegrasyon Durumu</h2>
            <div className="admin-integration-grid">
              {[
                ["Supabase Public", integrations.supabasePublic],
                ["Supabase Admin", integrations.supabaseAdmin],
                ["E-posta", integrations.email],
                ["Turnstile", integrations.turnstile],
              ].map(([label, connected]) => (
                <article key={String(label)}>
                  <span
                    className={
                      connected
                        ? "admin-status-dot is-connected"
                        : "admin-status-dot"
                    }
                  />
                  <div>
                    <strong>{String(label)}</strong>
                    <p>{connected ? "Bağlı" : "Bağlı değil"}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="admin-help">
              Gizli anahtarlar bu ekranda gösterilmez. Yalnız bağlantı durumu
              görüntülenir.
            </p>
          </section>
        </div>
      </div>

      <div className="admin-settings__savebar">
        <div>
          <strong>
            {dirty
              ? "Kaydedilmemiş değişiklikler var"
              : hasDraft
                ? "Yayımlanmamış taslak hazır"
                : "Tüm değişiklikler kayıtlı"}
          </strong>
          <span>
            Taslak kaydı canlı siteyi değiştirmez. Önizleme gerçek public
            sayfalarda açılır.
          </span>
        </div>
        <div className="admin-publish-actions">
          <Button
            variant="secondary"
            disabled={pending}
            name="intent"
            value="draft"
            type="submit"
          >
            {pending ? (
              <Loader2 className="spin" aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" size={17} />
            )}
            Taslak Kaydet
          </Button>
          <Button
            variant="secondary"
            disabled={pending}
            name="intent"
            value="preview"
            type="submit"
          >
            <Eye aria-hidden="true" size={17} />
            Önizle
          </Button>
          <Button
            disabled={pending}
            name="intent"
            value="publish"
            type="submit"
          >
            <Rocket aria-hidden="true" size={17} />
            Yayımla
          </Button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export type ConsentPreferences = Readonly<{
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}>;

const STORAGE_KEY = "sdkongre-cookie-consent-v1";
const EVENT_NAME = "sdkongre:consent-changed";

function parseStoredConsent(): ConsentPreferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function persistConsent(preferences: ConsentPreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: preferences }),
  );
}

export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  return parseStoredConsent();
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const current = parseStoredConsent();
    if (!current) {
      setOpen(true);
    } else {
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    }

    function openSettings(event: Event) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-open-cookie-settings]")) {
        event.preventDefault();
        const stored = parseStoredConsent();
        setAnalytics(stored?.analytics ?? false);
        setMarketing(stored?.marketing ?? false);
        setOpen(true);
        setSettingsOpen(true);
      }
    }

    document.addEventListener("click", openSettings);
    return () => document.removeEventListener("click", openSettings);
  }, []);

  function save(nextAnalytics: boolean, nextMarketing: boolean) {
    persistConsent({
      necessary: true,
      analytics: nextAnalytics,
      marketing: nextMarketing,
      updatedAt: new Date().toISOString(),
    });
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    setOpen(false);
    setSettingsOpen(false);
  }

  if (!open) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-modal="true">
      <div className="cookie-consent__panel">
        <div>
          <p className="eyebrow">Çerez Tercihleri</p>
          <h2>Gizliliğinize önem veriyoruz.</h2>
          <p>
            Zorunlu çerezler sitenin çalışması için kullanılır. Analitik ve
            pazarlama çerezleri yalnız onayınız sonrasında etkinleştirilir.
            Ayrıntılar için{" "}
            <a href="/kvkk/cerez-politikasi">Çerez Politikası</a>.
          </p>
        </div>

        {settingsOpen ? (
          <div className="cookie-consent__settings">
            <label>
              <span>
                <strong>Zorunlu Çerezler</strong>
                <small>Site işlevleri için gereklidir.</small>
              </span>
              <input type="checkbox" checked disabled />
            </label>

            <label>
              <span>
                <strong>Analitik Çerezleri</strong>
                <small>Site kullanımını anonim olarak ölçer.</small>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>

            <label>
              <span>
                <strong>Pazarlama Çerezleri</strong>
                <small>Pazarlama ölçüm araçlarını etkinleştirir.</small>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </label>
          </div>
        ) : null}

        <div className="cookie-consent__actions">
          {settingsOpen ? (
            <>
              <Button
                variant="secondary"
                onClick={() => save(false, false)}
              >
                Yalnız Zorunlu
              </Button>
              <Button onClick={() => save(analytics, marketing)}>
                Tercihleri Kaydet
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => setSettingsOpen(true)}
              >
                Tercihleri Yönet
              </Button>
              <Button
                variant="secondary"
                onClick={() => save(false, false)}
              >
                Reddet
              </Button>
              <Button onClick={() => save(true, true)}>Kabul Et</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const consentEventName = EVENT_NAME;

"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

import {
  consentEventName,
  getStoredConsent,
  type ConsentPreferences,
} from "@/components/layout/cookie-consent";

function subscribeToConsent(onStoreChange: () => void) {
  function onConsentChange() {
    onStoreChange();
  }

  window.addEventListener(consentEventName, onConsentChange);

  return () => {
    window.removeEventListener(consentEventName, onConsentChange);
  };
}

function getConsentSnapshot() {
  const consent = getStoredConsent();
  return consent ? JSON.stringify(consent) : "";
}

function getServerConsentSnapshot() {
  return "";
}

function parseConsentSnapshot(
  snapshot: string,
): ConsentPreferences | null {
  if (!snapshot) return null;

  try {
    return JSON.parse(snapshot) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function AnalyticsLoader() {
  const snapshot = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const consent = parseConsentSnapshot(snapshot);

  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

  return (
    <>
      {consent?.analytics && gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="sdkongre-ga" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {consent?.marketing && pixelId ? (
        <Script id="sdkongre-meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}

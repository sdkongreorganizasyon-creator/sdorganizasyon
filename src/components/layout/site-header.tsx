"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MenuOverlay } from "@/components/layout/menu-overlay";
import { navigation } from "@/config/navigation";
import type { ResolvedSiteSettings } from "@/lib/content/settings";

const desktopIds = new Set([
  "home",
  "corporate",
  "services",
  "digital-services",
  "references",
  "contact",
]);

export function SiteHeader({
  settings,
}: Readonly<{ settings: ResolvedSiteSettings }>) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 24);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const desktopNavigation = navigation.filter((item) =>
    desktopIds.has(item.id),
  );

  return (
    <header
      className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
    >
      <div className="container site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="Ana sayfa">
          <span className="site-header__logo-halo" aria-hidden="true" />
          <Logo
            compact
            priority
            src={settings.branding.headerLogoUrl}
            className="site-header__logo"
          />
        </Link>

        <nav className="site-header__desktop-nav" aria-label="Ana menü">
          {desktopNavigation.map((item) => (
            <Link href={item.href} key={item.id}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link
            className="site-header__quote"
            href={settings.header.quoteButtonUrl || "/teklif-al"}
          >
            <span>{settings.header.quoteButtonLabel || "Teklif Al"}</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>

          <MenuOverlay buttonLabel={settings.header.menuButtonLabel} />
        </div>
      </div>
    </header>
  );
}

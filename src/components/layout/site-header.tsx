"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MenuOverlay } from "@/components/layout/menu-overlay";
import type { ResolvedSiteSettings } from "@/lib/content/settings";

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

  const desktopNavigation = settings.navigation
    .filter((item) => item.visible && item.showInHeader)
    .slice(0, 7);

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
          {desktopNavigation.map((item) => {
            const visibleChildren = item.children?.filter(
              (child) => child.visible,
            );

            if (item.id === "corporate" && visibleChildren?.length) {
              return (
                <details className="site-header__dropdown" key={item.id}>
                  <summary>
                    <span>{item.label}</span>
                    <ChevronDown aria-hidden="true" size={14} />
                  </summary>
                  <div className="site-header__dropdown-menu">
                    {visibleChildren.map((child) => (
                      <Link href={child.href} key={child.id}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            }

            return (
              <Link href={item.href} key={item.id}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <Link
            className="site-header__quote"
            href={settings.header.quoteButtonUrl || "/teklif-al"}
          >
            <span>{settings.header.quoteButtonLabel || "Teklif Al"}</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>

          <MenuOverlay
            buttonLabel={settings.header.menuButtonLabel}
            navigation={settings.navigation}
          />
        </div>
      </div>
    </header>
  );
}

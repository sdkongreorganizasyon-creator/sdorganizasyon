"use client";

import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type { ResolvedNavigationItem } from "@/lib/content/settings";

export function MenuOverlay({
  buttonLabel = "Menü",
  navigation,
}: Readonly<{
  buttonLabel?: string;
  navigation: readonly ResolvedNavigationItem[];
}>) {
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const dialogId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  const visibleNavigation = navigation.filter((item) => item.visible);

  return (
    <>
      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-controls={dialogId}
        aria-expanded={open}
        disabled={!hydrated}
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" size={20} />
        <span>{buttonLabel || "Menü"}</span>
      </button>

      {open ? (
        <div
          className="menu-overlay"
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menüsü"
        >
          <div
            className="menu-overlay__backdrop"
            aria-hidden="true"
            onClick={closeMenu}
          />

          <div className="menu-overlay__panel">
            <div className="menu-overlay__top">
              <div>
                <p>SDKONGRE</p>
                <span>Tüm sayfalar</span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Menüyü kapat"
                onClick={closeMenu}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="menu-overlay__scroll">
              <nav className="menu-overlay__grid" aria-label="Tüm sayfalar">
                {visibleNavigation.map((item) => (
                  <section
                    className="menu-group"
                    key={item.id}
                    aria-labelledby={`menu-${item.id}`}
                  >
                    <Link
                      className="menu-group__heading"
                      href={item.href}
                      id={`menu-${item.id}`}
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </Link>

                    {item.children?.some((child) => child.visible) ? (
                      <ul>
                        {item.children
                          .filter((child) => child.visible)
                          .map((child) => (
                            <li key={child.id}>
                              <Link href={child.href} onClick={closeMenu}>
                                <ChevronRight aria-hidden="true" size={15} />
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

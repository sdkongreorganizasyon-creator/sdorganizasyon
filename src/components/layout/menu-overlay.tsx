"use client";

import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { navigation } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button";

export function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialogId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (event.key !== "Tab") return;

      const container = document.getElementById(dialogId);
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [dialogId, open]);

  return (
    <>
      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-controls={dialogId}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" size={20} />
        <span>Menü</span>
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
            onClick={() => setOpen(false)}
          />

          <div className="menu-overlay__panel">
            <div className="menu-overlay__top">
              <p>SDKONGRE</p>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Menüyü kapat"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="menu-overlay__scroll">
              <nav className="menu-overlay__grid" aria-label="Tüm sayfalar">
                {navigation.map((item, index) => (
                  <section
                    className="menu-group"
                    key={item.id}
                    aria-labelledby={`menu-${item.id}`}
                  >
                    <Link
                      className="menu-group__heading"
                      href={item.href}
                      id={`menu-${item.id}`}
                    >
                      <span className="menu-group__number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </Link>

                    {item.children?.length ? (
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link href={child.href}>
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

              <div className="menu-overlay__cta">
                <p>
                  Organizasyonunuzun kapsamını paylaşın; ihtiyaçlarınızı
                  birlikte planlayalım.
                </p>
                <ButtonLink href="/teklif-al">Teklif Al</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

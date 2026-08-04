import { MessageCircle } from "lucide-react";

import type { ResolvedSiteSettings } from "@/lib/content/settings";
import { normalizeWhatsapp } from "@/lib/utils/format";

export function WhatsappFab({
  settings,
}: Readonly<{ settings: ResolvedSiteSettings }>) {
  if (!settings.contact.whatsapp) return null;

  const message = encodeURIComponent(
    "Merhaba, etkinlik organizasyonu hakkında bilgi almak istiyorum.",
  );

  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${normalizeWhatsapp(
        settings.contact.whatsapp,
      )}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp üzerinden iletişime geçin"
    >
      <MessageCircle aria-hidden="true" />
    </a>
  );
}

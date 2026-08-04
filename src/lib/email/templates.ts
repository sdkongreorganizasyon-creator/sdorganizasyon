import type { ContactInput } from "@/lib/validation/contact";
import type { QuoteInput } from "@/lib/validation/quote";

function escapeHtml(value: string | undefined | null) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string | undefined | null) {
  if (!value) return "";

  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td>
    </tr>
  `;
}

export function contactEmailTemplate(input: ContactInput) {
  return `
    <div style="font-family:Arial,sans-serif;color:#25313c">
      <h1 style="color:#071a2f">Yeni İletişim Mesajı</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        ${row("Ad Soyad", input.fullName)}
        ${row("Firma / Kurum", input.company)}
        ${row("E-posta", input.email)}
        ${row("Telefon", input.phone)}
        ${row("Konu", input.subject)}
      </table>
      <h2 style="margin-top:24px;color:#071a2f">Mesaj</h2>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(input.message)}</p>
    </div>
  `;
}

export function quoteEmailTemplate(input: QuoteInput) {
  return `
    <div style="font-family:Arial,sans-serif;color:#25313c">
      <h1 style="color:#071a2f">Yeni Teklif Talebi</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        ${row("Ad Soyad", input.fullName)}
        ${row("Firma / Kurum", input.company)}
        ${row("E-posta", input.email)}
        ${row("Telefon", input.phone)}
        ${row("Organizasyon Türü", input.eventType)}
        ${row("Başlangıç Tarihi", input.eventDate)}
        ${row("Bitiş Tarihi", input.eventEndDate)}
        ${row("Şehir", input.city)}
        ${row("Mekân", input.venue)}
        ${row("Katılımcı Sayısı", input.attendeeCount || null)}
        ${row("Hizmetler", input.services.join(", "))}
        ${row("Kaynak", input.source)}
      </table>
      <h2 style="margin-top:24px;color:#071a2f">Notlar</h2>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(input.notes)}</p>
    </div>
  `;
}

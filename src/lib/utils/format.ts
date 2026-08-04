export function formatDate(
  value: string | null | undefined,
  locale = "tr-TR",
): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function normalizePhoneForLink(value: string): string {
  return value.replace(/[^+\d]/g, "");
}

export function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, "");
}


export function utcToIstanbulDateTimeLocal(value: string | null | undefined) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const istanbulTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
  return istanbulTime.toISOString().slice(0, 16);
}

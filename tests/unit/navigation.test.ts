import { describe, expect, it } from "vitest";

import {
  lockedNavigationLabels,
  navigation,
} from "@/config/navigation";

const expectedLabels = [
  "ANA SAYFA",
  "KURUMSAL",
  "Hakkımızda",
  "Hikayemiz",
  "Misyon",
  "Vizyon",
  "Değerlerimiz",
  "NEDEN BİZ",
  "HİZMETLERİMİZ",
  "Lansman ve Kurumsal Etkinlikler",
  "Kongre Organizasyonları",
  "Toplantı  ve Sempozyum Yönetimi",
  "Workshop Organizasyonları",
  "Fuar ve Sergi Organizasyonları",
  "Seyahat ve Konaklama Yönetimi",
  "Transfer ve lojistik Yönetimi",
  "Tedarikçi ve Operasyon Yönetimi",
  "DİJİTAL HİZMETLER",
  "Katılımcı ve Kayıt Yönetimi",
  "Dijital Altyapı ve Etkinlik Teknolojileri",
  "QR Kod ve Yaka Kart Sistemleri",
  "Online Davet ve İletişim Yönetimi",
  "Organizasyon Takip Sistemleri",
  "Veri ve Raporlama Sistemleri",
  "Veri Güvenliği ve Merkezi Yönetim",
  "ORGANİZASYON SURECİ",
  "PROJELER",
  "REFERANSLAR",
  "KVKK",
  "KVKK Aydınlatma Metni",
  "Gizlilik Politikası",
  "Çerez (Cookie) Politikası",
  "Açık Rıza Metni",
  "Yasal Dayanaklar",
  "İLETİŞİM",
];

describe("locked navigation", () => {
  it("keeps every visible label unchanged", () => {
    expect(lockedNavigationLabels).toEqual(expectedLabels);
  });

  it("uses unique ids and paths", () => {
    const items = navigation.flatMap((item) => [
      { id: item.id, href: item.href },
      ...(item.children?.map((child) => ({
        id: child.id,
        href: child.href,
      })) ?? []),
    ]);

    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(new Set(items.map((item) => item.href)).size).toBe(items.length);
  });

  it("uses normalized technical paths", () => {
    const paths = navigation.flatMap((item) => [
      item.href,
      ...(item.children?.map((child) => child.href) ?? []),
    ]);

    expect(paths.every((path) => /^\/[a-z0-9/-]*(?:#[a-z0-9-]+)?$/.test(path))).toBe(true);
  });
});

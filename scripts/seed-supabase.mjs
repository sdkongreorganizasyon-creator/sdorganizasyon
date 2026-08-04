import fs from "node:fs/promises";
import process from "node:process";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const secretKey =
  process.env.SUPABASE_SECRET_KEY?.trim() ||
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !secretKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SECRET_KEY gereklidir.",
  );
  process.exit(1);
}

const seedUrl = new URL("../supabase/seed-data.json", import.meta.url);
const seed = JSON.parse(await fs.readFile(seedUrl, "utf8"));

const supabase = createClient(url, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const operations = [
  {
    table: "site_settings",
    rows: seed.siteSettings,
    onConflict: "key,locale",
  },
  {
    table: "pages",
    rows: seed.pages,
    onConflict: "locale,page_key",
  },
  {
    table: "services",
    rows: seed.services,
    onConflict: "locale,category,slug",
  },
  {
    table: "process_steps",
    rows: seed.processSteps,
    onConflict: "locale,step_key",
  },
  {
    table: "legal_documents",
    rows: seed.legalDocuments,
    onConflict: "locale,document_key",
  },
];

for (const operation of operations) {
  const { error } = await supabase
    .from(operation.table)
    .upsert(operation.rows, {
      onConflict: operation.onConflict,
      ignoreDuplicates: false,
    });

  if (error) {
    console.error(`${operation.table} seed başarısız:`, error.message);
    process.exit(1);
  }

  console.log(
    `${operation.table}: ${operation.rows.length} kayıt başarıyla işlendi.`,
  );
}

console.log("SDKONGRE kaynak içerikleri Supabase'e aktarıldı.");
console.log(
  "Projeler ve referanslar bilinçli olarak seed edilmedi; yalnız gerçek kayıtlar admin panelinden eklenmelidir.",
);

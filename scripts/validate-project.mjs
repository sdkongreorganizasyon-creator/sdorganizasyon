import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const warnings = [];

const requiredFiles = [
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "postcss.config.mjs",
  "playwright.config.ts",
  ".env.example",
  "src/proxy.ts",
  "src/app/layout.tsx",
  "src/app/(site)/layout.tsx",
  "src/app/(site)/page.tsx",
  "src/app/(site)/kurumsal/page.tsx",
  "src/app/(site)/kurumsal/[slug]/page.tsx",
  "src/app/(site)/neden-biz/page.tsx",
  "src/app/(site)/hizmetlerimiz/page.tsx",
  "src/app/(site)/hizmetlerimiz/[slug]/page.tsx",
  "src/app/(site)/dijital-hizmetler/page.tsx",
  "src/app/(site)/dijital-hizmetler/[slug]/page.tsx",
  "src/app/(site)/organizasyon-sureci/page.tsx",
  "src/app/(site)/projeler/page.tsx",
  "src/app/(site)/projeler/[slug]/page.tsx",
  "src/app/(site)/referanslar/page.tsx",
  "src/app/(site)/kvkk/page.tsx",
  "src/app/(site)/kvkk/[slug]/page.tsx",
  "src/app/(site)/iletisim/page.tsx",
  "src/app/(site)/teklif-al/page.tsx",
  "src/app/admin/login/page.tsx",
  "src/app/admin/(protected)/layout.tsx",
  "src/app/admin/(protected)/page.tsx",
  "src/app/api/contact/route.ts",
  "src/app/api/quote/route.ts",
  "src/app/api/cron/publish/route.ts",
  "src/config/navigation.ts",
  "src/content/site-content.ts",
  "src/types/database.ts",
  "supabase/migrations/202608040001_initial_schema.sql",
  "supabase/seed-data.json",
  "supabase/seed.sql",
  "vercel.json",
  ".github/workflows/quality.yml",
  ".github/workflows/e2e.yml",
  "README.md",
  "BROWSER_ONLY_KURULUM.md",
  "docs/SUPABASE_SETUP.md",
  "docs/VERCEL_DEPLOYMENT.md",
  "docs/NATRO_DOMAIN_DNS.md",
];

const lockedLabels = [
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

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Eksik zorunlu dosya: ${file}`);
  }
}

const navigationPath = path.join(root, "src/config/navigation.ts");
if (fs.existsSync(navigationPath)) {
  const navigation = fs.readFileSync(navigationPath, "utf8");

  for (const label of lockedLabels) {
    if (!navigation.includes(`label: "${label}"`)) {
      failures.push(`Menü etiketi eksik veya değişmiş: ${label}`);
    }
  }
}

const homePath = path.join(root, "src/app/(site)/page.tsx");
if (fs.existsSync(homePath)) {
  const home = fs.readFileSync(homePath, "utf8");
  if (!home.includes("<Hero ") || !home.includes("<ValueGrid ")) {
    failures.push("Ana sayfa Hero ve ValueGrid bileşenlerini içermiyor.");
  }

  const forbiddenHomeComponents = [
    "ServiceCard",
    "ProjectCard",
    "ReferenceGrid",
    "Testimonial",
    "Blog",
  ];

  for (const component of forbiddenHomeComponents) {
    if (home.includes(component)) {
      failures.push(`Ana sayfada kapsam dışı bileşen bulundu: ${component}`);
    }
  }
}

const seedPath = path.join(root, "supabase/seed-data.json");
if (fs.existsSync(seedPath)) {
  const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
  const expectedCounts = {
    siteSettings: 1,
    pages: 6,
    services: 15,
    processSteps: 6,
    legalDocuments: 5,
  };

  for (const [key, expected] of Object.entries(expectedCounts)) {
    if (!Array.isArray(seed[key]) || seed[key].length !== expected) {
      failures.push(
        `Seed sayısı hatalı: ${key}, beklenen ${expected}, bulunan ${seed[key]?.length ?? "yok"}`,
      );
    }
  }

  const values = seed.siteSettings?.[0]?.value_json?.homeValues;
  if (!Array.isArray(values) || values.length !== 5) {
    failures.push("Global seed içinde tam olarak beş ana sayfa değer kartı bulunmalıdır.");
  }

  if ("projects" in seed || "references" in seed) {
    failures.push(
      "Seed içinde sahte proje veya referans alanı bulunmamalıdır.",
    );
  }
}

const migrationPath = path.join(
  root,
  "supabase/migrations/202608040001_initial_schema.sql",
);
if (fs.existsSync(migrationPath)) {
  const migration = fs.readFileSync(migrationPath, "utf8");
  const rlsTables = [
    "profiles",
    "site_settings",
    "pages",
    "media_assets",
    "services",
    "process_steps",
    "projects",
    "project_services",
    "project_media",
    "references",
    "legal_documents",
    "contact_messages",
    "quote_requests",
    "audit_logs",
    "content_versions",
    "form_events",
  ];

  for (const table of rlsTables) {
    if (
      !migration.includes(
        `alter table public.${table} enable row level security;`,
      )
    ) {
      failures.push(`RLS etkinleştirme satırı eksik: ${table}`);
    }
  }

  if (!migration.includes("SUPABASE_SERVICE_ROLE_KEY")) {
    // Expected not to be present in SQL; this check is intentionally empty.
  }
}

const packagePath = path.join(root, "package.json");
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const scripts = [
    "dev",
    "build",
    "start",
    "lint",
    "type-check",
    "test",
    "test:e2e",
    "validate",
    "seed:supabase",
    "check",
  ];

  for (const script of scripts) {
    if (!packageJson.scripts?.[script]) {
      failures.push(`Eksik npm script: ${script}`);
    }
  }

  if (packageJson.dependencies?.next !== "16.2.12") {
    warnings.push(
      `Next.js sürümü beklenenden farklı: ${packageJson.dependencies?.next}`,
    );
  }
}

const secretFiles = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.development.local",
];

for (const file of secretFiles) {
  if (fs.existsSync(path.join(root, file))) {
    failures.push(`GitHub paketinde gizli ortam dosyası bulunuyor: ${file}`);
  }
}

const secretPatterns = [
  /SUPABASE_SERVICE_ROLE_KEY\s*=\s*[A-Za-z0-9_-]{20,}/,
  /RESEND_API_KEY\s*=\s*re_[A-Za-z0-9_-]+/,
  /TURNSTILE_SECRET_KEY\s*=\s*\S{15,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];

const textExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".json",
  ".md",
  ".sql",
  ".yml",
  ".yaml",
  ".example",
  ".txt",
]);

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!textExtensions.has(path.extname(entry.name))) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        failures.push(
          `Olası gizli anahtar bulundu: ${path.relative(root, fullPath)}`,
        );
        break;
      }
    }
  }
}

walk(root);

if (failures.length) {
  console.error("\nSDKONGRE proje doğrulaması başarısız:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SDKONGRE proje doğrulaması başarılı.");
console.log(`Zorunlu dosyalar: ${requiredFiles.length}/${requiredFiles.length}`);
console.log(`Kilitli menü etiketleri: ${lockedLabels.length}/${lockedLabels.length}`);

if (warnings.length) {
  console.warn("\nUyarılar:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

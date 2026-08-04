import { Database, ExternalLink } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

export function SetupRequired() {
  return (
    <main className="admin-setup">
      <div className="admin-setup__card">
        <Database aria-hidden="true" size={42} />
        <p className="eyebrow">SUPABASE KURULUMU GEREKLİ</p>
        <h1>Yönetim paneli henüz etkin değil.</h1>
        <p>
          Supabase projesini oluşturun, migration dosyasını çalıştırın ve
          Vercel environment değişkenlerini ekleyin. Public site Supabase
          olmadan kaynak metinlerle çalışmaya devam eder.
        </p>
        <div className="admin-setup__actions">
          <ButtonLink href="/" variant="secondary">
            Siteye Dön
          </ButtonLink>
          <a
            className="button button--primary"
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
          >
            Supabase Dashboard
            <ExternalLink aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </main>
  );
}

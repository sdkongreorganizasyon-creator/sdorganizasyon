import { ButtonLink } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="standalone-state">
      <div className="standalone-state__panel">
        <p className="eyebrow">404</p>
        <h1>Aradığınız sayfa bulunamadı.</h1>
        <p>
          Adresi kontrol edebilir veya ana sayfadan yeniden başlayabilirsiniz.
        </p>
        <div className="standalone-state__actions">
          <ButtonLink href="/">Ana Sayfaya Dön</ButtonLink>
          <ButtonLink href="/iletisim" variant="secondary">
            İletişim
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}

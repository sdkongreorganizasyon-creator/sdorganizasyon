"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="standalone-state">
      <div className="standalone-state__panel">
        <p className="eyebrow">SİSTEM BİLDİRİMİ</p>
        <h1>Sayfa şu anda görüntülenemiyor.</h1>
        <p>
          İşlemi yeniden deneyin. Sorun devam ederse daha sonra tekrar ziyaret
          edin.
        </p>
        <Button onClick={reset}>Yeniden Dene</Button>
      </div>
    </main>
  );
}

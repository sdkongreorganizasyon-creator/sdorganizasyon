# Katkı Rehberi

## Branch

- `feature/*`
- `fix/*`
- `hotfix/*`
- `docs/*`

## Pull request öncesi

```bash
npm run validate
npm run type-check
npm run lint
npm run test
npm run build
```

## Değişmez kurallar

- Menü başlıklarını değiştirmeyin.
- Ana sayfaya kapsam dışı bölüm eklemeyin.
- Sahte proje, referans veya istatistik eklemeyin.
- Tasarım tokenlarını rastgele değerlerle bypass etmeyin.
- Supabase schema değişikliğini migration olmadan yapmayın.
- Gizli anahtarları commit etmeyin.

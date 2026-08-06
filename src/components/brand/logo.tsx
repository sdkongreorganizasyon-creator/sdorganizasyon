import Image from "next/image";

import { brandAssets } from "@/config/media";

type LogoProps = Readonly<{
  variant?: "light" | "dark";
  compact?: boolean;
  className?: string;
  src?: string | null;
  priority?: boolean;
}>;

export function Logo({
  compact = false,
  className,
  src,
  priority = false,
}: LogoProps) {
  const resolvedSrc =
    src || (compact ? brandAssets.compactLogo : brandAssets.headerLogo);

  return (
    <Image
      className={className}
      src={resolvedSrc}
      alt="SD Kongre Organizasyon Hizmetleri"
      width={1424}
      height={1172}
      priority={priority}
      sizes={compact ? "150px" : "280px"}
    />
  );
}

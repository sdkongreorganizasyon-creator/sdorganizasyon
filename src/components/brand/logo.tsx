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
  variant = "light",
  compact = false,
  className,
  src,
  priority = false,
}: LogoProps) {
  const defaultSrc =
    variant === "dark"
      ? "/brand/sdkongre-logo-light.png"
      : compact
        ? brandAssets.compactLogo
        : brandAssets.headerLogo;
  const resolvedSrc = src || defaultSrc;

  return (
    <Image
      className={className}
      src={resolvedSrc}
      alt="SD Kongre Organizasyon Hizmetleri"
      width={1509}
      height={1042}
      priority={priority}
      sizes={compact ? "150px" : "280px"}
    />
  );
}

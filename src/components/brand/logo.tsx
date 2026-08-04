type LogoProps = Readonly<{
  variant?: "light" | "dark";
  compact?: boolean;
  className?: string;
}>;

export function Logo({
  variant = "light",
  compact = false,
  className,
}: LogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#0E1116";

  return (
    <svg
      className={className}
      viewBox={compact ? "0 0 180 86" : "0 0 320 150"}
      role="img"
      aria-labelledby="sd-logo-title"
    >
      <title id="sd-logo-title">SD Kongre Organizasyon Hizmetleri</title>

      <g transform={compact ? "translate(10 6)" : "translate(34 10)"}>
        <text
          x="0"
          y={compact ? "57" : "92"}
          fill={textColor}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={compact ? "64" : "112"}
          fontWeight="300"
          letterSpacing="-4"
        >
          SD
        </text>

        <polygon
          points={compact ? "112,6 142,20 118,42" : "190,0 244,28 202,66"}
          fill="#FF7200"
        />
        <polygon
          points={compact ? "82,28 105,13 115,48" : "142,49 179,20 193,78"}
          fill="#23A8E8"
        />
        <polygon
          points={compact ? "120,43 145,25 160,61" : "200,78 245,37 278,103"}
          fill="#7ED957"
        />
      </g>

      {!compact ? (
        <g
          fill={textColor}
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
        >
          <text x="160" y="118" fontSize="25" fontWeight="400">
            Kongre
          </text>
          <text x="160" y="139" fontSize="20" fontWeight="400">
            Organizasyon Hizmetleri
          </text>
        </g>
      ) : null}
    </svg>
  );
}

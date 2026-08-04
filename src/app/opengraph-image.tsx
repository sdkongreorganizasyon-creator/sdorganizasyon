import { ImageResponse } from "next/og";

import { designTokens } from "@/config/design-tokens";

export const alt = "SD Kongre Organizasyon Hizmetleri";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: "72px",
          background: `linear-gradient(135deg, ${designTokens.color.navy}, ${designTokens.color.graphite})`,
          color: designTokens.color.white,
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            right: -120,
            top: -180,
            background: "rgba(212,175,55,.2)",
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            <span style={{ color: designTokens.color.gold }}>SD</span>
            <span>KONGRE</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 900,
            }}
          >
            <div
              style={{
                fontSize: 76,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: -3,
              }}
            >
              Doğru Planlama. Unutulmaz Deneyimler.
            </div>
            <div
              style={{
                fontSize: 28,
                color: "rgba(255,255,255,.7)",
              }}
            >
              Kongre, toplantı ve etkinlik organizasyonlarında uçtan uca
              profesyonel çözümler.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

export const designTokens = {
  color: {
    navy: "#071A2F",
    graphite: "#0E1116",
    gold: "#D4AF37",
    goldDark: "#A88420",
    white: "#FFFFFF",
    surfaceSoft: "#F3F5F7",
    borderSoft: "#D9DEE5",
    textPrimary: "#25313C",
    textMuted: "#637282",
    success: "#2E7D5A",
    error: "#B54747",
    warning: "#B86B25",
  },
  spacing: [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160],
  radius: {
    button: 16,
    input: 14,
    card: 24,
    media: 32,
  },
  container: {
    laptop: 1280,
    desktop: 1440,
  },
  motion: {
    fast: 0.18,
    base: 0.28,
    slow: 0.58,
    easing: [0.22, 1, 0.36, 1],
  },
} as const;

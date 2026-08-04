type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
  action?: string;
};

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    return { success: true, skipped: true as const };
  }

  if (!token) {
    return {
      success: false,
      skipped: false as const,
      error: "missing-token",
    };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );

  const result = (await response.json()) as TurnstileResponse;

  return {
    success: result.success,
    skipped: false as const,
    error: result["error-codes"]?.join(",") || null,
  };
}

import type { SupabaseClient } from "@supabase/supabase-js";

type RateLimitOptions = Readonly<{
  formType: "contact" | "quote";
  ipHash: string;
  maxAttempts?: number;
  windowMinutes?: number;
}>;

export async function checkRateLimit(
  supabase: SupabaseClient,
  {
    formType,
    ipHash,
    maxAttempts = 6,
    windowMinutes = 10,
  }: RateLimitOptions,
) {
  const since = new Date(
    Date.now() - windowMinutes * 60 * 1000,
  ).toISOString();

  const { count, error } = await supabase
    .from("form_events")
    .select("id", { count: "exact", head: true })
    .eq("form_type", formType)
    .eq("event_type", "attempt")
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) {
    throw new Error(`Rate limit query failed: ${error.message}`);
  }

  return {
    allowed: (count ?? 0) < maxAttempts,
    remaining: Math.max(0, maxAttempts - (count ?? 0)),
  };
}

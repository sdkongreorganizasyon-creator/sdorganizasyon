import { createClient } from "@supabase/supabase-js";

import { getSupabaseAdminConfig } from "@/lib/supabase/config";

export function createAdminClient() {
  const { url, secretKey } = getSupabaseAdminConfig();

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

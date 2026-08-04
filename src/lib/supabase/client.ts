"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicConfig } from "@/lib/supabase/config";

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  const { url, publicKey } = getSupabasePublicConfig();

  if (!browserClient) {
    browserClient = createBrowserClient(url, publicKey);
  }

  return browserClient;
}

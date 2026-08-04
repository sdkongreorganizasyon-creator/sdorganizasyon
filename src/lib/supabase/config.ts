export function getSupabasePublicKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    ""
  );
}

export function getSupabaseSecretKey() {
  return (
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    ""
  );
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      getSupabasePublicKey(),
  );
}

export function isSupabaseAdminConfigured() {
  return Boolean(isSupabaseConfigured() && getSupabaseSecretKey());
}

export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publicKey = getSupabasePublicKey();

  if (!url || !publicKey) {
    throw new Error(
      "Supabase public environment variables are not configured.",
    );
  }

  return { url, publicKey };
}

export function getSupabaseAdminConfig() {
  const { url } = getSupabasePublicConfig();
  const secretKey = getSupabaseSecretKey();

  if (!secretKey) {
    throw new Error(
      "SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY is not configured.",
    );
  }

  return { url, secretKey };
}

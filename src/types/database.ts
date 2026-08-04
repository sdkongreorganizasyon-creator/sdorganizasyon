export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ContentStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";

export type UserRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "content_author"
  | "sales_ops"
  | "viewer";

/**
 * Supabase clients are intentionally instantiated without a checked-in
 * generated Database generic so the repository can be configured before the
 * remote project exists.
 *
 * After creating the Supabase project, generate exact remote types with:
 *
 * npx supabase gen types typescript --project-id PROJECT_ID  *   > src/types/supabase-generated.ts
 *
 * The migration SQL remains the authoritative schema in Git.
 */
export type Database = {
  public: {
    Tables: Record<
      string,
      {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      }
    >;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      content_status: ContentStatus;
      user_role: UserRole;
    };
    CompositeTypes: Record<string, never>;
  };
};

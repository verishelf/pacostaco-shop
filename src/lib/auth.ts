export type UserRole = "corporate_admin" | "franchise_owner" | "store_manager";

export interface UserRoleRecord {
  id: string;
  user_id: string;
  org_id: string | null;
  location_id: string | null;
  role: UserRole;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export const DEMO_AUTH_COOKIE = "pacos_demo_auth";

export function getPostLoginPath(role: UserRole | null): string {
  if (role === "corporate_admin") {
    return "/admin/leads";
  }
  return "/backoffice";
}

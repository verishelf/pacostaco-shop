import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  DEMO_AUTH_COOKIE,
  isSupabaseConfigured,
  type UserRole,
  type UserRoleRecord,
} from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function isDemoAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(DEMO_AUTH_COOKIE)?.value === "1";
}

export async function getAuthUser() {
  if (!isSupabaseConfigured()) {
    if (await isDemoAuthenticated()) {
      return {
        id: "demo-user",
        email: "maria@example.com",
        isDemo: true as const,
      };
    }
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return { ...user, isDemo: false as const };
}

export async function getUserRoles(): Promise<UserRoleRecord[]> {
  const user = await getAuthUser();
  if (!user) {
    return [];
  }

  if (user.isDemo) {
    return [
      {
        id: "demo-role",
        user_id: user.id,
        org_id: "00000000-0000-0000-0000-000000000002",
        location_id: "00000000-0000-0000-0000-000000000010",
        role: "franchise_owner",
      },
    ];
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user.id);

  return (data ?? []) as UserRoleRecord[];
}

export async function getPrimaryRole(): Promise<UserRole | null> {
  const roles = await getUserRoles();
  if (roles.some((role) => role.role === "corporate_admin")) {
    return "corporate_admin";
  }
  if (roles.some((role) => role.role === "franchise_owner")) {
    return "franchise_owner";
  }
  if (roles.some((role) => role.role === "store_manager")) {
    return "store_manager";
  }
  return null;
}

export async function requireAuth(): Promise<boolean> {
  const user = await getAuthUser();
  return Boolean(user);
}

export async function setDemoAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_AUTH_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearDemoAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_AUTH_COOKIE);
}

export function createMiddlewareClient(
  request: Request,
  responseHeaders: Headers,
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            responseHeaders.append(
              "Set-Cookie",
              serializeCookie(name, value, options),
            );
          });
        },
      },
    },
  );
}

function parseCookieHeader(header: string) {
  return header
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [name, ...rest] = part.split("=");
      return { name, value: rest.join("=") };
    });
}

function serializeCookie(name: string, value: string, options?: Record<string, unknown>) {
  const parts = [`${name}=${value}`];
  if (options?.path) parts.push(`Path=${options.path}`);
  if (options?.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  if (options?.httpOnly) parts.push("HttpOnly");
  if (options?.sameSite) parts.push(`SameSite=${options.sameSite}`);
  return parts.join("; ");
}

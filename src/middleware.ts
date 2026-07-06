import { NextResponse, type NextRequest } from "next/server";
import { DEMO_AUTH_COOKIE, isSupabaseConfigured } from "@/lib/auth";
import { createMiddlewareClient } from "@/lib/auth-server";

const protectedPrefixes = ["/backoffice", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const response = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    const hasDemoAuth = request.cookies.get(DEMO_AUTH_COOKIE)?.value === "1";
    if (!hasDemoAuth) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  const supabase = createMiddlewareClient(request, response.headers);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    const isCorporate = roles?.some((role) => role.role === "corporate_admin");
    if (!isCorporate) {
      const backofficeUrl = request.nextUrl.clone();
      backofficeUrl.pathname = "/backoffice";
      return NextResponse.redirect(backofficeUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/backoffice/:path*", "/admin/:path*"],
};

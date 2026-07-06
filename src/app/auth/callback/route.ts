import { NextResponse } from "next/server";
import { getPostLoginPath } from "@/lib/auth";
import { getPrimaryRole } from "@/lib/auth-server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (!isSupabaseConfigured() || !code) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  const role = await getPrimaryRole();
  const destination = next ?? getPostLoginPath(role);
  return NextResponse.redirect(`${origin}${destination}`);
}

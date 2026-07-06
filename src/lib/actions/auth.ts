"use server";

import { redirect } from "next/navigation";
import { getPostLoginPath } from "@/lib/auth";
import {
  clearDemoAuthCookie,
  getPrimaryRole,
  setDemoAuthCookie,
} from "@/lib/auth-server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/backoffice");

  if (!isSupabaseConfigured()) {
    await setDemoAuthCookie();
    redirect(next || "/backoffice");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  const role = await getPrimaryRole();
  redirect(next || getPostLoginPath(role));
}

export async function signInDemo(next: string) {
  await setDemoAuthCookie();
  redirect(next || "/backoffice");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  await clearDemoAuthCookie();
  redirect("/auth/login");
}

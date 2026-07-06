"use client";

import { useState } from "react";
import Link from "next/link";
import { signInDemo, signInWithPassword } from "@/lib/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface LoginFormProps {
  nextPath: string;
}

export function LoginForm({ nextPath }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabaseReady = isSupabaseConfigured();

  async function handlePasswordLogin(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signInWithPassword(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleDemoLogin() {
    setLoading(true);
    await signInDemo(nextPath);
  }

  return (
    <div className="space-y-4">
      {!supabaseReady && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm text-gray-600">
          Supabase is not configured. Use demo access to explore the franchise portal.
        </div>
      )}

      {supabaseReady && (
        <form action={handlePasswordLogin} className="space-y-4">
          <input type="hidden" name="next" value={nextPath} />
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold text-taco-dark">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="owner@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-bold text-taco-dark"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-taco-teal py-3 text-sm font-bold text-white hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full rounded-xl border-2 border-taco-teal py-3 text-sm font-bold text-taco-teal hover:bg-teal-50 disabled:opacity-50"
      >
        {supabaseReady ? "Continue with Demo Access" : "Enter Back Office (Demo)"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Interested in franchising?{" "}
        <Link href="/franchise" className="font-bold text-taco-teal hover:underline">
          Learn more
        </Link>
        {" · "}
        <Link href="/" className="text-taco-teal hover:underline">
          Back to site
        </Link>
      </p>
    </div>
  );
}

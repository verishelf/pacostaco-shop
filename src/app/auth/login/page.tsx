import Link from "next/link";

export const metadata = {
  title: "Sign In | Paco's Taco Shop",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-taco-cream px-4">
      <div className="w-full max-w-md rounded-3xl border border-amber-100 bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-black text-taco-red uppercase">
          Franchise Portal
        </h1>
        <p className="mb-8 text-center text-sm text-gray-600">
          Sign in to manage your Paco&apos;s Taco Shop location
        </p>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm text-gray-600">
          Authentication will be powered by Supabase Auth in Phase 2. This page
          is a placeholder for the login flow.
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-bold text-taco-dark"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              disabled
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm disabled:bg-gray-50 disabled:text-gray-400"
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
              type="password"
              disabled
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>
          <button
            type="button"
            disabled
            className="w-full rounded-xl bg-taco-teal py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            Sign In (Coming Soon)
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-taco-teal hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}

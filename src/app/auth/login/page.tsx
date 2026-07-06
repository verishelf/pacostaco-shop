import Link from "next/link";

export const metadata = {
  title: "Sign In | Paco's Taco Shop",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-taco-cream px-4">
      <div className="w-full max-w-md rounded-3xl border border-amber-100 bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-black text-taco-red uppercase">
          Franchise Back Office
        </h1>
        <p className="mb-8 text-center text-sm text-gray-600">
          Sign in to manage your location, menu, and reports
        </p>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm text-gray-600">
          Full authentication via Supabase Auth is coming soon. Use demo access
          to preview the franchise owner portal.
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
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            />
          </div>
          <Link
            href="/backoffice"
            className="block w-full rounded-xl bg-taco-teal py-3 text-center text-sm font-bold text-white hover:bg-teal-800"
          >
            Enter Back Office (Demo)
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
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
    </div>
  );
}

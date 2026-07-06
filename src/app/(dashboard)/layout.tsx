import Link from "next/link";

export const metadata = {
  title: "Dashboard | Paco's Taco Shop",
};

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/menu", label: "Menu" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-taco-dark text-white md:block">
        <div className="border-b border-gray-700 p-6">
          <Link href="/dashboard" className="text-lg font-black text-taco-gold">
            Paco&apos;s Dashboard
          </Link>
          <p className="mt-1 text-xs text-gray-400">Franchisee Portal</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-gray-700 p-4">
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-taco-dark">Franchise Dashboard</h1>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-taco-gold">
              Phase 2 — Coming Soon
            </span>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

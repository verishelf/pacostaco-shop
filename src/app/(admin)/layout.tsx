import Link from "next/link";

export const metadata = {
  title: "Admin | Paco's Taco Shop",
};

const navItems = [
  { href: "/admin/franchisees", label: "Franchisees" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/menu", label: "Master Menu" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-taco-red text-white md:block">
        <div className="border-b border-red-800 p-6">
          <Link href="/admin/franchisees" className="text-lg font-black">
            Corporate HQ
          </Link>
          <p className="mt-1 text-xs text-red-200">Admin Portal</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-red-100 transition hover:bg-red-800 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-red-800 p-4">
          <Link
            href="/"
            className="text-sm text-red-200 transition hover:text-white"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-taco-dark">Corporate Admin</h1>
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

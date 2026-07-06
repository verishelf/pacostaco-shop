import Link from "next/link";
import { SignOutButton } from "@/backoffice/components/SignOutButton";

export const metadata = {
  title: "Admin | Paco's Taco Shop",
};

const navItems = [
  { href: "/admin/leads", label: "Lead Inbox" },
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
          <Link href="/admin/leads" className="text-lg font-black">
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
            className="block text-sm text-red-200 transition hover:text-white"
          >
            ← Back to site
          </Link>
          <SignOutButton className="mt-2 block text-left text-sm text-red-200 transition hover:text-white" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-taco-dark">Corporate Admin</h1>
            <Link
              href="/admin/leads"
              className="text-sm font-bold text-taco-teal hover:underline md:hidden"
            >
              Menu
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

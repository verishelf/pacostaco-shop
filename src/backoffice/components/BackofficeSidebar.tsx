"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/backoffice", label: "Overview", icon: "📊" },
  { href: "/backoffice/location", label: "My Location", icon: "📍" },
  { href: "/backoffice/menu", label: "Menu", icon: "🌮" },
  { href: "/backoffice/reports", label: "Royalties & Reports", icon: "📈" },
  { href: "/backoffice/documents", label: "Documents", icon: "📁" },
  { href: "/backoffice/settings", label: "Settings", icon: "⚙️" },
];

export function BackofficeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-taco-dark text-white">
      <div className="border-b border-gray-700 p-6">
        <Link href="/backoffice" className="block">
          <span className="text-lg font-black text-taco-gold">Back Office</span>
          <p className="mt-1 text-xs text-gray-400">Franchise Owner Portal</p>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/backoffice" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-taco-teal text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-700 p-4">
        <Link
          href="/"
          className="block text-sm text-gray-400 transition hover:text-white"
        >
          ← Public Website
        </Link>
        <Link
          href="/auth/login"
          className="mt-2 block text-sm text-gray-400 transition hover:text-white"
        >
          Sign Out
        </Link>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mockLocation, mockOwner } from "@/backoffice/data/mock-data";
import { navItems } from "@/backoffice/components/BackofficeSidebar";

interface BackofficeHeaderProps {
  title: string;
  subtitle?: string;
}

function isNavItemActive(pathname: string, href: string) {
  return (
    pathname === href ||
    (href !== "/backoffice" && pathname.startsWith(href))
  );
}

export function BackofficeHeader({ title, subtitle }: BackofficeHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 text-taco-dark transition hover:bg-gray-50 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-taco-dark sm:text-xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 truncate text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="hidden min-w-0 text-right sm:block">
            <p className="truncate text-sm font-bold text-taco-dark">{mockOwner.name}</p>
            <p className="truncate text-xs text-gray-500">{mockLocation.name}</p>
          </div>
        </div>
        <nav
          className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden"
          aria-label="Back office sections"
        >
          {navItems.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition ${
                  isActive
                    ? "bg-taco-teal text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <aside className="relative flex h-full w-[min(100%,20rem)] flex-col bg-taco-dark text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
              <div>
                <span className="text-lg font-black text-taco-gold">Back Office</span>
                <p className="mt-1 text-xs text-gray-400">Franchise Owner Portal</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition hover:bg-gray-700 hover:text-white"
                aria-label="Close navigation menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = isNavItemActive(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
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
              <p className="mb-3 text-sm font-bold text-white">{mockOwner.name}</p>
              <p className="mb-4 text-xs text-gray-400">{mockLocation.name}</p>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-400 transition hover:text-white"
              >
                ← Public Website
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block text-sm text-gray-400 transition hover:text-white"
              >
                Sign Out
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

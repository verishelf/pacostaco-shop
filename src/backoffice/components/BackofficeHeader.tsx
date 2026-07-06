import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockLocation, mockOwner } from "@/backoffice/data/mock-data";
import { navItems } from "@/backoffice/components/BackofficeSidebar";

interface BackofficeHeaderProps {
  title: string;
  subtitle?: string;
}

export function BackofficeHeader({ title, subtitle }: BackofficeHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-taco-dark">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-taco-dark">{mockOwner.name}</p>
          <p className="text-xs text-gray-500">{mockLocation.name}</p>
        </div>
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/backoffice" && pathname.startsWith(item.href));

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
  );
}

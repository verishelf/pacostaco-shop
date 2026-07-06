import { mockLocation, mockOwner } from "@/backoffice/data/mock-data";

interface BackofficeHeaderProps {
  title: string;
  subtitle?: string;
}

export function BackofficeHeader({ title, subtitle }: BackofficeHeaderProps) {
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
    </header>
  );
}

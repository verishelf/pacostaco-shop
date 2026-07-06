import { BackofficeHeader } from "@/backoffice/components/BackofficeHeader";
import { BackofficeSidebar } from "@/backoffice/components/BackofficeSidebar";

export const metadata = {
  title: "Back Office | Paco's Taco Shop",
  description: "Franchise owner portal for managing your Paco's Taco Shop location.",
};

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden w-64 flex-shrink-0 lg:block">
        <BackofficeSidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackofficeHeader title="Franchise Back Office" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

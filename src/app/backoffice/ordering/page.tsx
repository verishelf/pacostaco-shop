import { PageHeader } from "@/backoffice/components/PageHeader";
import { OrderingSystem } from "@/backoffice/components/ordering/OrderingSystem";
import { getLowStockItems } from "@/backoffice/data/order-catalog";

export default function BackofficeOrderingPage() {
  const lowStockCount = getLowStockItems().length;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Distributor Ordering"
        description="Place orders with Sysco, La Tortilla Factory, Restaurant Depot, and Coca-Cola"
      />

      {lowStockCount > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
          <p className="font-bold text-amber-800">
            {lowStockCount} items are at or below reorder point
          </p>
          <p className="mt-1 text-sm text-amber-700">
            Use auto-fill from par levels on the Sysco or La Tortilla tabs to build your
            order quickly.
          </p>
        </div>
      )}

      <OrderingSystem />
    </div>
  );
}

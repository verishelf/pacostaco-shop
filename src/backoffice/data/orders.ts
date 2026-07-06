import type { DistributorId } from "@/backoffice/data/distributors";

export type OrderStatus = "submitted" | "confirmed" | "shipped" | "delivered";

export interface OrderLine {
  catalogItemId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  unit: string;
}

export interface PurchaseOrder {
  id: string;
  distributorId: DistributorId;
  distributorName: string;
  status: OrderStatus;
  createdAt: string;
  requestedDelivery: string;
  lines: OrderLine[];
  subtotal: number;
  notes?: string;
}

export const initialOrderHistory: PurchaseOrder[] = [
  {
    id: "PO-2026-0612",
    distributorId: "sysco",
    distributorName: "Sysco — Paco's Program",
    status: "delivered",
    createdAt: "2026-06-12T14:30:00Z",
    requestedDelivery: "2026-06-13",
    subtotal: 1248.6,
    lines: [
      {
        catalogItemId: "sysco-chicken",
        name: "Chicken Thighs, Boneless (40 lb case)",
        sku: "SYS-44012",
        quantity: 4,
        unitPrice: 68.4,
        unit: "case",
      },
      {
        catalogItemId: "sysco-carne",
        name: "Carne Asada, Sliced (30 lb case)",
        sku: "SYS-44108",
        quantity: 2,
        unitPrice: 142.5,
        unit: "case",
      },
      {
        catalogItemId: "sysco-queso",
        name: "Queso Blend, Shredded (5 lb bag)",
        sku: "SYS-55201",
        quantity: 8,
        unitPrice: 14.85,
        unit: "bag",
      },
    ],
  },
  {
    id: "PO-2026-0603",
    distributorId: "la-tortilla",
    distributorName: "La Tortilla Factory Direct",
    status: "delivered",
    createdAt: "2026-06-03T10:15:00Z",
    requestedDelivery: "2026-06-05",
    subtotal: 412.25,
    lines: [
      {
        catalogItemId: "ltf-corn",
        name: "Corn Tortillas, 4\" (500 ct case)",
        sku: "LTF-10050",
        quantity: 5,
        unitPrice: 32.5,
        unit: "case",
      },
      {
        catalogItemId: "ltf-flour",
        name: "Flour Tortillas, 12\" (200 ct case)",
        sku: "LTF-12012",
        quantity: 4,
        unitPrice: 38.75,
        unit: "case",
      },
    ],
  },
];

export const ORDER_STORAGE_KEY = "pacos-order-history";

export function formatOrderCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function generateOrderId(): string {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join("");
  return `PO-${stamp}`;
}

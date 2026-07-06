export interface FranchiseOwner {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: "franchise_owner" | "store_manager";
}

export interface FranchiseLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  status: "open" | "training" | "remodel";
  monthlyRevenue: number;
  weeklyOrders: number;
  laborPercent: number;
  foodCostPercent: number;
}

export interface DashboardStat {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export interface RoyaltyReport {
  period: string;
  grossSales: number;
  royaltyDue: number;
  marketingDue: number;
  status: "paid" | "due" | "overdue";
}

export interface FranchiseDocument {
  id: string;
  title: string;
  category: "operations" | "marketing" | "legal" | "training";
  updatedAt: string;
}

export { franchiseDocuments as mockDocuments } from "@/backoffice/data/franchise-documents";

export const mockOwner: FranchiseOwner = {
  id: "owner-1",
  name: "Maria Gonzalez",
  email: "maria@example.com",
  organization: "Gonzalez Restaurant Group LLC",
  role: "franchise_owner",
};

export const mockLocation: FranchiseLocation = {
  id: "loc-oceanside",
  name: "Paco's Taco Shop - Oceanside",
  address: "123 Fiesta Avenue, Taco Suite A",
  city: "Oceanside",
  state: "CA",
  status: "open",
  monthlyRevenue: 98420,
  weeklyOrders: 1247,
  laborPercent: 28.4,
  foodCostPercent: 31.2,
};

export const mockStats: DashboardStat[] = [
  { label: "Weekly Revenue", value: "$24,680", change: "+8.2%", trend: "up" },
  { label: "Orders This Week", value: "1,247", change: "+5.1%", trend: "up" },
  { label: "Avg Ticket", value: "$19.78", change: "+2.3%", trend: "up" },
  { label: "Guest Rating", value: "4.8", change: "stable", trend: "neutral" },
];

export const mockRoyalties: RoyaltyReport[] = [
  {
    period: "June 2026",
    grossSales: 98420,
    royaltyDue: 5905.2,
    marketingDue: 1968.4,
    status: "due",
  },
  {
    period: "May 2026",
    grossSales: 92150,
    royaltyDue: 5529,
    marketingDue: 1843,
    status: "paid",
  },
  {
    period: "April 2026",
    grossSales: 88700,
    royaltyDue: 5322,
    marketingDue: 1774,
    status: "paid",
  },
];

export const mockMenuOverrides = [
  { id: "1", name: "Street Tacos Trio", corporatePrice: 10.99, localPrice: 11.49, available: true },
  { id: "2", name: "Paco's Burrito Supremo", corporatePrice: 12.5, localPrice: 12.5, available: true },
  { id: "3", name: "Sizzling Fajitas", corporatePrice: 14.99, localPrice: 15.99, available: true },
  { id: "4", name: "Al Pastor Taco", corporatePrice: 3.99, localPrice: 3.99, available: false },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

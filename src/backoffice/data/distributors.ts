export type DistributorId =
  | "sysco"
  | "la-tortilla"
  | "restaurant-depot"
  | "coca-cola";

export interface Distributor {
  id: DistributorId;
  name: string;
  shortName: string;
  accountNumber: string;
  categories: string[];
  orderDays: string[];
  deliveryLead: string;
  contactPhone: string;
  contactEmail: string;
  minimumOrder: number;
  color: string;
}

export const distributors: Distributor[] = [
  {
    id: "sysco",
    name: "Sysco — Paco's Program",
    shortName: "Sysco",
    accountNumber: "PTS-SYS-44821",
    categories: ["Proteins", "Produce", "Dairy", "Dry Goods"],
    orderDays: ["Monday", "Wednesday", "Friday"],
    deliveryLead: "Next business day",
    contactPhone: "(800) 555-0192",
    contactEmail: "pacostacos@sysco.com",
    minimumOrder: 500,
    color: "#00529B",
  },
  {
    id: "la-tortilla",
    name: "La Tortilla Factory Direct",
    shortName: "La Tortilla",
    accountNumber: "LTF-OC-2290",
    categories: ["Tortillas", "Bakery"],
    orderDays: ["Tuesday"],
    deliveryLead: "Thursday delivery",
    contactPhone: "(505) 555-0147",
    contactEmail: "orders@latortillafactory.com",
    minimumOrder: 250,
    color: "#B45309",
  },
  {
    id: "restaurant-depot",
    name: "Restaurant Depot",
    shortName: "Rest. Depot",
    accountNumber: "PTS-8842",
    categories: ["Paper Goods", "Chemicals", "Supplies"],
    orderDays: ["As needed"],
    deliveryLead: "Same day pickup",
    contactPhone: "(760) 555-0188",
    contactEmail: "member@restaurantdepot.com",
    minimumOrder: 0,
    color: "#1F2937",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola Freestyle",
    shortName: "Coca-Cola",
    accountNumber: "CC-PTS-77104",
    categories: ["Beverages", "Syrups"],
    orderDays: ["Auto-replenish"],
    deliveryLead: "Weekly",
    contactPhone: "(800) 555-0265",
    contactEmail: "freestyle@ccfreestyle.com",
    minimumOrder: 0,
    color: "#DC2626",
  },
];

export function getDistributor(id: DistributorId): Distributor {
  const distributor = distributors.find((entry) => entry.id === id);
  if (!distributor) {
    throw new Error(`Unknown distributor: ${id}`);
  }
  return distributor;
}

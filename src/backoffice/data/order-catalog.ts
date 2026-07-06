import type { DistributorId } from "@/backoffice/data/distributors";

export type CatalogCategory =
  | "Proteins"
  | "Produce"
  | "Dairy"
  | "Dry Goods"
  | "Tortillas"
  | "Bakery"
  | "Paper Goods"
  | "Chemicals"
  | "Supplies"
  | "Beverages"
  | "Syrups";

export interface CatalogItem {
  id: string;
  sku: string;
  name: string;
  distributorId: DistributorId;
  category: CatalogCategory;
  unit: string;
  unitPrice: number;
  onHand: number;
  par: number;
  reorderPoint: number;
}

export const catalogItems: CatalogItem[] = [
  // Sysco
  {
    id: "sysco-chicken",
    sku: "SYS-44012",
    name: "Chicken Thighs, Boneless (40 lb case)",
    distributorId: "sysco",
    category: "Proteins",
    unit: "case",
    unitPrice: 68.4,
    onHand: 2,
    par: 6,
    reorderPoint: 3,
  },
  {
    id: "sysco-carne",
    sku: "SYS-44108",
    name: "Carne Asada, Sliced (30 lb case)",
    distributorId: "sysco",
    category: "Proteins",
    unit: "case",
    unitPrice: 142.5,
    onHand: 3,
    par: 4,
    reorderPoint: 2,
  },
  {
    id: "sysco-pastor",
    sku: "SYS-44122",
    name: "Al Pastor, Marinated (25 lb case)",
    distributorId: "sysco",
    category: "Proteins",
    unit: "case",
    unitPrice: 118.75,
    onHand: 1,
    par: 3,
    reorderPoint: 2,
  },
  {
    id: "sysco-queso",
    sku: "SYS-55201",
    name: "Queso Blend, Shredded (5 lb bag)",
    distributorId: "sysco",
    category: "Dairy",
    unit: "bag",
    unitPrice: 14.85,
    onHand: 4,
    par: 10,
    reorderPoint: 5,
  },
  {
    id: "sysco-cilantro",
    sku: "SYS-33018",
    name: "Cilantro, Fresh (1 lb bunch case)",
    distributorId: "sysco",
    category: "Produce",
    unit: "case",
    unitPrice: 22.4,
    onHand: 2,
    par: 4,
    reorderPoint: 2,
  },
  {
    id: "sysco-limes",
    sku: "SYS-33044",
    name: "Limes, Case (140 ct)",
    distributorId: "sysco",
    category: "Produce",
    unit: "case",
    unitPrice: 34.9,
    onHand: 1,
    par: 3,
    reorderPoint: 2,
  },
  {
    id: "sysco-rice",
    sku: "SYS-66102",
    name: "Mexican Rice Mix (25 lb bag)",
    distributorId: "sysco",
    category: "Dry Goods",
    unit: "bag",
    unitPrice: 28.6,
    onHand: 3,
    par: 5,
    reorderPoint: 2,
  },
  {
    id: "sysco-beans",
    sku: "SYS-66118",
    name: "Refried Beans, Bulk (10 lb can)",
    distributorId: "sysco",
    category: "Dry Goods",
    unit: "can",
    unitPrice: 18.2,
    onHand: 5,
    par: 8,
    reorderPoint: 4,
  },
  // La Tortilla Factory
  {
    id: "ltf-corn",
    sku: "LTF-10050",
    name: "Corn Tortillas, 4\" (500 ct case)",
    distributorId: "la-tortilla",
    category: "Tortillas",
    unit: "case",
    unitPrice: 32.5,
    onHand: 3,
    par: 8,
    reorderPoint: 4,
  },
  {
    id: "ltf-flour",
    sku: "LTF-12012",
    name: "Flour Tortillas, 12\" (200 ct case)",
    distributorId: "la-tortilla",
    category: "Tortillas",
    unit: "case",
    unitPrice: 38.75,
    onHand: 2,
    par: 6,
    reorderPoint: 3,
  },
  {
    id: "ltf-chips",
    sku: "LTF-20008",
    name: "Corn Chips, Restaurant Cut (case)",
    distributorId: "la-tortilla",
    category: "Bakery",
    unit: "case",
    unitPrice: 24.9,
    onHand: 4,
    par: 6,
    reorderPoint: 3,
  },
  // Restaurant Depot
  {
    id: "rd-clamshell",
    sku: "RD-PG-4410",
    name: "To-Go Clamshells, 9x6 (200 ct)",
    distributorId: "restaurant-depot",
    category: "Paper Goods",
    unit: "case",
    unitPrice: 42.0,
    onHand: 1,
    par: 4,
    reorderPoint: 2,
  },
  {
    id: "rd-bags",
    sku: "RD-PG-4422",
    name: "Branded To-Go Bags (500 ct)",
    distributorId: "restaurant-depot",
    category: "Paper Goods",
    unit: "case",
    unitPrice: 58.5,
    onHand: 2,
    par: 3,
    reorderPoint: 1,
  },
  {
    id: "rd-gloves",
    sku: "RD-SU-1102",
    name: "Nitrile Gloves, Large (1000 ct)",
    distributorId: "restaurant-depot",
    category: "Supplies",
    unit: "case",
    unitPrice: 36.8,
    onHand: 1,
    par: 2,
    reorderPoint: 1,
  },
  {
    id: "rd-sanitizer",
    sku: "RD-CH-3301",
    name: "Quat Sanitizer Concentrate (1 gal)",
    distributorId: "restaurant-depot",
    category: "Chemicals",
    unit: "gallon",
    unitPrice: 19.4,
    onHand: 2,
    par: 4,
    reorderPoint: 2,
  },
  // Coca-Cola
  {
    id: "cc-sprite",
    sku: "CC-FS-0012",
    name: "Sprite Freestyle Cartridge",
    distributorId: "coca-cola",
    category: "Syrups",
    unit: "cartridge",
    unitPrice: 112.0,
    onHand: 1,
    par: 2,
    reorderPoint: 1,
  },
  {
    id: "cc-lemonade",
    sku: "CC-FS-0024",
    name: "Minute Maid Lemonade Cartridge",
    distributorId: "coca-cola",
    category: "Syrups",
    unit: "cartridge",
    unitPrice: 108.5,
    onHand: 2,
    par: 2,
    reorderPoint: 1,
  },
  {
    id: "cc-cups",
    sku: "CC-BV-4400",
    name: "Freestyle Cups, 32 oz (1000 ct)",
    distributorId: "coca-cola",
    category: "Beverages",
    unit: "case",
    unitPrice: 64.0,
    onHand: 3,
    par: 4,
    reorderPoint: 2,
  },
];

export function getCatalogByDistributor(distributorId: DistributorId): CatalogItem[] {
  return catalogItems.filter((item) => item.distributorId === distributorId);
}

export function getLowStockItems(): CatalogItem[] {
  return catalogItems.filter((item) => item.onHand <= item.reorderPoint);
}

export function getSuggestedQuantity(item: CatalogItem): number {
  return Math.max(item.par - item.onHand, 0);
}

export function getCatalogItem(id: string): CatalogItem | undefined {
  return catalogItems.find((item) => item.id === id);
}

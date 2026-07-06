import type { Location, MenuCategory, MenuItem } from "@/types";

export const seedCategories: MenuCategory[] = [
  { id: "cat-favorites", name: "Customer Favorites", sort_order: 1 },
  { id: "cat-tacos", name: "Tacos", sort_order: 2 },
  { id: "cat-burritos", name: "Burritos", sort_order: 3 },
  { id: "cat-plates", name: "Plates", sort_order: 4 },
];

export const seedMenuItems: MenuItem[] = [
  {
    id: "item-street-tacos",
    category_id: "cat-favorites",
    name: "Street Tacos Trio",
    description:
      "Three soft corn tortillas packed with your choice of Carne Asada, Pollo Asado, or Al Pastor. Topped with freshly chopped cilantro, onions, and a wedge of lime.",
    base_price: 10.99,
    is_featured: true,
    is_house_special: false,
    category: seedCategories[0],
  },
  {
    id: "item-burrito-supremo",
    category_id: "cat-favorites",
    name: "Paco's Burrito Supremo",
    description:
      "A massive flour tortilla stuffed with slow-cooked shredded beef, Mexican rice, refried beans, guacamole, cheese, and smothered in our signature red sauce.",
    base_price: 12.5,
    is_featured: true,
    is_house_special: true,
    category: seedCategories[0],
  },
  {
    id: "item-fajitas",
    category_id: "cat-favorites",
    name: "Sizzling Fajitas",
    description:
      "Grilled bell peppers and onions served sizzling hot with your choice of protein. Accompanied by warm tortillas, sour cream, and pico de gallo.",
    base_price: 14.99,
    is_featured: true,
    is_house_special: false,
    category: seedCategories[0],
  },
  {
    id: "item-al-pastor",
    category_id: "cat-tacos",
    name: "Al Pastor Taco",
    description:
      "Marinated pork with pineapple, cilantro, and onions on a warm corn tortilla.",
    base_price: 3.99,
    is_featured: false,
    is_house_special: false,
    category: seedCategories[1],
  },
  {
    id: "item-carne-asada",
    category_id: "cat-tacos",
    name: "Carne Asada Taco",
    description:
      "Grilled steak with cilantro, onions, and a squeeze of lime on a corn tortilla.",
    base_price: 4.49,
    is_featured: false,
    is_house_special: false,
    category: seedCategories[1],
  },
  {
    id: "item-veggie-burrito",
    category_id: "cat-burritos",
    name: "Veggie Burrito",
    description:
      "Grilled peppers, rice, beans, cheese, guacamole, and pico de gallo wrapped in a flour tortilla.",
    base_price: 10.99,
    is_featured: false,
    is_house_special: false,
    category: seedCategories[2],
  },
];

export const seedLocations: Location[] = [
  {
    id: "loc-oceanside",
    org_id: "org-corporate",
    name: "Paco's Taco Shop - Oceanside",
    slug: "oceanside",
    address: "123 Fiesta Avenue, Taco Suite A",
    city: "Oceanside",
    state: "CA",
    zip: "92054",
    phone: "(555) 123-TACO",
    hours_json: {
      monday: "10:00 AM – 9:00 PM",
      tuesday: "10:00 AM – 9:00 PM",
      wednesday: "10:00 AM – 9:00 PM",
      thursday: "10:00 AM – 9:00 PM",
      friday: "10:00 AM – 11:00 PM",
      saturday: "10:00 AM – 11:00 PM",
      sunday: "9:00 AM – 8:00 PM",
      notes: "Friday – Saturday: Late Night Tacos!",
    },
    is_active: true,
  },
];

export function getFeaturedMenuItems(): MenuItem[] {
  return seedMenuItems.filter((item) => item.is_featured);
}

export function getAllMenuItems(): MenuItem[] {
  return seedMenuItems;
}

export function getPrimaryLocation(): Location {
  return seedLocations[0];
}

export function getAllLocations(): Location[] {
  return seedLocations.filter((loc) => loc.is_active);
}

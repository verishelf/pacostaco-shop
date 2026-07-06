export type OrganizationType = "corporate" | "franchise";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  created_at: string;
}

export interface LocationHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  notes?: string;
}

export interface Location {
  id: string;
  org_id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours_json: LocationHours;
  is_active: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  base_price: number;
  is_featured: boolean;
  is_house_special: boolean;
  category?: MenuCategory;
}

export interface LocationMenuItem {
  id: string;
  location_id: string;
  menu_item_id: string;
  price_override: number | null;
  is_available: boolean;
}

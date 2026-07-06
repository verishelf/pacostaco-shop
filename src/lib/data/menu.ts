import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  getAllMenuItems as getSeedMenuItems,
  getFeaturedMenuItems as getSeedFeaturedMenuItems,
} from "@/data/seed";
import type { MenuItem } from "@/types";

function mapMenuItem(row: {
  id: string;
  category_id: string;
  name: string;
  description: string;
  base_price: number;
  is_featured: boolean;
  is_house_special: boolean;
  menu_categories?: { id: string; name: string; sort_order: number } | null;
}): MenuItem {
  return {
    id: row.id,
    category_id: row.category_id,
    name: row.name,
    description: row.description,
    base_price: Number(row.base_price),
    is_featured: row.is_featured,
    is_house_special: row.is_house_special,
    category: row.menu_categories
      ? {
          id: row.menu_categories.id,
          name: row.menu_categories.name,
          sort_order: row.menu_categories.sort_order,
        }
      : undefined,
  };
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured()) {
    return getSeedFeaturedMenuItems();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*, menu_categories(id, name, sort_order)")
      .eq("is_featured", true)
      .order("name");

    if (error || !data?.length) {
      return getSeedFeaturedMenuItems();
    }

    return data.map(mapMenuItem);
  } catch {
    return getSeedFeaturedMenuItems();
  }
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured()) {
    return getSeedMenuItems();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*, menu_categories(id, name, sort_order)")
      .order("name");

    if (error || !data?.length) {
      return getSeedMenuItems();
    }

    return data.map(mapMenuItem);
  } catch {
    return getSeedMenuItems();
  }
}

export async function getMenuItemsByCategory(): Promise<
  Map<string, MenuItem[]>
> {
  const items = await getAllMenuItems();
  const grouped = new Map<string, MenuItem[]>();

  for (const item of items) {
    const categoryName = item.category?.name ?? "Other";
    const existing = grouped.get(categoryName) ?? [];
    existing.push(item);
    grouped.set(categoryName, existing);
  }

  return grouped;
}

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  getAllLocations as getSeedLocations,
  getPrimaryLocation as getSeedPrimaryLocation,
} from "@/data/seed";
import type { Location, LocationHours } from "@/types";

function mapLocation(row: {
  id: string;
  org_id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours_json: unknown;
  is_active: boolean;
}): Location {
  return {
    id: row.id,
    org_id: row.org_id,
    name: row.name,
    slug: row.slug,
    address: row.address,
    city: row.city,
    state: row.state,
    zip: row.zip,
    phone: row.phone,
    hours_json: (row.hours_json as LocationHours) ?? {},
    is_active: row.is_active,
  };
}

export async function getPrimaryLocation(): Promise<Location> {
  if (!isSupabaseConfigured()) {
    return getSeedPrimaryLocation();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("is_active", true)
      .order("created_at")
      .limit(1)
      .single();

    if (error || !data) {
      return getSeedPrimaryLocation();
    }

    return mapLocation(data);
  } catch {
    return getSeedPrimaryLocation();
  }
}

export async function getAllLocations(): Promise<Location[]> {
  if (!isSupabaseConfigured()) {
    return getSeedLocations();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (error || !data?.length) {
      return getSeedLocations();
    }

    return data.map(mapLocation);
  } catch {
    return getSeedLocations();
  }
}

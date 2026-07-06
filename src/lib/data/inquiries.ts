import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export type InquiryStatus = "new" | "contacted" | "qualified" | "closed" | "spam";

export interface CateringInquiry {
  id: string;
  location_id: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  event_date: string | null;
  guest_count: number | null;
  event_type: string | null;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
}

export interface FranchiseInquiry {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  city: string;
  state: string;
  investment_range: string | null;
  restaurant_experience: string | null;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
}

const demoCateringInquiries: CateringInquiry[] = [
  {
    id: "demo-cat-1",
    location_id: null,
    contact_name: "Jennifer Walsh",
    contact_email: "jwalsh@pacificcoast.edu",
    contact_phone: "(760) 555-0142",
    event_date: "2026-07-18",
    guest_count: 85,
    event_type: "Corporate lunch",
    message: "Need taco bar for faculty appreciation day. Vegetarian options required.",
    status: "new",
    created_at: "2026-07-05T16:20:00Z",
  },
  {
    id: "demo-cat-2",
    location_id: null,
    contact_name: "Mike & Sarah Chen",
    contact_email: "chen.wedding@gmail.com",
    contact_phone: "(858) 555-0198",
    event_date: "2026-08-22",
    guest_count: 120,
    event_type: "Wedding reception",
    message: "Rehearsal dinner taco bar for 120 guests.",
    status: "contacted",
    created_at: "2026-07-02T11:00:00Z",
  },
];

const demoFranchiseInquiries: FranchiseInquiry[] = [
  {
    id: "demo-fr-1",
    contact_name: "David Ramirez",
    contact_email: "david.ramirez@email.com",
    contact_phone: "(619) 555-0177",
    city: "Chula Vista",
    state: "CA",
    investment_range: "$350,000 – $500,000",
    restaurant_experience: "10 years QSR management",
    message: "Interested in multi-unit development in South Bay.",
    status: "new",
    created_at: "2026-07-04T09:30:00Z",
  },
];

export async function getCateringInquiries(): Promise<CateringInquiry[]> {
  if (!isSupabaseConfigured()) {
    return demoCateringInquiries;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("catering_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return demoCateringInquiries;
    }

    return data as CateringInquiry[];
  } catch {
    return demoCateringInquiries;
  }
}

export async function getFranchiseInquiries(): Promise<FranchiseInquiry[]> {
  if (!isSupabaseConfigured()) {
    return demoFranchiseInquiries;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("franchise_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return demoFranchiseInquiries;
    }

    return data as FranchiseInquiry[];
  } catch {
    return demoFranchiseInquiries;
  }
}

export function getNewInquiryCount(
  catering: CateringInquiry[],
  franchise: FranchiseInquiry[],
): number {
  return (
    catering.filter((item) => item.status === "new").length +
    franchise.filter((item) => item.status === "new").length
  );
}

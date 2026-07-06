"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { getPrimaryLocation } from "@/lib/data/locations";
import type { Database } from "@/lib/supabase/types";
import type { InquiryStatus } from "@/lib/data/inquiries";

type CateringInsert = Database["public"]["Tables"]["catering_inquiries"]["Insert"];
type FranchiseInsert = Database["public"]["Tables"]["franchise_inquiries"]["Insert"];

export interface ActionResult {
  success: boolean;
  message: string;
}

export async function submitCateringInquiry(
  formData: FormData,
): Promise<ActionResult> {
  const contactName = String(formData.get("contactName") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? "").trim();
  const eventDate = String(formData.get("eventDate") ?? "").trim() || null;
  const guestCount = Number.parseInt(String(formData.get("guestCount") ?? ""), 10);
  const eventType = String(formData.get("eventType") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;

  if (!contactName || !contactEmail || !contactPhone) {
    return { success: false, message: "Name, email, and phone are required." };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message:
        "Thanks! Your catering request was received. Our team will contact you within 1 business day.",
    };
  }

  try {
    const location = await getPrimaryLocation();
    const supabase = await createClient();

    const payload: CateringInsert = {
      location_id: location.id.startsWith("loc-") ? null : location.id,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      event_date: eventDate,
      guest_count: Number.isNaN(guestCount) ? null : guestCount,
      event_type: eventType,
      message,
      status: "new",
      source: "website",
    };

    const { error } = await supabase.from("catering_inquiries").insert([payload]);

    if (error) {
      return { success: false, message: "Unable to submit request. Please try again." };
    }

    revalidatePath("/backoffice/catering");
    revalidatePath("/admin/leads");

    return {
      success: true,
      message:
        "Thanks! Your catering request was received. Our team will contact you within 1 business day.",
    };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function submitFranchiseInquiry(
  formData: FormData,
): Promise<ActionResult> {
  const contactName = String(formData.get("contactName") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const investmentRange = String(formData.get("investmentRange") ?? "").trim() || null;
  const restaurantExperience =
    String(formData.get("restaurantExperience") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;

  if (!contactName || !contactEmail || !contactPhone || !city || !state) {
    return {
      success: false,
      message: "Please complete all required fields.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message:
        "Thank you! A franchise development advisor will reach out within 2 business days.",
    };
  }

  try {
    const supabase = await createClient();
    const payload: FranchiseInsert = {
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      city,
      state,
      investment_range: investmentRange,
      restaurant_experience: restaurantExperience,
      message,
      status: "new",
      source: "website",
    };

    const { error } = await supabase.from("franchise_inquiries").insert([payload]);

    if (error) {
      return { success: false, message: "Unable to submit inquiry. Please try again." };
    }

    revalidatePath("/admin/leads");

    return {
      success: true,
      message:
        "Thank you! A franchise development advisor will reach out within 2 business days.",
    };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function updateInquiryStatus(
  type: "catering" | "franchise",
  id: string,
  status: InquiryStatus,
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { success: true, message: "Status updated (demo mode)." };
  }

  const table = type === "catering" ? "catering_inquiries" : "franchise_inquiries";
  const supabase = await createClient();
  const { error } = await supabase
    .from(table)
    .update({ status })
    .eq("id", id);

  if (error) {
    return { success: false, message: "Unable to update status." };
  }

  revalidatePath("/backoffice/catering");
  revalidatePath("/admin/leads");
  return { success: true, message: "Status updated." };
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          type: "corporate" | "franchise";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          type?: "corporate" | "franchise";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          type?: "corporate" | "franchise";
          created_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          slug: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          phone: string;
          hours_json: Json;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          slug: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          phone: string;
          hours_json?: Json;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          name?: string;
          slug?: string;
          address?: string;
          city?: string;
          state?: string;
          zip?: string;
          phone?: string;
          hours_json?: Json;
          is_active?: boolean;
          created_at?: string;
        };
      };
      menu_categories: {
        Row: {
          id: string;
          name: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string;
          base_price: number;
          is_featured: boolean;
          is_house_special: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description?: string;
          base_price: number;
          is_featured?: boolean;
          is_house_special?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          description?: string;
          base_price?: number;
          is_featured?: boolean;
          is_house_special?: boolean;
          created_at?: string;
        };
      };
      location_menu_items: {
        Row: {
          id: string;
          location_id: string;
          menu_item_id: string;
          price_override: number | null;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          location_id: string;
          menu_item_id: string;
          price_override?: number | null;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          location_id?: string;
          menu_item_id?: string;
          price_override?: number | null;
          is_available?: boolean;
          created_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          org_id: string | null;
          location_id: string | null;
          role: "corporate_admin" | "franchise_owner" | "store_manager";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          org_id?: string | null;
          location_id?: string | null;
          role: "corporate_admin" | "franchise_owner" | "store_manager";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          org_id?: string | null;
          location_id?: string | null;
          role?: "corporate_admin" | "franchise_owner" | "store_manager";
          created_at?: string;
        };
      };
    };
  };
}

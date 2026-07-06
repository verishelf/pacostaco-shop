-- Paco's Taco Shop initial schema
-- Organizations, locations, menu, and franchise foundation

-- Enums
CREATE TYPE organization_type AS ENUM ('corporate', 'franchise');
CREATE TYPE user_role AS ENUM ('corporate_admin', 'franchise_owner', 'store_manager');

-- Organizations (corporate HQ + franchisees)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type organization_type NOT NULL DEFAULT 'franchise',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Locations (each franchise store)
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  phone TEXT NOT NULL,
  hours_json JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Menu categories
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Master menu items (corporate template)
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  base_price NUMERIC(10, 2) NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_house_special BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-location menu overrides (Phase 2)
CREATE TABLE location_menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  price_override NUMERIC(10, 2),
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (location_id, menu_item_id)
);

-- User roles for franchise dashboard (Phase 2)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, org_id, location_id)
);

-- Indexes
CREATE INDEX idx_locations_org_id ON locations(org_id);
CREATE INDEX idx_locations_is_active ON locations(is_active);
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX idx_menu_items_featured ON menu_items(is_featured);
CREATE INDEX idx_location_menu_items_location ON location_menu_items(location_id);

-- Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Phase 1: public read for active content
CREATE POLICY "Public read organizations"
  ON organizations FOR SELECT
  USING (true);

CREATE POLICY "Public read active locations"
  ON locations FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public read menu categories"
  ON menu_categories FOR SELECT
  USING (true);

CREATE POLICY "Public read menu items"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Public read location menu items"
  ON location_menu_items FOR SELECT
  USING (is_available = true);

-- User roles: users can read their own roles (Phase 2)
CREATE POLICY "Users read own roles"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Seed data
INSERT INTO organizations (id, name, slug, type) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Paco''s Taco Shop Corporate', 'corporate', 'corporate');

INSERT INTO locations (id, org_id, name, slug, address, city, state, zip, phone, hours_json) VALUES
  (
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000001',
    'Paco''s Taco Shop - Oceanside',
    'oceanside',
    '123 Fiesta Avenue, Taco Suite A',
    'Oceanside',
    'CA',
    '92054',
    '(555) 123-TACO',
    '{
      "monday": "10:00 AM – 9:00 PM",
      "tuesday": "10:00 AM – 9:00 PM",
      "wednesday": "10:00 AM – 9:00 PM",
      "thursday": "10:00 AM – 9:00 PM",
      "friday": "10:00 AM – 11:00 PM",
      "saturday": "10:00 AM – 11:00 PM",
      "sunday": "9:00 AM – 8:00 PM",
      "notes": "Late Night Tacos!"
    }'::jsonb
  );

INSERT INTO menu_categories (id, name, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000100', 'Customer Favorites', 1),
  ('00000000-0000-0000-0000-000000000101', 'Tacos', 2),
  ('00000000-0000-0000-0000-000000000102', 'Burritos', 3),
  ('00000000-0000-0000-0000-000000000103', 'Plates', 4);

INSERT INTO menu_items (id, category_id, name, description, base_price, is_featured, is_house_special) VALUES
  (
    '00000000-0000-0000-0000-000000000200',
    '00000000-0000-0000-0000-000000000100',
    'Street Tacos Trio',
    'Three soft corn tortillas packed with your choice of Carne Asada, Pollo Asado, or Al Pastor. Topped with freshly chopped cilantro, onions, and a wedge of lime.',
    10.99,
    true,
    false
  ),
  (
    '00000000-0000-0000-0000-000000000201',
    '00000000-0000-0000-0000-000000000100',
    'Paco''s Burrito Supremo',
    'A massive flour tortilla stuffed with slow-cooked shredded beef, Mexican rice, refried beans, guacamole, cheese, and smothered in our signature red sauce.',
    12.50,
    true,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000202',
    '00000000-0000-0000-0000-000000000100',
    'Sizzling Fajitas',
    'Grilled bell peppers and onions served sizzling hot with your choice of protein. Accompanied by warm tortillas, sour cream, and pico de gallo.',
    14.99,
    true,
    false
  ),
  (
    '00000000-0000-0000-0000-000000000203',
    '00000000-0000-0000-0000-000000000101',
    'Al Pastor Taco',
    'Marinated pork with pineapple, cilantro, and onions on a warm corn tortilla.',
    3.99,
    false,
    false
  ),
  (
    '00000000-0000-0000-0000-000000000204',
    '00000000-0000-0000-0000-000000000101',
    'Carne Asada Taco',
    'Grilled steak with cilantro, onions, and a squeeze of lime on a corn tortilla.',
    4.49,
    false,
    false
  ),
  (
    '00000000-0000-0000-0000-000000000205',
    '00000000-0000-0000-0000-000000000102',
    'Veggie Burrito',
    'Grilled peppers, rice, beans, cheese, guacamole, and pico de gallo wrapped in a flour tortilla.',
    10.99,
    false,
    false
  );

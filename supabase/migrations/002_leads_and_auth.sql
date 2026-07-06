-- Phase 1: Lead capture, profiles, and back office foundation

CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'qualified', 'closed', 'spam');
CREATE TYPE inquiry_source AS ENUM ('website', 'backoffice', 'referral');

-- Catering inquiries from public site
CREATE TABLE catering_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  event_date DATE,
  guest_count INTEGER,
  event_type TEXT,
  message TEXT,
  status inquiry_status NOT NULL DEFAULT 'new',
  source inquiry_source NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Franchise development inquiries
CREATE TABLE franchise_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  investment_range TEXT,
  restaurant_experience TEXT,
  message TEXT,
  status inquiry_status NOT NULL DEFAULT 'new',
  source inquiry_source NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Franchise organization for Oceanside demo owner
INSERT INTO organizations (id, name, slug, type) VALUES
  ('00000000-0000-0000-0000-000000000002', 'Gonzalez Restaurant Group LLC', 'gonzalez-group', 'franchise')
ON CONFLICT (slug) DO NOTHING;

-- Transfer Oceanside to franchise org (if still on corporate)
UPDATE locations
SET org_id = '00000000-0000-0000-0000-000000000002'
WHERE slug = 'oceanside';

-- Location menu overrides for franchise back office
INSERT INTO location_menu_items (location_id, menu_item_id, price_override, is_available) VALUES
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000200', 11.49, true),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000201', 12.50, true),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000202', 15.99, true),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000203', 3.99, false)
ON CONFLICT (location_id, menu_item_id) DO NOTHING;

-- RLS
ALTER TABLE catering_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit inquiries (anon insert)
CREATE POLICY "Public insert catering inquiries"
  ON catering_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public insert franchise inquiries"
  ON franchise_inquiries FOR INSERT
  WITH CHECK (true);

-- Authenticated franchise owners read catering for their location
CREATE POLICY "Franchise read location catering inquiries"
  ON catering_inquiries FOR SELECT
  USING (
    location_id IN (
      SELECT ur.location_id FROM user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.location_id IS NOT NULL
    )
    OR EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role = 'corporate_admin'
    )
  );

-- Corporate admins read all franchise inquiries
CREATE POLICY "Corporate read franchise inquiries"
  ON franchise_inquiries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role = 'corporate_admin'
    )
  );

-- Franchise owners can read catering for their location; corporate reads all catering
CREATE POLICY "Corporate read all catering inquiries"
  ON catering_inquiries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role = 'corporate_admin'
    )
  );

-- Corporate can update inquiry status
CREATE POLICY "Corporate update catering inquiries"
  ON catering_inquiries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role IN ('corporate_admin', 'franchise_owner', 'store_manager')
    )
  );

CREATE POLICY "Corporate update franchise inquiries"
  ON franchise_inquiries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role = 'corporate_admin'
    )
  );

-- Franchise owners/managers update their catering leads
CREATE POLICY "Franchise update location catering inquiries"
  ON catering_inquiries FOR UPDATE
  USING (
    location_id IN (
      SELECT ur.location_id FROM user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.location_id IS NOT NULL
    )
  );

CREATE INDEX idx_catering_inquiries_location ON catering_inquiries(location_id);
CREATE INDEX idx_catering_inquiries_status ON catering_inquiries(status);
CREATE INDEX idx_franchise_inquiries_status ON franchise_inquiries(status);

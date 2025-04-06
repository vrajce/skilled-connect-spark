-- Create categories table first
CREATE TABLE IF NOT EXISTS service_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default categories
INSERT INTO service_categories (name, icon, color) 
VALUES 
    ('Plumbing', 'Wrench', '#2563eb'),
    ('Electrical', 'Zap', '#dc2626'),
    ('Mehendi', 'Flower2', '#16a34a'),
    ('Carpentry', 'Hammer', '#ca8a04'),
    ('Cleaning', 'Sparkles', '#0891b2'),
    ('Tailoring', 'Scissors', '#9333ea'),
    ('Photography', 'Camera', '#be185d'),
    ('Catering', 'UtensilsCrossed', '#ea580c')
ON CONFLICT (name) DO NOTHING;

-- Add new columns to provider_services
ALTER TABLE provider_services 
ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES service_categories(id),
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 5.0,
ADD COLUMN IF NOT EXISTS total_bookings INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Migrate existing data
WITH category_mapping AS (
  SELECT id, name FROM service_categories
)
UPDATE provider_services ps
SET category_id = cm.id
FROM category_mapping cm
WHERE ps.category = cm.name;

-- Make category_id required and drop old category column
ALTER TABLE provider_services
ALTER COLUMN category_id SET NOT NULL,
DROP COLUMN IF EXISTS category;

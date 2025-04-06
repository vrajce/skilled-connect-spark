-- Update provider_services table with additional fields
ALTER TABLE provider_services
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 5.0,
ADD COLUMN IF NOT EXISTS total_bookings INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL;

-- Create categories table
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

-- Add foreign key to provider_services
ALTER TABLE provider_services
ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES service_categories(id);

-- Update existing services to link with categories
UPDATE provider_services ps
SET category_id = sc.id
FROM service_categories sc
WHERE ps.category = sc.name;

-- Create function to update provider stats
CREATE OR REPLACE FUNCTION update_provider_service_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update rating and total_bookings when a booking is completed
    IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
        UPDATE provider_services
        SET 
            total_bookings = total_bookings + 1,
            rating = (
                SELECT COALESCE(AVG(rating), 5.0)
                FROM bookings
                WHERE service_id = NEW.service_id
                AND status = 'completed'
                AND rating IS NOT NULL
            )
        WHERE id = NEW.service_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating service stats
DROP TRIGGER IF EXISTS update_service_stats_trigger ON bookings;
CREATE TRIGGER update_service_stats_trigger
    AFTER INSERT OR UPDATE
    ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_provider_service_stats();

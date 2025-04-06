-- Add category column to provider_services table
ALTER TABLE provider_services
ADD COLUMN IF NOT EXISTS category text;

-- Create an index for faster category-based queries
CREATE INDEX IF NOT EXISTS idx_provider_services_category ON provider_services(category);

-- Update existing services to use the provider's category if available
UPDATE provider_services ps
SET category = p.category
FROM providers p
WHERE ps.provider_id = p.id
AND ps.category IS NULL; 
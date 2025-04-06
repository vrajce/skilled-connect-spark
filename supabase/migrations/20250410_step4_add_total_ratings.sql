-- Add total_ratings column to providers table
ALTER TABLE providers
ADD COLUMN IF NOT EXISTS total_ratings integer DEFAULT 0;

-- Update existing providers' total_ratings
UPDATE providers p
SET total_ratings = (
    SELECT COUNT(*)
    FROM provider_reviews pr
    WHERE pr.provider_id = p.id
);

-- Update the update_provider_rating function to handle total_ratings
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE providers
    SET 
        rating = COALESCE((
            SELECT AVG(rating)::decimal(3,2)
            FROM provider_reviews
            WHERE provider_id = NEW.provider_id
        ), 0),
        total_ratings = (
            SELECT COUNT(*)
            FROM provider_reviews
            WHERE provider_id = NEW.provider_id
        )
    WHERE id = NEW.provider_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql; 
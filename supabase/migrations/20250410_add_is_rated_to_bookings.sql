-- Add is_rated column to bookings table
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS is_rated boolean DEFAULT false;

-- Update existing completed bookings that have reviews
UPDATE bookings b
SET is_rated = true
WHERE EXISTS (
    SELECT 1 
    FROM provider_reviews pr 
    WHERE pr.booking_id = b.id
);

-- Create function to update booking is_rated status
CREATE OR REPLACE FUNCTION update_booking_rated_status()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE bookings
        SET is_rated = true
        WHERE id = NEW.booking_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE bookings
        SET is_rated = false
        WHERE id = OLD.booking_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update booking is_rated status
DROP TRIGGER IF EXISTS update_booking_rated_status_trigger ON provider_reviews;
CREATE TRIGGER update_booking_rated_status_trigger
AFTER INSERT OR DELETE ON provider_reviews
FOR EACH ROW
EXECUTE FUNCTION update_booking_rated_status(); 
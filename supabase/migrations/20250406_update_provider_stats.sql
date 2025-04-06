-- Add new columns for provider statistics
ALTER TABLE providers
ADD COLUMN IF NOT EXISTS total_bookings integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating decimal(3,2) DEFAULT 0.0;

-- Create a function to update provider stats
CREATE OR REPLACE FUNCTION update_provider_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update total_bookings when a new booking is added or status changes
    IF (TG_OP = 'INSERT' AND NEW.status = 'confirmed') OR 
       (TG_OP = 'UPDATE' AND NEW.status = 'confirmed' AND OLD.status != 'confirmed') THEN
        UPDATE providers 
        SET total_bookings = total_bookings + 1
        WHERE id = NEW.provider_id;
    END IF;

    -- Update total_bookings when a booking is cancelled
    IF (TG_OP = 'UPDATE' AND NEW.status = 'cancelled' AND OLD.status = 'confirmed') THEN
        UPDATE providers 
        SET total_bookings = total_bookings - 1
        WHERE id = NEW.provider_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update provider stats
DROP TRIGGER IF EXISTS update_provider_stats ON bookings;
CREATE TRIGGER update_provider_stats
    AFTER INSERT OR UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_provider_stats();

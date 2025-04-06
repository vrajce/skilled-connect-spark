-- Add total_earnings column to providers table
ALTER TABLE providers
ADD COLUMN IF NOT EXISTS total_earnings decimal(10,2) DEFAULT 0;

-- Update existing providers' total_earnings based on completed bookings
UPDATE providers p
SET total_earnings = COALESCE((
    SELECT SUM(total_amount)
    FROM bookings b
    WHERE b.provider_id = p.id
    AND b.status = 'completed'
), 0);

-- Create function to update provider earnings
CREATE OR REPLACE FUNCTION update_provider_earnings()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' THEN
        UPDATE providers
        SET total_earnings = total_earnings + NEW.total_amount
        WHERE id = NEW.provider_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update provider earnings
DROP TRIGGER IF EXISTS update_provider_earnings_trigger ON bookings;
CREATE TRIGGER update_provider_earnings_trigger
AFTER UPDATE OF status ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_provider_earnings(); 
-- Add RLS policies for provider_reviews
CREATE POLICY "Anyone can view provider reviews"
ON provider_reviews FOR SELECT
USING (true);

-- Allow users to create reviews for their own bookings
CREATE POLICY "Users can create reviews for their bookings"
ON provider_reviews FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM bookings
        WHERE bookings.id = booking_id
        AND bookings.user_id = auth.uid()
        AND bookings.status = 'completed'
        AND NOT bookings.is_rated
    )
);

-- Allow users to update their own reviews
CREATE POLICY "Users can update their own reviews"
ON provider_reviews FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own reviews
CREATE POLICY "Users can delete their own reviews"
ON provider_reviews FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Function to update provider rating
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE providers
    SET rating = (
        SELECT AVG(rating)::decimal(3,2)
        FROM provider_reviews
        WHERE provider_id = NEW.provider_id
    ),
    total_ratings = (
        SELECT COUNT(*)
        FROM provider_reviews
        WHERE provider_id = NEW.provider_id
    )
    WHERE id = NEW.provider_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update provider rating
DROP TRIGGER IF EXISTS update_provider_rating_trigger ON provider_reviews;
CREATE TRIGGER update_provider_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON provider_reviews
FOR EACH ROW
EXECUTE FUNCTION update_provider_rating(); 
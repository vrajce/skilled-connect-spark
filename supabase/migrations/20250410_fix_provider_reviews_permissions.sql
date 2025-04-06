-- Enable RLS on provider_reviews
ALTER TABLE provider_reviews ENABLE ROW LEVEL SECURITY;

-- Allow users to view reviews for providers they're interested in
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

-- Grant permissions
GRANT ALL ON provider_reviews TO authenticated;
GRANT USAGE ON SEQUENCE provider_reviews_id_seq TO authenticated; 
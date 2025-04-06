-- Drop existing table and its dependencies
DROP FUNCTION IF EXISTS create_booking;
DROP TABLE IF EXISTS bookings CASCADE;

-- Recreate bookings table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id BIGINT REFERENCES providers(id) ON DELETE CASCADE,
    service_id BIGINT REFERENCES provider_services(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
    user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
    user_review TEXT,
    total_amount DECIMAL(10,2)
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Recreate policies
CREATE POLICY "Allow users to view their own bookings"
    ON bookings FOR SELECT
    USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM providers
        WHERE providers.id = bookings.provider_id
        AND providers.user_id = auth.uid()
    ));

CREATE POLICY "Allow users to create bookings"
    ON bookings FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users and providers to update bookings"
    ON bookings FOR UPDATE
    TO authenticated
    USING (
        auth.uid() = user_id 
        OR 
        EXISTS (
            SELECT 1 FROM providers
            WHERE providers.id = bookings.provider_id
            AND providers.user_id = auth.uid()
        )
    );

-- Grant permissions
GRANT ALL ON bookings TO authenticated;
GRANT USAGE ON SEQUENCE bookings_id_seq TO authenticated;

-- Recreate stored procedure
CREATE OR REPLACE FUNCTION create_booking(
    p_user_id UUID,
    p_provider_id BIGINT,
    p_service_id BIGINT,
    p_booking_date DATE,
    p_preferred_time TEXT,
    p_status TEXT DEFAULT 'pending'
) RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
BEGIN
    INSERT INTO bookings (
        user_id,
        provider_id,
        service_id,
        booking_date,
        preferred_time,
        status
    ) VALUES (
        p_user_id,
        p_provider_id,
        p_service_id,
        p_booking_date,
        p_preferred_time,
        p_status
    )
    RETURNING jsonb_build_object(
        'id', id,
        'created_at', created_at,
        'user_id', user_id,
        'provider_id', provider_id,
        'service_id', service_id,
        'booking_date', booking_date,
        'preferred_time', preferred_time,
        'status', status
    ) INTO v_result;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
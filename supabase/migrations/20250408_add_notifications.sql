-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE,
    read BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create notification policies
CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON notifications TO authenticated;
GRANT USAGE ON SEQUENCE notifications_id_seq TO authenticated;

-- Function to create notifications for new bookings
CREATE OR REPLACE FUNCTION notify_provider_booking()
RETURNS TRIGGER AS $$
DECLARE
    provider_user_id UUID;
    service_name TEXT;
BEGIN
    -- Get the provider's user_id and service name
    SELECT providers.user_id, provider_services.name 
    INTO provider_user_id, service_name
    FROM providers 
    JOIN provider_services ON provider_services.provider_id = providers.id
    WHERE providers.id = NEW.provider_id;

    -- Create notification for provider
    INSERT INTO notifications (user_id, title, message, type, booking_id)
    VALUES (
        provider_user_id,
        'New Service Request',
        'You have a new booking request for ' || service_name,
        'new_booking',
        NEW.id
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to notify users about booking status changes
CREATE OR REPLACE FUNCTION notify_user_booking_status()
RETURNS TRIGGER AS $$
DECLARE
    service_name TEXT;
BEGIN
    IF OLD.status != NEW.status THEN
        -- Get the service name
        SELECT name INTO service_name
        FROM provider_services
        WHERE id = NEW.service_id;

        -- Create notification for user
        INSERT INTO notifications (user_id, title, message, type, booking_id)
        VALUES (
            NEW.user_id,
            CASE 
                WHEN NEW.status = 'accepted' THEN 'Booking Accepted'
                WHEN NEW.status = 'rejected' THEN 'Booking Declined'
                ELSE 'Booking Status Updated'
            END,
            CASE 
                WHEN NEW.status = 'accepted' THEN 'Your booking request for ' || service_name || ' has been accepted'
                WHEN NEW.status = 'rejected' THEN 'Your booking request for ' || service_name || ' has been declined'
                ELSE 'Your booking status has been updated to ' || NEW.status
            END,
            'status_update',
            NEW.id
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER on_new_booking
    AFTER INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION notify_provider_booking();

CREATE TRIGGER on_booking_status_change
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION notify_user_booking_status(); 
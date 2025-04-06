-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS on_new_booking ON bookings;
DROP TRIGGER IF EXISTS on_booking_status_change ON bookings;
DROP FUNCTION IF EXISTS notify_provider_booking();
DROP FUNCTION IF EXISTS notify_user_booking_status();

-- Update notification types constraint
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_type_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_type_check 
    CHECK (type IN ('new_booking', 'booking_accepted', 'booking_rejected', 'booking_completed', 'status_update'));

-- Function to create notifications for new bookings
CREATE OR REPLACE FUNCTION notify_provider_booking()
RETURNS TRIGGER AS $$
DECLARE
    provider_user_id UUID;
    service_title TEXT;
    user_name TEXT;
BEGIN
    -- Get the provider's user_id and service title
    SELECT providers.user_id, provider_services.title 
    INTO provider_user_id, service_title
    FROM providers 
    JOIN provider_services ON provider_services.provider_id = providers.id
    WHERE providers.id = NEW.provider_id;

    -- Get the user's name
    SELECT COALESCE(raw_user_meta_data->>'full_name', email)
    INTO user_name
    FROM auth.users
    WHERE id = NEW.user_id;

    -- Create notification for provider
    INSERT INTO notifications (user_id, title, message, type, booking_id)
    VALUES (
        provider_user_id,
        'New Service Request',
        'You have a new booking request for ' || service_title || ' from ' || user_name,
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
    service_title TEXT;
    provider_name TEXT;
BEGIN
    IF OLD.status != NEW.status THEN
        -- Get the service title
        SELECT title INTO service_title
        FROM provider_services
        WHERE id = NEW.service_id;

        -- Get the provider name
        SELECT business_name INTO provider_name
        FROM providers
        WHERE id = NEW.provider_id;

        -- Create notification for user
        INSERT INTO notifications (user_id, title, message, type, booking_id)
        VALUES (
            NEW.user_id,
            CASE 
                WHEN NEW.status = 'accepted' THEN 'Booking Accepted'
                WHEN NEW.status = 'rejected' THEN 'Booking Declined'
                WHEN NEW.status = 'completed' THEN 'Service Completed'
                ELSE 'Booking Status Updated'
            END,
            CASE 
                WHEN NEW.status = 'accepted' THEN 'Your booking request for ' || service_title || ' from ' || provider_name || ' has been accepted'
                WHEN NEW.status = 'rejected' THEN 'Your booking request for ' || service_title || ' from ' || provider_name || ' has been declined'
                WHEN NEW.status = 'completed' THEN 'Your service ' || service_title || ' from ' || provider_name || ' has been marked as completed'
                ELSE 'Your booking status has been updated to ' || NEW.status
            END,
            CASE 
                WHEN NEW.status = 'accepted' THEN 'booking_accepted'
                WHEN NEW.status = 'rejected' THEN 'booking_rejected'
                WHEN NEW.status = 'completed' THEN 'booking_completed'
                ELSE 'status_update'
            END,
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

-- Ensure all required columns exist with correct types
ALTER TABLE notifications 
ALTER COLUMN created_at SET DEFAULT NOW(),
ALTER COLUMN read SET DEFAULT false,
ALTER COLUMN metadata SET DEFAULT '{}'::jsonb;

-- Update any existing notifications to match new types
UPDATE notifications 
SET type = CASE
    WHEN type = 'booking_request' THEN 'new_booking'
    WHEN type = 'booking_approved' THEN 'booking_accepted'
    ELSE type
END
WHERE type IN ('booking_request', 'booking_approved');

-- Grant necessary permissions
GRANT ALL ON notifications TO authenticated;
GRANT USAGE ON SEQUENCE notifications_id_seq TO authenticated;

-- Recreate RLS policies to ensure proper access
DROP POLICY IF EXISTS "Allow users to view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Allow users to update their own notifications" ON notifications;
DROP POLICY IF EXISTS "Allow system to create notifications" ON notifications;

CREATE POLICY "Allow users to view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Allow system to create notifications"
    ON notifications FOR INSERT
    WITH CHECK (true); 
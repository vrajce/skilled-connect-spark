-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS on_new_booking ON bookings;
DROP TRIGGER IF EXISTS on_booking_status_change ON bookings;
DROP FUNCTION IF EXISTS notify_provider_booking();
DROP FUNCTION IF EXISTS notify_user_booking_status();

-- Function to create notifications for new bookings
CREATE OR REPLACE FUNCTION notify_provider_booking()
RETURNS TRIGGER AS $$
DECLARE
    provider_user_id UUID;
    service_name TEXT;
    user_name TEXT;
BEGIN
    -- Get the provider's user_id and service name
    SELECT providers.user_id, provider_services.name 
    INTO provider_user_id, service_name
    FROM providers 
    JOIN provider_services ON provider_services.provider_id = providers.id
    WHERE providers.id = NEW.provider_id;

    -- Get the user's name
    SELECT COALESCE(user_metadata->>'full_name', email)
    INTO user_name
    FROM auth.users
    WHERE id = NEW.user_id;

    -- Create notification for provider
    INSERT INTO notifications (user_id, title, message, type, booking_id)
    VALUES (
        provider_user_id,
        'New Service Request',
        'You have a new booking request for ' || service_name || ' from ' || user_name,
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
    provider_name TEXT;
BEGIN
    IF OLD.status != NEW.status THEN
        -- Get the service name
        SELECT name INTO service_name
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
                WHEN NEW.status = 'accepted' THEN 'Your booking request for ' || service_name || ' from ' || provider_name || ' has been accepted'
                WHEN NEW.status = 'rejected' THEN 'Your booking request for ' || service_name || ' from ' || provider_name || ' has been declined'
                WHEN NEW.status = 'completed' THEN 'Your service ' || service_name || ' from ' || provider_name || ' has been marked as completed'
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
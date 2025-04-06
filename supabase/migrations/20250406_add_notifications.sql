-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('booking_request', 'booking_approved', 'booking_rejected', 'booking_completed', 'system')),
    booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE,
    read BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add RLS policies for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own notifications
CREATE POLICY "Allow users to view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to mark their notifications as read
CREATE POLICY "Allow users to update their own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id);

-- Allow the system to create notifications
CREATE POLICY "Allow system to create notifications"
    ON notifications FOR INSERT
    WITH CHECK (true);

-- Create function to notify provider about new booking
CREATE OR REPLACE FUNCTION notify_provider_booking()
RETURNS TRIGGER AS $$
BEGIN
    -- Get the provider's user_id
    INSERT INTO notifications (user_id, title, message, type, booking_id)
    SELECT 
        providers.user_id,
        'New Booking Request',
        'You have received a new booking request',
        'booking_request',
        NEW.id
    FROM providers
    WHERE providers.id = NEW.provider_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new bookings
CREATE TRIGGER booking_notification_trigger
    AFTER INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION notify_provider_booking();

-- Create function to notify user about booking status change
CREATE OR REPLACE FUNCTION notify_user_booking_status()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO notifications (user_id, title, message, type, booking_id)
        VALUES (
            NEW.user_id,
            CASE 
                WHEN NEW.status = 'confirmed' THEN 'Booking Approved'
                WHEN NEW.status = 'rejected' THEN 'Booking Rejected'
                WHEN NEW.status = 'completed' THEN 'Booking Completed'
                ELSE 'Booking Status Updated'
            END,
            CASE 
                WHEN NEW.status = 'confirmed' THEN 'Your booking request has been approved'
                WHEN NEW.status = 'rejected' THEN 'Your booking request has been rejected'
                WHEN NEW.status = 'completed' THEN 'Your booking has been marked as completed'
                ELSE 'Your booking status has been updated'
            END,
            CASE 
                WHEN NEW.status = 'confirmed' THEN 'booking_approved'
                WHEN NEW.status = 'rejected' THEN 'booking_rejected'
                WHEN NEW.status = 'completed' THEN 'booking_completed'
                ELSE 'system'
            END,
            NEW.id
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking status changes
CREATE TRIGGER booking_status_notification_trigger
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION notify_user_booking_status(); 
-- Drop existing foreign key if it exists
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_user_id_fkey;

-- Recreate the foreign key with the correct reference
ALTER TABLE bookings
ADD CONSTRAINT bookings_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- Create a view to expose user information safely
CREATE OR REPLACE VIEW public.user_profiles AS
SELECT 
    id,
    email,
    raw_user_meta_data->>'full_name' as full_name
FROM auth.users;

-- Grant access to the view
GRANT SELECT ON public.user_profiles TO authenticated;

-- Update the bookings query policy to include user information
CREATE OR REPLACE POLICY "Allow users to view their own bookings and providers to view their received bookings"
ON bookings FOR SELECT
USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
        SELECT 1 FROM providers
        WHERE providers.id = bookings.provider_id
        AND providers.user_id = auth.uid()
    )
); 
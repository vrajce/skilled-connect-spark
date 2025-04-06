-- Grant necessary permissions
GRANT ALL ON TABLE providers TO authenticated;
GRANT ALL ON TABLE providers TO service_role;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON providers;
DROP POLICY IF EXISTS "Enable admin updates" ON providers;

-- Create a simpler admin policy
CREATE POLICY "admin_update_policy" ON providers
FOR UPDATE TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND (
            auth.users.raw_user_meta_data->>'isAdmin' = 'true'
            OR auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    )
);

-- Create policy for users to update their own records
CREATE POLICY "user_update_own_policy" ON providers
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Ensure the admin user has correct metadata
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{isAdmin}',
    'true'
)
WHERE email = 'admin@skilledconnect.com';

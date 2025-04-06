-- Drop existing policies
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON providers;

-- Add admin policy for providers table
CREATE POLICY "Enable admin updates"
ON providers FOR UPDATE
TO authenticated
USING (
    auth.uid() IN (
        SELECT id
        FROM auth.users
        WHERE raw_user_meta_data->>'isAdmin' = 'true'
    )
)
WITH CHECK (
    auth.uid() IN (
        SELECT id
        FROM auth.users
        WHERE raw_user_meta_data->>'isAdmin' = 'true'
    )
);

-- Add regular user update policy
CREATE POLICY "Enable update for users based on user_id"
ON providers FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

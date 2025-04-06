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

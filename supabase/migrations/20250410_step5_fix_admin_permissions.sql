-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can check their admin status" ON admin_users;
DROP POLICY IF EXISTS "Enable read access for all users" ON providers;

-- Create admin_users policies
CREATE POLICY "Users can check their admin status"
ON admin_users FOR SELECT
TO authenticated
USING (true);

-- Create providers policies
CREATE POLICY "Enable read access for all users"
ON providers FOR SELECT
USING (
    status = 'approved' OR
    auth.uid() = user_id OR
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE user_id = auth.uid()
    )
);

-- Grant necessary permissions
GRANT SELECT ON admin_users TO authenticated;
GRANT SELECT ON providers TO authenticated; 
-- Enable RLS on admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can check their admin status" ON admin_users;
DROP POLICY IF EXISTS "Anyone can read admin users" ON admin_users;

-- Create policy for checking admin status
CREATE POLICY "Users can check their admin status"
ON admin_users FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Grant necessary permissions
GRANT SELECT ON admin_users TO authenticated;

-- Fix providers table RLS
DROP POLICY IF EXISTS "Anyone can read providers" ON providers;
DROP POLICY IF EXISTS "Users can read their own provider profile" ON providers;

-- Create policies for providers table
CREATE POLICY "Anyone can read approved providers"
ON providers FOR SELECT
USING (status = 'approved');

CREATE POLICY "Users can read their own provider profile"
ON providers FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own provider profile"
ON providers FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Grant necessary permissions
GRANT SELECT, UPDATE ON providers TO authenticated; 
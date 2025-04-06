-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to check their admin status
CREATE POLICY "Users can check their admin status"
ON admin_users FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT ON admin_users TO authenticated;

-- Create a view for safer admin checks
CREATE OR REPLACE VIEW user_roles AS
SELECT 
    au.user_id,
    au.is_super_admin,
    CASE 
        WHEN au.is_super_admin THEN 'admin'
        ELSE 'user'
    END as role
FROM admin_users au;

-- Grant access to the view
GRANT SELECT ON user_roles TO authenticated; 
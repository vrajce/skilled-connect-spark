-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    is_super_admin BOOLEAN DEFAULT false,
    UNIQUE(user_id)
);

-- Update providers table RLS policies
DROP POLICY IF EXISTS "Allow users to view approved providers" ON providers;
DROP POLICY IF EXISTS "Allow users to create their own provider profile" ON providers;
DROP POLICY IF EXISTS "Allow providers to update their own profile" ON providers;

-- New providers policies
CREATE POLICY "Enable read access for all users" ON providers
    FOR SELECT USING (
        status = 'approved' OR -- Anyone can view approved providers
        auth.uid() = user_id OR -- Users can view their own provider profile
        EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()) -- Admins can view all
    );

CREATE POLICY "Allow users to create their own provider profile" ON providers
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow providers and admins to update profiles" ON providers
    FOR UPDATE USING (
        auth.uid() = user_id OR -- Providers can update their own profile
        EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()) -- Admins can update any
    );

-- Insert initial super admin (replace 'YOUR_USER_ID' with your actual user ID)
INSERT INTO admin_users (user_id, is_super_admin)
VALUES (auth.uid(), true)
WHERE auth.uid() IS NOT NULL;

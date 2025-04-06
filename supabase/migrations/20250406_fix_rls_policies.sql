-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view approved providers" ON providers;
DROP POLICY IF EXISTS "Users can create their own provider profile" ON providers;
DROP POLICY IF EXISTS "Providers can update their own profile" ON providers;

-- Disable RLS temporarily to ensure we can modify the policies
ALTER TABLE providers DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Create basic policies
CREATE POLICY "Enable read access for all users"
ON providers FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON providers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id"
ON providers FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
ON providers FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON providers TO authenticated;
GRANT USAGE ON SEQUENCE providers_id_seq TO authenticated;

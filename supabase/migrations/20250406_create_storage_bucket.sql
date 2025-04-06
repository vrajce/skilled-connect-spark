-- Create storage bucket for provider profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('provider-profiles', 'provider-profiles', true);

-- Allow authenticated users to upload files to the bucket
CREATE POLICY "Authenticated users can upload profile pictures"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'provider-profiles' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public access to view profile pictures
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
USING (bucket_id = 'provider-profiles');

-- Allow users to update/delete their own profile pictures
CREATE POLICY "Users can update their profile pictures"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'provider-profiles' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their profile pictures"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'provider-profiles' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

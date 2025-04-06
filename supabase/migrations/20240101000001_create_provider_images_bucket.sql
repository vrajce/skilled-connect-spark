-- Create a storage bucket for provider work images
INSERT INTO storage.buckets (id, name, public)
VALUES ('provider-images', 'provider-images', true);

-- Set up storage policies
CREATE POLICY "Provider images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'provider-images');

-- Allow providers to upload their own images
CREATE POLICY "Providers can upload their own images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'provider-images' AND
    (storage.foldername(name))[1] = 'work-images' AND
    (storage.foldername(name))[2] IN (
      SELECT id::text FROM providers
      WHERE user_id = auth.uid()
    )
  );

-- Allow providers to update their own images
CREATE POLICY "Providers can update their own images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'provider-images' AND
    (storage.foldername(name))[1] = 'work-images' AND
    (storage.foldername(name))[2] IN (
      SELECT id::text FROM providers
      WHERE user_id = auth.uid()
    )
  );

-- Allow providers to delete their own images
CREATE POLICY "Providers can delete their own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'provider-images' AND
    (storage.foldername(name))[1] = 'work-images' AND
    (storage.foldername(name))[2] IN (
      SELECT id::text FROM providers
      WHERE user_id = auth.uid()
    )
  ); 
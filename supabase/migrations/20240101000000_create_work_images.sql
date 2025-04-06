-- Create work_images table
CREATE TABLE IF NOT EXISTS work_images (
  id SERIAL PRIMARY KEY,
  provider_id INTEGER NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE work_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view work images
CREATE POLICY "Work images are viewable by everyone" 
  ON work_images FOR SELECT 
  USING (true);

-- Allow providers to insert their own work images
CREATE POLICY "Providers can insert their own work images" 
  ON work_images FOR INSERT 
  WITH CHECK (
    provider_id IN (
      SELECT id FROM providers 
      WHERE user_id = auth.uid()
    )
  );

-- Allow providers to update their own work images
CREATE POLICY "Providers can update their own work images" 
  ON work_images FOR UPDATE 
  USING (
    provider_id IN (
      SELECT id FROM providers 
      WHERE user_id = auth.uid()
    )
  );

-- Allow providers to delete their own work images
CREATE POLICY "Providers can delete their own work images" 
  ON work_images FOR DELETE 
  USING (
    provider_id IN (
      SELECT id FROM providers 
      WHERE user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_work_images_updated_at
BEFORE UPDATE ON work_images
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krpuxpahptsyzczhtkvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycHV4cGFocHRzeXpjemh0a3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTYyMDYsImV4cCI6MjA1OTQzMjIwNn0.86Lz3OAOlX9-VS96kTKFQuY_bawjeMcv9_-jrUFsx1Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  db: {
    schema: 'public'
  }
});

// Debug function to check table schema
export const debugTableSchema = async (tableName: string) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(0);
    
    if (error) {
      console.error(`Error checking ${tableName} schema:`, error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error(`Failed to check ${tableName} schema:`, err);
    return null;
  }
};

// Function to reset schema cache
export const resetSchemaCache = async () => {
  try {
    // Force a schema refresh by making a minimal query
    await supabase.from('bookings').select('id').limit(1);
  } catch (error) {
    console.error('Error resetting schema cache:', error);
  }
};

import { createClient } from '@supabase/supabase-js';


// const supabaseUrl = 'https://krpuxpahptsyzczhtkvo.supabase.co';
const supabaseUrl = 'https://qbkpkdfvhcxdcvqtigsp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFia3BrZGZ2aGN4ZGN2cXRpZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NzMyOTcsImV4cCI6MjA3MTQ0OTI5N30.QZYWMacHzwuunDuEadIfMTkYo8scgQUkjcYu5zOMZmg';

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

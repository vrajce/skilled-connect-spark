import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krpuxpahptsyzczhtkvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycHV4cGFocHRzeXpjemh0a3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTYyMDYsImV4cCI6MjA1OTQzMjIwNn0.86Lz3OAOlX9-VS96kTKFQuY_bawjeMcv9_-jrUFsx1Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

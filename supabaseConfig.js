import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
// You can find these in your Supabase project settings
const supabaseUrl = 'https://fsuixjjgtyvcwdkbpgta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdWl4ampndHl2Y3dka2JwZ3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NjI4MTYsImV4cCI6MjA2ODQzODgxNn0.p4cSn2luu08wwGLnY9KWgvQJng7ZOEVXyIAAiSLKuTY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

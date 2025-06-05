
import { createClient } from '@supabase/supabase-js';

// Use placeholder values that won't cause URL construction errors
const supabaseUrl = 'https://placeholder.supabase.co';
const supabaseAnonKey = 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

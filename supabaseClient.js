import { createClient } from '@supabase/supabase-js';

// Estos valores serán reemplazados automáticamente por GitHub Actions durante el despliegue.
const supabaseUrl = '__SUPABASE_URL__';
const supabaseAnonKey = '__SUPABASE_ANON_KEY__';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
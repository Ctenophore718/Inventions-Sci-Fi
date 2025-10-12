import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

console.log('Supabase Client Initialization:');
console.log('- URL:', url ? `${url.substring(0, 30)}...` : 'MISSING');
console.log('- Anon Key:', anonKey ? `${anonKey.substring(0, 20)}...` : 'MISSING');

if (!url || !anonKey) {
  console.error('CRITICAL: Supabase URL or Anon Key is missing! Authentication and database features will not work.');
}

export const supabase = createClient(
  url || '',
  anonKey || ''
);

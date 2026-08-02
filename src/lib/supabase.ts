import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Check if Supabase environment variables are properly configured.
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(rawSupabaseUrl) &&
    Boolean(rawSupabaseAnonKey) &&
    !rawSupabaseUrl.includes('your-project-id') &&
    !rawSupabaseUrl.includes('placeholder')
  );
};

// Use fallback values to prevent createClient from throwing on module evaluation when unconfigured
const safeUrl = isSupabaseConfigured() ? rawSupabaseUrl : 'https://placeholder.supabase.co';
const safeAnonKey = isSupabaseConfigured() ? rawSupabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

/**
 * Standard Supabase client for client-side and authenticated user requests.
 */
export const supabase: SupabaseClient = createClient(safeUrl, safeAnonKey);

/**
 * Admin Supabase client using Service Role Key for server-side operations (API routes only).
 * WARNING: Never expose SUPABASE_SERVICE_ROLE_KEY to the browser!
 */
export const getSupabaseAdmin = (): SupabaseClient => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey || serviceRoleKey.includes('your-service-role-key')) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing or unconfigured in environment variables.');
  }
  if (!isSupabaseConfigured()) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing or unconfigured.');
  }
  return createClient(rawSupabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export default supabase;


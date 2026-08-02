import { supabase, getSupabaseAdmin, isSupabaseConfigured } from './supabase';

/**
 * Main Database connection module for PostgreSQL via Supabase.
 * Use `db` for client/standard queries and `getSupabaseAdmin()` for privileged API server operations.
 */
export const db = supabase;
export { supabase, getSupabaseAdmin, isSupabaseConfigured };

export default db;


import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';

/**
 * Health check endpoint for Supabase PostgreSQL database connection.
 */

type Data = {
  success: boolean;
  message: string;
  timestamp?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    if (!isSupabaseConfigured()) {
      return res.status(400).json({
        success: false,
        message: 'PostgreSQL / Supabase configuration missing or contains default placeholder credentials.',
        error: 'Please update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file with your actual Supabase credentials from your Supabase Dashboard.',
      });
    }

    // Ping Supabase auth/db health endpoint
    const { error } = await supabase.from('_dummy_health_check').select('*').limit(1);

    // Note: If table does not exist (PGRST204, PGRST205, 42P01, PGRST200), connection to PostgreSQL is successful!
    if (
      error &&
      error.code !== 'PGRST204' &&
      error.code !== 'PGRST205' &&
      error.code !== '42P01' &&
      error.code !== 'PGRST200'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Failed to connect to PostgreSQL database.',
        error: `${error.message} (Code: ${error.code || 'UNKNOWN'})`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'PostgreSQL database connection via Supabase is configured and reachable!',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Database health check failed.',
      error: err?.message || 'Network error or request timeout',
    });
  }
}



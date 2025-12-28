// ============================================
// THE MIRROR - Supabase Client
// ============================================

import { createClient } from '@supabase/supabase-js';

// Server-side client (with service role key for write access)
export function getSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}

// Database types
export interface SoulReport {
  id: string;
  short_code: string;
  profile: any; // UserProfile JSON
  ai_response: string;
  created_at: string;
}

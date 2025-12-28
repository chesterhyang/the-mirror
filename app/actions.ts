'use server';

import { getSupabaseServer } from '@/lib/supabase';
import { UserProfile } from '@/lib/types';
import { generateReportId } from '@/lib/utils';

/**
 * Create a new report record with inputs only (ai_response is null initially)
 * Returns the short_code (case ID) for URL routing
 */
export async function createReport(profile: UserProfile): Promise<string> {
  const supabase = getSupabaseServer();
  const shortCode = generateReportId();

  const { error } = await supabase
    .from('soul_reports')
    .insert({
      short_code: shortCode,
      profile: profile,
      ai_response: '', // Empty string initially, will be filled after AI generation
    });

  if (error) {
    console.error('Failed to create report:', error);
    throw new Error('Failed to create report');
  }

  return shortCode;
}

/**
 * Update an existing report with the AI-generated result
 */
export async function updateReportResult(shortCode: string, aiResponse: string): Promise<void> {
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from('soul_reports')
    .update({ ai_response: aiResponse })
    .eq('short_code', shortCode);

  if (error) {
    console.error('Failed to update report:', error);
    throw new Error('Failed to update report');
  }

  console.log('✅ Report updated:', shortCode, `(${aiResponse.length} chars)`);
}

/**
 * Fetch a report by short_code
 */
export async function getReport(shortCode: string) {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('soul_reports')
    .select('*')
    .eq('short_code', shortCode)
    .single();

  if (error) {
    console.error('Failed to fetch report:', error);
    return null;
  }

  return data;
}

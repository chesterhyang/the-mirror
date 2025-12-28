import { NextRequest } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[API /api/report/[id]] Fetching:', params.id);

    // 直接查询数据库
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('soul_reports')
      .select('*')
      .eq('short_code', params.id)
      .single();

    if (error) {
      console.error('[API] Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Report not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!data) {
      console.log('[API] No data found for:', params.id);
      return new Response(
        JSON.stringify({ error: 'Report not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[API] Returning data:', {
      short_code: data.short_code,
      ai_response_length: data.ai_response?.length || 0,
      ai_response_type: typeof data.ai_response,
      ai_response_preview: data.ai_response?.substring(0, 50) || 'EMPTY'
    });

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

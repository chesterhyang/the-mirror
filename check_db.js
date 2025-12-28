const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2];
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkReport() {
  // Check specific report
  const { data: specific, error: err1 } = await supabase
    .from('soul_reports')
    .select('*')
    .eq('short_code', 'MR-MJPFD8KF-DVAM')
    .single();

  if (!err1 && specific) {
    console.log('\n=== MR-MJPFD8KF-DVAM 详情 ===');
    console.log('ai_response length:', specific.ai_response?.length || 0);
    console.log('ai_response content:\n', specific.ai_response || 'EMPTY');
  }

  // Check latest 3
  const { data, error } = await supabase
    .from('soul_reports')
    .select('short_code, ai_response, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('\n\n最新3条记录:');
    data.forEach((row, idx) => {
      console.log(`\n${idx + 1}. Case ID: ${row.short_code}`);
      console.log(`   Created: ${row.created_at}`);
      console.log(`   ai_response length: ${row.ai_response?.length || 0} chars`);
      console.log(`   ai_response preview: ${row.ai_response?.substring(0, 100) || 'EMPTY'}`);
    });
  }
  process.exit(0);
}

checkReport();

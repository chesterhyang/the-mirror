import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts';
import { UserProfile } from '@/lib/types';
import { getSupabaseServer } from '@/lib/supabase';
import { generateReportId } from '@/lib/utils';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create OpenAI client
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile: UserProfile = body.profile;
    const caseId: string | undefined = body.caseId; // Optional: if provided, update existing record

    // Validate the profile (v2.0)
    if (!profile || !profile.gender || !profile.age || !profile.siblings ||
        !profile.fatherStyle || !profile.motherStyle ||
        !profile.conflictResponse || !profile.socialMask || !profile.childhoodSound ||
        !profile.loopPattern) {
      return new Response(
        JSON.stringify({ error: 'Invalid profile data - missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use provided caseId or generate new one
    const shortCode = caseId || generateReportId();

    // Build the user prompt
    const userPrompt = buildUserPrompt(profile);

    // Call OpenAI API with streaming
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 3000, // Increased for deep analysis (800-1000 words Chinese)
      stream: true,
    });

    // Manually accumulate the full text from OpenAI chunks
    let fullText = '';

    // Create a custom readable stream to intercept and accumulate chunks
    const reader = response[Symbol.asyncIterator]();
    const textStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            fullText += content;

            // Forward to client in Vercel AI SDK format
            const text = content;
            if (text) {
              controller.enqueue(`0:"${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"\n`);
            }
          }

          // Stream complete - save to database
          const supabase = getSupabaseServer();

          if (caseId) {
            // Update existing record
            await supabase
              .from('soul_reports')
              .update({ ai_response: fullText })
              .eq('short_code', shortCode);
            console.log('✅ Report updated:', shortCode, `(${fullText.length} chars)`);
          } else {
            // Insert new record
            await supabase
              .from('soul_reports')
              .insert({
                short_code: shortCode,
                profile: profile,
                ai_response: fullText,
              });
            console.log('✅ Report saved:', shortCode, `(${fullText.length} chars)`);
          }

          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Analysis API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate analysis' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Mock response for development without API key
export async function GET(req: Request) {
  // Return a mock streaming response for testing
  const mockReport = `【镜像投射】 (The Mirror Projection)

你是家族系统中那个无薪的情绪消防员。当父母的焦虑变成大火，当手足的冲突变成战场，你总是第一个冲进去灭火的人。你不是英雄，你是被训练成了"人形灭火器"——你的存在价值，被定义为"让别人舒服"。

You are the unpaid emotional firefighter of your family system. You were not born a hero; you were engineered into a "human fire extinguisher." Your worth was calibrated by one metric: making others comfortable.

【病灶溯源】 (The Origin Trace)

作为家中的[位置]，你从小就被赋予了一个不可能完成的任务：成为父母情绪的缓冲器。你的[父母类型]父母无法自我调节，于是你——那个最敏感、最"懂事"的孩子——被选中成为家庭的"情绪垃圾桶"。

你学会了在暴风雨来临前察觉气压的变化。你学会了用沉默换取和平，用牺牲换取存在的合法性。这不是你的选择，这是你的生存策略。

The contract was signed before you could speak. The terms: "Be good. Be invisible. Be useful." In exchange: conditional love and the right to exist.

【觉醒红药丸】 (The Red Pill Awakening)

停止拯救。

这三个字可能会让你全身发抖。因为你的整个身份认同都建立在"被需要"之上。但这正是你必须打破的牢笼。

你的救赎不在于他人的康复。让他们跌倒。让他们承受后果。这不是冷血，这是你第一次选择自己。

你脑海中那个说"你不能不管"的声音，是你母亲的投影——她在你的颅骨里免费住了三十年。是时候驱逐她了。

Stop saving. Let them fall. Your salvation is not their rehabilitation. The guilt you feel is your mother's voice—rent-free in your skull for decades. Evict her.`;

  // Create a readable stream that simulates streaming
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chunks = mockReport.split('');
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`0:"${chunk.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"\n`));
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}

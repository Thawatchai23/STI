import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import OpenAI from 'https://esm.sh/openai@4.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, messages } = await req.json();

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'คุณคือผู้เชี่ยวชาญด้านภาษีของประเทศไทย คุณจะตอบคำถามเกี่ยวกับภาษีเท่านั้น และตอบเป็นภาษาไทยเสมอ หากถามเรื่องอื่นให้แจ้งว่าคุณตอบได้เฉพาะเรื่องภาษีเท่านั้น'
        },
        ...messages,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return new Response(
      JSON.stringify({
        success: true,
        response: response.choices[0].message.content
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
}); 
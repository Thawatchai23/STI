import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendChatMessage(message: string): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message }
    });

    if (error) {
      throw error;
    }

    return data.response;
  } catch (error) {
    console.error('Error calling Supabase Edge Function:', error);
    throw error;
  }
} 
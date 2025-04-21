import axios from 'axios';
import { supabase } from '../lib/supabase';

export const sendMessage = async (messages: any[]) => {
  try {
    // ดึง API key จาก Supabase
    const { data: config, error } = await supabase
      .from('config')
      .select('openai_api_key')
      .single();

    if (error) throw error;
    
    const API_KEY = config.openai_api_key;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that specializes in Thai tax laws and regulations. Provide accurate and detailed explanations about tax-related topics, including income tax, VAT, corporate tax, and other tax-related matters in Thailand.'
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}; 
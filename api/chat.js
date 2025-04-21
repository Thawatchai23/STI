const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // ดึง API key จาก Supabase
    const { data: config, error } = await supabase
      .from('config')
      .select('openai_api_key')
      .single();

    if (error) throw error;

    const API_KEY = config.openai_api_key;
    const messages = req.body.messages;

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

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      message: 'Error processing request',
      error: error.message 
    });
  }
}; 
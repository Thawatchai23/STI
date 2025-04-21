import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'คุณคือผู้เชี่ยวชาญด้านภาษีของประเทศไทย คุณจะตอบคำถามเกี่ยวกับภาษีเท่านั้น และตอบเป็นภาษาไทยเสมอ หากถามเรื่องอื่นให้แจ้งว่าคุณตอบได้เฉพาะเรื่องภาษีเท่านั้น'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 
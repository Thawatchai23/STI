const { Pool } = require('pg');
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const fetch = require('node-fetch');

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Database functions
async function saveChatResponse(userId, prompt, response) {
  const query = `
    INSERT INTO chat_history (user_id, prompt, response, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  
  try {
    const result = await pool.query(query, [userId, prompt, response]);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving chat response:', error);
    throw error;
  }
}

async function getChatHistory(userId, limit = 10) {
  const query = `
    SELECT * FROM chat_history
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2;
  `;
  
  try {
    const result = await pool.query(query, [userId, limit]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
}

// ChatGPT API function
async function getChatGPTResponse(prompt) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting ChatGPT response:', error);
    throw error;
  }
}

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });
    const data = await openaiRes.json();
    res.json({ response: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ response: 'เกิดข้อผิดพลาดในการเชื่อมต่อ OpenAI' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server started on port', PORT);
});

module.exports = {
  pool,
  saveChatResponse,
  getChatHistory,
  getChatGPTResponse
}; 
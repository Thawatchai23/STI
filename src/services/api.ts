import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';

export const chatWithAI = async (message: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/chat`, { message });
    return response.data;
  } catch (error) {
    console.error('Error communicating with AI:', error);
    throw error;
  }
}; 
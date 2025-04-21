import axios from 'axios';

export const sendMessage = async (messages: any[]) => {
  try {
    const response = await axios.post('/api/chat', {
      messages: messages
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}; 
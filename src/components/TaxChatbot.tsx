import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Mock tax-related responses
const taxResponses: { [key: string]: string } = {
  'ภาษีเงินได้': 'ภาษีเงินได้บุคคลธรรมดา คือภาษีที่จัดเก็บจากบุคคลทั่วไป หรือจากหน่วยภาษีตามที่กฎหมายกำหนดให้เป็นหน่วยภาษี และมีรายได้เกิดขึ้นตามเกณฑ์ที่กำหนด',
  'ภาษีที่ดิน': 'ภาษีที่ดินและสิ่งปลูกสร้าง เป็นภาษีที่จัดเก็บจากที่ดินและสิ่งปลูกสร้าง โดยองค์กรปกครองส่วนท้องถิ่นเป็นผู้รับผิดชอบการจัดเก็บ',
  'ภาษีมูลค่าเพิ่ม': 'ภาษีมูลค่าเพิ่ม (VAT) คือ ภาษีที่จัดเก็บจากมูลค่าของสินค้าหรือบริการที่เพิ่มขึ้นในแต่ละขั้นตอนของการผลิตและจำหน่าย',
  'การยื่นภาษี': 'การยื่นแบบแสดงรายการภาษีสามารถทำได้ทั้งที่สำนักงานสรรพากรพื้นที่สาขา หรือผ่านระบบอินเทอร์เน็ตที่เว็บไซต์กรมสรรพากร',
  'ลดหย่อนภาษี': 'การลดหย่อนภาษีมีหลายประเภท เช่น ค่าลดหย่อนส่วนตัว ค่าลดหย่อนคู่สมรส ค่าลดหย่อนบุตร เงินประกันชีวิต เงินสะสมกองทุนสำรองเลี้ยงชีพ เป็นต้น'
};

export default function TaxChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when component mounts
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: 'สวัสดีค่ะ ฉันคือผู้ช่วยตอบคำถามเกี่ยวกับภาษี ยินดีให้คำปรึกษาค่ะ 😊'
    }]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find matching response based on keywords
      let response = 'ขออภัยค่ะ ฉันไม่เข้าใจคำถามของคุณ กรุณาถามใหม่อีกครั้งโดยระบุเกี่ยวกับภาษีที่ต้องการสอบถาม เช่น ภาษีเงินได้ ภาษีที่ดิน ภาษีมูลค่าเพิ่ม การยื่นภาษี หรือการลดหย่อนภาษี';
      
      for (const [keyword, answer] of Object.entries(taxResponses)) {
        if (userMessage.toLowerCase().includes(keyword.toLowerCase())) {
          response = answer;
          break;
        }
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง' 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col h-[600px] ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className={`p-4 ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
      } border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
          }`}>
            <Bot className={`w-5 h-5 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`} />
          </div>
          <div>
            <h2 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              AI Tax Assistant
            </h2>
            <p className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              พร้อมให้คำปรึกษาตลอด 24 ชั่วโมง
            </p>
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50/50'
      }`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            } animate-fade-in`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' && (
                  <div className={`p-1 rounded ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                  }`}>
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </p>
                {message.role === 'user' && (
                  <div className="bg-blue-600 p-1 rounded">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className={`p-3 rounded-2xl ${
              isDarkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="loading-dots">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={`p-4 ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-white'
      } border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์คำถามเกี่ยวกับภาษีที่นี่..."
              className={`w-full p-3 pr-12 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              disabled={isLoading}
            />
            <Sparkles className={`w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`p-3 rounded-xl ${
              isDarkMode
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .loading-dots {
            display: inline-flex;
          }
          .dot {
            animation: loading 1.4s infinite;
            margin-right: 2px;
            font-size: 20px;
            line-height: 10px;
          }
          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes loading {
            0%, 80%, 100% { opacity: 0; transform: translateY(0); }
            40% { opacity: 1; transform: translateY(-4px); }
          }
        `}
      </style>
    </div>
  );
} 
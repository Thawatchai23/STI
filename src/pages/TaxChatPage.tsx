import React from 'react';
import TaxChatbot from '../components/TaxChatbot';
import { useTheme } from '../context/ThemeContext';
import { Bot, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaxChatPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-blue-50 to-white'
    }`}>
      {/* Header */}
      <div className={`w-full ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-md`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors duration-200`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>กลับหน้าหลัก</span>
            </Link>
            <h1 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Smart Tax Inside
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center p-3 rounded-full ${
              isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
            } mb-4`}>
              <Bot className={`w-8 h-8 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-500'
              }`} />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ระบบตอบคำถามเกี่ยวกับภาษี
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              สอบถามข้อมูลเกี่ยวกับภาษีได้ตลอด 24 ชั่วโมง
            </p>
          </div>

          {/* Chatbot */}
          <div className={`rounded-2xl shadow-lg ${
            isDarkMode ? 'shadow-black/20' : 'shadow-gray-200/80'
          } overflow-hidden`}>
            <TaxChatbot />
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              ระบบนี้ให้ข้อมูลเบื้องต้นเท่านั้น สำหรับข้อมูลอย่างเป็นทางการกรุณาติดต่อเจ้าหน้าที่โดยตรง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxChatPage; 
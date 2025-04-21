import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ChatBot from '../components/ChatBot';

const TaxChatPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  return (
    <div className={`min-h-screen py-8 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'th' ? 'ตอบคำถามเกี่ยวกับภาษี' : 'Tax Q&A'}
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {language === 'th' 
                ? 'สอบถามข้อมูลเกี่ยวกับภาษีได้ตลอด 24 ชั่วโมง' 
                : 'Get answers to your tax-related questions 24/7'}
            </p>
          </div>

          {/* Tips Section */}
          <div className={`mb-8 p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'th' ? 'คำแนะนำในการถาม' : 'Tips for Asking Questions'}
            </h2>
            <ul className={`list-disc pl-5 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li className="mb-2">
                {language === 'th'
                  ? 'ระบุประเภทภาษีที่ต้องการสอบถามให้ชัดเจน'
                  : 'Clearly specify the type of tax you are asking about'}
              </li>
              <li className="mb-2">
                {language === 'th'
                  ? 'หากมีตัวเลขหรือข้อมูลเฉพาะ กรุณาระบุให้ครบถ้วน'
                  : 'Include specific numbers or details if applicable'}
              </li>
              <li>
                {language === 'th'
                  ? 'สามารถถามได้ทั้งภาษาไทยและภาษาอังกฤษ'
                  : 'You can ask in both Thai and English'}
              </li>
            </ul>
          </div>

          {/* ChatBot Component */}
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default TaxChatPage; 
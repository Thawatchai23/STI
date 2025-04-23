import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  th: {
    welcome: 'ยินดีต้อนรับ',
    about: 'เกี่ยวกับเรา',
    services: 'บริการ',
    contact: 'ติดต่อ',
    news: 'ข่าวสาร',
    taxChat: 'สอบถามภาษี',
    search: 'ค้นหา',
    // Add more translations as needed
  },
  en: {
    welcome: 'Welcome',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    news: 'News',
    taxChat: 'Tax Chat',
    search: 'Search',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      return (savedLang === 'en' ? 'en' : 'th') as Language;
    }
    return 'th';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['th']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 
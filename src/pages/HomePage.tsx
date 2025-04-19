import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Phone,
  Mail,
  Clock,
  Calendar,
  FileText,
  Users2,
  Landmark,
  TreePine,
  Menu,
  X,
  Search,
  Home,
  Info,
  Newspaper,
  HandHeart,
  MessageCircle,
  UserCircle,
  Camera,
  MapPin,
  Users,
  Star,
  ShoppingBag,
  ShoppingCart,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Calculator,
  BookOpen,
  Moon,
  Sun,
  Languages
} from "lucide-react";
import OrderModal from "../components/OrderModal";
import CartModal from "../components/CartModal";
import logo from "../img/public1/IMG_0662.png";


interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface LanguageContextType {
  language: 'th' | 'en';
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '';
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'th' | 'en'>('th');
  const toggleLanguage = () => setLanguage(prev => prev === 'th' ? 'en' : 'th');

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

function SettingsMenu() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center">
      <div className="h-8 w-px bg-white/20 mx-2 hidden md:block" />
      <div className="flex items-center space-x-1">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group"
          aria-label={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
        >
          <Languages className="w-5 h-5 text-white/90 group-hover:text-red-500 transition-colors duration-300" />
          <span className="text-base font-bold text-white/90 group-hover:text-red-500 transition-all duration-300">
            {language === 'th' ? 'EN' : 'TH'}
          </span>
        </button>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="relative w-12 h-6 rounded-full bg-gray-600 transition-colors duration-300">
            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full transition-transform duration-300 flex items-center justify-center ${
              isDarkMode 
                ? 'transform translate-x-6 bg-red-500' 
                : 'bg-white'
            }`}>
              {isDarkMode ? (
                <Moon className="w-4 h-4 text-white" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          </div>
          <span className="text-base font-bold text-white/90 hidden md:block group-hover:text-red-500 transition-all duration-300">
            {isDarkMode ? 'โหมดมืด' : 'โหมดสว่าง'}
          </span>
        </button>
      </div>
    </div>
  );
}

interface Product {
  name: string;
  price: string;
  image: string;
  producer: string;
  category: string;
  rating: number;
  reviews: number;
  awards: string[];
  colors?: string[];
}

interface CartItem extends Product {
  type: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    image: string;
    producer: string;
  };
  onAddToCart: (productType: string) => void;
}

interface ImageObject {
  desktop: string;
  mobile: string;
}

interface Slide {
  image: ImageObject;
  title?: string;
  subtitle?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
}

interface QuickLinkProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

// Add type definitions for translations
interface ProductTranslations {
  thermos: string;
  shirt: string;
  keychain: string;
  pencilCase: string;
}

interface CategoryTranslations {
  utilities: string;
  fashion: string;
  decoration: string;
}

interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
}

interface TranslationType {
  // Navigation
  home: string;
  knowledge: string;
  news: string;
  forms: string;
  contact: string;
  about: string;
  
  // Header
  companyName: string;
  tagline: string;
  
  // Quick Links
  taxPayment: string;
  taxPaymentDesc: string;
  complaint: string;
  complaintDesc: string;
  welfare: string;
  welfareDesc: string;
  contactUs: string;
  contactDesc: string;

  // Services
  services: string;
  taxCalculator: string;
  taxCalculatorDesc: string;
  taxChat: string;
  taxChatDesc: string;
  taxNearby: string;
  taxNearbyDesc: string;

  // News Ticker
  recommended: string;
  ticker1: string;
  ticker2: string;
  ticker3: string;

  // OTOP Products
  otopProducts: string;
  otopDesc: string;
  producedBy: string;
  reviews: string;
  orderProduct: string;
  addToCart: string;
  viewAllProducts: string;
  hot: string;
  preOrder: string;
  new: string;

  // Product Categories
  category: CategoryTranslations;
  products: ProductTranslations;

  // News Section
  operationalNews: string;
  readMore: string;
  viewAllPhotos: string;

  // Footer
  companyInfo: CompanyInfo;
  workingHours: string;
  workingDays: string;
  workingTime: string;
  closedDay: string;
  relatedLinks: string;
  aboutCompany: string;
  procurement: string;
  relatedWebsites: string;
  college: string;
  revenue: string;
  accounting: string;
  copyright: string;
}

const translations: Record<'th' | 'en', TranslationType> = {
  th: {
    // Navigation
    home: "หน้าหลัก",
    knowledge: "ความรู้",
    news: "ข่าวสาร",
    forms: "แบบฟอร์ม",
    contact: "ติดต่อ",
    about: "เกี่ยวกับ",
    
    // Header
    companyName: "Smart Tax Inside",
    tagline: "ระบบคำนวณภาษีอัจฉริยะ",
    
    // Quick Links
    taxPayment: "ชำระภาษี",
    taxPaymentDesc: "ชำระภาษีออนไลน์",
    complaint: "ร้องเรียน",
    complaintDesc: "แจ้งเรื่องร้องเรียน",
    welfare: "สวัสดิการ",
    welfareDesc: "ลงทะเบียนสวัสดิการ",
    contactUs: "ติดต่อเรา",
    contactDesc: "ติดต่อเจ้าหน้าที่",

    // Services
    services: "บริการของเรา",
    taxCalculator: "คำนวณภาษี",
    taxCalculatorDesc: "Function คำนวณภาษี 5 ประเภท\nเพื่อง่ายต่อการกรอกข้อมูล เพื่อขึ้น\nภาษีที่คุณต้องการ",
    taxChat: "ตอบคำถามภาษี",
    taxChatDesc: "คุณสามารถทำคำถามเกี่ยวกับภาษี\nได้ 24 ชั่วโมง",
    taxNearby: "สรรพากรใกล้ฉัน",
    taxNearbyDesc: "คุณจะสามารถค้นหาสรรพากรใกล้\nคุณได้โดยใช้ Function ที่มีด้วย\nสรรพากรใกล้ฉัน",

    // News Ticker
    recommended: "แนะนำ",
    ticker1: "📢 ถามตอบแชทได้ 24 ชั่วโมง",
    ticker2: "🎓 คำนวณภาษี 5 ประเภท",
    ticker3: "📋 ปริ้นเอกสารออกมากรอกข้อมูล",

    // OTOP Products
    otopProducts: "ผลิตภัณฑ์ชุมชน OTOP",
    otopDesc: "ผลิตภัณฑ์คุณภาพจากภูมิปัญญาท้องถิ่น สร้างรายได้สู่ชุมชน",
    producedBy: "ผลิตโดย",
    reviews: "รีวิว",
    orderProduct: "สั่งซื้อสินค้า",
    addToCart: "ตะกร้า",
    viewAllProducts: "ดูสินค้าทั้งหมด",
    hot: "ขายดี",
    preOrder: "สั่งจอง",
    new: "ใหม่",

    // Product Categories
    category: {
      utilities: "ของใช้",
      fashion: "เสื้อผ้าแฟชั่น",
      decoration: "ตกแต่ง"
    },

    // Products
    products: {
      thermos: "แก้วเก็บความเย็น",
      shirt: "เสื้อ",
      keychain: "พวงกุญแจ",
      pencilCase: "กระเป๋าดินสอ"
    },

    // News Section
    operationalNews: "ข่าวสารเกี่ยวกับภาษี",
    readMore: "อ่านเพิ่มเติม",
    viewAllPhotos: "ดูภาพทั้งหมด",

    // Footer
    companyInfo: {
      name: "Smart Tax Inside",
      phone: "01-123-4567",
      email: "STI@smarttaxinside.go.th"
    },
    workingHours: "เวลาทำการ",
    workingDays: "จันทร์-วันเสาร์",
    workingTime: "8:30 - 16:30 น.",
    closedDay: "หยุดวันอาทิตย์",
    relatedLinks: "ลิงก์ที่เกี่ยวข้อง",
    aboutCompany: "เกี่ยวกับ Smart Tax Inside",
    procurement: "จัดซื้อจัดจ้าง",
    relatedWebsites: "เว็บไซต์ที่เกี่ยวข้อง",
    college: "วิทยาลัยเทคโนโลยีเอเชียลพบุรี",
    revenue: "กรมสรรพากร",
    accounting: "สำนักงานบัญชี",
    copyright: "© 2567 Smart Tax Side. สงวนลิขสิทธิ์."
  },
  en: {
    // Navigation
    home: "Home",
    knowledge: "Knowledge",
    news: "News",
    forms: "Forms",
    contact: "Contact",
    about: "About",
    
    // Header
    companyName: "Smart Tax Inside",
    tagline: "Intelligent Tax Calculator System",
    
    // Quick Links
    taxPayment: "Tax Payment",
    taxPaymentDesc: "Pay Tax Online",
    complaint: "Complaints",
    complaintDesc: "Submit Complaints",
    welfare: "Welfare",
    welfareDesc: "Register for Welfare",
    contactUs: "Contact",
    contactDesc: "Contact Staff",

    // Services
    services: "Our Services",
    taxCalculator: "Tax Calculator",
    taxCalculatorDesc: "Calculate 5 types of taxes\nfor easy data entry\nfor your tax needs",
    taxChat: "Tax Chat Support",
    taxChatDesc: "You can ask tax-related questions\n24 hours a day",
    taxNearby: "Tax Office Nearby",
    taxNearbyDesc: "Find tax offices near you\nusing our location-based\nsearch function",

    // News Ticker
    recommended: "Recommended",
    ticker1: "📢 Chat support available 24/7",
    ticker2: "🎓 Calculate 5 types of taxes",
    ticker3: "📋 Print documents for data entry",

    // OTOP Products
    otopProducts: "OTOP Community Products",
    otopDesc: "Quality products from local wisdom, generating income for communities",
    producedBy: "Produced by",
    reviews: "reviews",
    orderProduct: "Order Product",
    addToCart: "Add to Cart",
    viewAllProducts: "View All Products",
    hot: "HOT",
    preOrder: "Pre-order",
    new: "New",

    // Product Categories
    category: {
      utilities: "Utilities",
      fashion: "Fashion",
      decoration: "Decoration"
    },

    // Products
    products: {
      thermos: "Thermos Cup",
      shirt: "T-Shirt",
      keychain: "Keychain",
      pencilCase: "Pencil Case"
    },

    // News Section
    operationalNews: "Tax News",
    readMore: "Read More",
    viewAllPhotos: "View All Photos",

    // Footer
    companyInfo: {
      name: "Smart Tax Inside",
      phone: "01-123-4567",
      email: "STI@smarttaxinside.go.th"
    },
    workingHours: "Working Hours",
    workingDays: "Monday-Saturday",
    workingTime: "8:30 AM - 4:30 PM",
    closedDay: "Closed on Sunday",
    relatedLinks: "Related Links",
    aboutCompany: "About Smart Tax Inside",
    procurement: "Procurement",
    relatedWebsites: "Related Websites",
    college: "Asia Lopburi Technology College",
    revenue: "Revenue Department",
    accounting: "Accounting Office",
    copyright: "© 2024 Smart Tax Side. All rights reserved."
  }
};

// Update product handling
function getProductTranslation(product: any, language: 'th' | 'en', key: keyof ProductTranslations) {
  return translations[language].products[key];
}

function getCategoryTranslation(category: keyof CategoryTranslations, language: 'th' | 'en') {
  return translations[language].category[category];
}

// Update award translation function to handle only string values
function getAwardTranslation(award: string, language: 'th' | 'en'): string {
  const stringOnlyKeys: (keyof TranslationType)[] = ['hot', 'new', 'preOrder'];
  const awardKey = award.toLowerCase() as typeof stringOnlyKeys[number];
  
  if (stringOnlyKeys.includes(awardKey)) {
    return translations[language][awardKey] as string;
  }
  return award;
}

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showElements, setShowElements] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const slides: Slide[] = [
    {
      image: {
        desktop: "./img/public1/sti1.png",
        mobile: "./img/public1/sti1.png"
      },
     
    },
    {
      image: {
        desktop: "/src/img/public1/sti2.png",
        mobile: "/src/img/public1/sti2.png"
      },
      
    },
    {
      image: {
        desktop: "/src/img/public1/v2.png",
        mobile: "/src/img/v2.jpg"
      },
     
    },
    {
      image: {
        desktop: "/src/img/public1/1.jpg",
        mobile: "/src/img/public1/1.jpg"
      },
    
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(0); // Always go back to first image
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger animations after a short delay for initial load
    setTimeout(() => {
      setShowElements(true);
    }, 300);

    // Auto-slide every 5 seconds
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(slideInterval);
    };
  }, [nextSlide]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getImageForDevice = (imageObj: ImageObject) => {
    return windowWidth < 768 ? imageObj.mobile : imageObj.desktop;
  };

  const operationalNews = [
    {
      title: "ประชุมประชาคมพัฒนาชุมชนประจำปี 2568",
      description: "นายกสมชาย ใจดี นำทีมผู้บริหารและเจ้าหน้าที่ลงพื้นที่รับฟังความคิดเห็นและความต้องการของประชาชน เพื่อจัดทำแผนพัฒนาท้องถิ่นที่ตรงความต้องการของชุมชน",
      date: "7 มีนาคม 2568",
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
      location: "ห้องประชุม อบต.สุขสันต์หรรษา"
    },
    {
      title: "ประชุมคณะผู้บริหารประจำเดือนมีนาคม",
      description: "การประชุมหารือแนวทางการพัฒนาท้องถิ่นและติดตามความคืบหน้าโครงการสำคัญ พร้อมวางแผนการดำเนินงานในไตรมาสถัดไป",
      date: "5 มีนาคม 2568",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=800&q=80",
      location: "ห้องประชุมใหญ่"
    },
    {
      title: "โครงการอนุรักษ์สิ่งแวดล้อมชุมชน",
      description: "กิจกรรมปลูกต้นไม้และทำความสะอาดพื้นที่สาธารณะ โดยได้รับความร่วมมือจากประชาชนในพื้นที่กว่า 200 คน",
      date: "3 มีนาคม 2568",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      location: "สวนสาธารณะชุมชน"
    },
    {
      title: "มอบทุนการศึกษาแก่เยาวชนในชุมชน",
      description: "พิธีมอบทุนการศึกษาประจำปี 2568 แก่นักเรียนที่มีผลการเรียนดีแต่ขาดแคลนทุนทรัพย์ จำนวน 50 ทุน",
      date: "1 มีนาคม 2568",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      location: "หอประชุม อบต."
    },
    {
      title: "ตรวจเยี่ยมโครงการก่อสร้างถนน",
      description: "คณะผู้บริหารลงพื้นที่ตรวจความคืบหน้าโครงการก่อสร้างถนนคอนกรีตเสริมเหล็ก เพื่อให้การดำเนินงานเป็นไปตามมาตรฐาน",
      date: "28 กุมภาพันธ์ 2568",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      location: "หมู่ 3 ตำบลสุขสันต์หรรษา"
    },
    {
      title: "ประชุมคณะกรรมการชมรมผู้สูงอายุ",
      description: "การประชุมวางแผนกิจกรรมและโครงการสำหรับผู้สูงอายุในชุมชน พร้อมรับฟังข้อเสนอแนะเพื่อพัฒนาคุณภาพชีวิต",
      date: "25 กุมภาพันธ์ 2568",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      location: "ศูนย์พัฒนาคุณภาพชีวิตผู้สูงอายุ"
    }
  ];

  const localProducts = [
    {
      name: "เสื้อ",
      category: "ของใช้",
      price: "219",
      rating: 4.8,
      reviews: 1,
      image: "/img/public1/IMG_0662.png",
      producer: "",
      awards: ["HOT", "New"],
      colors: ["สีดำ", "สีขาว", "สีน้ำเงิน"]
    },
    {
      name: "แก้วเก็บความเย็น",
      category: "เสื้อผ้าแฟชั่น",
      price: "179",
      rating: 4.9,
      reviews: 1,
      image: "https://drive.google.com/uc?export=view&id=1egY9STiZWK5fMjymLO8s97bKjsc9qoYe",
      producer: "",
      awards: ["HOT", "Pre-order"],
      colors: ["สีดำ", "สีขาว", "สีน้ำเงิน", "สีเงิน"]
    },
    {
      name: "พวงกุญแจ",
      category: "ตกแต่ง",
      price: "69",
      rating: 4.7,
      reviews: 1,
      image: "https://drive.google.com/uc?export=view&id=1egY9STiZWK5fMjymLO8s97bKjsc9qoYe",
      producer: "",
      awards: ["HOT"]
    },
    {
      name: "กระเป๋าดินสอ",
      category: "ของใช้",
      price: "89",
      rating: 4.0,
      reviews: 1,
      image: "https://drive.google.com/uc?export=view&id=1egY9STiZWK5fMjymLO8s97bKjsc9qoYe",
      producer: "",
      awards: ["HOT"]
    }
  ];

  const handleOrderClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleCartClick = (product: Product) => {
    setSelectedProduct(product);
    setIsCartModalOpen(true);
  };

  const handleAddToCart = (productType: string) => {
    if (selectedProduct) {
      setCart([...cart, { ...selectedProduct, type: productType }]);
      alert('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว');
    }
  };

  // Update the navigation items with translations
  const navItems = [
    { to: "/", icon: <Home size={24} />, text: "home", group: "main" },
    { to: "/tax-knowledge", icon: <BookOpen size={24} />, text: "knowledge", group: "info" },
    { to: "/tax-news", icon: <Newspaper size={24} />, text: "news", group: "info" },
    { to: "/tax-forms", icon: <FileText size={24} />, text: "forms", group: "info" },
    { to: "/contact", icon: <Phone size={24} />, text: "contact", group: "support" },
    { to: "/about", icon: <Info size={24} />, text: "about", group: "support" }
  ] as const;

  // Update the services section with translations
  const services = [
    {
      to: "/welfare",
      icon: "/img/icons/m1.png",
      title: translations[language].taxCalculator,
      alt: translations[language].taxCalculator,
      description: translations[language].taxCalculatorDesc
    },
    {
      to: "/chat",
      icon: "/img/icons/m2.png",
      title: translations[language].taxChat,
      alt: translations[language].taxChat,
      description: translations[language].taxChatDesc
    },
    {
      to: "/nearby",
      icon: "/img/icons/m3.png",
      title: translations[language].taxNearby,
      alt: translations[language].taxNearby,
      description: translations[language].taxNearbyDesc
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 font-itim ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/95 backdrop-blur-sm border-b border-gray-700' 
            : 'bg-gradient-to-b from-customNavBlue to-customNavBlueDark'
        } text-white shadow-lg z-50`}
      >
        <div className="container mx-auto px-4">
              {/* Mobile Menu Button and Logo */}
              <div className="md:hidden flex items-center justify-between py-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={logo} 
                    alt="Smart Tax Inside" 
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white tracking-wide font-itim">Smart Tax Inside</span>
                    <span className="text-sm text-white/90 font-light tracking-wider font-itim">ระบบคำนวณภาษีอัจฉริยะ</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <SettingsMenu />
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white focus:outline-none group relative w-10 h-10 flex items-center justify-center"
                    aria-label="Toggle menu"
                  >
                    <div className="relative w-6 h-5">
                      <span className={`absolute w-full h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : '-translate-y-2'}`}></span>
                      <span className={`absolute w-full h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                      <span className={`absolute w-full h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-2'}`}></span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              <div 
                className={`md:hidden fixed inset-x-0 top-[76px] z-40 transition-all duration-300 ease-in-out transform ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}
              >
                <div className="bg-gradient-to-b from-customNavBlue/95 to-customNavBlueDark/95 backdrop-blur-lg rounded-b-lg shadow-lg max-h-[calc(100vh-76px)] overflow-y-auto">
                  <ul className="py-2 px-2 grid grid-cols-3 gap-2">
                    {navItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.to}
                          className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 relative overflow-hidden group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-white/90 transition-transform duration-300 group-hover:scale-110 group-hover:text-red-500 mb-1">
                            {item.icon}
                          </span>
                          <span className="font-bold text-sm tracking-wide text-white/90 text-center whitespace-nowrap group-hover:text-red-500 transition-all duration-300">
                            {translations[language][item.text]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:block">
                <div className="flex items-center justify-between py-2">
                  {/* Logo and Title */}
                  <div className="flex items-center space-x-6">
                    <img 
                      src={logo} 
                      alt="Smart Tax Inside" 
                      className="w-14 h-14 object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-white tracking-wide bg-gradient-to-r from-white to-white/80 bg-clip-text font-itim">
                        Smart Tax Inside
                      </span>
                      <span className="text-sm text-white/80 font-light tracking-wider font-itim">
                        ระบบคำนวณภาษีอัจฉริยะ
                      </span>
                    </div>
                  </div>

                  {/* Menu and Settings */}
                  <div className="flex items-center">
                    {/* Menu Groups */}
                    <nav className="flex items-center mr-4">
                      {/* Main Group */}
                      <div className="flex items-center px-2">
                        <Link
                          to="/"
                          className="relative px-4 py-2 rounded-lg transition-all duration-300 group"
                        >
                          <span className="text-base font-bold text-white/90 group-hover:text-red-500 transition-all duration-300">
                            {translations[language].home}
                          </span>
                        </Link>
                      </div>

                      <div className="h-8 w-px bg-white/20 mx-2" />

                      {/* Information Group */}
                      <div className="flex items-center space-x-1 px-2">
                        <Link
                          to="/tax-knowledge"
                          className="relative px-4 py-2 rounded-lg transition-all duration-300 group"
                        >
                          <span className="text-base font-bold text-white/90 group-hover:text-red-500 transition-all duration-300">
                            {translations[language].knowledge}
                          </span>
                        </Link>
                        <Link
                          to="/tax-news"
                          className="relative px-4 py-2 rounded-lg transition-all duration-300 group"
                        >
                          <span className="text-base font-bold text-white/90 group-hover:text-red-500 transition-all duration-300">
                            {translations[language].news}
                          </span>
                        </Link>
                        <Link
                          to="/tax-forms"
                          className="relative px-4 py-2 rounded-lg transition-all duration-300 group"
                        >
                          <span className="text-base font-bold text-white/90 group-hover:text-red-500 transition-all duration-300">
                            {translations[language].forms}
                          </span>
                        </Link>
                      </div>

                      <div className="h-8 w-px bg-white/20 mx-2" />

                      {/* Support Group */}
                      <div className="flex items-center space-x-1 px-2">
                        <Link
                          to="/contact"
                          className="relative px-4 py-2 rounded-lg transition-all duration-300 group"
                        >
                          <span className="text-base font-bold text-white/90 group-hover:text-red-500 transition-all duration-300">
                            {translations[language].contact}
                          </span>
                        </Link>
                        <Link
                          to="/about"
                          className="relative px-4 py-2 rounded-lg transition-all duration-300 group"
                        >
                          <span className="text-base font-bold text-white/90 group-hover:text-red-500 transition-all duration-300">
                            {translations[language].about}
                          </span>
                        </Link>
                      </div>
                    </nav>

                    {/* Settings Menu */}
                    <SettingsMenu />
                  </div>
                </div>
          </div>
        </div>
      </nav>

          {/* Spacer to prevent content from going under fixed nav */}
          <div className="h-[76px] md:h-[80px]"></div>

{/* Hero Section with Image Slider */}
          <div className="relative w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
                className={`transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
            }`}
          >
            <img
              src={getImageForDevice(slide.image)}
              alt={slide.title}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-black/50 to-transparent">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg text-white/90 max-w-xl md:max-w-2xl drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                </div>
          </div>
        ))}
        
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-2 md:px-4 z-10">
          <button 
            type="button"
            onClick={prevSlide}
                className="p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
          >
                <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
          </button>
          <button 
            type="button"
            onClick={nextSlide}
                className="p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
          >
                <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
          </button>
        </div>
        
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-300 ${
                    currentSlide === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
                  aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* News Ticker */}
      <div className={`py-2 overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-primary-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <span className={`px-4 py-1 rounded-full text-sm font-semibold mr-4 ${
              isDarkMode ? 'bg-blue-600 text-white' : 'bg-primary-600 text-white'
            }`}>
              {translations[language].recommended}
            </span>
            <div className="overflow-hidden flex-1">
              <div className={`whitespace-nowrap animate-ticker ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="inline-block px-4">
                  {translations[language].ticker1}
                </span>
                <span className="inline-block px-4">
                  {translations[language].ticker2}
                </span>
                <span className="inline-block px-4">
                  {translations[language].ticker3}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className={`transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 shadow-lg shadow-gray-900/50' 
          : 'bg-white shadow-md'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/tax-payment">
              <QuickLink
                icon={<FileText className="w-6 h-6" />}
                title={translations[language].taxPayment}
                description={translations[language].taxPaymentDesc}
              />
            </Link>
            <Link to="/complaint">
              <QuickLink
                icon={<Users2 className="w-6 h-6" />}
                title={translations[language].complaint}
                description={translations[language].complaintDesc}
              />
            </Link>
            <Link to="">
              <QuickLink
                icon={<HandHeart className="w-6 h-6" />}
                title={translations[language].welfare}
                description={translations[language].welfareDesc}
              />
            </Link>
            <Link to="/contact">
              <QuickLink
                icon={<MessageCircle className="w-6 h-6" />}
                title={translations[language].contactUs}
                description={translations[language].contactDesc}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className={`container mx-auto px-4 py-16 transition-all duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        <h2 className="text-3xl font-bold text-center mb-12">
          {translations[language].services}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.to} className="block group">
              <div className={`h-[450px] rounded-lg p-8 text-center transition-all duration-300 flex flex-col ${
                isDarkMode
                  ? 'bg-gray-800 shadow-lg shadow-gray-900/50 group-hover:shadow-gray-900/70'
                  : 'bg-white shadow-lg group-hover:shadow-xl'
              }`}>
                <div className="flex-shrink-0 flex justify-center items-center h-64 mb-6">
                  <img
                    src={service.icon}
                    alt={service.alt}
                    className="w-56 h-56 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } leading-relaxed flex-grow`}>
                  {service.description}
                </p>
              </div>
          </Link>
          ))}
        </div>
      </div>

     {/* OTOP Products Section */}
      <div className={`py-16 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800'
          : 'bg-gradient-to-b from-white to-primary-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            } ${showElements ? 'animate-tiktok-reveal' : 'opacity-0'}`}
              style={{ animationDelay: '200ms' }}
            >
              {translations[language].otopProducts}
            </h2>
            <p className={`max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } ${showElements ? 'animate-tiktok-reveal' : 'opacity-0'}`}
              style={{ animationDelay: '400ms' }}
            >
              {translations[language].otopDesc}
            </p>
          </div>

          {/* Product Type Selection */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setSelectedProductType('เสื้อ')}
              onDoubleClick={() => setSelectedProductType(null)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedProductType === 'เสื้อ'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-primary-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              เสื้อ
            </button>
            <button
              onClick={() => setSelectedProductType('แก้วเก็บความเย็น')}
              onDoubleClick={() => setSelectedProductType(null)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedProductType === 'แก้วเก็บความเย็น'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-primary-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              แก้วเก็บความเย็น
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localProducts
              .filter(product => !selectedProductType || product.name === selectedProductType)
              .map((product, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800 shadow-lg shadow-gray-900/50 hover:shadow-gray-900/70'
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}
                style={{ animationDelay: `${600 + (index * 200)}ms` }}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={getProductTranslation(product, language, product.name as keyof ProductTranslations)} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg font-itim">
                      {getAwardTranslation(product.awards[0], language)}
                    </div>
                  </div>
                </div>
                <div className={`p-6 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  <div className={`text-sm font-medium mb-2 font-itim ${
                    isDarkMode ? 'text-blue-400' : 'text-primary-600'
                  }`}>
                    {getCategoryTranslation(product.category as keyof CategoryTranslations, language)}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 font-itim ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm mb-4 font-itim ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {translations[language].producedBy}: {product.producer}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className={`ml-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {product.rating} ({product.reviews} {translations[language].reviews})
                      </span>
                    </div>
                    <span className={`text-xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-primary-600'
                    }`}>
                      ฿{product.price}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderClick(product)}
                      className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {translations[language].orderProduct}
                    </button>
                    <button
                      onClick={() => handleCartClick(product)}
                      className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {translations[language].addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className={`inline-flex items-center px-6 py-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white' 
                : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
            }`}>
              {translations[language].viewAllProducts}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Operational News Section */}
      <div className={`py-16 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800 text-gray-100'
          : 'bg-white text-gray-900'
      }`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {translations[language].operationalNews}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {operationalNews.map((news, index) => (
              <div key={index} className={`rounded-xl overflow-hidden transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 shadow-lg shadow-gray-900/50 hover:shadow-gray-900/70'
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}>
                <div className="relative">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center text-white text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {news.date}
                    </div>
                  </div>
                </div>
                <div className={`p-6 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="font-itim">{news.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Camera className="w-4 h-4 mr-2" />
                      <span className="font-itim">{translations[language].viewAllPhotos}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm font-itim">
                      {translations[language].readMore} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-900 text-gray-100 border-t border-gray-800'
          : 'bg-blue-900 text-white'
      }`}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-100'}>
              <h3 className="text-xl font-semibold mb-4 font-itim">
                {translations[language].companyInfo.name}
              </h3>
              <div className="space-y-2 font-itim">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> {translations[language].companyInfo.phone}
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> {translations[language].companyInfo.email}
                </p>
              </div>
            </div>
            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-100'}>
              <h3 className="text-xl font-semibold mb-4 font-itim">
                {translations[language].workingHours}
              </h3>
              <h3 className="text-xl font-semibold mb-4 font-itim">{translations[language].workingDays}</h3>
              <div className="space-y-2 font-itim">
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> {translations[language].workingTime}
                </p>
                <p className="ml-6 font-itim">{translations[language].closedDay}</p>
              </div>
            </div>
            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-100'}>
              <h3 className="text-xl font-semibold mb-4 font-itim">{translations[language].relatedLinks}</h3>
              <ul className="space-y-2 font-itim">
                <li>
                  <Link to="/about" className="hover:text-blue-200">
                    {translations[language].aboutCompany}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-200">
                    {translations[language].services}
                  </Link>
                </li>
                <li>
                  <Link to="/procurement" className="hover:text-blue-200">
                    {translations[language].procurement}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-200">
                    {translations[language].contactUs}
                  </Link>
                </li>
              </ul>
            </div>
            <div className={isDarkMode ? 'text-gray-300' : 'text-gray-100'}>
              <h3 className="text-xl font-semibold mb-4 font-itim">{translations[language].relatedWebsites}</h3>
              <ul className="space-y-2 font-itim">
                <li>
                  <a
                    href="https://www.dla.go.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200"
                  >
                    {translations[language].college}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.moi.go.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200"
                  >
                    {translations[language].revenue}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.thaigov.go.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200"
                  >
                    {translations[language].accounting}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t ${
            isDarkMode ? 'border-gray-800' : 'border-blue-800'
          } text-center`}>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-300'}>
              {translations[language].copyright}
            </p>
          </div>
        </div>
      </footer>

{/* Cart Modal */}
{selectedProduct && (
        <CartModal
          isOpen={isCartModalOpen}
          onClose={() => {
            setIsCartModalOpen(false);
            setSelectedProduct(null);
            setSelectedColor(null);
          }}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
        />
      )}
      {/* Order Modal */}
      {selectedProduct && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => {
            setIsOrderModalOpen(false);
            setSelectedProduct(null);
            setSelectedColor(null);
          }}
          product={selectedProduct}
          selectedColor={selectedColor}
          onColorSelect={(color) => setSelectedColor(color)}
        />
      )}
    </div>
  );
}

function NavItem({ icon, text, to }: NavItemProps) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center space-x-2 px-4 py-3 hover:bg-blue-700"
      >
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  );
}

function QuickLink({ icon, title, description }: QuickLinkProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
      isDarkMode 
        ? 'hover:bg-gray-700 text-gray-100' 
        : 'hover:bg-gray-50 text-gray-900'
    }`}>
      <div className={isDarkMode ? 'text-gray-100' : 'text-blue-900'}>{icon}</div>
      <div>
        <h3 className={`font-semibold font-itim ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-sm font-itim ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`rounded-lg p-8 text-center transition-all duration-300 ${
      isDarkMode
        ? 'bg-gray-800 shadow-lg shadow-gray-900/50 hover:shadow-gray-900/70'
        : 'bg-white shadow-lg hover:shadow-xl'
    }`}>
      <div className="flex justify-center mb-6 flex-shrink-0">
        <img
          src={icon}
          alt={title}
          className="w-45 h-45 md:w-50 md:h-50 object-contain"
        />
      </div>
      <h3 className={`text-2xl font-bold mb-4 font-itim ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed flex-grow font-itim ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
  );
}

export { HomePage };
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HomePage />
      </LanguageProvider>
    </ThemeProvider>
  );
}

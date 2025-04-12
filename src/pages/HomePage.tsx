import React, { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import OrderModal from "../components/OrderModal";
import CartModal from "../components/CartModal";
import logo from "../img/public1/IMG_0662.png";



interface Product {
  name: string;
  price: string;
  image: string;
  producer: string;
  category: string;
  rating: number;
  reviews: number;
  awards: string[];
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

  const slides = [
    {
      image: {
        desktop: "/src/img/logo.png",
        mobile: "/src/img/moblie.jpg"
      },
      title: "ยินดีต้อนรับสู่ อบต.สุขสันต์หรรษา",
      subtitle: "บริการประชาชนด้วยใจ พัฒนาท้องถิ่นอย่างยั่งยืน"
    },
    {
      image: {
        desktop: "/src/img/public1/IMG_0662.png",
        mobile: "/src/img/logo.png"
      },
      title: "พัฒนาชุมชนอย่างยั่งยืน",
      subtitle: "สร้างสังคมที่น่าอยู่ เพื่อคุณภาพชีวิตที่ดีขึ้น"
    },
    {
      image: {
        desktop: "/src/img/logo.png",
        mobile: "/src/img/moblie.jpg"
      },
      title: "อนุรักษ์วัฒนธรรมท้องถิ่น",
      subtitle: "สืบสานประเพณีไทย ร่วมสร้างอนาคตที่มั่นคง"
    },
    {
      image: {
        desktop: "/src/img/logo.png",
        mobile: "/src/img/moblie.jpg"
      },
      title: "อนุรักษ์วัฒนธรรมท้องถิ่น",
      subtitle: "สืบสานประเพณีไทย ร่วมสร้างอนาคตที่มั่นคง"
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

  const getImageForDevice = (imageObj) => {
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
      name: "แก้วเก็บความเย็น",
      category: "ของใช้",
      price: "219",
      rating: 4.8,
      reviews: 1,
      image: "src/img/public1/IMG_0662.png",
      producer: "",
      awards: ["HOT", "New"]
    },
    {
      name: "เสื้อ",
      category: "เสื้อผ้าแฟชั่น",
      price: "179",
      rating: 4.9,
      reviews: 1,
      image: "https://drive.google.com/uc?export=view&id=1egY9STiZWK5fMjymLO8s97bKjsc9qoYe",
      producer: "",
      awards: ["HOT", "Pre-order"]
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

  return (
    
    <div className="min-h-screen bg-gray-50">
        

      {/* Navigation */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
         
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="md:flex md:space-x-1flex items-center justify-between">
            <img src={logo}
          className="w-16 h-16 object-contain flex items-center space-x-3" />
              <NavItem to="/" icon={<Home size={18} />} text="หน้าหลัก" />
              <NavItem
                to="/about"
                icon={<Info size={18} />}
                text="เกี่ยวกับเรา"
              />
              <NavItem
                to="/services"
                icon={<FileText size={18} />}
                text="เกมตอบคำถาม"
              />
                 <NavItem
                to="/dashboard"
                icon={<LayoutDashboard size={18} />}
                text="สรุปผลการดำเนินงาน"
              />
              
              <NavItem
                to="/news"
                icon={<Newspaper size={18} />}
                text="ความรู้เกี่ยวกับภาษี"
              />
              <NavItem
                to="/community"
                icon={<HandHeart size={18} />}
                text="พัฒนาชุมชน"
              />
              <NavItem
                to="/contact"
                icon={<MessageCircle size={18} />}
                text="ติดต่อเรา"
              />
              <NavItem
                to="/staff"
                icon={<UserCircle size={18} />}
                text="ผู้จัดทำ"
              />
                 <NavItem
                to="/documents"
                icon={<Newspaper size={18} />}
                text="ดาวโหลดเอกสาร"
              />
           
            </ul>
          </div>
        </div>
      </nav>

{/* Hero Section with Image Slider */}
<div className="relative h-[500px] sm:h-[600px] md:h-[720px] lg:h-[900px] xl:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={getImageForDevice(slide.image)}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
        
        {/* Slider Navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button 
            type="button"
            onClick={prevSlide}
            className="p-4 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            type="button"
            onClick={nextSlide}
            className="p-4 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        
        {/* Slide Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4">
            <h2 className="text-5xl font-bold mb-4 text-shadow-lg">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xl text-shadow">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="bg-primary-50 py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold mr-4">
              แนะนำ
            </span>
            <div className="overflow-hidden flex-1">
              <div className="whitespace-nowrap animate-ticker">
                <span className="inline-block px-4">
                  📢 ถามตอบแชทได้ 24 ชั่วโมง
                </span>
                <span className="inline-block px-4">
                  🎓 คำนวนภาษี 5 ประเภท
                </span>
                <span className="inline-block px-4">
                  📋 ปริ้นเอสารออกมากรอกข้อมูล
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/tax-payment">
              <QuickLink
                icon={<FileText className="w-6 h-6" />}
                title="ชำระภาษี"
                description="ชำระภาษีออนไลน์"
              />
            </Link>
            <Link to="/complaint">
              <QuickLink
                icon={<Users2 className="w-6 h-6" />}
                title="ร้องเรียน"
                description="แจ้งเรื่องร้องเรียน"
              />
            </Link>
            <Link to="">
              <QuickLink
                icon={<HandHeart className="w-6 h-6" />}
                title="สวัสดิการ"
                description="ลงทะเบียนสวัสดิการ"
              />
            </Link>
            <Link to="/contact">
              <QuickLink
                icon={<MessageCircle className="w-6 h-6" />}
                title="ติดต่อ"
                description="ติดต่อเจ้าหน้าที่"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">บริการของเรา</h2>
        <div className="grid md:grid-cols-3 gap-8">
        <Link to="/welfare">
        <ServiceCard
  icon={
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtcGVuLWljb24gbHVjaWRlLWZpbGUtcGVuIj48cGF0aCBkPSJNMTIuNSAyMkgxOGEyIDIgMCAwIDAgMi0yVjdsLTUtNUg2YTIgMiAwIDAgMC0yIDJ2OS41Ii8+PHBhdGggZD0iTTE0IDJ2NGEyIDIgMCAwIDAgMiAyaDQiLz48cGF0aCBkPSJNMTMuMzc4IDE1LjYyNmExIDEgMCAxIDAtMy4wMDQtMy4wMDRsLTUuMDEgNS4wMTJhMiAyIDAgMCAwLS41MDYuODU0bC0uODM3IDIuODdhLjUuNSAwIDAgMCAuNjIuNjJsMi44Ny0uODM3YTIgMiAwIDAgMCAuODU0LS41MDZ6Ii8+PC9zdmc+"
      alt="คำนวนภาษี"
      className="w-8 h-8"
    />
  }
  title="คำนวนภาษี"
  description="คำนวนภาษี 6 ประเภท"
/>
          </Link>
          <ServiceCard
  icon={
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1lc3NhZ2VzLXNxdWFyZS1pY29uIGx1Y2lkZS1tZXNzYWdlcy1zcXVhcmUiPjxwYXRoIGQ9Ik0xNCA5YTIgMiAwIDAgMS0yIDJINmwtNCA0VjRhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ6Ii8+PHBhdGggZD0iTTE4IDloMmEyIDIgMCAwIDEgMiAydjExbC00LTRoLTZhMiAyIDAgMCAxLTItMnYtMSIvPjwvc3ZnPg=="
      alt="แชทตอบคำถาม"
      className="w-8 h-8"
    />
  }
  title="แชทตอบคำถาม"
  description="แชทให้คำตอบเกี่ยวกับภาษี 24 ชั่วโมง"
/>
          <ServiceCard
  icon={
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW5uZWQtaWNvbiBsdWNpZGUtbWFwLXBpbm5lZCI+PHBhdGggZD0iTTE4IDhjMCAzLjYxMy0zLjg2OSA3LjQyOS01LjM5MyA4Ljc5NWExIDEgMCAwIDEtMS4yMTQgMEM5Ljg3IDE1LjQyOSA2IDExLjYxMyA2IDhhNiA2IDAgMCAxIDEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjIiLz48cGF0aCBkPSJNOC43MTQgMTRoLTMuNzFhMSAxIDAgMCAwLS45NDguNjgzbC0yLjAwNCA2QTEgMSAwIDAgMCAzIDIyaDE4YTEgMSAwIDAgMCAuOTQ4LTEuMzE2bC0yLTZhMSAxIDAgMCAwLS45NDktLjY4NGgtMy43MTIiLz48L3N2Zz4="
      alt="สรรพากรใกล้ฉัน"
      className="w-8 h-8"
    />
  }
  title="สรรพากรใกล้ฉัน"
  description="ค้นหาสรรพากรใกล้คุณ เพื่อง่ายต่อการค้นหา"
/>
        </div>
      </div>

     {/* OTOP Products Section */}
      <div className="bg-gradient-to-b from-white to-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className={`text-3xl font-bold text-gray-900 mb-4 ${showElements ? 'animate-tiktok-reveal' : 'opacity-0'}`}
              style={{ animationDelay: '200ms' }}
            >
              ผลิตภัณฑ์ชุมชน OTOP
            </h2>
            <p 
              className={`text-gray-600 max-w-2xl mx-auto ${showElements ? 'animate-tiktok-reveal' : 'opacity-0'}`}
              style={{ animationDelay: '400ms' }}
            >
              ผลิตภัณฑ์คุณภาพจากภูมิปัญญาท้องถิ่น สร้างรายได้สู่ชุมชน
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localProducts.map((product, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${showElements ? 'animate-pop-up' : 'opacity-0'}`}
                style={{ animationDelay: `${600 + (index * 200)}ms` }}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {product.awards[0]}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-medium mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    ผลิตโดย: {product.producer}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">
                        {product.rating} ({product.reviews} รีวิว)
                      </span>
                    </div>
                    <span className="text-xl font-bold text-primary-600">
                      ฿{product.price}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderClick(product)}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      สั่งซื้อสินค้า
                    </button>
                    <button
                      onClick={() => handleCartClick(product)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      ตะกร้า
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
              ดูสินค้าทั้งหมด
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Operational News Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">ข่าวสารเกี่ยวกับถาษี</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {operationalNews.map((news, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
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
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {news.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Camera className="w-4 h-4 mr-2" />
                      <span>ดูภาพทั้งหมด</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      อ่านเพิ่มเติม →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ติดต่อเรา</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" /> Smart Tax Inside
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> 01-123-4567
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> STI@smatltaxinside.go.th
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">เวลาทำการ</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> จันทร์-วันเสาร์
                </p>
                <p className="ml-6">8:30 - 16:30 น.</p>
                <p className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" /> หยุดวันอาทิตย์
                 
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">ลิงก์ที่เกี่ยวข้อง</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-blue-200">
                    เกี่ยวกับ Smart Tax Inside
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-200">
                    ให้ความรู้และความสะดวกกับผู้ใช้งาน
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-200">
                    จัดซื้อจัดจ้าง
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-200">
                    ติดต่อเรา
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">เว็บไซต์ที่เกี่ยวข้อง</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.dla.go.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200"
                  >
                    วิทยาลัยเทคโนโลยีเอเชียลพบุรี
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.moi.go.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200"
                  >
                    กรมสรรพกร
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.thaigov.go.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200"
                  >
                    สำนักงานบัญชี
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center">
            <p>© 2567 Smart Tax Side. สงวนลิขสิทธิ์.</p>
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
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

function NavItem({ icon, text, to }) {
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

function QuickLink({ icon, title, description }) {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="text-blue-900">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="inline-block p-3 bg-blue-100 rounded-full text-blue-900 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default HomePage;
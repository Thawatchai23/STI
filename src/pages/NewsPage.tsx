import React, { useState } from 'react';
import { ArrowLeft, Calendar, Tag, ChevronDown, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'announcement', name: 'ประกาศ' },
    { id: 'event', name: 'กิจกรรม' },
    { id: 'project', name: 'โครงการ' },
    { id: 'procurement', name: 'จัดซื้อจัดจ้าง' },
  ];

  const news = [
    {
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?auto=format&fit=crop&w=800&q=80",
      date: "15 มีนาคม 2567",
      title: "การประชุมประจำเดือนมีนาคม",
      description: "การประชุมสภา อบต. ประจำเดือนมีนาคม 2567 มีการพิจารณาโครงการพัฒนาชุมชนที่สำคัญหลายโครงการ รวมถึงการจัดสรรงบประมาณสำหรับการพัฒนาโครงสร้างพื้นฐาน",
      category: "announcement",
      tags: ["การประชุม", "สภา อบต.", "งบประมาณ"]
    },
    {
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      date: "10 มีนาคม 2567",
      title: "โครงการปลูกต้นไม้เพื่อชุมชน",
      description: "กิจกรรมปลูกต้นไม้เพื่อเพิ่มพื้นที่สีเขียวในชุมชน มีประชาชนเข้าร่วมกว่า 200 คน พร้อมทั้งมีการให้ความรู้เกี่ยวกับการดูแลรักษาต้นไม้",
      category: "event",
      tags: ["สิ่งแวดล้อม", "กิจกรรมชุมชน"]
    },
    {
      image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80",
      date: "5 มีนาคม 2567",
      title: "การฝึกอบรมอาชีพ",
      description: "โครงการฝึกอบรมอาชีพเสริมสำหรับประชาชน เพื่อสร้างรายได้เสริมให้กับครอบครัว มีผู้เข้าร่วมกว่า 50 คน",
      category: "project",
      tags: ["อาชีพ", "พัฒนาทักษะ"]
    },
    {
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=800&q=80",
      date: "1 มีนาคม 2567",
      title: "ประกาศจัดซื้อจัดจ้าง",
      description: "ประกาศเชิญชวนเข้าร่วมการประมูลโครงการปรับปรุงถนนในชุมชน มูลค่าโครงการ 2 ล้านบาท",
      category: "procurement",
      tags: ["จัดซื้อจัดจ้าง", "โครงสร้างพื้นฐาน"]
    }
  ];

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-8">ข่าวสารและประกาศ</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="ค้นหาข่าวสาร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
                <Filter className="w-5 h-5" />
                <span>กรอง</span>
              </button>
            </div>
          </div>
          
          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <NewsCard key={index} {...item} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary-50 text-gray-700">
                ก่อนหน้า
              </button>
              <button className="px-4 py-2 rounded-lg bg-primary-600 text-white">
                1
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary-50 text-gray-700">
                2
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary-50 text-gray-700">
                3
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary-50 text-gray-700">
                ถัดไป
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ image, date, title, description, tags }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary-100">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {date}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-primary-900 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        <button className="text-primary-700 font-semibold hover:text-primary-800 transition-colors inline-flex items-center">
          อ่านเพิ่มเติม
          <ChevronDown className="w-4 h-4 ml-1 transform -rotate-90" />
        </button>
      </div>
    </div>
  );
}
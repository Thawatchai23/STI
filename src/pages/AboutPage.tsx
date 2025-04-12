import React from 'react';
import { ArrowLeft, Users, Target, Award, Building2, ChevronRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const valueColors = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200"
};

function ValueCard({ title, description, color }) {
  return (
    <div className={`p-6 rounded-xl border ${valueColors[color]} transition-all duration-300 hover:shadow-lg`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="opacity-90">{description}</p>
    </div>
  );
}

function ContactInfo({ icon, title, detail }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{detail}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-700 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">เกี่ยวกับเรา</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              กลุ่มโครงงานSmrt Tax Inside
            </p>
          </div>

          {/* History Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">ประวัติความเป็นมา</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  กลุ่มโครงงาน Smart Tax Inside ได้ทำwebsiteนี้ขึ้นมาเพื่อให้ให้ผู้ที่เข้ามาใช้งานและผู้ที่ไม่เข้าใจเรื่องเกี่ยวกับภาษี ได้เข้าใจง่ายเข้าถึงง่าย
                  เพิ่มตอบสนองต่อผู้ที่ยังไไม่เข้าใจเกี่ยวกับเรื่องภษี ได้เข้าจ่ายงง่่ายและสามารถใช้งานได้ง่ายยิ่งขึ้น
                </p>
                <p>
                  ตลอดระยะเวลาที่ผ่านมา websiteSmart Tax Inside เราตั้งใจที่จะพัฒนาในทุกด้าน 
                  ทั้งด้านการให้ความรู้ การศึกษา การตอบคำถาม และการคำนวนที่งานต่อการใช้งานของผู้เข้าใช้website
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?auto=format&fit=crop&w=800&q=80"
                alt="LOGO"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Vision and Mission */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 mr-2" />
                  <h2 className="text-2xl font-semibold">วิสัยทัศน์</h2>
                </div>
                <p className="text-white/90">
                  "รอเอาคำมาใส้"
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 mr-2" />
                  <h2 className="text-2xl font-semibold">พันธกิจ</h2>
                </div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                    รอเอาคำมาใส่
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                    รอเอาคำมาใส่
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                    รอเอาคำมาใส่
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                    รอเอาคำมาใส่
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center text-blue-900 mb-8">ค่านิยมองค์กร</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ValueCard
                title="รอเอาคำมาใส่"
                description=" รอเอาคำมาใส่"
                color="blue"
              />
              <ValueCard
                title="รอเอาคำมาใส่"
                description="รอเอาคำมาใส่"
                color="green"
              />
              <ValueCard
                title="รอเอาคำมาใส่"
                description="รอเอาคำมาใส่"
                color="purple"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">ติดต่อเรา</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ContactInfo
                icon={<Building2 className="w-5 h-5" />}
                title="ที่อยู่"
                detail="5/45 หมู่3 ตำบลป่าตาล  อำเภอเมือง จังหวัดลพบุรี 15000"
              />
              <ContactInfo
                icon={<Phone className="w-5 h-5" />}
                title="โทรศัพท์"
                detail="0-3642-4345"
              />
              <ContactInfo
                icon={<Mail className="w-5 h-5" />}
                title="อีเมล"
                detail="sti@smarttaxinside.go.th"
              />
              <ContactInfo
                icon={<Clock className="w-5 h-5" />}
                title="เวลาทำการ"
                detail="จันทร์ - เสารื 8:30 - 16:30 น."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
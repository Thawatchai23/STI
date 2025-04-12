import React from 'react';
import { ArrowLeft, Users, Baby, Heart, Armchair as Wheelchair, School, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SocialWelfarePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">สวัสดิการสังคม</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <WelfareCard
              icon={<Users />}
              title="เบี้ยยังชีพผู้สูงอายุ"
              description="การดูแลและสวัสดิการสำหรับผู้สูงอายุในชุมชน"
              status="เปิดลงทะเบียน"
            />
            <WelfareCard
              icon={<Wheelchair />}
              title="การดูแลผู้พิการ"
              description="บริการและสิ่งอำนวยความสะดวกสำหรับผู้พิการ"
              status="เปิดลงทะเบียน"
            />
            <WelfareCard
              icon={<Baby />}
              title="สวัสดิการเด็กและเยาวชน"
              description="การดูแลและพัฒนาเด็กและเยาวชนในชุมชน"
              status="เปิดลงทะเบียน"
            />
            <WelfareCard
              icon={<Heart />}
              title="การดูแลสุขภาพชุมชน"
              description="บริการด้านสุขภาพและการป้องกันโรค"
              status="ให้บริการต่อเนื่อง"
            />
            <WelfareCard
              icon={<School />}
              title="การศึกษาและพัฒนาอาชีพ"
              description="โครงการพัฒนาทักษะและการศึกษาต่อเนื่อง"
              status="เปิดรับสมัคร"
            />
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">ศูนย์บริการสวัสดิการสังคม</h3>
                <p className="text-gray-600 mb-4">
                  ให้คำปรึกษาและช่วยเหลือด้านสวัสดิการสังคมแก่ประชาชนในพื้นที่
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">ติดต่อ:</p>
                    <p>โทร: 02-123-4567 ต่อ 5678</p>
                    <p>อีเมล: welfare@bangrak.go.th</p>
                  </div>
                  <div>
                    <p className="font-semibold">เวลาทำการ:</p>
                    <p>จันทร์-ศุกร์ 8:30-16:30 น.</p>
                    <p>หยุดวันเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WelfareCard({ icon, title, description, status }) {
  return (
    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
      <div className="text-blue-900 mb-4">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {status}
        </span>
        <button className="text-blue-900 font-semibold hover:text-blue-700">
          ดูรายละเอียด →
        </button>
      </div>
    </div>
  );
}
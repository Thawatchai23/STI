import React from 'react';
import { ArrowLeft, TreePine, Trash2, Wind, Droplets, FileText, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnvironmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">สิ่งแวดล้อม</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ServiceCard
              icon={<Trash2 />}
              title="การจัดการขยะ"
              description="ตารางเก็บขยะและการคัดแยกขยะในชุมชน"
            />
            <ServiceCard
              icon={<Wind />}
              title="คุณภาพอากาศ"
              description="การตรวจวัดและรายงานคุณภาพอากาศในพื้นที่"
            />
            <ServiceCard
              icon={<Droplets />}
              title="การจัดการน้ำ"
              description="การบำบัดน้ำเสียและคุณภาพน้ำในชุมชน"
            />
            <ServiceCard
              icon={<TreePine />}
              title="พื้นที่สีเขียว"
              description="การดูแลและเพิ่มพื้นที่สีเขียวในชุมชน"
            />
            <ServiceCard
              icon={<FileText />}
              title="แจ้งปัญหาสิ่งแวดล้อม"
              description="แจ้งปัญหาขยะ มลภาวะ และสิ่งแวดล้อมในชุมชน"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">ตารางเก็บขยะในชุมชน</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">ขยะทั่วไป</h3>
                  <p className="text-gray-600">จันทร์, พุธ, ศุกร์ เวลา 06:00-08:00 น.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">ขยะรีไซเคิล</h3>
                  <p className="text-gray-600">วันเสาร์ที่ 1 และ 3 ของเดือน เวลา 09:00-12:00 น.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">แจ้งปัญหาสิ่งแวดล้อม</h3>
                  <p className="text-gray-600 mb-4">
                    หากพบปัญหาด้านสิ่งแวดล้อมในชุมชน สามารถแจ้งได้ที่
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">ติดต่อ:</p>
                      <p>โทร: 02-123-4567 ต่อ 3456</p>
                      <p>อีเมล: environment@bangrak.go.th</p>
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
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
      <div className="text-blue-900 mb-4">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-900 font-semibold hover:text-blue-700">
        ดูรายละเอียด →
      </button>
    </div>
  );
}
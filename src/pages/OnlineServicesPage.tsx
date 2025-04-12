import React from 'react';
import { ArrowLeft, FileText, CreditCard, Users2, Building2, Landmark, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OnlineServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">บริการออนไลน์</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<FileText />}
              title="ยื่นคำร้องออนไลน์"
              description="ยื่นคำร้องต่างๆ ผ่านระบบออนไลน์"
              link="/complaint"
            />
            <ServiceCard
              icon={<CreditCard />}
              title="ชำระภาษี"
              description="ชำระภาษีที่ดินและสิ่งปลูกสร้าง ภาษีป้าย"
              link="/tax-payment"
            />
            <ServiceCard
              icon={<Users2 />}
              title="ลงทะเบียนสวัสดิการ"
              description="ลงทะเบียนเบี้ยยังชีพและสวัสดิการต่างๆ"
              link="/welfare"
            />
            <ServiceCard
              icon={<Building2 />}
              title="ขออนุญาตก่อสร้าง"
              description="ยื่นขออนุญาตก่อสร้าง ดัดแปลง รื้อถอนอาคาร"
              link="#"
            />
            <ServiceCard
              icon={<Landmark />}
              title="จดทะเบียนพาณิชย์"
              description="บริการจดทะเบียนพาณิชย์สำหรับผู้ประกอบการ"
              link="#"
            />
            <ServiceCard
              icon={<TreePine />}
              title="แจ้งเรื่องสิ่งแวดล้อม"
              description="แจ้งปัญหาขยะ มลภาวะ และสิ่งแวดล้อม"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description, link }) {
  const content = (
    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow h-full">
      <div className="text-blue-900 mb-4">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <span className="text-blue-900 font-semibold hover:text-blue-700">
          ดำเนินการ →
        </span>
      </div>
    </div>
  );

  return link.startsWith('#') ? (
    <div className="cursor-not-allowed opacity-70">{content}</div>
  ) : (
    <Link to={link}>{content}</Link>
  );
}
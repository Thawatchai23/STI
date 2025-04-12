import React from 'react';
import { ArrowLeft, FileText, Users2, TreePine, Building2, Landmark, Wallet, ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-700 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">GAME</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              เกมตอบคำถามที่ให้ความู้เกี่ยวกับภาษี 6 ประเภท
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<FileText />}
              title="ความร้รอบนตัวเกี่ยวกับภาษี"
              description="หมวดหมู่ที่ 1 ภาษีเงินได้บุคคลธรรมดา"
              color="blue"
            />
            <ServiceCard
              icon={<Wallet />}
              title="ความรู้รอบตัวเกี่ยวกับภาษี"
              description="หมวดหมู่ที่ 2 ภาษีเงินได้นิติบุคคล"
              color="emerald"
            />
            <ServiceCard
              icon={<Users2 />}
              title="ความรู้รอบตัวเกี่ยวกับภาษี"
              description="หมวดหมู๋ที่ 3 ภาษีมูลค่าเพิ่ม"
              color="purple"
            />
            <ServiceCard
              icon={<Building2 />}
              title="ความรู้รอบตัวเกี่ยวกับภาษี"
              description="หมวดหมู่ที่ 4 ภาษีเงินได้ธุรกิจเฉพาะ"
              color="amber"
            />
            <ServiceCard
              icon={<Landmark />}
              title="ความรู้รอบตัวเกี่ยวกับภาษี"
              description="หมวดหมู้ที่ 5 ภาษีเงินได้หัก ณ ที่จ่าย"
              color="rose"
            />
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ติดต่อสอบถาม</h3>
                <p>โทร: 02-123-4567</p>
                <p>สายด่วน: 1234</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">อีเมล</h3>
                <p>info@bangrak.go.th</p>
                <p>service@bangrak.go.th</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">เวลาทำการ</h3>
                <p>จันทร์ - ศุกร์</p>
                <p>8:30 - 16:30 น.</p>
              </div>
            </div>
          </div>

          {/* Service Standards */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">มาตรฐานการให้บริการ</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <StandardCard
                number="1"
                title="รวดเร็ว"
                description="ให้บริการด้วยความรวดเร็ว ลดขั้นตอนการทำงาน"
              />
              <StandardCard
                number="2"
                title="โปร่งใส"
                description="การดำเนินงานโปร่งใส ตรวจสอบได้ทุกขั้นตอน"
              />
              <StandardCard
                number="3"
                title="ประทับใจ"
                description="บริการด้วยความสุภาพ เป็นมิตร และเป็นกันเอง"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const colorVariants = {
  blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
  emerald: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200",
  purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  amber: "bg-amber-100 text-amber-600 hover:bg-amber-200",
  rose: "bg-rose-100 text-rose-600 hover:bg-rose-200",
  teal: "bg-teal-100 text-teal-600 hover:bg-teal-200",
};

function ServiceCard({ icon, title, description, color }) {
  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`inline-block p-3 rounded-lg ${colorVariants[color]} transition-colors mb-4`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
        ดูรายละเอียด
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function StandardCard({ number, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 text-center border border-gray-100 hover:border-blue-200 transition-colors">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
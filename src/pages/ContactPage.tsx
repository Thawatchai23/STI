import React from 'react';
import { ArrowLeft, Building2, Phone, Mail, Clock, MapPin, Send, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-indigo-700 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-indigo-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">ติดต่อเรา</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ยินดีให้บริการและรับฟังความคิดเห็นจากผุ้เข้าใช้งาน เพื่อพัฒนาการบริการให้ดียิ่งขึ้น
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-500 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">ข้อมูลการติดต่อ</h2>
                <div className="space-y-6">
                  <ContactItem
                    icon={<Building2 className="w-6 h-6" />}
                    title="ที่ทำการ"
                    details={[
                      'วิทยาลัยเทคโนโนโลยีเอเชียลพบุรี',
                      '5/45 หมู่ 3 ตำบลป่าตาล',
                      'อำเภอเมือง จังหวัดลพบุรี 15000'
                    ]}
                  />
                  <ContactItem
                    icon={<Phone className="w-6 h-6" />}
                    title="โทรศัพท์"
                    details={['0-3642-4345', 'โทรสาร: 0-3642-0691']}
                  />
                  <ContactItem
                    icon={<Mail className="w-6 h-6" />}
                    title="อีเมล"
                    details={['sti@smarttaxinside.go.th']}
                  />
                  <ContactItem
                    icon={<Clock className="w-6 h-6" />}
                    title="เวลาทำการ"
                    details={[
                      'จันทร์ - เสารื: 8:30 - 16:30 น.',
                      'หยุดอาทิตย์ และวันหยุดนักขัตฤกษ์'
                    ]}
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">ติดตามข่าวสาร</h2>
                <div className="grid grid-cols-2 gap-4">
                  <SocialLink
                    icon={<Globe className="w-5 h-5" />}
                    platform="เว็บไซต์"
                    link="www.smarttaxside.go.th"
                  />
                  <SocialLink
                    icon={<MessageSquare className="w-5 h-5" />}
                    platform="Line Official"
                    link="@522eenbf"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">ส่งข้อความถึงเรา</h2>
              <form className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    label="ชื่อ-นามสกุล"
                    type="text"
                    placeholder="กรุณากรอกชื่อ-นามสกุล"
                    required
                  />
                  <FormField
                    label="อีเมล"
                    type="email"
                    placeholder="example@email.com"
                    required
                  />
                  <FormField
                    label="เบอร์โทรศัพท์"
                    type="tel"
                    placeholder="0x-xxxx-xxxx"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เรื่องที่ต้องการติดต่อ
                    </label>
                    <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option value="">เลือกหัวข้อ</option>
                      <option value="service">สอบถามการบริการ</option>
                      <option value="complaint">ร้องเรียน/แจ้งปัญหา</option>
                      <option value="suggestion">ข้อเสนอแนะ</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      รายละเอียด
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="กรุณากรอกรายละเอียด"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>ส่งข้อความ</span>
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">แผนที่การเดินทาง</h2>
                <a
                  href="https://goo.gl/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <span className="mr-2">ดูใน Google Maps</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <MapPin className="w-8 h-8" />
                  <span className="ml-2">แผนที่จะแสดงในส่วนนี้</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, title, details }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-white/10 p-2 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-white/90">{detail}</p>
        ))}
      </div>
    </div>
  );
}

function SocialLink({ icon, platform, link }) {
  return (
    <a
      href={`https://${link}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
    >
      <div className="text-indigo-600">{icon}</div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{platform}</p>
        <p className="text-xs text-gray-500">{link}</p>
      </div>
    </a>
  );
}

function FormField({ label, type, placeholder, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}
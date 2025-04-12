import React from 'react';
import { ArrowLeft, Calculator, CreditCard, FileText, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TaxPaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">ชำระภาษีออนไลน์</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">ประเภทภาษี</h2>
              <div className="space-y-2">
                <TaxType
                  icon={<FileText />}
                  title="ภาษีที่ดินและสิ่งปลูกสร้าง"
                  description="สำหรับเจ้าของที่ดินและสิ่งปลูกสร้าง"
                />
                <TaxType
                  icon={<FileText />}
                  title="ภาษีป้าย"
                  description="สำหรับป้ายแสดงชื่อ ยี่ห้อ หรือโฆษณา"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">ขั้นตอนการชำระภาษี</h2>
              <ol className="space-y-4">
                <TaxStep
                  number="1"
                  icon={<Calculator />}
                  title="ตรวจสอบยอดภาษี"
                  description="กรอกเลขประจำตัวผู้เสียภาษีเพื่อตรวจสอบยอดที่ต้องชำระ"
                />
                <TaxStep
                  number="2"
                  icon={<CreditCard />}
                  title="เลือกวิธีชำระเงิน"
                  description="เลือกช่องทางการชำระเงินที่สะดวก"
                />
                <TaxStep
                  number="3"
                  icon={<FileText />}
                  title="รับใบเสร็จ"
                  description="พิมพ์ใบเสร็จรับเงินอิเล็กทรอนิกส์"
                />
              </ol>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">ต้องการความช่วยเหลือ?</h3>
                <p className="text-gray-600 mb-4">
                  หากท่านมีข้อสงสัยหรือต้องการความช่วยเหลือในการชำระภาษี สามารถติดต่อเจ้าหน้าที่ได้ที่
                </p>
                <div className="space-y-2 text-sm">
                  <p>โทร: 02-123-4567 ต่อ 1234</p>
                  <p>อีเมล: tax@bangrak.go.th</p>
                  <p>เวลาทำการ: จันทร์-ศุกร์ 8:30-16:30 น.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxType({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
      <div className="text-blue-900">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function TaxStep({ number, icon, title, description }) {
  return (
    <li className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center">
        {number}
      </div>
      <div>
        <div className="flex items-center space-x-2">
          {React.cloneElement(icon, { size: 20, className: "text-blue-900" })}
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </li>
  );
}
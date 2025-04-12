import React from 'react';
import { ArrowLeft, Heart, Users, Baby, Armchair as Wheelchair, School, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelfarePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">คำนวนภาษี 5 ประเภท</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <WelfareCard
              icon={<Users />}
              title="ภาษีเงินได้บุคคลธรรมาดา"
              description="เช่น พนักงานบริษัท ฟรีแลนช์ เจ้าของธุรกิจส่วนตัว"
              status="ภ.ง.ด.90/91/94 "
            />
            <WelfareCard
              icon={<Wheelchair />}
              title="ภาษีเงินได้นิติบุคคล"
              description="เช่น บริษัทจำกัด/หน้าหุ้นส่วนจำกัด/มูลนิและสมาคม
              "
              status="ภ.ง.ด.50/51"
            />
            <WelfareCard
              icon={<Baby />}
              title="ภาษีเงินได้ธุรกิจเฉพาะ"
              description="เช่น ธุรกิจให้กู้ยืมเงิน/ธุรกิจหลักทรัพย์/ธุรกิจอสังหาริมทรัพย์แบบเฉพาะเจาะจง"
              status="ภ.ธ.40"
            />
            <WelfareCard
              icon={<School />}
              title="ภาษีมูลค่าเพิ่ม"
              description="เช่นผู้ประกอบธุรกิจที่มีรายได้เกิน 1.8 ล้านบาท ต่อปี/ผู้ขายสินค้าหรือบริการ/ผู้นำเข้าสินค้า
              "
              status="ภ.พ.30/36"
            />
            <WelfareCard
              icon={<Heart />}
              title="ภาษีเงินได้หัก ณ ที่จย่าย"
              description="เช่น รายได้จากกการจ้างงาน/ค่าบริการ/ค่าพลิตภัณฑ์
              "
              status="ภ.ง.ด.1/2/3/ภ.ง.ด.1ก"
            />
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">เอกสารที่ต้องเตรียม</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>รอหาข้อมูล</li>
                  <li>รอหาข้อมูล</li>
                  <li>รอหาข้อมุล</li>
                  <li>รอหาข้อมูล</li>
                </ul>
                <div className="mt-4 text-sm">
                  <p className="font-semibold">สอบถามข้อมูลเพิ่มเติม:</p>
                  <p>โทร: 0-3642-4315</p>
                  <p>อีเมล: sti@smartgtaxside.go.th</p>
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
          เริ่มคำนวนภาษี →
        </button>
      </div>
    </div>
  );
}
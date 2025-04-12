import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Award, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StaffDirectoryPage() {
  const executives = [
    {
      name: "จื่อผิง ลิ้มทรงพรต",
      position: "ผู้บริหารวิทยาลัยเทคโนโลยีเอเชียลพบุรี",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      phone: "02-123-4567 ต่อ 101",
      email: "ข้อความมเพิ่ทเติม",
      education: "ข้อความเพิ่มเติม",
      experience: "ประสบการณ์บริหารงานท้องถิ่น 15 ปี"
    },
    {
      name: "กิตติพงศ์ ไพรสน",
      position: "ผู้อำนวยการวิทยาลัยเทคโนนโลยีเอเชียลพบุรี",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      phone: "02-123-4567 ต่อ 102",
      email: "ข้อความเพิ่มเติม",
      education: "ข้อความเพิ่ทเติม",
      experience: "ข้อความเพิ่ทเติม"
    }
  ];

  const departments = [
    {
      name: "Smart Tax Side",
      advisorTitle: "อาจารย์ที่ปรึกษาโครงงาน",
      membersTitle: "ผู้จัดทำโครงงาน",
      head: {
        name: "ชื่ออาจารย์ที่ปรึกษาโครงงาน",
        position: "อาจารย์ที่ปรึกษาโครงงาน",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=300&q=80"
      },
      staff: [
        {
          name: "นายธวัชชัย สว่างศรี",
          position: "ผู้จัดทำโครงงาน",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
        },
        {
          name: "นางสาวบุษกกร หาญพะยุติ",
          position: "ผู้จัดทำโครงงาน",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
        }
      ]
    },
    {
      name: "บัญชี/กราฟิก",
      advisorTitle: "ที่ปรึกษาด้านบัญชี",
      membersTitle: "ที่ปรึกษาด้านกราฟิก",
      head: {
        name: "ชื่ออาจารย์บัญชี",
        position: "อาจารย์ที่ปรึกษาด้านบัญชี",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      },
      staff: [
        {
          name: "นางสาวธัญพิชชา บุตรศรี",
          position: "ที่ปรึกษาด้านกราฟิก",
          image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80"
        }
      ]
    },
    {
      name: "IT",
      advisorTitle: "ที่ปรึกษาด้าน IT",
      membersTitle: "ที่ปรึกษาด้าน IT",
      head: {
        name: "ชื่อที่ปรึกษาIT",
        position: "ที่ปรึกษาด้านIT",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
      },
      staff: [
        {
          name: "ชื่อที่ปรึกษาด้านIT",
          position: "ที่ปรึกษาด้านIT",
          image: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=300&q=80"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-primary-700 hover:text-primary-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-8">ผังรายชื่อผู้จัดทำโครงงาน</h1>

          {/* Executives Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary-800 mb-6">ผู้บริหาร</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {executives.map((executive, index) => (
                <ExecutiveCard key={index} {...executive} />
              ))}
            </div>
          </section>

          {/* Departments Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-6">โครงสร้างผู้จัดทำโครงงาน</h2>
            <div className="space-y-8">
              {departments.map((department, index) => (
                <DepartmentSection
                  key={index}
                  name={department.name}
                  advisorTitle={department.advisorTitle}
                  membersTitle={department.membersTitle}
                  head={department.head}
                  staff={department.staff}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ExecutiveCard({ name, position, image, phone, email, education, experience }) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-6 border border-primary-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img src={image} alt={name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary-900">{name}</h3>
          <p className="text-primary-700 font-medium mb-4">{position}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              {phone}
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {email}
            </div>
            <div className="flex items-center text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              {education}
            </div>
            <div className="flex items-center text-gray-600">
              <Award className="w-4 h-4 mr-2" />
              {experience}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepartmentSection({ name, advisorTitle, membersTitle, head, staff }) {
  return (
    <div className="bg-white rounded-xl border border-primary-100 overflow-hidden">
      <div className="bg-primary-800 text-white p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-primary-900 mb-4">{advisorTitle}</h4>
          <StaffCard {...head} isHead={true} />
        </div>

        {staff.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-primary-900 mb-4">{membersTitle}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {staff.map((member, index) => (
                <StaffCard key={index} {...member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StaffCard({ name, position, image, isHead }) {
  return (
    <div className={`flex items-center gap-4 ${isHead ? "bg-primary-50" : ""} p-4 rounded-lg shadow`}>
      <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
      <div>
        <h4 className="text-primary-900 font-semibold">{name}</h4>
        <p className="text-primary-700 text-sm">{position}</p>
      </div>
    </div>
  );
}
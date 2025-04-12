import React from 'react';
import { ArrowLeft, Users2, Heart, GraduationCap, Sprout, Calendar, MapPin, Clock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunityPage() {
  const upcomingEvents = [
    {
      date: "20 มีนาคม 2567",
      time: "09:00 - 12:00",
      title: "อบรมการทำเกษตรอินทรีย์",
      location: "ศูนย์การเรียนรู้ชุมชน",
      image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80"
    },
    {
      date: "25 มีนาคม 2567",
      time: "13:00 - 16:00",
      title: "กิจกรรมจิตอาสาพัฒนาชุมชน",
      location: "สวนสาธารณะชุมชน",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h1 className="text-3xl font-bold text-primary-900 mb-6">พัฒนาเพิ่มเติม</h1>
              
              <div className="grid md:grid-cols-2 gap-6">
                <ProjectCard
                  icon={<Heart />}
                  title="รอมาใส่"
                  description="รอมาใส่"
                  status="กำลังดำเนินการ"
                  progress={75}
                />
                <ProjectCard
                  icon={<GraduationCap />}
                  title="รอมาใส่"
                  description="รอมาใส่"
                  status="กำลังดำเนินการ"
                  progress={30}
                />
                <ProjectCard
                  icon={<Sprout />}
                  title="รอมาใส่"
                  description="รอมาใส่่"
                  status="กำลังดำเนินการ"
                  progress={60}
                />
                <ProjectCard
                  icon={<Users2 />}
                  title="รอมาใส่"
                  description="รอมาใส่"
                  status="กำลังดำเนิการ"
                  progress={45}
                />
              </div>
            </div>

            {/* Community Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">สถิติชุมชน</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  number="1,234"
                  label="ผู้เข้าร่วมโครงการ"
                  color="text-primary-600"
                />
                <StatCard
                  number="15"
                  label="โครงการที่ดำเนินการ"
                  color="text-green-600"
                />
                <StatCard
                  number="₿ 2.5M"
                  label="งบประมาณที่ใช้"
                  color="text-blue-600"
                />
                <StatCard
                  number="89%"
                  label="ความพึงพอใจ"
                  color="text-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">กิจกรรมที่กำลังจะมาถึง</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
              <button className="w-full mt-4 text-center text-primary-700 font-semibold hover:text-primary-800 transition-colors">
                ดูกิจกรรมทั้งหมด
                <ChevronDown className="inline-block w-4 h-4 ml-1 transform -rotate-90" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">ลิงก์ด่วน</h2>
              <div className="space-y-2">
                <QuickLinkButton
                  text="ลงทะเบียนเข้าร่วมกิจกรรม"
                  href="/register"
                />
                <QuickLinkButton
                  text="ดาวน์โหลดเอกสาร"
                  href="/documents"
                />
                <QuickLinkButton
                  text="ติดต่อเจ้าหน้าที่"
                  href="/contact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ icon, title, description, status, progress }) {
  return (
    <div className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-primary-700 mb-4">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
            {status}
          </span>
          <span className="text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ number, label, color }) {
  return (
    <div className="text-center p-4 rounded-lg bg-gray-50">
      <p className={`text-2xl font-bold ${color}`}>{number}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function EventCard({ date, time, title, location, image }) {
  return (
    <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <img src={image} alt={title} className="w-20 h-20 rounded-lg object-cover" />
      <div>
        <h3 className="font-semibold text-primary-900">{title}</h3>
        <p className="text-sm text-gray-600 flex items-center mt-1">
          <Calendar className="w-4 h-4 mr-1" />
          {date}
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-1">
          <Clock className="w-4 h-4 mr-1" />
          {time}
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </p>
      </div>
    </div>
  );
}

function QuickLinkButton({ text, href }) {
  return (
    <Link
      to={href}
      className="block w-full px-4 py-2 text-center bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
    >
      {text}
    </Link>
  );
}
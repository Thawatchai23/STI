import React, { useState } from 'react';
import { 
  ArrowLeft, TrendingUp, Users, FileText, Building2, Wallet, 
  ArrowUpRight, ArrowDownRight, Calendar, MapPin, Clock, AlertCircle,
  CheckCircle2, XCircle, Clock3, Loader2, PieChart as PieChartIcon, BarChart as BarChartIcon,
  LineChart as LineChartIcon, Download, Filter, ChevronDown, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line
} from 'recharts';

const budgetData = [
  { month: 'ต.ค.', รายรับ: 2500000, รายจ่าย: 2100000 },
  { month: 'พ.ย.', รายรับ: 2700000, รายจ่าย: 2300000 },
  { month: 'ธ.ค.', รายรับ: 3100000, รายจ่าย: 2800000 },
  { month: 'ม.ค.', รายรับ: 2900000, รายจ่าย: 2600000 },
  { month: 'ก.พ.', รายรับ: 3300000, รายจ่าย: 2900000 },
  { month: 'มี.ค.', รายรับ: 3500000, รายจ่าย: 3100000 }
];

const projectStatusData = [
  { name: 'ดำเนินการแล้วเสร็จ', value: 25 },
  { name: 'กำลังดำเนินการ', value: 15 },
  { name: 'รอดำเนินการ', value: 10 },
  { name: 'ยกเลิก', value: 2 }
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const serviceUsageData = [
  { name: 'ชำระภาษี', จำนวน: 150 },
  { name: 'ทะเบียนราษฎร์', จำนวน: 120 },
  { name: 'สวัสดิการสังคม', จำนวน: 200 },
  { name: 'ร้องเรียน/ร้องทุกข์', จำนวน: 80 },
  { name: 'ขออนุญาตก่อสร้าง', จำนวน: 45 },
  { name: 'อื่นๆ', จำนวน: 95 }
];

const populationTrendData = [
  { year: '2563', จำนวน: 12500 },
  { year: '2564', จำนวน: 12800 },
  { year: '2565', จำนวน: 13200 },
  { year: '2566', จำนวน: 13500 },
  { year: '2567', จำนวน: 13800 }
];

const projectTimeline = [
  {
    title: "โครงการปรับปรุงถนนสายหลัก",
    budget: "5,000,000",
    progress: 75,
    startDate: "1 ม.ค. 2567",
    endDate: "30 มิ.ย. 2567",
    status: "กำลังดำเนินการ",
    department: "กองช่าง"
  },
  {
    title: "โครงการติดตั้งกล้องวงจรปิด",
    budget: "2,000,000",
    progress: 90,
    startDate: "1 ก.พ. 2567",
    endDate: "31 พ.ค. 2567",
    status: "กำลังดำเนินการ",
    department: "สำนักปลัด"
  },
  {
    title: "โครงการอบรมอาชีพชุมชน",
    budget: "500,000",
    progress: 100,
    startDate: "1 มี.ค. 2567",
    endDate: "31 มี.ค. 2567",
    status: "เสร็จสิ้น",
    department: "กองสวัสดิการสังคม"
  }
];

const complaints = [
  {
    id: "C001",
    type: "สาธารณูปโภค",
    status: "รอดำเนินการ",
    date: "15 มี.ค. 2567",
    priority: "สูง"
  },
  {
    id: "C002",
    type: "สิ่งแวดล้อม",
    status: "กำลังดำเนินการ",
    date: "14 มี.ค. 2567",
    priority: "ปานกลาง"
  },
  {
    id: "C003",
    type: "ความปลอดภัย",
    status: "เสร็จสิ้น",
    date: "13 มี.ค. 2567",
    priority: "ปกติ"
  }
];

const departmentBudgets = [
  { department: "สำนักปลัด", allocated: 10000000, used: 6500000 },
  { department: "กองคลัง", allocated: 5000000, used: 2800000 },
  { department: "กองช่าง", allocated: 15000000, used: 9800000 },
  { department: "กองสาธารณสุข", allocated: 8000000, used: 4200000 },
  { department: "กองการศึกษา", allocated: 12000000, used: 7500000 }
];

export default function DashboardPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>

        <div className="space-y-6">
          {/* Header with Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">สรุปการดำเนินงาน</h1>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">7 วันล่าสุด</option>
                  <option value="month">30 วันล่าสุด</option>
                  <option value="quarter">ไตรมาสนี้</option>
                  <option value="year">ปีงบประมาณ 2567</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
              <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                <Download className="w-5 h-5" />
                <span>ดาวน์โหลดรายงาน</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="งบประมาณประจำปี"
              value="45,000,000"
              unit="บาท"
              change="+5.2%"
              isPositive={true}
              icon={<Wallet className="w-6 h-6" />}
              color="emerald"
            />
            <StatCard
              title="จำนวนประชากร"
              value="13,800"
              unit="คน"
              change="+2.3%"
              isPositive={true}
              icon={<Users className="w-6 h-6" />}
              color="blue"
            />
            <StatCard
              title="โครงการทั้งหมด"
              value="52"
              unit="โครงการ"
              change="-3"
              isPositive={false}
              icon={<FileText className="w-6 h-6" />}
              color="purple"
            />
            <StatCard
              title="หน่วยงานในสังกัด"
              value="7"
              unit="หน่วยงาน"
              change="+1"
              isPositive={true}
              icon={<Building2 className="w-6 h-6" />}
              color="amber"
            />
          </div>

          {/* Department Budget Overview */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">การใช้งบประมาณแต่ละหน่วยงาน</h2>
              <div className="flex gap-4">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border rounded-lg px-3 py-1"
                >
                  <option value="all">ทุกหน่วยงาน</option>
                  <option value="office">สำนักปลัด</option>
                  <option value="engineering">กองช่าง</option>
                  <option value="finance">กองคลัง</option>
                </select>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Filter className="w-4 h-4" />
                  <span>กรอง</span>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {departmentBudgets.map((dept, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{dept.department}</h3>
                    <span className="text-gray-600">
                      {((dept.used / dept.allocated) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${(dept.used / dept.allocated) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">
                      ใช้ไป: ฿{(dept.used).toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      งบประมาณ: ฿{(dept.allocated).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">งบประมาณรายรับ-รายจ่าย</h2>
                <div className="flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">รายเดือน</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="รายรับ" stroke="#10B981" fill="#10B98133" />
                    <Area type="monotone" dataKey="รายจ่าย" stroke="#EF4444" fill="#EF444433" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Project Status Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">สถานะโครงการ</h2>
                <div className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">ภาพรวม</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Service Usage Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">การใช้บริการประเภทต่างๆ</h2>
                <div className="flex items-center gap-2">
                  <BarChartIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">รายบริการ</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="จำนวน" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Population Trend Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">แนวโน้มจำนวนประชากร</h2>
                <div className="flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">รายปี</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={populationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="จำนวน" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">ความคืบหน้าโครงการ</h2>
            <div className="space-y-6">
              {projectTimeline.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {project.department} | งบประมาณ ฿{project.budget}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <span className="text-sm text-gray-600">
                        {project.startDate} - {project.endDate}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ความคืบหน้า</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complaints Overview */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">เรื่องร้องเรียน/ร้องทุกข์</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                ดูทั้งหมด →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="p-4 font-semibold text-gray-600">รหัส</th>
                    <th className="p-4 font-semibold text-gray-600">ประเภท</th>
                    <th className="p-4 font-semibold text-gray-600">วันที่</th>
                    <th className="p-4 font-semibold text-gray-600">ความสำคัญ</th>
                    <th className="p-4 font-semibold text-gray-600">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4">{complaint.id}</td>
                      <td className="p-4">{complaint.type}</td>
                      <td className="p-4">{complaint.date}</td>
                      <td className="p-4">
                        <PriorityBadge priority={complaint.priority} />
                      </td>
                      <td className="p-4">
                        <StatusBadge status={complaint.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, change, isPositive, icon, color }) {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      light: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      light: 'bg-blue-50',
      border: 'border-blue-200'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      light: 'bg-purple-50',
      border: 'border-purple-200'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      light: 'bg-amber-50',
      border: 'border-amber-200'
    }
  };

  const colors = colorMap[color];

  return (
    <div className={`${colors.bg} p-6 rounded-xl shadow-lg border ${colors.border} transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className={`p-2 ${colors.light} rounded-lg`}>
          {React.cloneElement(icon, { className: colors.text })}
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className={`${colors.text} text-sm font-medium`}>{title}</h3>
        <p className="text-2xl font-bold text-gray-900">
          {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    'เสร็จสิ้น': 'bg-green-100 text-green-700',
    'กำลังดำเนินการ': 'bg-blue-100 text-blue-700',
    'รอดำเนินการ': 'bg-yellow-100 text-yellow-700',
    'ยกเลิก': 'bg-red-100 text-red-700'
  };

  const statusIcons = {
    'เสร็จสิ้น': <CheckCircle2 className="w-4 h-4" />,
    'กำลังดำเนินการ': <Loader2 className="w-4 h-4" />,
    'รอดำเนินการ': <Clock3 className="w-4 h-4" />,
    'ยกเลิก': <XCircle className="w-4 h-4" />
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm ${statusStyles[status]}`}>
      {statusIcons[status]}
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const priorityStyles = {
    'สูง': 'bg-red-100 text-red-700',
    'ปานกลาง': 'bg-yellow-100 text-yellow-700',
    'ปกติ': 'bg-green-100 text-green-700'
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-sm ${priorityStyles[priority]}`}>
      {priority}
    </span>
  );
}
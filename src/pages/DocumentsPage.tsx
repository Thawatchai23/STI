import React, { useState } from 'react';
import { ArrowLeft, Search, FileText, Download, Printer, ChevronDown, Filter, Eye, Calendar, FileIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const documents = [
  {
    id: 'DOC001',
    title: 'ภ.ง.ด.1',
    category: 'แบบฟอร์มภาษีเงินได้หัก ณ ที่จ่าย ',
    format: 'PDF',
    size: '250 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 156,
    url: 'https://drive.usercontent.google.com/download?id=17pxdBSD9BO7t0Vj8uuKgq5wbaYrxXgKk&export=download&authuser=0&confirm=t&uuid=cb011d00-db17-49b4-a2b2-bb1d94ce96f4&at=APcmpoxrfeu2ZTju6nJqUoH-Yecx:1744293988612',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/withhold/200360_WHT1.pdf'
  },
  {
    id: 'DOC002',
    title: 'ภ.ง.ด.1ก',
    category: 'แบบฟอร์มภาษีเงินได้หัก ณ ที่จ่าย',
    format: 'PDF',
    size: '500 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 89,
    url: 'https://drive.usercontent.google.com/download?id=1wBnyzVrvjiZM1nyTldzaNMwoMQMVCAgz&export=download&authuser=0&confirm=t&uuid=b9c2448c-20b0-4bfa-a6b7-a2f5453b9b3a&at=APcmpowgyUVDx45MSg5Rom7H9tLm:1744294150487',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/withhold/210360_WHT1_kor.pdf'
  },
  {
    id: 'DOC003',
    title: 'ภ.ง.ด.2',
    category: 'แบบฟอร์มภาษีเงินได้หัก ณ ที่จ่าย',
    format: 'PDF',
    size: '300 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 234,
    url: 'https://drive.usercontent.google.com/download?id=1ku2MpZAll758P1GLJBDilgYppy-hf3LD&export=download&authuser=0&confirm=t&uuid=1d410d55-f00a-4849-b787-55ce77a96952&at=APcmpowsl1L0vW0IZ8eb6t_iTogV:1744294323451',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/withhold/240360_WHT2.pdf'
  },
  {
    id: 'DOC004',
    title: 'ภ.ง.ด.3',
    category: 'แบบฟอร์มภาษีเงินได้หัก ณ ที่จ่าย',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=1sL2uVtgP6r-YucevbfqO6McS5ZbS0YZs&export=download&authuser=0&confirm=t&uuid=787918b7-9e6c-47e6-b6c6-076b2afc6c80&at=APcmpowdBEq1YZf2PEyWCyQypedL:1744294719352',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/withhold/270360_WHT3.pdf'
  },
  {
    id: 'DOC005',
    title: 'ภ.ง.ด.50',
    category: 'แบบฟอร์มภาษีเงินได้นิติบุคคล',
    format: 'PDF',
    size: '350 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 178,
    url: 'https://drive.usercontent.google.com/download?id=1seIH-DN0UOXulkBceLGYd3sNo2RFxDM8&export=download&authuser=0&confirm=t&uuid=3af4305d-d8b6-42dc-8b96-32cfe6a2e4c2&at=APcmpoy4Lmbme52OGcbMwz5_gTj7:1744294995109',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/cit/CIT50_2556_100357.pdf'
  },
  {
    id: 'DOC006',
    title: 'ภ.ง.ด.51',
    category: 'แบบฟอร์มภาษีเงินได้นิติบุคคล',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=1lqjr8J1JE_v7CN4vdjWSwNfch1UmposM&export=download&authuser=0&confirm=t&uuid=4f95a275-c55c-412e-aa6b-220aeeea03ac&at=APcmpoxUAh_70gQoTp_1k1MLW9H3:1744295244553',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/cit/2564/230664CIT51.pdf'
  },
  {
    id: 'DOC007',
    title: 'ภ.ง.ด.90',
    category: 'แบบฟอร์มภาษีเงินได้บุคคลธรรมดา',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=1O_KZlPF8l-54fl1u2ekTMrlsNGeQoYfo&export=download&authuser=0&confirm=t&uuid=b7a5e4f3-c8b0-4ad4-b511-f266daf5566d&at=APcmpoyoEhRtfF7FujyXhSrIdINH:1744295406300',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/pit/2565/271265PIT90.pdf'
  },
  {
    id: 'DOC008',
    title: 'ภ.ง.ด.91',
    category: 'แบบฟอร์มภาษีเงินได้บุคคลธรรมดา',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=1l0u4LFbIPCm1X16o0fZCbzNVYzjfI_PI&export=download&authuser=0&confirm=t&uuid=8015e514-b4a6-4575-9ca7-f9ee00889b33&at=APcmpowkSmqxM8cN4HS4WyUe350J:1744295590104',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/pit/PIT91_030162.pdf'
  },
  {
    id: 'DOC009',
    title: 'ภ.ง.ด.94',
    category: 'แบบฟอร์มภาษีเงินได้บุคคลธรรมดา',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=108s-6i_VtKJC_oTvpGnX8b8D6Dm0_19n&export=download&authuser=0&confirm=t&uuid=a0ad9aba-49b8-4855-b71d-f988bf5cbef1&at=APcmpowIuG7XAkKFlWtElAeCCnNc:1744295829058',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/pit/2567/240667PIT94.pdf'
  },
  {
    id: 'DOC010',
    title: 'ภ.พ.30',
    category: 'แบบฟอร์มภาษีมูลค่าเพิ่ม',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=1JtmlMRz4tEPv2WOsIanMp3c4JFF2r6ln&export=download&authuser=0&confirm=t&uuid=bfcb56d4-3ef6-4c1b-b51b-f45515b44de3&at=APcmpoxG2v9YYM2WJr6-zsqzsrH7:1744296270895',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/vat/pp30_300160.pdf'
  },
  {
    id: 'DOC011',
    title: 'ภ.พ.36',
    category: 'แบบฟอร์มภาษีมูลค่าเพิ่ม',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=1ej10BR5eWyWqFa6yWn-AnFTIAuYxkUBO&export=download&authuser=0&confirm=t&uuid=8fa22380-9805-4d06-b033-e3198ecaebfb&at=APcmpozNzjQIU5EN0YAvnF7FWqn6:1744296567957',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/vat/pp36_010260.pdf'
  },
  {
    id: 'DOC012',
    title: 'ภ.ธ.40',
    category: 'แบบฟอร์มภาษีเงินได้ธุรกิจเฉพาะ',
    format: 'PDF',
    size: '400 KB',
    lastUpdated: '27 มีนาคม 2568',
    downloads: 123,
    url: 'https://drive.usercontent.google.com/download?id=10HpG_WS-CWG1l-RWDXMnZHOfu8e7ag43&export=download&authuser=0&confirm=t&uuid=adce4977-92af-4bf9-87a3-45c512669148&at=APcmpoy3dAWY3BFg-kh99aZQPH0G:1744296838166',
    p_url: 'https://www.rd.go.th/fileadmin/tax_pdf/spec/pt40_010260.pdf'
  }
];


const categories  = [
  'ทั้งหมด',
  'แบบฟอร์มภาษีเงินได้บุคคลธรรมาด',
  'แบบฟอร์มภาษีเงินได้นิติบุคคล',
  'แบบฟอร์มภาษีมูลค่าเพิ่ม',
  'แบบฟอร์มภาษีเงินได้หัก ณ ที่จ่าย',
  'แบบฟอรืมภาษีเงินได้ธุรกิจเฉพาะ'
];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [sortBy, setSortBy] = useState('date');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'downloads':
        return b.downloads - a.downloads;
      case 'date':
      default:
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    }
  });

  const handleDownload = (doc) => {
    // In a real application, this would trigger the actual download
    console.log('Downloading:', doc.title);
    alert('เริ่มดาวน์โหลดเอกสาร: ' + doc.title);
  };

  const handlePrint = (doc) => {
    // In a real application, this would open the print dialog
    console.log('Printing:', doc.title);
    alert('กำลังเปิดหน้าต่างพิมพ์เอกสาร: ' + doc.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-700 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ดาวน์โหลดเอกสาร</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ดาวน์โหลดแบบฟอร์มใบยื่นภาษี
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="ค้นหาเอกสาร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date">เรียงตามวันที่</option>
                  <option value="name">เรียงตามชื่อ</option>
                  <option value="downloads">เรียงตามยอดดาวน์โหลด</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {sortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <FileIcon className="w-4 h-4 mr-1" />
                          {doc.format} • {doc.size}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {doc.lastUpdated}
                        </span>
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {doc.downloads} ดาวน์โหลด
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <a
                      href={doc.p_url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <Printer className="w-4 h-4 mr-1" />
                      <span>พิมพ์</span>
                    </a>
                    <a
                      href={doc.url}
                      download
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      <span>ดาวน์โหลด</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">วิธีการดาวน์โหลดและพิมพ์เอกสาร</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">การดาวน์โหลด</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>ค้นหาเอกสารที่ต้องการ</li>
                  <li>คลิกปุ่ม "ดาวน์โหลด"</li>
                  <li>เลือกตำแหน่งที่ต้องการบันทึกไฟล์</li>
                  <li>เปิดไฟล์ด้วยโปรแกรม PDF Reader</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">การพิมพ์</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>คลิกปุ่ม "พิมพ์"</li>
                  <li>ตั้งค่าการพิมพ์ตามต้องการ</li>
                  <li>ตรวจสอบการตั้งค่าหน้ากระดาษ</li>
                  <li>คลิกพิมพ์เอกสาร</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
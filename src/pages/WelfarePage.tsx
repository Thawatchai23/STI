import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, Smile, Home, Heart } from 'lucide-react';
import {
  calculatePersonalTax,
  calculatePersonalTaxHalfYear,
  calculateCorporateTax,
  calculateSpecialBusinessTax,
  calculateVAT,
  calculateWithholdingTax
} from '../utils/taxCalculations';

const TAX_CATEGORIES = [
  {
    key: 'personal',
    title: 'ภาษีเงินได้บุคคลธรรมดา',
    desc: 'เช่น พนักงานบริษัท ฟรีแลนซ์ เจ้าของธุรกิจส่วนตัว',
    icon: <User className="w-10 h-10 text-blue-600" />,
    tag: 'ภ.ง.ด.90/91/94',
  },
  {
    key: 'corporate',
    title: 'ภาษีเงินได้นิติบุคคล',
    desc: 'เช่น บริษัทจำกัด/ห้างหุ้นส่วนจำกัด/มูลนิธิและสมาคม',
    icon: <Briefcase className="w-10 h-10 text-indigo-600" />,
    tag: 'ภ.ง.ด.50/51',
  },
  {
    key: 'special',
    title: 'ภาษีเงินได้ธุรกิจเฉพาะ',
    desc: 'เช่น ธุรกิจให้กู้ยืมเงิน/ธุรกิจหลักทรัพย์/ธุรกิจอสังหาริมทรัพย์แบบเฉพาะเจาะจง',
    icon: <Smile className="w-10 h-10 text-pink-500" />,
    tag: 'ภ.ธ.40',
  },
  {
    key: 'vat',
    title: 'ภาษีมูลค่าเพิ่ม',
    desc: 'เช่นผู้ประกอบธุรกิจที่มีรายได้เกิน 1.8 ล้านบาท ต่อปี/ผู้ขายสินค้าหรือบริการ/ผู้นำเข้าสินค้า',
    icon: <Home className="w-10 h-10 text-green-600" />,
    tag: 'ภ.พ.30/36',
  },
  {
    key: 'withholding',
    title: 'ภาษีเงินได้หัก ณ ที่จ่าย',
    desc: 'เช่น รายได้จากการจ้างงาน/ค่าบริการ/ค่าผลิตภัณฑ์',
    icon: <Heart className="w-10 h-10 text-red-500" />,
    tag: 'ภ.ง.ด.1/2/3/1ก',
  },
];

const TAX_CATEGORY_FORMS = [
  { key: 'personal', icon: <User className="w-8 h-8 text-blue-600" />, forms: [
    { value: 'pnd90', label: 'ภ.ง.ด.90' },
    { value: 'pnd91', label: 'ภ.ง.ด.91' },
    { value: 'pnd94', label: 'ภ.ง.ด.94' },
  ]},
  { key: 'corporate', icon: <Briefcase className="w-8 h-8 text-indigo-600" />, forms: [
    { value: 'pnd50', label: 'ภ.ง.ด.50' },
    { value: 'pnd51', label: 'ภ.ง.ด.51' },
  ]},
  { key: 'special', icon: <Smile className="w-8 h-8 text-pink-500" />, forms: [
    { value: 'pnd40', label: 'ภ.ธ.40' },
  ]},
  { key: 'vat', icon: <Home className="w-8 h-8 text-green-600" />, forms: [
    { value: 'pnd30', label: 'ภ.พ.30' },
    { value: 'pnd36', label: 'ภ.พ.36' },
  ]},
  { key: 'withholding', icon: <Heart className="w-8 h-8 text-red-500" />, forms: [
    { value: 'pnd1', label: 'ภ.ง.ด.1' },
    { value: 'pnd3', label: 'ภ.ง.ด.3' },
    { value: 'pnd53', label: 'ภ.ง.ด.53' },
    { value: 'pnd1k', label: 'ภ.ง.ด.1ก' },
  ]},
];

interface Step1Props {
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedForm: string;
  setSelectedForm: (form: string) => void;
}

function Step1({ selectedType, setSelectedType, selectedForm, setSelectedForm }: Step1Props) {
  const currentForms = TAX_CATEGORY_FORMS.find(cat => cat.key === selectedType)?.forms || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-900 drop-shadow">เลือกประเภทภาษี</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {TAX_CATEGORY_FORMS.map(cat => (
          <button
            key={cat.key}
            className={`rounded-2xl border-2 p-6 shadow-xl flex flex-col items-center gap-2 text-lg font-semibold transition-all duration-200 group hover:scale-105 hover:shadow-2xl ${selectedType === cat.key ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-blue-900 border-blue-200 hover:bg-blue-50'}`}
            onClick={() => { setSelectedType(cat.key); setSelectedForm(''); }}
          >
            <span>{cat.icon}</span>
            <span className="mt-2">{cat.key === 'personal' ? 'บุคคลธรรมดา' : cat.key === 'corporate' ? 'นิติบุคคล' : cat.key === 'special' ? 'ธุรกิจเฉพาะ' : cat.key === 'vat' ? 'มูลค่าเพิ่ม' : 'หัก ณ ที่จ่าย'}</span>
          </button>
        ))}
      </div>
      {selectedType && (
        <>
          <h3 className="text-lg font-semibold mb-4 text-center text-blue-800">เลือกแบบฟอร์ม</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {currentForms.map(form => (
              <button
                key={form.value}
                className={`px-7 py-3 rounded-xl border-2 font-semibold text-lg shadow transition-all duration-200 ${selectedForm === form.value ? 'bg-blue-600 text-white border-blue-700 scale-105' : 'bg-white text-blue-900 border-blue-200 hover:bg-blue-50 hover:scale-105'}`}
                onClick={() => setSelectedForm(form.value)}
              >
                {form.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface Step2Props {
  selectedForm: string;
}

function PND90Form() {
  const [salary, setSalary] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [other, setOther] = useState(0);
  const [deduct, setDeduct] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    const net = salary + bonus + other - deduct;
    setTax(calculatePersonalTax(net));
  };
  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-8 max-w-lg mx-auto border border-blue-100">
      <h2 className="text-xl font-bold mb-6 text-blue-900 text-center">คำนวณภาษีเงินได้บุคคลธรรมดา (ภ.ง.ด.90)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block font-medium mb-1">เงินเดือน (บาท/ปี)</label>
          <input type="number" className="input input-bordered w-full" value={salary} onChange={e=>setSalary(Number(e.target.value))} />
        </div>
        <div>
          <label className="block font-medium mb-1">โบนัส (บาท/ปี)</label>
          <input type="number" className="input input-bordered w-full" value={bonus} onChange={e=>setBonus(Number(e.target.value))} />
        </div>
        <div>
          <label className="block font-medium mb-1">รายได้อื่นๆ (บาท/ปี)</label>
          <input type="number" className="input input-bordered w-full" value={other} onChange={e=>setOther(Number(e.target.value))} />
        </div>
        <div>
          <label className="block font-medium mb-1">ค่าลดหย่อน (บาท)</label>
          <input type="number" className="input input-bordered w-full" value={deduct} onChange={e=>setDeduct(Number(e.target.value))} />
        </div>
      </div>
      <button className="btn btn-primary w-full mt-4" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="mt-6 text-center">
          <div className="text-lg font-bold text-green-600">ภาษีที่ต้องชำระ: {tax.toLocaleString()} บาท</div>
        </div>
      )}
    </div>
  );
}

function Step2({ selectedForm }: Step2Props) {
  if (selectedForm === 'pnd90') return <PND90Form />;
  // เพิ่มฟอร์มอื่นๆ ตาม selectedForm ได้ที่นี่
  return <div className="text-center text-gray-500">(อยู่ระหว่างพัฒนา)</div>;
}

export default function WelfarePage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedForm, setSelectedForm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-auto mt-8 mb-8">
        <Link to="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          กลับหน้าหลัก
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-10 drop-shadow">โปรแกรมคำนวณภาษีออนไลน์</h1>
        <div className="flex items-center justify-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step===1?'bg-blue-600 text-white':'bg-gray-200 text-gray-500'}`}>1</div>
          <div className="w-12 h-1 bg-blue-200 mx-2" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step===2?'bg-blue-600 text-white':'bg-gray-200 text-gray-500'}`}>2</div>
        </div>
        {step === 1 && (
          <>
            <Step1 selectedType={selectedType} setSelectedType={setSelectedType} selectedForm={selectedForm} setSelectedForm={setSelectedForm} />
            <div className="flex justify-center mt-8">
              <button
                className="btn btn-primary px-8 py-2 text-lg font-semibold shadow-lg rounded-xl"
                disabled={!selectedType || !selectedForm}
                onClick={() => setStep(2)}
              >
                ถัดไป
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <Step2 selectedForm={selectedForm} />
            <div className="flex justify-center mt-8">
              <button
                className="btn btn-outline px-8 py-2 text-lg font-semibold rounded-xl"
                onClick={() => setStep(1)}
              >
                ย้อนกลับ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
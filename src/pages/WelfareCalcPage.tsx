import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  calculatePersonalTax,
  calculatePersonalTaxHalfYear,
  calculateCorporateTax,
  calculateSpecialBusinessTax,
  calculateVAT,
  calculateWithholdingTax
} from '../utils/taxCalculations';

const TAX_CLASSES: Record<string, { value: string; label: string; }[]> = {
  personal: [
    { value: 'pnd90', label: 'ภ.ง.ด.90' },
    { value: 'pnd91', label: 'ภ.ง.ด.91' },
    { value: 'pnd94', label: 'ภ.ง.ด.94' },
  ],
  corporate: [
    { value: 'pnd50', label: 'ภ.ง.ด.50' },
    { value: 'pnd51', label: 'ภ.ง.ด.51' },
  ],
  special: [
    { value: 'pnd40', label: 'ภ.ธ.40' },
  ],
  vat: [
    { value: 'pnd30', label: 'ภ.พ.30' },
    { value: 'pnd36', label: 'ภ.พ.36' },
  ],
  withholding: [
    { value: 'pnd1', label: 'ภ.ง.ด.1' },
    { value: 'pnd3', label: 'ภ.ง.ด.3' },
    { value: 'pnd53', label: 'ภ.ง.ด.53' },
    { value: 'pnd1k', label: 'ภ.ง.ด.1ก' },
  ],
};

// ฟอร์มสำหรับภาษีเงินได้บุคคลธรรมดา ภ.ง.ด.90 (รายปี)
function PND90Form() {
  const [income, setIncome] = useState(0);
  const [deduct, setDeduct] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  
  const handleCalc = () => {
    const net = income - deduct;
    setTax(calculatePersonalTax(net));
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <div>
        <label className="block font-medium">รายได้ทั้งปี (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={income} onChange={e=>setIncome(Number(e.target.value))} />
      </div>
      <div>
        <label className="block font-medium">ค่าลดหย่อน (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={deduct} onChange={e=>setDeduct(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีที่ต้องชำระ: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

// ฟอร์มสำหรับภาษีเงินได้บุคคลธรรมดา ภ.ง.ด.91 (ครึ่งปี)
function PND91Form() {
  const [income, setIncome] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  
  const handleCalc = () => {
    setTax(calculatePersonalTaxHalfYear(income));
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <div>
        <label className="block font-medium">รายได้ครึ่งปี (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={income} onChange={e=>setIncome(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีที่ต้องชำระ: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

// ฟอร์มสำหรับภาษีเงินได้นิติบุคคล ภ.ง.ด.50
function PND50Form() {
  const [profit, setProfit] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  
  const handleCalc = () => {
    setTax(calculateCorporateTax(profit));
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <div>
        <label className="block font-medium">กำไรสุทธิ (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={profit} onChange={e=>setProfit(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีที่ต้องชำระ: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

// ฟอร์มสำหรับภาษีธุรกิจเฉพาะ ภ.ธ.40
function PND40Form() {
  const [revenue, setRevenue] = useState(0);
  const [businessType, setBusinessType] = useState('finance');
  const [tax, setTax] = useState<number|null>(null);
  
  const handleCalc = () => {
    setTax(calculateSpecialBusinessTax(revenue, businessType));
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <div>
        <label className="block font-medium">รายรับ (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={revenue} onChange={e=>setRevenue(Number(e.target.value))} />
      </div>
      <div>
        <label className="block font-medium">ประเภทธุรกิจ</label>
        <select className="select select-bordered w-full" value={businessType} onChange={e=>setBusinessType(e.target.value)}>
          <option value="finance">การเงิน/ให้กู้ยืม</option>
          <option value="property">อสังหาริมทรัพย์</option>
          <option value="insurance">ประกันชีวิต</option>
        </select>
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีที่ต้องชำระ: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

// ฟอร์มสำหรับภาษีมูลค่าเพิ่ม ภ.พ.30
function PND30Form() {
  const [sales, setSales] = useState(0);
  const [purchases, setPurchases] = useState(0);
  const [tax, setTax] = useState<{outputTax: number; inputTax: number; netTax: number}|null>(null);
  
  const handleCalc = () => {
    setTax(calculateVAT(sales, purchases));
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <div>
        <label className="block font-medium">ยอดขาย/รายได้ (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={sales} onChange={e=>setSales(Number(e.target.value))} />
      </div>
      <div>
        <label className="block font-medium">ยอดซื้อ/ค่าใช้จ่าย (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={purchases} onChange={e=>setPurchases(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">
          ภาษีที่ต้องชำระ: {tax.netTax.toLocaleString()} บาท
          <div className="text-sm text-gray-600 mt-2">
            (Output Tax: {tax.outputTax.toLocaleString()} - Input Tax: {tax.inputTax.toLocaleString()})
          </div>
        </div>
      )}
    </div>
  );
}

// ฟอร์มสำหรับภาษีหัก ณ ที่จ่าย ภ.ง.ด.1
function PND1Form() {
  const [salary, setSalary] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  
  const handleCalc = () => {
    setTax(calculateWithholdingTax(salary));
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <div>
        <label className="block font-medium">เงินเดือน (บาท/เดือน)</label>
        <input type="number" className="input input-bordered w-full" value={salary} onChange={e=>setSalary(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีที่ต้องหัก: {tax.toLocaleString()} บาท/เดือน</div>
      )}
    </div>
  );
}

const FORM_MAP: Record<string, React.FC> = {
  pnd90: PND90Form,
  pnd91: PND91Form,
  pnd50: PND50Form,
  pnd40: PND40Form,
  pnd30: PND30Form,
  pnd1: PND1Form,
};

export default function WelfareCalcPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || '';
  const [selectedClass, setSelectedClass] = useState<string|null>(null);

  const classList = TAX_CLASSES[type] || [];
  const FormComponent = selectedClass ? FORM_MAP[selectedClass] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/welfare" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          กลับหน้าเลือกประเภทภาษี
        </Link>
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">เลือกแบบฟอร์มภาษี</h1>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {classList.map(cls => (
            <button
              key={cls.value}
              className={`px-6 py-3 rounded-lg border-2 font-semibold text-lg shadow transition-colors duration-200 ${selectedClass === cls.value ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-blue-900 border-blue-200 hover:bg-blue-50'}`}
              onClick={() => setSelectedClass(cls.value)}
            >
              {cls.label}
            </button>
          ))}
        </div>
        {FormComponent && <FormComponent />}
        {!FormComponent && <div className="text-gray-500 text-center">กรุณาเลือกแบบฟอร์มภาษี</div>}
      </div>
    </div>
  );
} 
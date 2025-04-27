import React, { useState } from "react";

const TAX_TYPES = [
  { value: "pnd90", label: "ภ.ง.ด.90 - บุคคลธรรมดา (ทั่วไป)" },
  { value: "pnd91", label: "ภ.ง.ด.91 - บุคคลธรรมดา (เงินเดือน)" },
  { value: "pnd94", label: "ภ.ง.ด.94 - บุคคลธรรมดาครึ่งปี" },
  { value: "pnd50", label: "ภ.ง.ด.50 - นิติบุคคล (ประจำปี)" },
  { value: "pnd51", label: "ภ.ง.ด.51 - นิติบุคคล (ครึ่งปี)" },
  { value: "pnd1", label: "ภ.ง.ด.1 - หัก ณ ที่จ่าย (เงินเดือน)" },
  { value: "pnd3", label: "ภ.ง.ด.3 - หัก ณ ที่จ่าย (ค่าบริการ ฯลฯ)" },
  { value: "pnd53", label: "ภ.ง.ด.53 - หัก ณ ที่จ่าย (นิติบุคคล)" },
];

function PND90Form() {
  const [income, setIncome] = useState(0);
  const [deduct, setDeduct] = useState(0);
  const [tax, setTax] = useState<number|null>(null);

  const handleCalc = () => {
    // ตัวอย่างคำนวณภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได
    const net = income - deduct;
    let result = 0;
    if (net <= 150000) result = 0;
    else if (net <= 300000) result = (net-150000)*0.05;
    else if (net <= 500000) result = 7500 + (net-300000)*0.1;
    else if (net <= 750000) result = 27500 + (net-500000)*0.15;
    else if (net <= 1000000) result = 65000 + (net-750000)*0.2;
    else if (net <= 2000000) result = 115000 + (net-1000000)*0.25;
    else if (net <= 5000000) result = 365000 + (net-2000000)*0.3;
    else result = 1265000 + (net-5000000)*0.35;
    setTax(result);
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
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

function PND91Form() {
  // โครงสร้างคล้าย PND90Form แต่ลดรูปสำหรับเงินเดือนอย่างเดียว
  const [income, setIncome] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    let result = 0;
    if (income <= 150000) result = 0;
    else if (income <= 300000) result = (income-150000)*0.05;
    else if (income <= 500000) result = 7500 + (income-300000)*0.1;
    else if (income <= 750000) result = 27500 + (income-500000)*0.15;
    else if (income <= 1000000) result = 65000 + (income-750000)*0.2;
    else if (income <= 2000000) result = 115000 + (income-1000000)*0.25;
    else if (income <= 5000000) result = 365000 + (income-2000000)*0.3;
    else result = 1265000 + (income-5000000)*0.35;
    setTax(result);
  };
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block font-medium">เงินเดือนทั้งปี (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={income} onChange={e=>setIncome(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีที่ต้องชำระ: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

function PND94Form() {
  // ครึ่งปี: สมมุติใช้สูตรเดียวกับ 90 แต่หาร 2
  const [income, setIncome] = useState(0);
  const [deduct, setDeduct] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    const net = income - deduct;
    let result = 0;
    if (net <= 150000) result = 0;
    else if (net <= 300000) result = (net-150000)*0.05;
    else if (net <= 500000) result = 7500 + (net-300000)*0.1;
    else if (net <= 750000) result = 27500 + (net-500000)*0.15;
    else if (net <= 1000000) result = 65000 + (net-750000)*0.2;
    else if (net <= 2000000) result = 115000 + (net-1000000)*0.25;
    else if (net <= 5000000) result = 365000 + (net-2000000)*0.3;
    else result = 1265000 + (net-5000000)*0.35;
    setTax(result/2);
  };
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block font-medium">รายได้ 6 เดือน (บาท)</label>
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

function PND50Form() {
  // นิติบุคคล: สมมุติอัตรา 20% ของกำไรสุทธิ
  const [profit, setProfit] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    setTax(profit * 0.2);
  };
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
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

function PND51Form() {
  // นิติบุคคลครึ่งปี: สมมุติอัตรา 20% ของกำไรสุทธิครึ่งปี
  const [profit, setProfit] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    setTax(profit * 0.2);
  };
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block font-medium">กำไรสุทธิครึ่งปี (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={profit} onChange={e=>setProfit(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษี</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีที่ต้องชำระ: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

function PND1Form() {
  // หัก ณ ที่จ่ายเงินเดือน: สมมุติ 3% ของยอดจ่าย
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    setTax(amount * 0.03);
  };
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block font-medium">ยอดจ่ายเงินเดือน (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษีหัก ณ ที่จ่าย</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีหัก ณ ที่จ่าย: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

function PND3Form() {
  // หัก ณ ที่จ่ายค่าบริการ: สมมุติ 3% ของยอดจ่าย
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    setTax(amount * 0.03);
  };
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block font-medium">ยอดจ่ายค่าบริการ (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษีหัก ณ ที่จ่าย</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีหัก ณ ที่จ่าย: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

function PND53Form() {
  // หัก ณ ที่จ่ายนิติบุคคล: สมมุติ 3% ของยอดจ่าย
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState<number|null>(null);
  const handleCalc = () => {
    setTax(amount * 0.03);
  };
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block font-medium">ยอดจ่าย (บาท)</label>
        <input type="number" className="input input-bordered w-full" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary w-full" onClick={handleCalc}>คำนวณภาษีหัก ณ ที่จ่าย</button>
      {tax !== null && (
        <div className="text-lg font-bold text-green-600">ภาษีหัก ณ ที่จ่าย: {tax.toLocaleString()} บาท</div>
      )}
    </div>
  );
}

const FORM_MAP: Record<string, React.FC> = {
  pnd90: PND90Form,
  pnd91: PND91Form,
  pnd94: PND94Form,
  pnd50: PND50Form,
  pnd51: PND51Form,
  pnd1: PND1Form,
  pnd3: PND3Form,
  pnd53: PND53Form,
};

export default function TaxCalculatorPage() {
  const [taxType, setTaxType] = useState("pnd90");
  const FormComponent = FORM_MAP[taxType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center py-10">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">คำนวณภาษีออนไลน์</h1>
        <div className="mb-6">
          <label className="block font-medium mb-2">เลือกประเภทแบบ ภ.ง.ด.</label>
          <select className="select select-bordered w-full" value={taxType} onChange={e=>setTaxType(e.target.value)}>
            {TAX_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <FormComponent />
        <div className="mt-8 text-xs text-gray-500 text-center">
          * สูตรคำนวณเป็นตัวอย่างเบื้องต้น โปรดตรวจสอบกับกรมสรรพากรหรือผู้เชี่ยวชาญก่อนยื่นจริง
        </div>
      </div>
    </div>
  );
}

export { PND90Form, PND91Form, PND94Form, PND50Form, PND51Form, PND1Form, PND3Form, PND53Form }; 
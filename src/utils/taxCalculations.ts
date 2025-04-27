// สูตรคำนวณภาษีเงินได้บุคคลธรรมดา (ภ.ง.ด.90)
export function calculatePersonalTax(netIncome: number): number {
  if (netIncome <= 150000) return 0;
  if (netIncome <= 300000) return (netIncome-150000)*0.05;
  if (netIncome <= 500000) return 7500 + (netIncome-300000)*0.1;
  if (netIncome <= 750000) return 27500 + (netIncome-500000)*0.15;
  if (netIncome <= 1000000) return 65000 + (netIncome-750000)*0.2;
  if (netIncome <= 2000000) return 115000 + (netIncome-1000000)*0.25;
  if (netIncome <= 5000000) return 365000 + (netIncome-2000000)*0.3;
  return 1265000 + (netIncome-5000000)*0.35;
}

// สูตรคำนวณภาษีเงินได้บุคคลธรรมดาครึ่งปี (ภ.ง.ด.91)
export function calculatePersonalTaxHalfYear(income: number): number {
  return income * 0.05; // ตัวอย่างแบบง่าย
}

// สูตรคำนวณภาษีเงินได้นิติบุคคล (ภ.ง.ด.50)
export function calculateCorporateTax(profit: number): number {
  return profit * 0.2; // 20% ของกำไรสุทธิ
}

// สูตรคำนวณภาษีธุรกิจเฉพาะ (ภ.ธ.40)
export function calculateSpecialBusinessTax(revenue: number, businessType: string): number {
  const rates: Record<string, number> = {
    finance: 0.03,
    property: 0.03,
    insurance: 0.025,
  };
  return revenue * rates[businessType];
}

// สูตรคำนวณภาษีมูลค่าเพิ่ม (ภ.พ.30)
export function calculateVAT(sales: number, purchases: number): { 
  outputTax: number;
  inputTax: number;
  netTax: number;
} {
  const outputTax = sales * 0.07;
  const inputTax = purchases * 0.07;
  return {
    outputTax,
    inputTax,
    netTax: outputTax - inputTax
  };
}

// สูตรคำนวณภาษีหัก ณ ที่จ่าย (ภ.ง.ด.1)
export function calculateWithholdingTax(salary: number): number {
  const yearly = salary * 12;
  let result = 0;
  
  if (yearly > 150000) {
    if (yearly <= 300000) result = yearly * 0.05;
    else if (yearly <= 500000) result = yearly * 0.1;
    else if (yearly <= 750000) result = yearly * 0.15;
    else if (yearly <= 1000000) result = yearly * 0.2;
    else if (yearly <= 2000000) result = yearly * 0.25;
    else if (yearly <= 5000000) result = yearly * 0.3;
    else result = yearly * 0.35;
  }
  
  return result / 12; // คืนค่าเป็นยอดต่อเดือน
} 
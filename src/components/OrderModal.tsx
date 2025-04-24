import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    image: string;
    producer: string;
    category: string;
    colors?: string[];
  };
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
}

export default function OrderModal({ isOpen, onClose, product, selectedColor, onColorSelect }: OrderModalProps) {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
    productType: '',
  });
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productType) {
      alert('กรุณาเลือกประเภทสินค้า');
      return;
    }
    setStep('payment');
  };

  const totalPrice = parseInt(product.price) * formData.quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {step === 'form' ? 'สั่งซื้อสินค้า' : 'ชำระเงิน'}
            </h2>
            <button
              onClick={onClose}
              className={`${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'form' ? (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>{product.name}</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>ผู้ผลิต: {product.producer}</p>
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-blue-400' : 'text-primary-600'
                  }`}>฿{product.price}</p>
                </div>
              </div>

              {product.colors && (
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>เลือกสี</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => onColorSelect(color)}
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                          selectedColor === color
                            ? isDarkMode
                              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                              : 'border-blue-500 bg-blue-50 text-blue-700'
                            : isDarkMode
                              ? 'border-gray-600 text-gray-300 hover:border-gray-500'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>เลือกขนาดสินค้า</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, productType: 'S' })}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.productType === 'S'
                          ? isDarkMode
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                            : 'border-primary-600 bg-primary-50 text-primary-600'
                          : isDarkMode
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className={`font-medium ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>S</span>
                      <p className={`text-sm mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>ไซส์เล็ก</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, productType: 'M' })}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.productType === 'M'
                          ? isDarkMode
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                            : 'border-primary-600 bg-primary-50 text-primary-600'
                          : isDarkMode
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className={`font-medium ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>M</span>
                      <p className={`text-sm mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>ไซส์กลาง</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    ที่อยู่จัดส่ง *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className={`w-full rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    จำนวน *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className={`w-full rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  ดำเนินการต่อ
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>รายละเอียดการชำระเงิน</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>ราคาสินค้า</span>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>฿{product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>จำนวน</span>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>{formData.quantity} ชิ้น</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className={`font-medium ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>ยอดรวมทั้งสิ้น</span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-primary-600'
                    }`}>฿{totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 mb-4">
                  <QrCode className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`} />
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>QR Code สำหรับชำระเงิน</h3>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src="/qr-code-example.png"
                    alt="QR Code for payment"
                    className="w-full max-w-[200px] mx-auto"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('form')}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                กลับไปแก้ไขข้อมูล
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
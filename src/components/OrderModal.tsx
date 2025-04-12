import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    image: string;
    producer: string;
    category: string;
  };
}

export default function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
    productType: '',
  });

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
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 'form' ? 'สั่งซื้อสินค้า' : 'ชำระเงิน'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
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
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">ผู้ผลิต: {product.producer}</p>
                  <p className="text-primary-600 font-semibold">฿{product.price}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">เลือกขนาดสินค้า</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, productType: 'S' })}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.productType === 'S'
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className="font-medium">S</span>
                      <p className="text-sm text-gray-600 mt-1">ไซส์เล็ก</p>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, productType: 'M' })}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.productType === 'M'
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className="font-medium">M</span>
                      <p className="text-sm text-gray-600 mt-1">ไซส์กลาง</p>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, productType: 'L' })}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.productType === 'L'
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className="font-medium">L</span>
                      <p className="text-sm text-gray-600 mt-1">ไซส์ใหญ่</p>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, productType: 'XL' })}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.productType === 'XL'
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className="font-medium">XL</span>
                      <p className="text-sm text-gray-600 mt-1">ไซส์ใหญ่พิเศษ</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ที่อยู่จัดส่ง *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    จำนวน *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>ราคาสินค้า</span>
                    <span>฿{totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>ค่าจัดส่ง</span>
                    <span>฿50</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>รวมทั้งสิ้น</span>
                    <span className="text-primary-600">฿{totalPrice + 50}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  ดำเนินการต่อ
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <div className="bg-primary-50 rounded-lg p-6 mx-auto w-fit">
                  <QrCode className="w-48 h-48 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  สแกน QR Code เพื่อชำระเงิน
                </p>
              </div>

              <div className="text-left mb-6">
                <h3 className="font-semibold mb-2">รายละเอียดการชำระเงิน</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">ชื่อบัญชี:</span> {product.producer}
                  </p>
                  <p>
                    <span className="text-gray-600">ธนาคาร:</span> ธนาคารไทยพาณิชย์
                  </p>
                  <p>
                    <span className="text-gray-600">เลขที่บัญชี:</span> XXX-X-XXXXX-X
                  </p>
                  <p>
                    <span className="text-gray-600">ประเภทสินค้า:</span> {formData.productType}
                  </p>
                  <p>
                    <span className="text-gray-600">จำนวนเงิน:</span>{' '}
                    <span className="text-primary-600 font-semibold">
                      ฿{totalPrice + 50}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setStep('form')}
                  className="w-full border border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  กลับ
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
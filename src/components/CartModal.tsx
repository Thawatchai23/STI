import React from 'react';
import { X } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    image: string;
    producer: string;
  };
  onAddToCart: (productType: string) => void;
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
}

export default function CartModal({ isOpen, onClose, product, onAddToCart, selectedColor, onColorSelect }: CartModalProps) {
  if (!isOpen) return null;

  const isThermosProduct = product.name === "แก้วเก็บความเย็น";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 font-itim">
              {isThermosProduct ? 'เลือกสี' : 'เลือกขนาด'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 font-itim">{product.name}</h3>
              <p className="text-sm text-gray-600 font-itim">ผู้ผลิต: {product.producer}</p>
              <p className="text-primary-600 font-semibold font-itim">฿{product.price}</p>
            </div>
          </div>

          <div className="space-y-6">
            {isThermosProduct ? (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3 font-itim">เลือกสี</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onColorSelect('สีดำ')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'สีดำ'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-black rounded-full mb-2" />
                    <span className="font-medium font-itim">สีดำ</span>
                  </button>
                  <button
                    onClick={() => onColorSelect('สีขาว')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'สีขาว'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-white border-2 border-gray-200 rounded-full mb-2" />
                    <span className="font-medium font-itim">สีขาว</span>
                  </button>
                  <button
                    onClick={() => onColorSelect('สีน้ำเงิน')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'สีน้ำเงิน'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-blue-600 rounded-full mb-2" />
                    <span className="font-medium font-itim">สีน้ำเงิน</span>
                  </button>
                  <button
                    onClick={() => onColorSelect('สีเงิน')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'สีเงิน'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-gray-300 rounded-full mb-2" />
                    <span className="font-medium font-itim">สีเงิน</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3 font-itim">เลือกขนาด</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onColorSelect('S')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'S'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium font-itim">S</span>
                    <p className="text-sm text-gray-600 mt-1 font-itim">ไซส์เล็ก</p>
                  </button>
                  <button
                    onClick={() => onColorSelect('M')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'M'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium font-itim">M</span>
                    <p className="text-sm text-gray-600 mt-1 font-itim">ไซส์กลาง</p>
                  </button>
                  <button
                    onClick={() => onColorSelect('L')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'L'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium font-itim">L</span>
                    <p className="text-sm text-gray-600 mt-1 font-itim">ไซส์ใหญ่</p>
                  </button>
                  <button
                    onClick={() => onColorSelect('XL')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'XL'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium font-itim">XL</span>
                    <p className="text-sm text-gray-600 mt-1 font-itim">ไซส์ใหญ่พิเศษ</p>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (selectedColor) {
                onAddToCart(selectedColor);
                onClose();
              }
            }}
            disabled={!selectedColor}
            className={`w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors mt-6 font-itim ${
              !selectedColor && 'opacity-50 cursor-not-allowed'
            }`}
          >
            เพิ่มลงตะร้า
          </button>
        </div>
      </div>
    </div>
  );
}
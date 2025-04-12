import React, { useState } from 'react';
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
}

export default function CartModal({ isOpen, onClose, product, onAddToCart }: CartModalProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('กรุณาเลือกสีและขนาด');
      return;
    }
    onAddToCart(`${selectedColor}-${selectedSize}`);
    onClose();
  };

  const isFishSauce = product.name === 'น้ำพริกปลาทูสมุนไพร';
  const isFabric = product.name === 'แก้วเก็บความเย็น';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {isFishSauce ? 'เลือกสีขวด' : isFabric ? 'เลือกสีและขนาด' : 'เลือกประเภทสินค้า'}
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
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">ผู้ผลิต: {product.producer}</p>
              <p className="text-primary-600 font-semibold">฿{product.price}</p>
            </div>
          </div>

          <div className="space-y-6">
            {isFabric && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">เลือกสี</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedColor('black')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'black'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-black rounded-full mb-2" />
                    <span className="font-medium">สีดำ</span>
                  </button>
                  <button
                    onClick={() => setSelectedColor('white')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'white'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-white border border-gray-300 rounded-full mb-2" />
                    <span className="font-medium">สีขาว</span>
                  </button>
                </div>
              </div>
            )}

            {isFabric && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">เลือกขนาด</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedSize('S')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'S'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">S</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์เล็ก</p>
                  </button>
                  <button
                    onClick={() => setSelectedSize('M')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'M'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">M</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์กลาง</p>
                  </button>
                  <button
                    onClick={() => setSelectedSize('L')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'L'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">L</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์ใหญ่</p>
                  </button>
                  <button
                    onClick={() => setSelectedSize('XL')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'XL'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">XL</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์ใหญ่พิเศษ</p>
                  </button>
                </div>
              </div>
            )}

            {isFishSauce ? (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedColor('clear')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'clear'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-white border border-gray-300 rounded-full mb-2" />
                    <span className="font-medium">ขวดใส</span>
                  </button>
                  <button
                    onClick={() => setSelectedColor('brown')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'brown'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-amber-800 rounded-full mb-2" />
                    <span className="font-medium">ขวดสีน้ำตาล</span>
                  </button>
                  <button
                    onClick={() => setSelectedColor('green')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'green'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-emerald-600 rounded-full mb-2" />
                    <span className="font-medium">ขวดสีเขียว</span>
                  </button>
                  <button
                    onClick={() => setSelectedColor('blue')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedColor === 'blue'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-blue-600 rounded-full mb-2" />
                    <span className="font-medium">ขวดสีฟ้า</span>
                  </button>
                </div>
              </div>
            ) : !isFabric && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedSize('S')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'S'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">S</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์เล็ก</p>
                  </button>
                  <button
                    onClick={() => setSelectedSize('M')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'M'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">M</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์กลาง</p>
                  </button>
                  <button
                    onClick={() => setSelectedSize('L')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'L'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">L</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์ใหญ่</p>
                  </button>
                  <button
                    onClick={() => setSelectedSize('XL')}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      selectedSize === 'XL'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="font-medium">XL</span>
                    <p className="text-sm text-gray-600 mt-1">ไซส์ใหญ่พิเศษ</p>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors mt-6"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}
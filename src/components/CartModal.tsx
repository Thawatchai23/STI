import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { isDarkMode } = useTheme();
  
  if (!isOpen) return null;

  const isThermosProduct = product.name === "แก้วเก็บความเย็น";

  return (
    <div className="fixed inset-0 bg-black/90 flex items-end sm:items-center justify-center z-50">
      <div className="w-full sm:max-w-md bg-white dark:bg-gray-900/95 dark:backdrop-blur-sm dark:border dark:border-gray-800 rounded-t-3xl sm:rounded-2xl shadow-2xl sm:m-4 transition-all duration-300 ease-in-out transform translate-y-0">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-semibold font-itim text-gray-900 dark:text-gray-50 mb-6">
            {isThermosProduct ? 'เลือกสี' : 'เลือกขนาด'}
          </h2>

          <div className="flex items-center space-x-4 mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 rounded-xl object-cover dark:border dark:border-gray-700 shadow-md"
            />
            <div>
              <h3 className="font-semibold font-itim text-gray-900 dark:text-gray-50 text-lg mb-1">
                {product.name}
              </h3>
              <p className="text-sm font-itim text-gray-600 dark:text-gray-400 mb-2">
                ผู้ผลิต: {product.producer}
              </p>
              <p className="font-semibold font-itim text-lg text-primary-600 dark:text-blue-400">
                ฿{product.price}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {isThermosProduct ? (
              <div className="p-4 rounded-xl border bg-gray-50/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/50 dark:backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-4 font-itim text-gray-900 dark:text-gray-50">
                  เลือกสี
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => onColorSelect('สีดำ')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'สีดำ'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <div className="w-12 h-12 mx-auto bg-black rounded-full mb-3 shadow-lg ring-2 ring-gray-100 dark:ring-gray-700" />
                    <span className="font-medium font-itim text-gray-900 dark:text-gray-50">
                      สีดำ
                    </span>
                  </button>
                  <button
                    onClick={() => onColorSelect('สีขาว')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'สีขาว'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <div className="w-12 h-12 mx-auto bg-white border-2 border-gray-200 rounded-full mb-3" />
                    <span className="font-medium font-itim text-gray-900 dark:text-gray-50">
                      สีขาว
                    </span>
                  </button>
                  <button
                    onClick={() => onColorSelect('สีน้ำเงิน')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'สีน้ำเงิน'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <div className="w-12 h-12 mx-auto bg-blue-600 rounded-full mb-3" />
                    <span className="font-medium font-itim text-gray-900 dark:text-gray-50">
                      สีน้ำเงิน
                    </span>
                  </button>
                  <button
                    onClick={() => onColorSelect('สีเงิน')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'สีเงิน'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <div className="w-12 h-12 mx-auto bg-gray-300 rounded-full mb-3" />
                    <span className="font-medium font-itim text-gray-900 dark:text-gray-50">
                      สีเงิน
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border bg-gray-50/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/50 dark:backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-4 font-itim text-gray-900 dark:text-gray-50">
                  เลือกขนาด
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => onColorSelect('S')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'S'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <span className="font-medium font-itim text-2xl text-gray-900 dark:text-gray-50 mb-2 block">
                      S
                    </span>
                    <p className="text-sm font-itim text-gray-600 dark:text-gray-400">
                      ไซส์เล็ก
                    </p>
                  </button>
                  <button
                    onClick={() => onColorSelect('M')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'M'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <span className="font-medium font-itim text-2xl text-gray-900 dark:text-gray-50 mb-2 block">
                      M
                    </span>
                    <p className="text-sm font-itim text-gray-600 dark:text-gray-400">
                      ไซส์กลาง
                    </p>
                  </button>
                  <button
                    onClick={() => onColorSelect('L')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'L'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <span className="font-medium font-itim text-2xl text-gray-900 dark:text-gray-50 mb-2 block">
                      L
                    </span>
                    <p className="text-sm font-itim text-gray-600 dark:text-gray-400">
                      ไซส์ใหญ่
                    </p>
                  </button>
                  <button
                    onClick={() => onColorSelect('XL')}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      selectedColor === 'XL'
                        ? 'border-primary-600 bg-primary-50/50 text-primary-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-lg dark:shadow-blue-500/20 scale-[0.98] transform'
                        : 'border-gray-200 hover:border-primary-300 dark:border-gray-700/50 dark:hover:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    <span className="font-medium font-itim text-2xl text-gray-900 dark:text-gray-50 mb-2 block">
                      XL
                    </span>
                    <p className="text-sm font-itim text-gray-600 dark:text-gray-400">
                      ไซส์ใหญ่พิเศษ
                    </p>
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
            className={`w-full py-4 rounded-xl transition-all duration-300 mt-8 font-itim text-lg ${
              selectedColor
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg hover:shadow-xl dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 dark:shadow-blue-500/20 transform hover:scale-[0.98]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800/80 dark:text-gray-500'
            }`}
          >
            เพิ่มลงตะร้า
          </button>
        </div>
      </div>
    </div>
  );
}
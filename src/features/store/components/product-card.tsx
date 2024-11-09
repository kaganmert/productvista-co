import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="col-span-full md:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="relative">
          <img
            className="w-full aspect-[4/3] object-cover"
            src={product.images[0]}
            alt={product.name}
          />
        </div>
        <div className="grow flex flex-col p-5">
          <div className="grow">
            <header className="mb-2">
              <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">
                {product.name}
              </h3>
              <div className="text-sm">{product.description}</div>
            </header>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2 mr-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    <svg
                      className={`fill-current ${star <= product.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </span>
                ))}
              </div>
              <div className="inline-flex text-sm font-medium text-yellow-600">
                {product.rating}
              </div>
            </div>
            <div>
              <div
                className={`inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5`}
              >
                ${product.price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

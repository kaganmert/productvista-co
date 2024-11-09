import { useState } from 'react';
import { Star, Calendar } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Product } from '../types';

export default function ProductDetail({ product }: { product: Product }) {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className="relative w-20 h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>
          </div>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Expected Arrival: {product.arrivalDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

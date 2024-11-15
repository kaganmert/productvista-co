import { Star, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Product } from '../types';
import { ImageSlider } from '@/components/ui/slider';
import { useAverageRating } from '@/features/comments/api/get-comments';

// @ts-ignore
export default function ProductDetail({ product }: { product: Product }) {
  const averageRating = useAverageRating(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <ImageSlider images={product.images} />
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
                    i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({averageRating.toFixed(1)})</span>
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

import React from 'react';
import { ProductCard } from './product-card';
import { Product } from '../types';

interface ShopCardsProps {
  products: Product[];
}

export const ShopCards: React.FC<ShopCardsProps> = ({ products }) => {
  return (
    <React.Fragment>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </React.Fragment>
  );
};

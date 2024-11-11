import { Spinner } from '@/components/ui/spinner';

import { useProduct } from '../api/get-product';
import ProductDetail from './product-detail';

export const ProductView = ({ productId }: { productId: string }) => {
  const productQuery = useProduct({
    productId,
  });

  if (productQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const product = productQuery?.data;

  if (!product) return null;
  // @ts-ignore
  return <ProductDetail product={product} />;
};

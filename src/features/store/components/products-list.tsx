import { Spinner } from '@/components/ui/spinner';
import { useProducts } from '../api/get-products';
import { ShopCards } from './shop-cards';
import { Product } from '../types';

export const ProductsList = () => {
  const productsQuery = useProducts({ queryConfig: {} });

  if (productsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const products: Product[] = (productsQuery.data ?? []) as Product[];

  if (!products.length) return null;

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="grow">
          <div className="w-full max-w-9xl mx-auto">
            <div className="mb-5">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Find the right product for you
              </h1>
            </div>

            <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">
                  {products.length} Items
                </div>
                <div>
                  <div className="grid grid-cols-12 gap-6">
                    <ShopCards products={products} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { useProduct, getProductQueryOptions } from '@/features/store/api/get-product';
import { ProductView } from '@/features/store/components/product-view';

export const productLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const productId = params.productId as string;

    const productQuery = getProductQueryOptions(productId);

    const promises = [
      queryClient.getQueryData(productQuery.queryKey) ??
        (await queryClient.fetchQuery(productQuery)),
    ] as const;

    const [product] = await Promise.all(promises);

    return {
      product,
    };
  };

export const ProductRoute = () => {
  const params = useParams();
  const productId = params.productId as string;
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

  const product = productQuery.data;

  if (!product) return null;

  return (
    <>
      <ProductView productId={productId} />
    </>
  );
};

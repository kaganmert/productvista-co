import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@/components/ui/spinner';
import { useProduct, getProductQueryOptions } from '@/features/store/api/get-product';
import { ProductView } from '@/features/store/components/product-view';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { Comments } from '@/features/comments/components/comments';

export const productLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const productId = params.productId as string;

    const productQuery = getProductQueryOptions(productId);
    const commentsQuery = getInfiniteCommentsQueryOptions(productId);

    const promises = [
      queryClient.getQueryData(productQuery.queryKey) ??
        (await queryClient.fetchQuery(productQuery)),
      queryClient.getQueryData(commentsQuery.queryKey) ??
        (await queryClient.fetchInfiniteQuery(commentsQuery)),
    ] as const;

    const [product, comments] = await Promise.all(promises);

    return {
      product,
      comments,
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
      <ErrorBoundary fallback={<div>Failed to load comments. Try to refresh the page.</div>}>
        <Comments productId={productId} />
      </ErrorBoundary>
    </>
  );
};

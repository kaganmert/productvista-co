import { ContentLayout } from '@/components/layouts';
import { useUser } from '@/lib/auth';
import { getProductsQueryOptions } from '@/features/store/api/get-products';
import { QueryClient } from '@tanstack/react-query';
import { ProductsList } from '@/features/store/components/products-list';
import { WelcomeBanner } from '@/features/store/components/welcome-banner';

export const productsLoader = (queryClient: QueryClient) => async () => {
  const query = getProductsQueryOptions();

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const StoreRoute = () => {
  const user = useUser();

  return (
    <ContentLayout title="Store">
      <WelcomeBanner username={user.data?.username} />
      <div className="mt-4">
        <ProductsList />
      </div>
    </ContentLayout>
  );
};

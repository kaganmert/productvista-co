import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Product } from '../types';

export const getProduct = ({ productId }: { productId: string }): Promise<{ data: Product }> => {
  return api.get(`/products/${productId}`);
};

export const getProductQueryOptions = (productId: string) => {
  return queryOptions({
    queryKey: ['product', productId],
    queryFn: () => getProduct({ productId }),
  });
};

type UseProductOptions = {
  productId: string;
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
};

export const useProduct = ({ productId, queryConfig }: UseProductOptions) => {
  return useQuery({
    ...getProductQueryOptions(productId),
    ...queryConfig,
  });
};

import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Product } from '../types';

export const getProducts = (): Promise<{
  data: Product[];
}> => {
  return api.get(`/products`);
};

export const getProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });
};

type UseProductsOptions = {
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ queryConfig }: UseProductsOptions) => {
  return useQuery({
    ...getProductsQueryOptions(),
    ...queryConfig,
  });
};

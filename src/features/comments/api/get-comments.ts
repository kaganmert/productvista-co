import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Comment } from '../types';

interface GetCommentsResponse {
  data: Comment[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export const getComments = ({
  productId,
  page = 1,
}: {
  productId: string;
  page?: number;
}): Promise<GetCommentsResponse> => {
  return api.get(`/comments`, {
    params: {
      productId,
      page,
    },
  });
};

export const getCommentsQueryOptions = (productId: string) => {
  return queryOptions({
    queryKey: ['comments', productId],
    queryFn: () => getComments({ productId }),
  });
};

export const getInfiniteCommentsQueryOptions = (productId: string) => {
  return infiniteQueryOptions({
    queryKey: ['comments', 'infinite', productId],
    queryFn: ({ pageParam = 1 }) => {
      return getComments({ productId, page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page === lastPage.meta.totalPages) return undefined;
      return lastPage.meta.page + 1;
    },
    initialPageParam: 1,
  });
};

type UseCommentsOptions = {
  productId: string;
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useComments = ({ productId, queryConfig }: UseCommentsOptions) => {
  return useQuery({
    ...getCommentsQueryOptions(productId),
    ...queryConfig,
  });
};

export const useInfiniteComments = ({ productId }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions(productId),
  });
};

export const useAverageRating = (productId: string) => {
  const { data: commentsData } = useQuery({
    ...getCommentsQueryOptions(productId),
    select: (data) => {
      if (!data?.data.length) return 0;

      const totalRating = data.data.reduce((sum, comment) => sum + comment.rating, 0);
      return totalRating / data.data.length;
    },
  });

  return commentsData ?? 0;
};

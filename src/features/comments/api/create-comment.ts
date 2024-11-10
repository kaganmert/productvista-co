import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { Comment } from '../types';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const createCommentInputSchema = z.object({
  text: z.string().min(1, 'Please enter your review'),
});

export type CreateCommentDTO = {
  text: string;
  rating: number;
  productId: string;
};

export type CommentsResponse = {
  data: Comment[];
  meta: {
    total: number;
  };
};

export const createComment = (data: CreateCommentDTO): Promise<Comment> => {
  return api.post('/comments', data);
};

type UseCreateCommentOptions = {
  productId: string;
  username: string;
  mutationConfig?: MutationConfig<typeof createComment>;
};

export const useCreateComment = ({
  productId,
  username,
  mutationConfig,
}: UseCreateCommentOptions) => {
  const queryClient = useQueryClient();
  const commentsQueryKey = ['comments', productId];

  return useMutation({
    mutationFn: (data: CreateCommentDTO) => createComment(data),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: commentsQueryKey });

      const previousComments = queryClient.getQueryData<CommentsResponse>(commentsQueryKey);

      const optimisticComment: Comment = {
        id: nanoid(),
        text: newComment.text,
        rating: newComment.rating,
        productId: newComment.productId,
        username: username,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<CommentsResponse>(commentsQueryKey, (old) => ({
        data: old?.data ? [optimisticComment, ...old.data] : [optimisticComment],
        meta: {
          total: (old?.meta.total || 0) + 1,
        },
      }));

      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentsQueryKey, context.previousComments);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsQueryKey });
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
    },
    ...mutationConfig,
  });
};

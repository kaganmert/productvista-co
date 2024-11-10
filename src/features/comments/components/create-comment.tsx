import { Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, Textarea } from '@/components/ui/form';
import { useCreateComment, createCommentInputSchema } from '../api/create-comment';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';

type CreateCommentFormProps = {
  productId: string;
  onSuccess?: () => void;
};

export const CreateCommentForm = ({ productId, onSuccess }: CreateCommentFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { addNotification } = useNotifications();
  const { data: user } = useUser();

  const createCommentMutation = useCreateComment({
    productId,
    username: user?.username || 'anonymous',
    mutationConfig: {
      onSuccess: () => {
        setRating(0);
        onSuccess?.();
        addNotification({
          type: 'success',
          title: 'Review submitted successfully',
        });
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: 'Failed to submit review',
        });
      },
    },
  });

  const handleSubmit = (values: z.infer<typeof createCommentInputSchema>) => {
    if (rating === 0) {
      addNotification({
        type: 'error',
        title: 'Please select a rating',
      });
      return;
    }

    createCommentMutation.mutate({
      text: values.text,
      rating,
      productId,
    });
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-4">Add a Review</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= (hoveredRating || rating)
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'fill-none text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <Form onSubmit={handleSubmit} schema={createCommentInputSchema}>
        {({ register, formState }) => (
          <>
            <Textarea
              label="Your Review"
              error={formState.errors['text']}
              registration={register('text')}
              placeholder="Share your thoughts about this product..."
            />

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full"
                isLoading={createCommentMutation.isPending}
                disabled={createCommentMutation.isPending || rating === 0}
              >
                Submit Review
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

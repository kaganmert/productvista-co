import { CommentsList } from './comments-list';
import { CreateCommentForm } from './create-comment';

type CommentsProps = {
  productId: string;
};

export const Comments = ({ productId }: CommentsProps) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <CreateCommentForm productId={productId} />
      </div>
      <CommentsList productId={productId} />
    </div>
  );
};

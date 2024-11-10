export interface Comment {
  id: string;
  user: string;
  content: string;
  date: string;
  rating?: number;
}

export const mockComments: Comment[] = [
  {
    id: '1',
    user: 'John Doe',
    content: 'This is an excellent product! The quality is outstanding.',
    date: '2024-03-15',
    rating: 5,
  },
  {
    id: '2',
    user: 'Sarah Smith',
    content: 'Great value for money. The delivery was quick.',
    date: '2024-03-14',
    rating: 4,
  },
  {
    id: '3',
    user: 'Mike Johnson',
    content: 'Could be better. The build quality is decent.',
    date: '2024-03-13',
    rating: 3,
  },
];

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
      <div className="space-y-4 mb-6">
        {mockComments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user}`}
                    alt={comment.user}
                  />
                  <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{comment.user}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="w-full md:w-auto" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </form>
    </div>
  );
}

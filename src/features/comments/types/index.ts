export interface Comment {
  id: string;
  text: string;
  rating: number;
  productId: string;
  username: string;
  createdAt: string;
}

export interface CommentsResponse {
  data: Comment[];
  meta: {
    total: number;
  };
}

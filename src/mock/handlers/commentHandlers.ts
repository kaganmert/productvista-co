import { HttpResponse, http } from 'msw';
import { db, persistDb } from '../utils/db';
import { networkDelay, requireAuth } from '../utils';
import { nanoid } from 'nanoid';
import { env } from '@/config/env';

type CreateCommentBody = {
  text: string;
  rating: number;
  productId: string;
};

export const commentHandlers = [
  http.get(`${env.API_URL}/comments`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const url = new URL(request.url);
      const productId = url.searchParams.get('productId') || '';

      const comments = db.comment.findMany({
        where: {
          productId: {
            equals: productId,
          },
        },
      });

      return HttpResponse.json({
        data: comments,
        meta: {
          total: comments.length,
        },
      });
    } catch (error: any) {
      return HttpResponse.json({ message: error?.message || 'Server Error' }, { status: 500 });
    }
  }),

  http.post(`${env.API_URL}/comments`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const data = (await request.json()) as CreateCommentBody;

      const comment = db.comment.create({
        id: nanoid(),
        username: user?.username,
        createdAt: new Date().toISOString(),
        ...data,
      });

      await persistDb('comment');

      return HttpResponse.json({ data: comment });
    } catch (error: any) {
      return HttpResponse.json({ message: error?.message || 'Server Error' }, { status: 500 });
    }
  }),

  http.delete(`${env.API_URL}/comments/:commentId`, async ({ params, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }

      const commentId = params.commentId as string;
      const result = db.comment.delete({
        where: {
          id: {
            equals: commentId,
          },
          username: {
            equals: user?.username,
          },
        },
      });

      await persistDb('comment');
      return HttpResponse.json({ data: result });
    } catch (error: any) {
      return HttpResponse.json({ message: error?.message || 'Server Error' }, { status: 500 });
    }
  }),
];

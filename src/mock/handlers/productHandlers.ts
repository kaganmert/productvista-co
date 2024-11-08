import { HttpResponse, http } from "msw";
import { db, persistDb } from "../utils/db";
import { networkDelay, requireAuth } from "../utils";
import { nanoid } from "nanoid";

export const productHandlers = [
  http.get("/products", async ({ cookies }) => {
    await networkDelay();

    const { error } = requireAuth(cookies);
    if (error) {
      return new HttpResponse("Unauthorized", { status: 401 });
    }

    const products = db.product.getAll();
    return HttpResponse.json(products);
  }),

  http.get("/products/:id", async ({ params, cookies }) => {
    await networkDelay();

    const { error } = requireAuth(cookies);
    if (error) {
      return new HttpResponse("Unauthorized", { status: 401 });
    }

    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const product = db.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (!product) {
      return new HttpResponse("Product not found", { status: 404 });
    }

    const comments = db.comment.findMany({
      where: {
        productId: {
          equals: id,
        },
      },
    });

    const averageRating = comments.length
      ? comments.reduce((acc, comment) => acc + comment.rating, 0) /
        comments.length
      : product.rating;

    return HttpResponse.json({
      ...product,
      comments,
      averageRating,
    });
  }),

  http.post("/products/:id/comments", async ({ params, request, cookies }) => {
    await networkDelay();

    const { error } = requireAuth(cookies);
    if (error) {
      return new HttpResponse("Unauthorized", { status: 401 });
    }

    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const product = db.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (!product) {
      return new HttpResponse("Product not found", { status: 404 });
    }

    const body = await request.json() as { text: string; rating: number };
    const { text, rating } = body;

    const comment = db.comment.create({
      id: nanoid(),
      productId: id,
      text,
      rating,
      createdAt: new Date().toISOString(),
    });

    const comments = db.comment.findMany({
      where: {
        productId: {
          equals: id,
        },
      },
    });

    const averageRating =
      comments.reduce((acc, c) => acc + c.rating, 0) / comments.length;

    db.product.update({
      where: {
        id: {
          equals: id,
        },
      },
      data: {
        rating: averageRating,
      },
    });

    await persistDb("comment");
    await persistDb("product");

    return HttpResponse.json(comment);
  }),
];

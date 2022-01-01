import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { ParsedUrlQuery } from 'querystring';

export interface IParams extends ParsedUrlQuery {
  userId: string;
}

export interface IPostData {
  title: string;
  userId: number;
  content: string;
}
export interface TypedRequestBody<T> extends Request {
  body: T;
}

const router = Router();
const { post, user } = new PrismaClient();

router.get('/:user_id', async (req: Request, res: Response) => {
  const { userId } = req.params as IParams;

  const posts = await post.findMany({
    where: {
      userId: parseInt(userId),
    },
    select: {
      title: true,
      created_at: true,
      post: true,
      user: true,
    },
  });

  return res.send(posts);
});

router.post('/', async (req: TypedRequestBody<IPostData>, res: Response) => {
  const { content, title, userId } = req.body;

  const userExist = await user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      message: 'user not found',
    });
  }

  const newPost = await post.create({
    data: {
      title,
      userId,
      post: content,
    },
  });

  return res.json(newPost);
});

export default router;

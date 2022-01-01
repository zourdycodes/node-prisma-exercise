import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ParsedUrlQuery } from 'querystring';

const router = Router();
const { post, user } = new PrismaClient();

interface IParams extends ParsedUrlQuery {
  userId: string;
}

router.get('/:user_id', async (req: Request, res: Response) => {
  const { userId } = req.params as IParams;

  const posts = await post.findMany({
    where: {
      user_id: parseInt(userId),
    },
    select: {
      title: true,
      created_at: true,
      post: true,
      user: true,
    },
  });

  res.send(posts);
});

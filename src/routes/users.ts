import { Router, Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { TypedRequestBody } from '../types';

const router = Router();
const { user } = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  const users = await user.findMany({
    select: {
      username: true,
      posts: true,
    },
  });

  return res.json(users);
});

router.post(
  '/',
  async (req: TypedRequestBody<Prisma.UserCreateInput>, res: Response) => {
    const { username } = req.body;

    // check if user exist
    const userExist = await user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });

    if (userExist) {
      return res.status(400).json({
        msg: 'user already exists',
      });
    }

    const newUser = await user.create({
      data: {
        username,
      },
    });

    return res.json(newUser);
  }
);

export default router;

import { ParsedUrlQuery } from 'querystring';
import { Request } from 'express';
import { Prisma } from '@prisma/client';

export interface IParams extends ParsedUrlQuery {
  userId: string;
}

export interface IPostData extends Prisma.PostCreateManyInput {
  content?: string;
  username?: string;
}

export interface TypedRequestBody<T> extends Request {
  body: T;
}

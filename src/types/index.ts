import { ParsedUrlQuery } from 'querystring';
import { Request } from 'express';

export interface IParams extends ParsedUrlQuery {
  userId: string;
}

export interface IPostData {
  title?: string;
  userId?: number;
  content?: string;
  username?: string;
}

export interface TypedRequestBody<T> extends Request {
  body: T;
}

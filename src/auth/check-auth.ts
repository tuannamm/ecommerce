import { NextFunction, Request, Response } from 'express';
import { InferSchemaType } from 'mongoose';

import { FORBIDDEN_ERROR } from '../constants';
import { apiKeySchema } from '../models';
import { ApiKeyService } from '../services';

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

type ApiKey = InferSchemaType<typeof apiKeySchema>;

// Make objKey known on every Express Request, so middlewares type-check against router.use()
declare global {
  namespace Express {
    interface Request {
      objKey?: ApiKey;
    }
  }
}

// Express 5 forwards rejected promises to the error handler, so no try/catch needed
export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) {
    return res.status(403).json({ message: FORBIDDEN_ERROR });
  }
  const objKey = await ApiKeyService.findApiKeyById(key);
  if (!objKey) {
    return res.status(403).json({ message: FORBIDDEN_ERROR });
  }
  req.objKey = objKey;
  return next();
};

export const permission = (permission: ApiKey['permissions'][number]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.objKey?.permissions.includes(permission)) {
      return res.status(403).json({ message: FORBIDDEN_ERROR });
    }
    return next();
  };
};

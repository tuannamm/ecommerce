import { NextFunction, Request, Response } from 'express';
import { AccessService } from '../services';

export class AccessController {
  static signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await AccessService.signup(req.body);

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}

import { NextFunction, Request, Response } from 'express';

export class AccessController {
  static signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        message: 'Register success',
      });
    } catch (error) {
      next(error);
    }
  };
}

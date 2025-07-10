import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import { ENV } from 'src/configs/env';
import type { User } from '@packages/types/data';
import { responseData } from './request';

export const authenticateToken = (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   const token = req.headers.authorization as string;

   if (token === null) {
      return res.status(401).json(
         responseData({
            status: 401,
            success: false,
            message: 'Unauthorized',
         }),
      );
   }

   jwt.verify(token, ENV.SECRET_KEY, (err, decoded) => {
      if (typeof decoded === 'object') {
         if (err || !decoded?.user?.id) {
            return res.status(403).json(
               responseData({
                  status: 401,
                  success: false,
                  message: 'Access denied',
               }),
            );
         }

         req.user = decoded as User;

         return next();
      }

      return res.status(403).json(
         responseData({
            status: 401,
            success: false,
            message: 'Access denied',
         }),
      );
   });
};

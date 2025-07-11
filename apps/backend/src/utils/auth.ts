import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from 'src/configs/env';
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

         req.auth = {};
         req.auth = decoded as Request['auth'];

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

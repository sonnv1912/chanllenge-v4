import type { QueryParams } from '@packages/types';
import type { User } from '@packages/types/data';
import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import { users } from 'src/data/users';
import { responseData } from 'src/utils/request';

export const getUserList = async (req: Request, res: Response) => {
   const result = await users.getList(
      req.query as unknown as QueryParams<User>,
   );

   res.json(
      responseData({
         status: 200,
         success: true,
         data: result,
      }),
   );
};

export const updateUser = async (req: Request, res: Response) => {
   const user = await users.getByEmail(req.body.email);

   const body: User = {
      ...req.body,
      status: req.body.status || user.data?.status || 'active',
      otp: '',
      id: user.data?.status || randomUUID(),
   };

   if (user.success) {
      await user.ref?.update(body);

      return res.json(
         responseData({
            data: body,
            status: 200,
            success: true,
         }),
      );
   }

   try {
      await user.collection.add(body);

      return res.json(
         responseData({
            data: body,
            status: 200,
            success: true,
         }),
      );
   } catch (error) {
      return res.status(500).json(
         responseData({
            status: 200,
            success: true,
            message: (error as Error).message || 'Error while create user',
         }),
      );
   }
};

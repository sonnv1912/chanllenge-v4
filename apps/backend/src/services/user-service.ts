import type { User } from '@packages/types/data';
import type { Request, Response } from 'express';
import { users } from 'src/data/users';
import type { QueryParams } from 'src/types/request';
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

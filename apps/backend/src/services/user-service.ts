import type { QueryParams } from '@packages/types';
import type { User } from '@packages/types/data';
import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import { users } from 'src/data/users';
import { responseData } from 'src/utils/request';
import { mail } from 'src/utils/mail';
import { TOTP } from 'otpauth';
import { env, routes } from '@packages/configs';
import { getList } from 'src/utils/firebase';

export const getUserList = async (req: Request, res: Response) => {
   try {
      const result = await getList(
         '/users',
         req.query as unknown as QueryParams<User>,
      );

      res.json(result);
   } catch (error) {
      res.status(500).json(
         responseData({
            status: 500,
            success: false,
            message: (error as Error).message || 'Error while get use list',
         }),
      );
   }
};

export const updateUser = async (req: Request, res: Response) => {
   try {
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

      const otp = new TOTP({
         digits: 6,
      }).generate();

      body.otp = otp;
      body.status = 'inactive';

      await user.collection.add(body);

      await mail.send({
         title: 'Verify your email',
         content: `This is your verify code please don't share to anyone, your OTP: ${otp} and open this link to verify your email: ${env.BASE_URL}${routes.verifyOtp}/${body.email}`,
         to_email: body.email,
      });

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

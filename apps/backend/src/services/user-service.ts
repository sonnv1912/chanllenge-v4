import { env, routes } from '@packages/configs';
import type { User } from '@packages/types/data';
import type { Request, Response } from 'express';
import { TOTP } from 'otpauth';
import { db, getList } from 'src/utils/firebase';
import { mail } from 'src/utils/mail';
import { responseData } from 'src/utils/request';

export const getUserList = async (_req: Request, res: Response) => {
   try {
      const result = await getList('/users');

      return res.json(result);
   } catch (error) {
      res.status(500).json(
         responseData({
            status: 500,
            success: false,
            message: (error as Error).message || 'Error while get user list',
         }),
      );
   }
};

export const updateUser = async (req: Request, res: Response) => {
   try {
      const body: User = req.body as User;

      if (!req.body.id) {
         const otp = new TOTP({
            digits: 6,
         }).generate();

         body.otp = otp;
         body.status = 'inactive';

         await db.collection('/users').add(body);

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
      }

      const userRef = db.doc(`/users/${req.body.id}`);
      const userData = (
         await db.doc(`/users/${req.body.id}`).get()
      ).data() as User;

      if (userData.email === req.body.email.trim()) {
         await userRef?.update(body);

         return res.json(
            responseData({
               data: body,
               status: 200,
               success: true,
            }),
         );
      }

      const emailCount = (
         await db
            .collection('/users')
            .where('email', '==', req.body.email.trim())
            .limit(1)
            .get()
      ).size;

      if (emailCount === 1) {
         return res.status(400).json(
            responseData({
               status: 400,
               success: false,
               message: `Already user with email ${req.body.email}`,
            }),
         );
      }
   } catch (error) {
      return res.status(500).json(
         responseData({
            status: 200,
            success: true,
            message: (error as Error).message || 'Error while update user',
         }),
      );
   }
};

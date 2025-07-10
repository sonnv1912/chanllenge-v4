import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TOTP } from 'otpauth';
import { ENV } from 'src/configs/env';
import { users } from 'src/data/users';
import { mail } from 'src/utils/mail';
import { responseData } from 'src/utils/request';

export const login = async (req: Request, res: Response) => {
   const body = {
      email: req.body.email,
   };

   try {
      const user = await users.getByEmail(body.email);

      if (!user.success) {
         res.status(404).send(
            responseData({
               status: 404,
               success: false,
               message: 'No users found',
            }),
         );

         return;
      }

      const otp = new TOTP({
         digits: 6,
      }).generate();

      await user?.ref?.update({
         otp,
      });

      await mail.send({
         title: 'Verify OTP code',
         content: `This is your verify code please don't share to anyone, your OTP: ${otp}`,
         to_email: body.email,
      });

      res.send(
         responseData({
            status: 200,
            success: true,
         }),
      );
   } catch (error) {
      res.status(500).send(
         responseData({
            status: 500,
            success: false,
            message: (error as Error).message || 'Error while fetching users',
         }),
      );
   }
};

export const verifyOtp = async (req: Request, res: Response) => {
   const body = {
      email: req.body.email,
      otp: req.body.otp,
   };

   try {
      const user = await users.getByEmail(body.email);

      if (!user.success) {
         res.status(404).send(
            responseData({
               status: 404,
               success: false,
               message: 'No users found',
            }),
         );

         return;
      }

      if (user?.data?.otp === body.otp) {
         const token = jwt.sign(
            {
               user: user.data,
            },
            ENV.SECRET_KEY,
            {
               expiresIn: '1d',
            },
         );

         await user.ref?.update({
            otp: '',
         });

         res.json(
            responseData({
               data: token,
               status: 200,
               success: true,
            }),
         );
      }
   } catch (error) {
      res.status(500).send(
         responseData({
            status: 500,
            success: false,
            message:
               (error as Error).message ||
               'Your OTP incorrect, double check again',
         }),
      );
   }
};

export const logout = (req: Request, res: Response) => {
   req.user = undefined;

   return res.send(
      responseData({
         status: 200,
         success: true,
      }),
   );
};

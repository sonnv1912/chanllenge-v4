import { db } from 'src/utils/firebase';
import type { Request, Response } from 'express';
import { responseData } from 'src/utils/request';
import type { User } from '@packages/types/data';
import type { DocumentReference } from 'firebase-admin/firestore';

export const getChatList = async (req: Request, res: Response) => {
   try {
      const chatRef = db
         .collection('/chats')
         .where(
            'users',
            'array-contains',
            db.doc(`/users/${req.auth?.user?.id}`),
         );

      const result = await Promise.all(
         (await chatRef.get()).docs.map(async (doc) => {
            const data = doc.data();
            const last_message = (await data.last_message.get()).data();
            const sender = (await last_message.sender.get()).data() as User;
            const users = (await Promise.all(
               data.users.map(async (t: DocumentReference) =>
                  (await t.get()).data(),
               ),
            )) as User[];

            const item = {
               id: doc.id,
               room_name: users
                  .filter((t) => t.email !== req.auth?.user?.email)
                  .map((t) => t.name)
                  .join(', '),
               sender: {
                  name: sender.name,
               },
               last_message: last_message.content,
            };

            return item;
         }),
      );

      return res.json(
         responseData({
            status: 200,
            success: true,
            data: result,
         }),
      );
   } catch (error) {
      return res.status(500).json(
         responseData({
            status: 500,
            success: false,
            message: (error as Error).message || 'Error while get chat list',
         }),
      );
   }
};

import type { User } from '@packages/types/data';
import type { Request, Response } from 'express';
import { db } from 'src/utils/firebase';
import { responseData } from 'src/utils/request';

export const getMessageList = async (req: Request, res: Response) => {
   try {
      const chatRef = db
         .collection('/messages')
         .where('chat_id', '==', db.doc(`/chats/${req.query.chat_id}`));

      const result = await Promise.all(
         (await chatRef.get()).docs.map(async (doc) => {
            const data = doc.data();
            const sender = (await data.sender.get()).data() as User;

            const item = {
               id: doc.id,
               sender: {
                  email: sender.email,
                  name: sender.name,
               },
               content: data.content,
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

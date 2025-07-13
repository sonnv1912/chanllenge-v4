import type { User } from '@packages/types/data';
import type { Request, Response } from 'express';
import { firestore } from 'firebase-admin';
import type { DocumentReference } from 'firebase-admin/firestore';
import { collection } from 'src/utils/firebase';
import { responseData } from 'src/utils/request';

export const getChatList = async (req: Request, res: Response) => {
   try {
      const chatRef = collection.chats
         .where(
            'users',
            'array-contains',
            collection.users.doc(req.auth?.user?.id!),
         )
         .orderBy('updated_at', 'desc');

      const result = await Promise.all(
         (await chatRef.get()).docs.map(async (doc) => {
            const data = doc.data();

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
               sender: {},
               last_message: '',
            };

            if (data.last_message) {
               const last_message = (await data.last_message.get()).data();
               const sender = (await last_message.sender.get()).data() as User;

               item.sender = sender;

               item.last_message = last_message.content;
            }

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

export const createChat = async (req: Request, res: Response) => {
   try {
      if (req.auth?.user?.id === req.body.user_id) {
         return res.status(400).json(
            responseData({
               status: 400,
               success: false,
               message: "You can't chat with your self",
            }),
         );
      }

      const authUserRef = collection.users.doc(req.auth?.user?.id!);
      const userRef = collection.users.doc(req.body.user_id);
      const chat_key = [req.auth?.user?.id, req.body.user_id].sort().join('_');

      const existChat = !(
         await collection.chats.where('chat_key', '==', chat_key).limit(1).get()
      ).empty;

      if (existChat) {
         return res.json(
            responseData({
               status: 200,
               success: true,
            }),
         );
      }

      await collection.chats.add({
         users: [authUserRef, userRef],
         created_at: firestore.FieldValue.serverTimestamp(),
         updated_at: firestore.FieldValue.serverTimestamp(),
         chat_key,
      });

      return res.json(
         responseData({
            status: 200,
            success: true,
         }),
      );
   } catch (error) {
      return res.status(500).json(
         responseData({
            status: 500,
            success: false,
            message: (error as Error).message || 'Error while create chat',
         }),
      );
   }
};

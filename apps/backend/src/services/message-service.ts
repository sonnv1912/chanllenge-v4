import type { User } from '@packages/types/data';
import type { Request, Response } from 'express';
import { firestore } from 'firebase-admin';
import { db } from 'src/utils/firebase';
import { responseData } from 'src/utils/request';

export const getMessageList = async (req: Request, res: Response) => {
   try {
      const chatRef = db
         .collection('/messages')
         .orderBy('date_created', 'asc')
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

export const addMessage = async (message: {
   chat_id: string;
   sender_id: string;
   content: string;
}) => {
   try {
      const messageRef = db.collection('/messages');
      const chatRef = db.doc(`/chats/${message.chat_id}`);
      const senderRef = db.doc(`/users/${message.sender_id}`);
      const senderData = (await senderRef.get()).data();

      const response = await messageRef.add({
         chat_id: chatRef,
         content: message.content,
         sender: senderRef,
         date_created: firestore.FieldValue.serverTimestamp(),
      });

      await chatRef.update({
         last_message: messageRef.doc(response.id),
         updated_at: firestore.FieldValue.serverTimestamp(),
      });

      return responseData({
         status: 200,
         success: true,
         data: {
            id: response.id,
            sender: {
               email: senderData?.email,
               name: senderData?.name,
            },
            content: message.content,
         },
      });
   } catch (error) {
      return responseData({
         status: 500,
         success: false,
         message: (error as Error).message || 'Error while get chat list',
      });
   }
};

import type { User } from '@packages/types/data';
import type { Request, Response } from 'express';
import { firestore } from 'firebase-admin';
import { collection } from 'src/utils/firebase';
import { responseData } from 'src/utils/request';

export const getMessageList = async (req: Request, res: Response) => {
   try {
      const messageRef = collection.messages
         .orderBy('created_at', 'asc')
         .where(
            'chat_id',
            '==',
            collection.chats.doc(req.query.chat_id as string),
         );

      const result = await Promise.all(
         (await messageRef.get()).docs.map(async (doc) => {
            const data = doc.data();
            const sender = (await data.sender.get()).data() as User;

            const item = {
               id: doc.id,
               sender: {
                  id: sender?.id,
                  email: sender?.email,
                  name: sender?.name,
               },
               content: data.content,
               created_at: data.created_at.toDate(),
               updated_at: data.update_at?.toDate(),
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
      const chatRef = collection.chats.doc(message.chat_id);
      const senderRef = collection.users.doc(message.sender_id);
      const senderData = (await senderRef.get()).data();

      const response = await collection.messages.add({
         chat_id: chatRef,
         content: message.content,
         sender: senderRef,
         created_at: firestore.FieldValue.serverTimestamp(),
      });

      await chatRef.update({
         last_message: collection.messages.doc(response.id),
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

export const updateMessage = async (message: {
   id: string;
   content: string;
}) => {
   try {
      await collection.messages.doc(message.id).update({
         content: message.content,
         update_at: firestore.FieldValue.serverTimestamp(),
      });

      return responseData({
         status: 200,
         success: true,
      });
   } catch (error) {
      return responseData({
         status: 500,
         success: false,
         message: (error as Error).message || 'Error while get chat list',
      });
   }
};

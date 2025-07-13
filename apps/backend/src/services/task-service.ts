import type { User } from '@packages/types/data';
import type { Request, Response } from 'express';
import { firestore } from 'firebase-admin';
import { db, getList } from 'src/utils/firebase';
import { responseData } from 'src/utils/request';

export const getTaskList = async (_: Request, res: Response) => {
   try {
      const result = await getList('/tasks');

      result.data = await Promise.all(
         result.data?.map(async (t) => ({
            ...t,
            created_at: t.created_at.toDate(),
            due_date: t.due_date.toDate(),
            completed_at: t.completed_at ? t.completed_at.toDate() : '',
            users: await Promise.all(
               t.users.map(async (user: any) => (await user.get()).data()),
            ),
         })) as Promise<User>[],
      );

      return res.json(result);
   } catch (error) {
      res.status(500).json(
         responseData({
            status: 500,
            success: false,
            message: (error as Error).message || 'Error while get task list',
         }),
      );
   }
};

export const updateTask = async (req: Request, res: Response) => {
   try {
      const body = req.body;

      body.created_at = firestore.Timestamp.fromDate(new Date(body.created_at));
      body.due_date = firestore.Timestamp.fromDate(new Date(body.due_date));

      body.users = body.users.map((t: User) => db.doc(`/users/${t.id}`));

      if (body.completed_at) {
         body.completed_at = firestore.Timestamp.fromDate(
            new Date(body.completed_at),
         );
      }

      if (body.id) {
         const taskRef = db.doc(`/tasks/${body.id}`);

         await taskRef.update(body);

         return res.json(
            responseData({
               status: 200,
               success: true,
            }),
         );
      }

      const collectionRef = db.collection('/tasks');

      await collectionRef.add(body);

      return res.json(
         responseData({
            data: [],
            status: 200,
            success: true,
         }),
      );
   } catch (error) {
      return res.status(500).json(
         responseData({
            status: 200,
            success: true,
            message: (error as Error).message || 'Error while update task',
         }),
      );
   }
};

export const getAssignedTask = async (req: Request, res: Response) => {
   try {
      const result = await getList('/tasks', (query) =>
         query.where(
            'users',
            'array-contains',
            db.doc(`/users/${req.auth?.user?.id}`),
         ),
      );

      result.data = await Promise.all(
         result.data?.map(async (t) => ({
            ...t,
            created_at: t.created_at.toDate(),
            due_date: t.due_date.toDate(),
            completed_at: t.completed_at ? t.completed_at.toDate() : '',
            users: await Promise.all(
               t.users.map(async (user: any) => (await user.get()).data()),
            ),
         })) as Promise<User>[],
      );

      return res.json(result);
   } catch (error) {
      res.status(500).json(
         responseData({
            status: 500,
            success: false,
            message: (error as Error).message || 'Error while get task list',
         }),
      );
   }
};

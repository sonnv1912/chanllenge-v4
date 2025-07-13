import type { User } from './user';

export type Task = {
   users: User[];
   due_date: string;
   created_at: string;
   completed_at: string;
   title: string;
   description: string;
   id: string;
};

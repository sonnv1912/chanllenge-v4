import type { User } from './user';

export type Message = {
   id: string;
   content: string;
   sender: User;
   created_at: string;
   updated_at: string;
};

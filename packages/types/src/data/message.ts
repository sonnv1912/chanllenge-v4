import type { User } from './user';

export type Message = {
   id: string;
   content: string;
   sender: User;
};

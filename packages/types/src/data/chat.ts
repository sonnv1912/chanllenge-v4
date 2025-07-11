import type { User } from './user';

export type Chat = {
   id: string;
   last_message: string;
   sender: User;
   room_name: string;
};

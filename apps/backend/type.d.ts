import type { User } from '@packages/types/data';

declare module 'Express' {
   interface Request {
      user?: User;
   }
}

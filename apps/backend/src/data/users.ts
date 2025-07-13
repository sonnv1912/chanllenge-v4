import type { User } from '@packages/types/data';
import { collection } from 'src/utils/firebase';

const getByEmail = async (email: string) => {
   const snapshot = await collection.users
      .orderBy('email')
      .where('email', '==', email)
      .limit(1)
      .get();

   if (!snapshot.empty) {
      const user = {
         ...(snapshot.docs[0].data() as User),
         id: snapshot.docs[0].id,
      };

      return {
         ref: collection.users.doc(user.id),
         data: user,
         success: true,
         collection: collection.users,
      };
   }

   return {
      collection: collection.users,
      data: null,
      success: false,
   };
};

export const users = {
   getByEmail,
};

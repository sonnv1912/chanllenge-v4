import type { User } from '@packages/types/data';
import { db } from 'src/utils/firebase';

const getByEmail = async (email: string) => {
   const usersRef = db.collection('users');

   const snapshot = await usersRef
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
         ref: usersRef.doc(user.id),
         data: user,
         success: true,
         collection: usersRef,
      };
   }

   return {
      collection: usersRef,
      data: null,
      success: false,
   };
};

export const users = {
   getByEmail,
};

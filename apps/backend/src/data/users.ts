import { db } from 'src/utils/firebase';
import type { User } from '@packages/types/data';
import type { QueryParams } from 'src/types/request';

const getByEmail = async (email: string) => {
   const usersRef = db.collection('users');

   const snapshot = await usersRef.where('email', '==', email).limit(1).get();

   if (!snapshot.empty) {
      const user = {
         ...(snapshot.docs[0].data() as User),
         id: snapshot.docs[0].id,
      };

      return {
         ref: usersRef.doc(user.id),
         data: user,
         success: true,
      };
   }

   return {
      success: false,
   };
};

const getList = async (params: QueryParams<User>) => {
   const usersRef = db.collection('users');

   const snapshot = await usersRef.limit(params.limit || 10).get();

   const users: User[] = snapshot.docs.map((doc) => ({
      ...(doc.data() as User),
      id: doc.id,
   }));

   return users;
};

export const users = {
   getByEmail,
   getList,
};

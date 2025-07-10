import admin, { type ServiceAccount } from 'firebase-admin';
import serviceAccount from '../configs/service-account.json';
import { responseData } from './request';
import type { QueryParams } from '@packages/types';

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const db = admin.firestore();

export const getList = async <T>(
   collection: string,
   params: QueryParams<T>,
) => {
   const collectionRef = db.collection(collection);
   const collectionCount = (await collectionRef.count().get()).data();

   const rawSnapshot = collectionRef.limit(params.limit || 10);

   const snapshot = await rawSnapshot.get();

   const result = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
   }));

   return responseData({
      data: result,
      status: 200,
      success: true,
      meta: {
         total: collectionCount.count,
         // next_page
      },
   });
};

export { db };

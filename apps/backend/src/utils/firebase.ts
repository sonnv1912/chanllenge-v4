import admin, { type ServiceAccount } from 'firebase-admin';
import type { CollectionReference, Query } from 'firebase-admin/firestore';
import ntpClient from 'ntp-client';
import serviceAccount from '../configs/service-account.json';
import { responseData } from './request';

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

ntpClient.getNetworkTime('time.google.com', 123, (err, date) => {
   if (err || !date) {
      console.log("Can't get server time");

      return;
   }

   const local = new Date();
   const diff = Math.abs(local.getTime() - date.getTime());

   console.log(
      '🚀 ~ firebase.ts:17 ~ ntpClient.getNetworkTime ~ local:',
      local,
   );

   console.log('🚀 ~ firebase.ts:34 ~ ntpClient.getNetworkTime ~ date:', date);

   console.log(
      '🚀 ~ firebase.ts:16 ~ ntpClient.getNetworkTime ~ diff:',
      `${diff} ms`,
   );

   if (diff > 30000) {
      console.warn('Diff too much, double check');
   }
});

const db = admin.firestore();

export const getList = async <T = any>(
   collection: string,
   query?: (ref: CollectionReference) => Query,
) => {
   const collectionRef = db.collection(collection);
   const rawSnapshot = query
      ? query(collectionRef).limit(10)
      : collectionRef.limit(10);
   const snapshot = await rawSnapshot.get();
   const collectionCount = (await rawSnapshot.count().get()).data().count;

   const result: T[] = snapshot.docs.map(
      (doc) =>
         ({
            ...doc.data(),
            id: doc.id,
         }) as T,
   );

   return responseData<T[]>({
      data: result,
      status: 200,
      success: true,
      meta: {
         total: collectionCount,
      },
   });
};

export const getDetail = async <T>(collection: string, id: string) => {
   const collectionRef = db.doc(`${collection}/${id}`);
   const snapshot = await collectionRef.get();

   const result: T = snapshot.data() as T;

   return responseData<T>({
      data: result,
      status: 200,
      success: true,
   });
};

export { db };

import admin, { type ServiceAccount } from 'firebase-admin';
import serviceAccount from '../configs/service-account.json';
import { responseData } from './request';
import type { QueryParams } from '@packages/types';
import ntpClient from 'ntp-client';

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

ntpClient.getNetworkTime('time.google.com', 123, (err, date) => {
   if (err || !date) {
      console.log("Can't get server time");

      return;
   }

   const local = new Date();
   const delta = Math.abs(local.getTime() - date.getTime());

   console.log(
      '🚀 ~ firebase.ts:17 ~ ntpClient.getNetworkTime ~ local:',
      local,
   );
   console.log('🚀 ~ firebase.ts:34 ~ ntpClient.getNetworkTime ~ date:', date);

   console.log('Diff', delta, 'ms');

   if (delta > 30000) {
      console.warn('Diff too much, double check');
   }
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

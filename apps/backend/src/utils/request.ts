import type { Response } from '@packages/types';

export const responseData = <T = any>({
   data,
   success,
   message,
   meta,
   status,
}: Response<T>) => {
   return {
      data,
      success,
      message,
      status,
      meta,
   };
};

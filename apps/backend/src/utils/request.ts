import type { Response } from '@packages/types';

export const responseData = ({
   data,
   success,
   message,
   meta,
   status,
}: Response<any>) => {
   return {
      data,
      success,
      message,
      status,
      meta,
   };
};

import { env } from '@packages/configs';
import queryString from 'query-string';
import type { Response } from '@packages/types';

type Options = {
   method: string;
   body?: object;
   params?: object;
};

export const request = async <T>(
   endpoint: string,
   options: Options,
): Promise<Response<T>> => {
   const defaultUrl = `${env.BASE_API_URL}${endpoint}`;
   const token = localStorage.getItem('token');

   const url = options.params
      ? `${defaultUrl}?${queryString.stringify(options.params)}`
      : defaultUrl;

   const response = await fetch(url, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: token || '',
      },
      body: options.body && JSON.stringify(options.body),
      method: options.method,
   });

   let result: Response<T> | null = null;

   try {
      result = await response.json();
   } catch (error) {
      console.log('🚀 ~ request.ts:12 ~ request ~ error:', error);
   }

   if (!result?.success) {
      throw new Error(result?.message);
   }

   return result;
};

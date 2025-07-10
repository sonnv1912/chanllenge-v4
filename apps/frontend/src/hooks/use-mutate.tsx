import { useMutation } from '@tanstack/react-query';
import { request } from '../utils/request';

export const useMutate = (endpoint: string) => {
   return useMutation({
      mutationFn: async ({
         body,
         method = 'post',
      }: { body: object; method?: 'post' | 'patch' }) => {
         const response = await request(endpoint, {
            method,
            body,
         });

         return response;
      },
   });
};

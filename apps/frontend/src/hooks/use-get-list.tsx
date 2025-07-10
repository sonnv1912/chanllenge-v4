import { useQuery } from '@tanstack/react-query';
import { request } from '../utils/request';

type Props = {
   endpoint: string;
   queryParams?: Record<string, string>;
};

export const useGetList = <T,>({ endpoint, queryParams }: Props) => {
   return useQuery({
      queryKey: [endpoint, queryParams],
      queryFn: async () => {
         const response = await request<T>(endpoint, {
            method: 'get',
            params: queryParams,
         });

         return response;
      },
   });
};

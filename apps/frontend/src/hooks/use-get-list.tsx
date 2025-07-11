import { useQuery } from '@tanstack/react-query';
import { request } from '../utils/request';

type Props = {
   endpoint: string;
   queryParams?: Record<string, string | undefined>;
   enable?: boolean;
};

export const useGetList = <T,>({
   endpoint,
   queryParams,
   enable = true,
}: Props) => {
   return useQuery({
      queryKey: [endpoint, queryParams],
      enabled: enable,
      queryFn: async () => {
         const response = await request<T>(endpoint, {
            method: 'get',
            params: queryParams,
         });

         return response;
      },
   });
};

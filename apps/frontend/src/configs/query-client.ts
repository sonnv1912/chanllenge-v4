import { QueryCache, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: 0,
         refetchOnWindowFocus: false,
      },
      mutations: {
         onError(error) {
            toast.error(error.message);
         },
      },
   },
   queryCache: new QueryCache({
      onError(error) {
         toast.error(error.message);
      },
   }),
});

import { endpoint } from '@packages/configs';
import { useMutation } from '@tanstack/react-query';
import { request } from '../../utils/request';
import type { LoginForm, VerifyOtpForm } from './auth-type';

export const useLogin = () => {
   return useMutation({
      mutationFn: async (data: LoginForm) => {
         const response = await request(endpoint.login, {
            method: 'post',
            body: data,
         });

         return response;
      },
   });
};

export const useVerifyOtp = () => {
   return useMutation({
      mutationFn: async (data: VerifyOtpForm) => {
         const response = await request<string>(endpoint.verifyOtp, {
            method: 'post',
            body: data,
         });

         return response;
      },
   });
};

export const useLogout = () => {
   return useMutation({
      mutationFn: async () => {
         const response = await request(endpoint.logout, {
            method: 'post',
         });

         return response;
      },
   });
};

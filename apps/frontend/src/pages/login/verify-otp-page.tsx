import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useVerifyOtp } from '../../services/auth/auth-hook';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { routes } from '@packages/configs';
import { useLocalStorage } from '../../hooks/use-localstorage';
import type { User } from '@packages/types/data';

export const VerifyOtpPage = () => {
   const verifyMutate = useVerifyOtp();
   const { email } = useParams();
   const [otp, setOtp] = useState('');
   const navigate = useNavigate();
   const [_, setUser] = useLocalStorage<User>('user');
   const [_2, setToken] = useLocalStorage<string>('token');

   return (
      <div className='border-gray-200 border rounded-2xl w-lg max-w-full px-6  py-8 flex flex-col gap-4'>
         <p className='text-center font-semibold text-3xl'>
            Email verification
         </p>

         <p className='text-center text-gray-400 mb-5'>
            Please enter your code that send to your email
         </p>

         <Input
            placeholder='Enter your code'
            className='mb-2'
            value={otp}
            onChange={(value) => setOtp(value)}
         />

         {email && (
            <Button
               className='justify-center'
               onClick={async () => {
                  await toast.promise(
                     async () =>
                        await verifyMutate.mutateAsync({
                           email,
                           otp,
                        }),
                     {
                        loading: 'Checking your OTP',
                        success: (response) => {
                           if (response.data) {
                              const data = jwtDecode(response.data) as any;

                              navigate(routes.employee);

                              setToken(response.data);
                              setUser(data.user);
                           }

                           return 'Hi, welcome back';
                        },
                     },
                  );
               }}
            >
               Next
            </Button>
         )}

         <p className='pt-8'>
            Could not receive?{' '}
            <a href='/' className='text-blue-500'>
               Send again
            </a>
         </p>
      </div>
   );
};

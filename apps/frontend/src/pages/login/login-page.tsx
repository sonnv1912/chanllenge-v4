import toast from 'react-hot-toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/form/input';
import { useLogin } from '../../services/auth/auth-hook';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { routes } from '@packages/configs';

export const LoginPage = () => {
   const loginMutate = useLogin();
   const navigate = useNavigate();
   const [email, setEmail] = useState('');

   return (
      <div className='border-gray-200 border rounded-2xl w-lg max-w-full px-6 m-5 py-8 flex flex-col gap-4'>
         <p className='text-center font-semibold text-3xl'>Sign In</p>

         <p className='text-center text-gray-400 mb-5'>
            Please enter your phone to sign in
         </p>

         <Input
            placeholder='Your email here'
            className='mb-2'
            value={email}
            onChange={(value) => setEmail(value)}
         />

         <Button
            className='justify-center'
            onClick={async () => {
               await toast.promise(
                  () =>
                     loginMutate.mutateAsync({
                        email,
                     }),
                  {
                     loading: 'Checking your info',
                     success: () => {
                        navigate(`${routes.verifyOtp}/${email}`);

                        return 'We have sent a OTP through your email';
                     },
                  },
               );
            }}
         >
            Next
         </Button>

         <p className='pt-8 text-sm'>
            Don't having account? <span className='text-blue-500'>Sign Up</span>
         </p>
      </div>
   );
};

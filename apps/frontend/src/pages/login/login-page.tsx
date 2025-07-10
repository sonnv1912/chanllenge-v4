import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export const LoginPage = () => {
   return (
      <div className='border-gray-200 border rounded-2xl w-lg max-w-full px-6  py-8 flex flex-col gap-4'>
         <p className='text-center font-semibold text-3xl'>Sign In</p>

         <p className='text-center text-gray-400 mb-5'>
            Please enter your phone to sign in
         </p>

         <Input placeholder='Your phone number' className='mb-2' />

         <Button>Next</Button>

         <p className='pt-8'>
            Don't having account?{' '}
            <a href='/' className='text-blue-500'>
               Sign Up
            </a>
         </p>
      </div>
   );
};

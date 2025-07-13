import { routes } from '@packages/configs';
import { Hand, MoveRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLocalStorage } from '../../hooks/use-localstorage';

export const WelcomePage = () => {
   const [user] = useLocalStorage('user');

   return (
      <div>
         <p className='text-9xl fixed w-screen h-screen flex items-center justify-center font-semibold text-blue-400'>
            Challenge V4
         </p>

         <div className='h-screen w-screen flex flex-col gap-5 items-center justify-center relative z-10 bg-white/10 backdrop-blur-sm'>
            <div className='flex items-center gap-2'>
               <Hand />
               <p className='text-xl'>Welcome back</p>
            </div>

            <a href={routes.login}>
               <Button schema='violet'>
                  <p> {user ? 'Go to dashboard' : 'Login to continue'}</p>

                  <MoveRight size={20} />
               </Button>
            </a>
         </div>
      </div>
   );
};

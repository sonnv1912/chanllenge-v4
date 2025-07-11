import { LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useLogout } from '../../services/auth/auth-hook';
import toast from 'react-hot-toast';
import { useLocalStorage } from '../../hooks/use-localstorage';
import type { User } from '@packages/types/data';

export const Header = () => {
   const logoutMutate = useLogout();
   const [user] = useLocalStorage<User>('user');

   return (
      <div className='sticky top-0 left-0 right-0 bg-white px-5 h-14 flex items-center justify-between border-b border-gray-200'>
         <div />

         <div className='flex items-center gap-2'>
            <Button outline={false} schema={'white'}>
               <div>
                  <p>{user?.name}</p>
               </div>

               <UserIcon size={20} />
            </Button>

            <Button
               rounded={true}
               onClick={() => {
                  toast.promise(async () => await logoutMutate.mutateAsync(), {
                     loading: 'Please wait while we clean up your data',
                     success: () => {
                        localStorage.clear();

                        location.reload();

                        return 'See you soon';
                     },
                  });
               }}
            >
               <LogOut size={18} />
            </Button>
         </div>
      </div>
   );
};

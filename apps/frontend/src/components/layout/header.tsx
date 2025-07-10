import { LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useLogout } from '../../services/auth/auth-hook';
import toast from 'react-hot-toast';

export const Header = () => {
   const logoutMutate = useLogout();

   return (
      <div className='sticky top-0 left-0 right-0 bg-gray-100 px-5 h-14 flex items-center justify-between border-b border-gray-200'>
         <div />

         <div className='flex items-center gap-2'>
            <Button rounded={true}>
               <User size={20} />
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

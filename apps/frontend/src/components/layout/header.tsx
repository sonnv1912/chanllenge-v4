import { LogOut, Menu, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useLogout } from '../../services/auth/auth-hook';
import toast from 'react-hot-toast';
import { useLocalStorage } from '../../hooks/use-localstorage';
import type { User } from '@packages/types/data';
import { Link } from 'react-router';
import { routes } from '@packages/configs';
import clsx from 'clsx';
import { parseAsBoolean, useQueryState } from 'nuqs';

export const Header = () => {
   const logoutMutate = useLogout();
   const [user] = useLocalStorage<User>('user');

   const [showSideBar, setShowSidebar] = useQueryState(
      'show-sidebar',
      parseAsBoolean,
   );

   return (
      <div className='sticky top-0 left-0 right-0 bg-white px-5 h-14 flex items-center justify-between border-b border-gray-200'>
         <div>
            <div className={clsx('items-center gap-2 flex')}>
               <div className='lg:hidden'>
                  <Button
                     schema={'primary-highlight'}
                     rounded={true}
                     className={clsx('justify-center')}
                     onClick={() => setShowSidebar(!showSideBar)}
                  >
                     <Menu size={18} />
                  </Button>
               </div>

               <p
                  className={clsx(
                     'font-semibold text-blue-500 text-xl',
                     'lg:hidden',
                  )}
               >
                  Challenge V4
               </p>
            </div>
         </div>

         <div className='flex items-center gap-2'>
            <Link to={routes.profile}>
               <Button outline={false} schema={'white'}>
                  <div>
                     <p>{user?.name}</p>
                  </div>

                  <UserIcon size={20} />
               </Button>
            </Link>

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

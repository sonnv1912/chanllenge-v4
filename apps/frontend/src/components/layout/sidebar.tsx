import { Link, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { routes } from '@packages/configs';
import { useLocalStorage } from '../../hooks/use-localstorage';
import type { User } from '@packages/types/data';
import clsx from 'clsx';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { AnimatePresence, motion } from 'motion/react';

export const Sidebar = () => {
   const location = useLocation();
   const [user] = useLocalStorage<User>('user');

   const [showSideBar, setShowSidebar] = useQueryState(
      'show-sidebar',
      parseAsBoolean,
   );

   const items = [
      {
         code: 'employee',
         href: routes.employee,
         label: 'Manage employee',
         role: ['admin'],
      },
      {
         code: 'task',
         href: routes.task,
         label: 'Manage task',
         role: ['admin'],
      },
      {
         code: 'message',
         href: routes.message,
         label: 'Message',
         role: ['admin', 'staff'],
      },
   ];

   const Body = () => (
      <div
         className={clsx(
            'w-64 flex-col flex gap-2 border-r border-gray-200 h-screen overflow-auto',
         )}
      >
         <div className='px-3 h-14 flex items-center bg-gray-100 border-b border-gray-200 text-blue-500 font-bold'>
            CHALLENGE V4
         </div>

         {items.map((item) => {
            return (
               user?.role &&
               item.role.includes(user?.role) && (
                  <Link
                     key={item.code}
                     to={item.href}
                     className='outline-0'
                     onClick={() => setShowSidebar(false)}
                  >
                     <Button
                        outline={false}
                        className='justify-start mx-2'
                        schema={
                           location.pathname.startsWith(item.href)
                              ? 'primary-highlight'
                              : 'white'
                        }
                     >
                        <p>{item.label}</p>
                     </Button>
                  </Link>
               )
            );
         })}
      </div>
   );

   return (
      <>
         <AnimatePresence initial={true}>
            {showSideBar && (
               <>
                  <motion.div
                     className='fixed top-0 left-0 bottom-0 bg-white z-50'
                     transition={{
                        bounce: 0,
                     }}
                     exit={{ translateX: '-100%' }}
                     initial={{ translateX: '-100%' }}
                     animate={{ translateX: 0 }}
                  >
                     <Body />
                  </motion.div>

                  <motion.div
                     className='fixed right-0 top-0 bottom-0 left-0 bg-black/40 z-10'
                     exit={{ opacity: 0 }}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     onClick={() => setShowSidebar(false)}
                  />
               </>
            )}
         </AnimatePresence>

         <div className={clsx('hidden', 'lg:block')}>
            <Body />
         </div>
      </>
   );
};

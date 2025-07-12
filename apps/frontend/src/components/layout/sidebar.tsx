import { Link, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { routes } from '@packages/configs';
import { useLocalStorage } from '../../hooks/use-localstorage';
import type { User } from '@packages/types/data';

export const Sidebar = () => {
   const location = useLocation();
   const [user] = useLocalStorage<User>('user');

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

   return (
      <div className='w-72 flex flex-col gap-2 border-r border-gray-200 h-screen overflow-auto'>
         <div className='px-3 h-14 flex items-center bg-gray-100 border-b border-gray-200 text-blue-500 font-bold'>
            CHALLENGE V4
         </div>

         {items.map((item) => {
            return (
               user?.role &&
               item.role.includes(user?.role) && (
                  <Link key={item.code} to={item.href} className='outline-0'>
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
};

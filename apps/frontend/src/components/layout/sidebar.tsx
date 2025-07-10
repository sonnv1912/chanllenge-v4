import { Link, useLocation } from 'react-router';
import { routes } from '../../configs/routes';
import { Button } from '../ui/button';

export const Sidebar = () => {
   const location = useLocation();

   const items = [
      {
         code: 'employee',
         href: routes.employee,
         label: 'Manage employee',
      },
      {
         code: 'task',
         href: routes.task,
         label: 'Manage task',
      },
      {
         code: 'message',
         href: routes.message,
         label: 'Message',
      },
   ];

   return (
      <div className='w-72 flex flex-col gap-2 border-r border-gray-200 h-screen overflow-auto'>
         <div className='px-3 h-14 flex items-center bg-gray-100 border-b border-gray-200 text-blue-500 font-bold'>
            CHALLENGE V4
         </div>

         {items.map((item) => {
            return (
               <Link key={item.code} to={item.href}>
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
            );
         })}
      </div>
   );
};

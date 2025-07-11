import { Navigate, Outlet } from 'react-router';
import { Header } from '../components/layout/header';
import { Sidebar } from '../components/layout/sidebar';
import { routes } from '@packages/configs';

export const DashboardLayout = () => {
   if (!localStorage.getItem('token')) {
      return <Navigate to={routes.login} />;
   }

   return (
      <div className='flex items-center'>
         <Sidebar />

         <div className='flex-1 h-screen overflow-auto bg-gray-50'>
            <Header />

            <Outlet />
         </div>
      </div>
   );
};

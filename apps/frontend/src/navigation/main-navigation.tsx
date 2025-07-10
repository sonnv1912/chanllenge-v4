import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthLayout } from '../layouts/auth-layout';
import { DashboardLayout } from '../layouts/dashboard-layout';
import { EmployeePage } from '../pages/employee/employee-page';
import { LoginPage } from '../pages/login/login-page';
import { MessagePage } from '../pages/message/message-page';
import { TaskPage } from '../pages/task/task-page';
import { WelcomePage } from '../pages/welcome/welcome-page';

export const MainNavigation = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route index={true} element={<WelcomePage />} />

            <Route element={<DashboardLayout />}>
               <Route path='employee' element={<EmployeePage />} />
               <Route path='task' element={<TaskPage />} />
               <Route path='message' element={<MessagePage />} />
            </Route>

            <Route element={<AuthLayout />}>
               <Route path='login' element={<LoginPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

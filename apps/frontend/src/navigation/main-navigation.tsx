import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthLayout } from '../layouts/auth-layout';
import { DashboardLayout } from '../layouts/dashboard-layout';
import { EmployeePage } from '../pages/employee/employee-page';
import { LoginPage } from '../pages/login/login-page';
import { MessagePage } from '../pages/message/message-page';
import { TaskPage } from '../pages/task/task-page';
import { WelcomePage } from '../pages/welcome/welcome-page';
import { VerifyOtpPage } from '../pages/login/verify-otp-page';
import { ProfilePage } from '../pages/profile/profile-page';

export const MainNavigation = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route index={true} element={<WelcomePage />} />

            <Route path='/dashboard' element={<DashboardLayout />}>
               <Route path='employee' element={<EmployeePage />} />
               <Route path='task' element={<TaskPage />} />
               <Route path='message' element={<MessagePage />} />
               <Route path='profile' element={<ProfilePage />} />
            </Route>

            <Route path='/auth' element={<AuthLayout />}>
               <Route path='login' element={<LoginPage />} />
               <Route path='verify-otp/:email' element={<VerifyOtpPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

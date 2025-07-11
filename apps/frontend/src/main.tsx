import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MainNavigation } from './navigation/main-navigation.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './configs/query-client.ts';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from 'react-motion-modal';
import { EmployeeModal } from './modals/employee-modal';
import { ConfirmModal } from './modals/confirm-modal.tsx';
import { SelectUserModal } from './modals/select-user-modal.tsx';

const root = document.getElementById('root');

if (root) {
   createRoot(root).render(
      <StrictMode>
         <QueryClientProvider client={queryClient}>
            <MainNavigation />

            <Toaster />

            <ModalProvider
               modals={{
                  EmployeeModal,
                  ConfirmModal,
                  SelectUserModal,
               }}
               initialParams={{
                  closeOnClickOutside: true,
                  closeOnPressEsc: true,
               }}
            />
         </QueryClientProvider>
      </StrictMode>,
   );
}

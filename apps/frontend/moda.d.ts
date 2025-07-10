import type { User } from '@packages/types/data';

declare module 'react-motion-modal' {
   interface ModalStackParams {
      EmployeeModal: {
         data?: User;
      };
      ConfirmModal: {
         message: string;
         onConfirm: () => void;
      };
   }
}

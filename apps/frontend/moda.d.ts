import type { Task, User } from '@packages/types/data';
import type { SelectObjectModalProps } from './src/modals/select-object-modal';

type;

declare module 'react-motion-modal' {
   interface ModalStackParams {
      EmployeeModal: {
         data?: User;
      };
      ConfirmModal: {
         message: string;
         onConfirm: () => void;
      };
      SelectObjectModal: SelectObjectModalProps;
      TaskModal: {
         data?: Task;
      };
   }
}

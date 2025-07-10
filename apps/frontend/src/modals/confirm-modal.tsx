import type { ModalParams } from 'react-motion-modal';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export const ConfirmModal = ({
   message,
   onConfirm,
   closeModal,
}: ModalParams<'ConfirmModal'>) => {
   return (
      <Card title='Please confirm'>
         <p>{message}</p>

         <div className='flex items-center justify-end gap-2 mt-6'>
            <Button
               schema={'danger'}
               onClick={() => {
                  closeModal();

                  onConfirm();
               }}
            >
               Yes
            </Button>

            <Button onClick={closeModal}>No</Button>
         </div>
      </Card>
   );
};

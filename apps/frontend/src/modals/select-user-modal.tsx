import type { User } from '@packages/types/data';
import { Card } from '../components/ui/card';
import { useGetList } from '../hooks/use-get-list';
import { endpoint } from '@packages/configs';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { User as UserIcon, X } from 'lucide-react';
import type { ModalParams } from 'react-motion-modal';

export const SelectUserModal = ({
   closeModal,
   onConfirm,
}: ModalParams<'SelectUserModal'>) => {
   const userQuery = useGetList<User>({ endpoint: endpoint.users });
   const [selected, setSelected] = useState<User>();

   return (
      <Card
         className='w-md'
         title='Choose someone to chat'
         right={
            <Button schema={'white'} rounded={true}>
               <X size={20} onClick={closeModal} />
            </Button>
         }
      >
         <div className='flex flex-col gap-2'>
            {userQuery.data?.data?.map((user) => (
               <Button
                  key={user.id}
                  schema={
                     selected?.email === user.email
                        ? 'primary-highlight'
                        : 'white'
                  }
                  outline={false}
                  className='justify-start py-4'
                  onClick={() => setSelected(user)}
               >
                  <UserIcon />

                  <p>{user.name}</p>
               </Button>
            ))}
         </div>

         <div className='flex items-center justify-end mt-5'>
            {selected && (
               <Button
                  onClick={() => {
                     closeModal();
                     onConfirm(selected);
                  }}
               >
                  Confirm
               </Button>
            )}
         </div>
      </Card>
   );
};

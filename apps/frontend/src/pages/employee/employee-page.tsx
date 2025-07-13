import { endpoint } from '@packages/configs';
import type { User } from '@packages/types/data';
import toast from 'react-hot-toast';
import { useModal } from 'react-motion-modal';
import { Button } from '../../components/ui/button';
import { Listing } from '../../components/ui/listing';
import { queryClient } from '../../configs/query-client';
import { useMutate } from '../../hooks/use-mutate';

export const EmployeePage = () => {
   const openModal = useModal((state) => state.openModal);
   const mutate = useMutate(endpoint.users);

   return (
      <div className='m-5'>
         <Listing
            endpoint={endpoint.users}
            itemKey='id'
            title='Manage Employee'
            createNew={{
               label: 'Create employee',
               onCreate() {
                  openModal('EmployeeModal', {
                     body: {
                        className: 'size-full',
                     },
                  });
               },
            }}
            actions={{
               delete: true,
               edit: true,
               onDelete(item) {
                  openModal('ConfirmModal', {
                     message:
                        'Did you really want to delete user that you selected ?',
                     async onConfirm() {
                        await toast.promise(
                           () =>
                              mutate.mutateAsync({
                                 body: {
                                    email: item.email,
                                    status: 'deleted',
                                 },
                              }),
                           {
                              loading: 'Preparing to delete user',
                              success: () => {
                                 queryClient.invalidateQueries({
                                    queryKey: [endpoint.users],
                                 });

                                 return 'Delete user successfully';
                              },
                           },
                        );
                     },
                  });
               },
               onEdit(item) {
                  openModal('EmployeeModal', {
                     data: item,
                     body: {
                        className: 'size-full',
                     },
                  });
               },
            }}
            columns={[
               {
                  code: 'name',
                  label: 'Name',
               },
               {
                  code: 'role',
                  label: 'Role',
               },
               {
                  code: 'email',
                  label: 'Email',
               },
               {
                  code: 'status',
                  label: 'Status',
                  render: (value: User) => {
                     return (
                        <Button
                           className='w-fit'
                           schema={
                              value.status === 'active'
                                 ? 'success-highlight'
                                 : 'danger'
                           }
                        >
                           {value.status}
                        </Button>
                     );
                  },
               },
            ]}
         />
      </div>
   );
};

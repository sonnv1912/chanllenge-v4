import { endpoint } from '@packages/configs';
import { Listing } from '../../components/ui/listing';
import { Button } from '../../components/ui/button';
import type { User } from '@packages/types/data';
import { useModal } from 'react-motion-modal';
import { useMutate } from '../../hooks/use-mutate';
import toast from 'react-hot-toast';
import { queryClient } from '../../configs/query-client';

export const EmployeePage = () => {
   const openModal = useModal((state) => state.openModal);
   const mutate = useMutate(endpoint.users);

   return (
      <div className='bg-white m-5 p-5 rounded-xl shadow-md'>
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
                  label: 'Employee Name',
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
                           className='w-20'
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

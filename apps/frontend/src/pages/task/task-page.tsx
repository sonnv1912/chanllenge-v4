import { endpoint } from '@packages/configs';
import toast from 'react-hot-toast';
import { useModal } from 'react-motion-modal';
import { Card } from '../../components/ui/card';
import { Listing } from '../../components/ui/listing';
import { queryClient } from '../../configs/query-client';
import { useMutate } from '../../hooks/use-mutate';

export const TaskPage = () => {
   const openModal = useModal((state) => state.openModal);
   const mutate = useMutate(endpoint.tasks);

   return (
      <Card className='m-5'>
         <Listing
            endpoint={endpoint.tasks}
            itemKey='id'
            title='Manage Task'
            createNew={{
               label: 'Create task',
               onCreate() {
                  openModal('TaskModal', {
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
                  openModal('TaskModal', {
                     data: item,
                     body: {
                        className: 'size-full',
                     },
                  });
               },
            }}
            columns={[
               {
                  code: 'created_at',
                  label: 'Create at',
                  type: 'date',
               },
               {
                  code: 'due_date',
                  label: 'Due date',
                  type: 'date',
               },
            ]}
         />
      </Card>
   );
};

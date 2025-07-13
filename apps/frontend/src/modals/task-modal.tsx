import { zodResolver } from '@hookform/resolvers/zod';
import { endpoint } from '@packages/configs';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { type ModalParams, useModal } from 'react-motion-modal';
import { Input } from '../components/form/input';
import { InputDatetime } from '../components/form/input-datetime';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ErrorMessage } from '../components/ui/error-message';
import { Grid } from '../components/ui/grid';
import { taskSchema } from '../services/user/task-schema';
import type { User } from '@packages/types/data';
import { useMutate } from '../hooks/use-mutate';
import toast from 'react-hot-toast';
import { queryClient } from '../configs/query-client';

export const TaskModal = ({ data, closeModal }: ModalParams<'TaskModal'>) => {
   const openModal = useModal((state) => state.openModal);
   const mutate = useMutate(endpoint.tasks);

   const form = useForm({
      resolver: zodResolver(taskSchema),
      defaultValues: data || {
         created_at: new Date().toISOString(),
         due_date: new Date().toISOString(),
         users: [],
      },
   });

   const onSubmit = form.handleSubmit((data) => {
      toast.promise(
         async () =>
            await mutate.mutateAsync({
               body: data,
            }),
         {
            loading: 'On the way to update this task',
            success: () => {
               closeModal();
               queryClient.invalidateQueries({
                  queryKey: [endpoint.tasks],
               });
               queryClient.invalidateQueries({
                  queryKey: [endpoint.assignedTask],
               });

               return 'Update successfully';
            },
         },
      );
   });

   return (
      <div className='flex flex-col gap-5'>
         <Card
            title='Task detail'
            right={
               <>
                  <Button schema={'white'} onClick={closeModal}>
                     Cancel
                  </Button>

                  <Button schema={'success'} onClick={onSubmit}>
                     Save
                  </Button>
               </>
            }
         />

         <Card title='General info'>
            <Grid>
               <Controller
                  control={form.control}
                  name='title'
                  render={({ field, fieldState }) => (
                     <Input
                        label='Title'
                        value={field.value}
                        className={clsx(
                           'col-span-1',
                           'md:col-span-2',
                           'lg:col-span-3',
                        )}
                        errMsg={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />

               <Controller
                  control={form.control}
                  name='description'
                  render={({ field, fieldState }) => (
                     <Input
                        label='Description'
                        className={clsx(
                           'col-span-1',
                           'md:col-span-2',
                           'lg:col-span-3',
                        )}
                        value={field.value}
                        errMsg={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />

               <Controller
                  control={form.control}
                  name='created_at'
                  render={({ field, fieldState }) => (
                     <InputDatetime
                        label='Created at'
                        value={field.value}
                        disable={true}
                        errMsg={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />

               <Controller
                  control={form.control}
                  name='due_date'
                  render={({ field, fieldState }) => (
                     <InputDatetime
                        label='Due date'
                        value={field.value}
                        errMsg={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />

               <Controller
                  control={form.control}
                  name='completed_at'
                  render={({ field, fieldState }) => (
                     <InputDatetime
                        label='Completed at'
                        value={field.value}
                        errMsg={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />
            </Grid>
         </Card>

         <Controller
            control={form.control}
            name='users'
            render={({ field, fieldState }) => {
               return (
                  <Card
                     title='Assign for'
                     right={
                        <Button
                           onClick={() =>
                              openModal('SelectObjectModal', {
                                 endpoint: endpoint.users,
                                 multiple: true,
                                 itemKey: 'id',
                                 columns: [
                                    {
                                       code: 'name',
                                       label: 'Name',
                                    },
                                    {
                                       code: 'email',
                                       label: 'Email',
                                    },
                                    {
                                       code: 'role',
                                       label: 'Role',
                                    },
                                 ],
                                 selected: field.value,
                                 title: 'Select user to assign',
                                 body: {
                                    className: 'size-full',
                                 },
                                 onConfirm: (users: User[]) => {
                                    form.setValue('users', users);
                                 },
                              })
                           }
                        >
                           Select
                        </Button>
                     }
                  >
                     {field.value.length ? (
                        <table className='w-full'>
                           <thead>
                              <tr className='text-left border-b border-gray-200'>
                                 <th className='px-2 pb-4'>Name</th>
                                 <th className='px-2 pb-4'>Email</th>
                                 <th className='px-2 pb-4'>Role</th>
                              </tr>
                           </thead>

                           <tbody>
                              {field.value.map((t) => (
                                 <tr key={t.email}>
                                    <td className='h-14 px-2'>{t.name}</td>
                                    <td className='h-14 px-2'>{t.email}</td>
                                    <td className='h-14 px-2'>{t.role}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     ) : (
                        <p className='text-center mb-5'>No one assigned</p>
                     )}

                     <ErrorMessage content={fieldState.error?.message} />
                  </Card>
               );
            }}
         />
      </div>
   );
};

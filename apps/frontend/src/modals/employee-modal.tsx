import { zodResolver } from '@hookform/resolvers/zod';
import { endpoint } from '@packages/configs';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { ModalParams } from 'react-motion-modal';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Grid } from '../components/ui/grid';
import { Input } from '../components/ui/input';
import { useMutate } from '../hooks/use-mutate';
import { userSchema } from '../services/user/user-schema';
import { queryClient } from '../configs/query-client';

export const EmployeeModal = ({
   data,
   closeModal,
}: ModalParams<'EmployeeModal'>) => {
   const mutate = useMutate(endpoint.users);

   const form = useForm({
      resolver: zodResolver(userSchema),
      defaultValues: data || {
         address: '',
         email: '',
         name: '',
         phone_number: '',
         role: '',
      },
   });

   const onSubmit = form.handleSubmit((data) => {
      toast.promise(() => mutate.mutateAsync({ body: data }), {
         loading: 'On the way to update employee data',
         success: () => {
            closeModal();

            queryClient.invalidateQueries({
               queryKey: [endpoint.users],
            });

            return 'Update successfully';
         },
      });
   });

   return (
      <div className='flex flex-col gap-5'>
         <Card
            title='Employee detail'
            right={
               <>
                  <Button schema={'white'} onClick={closeModal}>
                     Cancel(esc)
                  </Button>

                  <Button schema={'success'} onClick={onSubmit}>
                     Save
                  </Button>
               </>
            }
         />

         <Card title='Geneal info'>
            <Grid>
               <Controller
                  control={form.control}
                  name='name'
                  render={({ field, fieldState }) => (
                     <Input
                        label='Name'
                        value={field.value}
                        errorMessage={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />
               <Controller
                  control={form.control}
                  name='address'
                  render={({ field, fieldState }) => (
                     <Input
                        label='Address'
                        value={field.value}
                        errorMessage={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />
               <Controller
                  control={form.control}
                  name='phone_number'
                  render={({ field, fieldState }) => (
                     <Input
                        label='Phone number'
                        value={field.value}
                        errorMessage={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />
               <Controller
                  control={form.control}
                  name='email'
                  render={({ field, fieldState }) => (
                     <Input
                        label='Email'
                        value={field.value}
                        errorMessage={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />
               <Controller
                  control={form.control}
                  name='role'
                  render={({ field, fieldState }) => (
                     <Input
                        label='Role'
                        value={field.value}
                        placeholder='admin - staff'
                        errorMessage={fieldState.error?.message}
                        onChange={field.onChange}
                     />
                  )}
               />
            </Grid>
         </Card>
      </div>
   );
};

import type { ModalStackParams } from 'react-motion-modal';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../services/user/user-shema';
import { Grid } from '../components/ui/grid';

export const EmployeeModal = ({ data }: ModalStackParams['EmployeeModal']) => {
   const form = useForm({
      resolver: zodResolver(userSchema),
      defaultValues: {
         address: '',
         email: '',
         name: '',
         phone_number: '',
         role: '',
      },
   });

   const onSubmit = form.handleSubmit(() => {});

   return (
      <div className='flex flex-col gap-5'>
         <Card
            title='Employee detail'
            right={
               <Button schema={'success'} onClick={onSubmit}>
                  Save
               </Button>
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

import { Mail, MapPin, Phone, UserCog, User as UserIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useLocalStorage } from '../../hooks/use-localstorage';
import type { User } from '@packages/types/data';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../services/user/user-schema';
import { Grid } from '../../components/ui/grid';
import { Input } from '../../components/form/input';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useMutate } from '../../hooks/use-mutate';
import { endpoint } from '@packages/configs';
import toast from 'react-hot-toast';
import { Listing } from '../../components/ui/listing';
import { useModal } from 'react-motion-modal';

export const ProfilePage = () => {
   const [user, setUser] = useLocalStorage<User>('user');
   const openModal = useModal((state) => state.openModal);

   const form = useForm({
      resolver: zodResolver(userSchema),
   });

   const userMutate = useMutate(endpoint.users);

   useEffect(() => {
      form.reset(user);
   }, [form.reset, user]);

   const onSubmit = form.handleSubmit((data) => {
      toast.promise(
         () =>
            userMutate.mutateAsync({
               body: data,
            }),
         {
            loading: 'On the way to update your profile',
            success: () => {
               setUser(data);

               location.reload();

               return 'Update successfully';
            },
         },
      );
   });

   return (
      <div
         className={clsx('m-5 flex flex-col gap-5 items-start', 'lg:flex-row')}
      >
         <Card title='Your profile' className={clsx('w-full', 'lg:w-80')}>
            <div className='flex flex-col gap-5'>
               <Button className='w-fit px-10 py-10 mx-auto' rounded={true}>
                  <UserIcon size={50} />
               </Button>

               <div className='flex items-center gap-2'>
                  <UserIcon size={16} className='text-slate-500' />
                  <p>{user?.name}</p>
               </div>

               <div className='flex items-center gap-2'>
                  <Mail size={16} className='text-slate-500' />
                  <p>{user?.email}</p>
               </div>

               <div className='flex items-center gap-2'>
                  <Phone size={16} className='text-slate-500' />
                  <p>{user?.phone_number}</p>
               </div>

               <div className='flex items-center gap-2'>
                  <UserCog size={16} className='text-slate-500' />
                  <p>{user?.role}</p>
               </div>

               <div className='flex items-center gap-2'>
                  <MapPin size={16} className='text-slate-500' />
                  <p>{user?.address}</p>
               </div>
            </div>
         </Card>

         <div className='flex-1 w-full'>
            <Card
               title='Update profile'
               className='w-full mb-5'
               right={
                  <Button schema={'success'} onClick={onSubmit}>
                     Save
                  </Button>
               }
            >
               <Grid>
                  <Controller
                     control={form.control}
                     name='name'
                     render={({ field, fieldState }) => (
                        <Input
                           value={field.value}
                           label='Name'
                           errMsg={fieldState.error?.message}
                           onChange={field.onChange}
                        />
                     )}
                  />

                  <Controller
                     control={form.control}
                     name='email'
                     render={({ field, fieldState }) => (
                        <Input
                           value={field.value}
                           label='Email'
                           errMsg={fieldState.error?.message}
                           onChange={field.onChange}
                        />
                     )}
                  />

                  <Controller
                     control={form.control}
                     name='phone_number'
                     render={({ field, fieldState }) => (
                        <Input
                           value={field.value}
                           label='Phone number'
                           errMsg={fieldState.error?.message}
                           onChange={field.onChange}
                        />
                     )}
                  />

                  <Controller
                     control={form.control}
                     name='address'
                     render={({ field, fieldState }) => (
                        <Input
                           value={field.value}
                           label='Address'
                           errMsg={fieldState.error?.message}
                           className={clsx(
                              'col-span-1',
                              'md:col-span-2',
                              'lg:col-span-3',
                           )}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </Grid>
            </Card>

            <Listing
               endpoint={endpoint.assignedTask}
               itemKey='id'
               title='Task'
               columns={[
                  {
                     code: 'created_at',
                     label: 'Created at',
                     type: 'date',
                  },
                  {
                     code: 'due_date',
                     label: 'Due date',
                     type: 'date',
                  },
                  {
                     code: 'completed_at',
                     label: 'Completed at',
                     type: 'date',
                  },
               ]}
               actions={{
                  edit: true,
                  onEdit(item) {
                     openModal('TaskModal', {
                        data: item,
                        body: {
                           className: 'size-full',
                        },
                     });
                  },
               }}
            />
         </div>
      </div>
   );
};

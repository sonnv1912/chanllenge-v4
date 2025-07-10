import { endpoint } from '@packages/configs';
import { Listing } from '../../components/ui/listing';
import { Button } from '../../components/ui/button';
import type { User } from '@packages/types/data';
import { useModal } from 'react-motion-modal';

export const EmployeePage = () => {
   const openModal = useModal((state) => state.openModal);

   return (
      <div className='bg-white m-5 p-5 rounded-xl shadow-md'>
         <Listing
            endpoint={endpoint.users}
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
            itemKey='id'
            title='Manage Employee'
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
                                 : 'white'
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

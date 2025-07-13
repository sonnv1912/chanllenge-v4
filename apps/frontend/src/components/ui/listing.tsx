import { Plus, Search } from 'lucide-react';
import type { ReactElement, ReactNode } from 'react';
import { useGetList } from '../../hooks/use-get-list';
import { Button } from './button';
import { format } from 'date-fns';
import { Card } from './card';
import clsx from 'clsx';

type Column = {
   label: string;
   code: string;
   type?: 'date';
   render?: (value: any, index: number) => ReactElement;
};

export type ListingProps = {
   title: string;
   itemKey: string;
   endpoint: string;
   queryParams?: Record<string, string>;
   columns: Column[];
   right?: ReactNode;
   selected?: any[];
   actions?: {
      edit?: boolean;
      delete?: boolean;

      onEdit?: (item: any) => void;
      onDelete?: (item: any) => void;
   };
   createNew?: {
      label: string;
      onCreate: () => void;
   };

   onRowClick?: (value: any, index: number) => void;
};

export const Listing = ({
   title,
   endpoint,
   queryParams,
   columns,
   right,
   createNew,
   selected = [],
   actions,
   itemKey,
   onRowClick,
}: ListingProps) => {
   const query = useGetList<any>({ endpoint, queryParams });

   const renderItem = (column: Column, item: any, index: number) => {
      const value = item[column.code];

      if (column.render) {
         return column.render(item, index);
      }

      if (column.type === 'date') {
         return value ? format(value, 'dd/MM/yyyy HH:mm') : '';
      }

      return value;
   };

   return (
      <Card title={title} right={right}>
         <div className='flex items-center justify-between mb-4'>
            <div>
               <p className='font-semibold'>
                  {query.data?.meta?.total} object found
               </p>
            </div>

            <div className='flex items-center gap-2'>
               {createNew && (
                  <Button
                     schema={'primary-highlight'}
                     onClick={createNew.onCreate}
                  >
                     <Plus size={20} />

                     <p>{createNew.label}</p>
                  </Button>
               )}

               <Button schema={'white'}>
                  <Search size={20} />

                  <p>Filter</p>
               </Button>
            </div>
         </div>

         <table className='w-full text-sm'>
            <thead>
               <tr className='border-b border-gray-200'>
                  {columns?.map((t) => (
                     <th
                        key={t.code}
                        className='text-left px-2 pb-4 text-gray-500'
                     >
                        {t.label}
                     </th>
                  ))}

                  {actions && <th>Action</th>}
               </tr>
            </thead>

            <tbody>
               {query.data?.data?.map((item, index) => (
                  <tr
                     key={item[itemKey]}
                     className={clsx(
                        'hover:bg-blue-100 cursor-pointer hover:text-blue-500 transition-all',
                        {
                           'bg-blue-100 text-blue-500': selected?.find(
                              (t) => t[itemKey] === item[itemKey],
                           ),
                        },
                     )}
                     onClick={() => onRowClick?.(item, index)}
                  >
                     {columns?.map((t) => (
                        <td key={t.code} className='h-14 px-2'>
                           {renderItem(t, item, index)}
                        </td>
                     ))}

                     {actions && (
                        <td>
                           <div className='flex items-center gap-2'>
                              {actions.edit && (
                                 <Button
                                    schema={'violet'}
                                    onClick={() => actions.onEdit?.(item)}
                                 >
                                    Edit
                                 </Button>
                              )}

                              {actions.delete && (
                                 <Button
                                    schema={'danger'}
                                    onClick={() => actions.onDelete?.(item)}
                                 >
                                    Delete
                                 </Button>
                              )}
                           </div>
                        </td>
                     )}
                  </tr>
               ))}
            </tbody>
         </table>
      </Card>
   );
};

import { Plus, Search } from 'lucide-react';
import type { ReactElement } from 'react';
import { useGetList } from '../../hooks/use-get-list';
import { Button } from './button';

type Column = {
   label: string;
   code: string;
   render?: (value: any, index: number) => ReactElement;
};

type Props = {
   title: string;
   itemKey: string;
   endpoint: string;
   queryParams?: Record<string, string>;
   columns?: Column[];
   actions?: {
      edit: boolean;
      delete: boolean;

      onEdit: (item: any) => void;
      onDelete: (item: any) => void;
   };
   createNew?: {
      label: string;
      onCreate: () => void;
   };

   onRowClick?: (value: any) => void;
};

export const Listing = ({
   title,
   endpoint,
   queryParams,
   columns,
   createNew,
   actions,
   itemKey,
   onRowClick,
}: Props) => {
   const query = useGetList<any>({ endpoint, queryParams });

   return (
      <div>
         <p className='text-2xl font-semibold mb-5'>{title}</p>

         <div className='flex items-center justify-between mb-4'>
            <div />

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
                     className='hover:bg-blue-100 cursor-pointer hover:text-blue-500 transition-all'
                     onClick={() => onRowClick?.(item)}
                  >
                     {columns?.map((t) => (
                        <td key={t.code} className='h-14 px-2'>
                           {t.render?.(item, index) || item[t.code]}
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

                              {actions.edit && (
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
      </div>
   );
};

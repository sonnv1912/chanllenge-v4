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
   createNew?: {
      label: string;
      onCreate: () => void;
   };
};

export const Listing = ({
   title,
   endpoint,
   queryParams,
   columns,
   createNew,
   itemKey,
}: Props) => {
   const query = useGetList<any[]>({ endpoint, queryParams });

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
               </tr>
            </thead>

            <tbody>
               {query.data?.data.map((item, index) => (
                  <tr key={item[itemKey]}>
                     {columns?.map((t) => (
                        <td key={t.code} className='h-14 px-2'>
                           {t.render?.(item, index) || item[t.code]}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
